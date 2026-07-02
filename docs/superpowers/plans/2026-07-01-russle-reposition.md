# russle Reposition (Web Design, Ecommerce & SEO) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition russle.co.uk from a "brand & growth agency" to a web design, ecommerce & SEO studio, leading with three findable services and removing branding-as-a-service and all on-site pricing.

**Architecture:** Static/SSG Next.js App Router marketing site. Add three service pages built from one shared `ServicePage` component (data-driven, DRY). Rewrite global chrome (nav, footer, layout metadata) and the home sections. Retire the tier pages via 301s. Reframe the six case-study MDX files. Add `Organization` + per-service `Service` JSON-LD. Keep the build→retain model in plain language with no prices.

**Tech Stack:** Next.js 16 (App Router, React 19), TypeScript, Tailwind CSS 4 (`@theme`), framer-motion, Payload CMS 3 (untouched here), vitest.

## Global Constraints

Copied verbatim from the spec (`docs/superpowers/specs/2026-07-01-russle-reposition-design.md`). Every task must honour all of these:

- Brand name is always lowercase **russle**.
- Descriptor: **"web design, ecommerce & SEO studio"**. "studio" is allowed; "agency" only when referring to *other* agencies.
- **No em dashes (—)** anywhere in user-facing copy. Use commas, full stops, colons.
- **No prices, no £ figures, no tier names** (Launch / Grow / Manage) in shipped copy.
- **No "practice"** as a noun for russle; **no "ads"** as a marketed service.
- Public copy uses studio **"we"**, never founder "I" (client testimonials may keep "I").
- **Branding is not sold or led on**; at most one soft "we can handle identity if your project needs it" line.
- **SEO = organic/technical + content + GEO**; local SEO only as a sub-capability, never the lead.
- **No self-serving `aggregateRating`** in russle's own JSON-LD; use `sameAs`.
- framer-motion `whileInView` uses `viewport={{ once: true, amount: 0.01 }}`; never negative margins.
- Verification commands (run from `russle-site/`): `npx tsc --noEmit`, `npm run lint`, `npm test` (vitest), single file `npx vitest run <path>`. Branch: `reposition-web-ecommerce-seo`.

> **Note on the audit bugs:** the critical bugs (missing `posts_faq` migration, Payload draft exposure, missing error boundaries, analytics consent) are OUT of this plan and tracked separately (spec §8). A short "stabilise" plan should run before this ships.

---

## Phase 1 — Redirects, sitemap & the guard net

### Task 1: Repoint town-page redirects, add tier redirects, update the redirect test

The retired town pages currently 301 to `/services`, but this reposition deletes `/services`. Point them directly at a live page (`/web-design`) to avoid a redirect chain, and add 301s for the retired tier/services routes.

**Files:**
- Modify: `next.config.ts` (the `redirects()` array)
- Modify: `src/redirects.test.ts`

**Interfaces:**
- Produces: live 301s `/services → /`, `/launch → /web-design`, `/grow → /seo`, `/manage → /seo`, and town pages `→ /web-design`.

- [ ] **Step 1: Update the redirect test first**

In `src/redirects.test.ts`, change the town-page destination from `/services` to `/web-design`, and add a block asserting the new tier redirects. Replace the file body (keep imports) with:

```ts
const CONFIG = readFileSync(path.resolve(__dirname, '..', 'next.config.ts'), 'utf8');

const RETIRED = [
  '/web-design-alderley-edge',
  '/web-design-altrincham',
  '/web-design-chester',
  '/web-design-didsbury',
  '/web-design-hale',
  '/web-design-knutsford',
  '/web-design-macclesfield',
  '/web-design-prestbury',
  '/web-design-wilmslow',
  '/south-manchester-cheshire-brand-web-design',
];

function assertRedirect(source: string, destination: string) {
  const re = new RegExp(
    `source:\\s*'${source.replace(/[/-]/g, '\\$&')}'[\\s\\S]{0,120}?destination:\\s*'${destination.replace(/[/-]/g, '\\$&')}'[\\s\\S]{0,60}?permanent:\\s*true`,
  );
  return re.test(CONFIG);
}

describe('retired locality redirects', () => {
  for (const source of RETIRED) {
    it(`301s ${source} to /web-design`, () => {
      expect(assertRedirect(source, '/web-design')).toBe(true);
    });
  }
});

describe('retired tier + services redirects', () => {
  const TIER: [string, string][] = [
    ['/services', '/'],
    ['/launch', '/web-design'],
    ['/grow', '/seo'],
    ['/manage', '/seo'],
  ];
  for (const [source, dest] of TIER) {
    it(`301s ${source} to ${dest}`, () => {
      expect(assertRedirect(source, dest)).toBe(true);
    });
  }
});
```

- [ ] **Step 2: Run the test, expect failure**

Run: `npx vitest run src/redirects.test.ts`
Expected: FAIL (town pages still point to `/services`; tier redirects missing).

- [ ] **Step 3: Update `next.config.ts` redirects**

Replace the town-page entries' `destination: '/services'` with `destination: '/web-design'`, and append the tier redirects. The `redirects()` return array becomes:

```ts
async redirects() {
  return [
    { source: '/journal', destination: '/blog', permanent: true },
    { source: '/journal/:slug', destination: '/blog/:slug', permanent: true },
    // Retired local SEO pages now point at the web design service.
    { source: '/web-design-alderley-edge', destination: '/web-design', permanent: true },
    { source: '/web-design-altrincham', destination: '/web-design', permanent: true },
    { source: '/web-design-chester', destination: '/web-design', permanent: true },
    { source: '/web-design-didsbury', destination: '/web-design', permanent: true },
    { source: '/web-design-hale', destination: '/web-design', permanent: true },
    { source: '/web-design-knutsford', destination: '/web-design', permanent: true },
    { source: '/web-design-macclesfield', destination: '/web-design', permanent: true },
    { source: '/web-design-prestbury', destination: '/web-design', permanent: true },
    { source: '/web-design-wilmslow', destination: '/web-design', permanent: true },
    { source: '/south-manchester-cheshire-brand-web-design', destination: '/web-design', permanent: true },
    // Retired tier + pricing pages (reposition 2026-07-01).
    { source: '/services', destination: '/', permanent: true },
    { source: '/launch', destination: '/web-design', permanent: true },
    { source: '/grow', destination: '/seo', permanent: true },
    { source: '/manage', destination: '/seo', permanent: true },
  ];
},
```

- [ ] **Step 4: Run the test, expect pass**

Run: `npx vitest run src/redirects.test.ts`
Expected: PASS (20 tests).

- [ ] **Step 5: Commit**

```bash
git add next.config.ts src/redirects.test.ts
git commit -m "feat(reposition): repoint town redirects, add tier 301s"
```

### Task 2: Fix and extend the repositioning guard test

The guard walks `src/` only and re-reads every file once per banned term (5×), including the huge generated `payload-types.ts`, which is why it times out. Read each file once, skip generated/large files, and also scan `scripts/`.

**Files:**
- Modify: `src/repositioning-guard.test.ts`

- [ ] **Step 1: Rewrite the guard for performance + scripts coverage**

Replace the whole file with:

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const SRC = path.resolve(__dirname);
const SCRIPTS = path.resolve(__dirname, '..', 'scripts');

// Retired in this reposition or generated — excluded from the copy scan.
const DOOMED = [
  'content/locality',
  'app/(frontend)/web-design-',
  'app/(frontend)/south-manchester-cheshire-brand-web-design',
  'components/sections/LocalityPage.tsx',
  'components/sections/RegionHub.tsx',
  'lib/locality.ts',
];
// Generated or machine files that legitimately contain long strings / dashes.
const IGNORED = [
  'payload-types.ts',
  'migrations/',
  'importMap.js',
];

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === 'node_modules' || entry === '.next') continue;
      walk(full, acc);
    } else if (/\.(tsx?|mdx)$/.test(entry) && !entry.endsWith('.test.ts')) {
      acc.push(full);
    }
  }
  return acc;
}

function scannedFiles(): string[] {
  const files = [...walk(SRC), ...walk(SCRIPTS)];
  return files.filter((f) => {
    const rel = f;
    return (
      !DOOMED.some((d) => rel.includes(d)) &&
      !IGNORED.some((g) => rel.includes(g))
    );
  });
}

const BANNED: { label: string; re: RegExp }[] = [
  { label: 'em dash', re: /—/ },
  { label: 'independent business framing', re: /independent\s+business|\bindependents\b/i },
  { label: 'self geo: Alderley Edge', re: /Alderley Edge/ },
  { label: 'self geo: Cheshire', re: /Cheshire/ },
  { label: 'self geo: South Manchester', re: /South Manchester/ },
];

describe('national repositioning guard', () => {
  // Read every file once; test all banned terms against each. O(files), not O(files*terms).
  const contents = scannedFiles().map((f) => ({ rel: path.relative(path.resolve(__dirname, '..'), f), text: readFileSync(f, 'utf8') }));
  for (const { label, re } of BANNED) {
    it(`has no "${label}" in retained source`, () => {
      const hits = contents.filter((c) => re.test(c.text)).map((c) => c.rel);
      expect(hits, `Found "${label}" in:\n${hits.join('\n')}`).toEqual([]);
    });
  }
});
```

- [ ] **Step 2: Run the guard, expect pass and fast**

Run: `npx vitest run src/repositioning-guard.test.ts`
Expected: PASS, completes in well under 5s (no timeout). If "Cheshire"/"South Manchester" hits appear in `scripts/seed-*.ts`, that is expected and gets fixed in Task 15; temporarily note the failing files and proceed — do NOT weaken the guard.

> If Step 2 reports hits in `scripts/`, that is the guard correctly catching seed debt. Leave the guard as-is; Task 15 fixes the content and this test goes green then. Commit the guard mechanics now regardless (the timeout fix stands on its own).

- [ ] **Step 3: Commit**

```bash
git add src/repositioning-guard.test.ts
git commit -m "test(guard): fix timeout, read-once, scan scripts/"
```

### Task 3: Update the sitemap

**Files:**
- Modify: `src/app/sitemap.ts` (the `staticRoutes` array)

- [ ] **Step 1: Replace `staticRoutes`**

```ts
const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, lastModified, priority: 1 },
  { url: `${SITE_URL}/web-design`, lastModified, priority: 0.9 },
  { url: `${SITE_URL}/ecommerce`, lastModified, priority: 0.9 },
  { url: `${SITE_URL}/seo`, lastModified, priority: 0.9 },
  { url: `${SITE_URL}/work`, lastModified, priority: 0.9 },
  { url: `${SITE_URL}/conversion`, lastModified, priority: 0.8 },
  { url: `${SITE_URL}/about`, lastModified, priority: 0.8 },
  { url: `${SITE_URL}/contact`, lastModified, priority: 0.8 },
  { url: `${SITE_URL}/start`, lastModified, priority: 0.9 },
  { url: `${SITE_URL}/blog`, lastModified, priority: 0.8 },
];
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(reposition): sitemap lists service pages, drops tier routes"
```

---

## Phase 2 — Service pages (the new front)

### Task 4: `JsonLd` helper + `ServicePage` component + `/web-design`

Build the shared, data-driven service page once, then instantiate it three times (Tasks 4-6). Follow the existing `Section` / `Reveal` / `Tag` / `ButtonLink` idiom from `src/app/(frontend)/services/page.tsx`.

**Files:**
- Create: `src/components/seo/JsonLd.tsx`
- Create: `src/components/sections/ServicePage.tsx`
- Create: `src/app/(frontend)/web-design/page.tsx`
- Test: `src/service-pages.test.ts`

**Interfaces:**
- Produces: `JsonLd` (`{ data: Record<string, unknown> }`), `ServicePage` (`{ data: ServicePageData }`), and the exported `ServicePageData` type below. Tasks 5-6 consume `ServicePage` + `ServicePageData`.

```ts
export type ServicePageData = {
  slug: 'web-design' | 'ecommerce' | 'seo';
  tag: string;
  h1: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  included: { title: string; body: string }[];
  how: string[];
  caseStudy?: { slug: string; title: string; line: string };
  faq: { q: string; a: string }[];
  schema: Record<string, unknown>;
};
```

- [ ] **Step 1: Write a source-level test for the three service pages**

Create `src/service-pages.test.ts`. It asserts each page file exists, exports `metadata`, and renders `ServicePage`; and that none contain a `£`.

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const PAGES = ['web-design', 'ecommerce', 'seo'];
const base = path.resolve(__dirname, 'app', '(frontend)');

describe('service pages', () => {
  for (const slug of PAGES) {
    const file = path.join(base, slug, 'page.tsx');
    it(`${slug}/page.tsx exists`, () => {
      expect(existsSync(file)).toBe(true);
    });
    it(`${slug}/page.tsx exports metadata and renders ServicePage`, () => {
      const src = readFileSync(file, 'utf8');
      expect(src).toMatch(/export const metadata/);
      expect(src).toMatch(/ServicePage/);
    });
    it(`${slug}/page.tsx has no price`, () => {
      expect(readFileSync(file, 'utf8')).not.toMatch(/£/);
    });
  }
});
```

- [ ] **Step 2: Run the test, expect failure**

Run: `npx vitest run src/service-pages.test.ts`
Expected: FAIL (pages do not exist yet).

- [ ] **Step 3: Create `JsonLd`**

```tsx
// src/components/seo/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 4: Create `ServicePage`**

```tsx
// src/components/sections/ServicePage.tsx
import { Check } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { FAQ } from '@/components/ui/FAQ';
import { Reveal } from '@/components/animations/Reveal';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { JsonLd } from '@/components/seo/JsonLd';

export type ServicePageData = {
  slug: 'web-design' | 'ecommerce' | 'seo';
  tag: string;
  h1: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  included: { title: string; body: string }[];
  how: string[];
  caseStudy?: { slug: string; title: string; line: string };
  faq: { q: string; a: string }[];
  schema: Record<string, unknown>;
};

export function ServicePage({ data }: { data: ServicePageData }) {
  return (
    <>
      <JsonLd data={data.schema} />

      <Section tone="bg" spacing="heroTopTight">
        <div className="max-w-3xl">
          <Reveal><Tag tone="accent">{data.tag}</Tag></Reveal>
          <Reveal delay={0.05}>
            <h1 className="h1 mt-6 text-balance">{data.h1}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">{data.intro}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/start" variant="primary" size="lg" withArrow>Start a project</ButtonLink>
              <ButtonLink href="/work" variant="secondary" size="lg">See the work</ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="bg" spacing="xl">
        <div className="mb-10 max-w-3xl">
          <Reveal><Tag>What you get</Tag></Reveal>
        </div>
        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
            {data.included.map((item) => (
              <div key={item.title} className="flex h-full flex-col bg-[var(--color-bg)] p-8 md:p-10">
                <h3 className="h5 text-balance">{item.title}</h3>
                <p className="text-body mt-4 text-[var(--color-text-mute)]">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="surface" spacing="xl">
        <div className="mb-10 max-w-2xl">
          <Reveal><Tag>How it works</Tag></Reveal>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)]">
          {data.how.map((step, i) => (
            <Reveal key={step} delay={i * 0.05}>
              <li className="grid gap-6 bg-[var(--color-surface)] p-8 md:grid-cols-12 md:p-12">
                <div className="md:col-span-2">
                  <span className="text-h3 font-medium tracking-[-0.04em] text-[var(--color-text-soft)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="md:col-span-10">
                  <p className="text-big text-[var(--color-text)]">{step}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {data.caseStudy && (
        <Section tone="bg" spacing="xl">
          <Reveal>
            <div className="rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-10 md:p-12">
              <p className="label text-[var(--color-text-soft)]">Proof</p>
              <p className="text-big mt-4 max-w-2xl text-[var(--color-text)]">{data.caseStudy.line}</p>
              <div className="mt-8">
                <ButtonLink href={`/work/${data.caseStudy.slug}`} variant="secondary" size="md" withArrow>
                  Read the {data.caseStudy.title} case study
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Section>
      )}

      <Section tone="surface" spacing="xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <Tag>Common questions</Tag>
              <h2 className="h2 mt-6 text-balance">Straight answers.</h2>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.05}><FAQ items={data.faq} /></Reveal>
          </div>
        </div>
      </Section>

      <CTAStrip />
    </>
  );
}
```

- [ ] **Step 5: Create `/web-design` page with real copy**

```tsx
// src/app/(frontend)/web-design/page.tsx
import type { Metadata } from 'next';
import { ServicePage, type ServicePageData } from '@/components/sections/ServicePage';

const data: ServicePageData = {
  slug: 'web-design',
  tag: 'Web design',
  h1: 'Custom websites, built to be found and to convert.',
  intro:
    'We design and build fast, custom websites for ambitious businesses. No templates, no page builders. Every site is built from scratch on our own platform, so it loads fast, reads well to search engines, and turns visitors into customers.',
  metaTitle: 'Web design',
  metaDescription:
    'russle designs and builds fast, custom websites for ambitious businesses across the UK. Built from scratch, built to convert, and ready for search from day one.',
  included: [
    { title: 'Custom design, no templates', body: 'Designed around your business, not a theme every competitor can buy.' },
    { title: 'Built from scratch', body: 'Hand-built code on our own platform. Fast, secure, and yours.' },
    { title: 'Built to convert', body: 'Structured so visitors take the next step, not just look around.' },
    { title: 'Ready for search', body: 'Clean, fast, and structured so Google and AI search can read it from day one.' },
    { title: 'Hosting handled', body: 'Hosting on our platform, one bill, looked after by us.' },
    { title: 'Optional extras', body: 'Booking, an AI assistant, or a logo and identity if your project needs one.' },
  ],
  how: [
    'Start with a short brief so we understand the business and the goal.',
    'We agree the shape of the site and the pages it needs.',
    'You review real, clickable pages in the browser as they land, not flat mockups.',
    'We launch, then stay on to keep it fast, healthy, and found.',
  ],
  caseStudy: {
    slug: 'loop',
    title: 'Loop',
    line: 'An editorial launch site with a tokenised referral engine underneath, built to seed a community before the product shipped.',
  },
  faq: [
    { q: 'Do I need a brand first?', a: 'No. If you have a logo and colours we build around them. If you do not, we keep it clean and simple, and we can create an identity as part of the project if you want one.' },
    { q: 'Can I edit it myself?', a: 'Marketing sites are looked after by us so the design stays tight. Online stores come with a dashboard. If you want to edit pages yourself, tell us up front and we will build that in.' },
    { q: 'How long does it take?', a: 'Most sites go live in four to six weeks, faster when everything is ready.' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web design',
    provider: { '@type': 'Organization', name: 'russle', url: 'https://russle.co.uk' },
    areaServed: 'GB',
    name: 'Web design',
    description: 'Custom website design and build for ambitious businesses across the UK.',
  },
};

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function WebDesignPage() {
  return <ServicePage data={data} />;
}
```

- [ ] **Step 6: Run tests + typecheck + lint**

Run: `npx vitest run src/service-pages.test.ts && npx tsc --noEmit && npm run lint`
Expected: web-design tests PASS (ecommerce/seo still fail until Tasks 5-6); tsc PASS; lint 0 errors.

- [ ] **Step 7: Visual check**

Run `npm run dev`, open `http://localhost:3000/web-design`. Confirm hero, "what you get" grid, how-it-works, Loop proof, FAQ, CTA all render and sections reveal on scroll.

- [ ] **Step 8: Commit**

```bash
git add src/components/seo/JsonLd.tsx src/components/sections/ServicePage.tsx "src/app/(frontend)/web-design/page.tsx" src/service-pages.test.ts
git commit -m "feat(reposition): ServicePage component + /web-design"
```

### Task 5: `/ecommerce` page

**Files:**
- Create: `src/app/(frontend)/ecommerce/page.tsx`

**Interfaces:**
- Consumes: `ServicePage`, `ServicePageData` from Task 4.

- [ ] **Step 1: Create the page**

```tsx
// src/app/(frontend)/ecommerce/page.tsx
import type { Metadata } from 'next';
import { ServicePage, type ServicePageData } from '@/components/sections/ServicePage';

const data: ServicePageData = {
  slug: 'ecommerce',
  tag: 'Ecommerce',
  h1: 'Online stores that sell, on a platform you own.',
  intro:
    'We build online shops on our own platform: products, stock, orders, and payments, with a dashboard and an iOS app so you run the shop from anywhere. No marketplace commission, no per-sale fee to a third party.',
  metaTitle: 'Ecommerce',
  metaDescription:
    'russle builds custom online stores for ambitious businesses across the UK. Products, stock, orders, payments, a dashboard and an iOS app, on a platform you own.',
  included: [
    { title: 'Full storefront', body: 'Products, collections, cart, and checkout, built around your range.' },
    { title: 'Payments and orders', body: 'Take payment and manage orders without a marketplace taking a cut.' },
    { title: 'Dashboard and iOS app', body: 'Manage products, stock, and orders from your desk or your phone.' },
    { title: 'Stock that stays right', body: 'Inventory that updates as you sell, online and in person.' },
    { title: 'Built for search', body: 'Product and category pages structured to rank and to show in AI answers.' },
    { title: 'Optional extras', body: 'Online ordering for food, subscriptions, or an AI assistant.' },
  ],
  how: [
    'Start with a short brief covering your range and how you sell.',
    'We agree the storefront, the checkout, and how stock is managed.',
    'You review the real store in the browser as it comes together.',
    'We launch, then stay on to keep it selling and found.',
  ],
  caseStudy: {
    slug: 'berry-boys',
    title: 'Berry Boys',
    line: 'A multi-store site that took a Manchester acai bar off Instagram and onto its own checkout, edited by the three founders themselves.',
  },
  faq: [
    { q: 'Is this Shopify?', a: 'Usually our own platform, which means no monthly builder fee and no per-sale cut. If you already run Shopify and want to keep it, we can build the storefront on top of it.' },
    { q: 'Can I manage it myself?', a: 'Yes. Stores come with a web dashboard and an iOS app for products, stock, and orders.' },
    { q: 'Do you do food ordering?', a: 'Yes, takeaway and pickup ordering direct from your site, with no third-party app or commission.' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'E-commerce development',
    provider: { '@type': 'Organization', name: 'russle', url: 'https://russle.co.uk' },
    areaServed: 'GB',
    name: 'Ecommerce',
    description: 'Custom online store design and build on a platform you own, for businesses across the UK.',
  },
};

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function EcommercePage() {
  return <ServicePage data={data} />;
}
```

- [ ] **Step 2: Test + typecheck**

Run: `npx vitest run src/service-pages.test.ts && npx tsc --noEmit`
Expected: web-design + ecommerce PASS; tsc PASS.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(frontend)/ecommerce/page.tsx"
git commit -m "feat(reposition): /ecommerce service page"
```

### Task 6: `/seo` page

**Files:**
- Create: `src/app/(frontend)/seo/page.tsx`

**Interfaces:**
- Consumes: `ServicePage`, `ServicePageData` from Task 4. Uses no `caseStudy` (SEO has no rankings KPI to claim honestly).

- [ ] **Step 1: Create the page**

```tsx
// src/app/(frontend)/seo/page.tsx
import type { Metadata } from 'next';
import { ServicePage, type ServicePageData } from '@/components/sections/ServicePage';

const data: ServicePageData = {
  slug: 'seo',
  tag: 'SEO',
  h1: 'The SEO that gets your site found.',
  intro:
    'A fast, well-built site is only worth it if people find it. We run ongoing SEO, technical, content, and AI search, so you climb the rankings and show up when customers are looking, on Google and in tools like ChatGPT.',
  metaTitle: 'SEO',
  metaDescription:
    'russle runs ongoing organic and technical SEO for ambitious businesses across the UK, including content, rankings, reporting, and AI search visibility (GEO).',
  included: [
    { title: 'Technical SEO', body: 'The under-the-hood work: speed, structure, crawlability, and schema.' },
    { title: 'Content and on-page', body: 'Pages and articles written to rank for what your customers search.' },
    { title: 'AI search (GEO)', body: 'Showing up when people ask ChatGPT, Perplexity, or Google AI Overviews for what you do.' },
    { title: 'Rankings and reporting', body: 'Tracked every month, in plain English, so you see what is moving and why.' },
    { title: 'Kept healthy', body: 'Broken links, dropped rankings, and tracking issues caught and fixed.' },
    { title: 'Local when it helps', body: 'Google Business Profile and local search set up when your customers search nearby.' },
  ],
  how: [
    'We audit where you stand and where the opportunities are.',
    'We fix the technical basics that hold rankings back.',
    'We publish and optimise content for people and for AI search.',
    'We report and adjust every month.',
  ],
  faq: [
    { q: 'How long until I see results?', a: 'Most sites see movement in three to six months. SEO compounds, the traffic keeps coming once it lands.' },
    { q: 'Do you guarantee number one?', a: 'No, and walk away from anyone who does. We guarantee the work and the reporting, so you can see exactly what is moving and why.' },
    { q: 'Is this local SEO?', a: 'It can include local search and Google Business Profile when your customers search nearby, but most of the work is broader organic and technical SEO, plus AI search visibility.' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Search engine optimization',
    provider: { '@type': 'Organization', name: 'russle', url: 'https://russle.co.uk' },
    areaServed: 'GB',
    name: 'SEO',
    description: 'Ongoing organic, technical, and AI-search optimisation for businesses across the UK.',
  },
};

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function SeoPage() {
  return <ServicePage data={data} />;
}
```

- [ ] **Step 2: Full service-pages test + typecheck + lint**

Run: `npx vitest run src/service-pages.test.ts && npx tsc --noEmit && npm run lint`
Expected: all three service pages PASS; tsc PASS; lint 0 errors.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(frontend)/seo/page.tsx"
git commit -m "feat(reposition): /seo service page"
```

---

## Phase 3 — Global chrome & metadata

### Task 7: Rewrite root metadata + add Organization JSON-LD

**Files:**
- Modify: `src/app/(frontend)/layout.tsx` (the `metadata` export; add `<JsonLd>` in `<body>`)

- [ ] **Step 1: Replace the `metadata` object**

```ts
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'russle | Web design, ecommerce & SEO',
    template: 'russle | %s',
  },
  description:
    'russle is a web design, ecommerce and SEO studio. We build fast, custom websites and online stores for ambitious businesses across the UK, then run the SEO that gets them found.',
  keywords: [
    'web design',
    'website design',
    'web development',
    'ecommerce',
    'online store',
    'SEO',
    'search engine optimisation',
    'technical SEO',
    'AI search',
    'GEO',
    'UK',
  ],
  authors: [{ name: 'russle' }],
  creator: 'russle',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: 'russle',
    title: 'russle | Web design, ecommerce & SEO',
    description:
      'A web design, ecommerce and SEO studio for ambitious businesses across the UK. Fast custom sites and stores, then the SEO that gets them found.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'russle' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'russle | Web design, ecommerce & SEO',
    description: 'A web design, ecommerce and SEO studio for ambitious businesses across the UK.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
};
```

- [ ] **Step 2: Add the Organization JSON-LD**

Add the import at the top: `import { JsonLd } from '@/components/seo/JsonLd';`
Then inside `<body>`, immediately after the opening tag (before the skip link), add:

```tsx
<JsonLd
  data={{
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'russle',
    url: SITE_URL,
    description:
      'A web design, ecommerce and SEO studio for ambitious businesses across the UK.',
    email: 'hello@russle.co.uk',
    areaServed: 'GB',
    logo: `${SITE_URL}/og.png`,
    sameAs: ['https://instagram.com/russleuk'],
  }}
/>
```

- [ ] **Step 3: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS; lint 0 errors.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(frontend)/layout.tsx"
git commit -m "feat(reposition): rewrite root metadata + Organization JSON-LD"
```

### Task 8: Rewrite the Navbar

Nav becomes three direct service links + Work (keeps its mega) + About. Remove the services/tiers mega and the tier list. Reframe the WorkMega sector labels away from "Brand +".

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Replace `NAV_LINKS`, delete `TIERS`, update `CASE_STUDIES`**

```ts
type MegaKind = 'work';

type NavLink = { label: string; href: string; mega?: MegaKind };

const NAV_LINKS: NavLink[] = [
  { label: 'Web Design', href: '/web-design' },
  { label: 'Ecommerce', href: '/ecommerce' },
  { label: 'SEO', href: '/seo' },
  { label: 'Work', href: '/work', mega: 'work' },
  { label: 'About', href: '/about' },
];

const CASE_STUDIES = [
  { slug: 'loop', title: 'Loop', sector: 'Web design + referral engine' },
  { slug: 'mums-granola', title: "Mum's Granola", sector: 'Ecommerce · headless commerce' },
  { slug: 'bethbakescakes', title: 'Beth Bakes Cakes', sector: 'Ecommerce · custom storefront' },
  { slug: 'racing-life', title: 'Racing Life', sector: 'Web design · media platform' },
  { slug: 'berry-boys', title: 'Berry Boys', sector: 'Ecommerce · multi-store site' },
];
```

- [ ] **Step 2: Delete `ServicesMega`, keep `WorkMega`**

Remove the entire `ServicesMega` function. In the mega-panel render, replace the ternary with just the work panel:

```tsx
{openMega && (
  <div
    className="hidden border-t border-[var(--color-line)] bg-[var(--color-bg)] shadow-[0_24px_48px_-24px_rgba(26,20,16,0.18)] md:block"
    onMouseEnter={() => {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
    }}
    onMouseLeave={scheduleClose}
  >
    <div className="mx-auto max-w-[1800px] px-4 py-10 sm:px-6 md:px-8">
      <WorkMega />
    </div>
  </div>
)}
```

- [ ] **Step 3: Rewrite the mobile menu links**

Replace the mobile `<nav>` link list (the `Work`/`Services`/tiers/`About`/`Blog`/`Contact` block) with:

```tsx
<nav className="flex flex-col gap-2 px-4 py-8 sm:px-6">
  <Link href="/web-design" className="h2 py-2 text-[var(--color-text)]">Web Design</Link>
  <Link href="/ecommerce" className="h2 py-2 text-[var(--color-text)]">Ecommerce</Link>
  <Link href="/seo" className="h2 py-2 text-[var(--color-text)]">SEO</Link>
  <Link href="/work" className="h2 py-2 text-[var(--color-text)]">Work</Link>
  <Link href="/about" className="h2 py-2 text-[var(--color-text)]">About</Link>
  <Link href="/contact" className="h2 py-2 text-[var(--color-text)]">Contact</Link>
  <div className="mt-6 flex flex-col gap-3">
    <ButtonLink href="/start" variant="primary" size="lg">Start a project</ButtonLink>
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-14 items-center justify-center gap-2 rounded-[var(--radius-xl)] bg-[#25D366] px-8 text-[14px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#1ebe5d]"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span>WhatsApp us</span>
    </a>
  </div>
</nav>
```

- [ ] **Step 4: Remove now-unused imports**

`ChevronDown` is still used (Work has a mega). Confirm `ArrowUpRight` is still used by `WorkMega` (yes). Run lint to catch any unused import and remove it.

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS; lint 0 errors (fix any unused-import warning by deleting the import).

- [ ] **Step 5: Visual check**

`npm run dev`, confirm desktop nav shows the five links, Work opens its mega, the three service links navigate, and the mobile menu lists the five links.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat(reposition): nav leads on Web Design / Ecommerce / SEO"
```

### Task 9: Rewrite the Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Replace `FOOTER_COLUMNS` and the descriptor copy**

```ts
const FOOTER_COLUMNS = [
  {
    title: 'Services',
    links: [
      { label: 'Web Design', href: '/web-design' },
      { label: 'Ecommerce', href: '/ecommerce' },
      { label: 'SEO', href: '/seo' },
      { label: 'Conversion', href: '/conversion' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Get started',
    links: [
      { label: 'Project intake', href: '/start' },
      { label: 'Email us', href: 'mailto:hello@russle.co.uk' },
      { label: 'Instagram', href: 'https://instagram.com/russleuk', external: true },
    ],
  },
];
```

Then update the descriptor line:

```tsx
<p className="text-big mt-6 max-w-md text-[var(--color-text-mute)]">
  russle. Web design, ecommerce &amp; SEO studio. United Kingdom.
</p>
```

- [ ] **Step 2: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS; lint 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat(reposition): footer services + studio descriptor"
```

---

## Phase 4 — Home rewrite

### Task 10: Rewrite the Hero

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Replace `PRICE_CARDS`, headline, and sub**

Replace the imports' icons and the `PRICE_CARDS` array:

```tsx
import Link from 'next/link';
import { ArrowUpRight, Layout, ShoppingBag, Search } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';

const SERVICE_CARDS = [
  { icon: Layout, label: 'Web Design', detail: 'Fast, custom websites built from scratch to convert.', href: '/web-design' },
  { icon: ShoppingBag, label: 'Ecommerce', detail: 'Online stores on a platform you own, no marketplace cut.', href: '/ecommerce' },
  { icon: Search, label: 'SEO', detail: 'The organic and AI search work that gets you found.', href: '/seo' },
];
```

Replace the `<h1>` and `<p>`:

```tsx
<h1 className="h1 text-balance text-[var(--color-text)]">
  Websites, online stores, and the SEO that gets them found.
</h1>
```

```tsx
<p className="text-big mt-8 max-w-2xl text-[var(--color-text-mute)]">
  russle is a web design, ecommerce and SEO studio. We build fast, custom sites and stores for ambitious businesses, then run the SEO that keeps customers coming.
</p>
```

- [ ] **Step 2: Point the card map at `SERVICE_CARDS`**

Change `{PRICE_CARDS.map((card) => {` to `{SERVICE_CARDS.map((card) => {`. The card markup already uses `card.icon`, `card.label`, `card.detail`, `card.href` and the "See {card.label}" link, so no other change is needed.

- [ ] **Step 3: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS; lint 0 errors (old icon imports `Sparkles, TrendingUp, Users` removed).

- [ ] **Step 4: Visual check**

`npm run dev`, open `/`. Confirm the new headline, sub, and three service cards linking to the service pages; hero paints immediately (no blank flash).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat(reposition): home hero leads on the three services"
```

### Task 11: Reframe the Capabilities grid

Drop the "Local SEO and Google Business / someone nearby" headline card, replace with an organic-SEO card, and remove brand-led framing. Keep the other build capabilities.

**Files:**
- Modify: `src/components/sections/Capabilities.tsx`

- [ ] **Step 1: Replace the `MapPin` "Local SEO" card**

In the `CAPABILITIES` array, replace the object with `icon: MapPin, title: 'Local SEO and Google Business'` with:

```tsx
{
  icon: BrainCircuit,
  title: 'SEO and AI search',
  body: 'Ranking in Google and showing up in ChatGPT and AI Overviews. Technical SEO, content, and schema that search engines and AI actually read.',
},
```

- [ ] **Step 2: Deduplicate icons**

`BrainCircuit` is now used twice (this card and the existing GEO card). Rename the existing standalone "AI search optimisation (GEO)" card's title to fold under SEO, or change this new card's icon to `Search` (add to the import). Use `Search`:

Change the import line to include `Search` and drop `MapPin`:
```tsx
import { Globe, Calendar, ShoppingBag, Mail, Utensils, Sparkles, BrainCircuit, Hammer, Search } from 'lucide-react';
```
and set the new card `icon: Search`.

- [ ] **Step 3: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS; lint 0 errors (no unused `MapPin`).

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Capabilities.tsx
git commit -m "feat(reposition): capabilities lead organic SEO, drop local headline"
```

### Task 12: Repurpose OfferBlock into a no-price "How we work"

Replace the three price tiers with a two-part build→retain explainer, no prices, no tier names.

**Files:**
- Modify: `src/components/sections/OfferBlock.tsx`

- [ ] **Step 1: Replace the file body**

```tsx
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';

const STEPS = [
  {
    title: 'We build it',
    body: 'A custom website or online store, designed and built from scratch on our own platform. A one-off project, shipped and yours.',
    links: [
      { label: 'See web design', href: '/web-design' },
      { label: 'See ecommerce', href: '/ecommerce' },
    ],
  },
  {
    title: 'We keep you found',
    body: 'Once you are live, we run the SEO that grows your traffic and keeps everything healthy. An ongoing arrangement, no long-term contract.',
    links: [{ label: 'See SEO', href: '/seo' }],
  },
];

export function OfferBlock() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="mb-12 max-w-3xl">
        <Reveal><Tag>How to work with us</Tag></Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">Build once, then get found.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
            We build your site or store, then keep customers coming with ongoing SEO. Start a project and we will scope the right shape with you.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.05}>
            <div className="flex h-full flex-col rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-8 md:p-10">
              <h3 className="h3 text-balance">{step.title}</h3>
              <p className="text-body mt-4 text-[var(--color-text-mute)]">{step.body}</p>
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                {step.links.map((link, j) => (
                  <ButtonLink key={link.href} href={link.href} variant={j === 0 ? 'primary' : 'secondary'} size="md" withArrow={j === 0}>
                    {link.label}
                  </ButtonLink>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <ButtonLink href="/start" variant="ghost" size="md" withArrow>Start a project</ButtonLink>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS; lint 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/OfferBlock.tsx
git commit -m "feat(reposition): OfferBlock becomes no-price build->retain"
```

### Task 13: Rewrite the home FAQ

**Files:**
- Modify: `src/components/sections/FAQSection.tsx` (the `ITEMS` array)

- [ ] **Step 1: Replace `ITEMS`**

```ts
const ITEMS: FAQItem[] = [
  {
    q: 'How long does a build take?',
    a: 'As soon as 14 days when everything is ready, four to six weeks for most, depending on scope.',
  },
  {
    q: 'Why not just use a Squarespace template?',
    a: 'Templates are free, and every competitor can buy the same one. We build something only you have, on a setup you actually own. No monthly subscription to a website builder, no per-sale fees.',
  },
  {
    q: 'Why not just use a full-service agency?',
    a: 'You can, and for some businesses that is the right call. With russle you work with the senior people doing the work, not an account manager relaying messages to juniors. Design, build, and SEO sit in one team, so nothing gets lost in the handoffs that make agencies slow.',
  },
  {
    q: 'Do I need a brand first?',
    a: 'No. If you have a logo and colours we build around them. If you do not, we keep it clean and simple, and we can create an identity as part of the project if you want one.',
  },
  {
    q: 'Will you write my content?',
    a: 'Yes, writing and content sit inside the SEO work, or on top of any build. If you bring your own words and photos, the build covers the rest.',
  },
  {
    q: 'What does the SEO retainer cover?',
    a: 'Technical SEO, content, rankings and reporting, AI search visibility, and keeping the site healthy month to month. It is the work that turns a website into a channel that brings customers in.',
  },
  {
    q: "What if I'm not sure exactly what I need yet?",
    a: 'That is what start is for. A few short questions surface the scope by asking the right things, even if you do not know where you will land.',
  },
  {
    q: 'Where are you based, and who am I working with?',
    a: 'russle is an independent UK studio. You work directly with the people who design and build your project, not an account manager and a junior.',
  },
  {
    q: 'Can we talk before I fill in the form?',
    a: 'Yes. There is a quiet booking link on the contact page. Most clients find the intake form a faster way in, but talking first is fine if you would prefer.',
  },
];
```

- [ ] **Step 2: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/FAQSection.tsx
git commit -m "feat(reposition): home FAQ drops tiers, prices, brand-default"
```

### Task 14: Scrub remaining home sections for stray brand/price/tier copy

`ReviewsBar`, `CaseStudyShowcase`, `CTAStrip`, and `ReviewsBlock` render on the home page and may carry stray copy.

**Files:**
- Read then Modify as needed: `src/components/sections/ReviewsBar.tsx`, `src/components/sections/CaseStudyShowcase.tsx`, `src/components/sections/CTAStrip.tsx`, `src/components/sections/ReviewsBlock.tsx`

- [ ] **Step 1: Grep the home-rendered sections for banned copy**

Run:
```bash
grep -rniE "launch|grow|manage|brand & growth|£|\bads\b|from £|tier" src/components/sections/ReviewsBar.tsx src/components/sections/CaseStudyShowcase.tsx src/components/sections/CTAStrip.tsx src/components/sections/ReviewsBlock.tsx
```
Expected: review each hit. `Launch`/`Grow`/`Manage` as tier words, any `£`, any "brand & growth", any marketed "ads" must be reworded to the new positioning (e.g. a CTA like "Launch your project" is fine; a tier reference is not). If a file is clean, leave it.

- [ ] **Step 2: Fix any hits**

Apply minimal edits to remove tier/price/brand-agency framing while keeping the component's structure. (No code shown because the exact copy depends on Step 1's findings; each fix is a plain string edit.)

- [ ] **Step 3: Typecheck + lint + full test run**

Run: `npx tsc --noEmit && npm run lint && npm test`
Expected: tsc PASS, lint 0 errors, vitest all green EXCEPT the guard's `scripts/` seed hits (fixed next task).

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/
git commit -m "chore(reposition): scrub stray tier/price copy from home sections"
```

---

## Phase 5 — Case studies, cleanup, guard tighten

### Task 15: Reframe case studies + fix seed voice debt

Lead each case study on the website/store/SEO outcome; keep client testimonial "I" but change russle narration "came to me" → "came to us". Fix retired-geo and "practice" in blog seed scripts.

**Files:**
- Modify: `src/content/work/berry-boys.mdx`, `loop.mdx`, `bethbakescakes.mdx`, `mums-granola.mdx`, `makeup-by-abigail.mdx`, `racing-life.mdx`
- Modify: `scripts/seed-content.ts`, `scripts/seed-batch-2.ts`, `scripts/seed-batch-4.ts`, `scripts/seed-batch-7.ts`

- [ ] **Step 1: Reframe frontmatter `sector`/`role`/`summary`**

Edit each MDX frontmatter so `sector`/`role` lead with the build/store/SEO discipline, not "Brand". Concretely:
- `berry-boys.mdx`: `sector: "Ecommerce · Food & drink"`, `role: "Discovery · Design · Development · Self-hosted CMS"`.
- `mums-granola.mdx`: `sector: "Ecommerce · Food & drink"`, `role: "Discovery · Design · Development · Headless Shopify"`.
- `bethbakescakes.mdx`: `sector: "Ecommerce · Food & drink"`, `role: "Discovery · Design · Development"`.
- `loop.mdx`: `sector: "Web design · Community platform"`, `role: "Discovery · Design · Development"`.
- `racing-life.mdx`: `sector: "Web design · Media platform"`, `role: "Architecture · Full-stack · Design system"`.
- `makeup-by-abigail.mdx`: `sector: "Web design · Beauty"`, `role: "Design · Build"`.
Where a `summary` opens on brand identity (loop: "and brand identity"), keep the identity mention but do not lead on it; the site/store/mechanic is the headline. Leave client `quote.text` fields (testimonials) untouched.

- [ ] **Step 2: Fix russle first-person narration (not testimonials)**

- `loop.mdx:64`: "She came to me with a deck" → "She came to us with a deck".
- `bethbakescakes.mdx:56`: "By the time she came to me" → "By the time she came to us".
- `makeup-by-abigail.mdx:71`: "the principle I keep coming back to" → "the principle we keep coming back to".
Do NOT change `makeup-by-abigail.mdx:35` or `bethbakescakes.mdx:46` (client quotes).

- [ ] **Step 3: Fix seed-script geo + "practice"**

- In `scripts/seed-batch-4.ts` and `scripts/seed-content.ts`, remove "Cheshire" / "South Manchester" self-positioning (reword to national, e.g. "a UK web and SEO studio"). Grep to find every hit: `grep -rniE "Cheshire|South Manchester|Alderley" scripts/`.
- Reword "in practice" → "in real terms": `scripts/seed-batch-2.ts:156`, `scripts/seed-batch-7.ts:42`, `scripts/seed-content.ts:155`.

- [ ] **Step 4: Run the guard + typecheck**

Run: `npx vitest run src/repositioning-guard.test.ts && npx tsc --noEmit`
Expected: guard PASS (no Cheshire/South Manchester/em dash in `src/` or `scripts/`); tsc PASS.

- [ ] **Step 5: Visual check**

`npm run dev`, open `/work` and two case studies. Confirm the index cards read as build/store/SEO work and the narration is "we".

- [ ] **Step 6: Commit**

```bash
git add src/content/work/ scripts/
git commit -m "feat(reposition): reframe case studies + fix seed voice debt"
```

### Task 16: Delete retired tier pages and confirmed dead code

**Files:**
- Delete: `src/app/(frontend)/launch/`, `src/app/(frontend)/grow/`, `src/app/(frontend)/manage/`, `src/app/(frontend)/services/`
- Delete: `src/components/sections/WhyRussle.tsx`, `src/components/sections/WhyRussleVisual.tsx` (audit-confirmed never rendered)
- Delete: `public/locality/`
- Investigate then delete if unused: `src/components/sections/LaunchVisual.tsx`, `GrowFlow.tsx`, `ManageVisual.tsx`, `BethVisual.tsx`

- [ ] **Step 1: Confirm the tier visuals are only used by the deleted pages**

Run:
```bash
grep -rlE "LaunchVisual|GrowFlow|ManageVisual|BethVisual|WhyRussle" src --include=*.tsx
```
Expected: hits only in the four tier/services page files (being deleted) and the visuals' own files. If any other file imports them, keep that visual and skip it in Step 3.

- [ ] **Step 2: Confirm `google-places` is still used (do NOT delete)**

Run: `grep -rn "google-places" src`
Expected: `src/app/(frontend)/page.tsx` imports `hasPlacesConfig`. Confirm it stays. (It powers the Google `ReviewsBlock`, not local-SEO town pages.)

- [ ] **Step 3: Delete**

```bash
git rm -r "src/app/(frontend)/launch" "src/app/(frontend)/grow" "src/app/(frontend)/manage" "src/app/(frontend)/services"
git rm src/components/sections/WhyRussle.tsx src/components/sections/WhyRussleVisual.tsx
git rm -r public/locality
# only the visuals confirmed unused in Step 1:
git rm src/components/sections/LaunchVisual.tsx src/components/sections/GrowFlow.tsx src/components/sections/ManageVisual.tsx src/components/sections/BethVisual.tsx
```

- [ ] **Step 4: Typecheck + lint + build**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS, 0 errors (no dangling imports). If tsc reports a missing import, a file still references a deleted component; fix that reference.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore(reposition): delete tier pages, dead components, locality assets"
```

### Task 17: Tighten the guard with reposition bans + full verification

Now that copy is clean, add bans that lock the reposition in: no `£`, no "brand & growth agency", no marketed "ads".

**Files:**
- Modify: `src/repositioning-guard.test.ts` (the `BANNED` array)

- [ ] **Step 1: Add the new bans**

Append to `BANNED`:
```ts
  { label: 'price on site', re: /£/ },
  { label: 'brand & growth agency self-descriptor', re: /brand\s*&\s*growth\s*agency|brand and growth agency/i },
  { label: 'ads as a marketed service', re: /\bads\b/i },
```

- [ ] **Step 2: Run the guard**

Run: `npx vitest run src/repositioning-guard.test.ts`
Expected: PASS. If a `£`/"ads"/"brand & growth agency" hit remains, the reported file still carries old copy; fix it, then re-run.

- [ ] **Step 3: Full suite + typecheck + lint**

Run: `npm test && npx tsc --noEmit && npm run lint`
Expected: all vitest green, tsc PASS, lint 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/repositioning-guard.test.ts
git commit -m "test(guard): ban prices, brand-agency descriptor, ads"
```

### Task 18: Final whole-site verification

- [ ] **Step 1: Grep the whole shipped tree for regressions**

Run:
```bash
grep -rniE "brand & growth|from £|£[0-9]|/launch\"|/grow\"|/manage\"|/services\"" src --include=*.tsx --include=*.ts --include=*.mdx | grep -v "\.test\." | grep -v next.config
```
Expected: no hits (redirect entries in `next.config.ts` are excluded; those are correct). Any hit is a missed reference; fix it.

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build succeeds, OR fails only at the Payload DB step (needs `DATABASE_URI`) with all route compilation passing first. Capture any non-DB compile error and fix it.

- [ ] **Step 3: Manual walk-through**

`npm run dev`, click through: `/`, `/web-design`, `/ecommerce`, `/seo`, `/work`, a case study, `/about`, `/contact`, `/start`. Confirm: no prices, no tier names, nav/footer correct, service pages complete, redirects work (`/launch` → `/web-design`, `/services` → `/`).

- [ ] **Step 4: Final commit (if any fixes from Steps 1-2)**

```bash
git add -A
git commit -m "chore(reposition): final verification fixes"
```

---

## Self-Review (completed by plan author)

**Spec coverage:** §3 spine → Tasks 7-10; §4 IA (new pages) → Tasks 4-6; retire/301 → Tasks 1, 16; nav/footer → Tasks 8-9; §5 no-pricing → Tasks 10, 12, 13, 17; §6 rewrite scope → Tasks 10-15; §7 SEO/schema → Tasks 3, 4, 7; §8 resolved-for-free (locality delete, WhyRussle, voice, guard scripts) → Tasks 2, 15, 16, 17. Audit *bug* items intentionally excluded (separate plan).

**Placeholder scan:** Task 14 Step 2 has no code block because the edits depend on Step 1's grep output; this is a genuine investigate-then-fix step, not a placeholder for missing logic. All other steps carry concrete code/commands.

**Type consistency:** `ServicePageData` defined in Task 4 is consumed unchanged in Tasks 5-6. `JsonLd` prop shape (`{ data }`) consistent in Tasks 4 and 7. Nav `MegaKind` narrowed to `'work'` in Task 8 (the `services` mega is deleted in the same task).

**Open items carried from spec §10 (not blocking):** `/partners` left in place but unlinked (footer link removed in Task 9); revisit later.
