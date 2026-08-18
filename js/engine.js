/**
 * js/engine.js
 * ------------------------------------------------------------------
 * Deck engine — merged from: main.js, state.js, render.js, templates.js
 *
 *   main.js      Bootstrap: load config → render
 *   state.js     Deck state, slide index (from data)
 *   render.js    Render pipeline: slide array → DOM
 *   templates.js Reusable slide builders
 * ------------------------------------------------------------------
 */

import { presentation, parts, contentManifest, part2Openers } from "../config/presentation.js";
import { clubs, requiredLogos } from "../config/clubs.js";
import { startRouter, bindKeyboard, updateProgress } from "./controls.js";

/* ============================================================
   state.js — Deck state, slide index (from data)
   ============================================================ */

export const state = {
  /** Flattened, ordered slide array (built by render pipeline). */
  slides: [],

  /** Current slide index (0-based) — computed from data order. */
  index: 0,
};

export function setState(patch = {}) {
  Object.assign(state, patch);
}

/* ============================================================
   templates.js — Reusable slide builders
   ============================================================ */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function buildCover(slide) {
  const inner = el("div", "inner");
  const brandrow = el("div", "brandrow");
  brandrow.setAttribute("data-a", "");
  brandrow.style.setProperty("--d", 0);
  const logo = el("div", "logo");
  logo.textContent = "✦";
  brandrow.appendChild(logo);
  const bw = el("div");
  bw.appendChild(el("span", "bw", slide.institution.toUpperCase()));
  bw.appendChild(el("span", "bs", "A STUDENT PRESENTATION · AUGUST 2026"));
  brandrow.appendChild(bw);
  inner.appendChild(brandrow);

  const h1 = el("h1", "disp");
  h1.setAttribute("data-a", "");
  h1.style.setProperty("--d", 1);
  h1.innerHTML = `${slide.title}<br><em>of Clubs</em>`;
  inner.appendChild(h1);

  const lede = el("p", "lede", slide.tagline);
  lede.setAttribute("data-a", "");
  lede.style.setProperty("--d", 2);
  inner.appendChild(lede);

  const meta = el("div", "meta3");
  meta.setAttribute("data-a", "");
  meta.style.setProperty("--d", 3);
  const m1 = el("div");
  m1.appendChild(el("span", null, "INSTITUTION"));
  m1.appendChild(el("b", null, slide.institution));
  const m2 = el("div");
  m2.appendChild(el("span", null, "DATE"));
  m2.appendChild(el("b", null, slide.date));
  const m3 = el("div");
  m3.appendChild(el("span", null, "SECTIONS"));
  m3.appendChild(el("b", null, "3 parts · 9 clubs"));
  meta.append(m1, m2, m3);
  inner.appendChild(meta);

  const ring = el("div", "ring");
  const wrap = el("div", "inner-wrap");
  wrap.appendChild(ring);
  wrap.appendChild(inner);
  return wrap;
}

function buildSection(slide) {
  const inner = el("div", "inner");
  const headrow = el("div", "headrow");
  headrow.setAttribute("data-a", "");
  headrow.style.setProperty("--d", 0);
  headrow.appendChild(el("p", "eyebrow", "Section"));
  headrow.appendChild(el("span", "no", ""));
  inner.appendChild(headrow);

  const h2 = el("h2", "disp");
  h2.setAttribute("data-a", "");
  h2.style.setProperty("--d", 1);
  h2.style.fontSize = "96px";
  h2.textContent = slide.title;
  inner.appendChild(h2);
  return inner;
}

function buildText(slide) {
  const inner = el("div", "inner");
  const headrow = el("div", "headrow");
  headrow.setAttribute("data-a", "");
  headrow.style.setProperty("--d", 0);
  headrow.appendChild(el("p", "eyebrow", slide.title));
  headrow.appendChild(el("span", "no", ""));
  inner.appendChild(headrow);

  const h2 = el("h2", "disp");
  h2.setAttribute("data-a", "");
  h2.style.setProperty("--d", 1);
  h2.style.fontSize = "58px";
  h2.textContent = slide.title;
  inner.appendChild(h2);

  const body = el("div", "lede");
  body.setAttribute("data-a", "");
  body.style.setProperty("--d", 2);
  body.style.maxWidth = "900px";
  body.style.fontSize = "19px";
  body.style.lineHeight = "1.7";
  (slide.paragraphs || []).forEach((p) => {
    const para = el("p", null, p);
    para.style.marginBottom = "14px";
    body.appendChild(para);
  });
  inner.appendChild(body);
  return inner;
}

function buildLogo(slide) {
  const inner = el("div", "inner");
  const logoSlide = el("div", "logo-slide");
  logoSlide.setAttribute("data-a", "");
  logoSlide.style.setProperty("--d", 0);

  const img = el("img", "logo-img");
  img.src = slide.logo;
  img.alt = slide.title;
  logoSlide.appendChild(img);

  const badge = el("span", "badge", "UNITED CLUB ASSOCIATION");
  logoSlide.appendChild(badge);

  const h2 = el("h2", null, slide.title);
  logoSlide.appendChild(h2);

  if (slide.caption) {
    const sub = el("p", "sub", slide.caption);
    logoSlide.appendChild(sub);
  }

  inner.appendChild(logoSlide);
  return inner;
}

function buildTimeline(slide) {
  const inner = el("div", "inner");
  const headrow = el("div", "headrow");
  headrow.setAttribute("data-a", "");
  headrow.style.setProperty("--d", 0);
  headrow.appendChild(el("p", "eyebrow", slide.title));
  headrow.appendChild(el("span", "no", ""));
  inner.appendChild(headrow);

  const h2 = el("h2", "disp");
  h2.setAttribute("data-a", "");
  h2.style.setProperty("--d", 1);
  h2.style.fontSize = "52px";
  h2.textContent = slide.title;
  inner.appendChild(h2);

  if (slide.subtitle) {
    const sub = el("p", "lede", slide.subtitle);
    sub.setAttribute("data-a", "");
    sub.style.setProperty("--d", 2);
    inner.appendChild(sub);
  }

  const timeline = el("div", "timeline");
  timeline.style.marginTop = "24px";
  (slide.events || []).forEach((ev, i) => {
    const row = el("div", "tl-row");
    row.setAttribute("data-a", "");
    row.style.setProperty("--d", i + 2);
    row.appendChild(el("span", "tl-date", ev.date));
    const body = el("div");
    body.appendChild(el("h4", null, ev.title));
    body.appendChild(el("p", null, ev.text));
    row.appendChild(body);
    timeline.appendChild(row);
  });
  inner.appendChild(timeline);
  return inner;
}

function buildLogoGrid(slide) {
  const inner = el("div", "inner");
  const headrow = el("div", "headrow");
  headrow.setAttribute("data-a", "");
  headrow.style.setProperty("--d", 0);
  headrow.appendChild(el("p", "eyebrow", slide.title));
  headrow.appendChild(el("span", "no", ""));
  inner.appendChild(headrow);

  const h2 = el("h2", "disp");
  h2.setAttribute("data-a", "");
  h2.style.setProperty("--d", 1);
  h2.style.fontSize = "52px";
  h2.textContent = slide.title;
  inner.appendChild(h2);

  const nine = el("div", "nine");
  nine.style.marginTop = "28px";
  (slide.items || []).forEach((item, i) => {
    const cell = el("div", "cell");
    cell.setAttribute("data-a", "");
    cell.style.setProperty("--d", i + 2);
    const ic = el("span", "ic", item.label);
    cell.appendChild(ic);
    const body = el("div");
    body.appendChild(el("h4", null, item.name.replace("University Laboratory ", "").replace(" Club", "")));
    body.appendChild(el("span", null, item.label));
    cell.appendChild(body);
    nine.appendChild(cell);
  });
  inner.appendChild(nine);
  return inner;
}

function buildClubTitle(slide) {
  const inner = el("div", "inner");
  const logoSlide = el("div", "logo-slide");
  logoSlide.setAttribute("data-a", "");
  logoSlide.style.setProperty("--d", 0);

  const img = el("img", "logo-img");
  img.src = slide.logo;
  img.alt = slide.name;
  logoSlide.appendChild(img);

  const badge = el("span", "badge", slide.badge || slide.club);
  logoSlide.appendChild(badge);

  const h2 = el("h2", null, slide.name);
  logoSlide.appendChild(h2);

  if (slide.tagline) {
    const sub = el("p", "sub", slide.tagline);
    logoSlide.appendChild(sub);
  }

  inner.appendChild(logoSlide);
  return inner;
}

function buildBullets(slide) {
  const inner = el("div", "inner");
  const headrow = el("div", "headrow");
  headrow.setAttribute("data-a", "");
  headrow.style.setProperty("--d", 0);
  headrow.appendChild(el("p", "eyebrow", slide.title));
  headrow.appendChild(el("span", "no", ""));
  inner.appendChild(headrow);

  const h2 = el("h2", "disp");
  h2.setAttribute("data-a", "");
  h2.style.setProperty("--d", 1);
  h2.style.fontSize = "44px";
  h2.textContent = slide.title;
  inner.appendChild(h2);

  const bullets = el("div", "bullets");
  bullets.style.marginTop = "24px";
  (slide.items || []).forEach((item, i) => {
    const bullet = el("div", "bullet");
    bullet.setAttribute("data-a", "");
    bullet.style.setProperty("--d", i + 2);
    const num = el("span", "b-num", String(i + 1).padStart(2, "0"));
    bullet.appendChild(num);
    const body = el("div");
    body.appendChild(el("h4", null, item.title));
    body.appendChild(el("p", null, item.text));
    bullet.appendChild(body);
    bullets.appendChild(bullet);
  });
  inner.appendChild(bullets);
  return inner;
}

function buildQuotePortrait(slide) {
  const inner = el("div", "inner");
  const headrow = el("div", "headrow");
  headrow.setAttribute("data-a", "");
  headrow.style.setProperty("--d", 0);
  headrow.appendChild(el("p", "eyebrow", slide.title));
  headrow.appendChild(el("span", "no", ""));
  inner.appendChild(headrow);

  const h2 = el("h2", "disp");
  h2.setAttribute("data-a", "");
  h2.style.setProperty("--d", 1);
  h2.style.fontSize = "52px";
  h2.textContent = slide.title;
  inner.appendChild(h2);

  const pull = el("div", "pull");
  pull.setAttribute("data-a", "");
  pull.style.setProperty("--d", 2);
  pull.style.marginTop = "32px";
  pull.appendChild(el("p", null, `"${slide.quote}"`));
  pull.appendChild(el("span", null, `— ${slide.name} · ${slide.role}`));
  inner.appendChild(pull);
  return inner;
}

function buildCredits(slide) {
  const inner = el("div", "inner");
  inner.classList.add("s-close");
  const logo = el("div", "logo");
  logo.textContent = "✦";
  logo.setAttribute("data-a", "");
  logo.style.setProperty("--d", 0);
  inner.appendChild(logo);

  const h2 = el("h2", "disp", slide.title);
  h2.setAttribute("data-a", "");
  h2.style.setProperty("--d", 1);
  inner.appendChild(h2);

  const sub = el("p", "sub", slide.subtitle);
  sub.setAttribute("data-a", "");
  sub.style.setProperty("--d", 2);
  inner.appendChild(sub);

  const credits = el("div", "rows");
  credits.style.marginTop = "32px";
  credits.style.maxWidth = "640px";
  (slide.credits || []).forEach((c, i) => {
    const row = el("div", "rw");
    row.setAttribute("data-a", "");
    row.style.setProperty("--d", i + 3);
    row.appendChild(el("span", "k", String(i + 1).padStart(2, "0")));
    const body = el("div");
    body.appendChild(el("h4", null, c));
    row.appendChild(body);
    credits.appendChild(row);
  });
  inner.appendChild(credits);
  return inner;
}

const BUILDERS = {
  cover: buildCover,
  section: buildSection,
  text: buildText,
  logo: buildLogo,
  timeline: buildTimeline,
  "logo-grid": buildLogoGrid,
  "club-title": buildClubTitle,
  bullets: buildBullets,
  "quote-portrait": buildQuotePortrait,
  credits: buildCredits,
};

export function buildSlide(slide) {
  const builder = BUILDERS[slide.layout];
  if (!builder) {
    throw new Error(`Unknown layout: "${slide.layout}"`);
  }
  const section = document.createElement("section");
  section.className = `slide slide--${slide.layout}`;
  section.dataset.theme = slide.theme || "core";
  if (slide.id) section.id = slide.id;
  section.appendChild(builder(slide));
  return section;
}

/* ============================================================
   render.js — Render pipeline: slide array → DOM
   ============================================================ */

export function flattenSlides(sections) {
  return sections.flat();
}

export function buildSlideList() {
  return state.slides;
}

export function renderDeck() {
  const deck = document.getElementById("deck");
  deck.innerHTML = "";

  state.slides.forEach((slide, i) => {
    const wrap = document.createElement("div");
    wrap.className = "slide-wrap";
    wrap.dataset.n = String(i + 1).padStart(2, "0");
    wrap.appendChild(buildSlide(slide));
    deck.appendChild(wrap);
  });

  // Mark first slide active
  const first = deck.querySelector(".slide");
  if (first) first.classList.add("active");
}

/* ============================================================
   main.js — Bootstrap: load config → render
   ============================================================ */

function banner() {
  const baselineTotal = parts[parts.length - 1].baselineRange[1];
  console.info(`[deck] "${presentation.title}" — ${presentation.institution}`);
  console.info(`[deck] ${presentation.docRef} · presentation ${presentation.presentationDate}`);
  console.info(`[deck] ${clubs.length} clubs registered · ${requiredLogos.length} required logos · baseline ${baselineTotal} slides`);
}

async function bootstrap() {
  banner();

  // Load all content modules from the manifest
  const sections = [];
  for (const entry of contentManifest) {
    if (entry.type === "inline") {
      sections.push(entry.slides);
    } else {
      const mod = await import(`../${entry.file}`);
      sections.push(mod[entry.exportName]);
    }
  }

  // Flatten into ordered slide array
  state.slides = flattenSlides(sections);

  // Render
  renderDeck();

  // Start interaction layer
  startRouter();
  bindKeyboard();
  updateProgress();
}

bootstrap();