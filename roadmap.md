# Project Roadmap — "The Future of Clubs"

Phased build plan for the custom HTML/CSS/JS slide deck, from scaffold to the 20 August 2026 presentation day.

**Doc ref:** `ULSC/UCA/2026-08` · **Presentation date:** 20 August 2026

---

## Status

| Phase | Milestone | Status |
| --- | --- | --- |
| Phase 0 | Scaffolding & repository setup | ⏳ Not started |
| Phase 1 | Design system (tokens, fonts, base styles) — *provisional, pending executive feedback* | ⏳ Not started |
| Phase 2 | Deck engine (state, routing, navigation, progress) | ⏳ Not started |
| Phase 3 | Slide templates & rendering pipeline | ⏳ Not started |
| Phase 4 | Content collection (intro + 9 clubs) | ⏳ Not started |
| Phase 5 | Leadership & conclusion content | ⏳ Not started |
| Phase 6 | Asset collection & validation | ⏳ Not started |
| Phase 7 | Polish, testing, rehearsal | ⏳ Not started |
| Phase 8 | Final review & presentation day | ⏳ Not started |

---

## Phase 0 — Scaffolding & Repository Setup

**Goal:** Create the folder structure defined in [README.md](./README.md).

- [ ] Create `index.html` entry point with an empty deck container
- [ ] Create `config/` — `presentation.js` (global metadata) and `clubs.js` (club registry)
- [ ] Create `content/` — stub files for `intro.js`, `leadership.js`, and all 9 club files
- [ ] Create `assets/` folders: `logos/`, `images/`
- [ ] Create `css/` folder with 2 consolidated stylesheet placeholders (`foundation.css`, `deck.css`)
- [ ] Create `js/` folder with 2 consolidated module placeholders (`engine.js`, `controls.js`)
- [ ] Create `scripts/` folder with a pure-JS, browser-based validator

**Constraints:** No npm. No Node.js. No build step. The validator is a plain HTML/JS page that checks assets directly in the browser.

---

## Phase 1 — Design System *(Provisional)*

**Goal:** Establish the visual language **before** building any slides.

> ⚠️ **Note:** The design — fonts, palette, layout, and even slide counts — is **not final**. It may change at any time after conversations with club executives and administration. Treat everything below as a **starting point**, not a commitment.

- [ ] Discuss design direction with executives and administration
- [ ] Agree on final palette, typography, and overall mood (memorandum palette is only an initial reference: paper `#F5EFE2`, ink `#15202B`, red `#A93B2A`)
- [ ] Agree on font choices (memorandum uses Fraunces / Instrument Sans / Space Mono — subject to change), imported from **CDNFonts** or **Fontshare**
- [ ] Agree on icon set — **Lucide** or **Feather** (loaded via CDN, no local icon files)
- [ ] Define CSS custom properties in `css/foundation.css` (tokens section)
- [ ] Add base styles in `css/foundation.css` (base section): modern reset, base typography, `:focus-visible` states, selection color, font `@import` (CDNFonts/Fontshare) and icon library link (Lucide/Feather)
- [ ] Add deck shell styles in `css/deck.css` (deck section): full-viewport slide shell, fixed progress bar, slide counter chrome
- [ ] Add layout styles in `css/deck.css` (layout section): master grid, responsive breakpoints for 16:9, 4:3, mobile
- [ ] Add animation styles in `css/deck.css` (animations section): slide transitions, entrance reveals, `prefers-reduced-motion` fallback
- [ ] Add print styles in `css/deck.css` (print section): static print/PDF export of all slides

**Definition of done:** A test slide renders at 1920×1080, 1366×768, and 390×844, using a design **approved** by the executives.

---

## Phase 2 — Deck Engine

**Goal:** Build the reusable core so content stays 100% data-driven.

- [ ] `js/engine.js` (state section) — deck state object; slide index computed from flattened data, never hard-coded
- [ ] `js/controls.js` (utils section) — helpers: `clamp`, `debounce`, `slugify`, `findSlidesByClub`, `flattenSlides`
- [ ] `js/controls.js` (router section) — hash routing (`#/15`, `#/uldc-foundation`), deep-linking, initial-slide restoration
- [ ] `js/controls.js` (keyboard section) — `← → PgUp PgDn Home End` navigation with event cleanup
- [ ] `js/controls.js` (progress section) — dynamic counter (e.g. "5 / 46") and progress-bar width
- [ ] `js/engine.js` (render section) — pipeline: config + content → ordered slide array → DOM insertion
- [ ] `js/engine.js` (main section) — bootstrap sequence: load config → load content → render → start router

**Definition of done:** Keyboard navigation, counter, and deep links all work with stub content.

---

## Phase 3 — Slide Templates & Rendering

**Goal:** Build the reusable slide layouts.

- [ ] Implement slide builders in `js/engine.js` (templates section):
  - `cover` — title slide (Future of Clubs, institution, date, tagline)
  - `section` — part dividers ("Beginning", "The Clubs", etc.)
  - `text` — heading + paragraphs
  - `logo` — centered single logo + caption (UCA, club-title slides)
  - `timeline` — dated events ("Evolution and Digital Era": Nov 2024 → Jan 2025 → Aug 2025 → Aug 2026)
  - `logo-grid` — the nine-logo grid
  - `club-title` — club name + logo + slide-range badge
  - `bullets` — history/current-operations bullet lists
  - `quote-portrait` — Vice Principal (slide 43) and Principal (slide 44)
  - `credits` — thank-you, acknowledgments, conclusion (slides 45–46)
- [ ] Style each layout in `css/deck.css` (components section)
- [ ] Animate layout transitions in `css/deck.css` (animations section)

**Definition of done:** Every template renders correctly with dummy data across all three sections.

---

## Phase 4 — Content Collection (Club Files)

**Goal:** Populate the nine club content files from executive submissions.

- [ ] Distribute content templates to each club executive (only their own file is edited)
- [ ] Review and merge ULDC content (`content/clubs/uldc.js`)
- [ ] Review and merge ULPC content (`content/clubs/ulpc.js`)
- [ ] Review and merge ULSpC content (`content/clubs/ulspc.js`)
- [ ] Review and merge ULQC content (`content/clubs/ulqc.js`)
- [ ] Review and merge ULScC content (`content/clubs/ulscc.js`)
- [ ] Review and merge ULIC content (`content/clubs/ulic.js`)
- [ ] Review and merge ULLC content (`content/clubs/ullc.js`)
- [ ] Review and merge ULCC content (`content/clubs/ulcc.js`)
- [ ] Review and merge ULGC content (`content/clubs/ulgc.js`)
- [ ] Update `config/clubs.js` ranges to reflect **final** slide allocations decided with the executives

**Definition of done:** All club slides render; numbering is computed correctly and matches the agreed slide allocations.

---

## Phase 5 — Leadership & Conclusion Content

**Goal:** Add institutional slides.

- [ ] Collect Vice Principal portrait and text (slide 43)
- [ ] Collect Principal portrait and text (slide 44)
- [ ] Collect concluding message from Sajid Islam Mahin, Host & Head of Media (slides 45–46)
- [ ] Add to `content/leadership.js` using `quote-portrait` and `credits` layouts
- [ ] Request final administrative approval of wording

**Definition of done:** Slides 43–46 render with real portraits and approved text.

---

## Phase 6 — Assets & Validation

**Goal:** Verify all assets match the memorandum exactly.

- [ ] Collect the 9 club logos + UCA logo, ensuring exact filenames:
  - `uca_logo.png`, `uldc_logo.jpeg`, `ulpc_logo.png`, `ulspc_logo.jpeg`, `ulqc_logo.png`
  - `ulscc_logo.png`, `ulic_logo.png`, `ullc_logo.png`, `ulcc_logo.png`, `ulgc_logo.png`
- [ ] Optimize images (portraits, photos) for web delivery
- [ ] Import fonts from **CDNFonts** or **Fontshare** via `<link>`/`@import` (no self-hosting, no local font files)
- [ ] Wire up icon library — **Lucide** or **Feather** — via CDN `<script>`/`<link>` for UI/navigation icons
- [ ] Build `scripts/validate.html` — a **browser-based validator** (plain HTML/JS, no npm) that checks:
  - Missing logo files against the exact names above
  - Duplicate slide IDs
  - Broken image paths
  - Club slide range consistency
  - Invalid layout references

---

## Phase 7 — Polish, Testing & Rehearsal

**Goal:** Make the deck presentation-ready.

- [ ] Cross-browser testing (Chrome, Edge, Firefox, Safari)
- [ ] Device testing (projector 16:9, laptop, tablet, phone)
- [ ] Performance audit (image loading, animation smoothness on mid-range hardware)
- [ ] `prefers-reduced-motion` accessibility pass
- [ ] Keyboard-only walkthrough
- [ ] Rehearse full presentation flow with the host (Sajid Islam Mahin)
- [ ] Practice slide-jump navigation for Q&A

**Definition of done:** A full dry run completes without page reloads, lag, or broken slides.

---

## Phase 8 — Final Review & Presentation Day

**Goal:** Deliver on 20 August 2026.

- [ ] Final proofread of all English text
- [ ] Final visual QA on the actual projection setup
- [ ] **Freeze design and content** (no further edits after executive sign-off)
- [ ] Back up a static snapshot of the deck
- [ ] Present 🎉

**Definition of done:** The presentation runs flawlessly for the institution.

---

## Guardrails (do not break these)

1. **Slides must be full English** — no Bengali in the final deck.
2. **Slide numbering is never hard-coded** — it is computed from the data order.
3. **Club files stay isolated** — no executive edits another club's file.
4. **Logo filenames are exact** — per the memorandum; the browser validator enforces this.
5. **No PowerPoint** — the deck is pure HTML/CSS/JS.
6. **No npm / no Node.js** — dependencies are optional browser libraries (if any), loaded via `<script>`/`<link>`, never a package manager.
7. **Design is fluid until final sign-off** — fonts, palette, slide counts, and layout may change after any executive discussion.