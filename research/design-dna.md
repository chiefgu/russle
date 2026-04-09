# russle — Design DNA

Reference: Forerunner™ Webflow template (https://forerunner-template.webflow.io)
Source extraction: live CSS at `cdn.prod.website-files.com/.../forerunner-template.webflow.shared.3e1ddaf22.css`

---

## Aesthetic in one line

Premium, warm‑neutral, modern‑agency. A confident sans‑serif system on cream backgrounds with electric‑lime accents — refined rather than loud, designed to make small studios feel established.

---

## 1. Color system (exact tokens lifted from CSS)

| Token       | Hex      | Use                                                       |
|-------------|----------|-----------------------------------------------------------|
| `--dark`    | `#181E25`| Primary text, dark surfaces, button fills                 |
| `--bg-1`    | `#F8F7F5`| Default page background (warm off‑white, NOT pure white)  |
| `--bg-2`    | `#EFEDE6`| Secondary surface, cards, alternating sections            |
| `--bg-3`    | `#222229`| Inverted dark sections (footer, dark hero variants)       |
| `--light`   | `#FFFFFF`| On‑dark text, cards on dark surfaces                      |
| `--accent`  | `#D6FD70`| Electric lime — single accent, used sparingly             |
| `--red`     | `#FA4149`| Signal red — errors, optional secondary accent            |

Plus alpha tokens for each (`dark-8`, `dark-16`, `dark-32`, `dark-48`, `dark-64`, and matching `light-*`, `accent-16`, `accent-64`) for borders, hovers, dividers, and overlays.

**The non‑obvious move:** the page background is `#F8F7F5` — a warm off‑white with a hint of cream, not `#FFF`. Pure white is reserved for inverted contexts. This is what makes the template feel premium rather than templated.

---

## 2. Typography

**Font stack (template):** `Raveo` for everything, `Geist Mono` for monospaced labels and meta.

`Raveo` is a proprietary BYQ Studio typeface — we cannot ship it. The closest free, production‑ready substitutes (in order of fidelity):

1. **General Sans** (Fontshare, free) — geometric‑humanist, has the same restrained character widths and a full weight range. Closest match.
2. **Satoshi** (Fontshare, free) — slightly more geometric, also a strong fit.
3. **Inter** (Google Fonts) — universal fallback, slightly more neutral.

**Mono:** `Geist Mono` is open source (Vercel) — we use it directly.

### Type ramp (desktop / mobile)

| Style | Size       | Weight    | Line height | Tracking      |
|-------|------------|-----------|-------------|---------------|
| H1    | 72 / 48 px | 500 med   | 100%        | -4 / -3 px    |
| H2    | 48 / 36 px | 500 med   | 100%        | -3 / -2 px    |
| H3    | 40 / 32 px | 500 med   | 100%        | -1 px         |
| H4    | 32 / 28 px | 500 med   | 100%        | -2 / -1 px    |
| H5    | 28 / 24 px | 500 med   | 114 / 100%  | -1 px         |
| H6    | 24 / 20 px | 500 med   | 116 / 120%  | -0.5 px       |
| H7    | 20 / 16 px | 500 med   | 120 / 150%  | -0.5 px       |
| H8    | 16 / 12 px | 500 med   | 133 / 120%  | +2 px (caps)  |
| Big   | 24 / 20 px | 400 reg   | 140%        | -0.4 / 0 px   |
| Body  | 16 / 14 px | 400 reg   | 150%        | -0.25 px      |
| Small | 12 / 10 px | 400 reg   | 133%        | 0             |
| Label | 12 / 10 px | 600 sb    | 133 / 120%  | +1 px (caps)  |

**The defining typographic move:** every heading is **medium (500), not bold**, with aggressive negative letter‑spacing (−3 to −4 px on H1). This is what gives Forerunner its calm, expensive look. Bold + 0 tracking would feel cheap and shouty.

---

## 3. Spatial system

| Token                          | Values                            |
|--------------------------------|-----------------------------------|
| `--container-width--main`      | 1800 px                           |
| `--container-width--small`     | 900 px                            |
| `--site-padding--main`         | 16 / 24 / 32 px (mobile/tab/desk) |
| `--section-spacing--*`         | 48, 64, 80, 96, 120, 160 px        |
| `--section-spacing--hero-top`  | 120 / 160 px                      |
| `--title-margin-bottom--m`     | 32 → 80 px (responsive)           |

Wide containers (1800 px) with generous side padding — the layout breathes on large screens rather than feeling locked to a 1280 grid.

---

## 4. Radii

`2, 4, 8, 10, 12, 16, 20, 24, 30, 32 px` — and a `--radius--full: 100vw` pill option.

**Buttons use `--radius--32` (32 px)** — almost pill‑shaped at the body‑text scale. Cards use `16–24 px`. This gives a soft, friendly feel that contrasts with the tight, sharp typography.

---

## 5. Layout DNA — patterns observed across pages

### Homepage rhythm (Home A)
1. Centered hero — H1 + subtext + dual CTA buttons + 3 small feature callouts
2. Logo wall ("trusted by 150+ brands") — usually a marquee
3. Six‑card feature grid (2×3 or 3×2)
4. Image+text alternating block
5. Testimonial carousel
6. About / designer block
7. FAQ accordion (5–6 items)
8. Newsletter CTA
9. Multi‑column footer (Main / Company / Other / Social)

### About page
Hero → mission statement (single sentence as huge type) → three‑column principle row → image gallery carousel → 2‑col image+text → testimonial → CTA strip with decorative SVG

### Contact page
Two‑column: form (name / email / phone / message) on the left, info panel on the right with phone, email, address, social

### Pricing page
3 tiers (Essential / Expansion / Enterprise), monthly/annual toggle, FAQ below

### Stories (blog)
Featured post at top + grid of cards with category tags ("Design", "Webflow", "Figma"), no top filter bar — tags live on the cards themselves

---

## 6. Component patterns

- **Buttons** — pill (32 px radius), uppercase semibold 12–14 px label, +1 px tracking. Primary = dark fill on cream, secondary = bordered, ghost = link with arrow.
- **Cards** — `bg-2` (#EFEDE6) fill on `bg-1` page, 16–24 px radius, generous internal padding, often image‑top.
- **Tags / labels** — small caps, semibold, +1 px tracking, sometimes with a leading dot.
- **Dividers** — hairline `--dark-8` (#181E2514) — 8% opacity dark, never solid.
- **FAQ** — single‑column accordion, big tappable rows, plus icon that rotates.

---

## 7. Animation & interaction signature

From observed behavior on the live preview:
- Logo marquee scrolls horizontally on the social‑proof row
- Carousel for testimonials and image galleries (manual + auto)
- Hover lift on cards
- Fade‑up on scroll for sections (gentle, ~30 px translate, ~600 ms ease‑out)
- No hard parallax, no cursor follower, no aggressive scroll‑hijack — restraint is part of the brand

---

## 8. What this means for russle specifically

russle is a one‑person web design / development / branding studio, not an agency template shop. The template translation:

| Forerunner concept                  | russle translation                                          |
|-------------------------------------|-------------------------------------------------------------|
| "Buy Template" CTAs                 | "Start a project" / "Book a call"                           |
| "Trusted by 150+ brands" logo wall  | Real (or placeholder) client logo wall                      |
| Multi‑homepage variations           | Single strong homepage                                      |
| 3‑tier pricing with toggle          | Service packages OR project‑based "from £X" cards           |
| Stories blog                        | Case studies / journal — case studies are the priority      |
| Designer about block                | Founder/personal about — first‑person voice                 |
| Generic AI consulting copy          | Specific, opinionated copy about web/design/branding craft  |

**The look stays. The content gets specific.** That's the whole game.

---

## 9. Risks & deviations to consider

- **Raveo substitution risk:** General Sans is the closest, but it's not identical. The hero will feel ~90% there, not 100%.
- **Lime accent (#D6FD70)** is distinctive but polarising. If russle's brand should feel more sober or more serious (e.g. enterprise clients), we may want to swap to a deeper green, an off‑white, or a warm orange.
- **Cream backgrounds (#F8F7F5)** can clash with screenshots of client work that have white backgrounds. We may need to set client work mockups inside cards with `bg-2` framing.
- **No e‑commerce.** The Forerunner template ships an e‑commerce flow (cart, product, checkout). russle doesn't need this — we strip it.

---

## 10. Locked vs. open

**Locked (will not change without a strong reason):**
- Type ramp scale and the medium‑weight + tight tracking signature
- Spatial system (1800 max, 16/24/32 padding, 48–160 section spacing)
- Radii (32 buttons, 16–24 cards)
- The warm off‑white background convention

**Open for Phase 1d decision:**
- Exact font choice (General Sans vs Satoshi vs Inter)
- Exact accent colour (lime vs alternative)
- Whether to keep `bg-3` dark sections or stay light all the way through
