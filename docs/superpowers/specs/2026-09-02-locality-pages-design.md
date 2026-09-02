# Locality landing pages (local SEO drive) - design

**Date:** 2026-09-02
**Status:** built same day; Henry to review on dev server
**Context:** russle.co.uk ranks nowhere on page 1-2 for "web design cheshire / wilmslow / alderley edge" (checked 2026-09-02). The site has zero geo signals: no locality pages, no location metadata, no areaServed schema. Competitors on page 1 all have locality pages. This is the organic half of the local drive; the GBP service-area fix is handled separately.

## Goal

Nine locality landing pages targeting "web design {place}" queries across Cheshire and South Manchester, plus site-wide geo signals (metadata, schema, footer). Same architecture and craft bar as the industry pages: data-driven, block-varied, no two pages share a structure, no cookie-cutter feel.

## Non-goals

- No navbar changes (footer + internal links are the entry points).
- No pricing anywhere (repositioning guard bans it).
- No invented local claims. Only real facts: studio based in Alderley Edge, real Google rating, Berry Boys is a real Manchester client. No "we've built for N businesses in X".
- Client-site backlink credits are a separate task (each needs Henry's deploy approval).

## Architecture (mirrors industry pages)

- `src/content/locations.ts` - pure data, one typed entry per place: slug, label, meta, h1, intro, hero variant (A/B/C), ordered block list, grounding copy, six build items WRITTEN FOR THE PAGE (bodies and details unique across the site, test-enforced, so no two pages share body copy), optional statement/proof/towns, FAQ, Service schema with `areaServed` for the specific place.
- `src/components/sections/LocalityPage.tsx` - renderer walking the block list. Reuses `Section`, `Tag`, `Reveal`, `BentoGrid`, `ProofCard`, `ReviewsBlock`, `FAQ`, `CTAStrip`, `JsonLd`. Emits FAQPage schema. Tone planning mirrors `planTones`.
- `src/components/sections/vignettes/LocalVignette.tsx` - one parameterized vignette in THREE variants spread across the pages (listing card / results page with russle's row highlighted / a real Google review quoted). Server component; rating, count and review text come live from `getPlaceSummary()` so nothing goes stale.
- `src/app/(frontend)/web-design-<place>/page.tsx` - thin route per place.

### Blocks

hero (A/B/C as industry pages) · grounding (local narrative + studio-facts card with live rating) · towns (hubs only: town-by-town directory with a context line per place, linking down to every town page so authority flows through the hub) · build (Bento, 6 per-page items) · proof (real case study) · reviews (ReviewsBlock limit 3) · statement (accent one-liner) · areas (cross-link mesh to sibling pages) · faq · cta. Every page: faq + areas + cta, cta last. Block order and hero variant unique per page (test-enforced). Hubs run deeper than towns: 3+ grounding paragraphs and 5+ FAQs (test-enforced).

## The nine pages

| Page | Slug | Hero | Notes |
|---|---|---|---|
| Cheshire (hub) | `/web-design-cheshire` | B | county page, names the towns, richest copy |
| Manchester (hub) | `/web-design-manchester` | A | Berry Boys proof (real Manchester client, Deansgate + St Ann St) |
| Alderley Edge | `/web-design-alderley-edge` | A | home village, "based here" |
| Wilmslow | `/web-design-wilmslow` | B | biggest neighbouring commercial town |
| Knutsford | `/web-design-knutsford` | C | independents and boutiques |
| Macclesfield | `/web-design-macclesfield` | A | town businesses and makers |
| Altrincham | `/web-design-altrincham` | B | food scene, market town |
| Hale | `/web-design-hale` | C | premium local services |
| Didsbury | `/web-design-didsbury` | A | south Manchester independents |

## Site-wide geo signals (quick wins, same change)

- `layout.tsx` default title gains Cheshire; description names Alderley Edge / Cheshire / Manchester.
- Organization JSON-LD: add `areaServed` (the towns) and `sameAs` (Instagram, Google Business Profile maps URL, Trustpilot).
- Footer: full-width "Areas" strip above the copyright bar, driven by `LOCATION_LINKS`.
- Sitemap: nine routes at 0.8.

## Copy rules

Voice rules apply (no em dashes, no "practice", no overclaims, no emoji, studio is "we"). No £. British English. Per-town copy must be genuinely distinct: different h1, intro, grounding, FAQ angles.

## Testing

`src/locality-pages.test.ts` mirroring the industry test: nine slugs exist with metadata + LocalityPage + LocalVignette; copy fields never state a price; faq + cta present, cta last; areas mesh present; build grids are 6; icons exist in registry; structures unique; footer + sitemap wired.
