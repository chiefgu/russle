# /seo Hero Vignette — Design Spec

**Date:** 2026-07-06
**Status:** Design approved — pending spec sign-off
**Sibling of:** `docs/superpowers/specs/2026-07-06-ecommerce-vignette-design.md` (system established there: ServicePage `visual` slot, LaunchVisual idiom, float utilities)

## 1. Goal

Second composed vignette, on the `/seo` hero, reusing the `visual` slot and float utilities shipped with the ecommerce vignette. No copy changes on the page.

## 2. Honesty constraint

The `/seo` FAQ explicitly refuses "guarantee number one". The vignette shows a result **climbing** (second position, up arrow), never a #1 badge or trophy.

## 3. Component

New file `src/components/sections/SeoVignette.tsx` (server component, no `'use client'`):

- Export: `SeoVignette({ className }: { className?: string })`.
- Wrapper: `role="img"`, `aria-label="Search results with your site climbing the rankings, cited in AI answers and reported monthly."`, all internals `aria-hidden`.
- Local `CHIP` constant and local SVG `GoogleMark` (deliberate tiny duplication with EcommerceVignette — decorative components stay isolated; no shared marks module until a third consumer exists).
- **Main card — SERP mock** (same card shell as the storefront card: `bg` background, `radius-l`, line border, soft shadow, `w-[78%]` centered):
  - Pill search bar: lucide `Search` icon + one muted skeleton bar, `surface-2` background, pill radius.
  - Divider, then three result rows:
    - Rows 1 and 3: muted skeletons — small `surface-2` favicon dot + two bars (`surface-2` / `surface`).
    - Row 2 (yours): `accent-tint` panel, `radius-m`, accent favicon dot, slightly wider/darker bars, and a small circular accent badge with lucide `ArrowUp` on the right.
- **Four floating chips** (same absolute/rotation/float treatment as EcommerceVignette; positions mirrored — e.g. light chips on the right, dark pill on the left — so the two pages read as siblings, not copies):
  1. `GoogleMark` + "Found on Google" (light chip, `float-slow`).
  2. Lucide `Sparkles` + "Cited in AI answers" (light chip, `float-slowest`).
  3. Lucide `TrendingUp` + "Impressions climbing" — dark pill treatment (`--color-dark` background, on-dark text), `float-slower`.
  4. Lucide `CalendarCheck` + "Reported monthly" (light chip, `float-slow`).

## 4. Wiring

`src/app/(frontend)/seo/page.tsx`: import `SeoVignette`, render `<ServicePage data={data} visual={<SeoVignette />} />`. **No other changes to the page.**

## 5. Testing & verification

1. `src/service-pages.test.ts`: new describe block asserting `seo/page.tsx` renders `SeoVignette` (source-grep idiom).
2. `npx vitest run` all green (guard 8/8), `npx tsc --noEmit` clean, `npm run lint` 0 errors — tsc/lint foreground unsandboxed.
3. Visual check on `http://localhost:3005/seo` (user verifies). `/web-design` and `/ecommerce` unchanged.

## 6. Constraints (inherited)

No `£`, no em dashes, no tier names, no "ads" string, lowercase russle. Branch `reposition-web-ecommerce-seo`.
