# /ecommerce Hero Vignette + Shopify Positioning — Design Spec

**Date:** 2026-07-06
**Status:** Approved approach (A) — pending spec sign-off
**Reference:** Woo-style composed collage (`/Users/henry/Downloads/woo-sales.png`): a floating storefront card surrounded by overlapping chips, layered shadows, playful but tidy.

## 1. Goal

Add personality to russle.co.uk with composed UI-vignette illustrations, starting with ONE test vignette on `/ecommerce`. In the same change, reposition the `/ecommerce` page copy so "our own platform **or** a custom Shopify storefront" is explicit throughout, not buried in the FAQ.

If the test lands well, the same slot carries future vignettes on `/web-design` and `/seo` (out of scope here).

## 2. Constraints (inherited, binding)

- Repositioning guard (`src/repositioning-guard.test.ts`) bans in `src/`: `£`, em dash (—), `\bads\b`, "brand & growth agency", geo terms. New copy and the vignette must not trip it. **The mock product card therefore shows skeleton bars, never a price.**
- Voice: lowercase **russle**, studio "we", no tier names, no prices anywhere.
- "Shopify" is sanctioned nominative use: russle genuinely builds headless Shopify storefronts (e.g. Mum's Granola).
- Existing tests must stay green: `src/service-pages.test.ts`, `src/redirects.test.ts`, guard 8/8.

## 3. Architecture

### 3.1 ServicePage visual slot

`src/components/sections/ServicePage.tsx`:

- Signature becomes `{ data, visual }: { data: ServicePageData; visual?: ReactNode }`. `ServicePageData` is untouched (vignette is JSX, so it travels as a prop, not data).
- Hero section only: when `visual` is present, the hero wraps in `grid gap-12 lg:grid-cols-12` — copy block `lg:col-span-7`, visual block `lg:col-span-5` (self-center), visual stacking below the CTAs on mobile with `mt-12`.
- When `visual` is absent, the hero renders byte-identical to today. `/web-design` and `/seo` pass nothing.

### 3.2 EcommerceVignette component

New file `src/components/sections/EcommerceVignette.tsx` (server component, no `'use client'`), in the retired `LaunchVisual` idiom: token-driven JSX/Tailwind, no raster assets.

- Export: `EcommerceVignette({ className }: { className?: string })`.
- Wrapper: `role="img"` + `aria-label="A custom online store with checkout, order alerts and stock sync, built on our platform or as a Shopify storefront."`; every internal element `aria-hidden`.
- **Composition** (relative wrapper, `max-w-[460px]`):
  - **Storefront card** (main): `bg-[var(--color-bg)]`, `border-[var(--color-line)]`, `rounded-[var(--radius-l)]`, soft shadow. Contains: abstract product-image block (`bg-[var(--color-surface-2)]`, rounded, simple product silhouette in surface tones), wishlist heart chip (accent-tint circle + lucide `Heart`), carousel dots (one accent, rest line-2), two skeleton text bars, accent pill button labelled **"Add to basket"**.
  - **Floating chips** (absolutely positioned, small cards with `rounded-[var(--radius-m)]`, border, `bg-[var(--color-bg)]`, slight rotations ±2deg for collage feel):
    1. **Shopify chip** — Shopify bag mark (#95BF47) + "Custom Shopify builds".
    2. **Checkout pill** — dark pill carrying simplified Apple Pay and Google Pay marks.
    3. **Order notification** — green status dot + "Order received" + "just now" (muted).
    4. **Stock chip** — "Stock synced" + small count bar.
  - **SVG marks** (`ShopifyMark`, `ApplePayMark`, `GooglePayMark`) live as local, unexported components inside the same file — one file, one responsibility.
- **Motion:** CSS only. `@keyframes float-y` (translateY 0 → -5px → 0) added once to `globals.css`; chips use staggered durations/delays (6s / 7s / 8s), gated behind `motion-safe:`. Entry animation comes from the hero's existing `Reveal` wrappers. No new client boundary, no framer-motion surface, `whileInView` rule not applicable.

### 3.3 /ecommerce page changes

`src/app/(frontend)/ecommerce/page.tsx` renders `<ServicePage data={data} visual={<EcommerceVignette />} />` and takes the copy overhaul below.

## 4. Copy overhaul (exact strings)

- **intro:** "We build online shops on our own platform or as a custom Shopify storefront: products, stock, orders, and payments, with a dashboard and an iOS app so you run the shop from anywhere. No marketplace commission, no per-sale fee to a third party."
- **metaDescription:** "russle builds custom online stores for ambitious businesses across the UK, on our own platform or as a custom Shopify storefront. Products, stock, orders, payments, and a dashboard."
- **included[5]** (replaces "Optional extras"; its contents already live in the FAQ): `{ title: 'Our platform or Shopify', body: 'No monthly builder fee on ours, or a custom storefront on the Shopify store you already run.' }`
- **how[1]:** "We agree the storefront, the checkout, and whether it runs on our platform or Shopify."
- **faq[0].a** ("Is this Shopify?"): "It can be. Most stores run on our platform, which means no monthly builder fee and no per-sale cut. If you run Shopify or want to, we design and build a custom storefront on top of it, so you keep the Shopify checkout and admin you know."
- **schema.description:** "Custom online store design and build, on our own platform or as a headless Shopify storefront, for businesses across the UK."
- Everything else on the page (h1, tag, metaTitle, caseStudy, remaining cards/steps/FAQs) is unchanged.

## 5. Testing & verification

1. Extend `src/service-pages.test.ts`: one new assertion that the ecommerce page source renders `EcommerceVignette` (same source-grep idiom as the existing tests).
2. `npx vitest run` all green, guard 8/8 (Shopify/new copy must not trip bans).
3. `npx tsc --noEmit` and `npm run lint` clean (tsc/lint must run unsandboxed — sandboxed Node stalls).
4. Visual check on the running dev server (`http://localhost:3005/ecommerce`): vignette beside hero copy on desktop, stacked on mobile widths; chips float subtly; `prefers-reduced-motion` disables float; `/web-design` and `/seo` heroes unchanged.

## 6. Out of scope

- Vignettes for `/web-design`, `/seo`, home, work index (future iterations reuse the `visual` slot).
- Any change to the other service pages or shared sections beyond the ServicePage hero-slot addition.
