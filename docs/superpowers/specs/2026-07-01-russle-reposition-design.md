# russle reposition — Web Design, Ecommerce & SEO

**Date:** 2026-07-01
**Status:** Approved design, ready for implementation planning
**Repo:** `russle-site` (branch `reposition-web-ecommerce-seo`)

## 1. Goal

Reposition the russle.co.uk site away from a "brand & growth agency" and onto three
findable services: **Web Design, Ecommerce, and SEO**. Branding is no longer a sold
service or headline. The build-then-retain money model is preserved but expressed in
plain language, with **no pricing anywhere on the site**.

This is a positioning + copy + information-architecture change. It is **not** a visual
redesign and **not** the audit bug-fix work (see §8).

## 2. Decisions log

Locked with the owner during brainstorming (2026-07-01):

1. **Offer shape:** services front (Web Design / Ecommerce / SEO), build→retain money model underneath. Not a reworded-tiers approach, not a full per-service-pricing rebuild.
2. **SEO scope:** general / organic SEO (technical, content, rankings) with GEO folded in. Local/Maps/GBP de-emphasised, not the lead.
3. **Case studies:** keep all, reframe each around the website / store / SEO outcome; brand work becomes supporting detail, never the headline.
4. **AI:** GEO folds into the SEO service; standalone AI features (chatbot, smart booking) become a minor add-on under Web Design / custom builds, not a headline.
5. **Branding line:** russle still *delivers* identity/logo work when a project needs it (as it did for Loop), but does not *sell* or *focus on* it. One soft "we can handle identity if your project needs it" line only.
6. **Pricing:** none on the site. No £ figures, no tier prices. The tier names (Launch / Grow / Manage) are retired along with the pricing page. CTAs are enquiry-led.
7. **Descriptor:** "studio" — "a web design, ecommerce & SEO studio." (This intentionally overrides an earlier note that preferred "we/agency" over "studio"; owner's call.)

## 3. Positioning spine

**Descriptor:** a national **web design, ecommerce & SEO studio** for ambitious businesses.
Voice unchanged: lowercase "russle", studio "we", no em dashes, no "practice", no "ads",
no narrow-industry framing.

**The three services and how they behave commercially:**

| Service | What it is | Money model |
|---|---|---|
| **Web Design** | Fast, custom, conversion-focused websites built from scratch on the russle platform | One-off **build** |
| **Ecommerce** | Online stores on the russle platform — products, stock, orders, payments, dashboard + iOS app | One-off **build** |
| **SEO** | Organic + technical SEO, content, rankings, reporting, and GEO (AI-search visibility) | Ongoing **retainer** |

**Where the de-emphasised things go (quiet, never headline):**
- **Branding / identity** → not a service, not a pillar, not in the nav. A single soft line where relevant: *"Need a logo or identity? We can handle that as part of a project."* Loop-style identity stays deliverable.
- **AI** → GEO lives inside the SEO service. AI features (chatbot, smart booking) are an add-on mentioned under Web Design / custom builds.
- **Local SEO / Maps / Google Business Profile** → reframed as a sub-capability inside organic SEO, not the lead.

**Hero direction (copy refined during build):**
> **"Websites, online stores, and the SEO that gets them found."**
> russle designs and builds fast, custom sites and stores for ambitious businesses, then runs the SEO that keeps customers coming.

## 4. Information architecture

**Primary nav:** `Web Design · Ecommerce · SEO · Work · About · [Start a project]`

**New pages** (the core of "services front"):
- `/web-design` — what it is → what you get → proof → CTA
- `/ecommerce` — same structure, store-specific
- `/seo` — same structure, includes GEO and (as a sub-capability) local SEO

Each service page: definition → what's included → relevant case study proof → enquiry CTA. No prices.

**Keep, reframe:**
- `/` home — services-led (see §5)
- `/work` + `/work/[slug]` — case studies reframed to build/store/SEO outcomes
- `/about`, `/contact`, `/start` (intake), `/blog` + `/blog/[slug]`, `/conversion` (supports Web Design + SEO)

**Retire → 301 redirect** into the new structure:
- `/launch`, `/grow`, `/manage` → their content folds into the three service pages + a numbers-free "How we work" section
- `/services` (pricing/comparison) → retired; redirect to `/`

**Park:** `/partners` — currently dead local-partnership copy; either repurpose for referral partners later or unpublish. Low priority, not blocking.

**Redirect targets (add to `next.config.ts`):**
- `/launch` → `/web-design`
- `/grow` → `/seo`
- `/manage` → `/seo`
- `/services` → `/`

The existing town-page and `/journal` redirects stay.

## 5. Commercial model (no pricing)

The build→retain engine is preserved and remains the MRR driver, just de-priced and de-jargoned:

- **Build** (Web Design or Ecommerce) = a one-off project.
- **Retainer** (SEO + care) = the ongoing relationship a build rolls into.
- No tier names, no £ figures, no comparison-by-price table.
- A numbers-free **"How we work"** section/page explains: we build the site or store, then keep it found and healthy with an ongoing SEO retainer.
- **CTAs:** primary **"Start a project"** (`/start` intake), secondary **"Get in touch"** (`/contact`). Quotes happen after enquiry, off-site.

## 6. Content rewrite scope (this spec)

**Home (`/`):**
- `Hero` — new headline/sub per §3.
- `Capabilities` — rework into the three services as the spine, with AI features / booking as minor extras; drop the "Local SEO and Google Business" card as a headline (fold into SEO).
- `CaseStudyShowcase` — unchanged component, reframed case-study data.
- `OfferBlock` — reframe to the build→retain story, no prices.
- `ProcessSteps` → numbers-free "How we work".
- `FAQSection` — remove price-anchored and brand-default questions.
- `CTAStrip` — enquiry-led.

**Service pages:** build `/web-design`, `/ecommerce`, `/seo` (§4).

**Case studies:** reframe all six MDX files in `src/content/work/` to lead with the website/store/SEO outcome; brand work as supporting detail. Fix founder first-person "I/me" → studio "we" (audit voice finding).

**Metadata, nav, footer:** rewrite every title/description to drop prices and "brand agency", lead on web/ecommerce/SEO. `metadataBase` stays.

**Copy hygiene:** remove "the studio that designed the brand" phrasing and similar brand-led framing throughout retained copy; remove "ads" wording; keep copy em-dash-free.

## 7. SEO / structured data

- **Add `Organization` JSON-LD** sitewide — the audit found none, and dogfooding matters now that SEO is the headline service. `Organization` (not the local `ProfessionalService` subtype) fits the national positioning. Use `sameAs` to social/GBP; **no self-serving `aggregateRating`** (audit rule).
- **Add `Service` JSON-LD** per service page (Web Design, Ecommerce, SEO).
- Add `BreadcrumbList` where sensible.
- Update `sitemap.ts` to include the three new service pages and drop the retired tier/services routes.
- Confirm `robots.ts` unchanged (already correct).

## 8. Audit reconciliation

**Resolved for free by this reposition:**
- "local SEO" positioning debt → reframed into organic SEO.
- Voice violations: founder-"I" in case studies, "ads" wording, retired Cheshire/South-Manchester self-positioning in blog seed content → rewritten.
- Price-consistency-across-hero/meta/nav concern → moot (no prices).
- `public/locality/` dead town imagery (~3.5MB) and the never-rendered `WhyRussle` component → deleted.
- Extend the `repositioning-guard` test to scan `scripts/` (seed content), not just `src/`, and fix its em-dash check timeout.

**Stays as SEPARATE bug work (NOT this spec — own plan, recommended BEFORE shipping copy onto a crashable site):**
- CRITICAL: missing `posts_faq` migration.
- CRITICAL: Payload draft exposure (public GraphQL playground + `read: () => true` on Posts/Categories).
- Missing `error.tsx` / `global-error.tsx` boundaries.
- Analytics: `trackConversion()` on ContactForm + gate Vercel `<Analytics/>` behind consent.
- `next/image` migration, `Reveal`/`Stagger` negative viewport margin, Satoshi font preload, `--color-text-mute` contrast.
- Cron auth when `CRON_SECRET` unset; confirmation email to unverified address; `randomise-times.ts` UTC/UK-time drift.

## 9. Out of scope (YAGNI)

- No visual redesign, no new design tokens, no new photography.
- No commerce-backend changes.
- No pricing/quote calculator.
- No new case studies or new client work.
- The audit bug-fixes above (tracked separately).

## 10. Risks / open questions

- **Crash risk before launch:** shipping new copy onto a site with the unresolved `posts_faq` migration + no error boundary risks a visible production crash. Recommendation: run the two-critical "stabilise" pass first.
- **`/partners` fate** unresolved (park vs repurpose) — non-blocking.
- **Case-study proof mapping:** confirm which case study anchors each service page (e.g. Berry Boys → Ecommerce, Loop → Web Design) during the plan.

## 11. Success criteria

- Nav, home, and three service pages present russle as a web design, ecommerce & SEO studio; branding appears nowhere as a sold service.
- No £ figures or tier names anywhere in the shipped site.
- SEO reads as organic/technical + GEO; no local-SEO-as-lead copy remains.
- Case studies lead on build/store/SEO outcomes; no founder-"I" in public copy.
- Retired routes 301 correctly; `Organization` + per-service `Service` JSON-LD validate.
- `repositioning-guard` test passes (including `scripts/`) and no longer times out.
