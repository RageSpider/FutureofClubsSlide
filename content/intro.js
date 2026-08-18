/**
 * content/intro.js
 * ==================================================================
 * Part 1 — The Introduction (slides 1–8).
 * Source of truth: Memorandum ULSC/UCA/2026-08.
 * Theme: "uca" — Starry Night (from uca_style.txt)
 * ==================================================================
 */

export const intro = [
  {
    id: "title",
    part: "part-1",
    layout: "cover",
    theme: "core",
    title: "The Future of Clubs",
    institution: "University Laboratory School and College",
    date: "20 August 2026",
    tagline: "The beginning, past, present, and future.",
  },
  {
    id: "beginning",
    part: "part-1",
    layout: "section",
    theme: "core",
    title: "Beginning.",
  },
  {
    id: "foundation",
    part: "part-1",
    layout: "text",
    theme: "core",
    title: "The Foundation",
    paragraphs: [
      "On 20 October 2024, the nine founding clubs of University Laboratory School and College were established. Each organization was born from a vision to create dedicated hubs for student enthusiasts, driven by a shared passion for innovation, skill development, and collaborative problem-solving.",
    ],
  },
  {
    id: "uca-logo",
    part: "part-1",
    layout: "logo",
    theme: "uca",
    title: "United Club Association",
    logo: "assets/logos/uca_logo.png",
    caption: "The umbrella organization uniting all clubs under one vision.",
  },
  {
    id: "initiative",
    part: "part-1",
    layout: "text",
    theme: "uca",
    title: "The Initiative",
    paragraphs: [
      "January 2025. Our commitment to collaboration and structure led to a pivotal moment. The ICT Club took the initiative to establish the United Club Association, an organization designed to manage and unify all clubs within the institution, positioning our community as a leader in student governance and innovation.",
    ],
  },
  {
    id: "uca-future",
    part: "part-1",
    layout: "section",
    theme: "uca",
    title: "Future of the United Club Association.",
  },
  {
    id: "evolution-digital-era",
    part: "part-1",
    layout: "timeline",
    theme: "uca",
    title: "Evolution and Digital Era",
    events: [
      {
        date: "Mid-Nov 2024",
        title: "The Foundation",
        text: "The journey began as the United Club Organization with a focused mandate to serve as a unified central body supporting all campus clubs.",
      },
      {
        date: "Jan 2025",
        title: "The Rebirth",
        text: "The organization rebranded to the United Club Association to reflect a more dynamic identity. Founder Sazidur Rahman architected and launched the comprehensive online infrastructure, marking the dawn of the digital era.",
      },
    ],
  },
  {
    id: "expansion-archiving",
    part: "part-1",
    layout: "timeline",
    theme: "uca",
    title: "Expansion and Archiving",
    events: [
      {
        date: "Aug 2025",
        title: "The Nationwide Expansion",
        text: "Driven by the goal to unify the student landscape, the association prepared to operate independently, shifting from a single campus entity to a nationwide platform connecting institutional clubs across Bangladesh.",
      },
      {
        date: "Aug 2026",
        title: "Structural Archiving",
        text: "The original association social media pages were rebranded as the ULAB Club Organization and placed under the administration of the Photography Club. The official website, email, and WhatsApp channels remain under the independent authority of the United Club Association.",
      },
    ],
  },
];