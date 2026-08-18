/**
 * config/clubs.js
 * ==================================================================
 * Club registry — single source of truth for club order, names,
 * logos, content files, and baseline slide plans.
 * Source of truth: Memorandum ULSC/UCA/2026-08 (08 August 2026).
 *
 * STATUS: FINAL — nothing deferred.
 *
 * ⚠️ Logo filenames are EXACT per the memorandum. Do not rename.
 *    scripts/validate.html enforces this list.
 *
 * Slide-ID convention for content files: "<clubId>-<slug>",
 * e.g. "uldc-foundation". IDs must be unique across the whole deck.
 *
 * DATA CONTRACT (future files must use exactly these keys):
 *   clubs[].id / order / abbreviation / name → club-title template, logo-grid
 *   clubs[].logo + logoPath()                → <img> sources, validator
 *   clubs[].contentFile / exportName         → contentManifest dynamic imports
 *   clubs[].baselineRange                    → validator range check (reference)
 *   clubs[].slidePlan[]                      → executive content templates (Phase 4)
 * ==================================================================
 */

const LOGOS_DIR = "assets/logos";

export const clubs = [
  {
    id: "uldc",
    order: 1,
    abbreviation: "ULDC",
    name: "University Laboratory Debate Club",
    logo: "uldc_logo.jpeg",
    contentFile: "content/clubs/uldc.js",
    exportName: "uldc",
    baselineRange: [11, 14],
    slidePlan: [
      { baseline: 11, layout: "club-title", topic: "Title and Logo" },
      { baseline: 12, layout: "text",       topic: "Foundation" },
      { baseline: 13, layout: "bullets",    topic: "Current Operations and History" },
      { baseline: 14, layout: "bullets",    topic: "Future Initiatives" },
    ],
  },
  {
    id: "ulpc",
    order: 2,
    abbreviation: "ULPC",
    name: "University Laboratory Photography Club",
    logo: "ulpc_logo.png",
    contentFile: "content/clubs/ulpc.js",
    exportName: "ulpc",
    baselineRange: [15, 20],
    slidePlan: [
      { baseline: 15, layout: "club-title", topic: "Title and Logo" },
      { baseline: 16, layout: "text",       topic: "Foundation" },
      { baseline: 17, layout: "bullets",    topic: "History and Current Operations (1 of 3)" },
      { baseline: 18, layout: "bullets",    topic: "History and Current Operations (2 of 3)" },
      { baseline: 19, layout: "bullets",    topic: "History and Current Operations (3 of 3)" },
      { baseline: 20, layout: "bullets",    topic: "Future Initiatives" },
    ],
  },
  {
    id: "ulspc",
    order: 3,
    abbreviation: "ULSpC",
    name: "University Laboratory Sports Club",
    logo: "ulspc_logo.jpeg",
    contentFile: "content/clubs/ulspc.js",
    exportName: "ulspc",
    baselineRange: [21, 24],
    slidePlan: [
      { baseline: 21, layout: "club-title", topic: "Title and Logo" },
      { baseline: 22, layout: "text",       topic: "Foundation" },
      { baseline: 23, layout: "bullets",    topic: "History and Current Operations" },
      { baseline: 24, layout: "bullets",    topic: "Future Initiatives" },
    ],
  },
  {
    id: "ulqc",
    order: 4,
    abbreviation: "ULQC",
    name: "University Laboratory Quiz Club",
    logo: "ulqc_logo.png",
    contentFile: "content/clubs/ulqc.js",
    exportName: "ulqc",
    baselineRange: [25, 27],
    slidePlan: [
      { baseline: 25, layout: "club-title", topic: "Title and Logo" },
      { baseline: 26, layout: "text",       topic: "Foundation and History" },
      { baseline: 27, layout: "bullets",    topic: "Future Initiatives" },
    ],
  },
  {
    id: "ulscc",
    order: 5,
    abbreviation: "ULScC",
    name: "University Laboratory Science Club",
    logo: "ulscc_logo.png",
    contentFile: "content/clubs/ulscc.js",
    exportName: "ulscc",
    baselineRange: [28, 30],
    slidePlan: [
      { baseline: 28, layout: "club-title", topic: "Title and Logo" },
      { baseline: 29, layout: "text",       topic: "Foundation and Current Operations" },
      { baseline: 30, layout: "bullets",    topic: "Future Initiatives" },
    ],
  },
  {
    id: "ulic",
    order: 6,
    abbreviation: "ULIC",
    name: "University Laboratory ICT Club",
    logo: "ulic_logo.png",
    contentFile: "content/clubs/ulic.js",
    exportName: "ulic",
    baselineRange: [31, 34],
    slidePlan: [
      { baseline: 31, layout: "club-title", topic: "Title and Logo" },
      { baseline: 32, layout: "text",       topic: "Foundation" },
      { baseline: 33, layout: "bullets",    topic: "History and Current Operations" },
      { baseline: 34, layout: "bullets",    topic: "Future Initiatives" },
    ],
  },
  {
    id: "ullc",
    order: 7,
    abbreviation: "ULLC",
    name: "University Laboratory Language Club",
    logo: "ullc_logo.png",
    contentFile: "content/clubs/ullc.js",
    exportName: "ullc",
    baselineRange: [35, 37],
    slidePlan: [
      { baseline: 35, layout: "club-title", topic: "Title and Logo" },
      { baseline: 36, layout: "text",       topic: "Foundation and History" },
      { baseline: 37, layout: "bullets",    topic: "Future Initiatives" },
    ],
  },
  {
    id: "ulcc",
    order: 8,
    abbreviation: "ULCC",
    name: "University Laboratory Cultural Club",
    logo: "ulcc_logo.png",
    contentFile: "content/clubs/ulcc.js",
    exportName: "ulcc",
    baselineRange: [38, 39],
    slidePlan: [
      { baseline: 38, layout: "club-title", topic: "Title and Logo" },
      { baseline: 39, layout: "bullets",    topic: "Foundation, History, and Future Initiatives" },
    ],
  },
  {
    id: "ulgc",
    order: 9,
    abbreviation: "ULGC",
    name: "University Laboratory Green Club",
    logo: "ulgc_logo.png",
    contentFile: "content/clubs/ulgc.js",
    exportName: "ulgc",
    baselineRange: [40, 42],
    slidePlan: [
      { baseline: 40, layout: "club-title", topic: "Title and Logo" },
      { baseline: 41, layout: "text",       topic: "Foundation and History" },
      { baseline: 42, layout: "bullets",    topic: "Future Initiatives" },
    ],
  },
];

/* ------------------------------------------------------------------
 * United Club Association — Part 1 (slide 4) and founding narrative
 * ------------------------------------------------------------------ */

export const uca = {
  name: "United Club Association",
  formerName: "United Club Organization", // until the January 2025 rebrand
  logo: "uca_logo.png",
  founded: "Mid-November 2024",
  rebranded: "January 2025",
  founder: "Sazidur Rahman",
};

/* ------------------------------------------------------------------
 * Derived data
 * ------------------------------------------------------------------ */

/** All 10 required logo filenames (UCA + nine clubs) — validator input. */
export const requiredLogos = [uca.logo, ...clubs.map((club) => club.logo)];

/** Number of registered clubs. */
export const CLUB_COUNT = clubs.length; // 9

/* ------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------ */

/** Resolve a club by id (e.g. "uldc"). Returns undefined if unknown. */
export function getClub(id) {
  return clubs.find((club) => club.id === id);
}

/** Resolve a club by presentation order (1–9). */
export function getClubByOrder(order) {
  return clubs.find((club) => club.order === order);
}

/** Path to any logo file, relative to index.html. */
export function logoPath(filename) {
  return `${LOGOS_DIR}/${filename}`;
}

/** Path to a club's own logo by club id. Returns null if unknown. */
export function clubLogoPath(clubId) {
  const club = getClub(clubId);
  return club ? logoPath(club.logo) : null;
}

/** Baseline slide count for a club (reference for the validator). */
export function baselineSlideCount(clubId) {
  const club = getClub(clubId);
  if (!club) return 0;
  const [start, end] = club.baselineRange;
  return end - start + 1;
}