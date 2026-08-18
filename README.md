# The Future of Clubs

A custom-built, data-driven HTML/CSS/JS slide-deck for **University Laboratory School and College** — no PowerPoint.

**Doc ref:** `ULSC/UCA/2026-08` · **Presentation date:** 20 August 2026

![Status](https://img.shields.io/badge/status-in%20development-orange) ![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-blue) ![License](https://img.shields.io/badge/license-MIT-green)

---

## Contents

- [The Future of Clubs](#the-future-of-clubs)
  - [Contents](#contents)
  - [About](#about)
  - [Features](#features)
  - [Presentation outline](#presentation-outline)
    - [The Nine Clubs](#the-nine-clubs)
  - [Tech stack](#tech-stack)
  - [Project structure](#project-structure)
  - [Validation](#validation)
  - [Roadmap](#roadmap)
  - [Acknowledgments](#acknowledgments)
  - [License](#license)

---

## About

"The Future of Clubs" documents the history, current milestones, and future direction of student clubs at University Laboratory School and College. It is delivered as a modern web-based slide deck with smooth transitions, custom typography, responsive layouts, and keyboard navigation.

The project is **data-driven**: all slides are plain data files, and the rendering engine is shared and reusable. New slides can be added without touching the core engine.

Final presentation slides are in **full English**.

> ⚠️ **Design is provisional.** Fonts, icons, palette, layouts, and slide counts are not final. They may change at any time after discussions with club executives and administration.

---

## Features

- 🎞️ Slide-deck experience on the web (no PowerPoint)
- 📦 **Data-driven slides** — content lives in separate files; engine stays untouched
- 🔀 Smooth animated transitions between slides
- 🧩 Reusable slide layouts (cover, section, text, logo, timeline, logo-grid, club-title, bullets, quote-portrait, credits)
- 📱 Fully responsive — projector, laptop, tablet, and phone
- ⌨️ Keyboard navigation (← → PgUp PgDn Home End)
- 🔗 Hash-based routing (`#/15`)
- 🔢 Dynamic slide counter — numbering is computed, never hard-coded
- ✍️ Per-club content isolation — each club executive edits only their own file
- 🛡️ Built-in validation script (missing logos, duplicate IDs, broken image paths)
- 🔤 Fonts imported from **CDNFonts** or **Fontshare** (no self-hosting)
- 🎯 Icons from **Lucide** or **Feather** (loaded via CDN)

---

## Presentation outline

| Part | Title | Slides |
| --- | --- | --- |
| Part 1 | Introduction (Beginning, Foundation, United Club Association, Digital Era) | 1–8 |
| Part 2 | The Nine Clubs | 9–42 |
| Section 3 | Institutional Leadership & Conclusion (Vice Principal, Principal, Closing Credits) | 43–46 |

> Slide allocations are flexible. Club counts may go up or down within reasonable limits — numbering recalculates automatically from the data.

### The Nine Clubs

| # | Club | Abbreviation | Logo |
| --- | --- | --- | --- |
| 1 | University Laboratory Debate Club | ULDC | `uldc_logo.jpeg` |
| 2 | University Laboratory Photography Club | ULPC | `ulpc_logo.png` |
| 3 | University Laboratory Sports Club | ULSpC | `ulspc_logo.jpeg` |
| 4 | University Laboratory Quiz Club | ULQC | `ulqc_logo.png` |
| 5 | University Laboratory Science Club | ULScC | `ulscc_logo.png` |
| 6 | University Laboratory ICT Club | ULIC | `ulic_logo.png` |
| 7 | University Laboratory Language Club | ULLC | `ullc_logo.png` |
| 8 | University Laboratory Cultural Club | ULCC | `ulcc_logo.png` |
| 9 | University Laboratory Green Club | ULGC | `ulgc_logo.png` |

---

## Tech stack

- **HTML5** — single entry point (`index.html`)
- **CSS3** — custom properties (design tokens), Grid/Flexbox, keyframe animations
- **JavaScript (ES modules)** — rendering, routing, state, navigation
- **Fonts** — imported from **CDNFonts** or **Fontshare** via `<link>`/`@import`
- **Icons** — **Lucide** or **Feather** via CDN `<script>`/`<link>`

No frameworks. No npm. No Node.js. No build step. Just static files that run in any modern browser.

---

## Project structure

project/
├── index.html # Main presentation entry point
├── config/
│ ├── presentation.js # Global metadata: title, institution, date, part ranges
│ └── clubs.js # Club registry (id, name, logo file, order)
├── content/
│ ├── intro.js # Part 1 — slides 1–8
│ ├── leadership.js # Part 3 — slides 43–46
│ └── clubs/
│     ├── uldc.js # Debate Club
│     ├── ulpc.js # Photography Club
│     ├── ulspc.js # Sports Club
│     ├── ulqc.js # Quiz Club
│     ├── ulscc.js # Science Club
│     ├── ulic.js # ICT Club
│     ├── ullc.js # Language Club
│     ├── ulcc.js # Cultural Club
│     └── ulgc.js # Green Club
├── assets/
│   ├── logos/ # Exact filenames from the memorandum
│   │   ├── uca_logo.png
│   │   ├── uldc_logo.jpeg
│   │   ├── ulpc_logo.png
│   │   ├── ulspc_logo.jpeg
│   │   ├── ulqc_logo.png
│   │   ├── ulscc_logo.png
│   │   ├── ulic_logo.png
│   │   ├── ullc_logo.png
│   │   ├── ulcc_logo.png
│   │   └── ulgc_logo.png
│   └── images/ # club photos, portraits
├── css/
│   ├── foundation.css # Design tokens + base (colors, typography, reset, font/icon imports)
│   └── deck.css # Deck shell, layout grid, components, animations, print
├── js/
│   ├── engine.js # Bootstrap + core: main, state, render, templates
│   └── controls.js # Interaction + helpers: router, keyboard, progress, utils
├── scripts/
│   ├── validate.html # Browser-based validator (missing logos, duplicate IDs, broken paths)
│   └── check-links.html # Browser-based logo path checker (memorandum exact names)
├── README.md
└── roadmap.md
```

---

## Getting started

### Run locally

This is a static site — no server, no installs, no build step.

- **Option A** — double-click `index.html` and open it in any modern browser (Chrome, Edge, Firefox, Safari). Optionally, start any static file server (e.g. VS Code **Live Server** extension) if you prefer.
- **Option B** — open the project folder in VS Code → right-click `index.html` → **Open with Live Server**.

### Keyboard controls

| Key | Action |
| --- | --- |
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `PgDn` | Next slide |
| `PgUp` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |

---

## Editing club content

Each club has **its own content file** under `content/clubs/`:

| Club | File |
| --- | --- |
| ULDC | `content/clubs/uldc.js` |
| ULPC | `content/clubs/ulpc.js` |
| ULSpC | `content/clubs/ulspc.js` |
| ULQC | `content/clubs/ulqc.js` |
| ULScC | `content/clubs/ulscc.js` |
| ULIC | `content/clubs/ulic.js` |
| ULLC | `content/clubs/ullc.js` |
| ULCC | `content/clubs/ulcc.js` |
| ULGC | `content/clubs/ulgc.js` |

**Rules for executives:**

1. Edit **only** your club's file.
2. Do not modify files belonging to other clubs.
3. Each slide is a plain data object — no HTML/CSS/JS knowledge required.
4. Adding or removing slides in your file automatically renumbers the entire deck.
5. Use exact logo filenames from [The Nine Clubs](#the-nine-clubs).

Example slide:

```js
{
  id: "uldc-foundation",
  layout: "text",
  title: "Foundation",
  paragraphs: [
    "The University Laboratory Debate Club was founded on 20 October 2024..."
  ]
}
```

---

## Validation

Open `scripts/validate.html` in your browser — no npm, no Node.js required.

The validator checks:

- ✅ All 10 required logo files exist with exact names
- ✅ No duplicate slide IDs
- ✅ No broken image paths
- ✅ Club slide content stays within its allocated range

---

## Roadmap

See [roadmap.md](./roadmap.md) for the full build plan and milestones.

---

## Acknowledgments

- **Sazidur Rahman** — Project Lead & Developer
- **Sajid Islam Mahin** — Host & Head of Media department
- **All club executives** — Content contributions
- **University Laboratory School and College** — Administration

---

## License

MIT © University Laboratory School and College. See [LICENSE](LICENSE) (to be added).