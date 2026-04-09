# russle — Brand Direction (locked)

This is the locked output of Phase 1d. Phase 2 (`design-spec.json`) and Phase 3 (code) must conform to these tokens. Anything not specified here inherits from `design-dna.md`.

---

## 1. Color tokens

The palette keeps Forerunner's warm-cream foundation and substitutes the template's lime accent with russle's brand colour `#DF5613`. The dark surfaces are warmed slightly (more brown, less blue) so the dark/light flip stays harmonious with the orange accent.

| Token              | Hex          | Role                                                              |
|--------------------|--------------|-------------------------------------------------------------------|
| `--color-bg`       | `#F8F7F5`    | Default page background — warm cream, never pure white            |
| `--color-surface`  | `#EFEDE6`    | Cards, alternating sections, input fills                          |
| `--color-surface-2`| `#E6E2D6`    | Pressed/elevated surface, dividers on cream                       |
| `--color-text`     | `#1A1410`    | Primary text — warm near-black (replaces Forerunner's cool #181E25) |
| `--color-text-mute`| `#1A14108A`  | Secondary text (54% alpha)                                        |
| `--color-text-soft`| `#1A141052`  | Tertiary text, captions, meta (32% alpha)                          |
| `--color-line`     | `#1A141014`  | Hairline dividers (8% alpha)                                       |
| `--color-line-2`   | `#1A141029`  | Stronger borders (16% alpha)                                       |
| `--color-dark`     | `#1A1410`    | Inverted dark sections (footer, dark hero variant)                |
| `--color-dark-2`   | `#26201B`    | Card on dark surface                                              |
| `--color-on-dark`  | `#F8F7F5`    | Text on dark sections                                             |
| `--color-on-dark-mute`| `#F8F7F5A3`| Secondary text on dark (64% alpha)                                |
| **`--color-accent`**| **`#DF5613`**| **The brand. Single accent. Used sparingly.**                     |
| `--color-accent-hi`| `#F26A24`    | Hover / lighter for on-dark contexts                              |
| `--color-accent-lo`| `#B8430A`    | Pressed / active                                                  |
| `--color-accent-tint`| `#DF561314`| 8% accent on cream — subtle highlight backgrounds                  |
| `--color-on-accent`| `#FFFFFF`    | Text on accent fills (passes WCAG AA at body size)                |

**Retired from Forerunner:** the lime `#D6FD70`, the signal red `#FA4149` (the accent is warm-red-adjacent already), and the cool dark `#181E25`.

**Contrast checks** (WCAG):
- `#1A1410` on `#F8F7F5` — 17.0:1 (AAA)
- `#1A1410` on `#EFEDE6` — 14.7:1 (AAA)
- `#FFFFFF` on `#DF5613` — 4.65:1 (AA at 14 px+)
- `#1A1410` on `#DF5613` — 4.62:1 (AA at 14 px+) — usable for buttons but white reads stronger

**Accent rules:**
1. One accent fill per viewport, max. The orange has to *earn* its presence.
2. Accent tint (`#DF561314`) is fine for backgrounds — sparing not required.
3. Never use accent for body copy. CTAs, links on dark backgrounds, single highlight words, marquee dots.

---

## 2. Typography

| Role     | Family       | Source                                  |
|----------|--------------|-----------------------------------------|
| Display  | **Satoshi**  | Fontshare (free, OFL)                   |
| Body     | **Satoshi**  | Same family — single sans system        |
| Mono     | **Geist Mono** | Vercel (open source)                  |

**Loading:** self-host Satoshi from Fontshare's static download, Geist Mono via `geist/font` npm package or self-hosted. Avoid Google Fonts for Satoshi (not on GF). Variable font preferred for Satoshi.

**Weights to load:** Satoshi 400 / 500 / 700. Geist Mono 400 / 500.

### Type ramp (locked from Forerunner)

Satoshi inherits the same ramp as Forerunner — desktop / mobile sizes, all 500 medium weight on headings, aggressive negative tracking.

| Style | Size desktop / mobile | Weight | Line height | Tracking      |
|-------|----------------------|--------|-------------|---------------|
| H1    | 72 / 48 px           | 500    | 100%        | -4 / -3 px    |
| H2    | 48 / 36 px           | 500    | 100%        | -3 / -2 px    |
| H3    | 40 / 32 px           | 500    | 100%        | -1 px         |
| H4    | 32 / 28 px           | 500    | 100%        | -2 / -1 px    |
| H5    | 28 / 24 px           | 500    | 114 / 100%  | -1 px         |
| H6    | 24 / 20 px           | 500    | 116 / 120%  | -0.5 px       |
| Big   | 24 / 20 px           | 400    | 140%        | -0.4 / 0 px   |
| Body  | 16 / 14 px           | 400    | 150%        | -0.25 px      |
| Small | 12 / 10 px           | 400    | 133%        | 0             |
| Label | 12 / 10 px           | 700    | 133 / 120%  | +1 px (caps)  |

**Critical:** headings stay at **medium 500**, not bold. The aggressive negative tracking + medium weight is what gives the template its calm, expensive feel. Satoshi at 700 + 0 tracking would feel like a generic SaaS landing page.

---

## 3. Spatial system (locked from Forerunner)

| Token                              | Value                                |
|------------------------------------|--------------------------------------|
| `--container-main`                 | 1800 px max width                    |
| `--container-narrow`               | 900 px max width (long-form, contact)|
| `--padding-mobile / tablet / desk` | 16 / 24 / 32 px                      |
| `--section-xs / s / m / l / xl / xxl` | 48 / 64 / 80 / 96 / 120 / 160 px  |
| `--hero-top-padding`               | 120 / 160 px                         |
| `--title-margin-bottom`            | 32 → 80 px responsive                |

---

## 4. Radii

| Token        | Value   |
|--------------|---------|
| `--radius-xs`| 4 px    |
| `--radius-s` | 8 px    |
| `--radius-m` | 16 px   |
| `--radius-l` | 24 px   |
| `--radius-xl`| 32 px   |
| `--radius-pill` | 100vw |

**Buttons: 32 px (xl).** Cards: 16–24 px (m–l). Pill is reserved for tags and chip buttons.

---

## 5. Component direction

- **Buttons** — 32 px radius, uppercase Satoshi 700 at 12–14 px with +1 px tracking. Primary = `--color-text` fill on cream / `--color-accent` fill in featured slots. Secondary = bordered with `--color-line-2`. Ghost = link with arrow.
- **Cards** — `--color-surface` fill on cream, 16–24 px radius, generous padding (32–48 px), no shadows on light surfaces (the surface fill IS the elevation). On dark sections use `--color-dark-2`.
- **Tags / labels** — uppercase Satoshi 700, 10–12 px, +1 px tracking, often with a leading bullet `•` or accent dot.
- **Dividers** — `--color-line` (8% alpha), never solid black.
- **Links** — body links underlined with `text-decoration-thickness: 1px` and `text-underline-offset: 3px`. Hover swaps to `--color-accent`.
- **FAQ** — single column accordion, large tap targets, plus icon rotates 45° on open.
- **Inputs** — `--color-surface` fill, no border, 12 px radius, 16 px padding, focus ring uses `--color-accent` at 32% alpha.

---

## 6. Animation signature

Restraint. Inherited from Forerunner.

- Section reveal: 30 px translate-up + opacity 0 → 1, 600 ms `cubic-bezier(0.16, 1, 0.3, 1)`, IntersectionObserver-triggered, runs once
- Card hover: subtle 4 px lift + surface darken to `--color-surface-2`, 200 ms ease
- Marquee logo wall: linear infinite scroll, ~30 s loop, pause on hover
- Button hover: background darken (`--color-accent-lo` for accent buttons), no scale, no shadow growth
- **No** parallax, **no** custom cursor, **no** scroll-hijacking, **no** entrance animation on first paint above the fold

---

## 7. What this locks for Phase 2

Phase 2 (`design-spec.json`) must:
1. Use these tokens verbatim — no new colour values, no new font families, no new radii outside this scale.
2. Inherit the spatial scale and never go below `--section-xs` (48 px) for section vertical spacing.
3. Treat the accent as a scarce resource — the spec should explicitly call out where the accent appears on each page.
4. Not introduce gradients, shadows, or glassmorphism unless I explicitly add them here.

What's still open: the page list, the site type, the integrations, and the content for each section. That's the next conversation.
