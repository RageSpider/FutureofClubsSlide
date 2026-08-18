/**
 * js/controls.js
 * ------------------------------------------------------------------
 * Deck interaction layer — merged from: router.js, keyboard.js,
 * progress.js, utils.js
 *
 *   router.js    Hash routing (#/slide-7)
 *   keyboard.js  Arrow keys, PgUp/PgDn
 *   progress.js  Dynamic counter "5 / 46"
 *   utils.js     Clamp, debounce, slugify, slice helpers
 * ------------------------------------------------------------------
 */

import { state, setState, renderDeck } from "./engine.js";
import { keyboard, routing, counter } from "../config/presentation.js";

/* ============================================================
   utils.js — Clamp, debounce, slugify, slice helpers
   ============================================================ */

/** Clamp `value` into [min, max]. */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/** Classic trailing debounce. */
export function debounce(fn, wait = 0) {
  let timer = null;
  return function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

/** URL-safe slug from text ("ULDC Foundation" → "uldc-foundation"). */
export function slugify(text) {
  return String(text)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** All slides belonging to one club. */
export function findSlidesByClub(slides, clubId) {
  return slides.filter((slide) => slide.id && slide.id.startsWith(`${clubId}-`));
}

/** Flatten content sections into one ordered slide array. */
export function flattenSlides(sections) {
  return sections.flat();
}

/* ============================================================
   router.js — Hash routing (#/slide-7)
   ============================================================ */

/**
 * Parse a location.hash string into a route descriptor.
 *   "#/15"              → { number: 15 }
 *   "#/uldc-foundation" → { id: "uldc-foundation" }
 *   ""                  → {}
 */
export function parseHash(hash = window.location.hash) {
  const raw = hash.replace(/^#\/?/, "");
  if (!raw) return {};
  if (/^\d+$/.test(raw)) return { number: Number(raw) };
  return { id: raw };
}

/** Resolve a route descriptor to a slide index. */
function resolveRoute(route) {
  if (route.number != null) {
    return clamp(route.number - 1, 0, state.slides.length - 1);
  }
  if (route.id) {
    const idx = state.slides.findIndex((slide) => slide.id === route.id);
    return idx >= 0 ? idx : 0;
  }
  return 0;
}

/** Start listening for hashchange. */
export function startRouter() {
  window.addEventListener("hashchange", () => {
    const route = parseHash();
    const index = resolveRoute(route);
    goTo(index);
  });

  // Restore initial slide from hash
  const route = parseHash();
  const index = resolveRoute(route);
  if (index !== 0) goTo(index);
}

/* ============================================================
   keyboard.js — Arrow keys, PgUp/PgDn
   ============================================================ */

/** Keys handled by the deck. */
export const NAV_KEYS = [
  "ArrowRight",
  "ArrowLeft",
  "PageDown",
  "PageUp",
  "Home",
  "End",
  " ",
];

function onKeydown(e) {
  const k = e.key;
  if (keyboard.next.includes(k)) {
    e.preventDefault();
    goTo(state.index + 1);
  } else if (keyboard.previous.includes(k)) {
    e.preventDefault();
    goTo(state.index - 1);
  } else if (keyboard.first.includes(k)) {
    e.preventDefault();
    goTo(0);
  } else if (keyboard.last.includes(k)) {
    e.preventDefault();
    goTo(state.slides.length - 1);
  } else if (k === "g" || k === "G") {
    toggleOverview();
  } else if (k === "Escape") {
    closeOverview();
    setPanel(false);
  } else if (k === "?") {
    setPanel(!panelOpen);
  } else if (k === "h" || k === "H") {
    setPanel(false);
    document.getElementById("stage").classList.toggle("zen");
  } else if (k === "b" || k === "B") {
    document.getElementById("black").classList.toggle("on");
  } else if (k === "f" || k === "F") {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
  }
}

/** Attach keydown listeners. */
export function bindKeyboard() {
  window.addEventListener("keydown", onKeydown);
}

/** Detach keydown listeners. */
export function unbindKeyboard() {
  window.removeEventListener("keydown", onKeydown);
}

/* ============================================================
   progress.js — Dynamic counter "5 / 46"
   ============================================================ */

let panelOpen = false;

function setPanel(on) {
  panelOpen = on;
  const panel = document.getElementById("panel");
  if (panel) panel.classList.toggle("on", on);
}

/** Refresh counter + progress bar from current state. */
export function updateProgress() {
  const total = state.slides.length;
  const current = state.index + 1;

  const counterEl = document.getElementById("slide-counter");
  if (counterEl) {
    counterEl.textContent = `${String(current).padStart(2, "0")}${counter.separator}${String(total).padStart(2, "0")}`;
  }

  const prog = document.getElementById("prog");
  if (prog) {
    prog.style.transform = `scaleX(${current / total})`;
  }

  const curEl = document.getElementById("cur");
  if (curEl) curEl.textContent = String(current).padStart(2, "0");

  const totEl = document.getElementById("tot");
  if (totEl) totEl.textContent = String(total).padStart(2, "0");
}

/* ============================================================
   Navigation core
   ============================================================ */

let isAnimating = false;

export function goTo(index) {
  if (isAnimating) return;
  index = clamp(index, 0, state.slides.length - 1);
  if (index === state.index) return;

  isAnimating = true;

  const deck = document.getElementById("deck");
  const wraps = deck.querySelectorAll(".slide-wrap");
  const oldWrap = wraps[state.index];
  const newWrap = wraps[index];

  const oldSlide = oldWrap ? oldWrap.querySelector(".slide") : null;
  const newSlide = newWrap ? newWrap.querySelector(".slide") : null;

  // Exit
  if (oldSlide) {
    oldSlide.classList.remove("active");
    oldSlide.classList.add("was");
    setTimeout(() => oldSlide.classList.remove("was"), 700);
  }

  // Enter
  if (newSlide) {
    newSlide.classList.remove("was");
    newSlide.classList.add("active");
  }

  // Update stage theme for chrome
  const stage = document.getElementById("stage");
  if (stage && newSlide) {
    stage.dataset.theme = newSlide.dataset.theme || "core";
  }

  // Update state
  setState({ index });

  // Update progress + hash
  updateProgress();
  history.replaceState(null, "", `${routing.prefix}${index + 1}`);

  // Update overview highlight
  wraps.forEach((w, i) => w.classList.toggle("cur", i === index));

  setTimeout(() => { isAnimating = false; }, 400);
}

/* ============================================================
   Overview
   ============================================================ */

function toggleOverview() {
  const deck = document.getElementById("deck");
  if (deck.classList.contains("overview")) {
    closeOverview();
  } else {
    openOverview();
  }
}

function openOverview() {
  const deck = document.getElementById("deck");
  const w = (1280 - 88 - 4 * 16) / 5;
  deck.style.setProperty("--os", w / 1280);
  deck.classList.add("fading");
  setTimeout(() => {
    deck.classList.add("overview");
    deck.classList.remove("fading");
  }, 190);
}

function closeOverview() {
  const deck = document.getElementById("deck");
  deck.classList.add("fading");
  setTimeout(() => {
    deck.classList.remove("overview");
    deck.classList.remove("fading");
  }, 190);
}

/* ============================================================
   Init helpers
   ============================================================ */

export function initControls() {
  // Help button
  const help = document.getElementById("help");
  if (help) {
    help.addEventListener("click", (e) => {
      e.stopPropagation();
      setPanel(!panelOpen);
    });
  }

  const pclose = document.getElementById("pclose");
  if (pclose) {
    pclose.addEventListener("click", () => setPanel(false));
  }

  document.addEventListener("pointerdown", (e) => {
    const panel = document.getElementById("panel");
    if (panel && panel.classList.contains("on") && !panel.contains(e.target)) {
      setPanel(false);
    }
  });

  // Blackout click to dismiss
  const black = document.getElementById("black");
  if (black) {
    black.addEventListener("click", () => black.classList.remove("on"));
  }

  // Overview click to jump
  const deck = document.getElementById("deck");
  if (deck) {
    deck.addEventListener("click", (e) => {
      if (!deck.classList.contains("overview")) return;
      const wrap = e.target.closest(".slide-wrap");
      if (!wrap) return;
      const idx = Array.from(deck.querySelectorAll(".slide-wrap")).indexOf(wrap);
      closeOverview();
      goTo(idx);
    });
  }

  // Swipe support
  let tx = null;
  const stage = document.getElementById("stage");
  if (stage) {
    stage.addEventListener("touchstart", (e) => {
      tx = e.touches[0].clientX;
    }, { passive: true });

    stage.addEventListener("touchend", (e) => {
      if (tx === null) return;
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 40) {
        if (deck.classList.contains("overview")) closeOverview();
        dx < 0 ? goTo(state.index + 1) : goTo(state.index - 1);
      }
      tx = null;
    }, { passive: true });
  }
}