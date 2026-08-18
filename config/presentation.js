/**
 * config/presentation.js
 * ==================================================================
 * Global metadata + engine configuration for "The Future of Clubs".
 * Source of truth: Memorandum ULSC/UCA/2026-08 (08 August 2026).
 *
 * STATUS: FINAL — nothing deferred. Phase 2+ consumes this file
 * as-is. Guardrail reminder: slide numbering is always COMPUTED
 * from the flattened content order; `baselineRange` values here are
 * reference allocations from the memorandum, never rendered numbers.
 *
 * DATA CONTRACT (future files must use exactly these keys):
 *   presentation.*      → cover slide, document headers
 *   parts[]             → part dividers, range validation
 *   contentManifest[]   → js/engine.js (render section) flatten order (dynamic import)
 *   keyboard            → js/controls.js (keyboard section)
 *   routing             → js/controls.js (router section)
 *   animation.gsap.*    → js/engine.js (render) + js/controls.js (progress) (GSAP calls)
 *   viewport            → css/deck.css (layout section) breakpoints, QA checklist
 *   counter.separator   → js/controls.js (progress section) ("5 / 46")
 *   assets.*            → path building for images/fonts/icons
 *   people.*            → credits slides 45–46
 * ==================================================================
 */

import { clubs, logoPath } from "./clubs.js";

/* ------------------------------------------------------------------
 * 1. Global metadata
 * ------------------------------------------------------------------ */

export const presentation = {
  title: "The Future of Clubs",
  institution: "University Laboratory School and College",
  docRef: "ULSC/UCA/2026-08",
  presentationDate: "20 August 2026",
  tagline: "The beginning, past, present, and future.",
  language: "en", // guardrail: final deck is full English, no Bengali
  version: "0.1.0", // bump on every frozen milestone (Phase 8 → 1.0.0)
};

/* ------------------------------------------------------------------
 * 2. The three parts (memorandum outline)
 * ------------------------------------------------------------------ */

export const parts = [
  {
    id: "part-1",
    title: "Introduction",
    divider: "Beginning.",
    scope: "Beginning, Foundation, United Club Association, Digital Era",
    baselineRange: [1, 8],
  },
  {
    id: "part-2",
    title: "The Nine Clubs",
    divider: "The Clubs.",
    scope: "Nine founding clubs, in registry order",
    baselineRange: [9, 42],
  },
  {
    id: "part-3",
    title: "Institutional Leadership & Conclusion",
    divider: null, // Part 3 opens directly with the Vice Principal slide
    scope: "Vice Principal, Principal, Closing Credits",
    baselineRange: [43, 46],
  },
];

/** Baseline total per the memorandum — reference only, engine computes the real total. */
export const baselineTotal = parts[parts.length - 1].baselineRange[1]; // 46

/* ------------------------------------------------------------------
 * 3. Part 2 openers (slides 9–10)
 * Kept here, not in intro.js: intro.js is strictly Part 1 (1–8).
 * The logo grid is derived from the club registry, so it can never
 * drift out of sync with the nine clubs.
 * ------------------------------------------------------------------ */

export const part2Openers = [
  {
    id: "the-clubs",
    part: "part-2",
    layout: "section",
    title: "The Clubs.",
  },
  {
    id: "founding-nine",
    part: "part-2",
    layout: "logo-grid",
    title: "The Founding Nine",
    items: clubs.map((club) => ({
      id: club.id,
      label: club.abbreviation,
      name: club.name,
      logo: logoPath(club.logo),
    })),
  },
];

/* ------------------------------------------------------------------
 * 4. Content manifest — the exact flatten order for js/engine.js (render section).
 *    type "module" → dynamic import of `file`, read `exportName`.
 *    type "inline" → slides already provided in `slides`.
 * ------------------------------------------------------------------ */

export const contentManifest = [
  { id: "intro",          part: "part-1", type: "module", file: "content/intro.js",      exportName: "intro" },
  { id: "part-2-openers", part: "part-2", type: "inline", slides: part2Openers },
  ...clubs.map((club) => ({
    id: club.id,
    part: "part-2",
    type: "module",
    file: club.contentFile,
    exportName: club.exportName,
  })),
  { id: "leadership",     part: "part-3", type: "module", file: "content/leadership.js", exportName: "leadership" },
];

/* ------------------------------------------------------------------
 * 5. Keyboard map (README keyboard controls — exact)
 * ------------------------------------------------------------------ */

export const keyboard = {
  next: ["ArrowRight", "PageDown", " "],
  previous: ["ArrowLeft", "PageUp"],
  first: ["Home"],
  last: ["End"],
};

/* ------------------------------------------------------------------
 * 6. Hash routing — "#/15" (number) and "#/uldc-foundation" (id)
 * ------------------------------------------------------------------ */

export const routing = {
  prefix: "#/",
  numberPattern: "^\\d+$", // route matching this → slide number (1-based)
  // anything else → slide id lookup
};

/* ------------------------------------------------------------------
 * 7. Animation — GSAP-driven (loaded via CDN, never npm).
 *    Lenis is intentionally excluded: the deck has no page scroll.
 *    Values below are consumed directly by gsap.to()/gsap.from().
 * ------------------------------------------------------------------ */

export const animation = {
  engine: "gsap",
  gsap: {
    cdn: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js",
    slideTransition: { duration: 0.7, ease: "power3.inOut" },   // exit + enter of a slide
    entrance: { duration: 0.55, ease: "power2.out", y: 24, stagger: 0.06 }, // child reveals
    progressBar: { duration: 0.35, ease: "power2.out" },
    counter: { duration: 0.25, ease: "power1.out" },
  },
  respectReducedMotion: true, // prefers-reduced-motion → all durations 0
};

/* ------------------------------------------------------------------
 * 8. Viewport targets (Phase 1 "definition of done" sizes)
 * ------------------------------------------------------------------ */

export const viewport = {
  designWidth: 1920,
  designHeight: 1080,
  breakpoints: [
    { id: "projector", width: 1920, height: 1080, ratio: "16:9", note: "Primary presentation target" },
    { id: "laptop",    width: 1366, height: 768,  ratio: "16:9", note: "Fallback display" },
    { id: "mobile",    width: 390,  height: 844,  ratio: "19.5:9", note: "Phone review" },
  ],
};

/* ------------------------------------------------------------------
 * 9. Asset directories (relative to index.html)
 * ------------------------------------------------------------------ */

export const assets = {
  fonts: "assets/fonts",
  logos: "assets/logos",
  images: "assets/images",
  icons: "assets/icons",
};

/* ------------------------------------------------------------------
 * 10. Slide counter format — "5 / 46"
 * ------------------------------------------------------------------ */

export const counter = {
  separator: " / ", // rendered as: (index + 1) + separator + total
};

/* ------------------------------------------------------------------
 * 11. People — credits (slides 45–46) and acknowledgments
 * ------------------------------------------------------------------ */

export const people = {
  projectLead: { name: "Sazidur Rahman",    role: "Project Lead & Developer" },
  host:        { name: "Sajid Islam Mahin", role: "Host & Head of Media Department" },
  institution: "University Laboratory School and College",
};