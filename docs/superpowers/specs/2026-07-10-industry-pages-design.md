# Industry landing pages ("Solutions" pattern) — design

**Date:** 2026-07-10
**Status:** approved pending user spec review
**Inspiration:** roboquill.io footer "Solutions" column linking industry-vertical landing pages.

## Goal

Add eight industry-vertical landing pages to russle.co.uk, each targeting a "web design for X" audience/keyword, linked from a new footer column. Each page must be visually compelling with a bespoke animated vignette (same craft level as `EcommerceVignette`) and must NOT read as a cookie-cutter template: block selection, order, and hero layout vary per page.

## Non-goals

- No navbar changes and no /industries hub page (footer-only entry points).
- No Payload CMS collection; pages are code-defined like the existing service pages.
- No "e-commerce stores" industry page; that audience is already served by `/ecommerce` (avoids keyword cannibalisation).
- No pricing on any page (consistent with service pages; enforced by test).

## Architecture

### Block system

- `src/content/industries.ts` — pure data, one typed entry per vertical: slug, footer label, meta title/description, H1, intro, hero variant, ordered block list, pains, build items, stats (optional), proof (optional case-study ref), FAQ items, JSON-LD. No component references; each page passes its vignette as a prop (same convention as `ServicePage`'s `visual`).
- `src/components/sections/IndustryPage.tsx` — renderer that walks the page's ordered block list. Reuses existing primitives (`Section`, `Tag`, `Reveal`, `FAQ`, `ButtonLink`, `CTAStrip`, `JsonLd`) and existing section idioms from `ServicePage`.
- `src/app/(frontend)/<slug>/page.tsx` — one thin file per vertical (matches service-page convention): defines `metadata`, imports its data entry + vignette, renders `IndustryPage`.
- `src/components/sections/vignettes/` — eight bespoke vignette components (see per-page specs). Built like `EcommerceVignette`: design tokens, floating chips (`float-slow`/`float-slower`), CSS/SVG only, no raster images, `role="img"` + `aria-label`, decorative internals `aria-hidden`.

### Block library

| Block | Source | Notes |
|---|---|---|
| `hero` | new, 3 variants | A: copy left, vignette right (ServicePage layout). B: copy centred, full-width vignette below. C: copy-only hero; vignette appears later as its own showcase section |
| `vignetteShowcase` | new | Full-width section framing the vignette mid-page (used with hero C) |
| `pains` | new | "Sound familiar?" 3 audience pain points |
| `build` | ServicePage "What you get" grid idiom | Deliverables tailored to the vertical |
| `stats` | new strip | Only real, sourced numbers (web-verified at implementation, cited in a footnote line) or omitted entirely. Never invented |
| `proof` | ServicePage case-study panel idiom | Links a real `/work/<slug>` case study |
| `reviews` | existing `Testimonial`/`ReviewsBlock` | For verticals without a case study |
| `faq` | ServicePage FAQ idiom | 4–6 vertical-specific questions; feeds FAQPage schema |
| `cta` | existing `CTAStrip` | Always last |

Every page includes `faq` + `cta`. Everything else varies. Section tones must alternate naturally (`bg`/`surface`) per page so rhythm differs.

## The eight pages

| # | Footer label | Slug | Hero | Block order (after hero) |
|---|---|---|---|---|
| 1 | Food & Drink | `/food-and-drink` | A | proof → pains → build → faq → cta |
| 2 | Hair & Beauty | `/hair-and-beauty` | B | pains → build → proof → faq → cta |
| 3 | Trades | `/trades` | C | stats → vignetteShowcase → build → faq → cta |
| 4 | Hospitality | `/hospitality` | A | build → pains → reviews → faq → cta |
| 5 | Dentists | `/dentists` | B | stats → pains → build → faq → cta |
| 6 | Financial Services | `/financial-services` | A | pains → build → stats → faq → cta |
| 7 | Solicitors | `/solicitors` | C | pains → vignetteShowcase → build → faq → cta |
| 8 | Fashion | `/fashion` | B | build → reviews → pains → faq → cta |

### Per-page detail

Headlines below are drafts; final copy is written at implementation and must pass voice rules. No page shows prices.

1. **Food & Drink** — bakeries, cake makers, producers, farm shops.
   H1 draft: "Websites that sell what you make."
   Vignette: product card (cake box / jar), toast chip "Order received, just now", chip "Collection Sat 9am", live stock count pill.
   Proof: `bethbakescakes` primary; mention `mums-granola`, `berry-boys`.
   Meta: web design for bakeries, food brands, farm shops.

2. **Hair & Beauty** — salons, MUAs, barbers, aesthetics.
   H1 draft: "A website that fills your diary."
   Vignette: booking diary filling up: week strip, "2:30pm, booked" chip, deposit-paid pill, floating 5-star review chip.
   Proof: `makeup-by-abigail`.

3. **Trades** — builders, electricians, landscapers, installers.
   H1 draft: "The website that wins you the job."
   Vignette (mid-page showcase): quote pipeline: job photo card (abstract), "Quote sent £2,400" → "Accepted" chip, before/after slider handle, "Review earned" 5-star chip. (£ appears only inside the vignette as illustrative UI, not as a price for russle services; the no-price test targets russle pricing copy — see Testing.)
   Stats: sourced trade-lead stats or omitted.

4. **Hospitality** — cafés, restaurants, bars.
   H1 draft: "More covers, fewer no-shows."
   Vignette: "Table for 4, 7:30pm confirmed" card, menu tile, order-at-table QR chip.
   Reviews block (no case study yet).

5. **Dentists** — dentists, clinics, private healthcare.
   H1 draft: "A website that books new patients."
   Vignette: new-patient enquiry card, recall-reminder chip, appointment calendar dot grid, "5.0 rating, 212 reviews" chip.

6. **Financial Services** — advisers, brokers, accountants.
   H1 draft: "A website that earns trust first."
   Vignette: calculator card with sliders and a monthly figure, "Consultation booked" chip, qualified-lead pill.

7. **Solicitors** — solicitors, law firms, chambers.
   H1 draft: "Serious work deserves a serious website."
   Vignette (mid-page showcase): enquiry triage: case-type selector card, "Callback today, 4pm" chip, padlock "Confidential enquiry" chip.
   NOTE: the word "practice" is banned by voice rules; use "firm" / "case type".

8. **Fashion** — fashion, apparel, accessories brands.
   H1 draft: "A storefront as sharp as the clothes."
   Vignette: editorial product tile with size pills, "Back in stock" notify chip, drop countdown timer.
   Cross-links `/ecommerce` for the store build itself.

## Footer

Add an `Industries` column to `FOOTER_COLUMNS` in `src/components/layout/Footer.tsx` with the eight links in the table order. Existing Services / Studio / Get started columns unchanged in content. Grid rebalance: the brand block drops from `md:col-span-5` to `md:col-span-4` so four link columns at `md:col-span-2` fit the 12-column grid (4 + 4×2 = 12). Verify with a visual check at md and lg.

## SEO

- `metadata` per page: title pattern "Web Design for <Audience>" (falls into the site title template), description with UK framing.
- JSON-LD per page: `Service` (like service pages, with `audience`) plus `FAQPage` built from the page's FAQ items.
- `src/app/sitemap.ts`: add the eight routes to `staticRoutes` at priority 0.8 with `siteModified` lastmod.
- All pages statically rendered (no dynamic segments).

## Testing & quality gates

- New `src/industry-pages.test.ts` mirroring `service-pages.test.ts`: for each of the 8 slugs — page file exists; exports `metadata`; renders `IndustryPage`; references its vignette component; footer contains all 8 hrefs; sitemap contains all 8 routes.
- No-price rule: pages must not state russle pricing. The industry test asserts no `£` in the data copy fields (h1/intro/pains/build/stats/faq) in `industries.ts`. Vignette components are exempt: the trades vignette's "£2,400" chip is illustrative UI fiction inside the diorama, not a price for russle services.
- `npm run check:voice` passes (no em dashes, no "practice", no overclaims, no emoji) across all new copy.
- `npm run test` and `npm run build` green.

## Cleanup (targeted, in scope)

Delete stray Finder-duplicate files: `src/app/(frontend)/web-design/page 2.tsx`, `src/components/sections/RelatedPosts 2.tsx`.

## Risks / open points

- Stats blocks depend on finding genuinely sourced numbers; pages fall back to omitting the block (structure allows it).
- Footer 4th column layout needs a visual pass at md/lg breakpoints.
- Eight bespoke vignettes are the bulk of the effort; they should be built one by one with screenshot QA against the brand tokens, matching the standard of `EcommerceVignette`.
