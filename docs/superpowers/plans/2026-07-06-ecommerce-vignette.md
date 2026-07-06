# /ecommerce Hero Vignette + Shopify Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a composed UI-vignette illustration to the `/ecommerce` hero (Woo-collage style, russle-ized) and reposition the page copy to "our own platform or a custom Shopify storefront" throughout.

**Architecture:** `ServicePage` gains an optional `visual` ReactNode prop rendered in a two-column hero (only when present; other pages byte-identical). The vignette is a token-driven server component in the retired-LaunchVisual idiom: one storefront card plus four floating chips, CSS-keyframe float, no raster assets, no client boundary. Copy changes live entirely in the page's `data` object.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, lucide-react, vitest. No framer-motion additions.

## Global Constraints

Copied from the spec (`docs/superpowers/specs/2026-07-06-ecommerce-vignette-design.md`). Every task must honour all of these:

- Repositioning guard bans in `src/`: `£`, em dash (—), `/\bads\b/i`, "brand & growth agency", geo terms. **No price anywhere in the vignette: skeleton bars only.**
- Lowercase **russle**; studio "we"; no tier names (Launch/Grow/Manage).
- "Shopify" is sanctioned nominative use (russle genuinely builds headless Shopify storefronts).
- `/web-design` and `/seo` must render byte-identical to today (no `visual` passed).
- Verification commands run from `russle-site/`: `npx vitest run`, `npx tsc --noEmit`, `npm run lint`. **Run tsc/lint in the foreground, unsandboxed — sandboxed Node stalls (disabled JIT).** Branch: `reposition-web-ecommerce-seo` (already checked out).
- Existing tests must stay green: `src/service-pages.test.ts`, `src/redirects.test.ts`, guard 8/8.

---

### Task 1: ServicePage `visual` slot

**Files:**
- Modify: `src/components/sections/ServicePage.tsx`

**Interfaces:**
- Produces: `ServicePage({ data, visual }: { data: ServicePageData; visual?: ReactNode })`. Task 3 passes `visual={<EcommerceVignette />}`. `ServicePageData` is unchanged.

- [ ] **Step 1: Add the prop and the conditional two-column hero**

In `src/components/sections/ServicePage.tsx`, add to the imports (first line of the file):

```tsx
import type { ReactNode } from 'react';
```

Replace the component signature and the hero `<Section>` (currently the `Section tone="bg" spacing="heroTopTight"` block wrapping one `div.max-w-3xl`) with:

```tsx
export function ServicePage({ data, visual }: { data: ServicePageData; visual?: ReactNode }) {
  const heroCopy = (
    <>
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
    </>
  );

  return (
    <>
      <JsonLd data={data.schema} />

      <Section tone="bg" spacing="heroTopTight">
        {visual ? (
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="max-w-3xl lg:col-span-7">{heroCopy}</div>
            <div className="mt-4 lg:col-span-5 lg:mt-0">
              <Reveal delay={0.25}>{visual}</Reveal>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl">{heroCopy}</div>
        )}
      </Section>
```

Everything from the "What you get" `<Section>` down is untouched.

- [ ] **Step 2: Typecheck + existing tests**

Run: `npx tsc --noEmit && npx vitest run src/service-pages.test.ts`
Expected: tsc PASS; 10/10 tests pass (no page passes `visual` yet, rendering unchanged).

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ServicePage.tsx
git commit -m "feat(vignette): optional hero visual slot on ServicePage"
```

### Task 2: Float utilities + `EcommerceVignette` component

**Files:**
- Modify: `src/app/(frontend)/globals.css` (add float utilities inside the existing `@layer utilities` animation block)
- Create: `src/components/sections/EcommerceVignette.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/cn`; design tokens from globals.css.
- Produces: `EcommerceVignette({ className }: { className?: string })` — named export, server component. Task 3 renders it.

- [ ] **Step 1: Add float keyframes + utilities to globals.css**

In `src/app/(frontend)/globals.css`, inside the `@layer utilities` block that already holds `.marquee` (immediately after the `@keyframes marquee-scroll { ... }` rule, before the `@media (prefers-reduced-motion: reduce)` rule), add:

```css
  .float-slow    { animation: float-y 6s ease-in-out infinite; }
  .float-slower  { animation: float-y 7s ease-in-out infinite; animation-delay: 0.6s; }
  .float-slowest { animation: float-y 8s ease-in-out infinite; animation-delay: 1.2s; }

  /* Animates the `translate` property so it composes with Tailwind v4
     rotate-* utilities (which set the separate `rotate` property). */
  @keyframes float-y {
    0%, 100% { translate: 0 0; }
    50%      { translate: 0 -5px; }
  }
```

The existing `prefers-reduced-motion` block in the same layer already sets `animation-duration: 0.01ms !important` on everything, so the float is reduced-motion-safe with no extra work.

- [ ] **Step 2: Create the vignette component**

Create `src/components/sections/EcommerceVignette.tsx` with exactly:

```tsx
import { Heart, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/cn';

function ShopifyMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M6.5 7.5 5 20l7 1.5L19 20 17.5 7.5l-2.6-.4-.6-1.6a2.9 2.9 0 0 0-5.6 0l-.6 1.6z" fill="#95BF47" />
      <path d="M10 5.9a2 2 0 0 1 4 0l.3.9h-4.6z" fill="#5E8E3E" />
      <path
        d="M13.9 10.6c-.5-.3-1.2-.5-1.9-.4-1.5.1-2.5 1-2.4 2.2.1 1.6 2.9 1.7 3 3.1.1.8-.7 1.2-1.5 1.2-.9 0-1.7-.4-1.7-.4l-.3 1.4s.8.5 2 .5c1.8 0 3.1-1 3-2.6-.2-1.9-2.9-2-3-3.1 0-.5.4-1 1.3-1 .7 0 1.2.3 1.2.3z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function AppleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M16.4 12.7c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.5-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2 2.5 2 1 0 1.4-.6 2.6-.6 1.2 0 1.6.6 2.6.6s1.8-1 2.4-2c.8-1.1 1.1-2.2 1.1-2.3 0 0-2.1-.8-2.1-3z" />
      <path d="M14.4 6.6c.5-.7.9-1.6.8-2.6-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.8-.4 2.3-1z" />
    </svg>
  );
}

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.5z" />
      <path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A11.5 11.5 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.6 14.7a7 7 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4z" />
      <path fill="#EA4335" d="M12 4.6c1.7 0 3.2.6 4.4 1.7L19.7 3A11.5 11.5 0 0 0 1.8 7.3l3.8 3A6.9 6.9 0 0 1 12 4.6z" />
    </svg>
  );
}

const CHIP =
  'absolute flex items-center gap-2 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 shadow-[0_16px_32px_-16px_rgba(26,20,16,0.3)]';

export function EcommerceVignette({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="A custom online store with checkout, order alerts and stock sync, built on our platform or as a Shopify storefront."
      className={cn('relative mx-auto w-full max-w-[460px] px-6 py-8', className)}
    >
      <div aria-hidden>
        {/* Storefront card */}
        <div className="mx-auto w-[78%] rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-5 shadow-[0_24px_48px_-24px_rgba(26,20,16,0.25)]">
          <div className="relative overflow-hidden rounded-[var(--radius-m)] bg-[var(--color-surface-2)]">
            <div className="aspect-[4/3]" />
            {/* abstract product: a packet with an accent label */}
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <div className="h-24 w-20 rounded-[10px] bg-[var(--color-bg)] shadow-sm">
                <div className="mx-auto mt-2 h-2 w-12 rounded-full bg-[var(--color-surface)]" />
                <div className="mx-auto mt-3 h-10 w-14 rounded-[6px] bg-[var(--color-accent-tint)]" />
              </div>
            </div>
            {/* wishlist heart */}
            <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-bg)] shadow-sm">
              <Heart className="h-4 w-4 text-[var(--color-accent)]" />
            </div>
          </div>

          {/* carousel dots */}
          <div className="mt-4 flex justify-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-line-2)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-line-2)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-line-2)]" />
          </div>

          {/* skeleton copy */}
          <div className="mt-4 space-y-2">
            <div className="h-3 w-2/3 rounded-full bg-[var(--color-surface-2)]" />
            <div className="h-3 w-1/2 rounded-full bg-[var(--color-surface)]" />
          </div>

          {/* CTA */}
          <div className="mt-5 inline-flex h-11 items-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--color-on-accent)]">
            Add to basket
          </div>
        </div>

        {/* Shopify chip */}
        <div className={cn(CHIP, 'float-slow -left-1 top-6 -rotate-2')}>
          <ShopifyMark className="h-5 w-5" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
            Custom Shopify builds
          </span>
        </div>

        {/* Checkout pill */}
        <div className="float-slower absolute -right-1 top-[42%] flex rotate-2 items-center gap-3 rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-4 py-2.5 shadow-[0_16px_32px_-16px_rgba(26,20,16,0.4)]">
          <span className="flex items-center gap-1 text-[12px] font-semibold text-[var(--color-on-dark)]">
            <AppleMark className="h-3.5 w-3.5" />
            Pay
          </span>
          <span className="h-3 w-px bg-[rgba(248,247,245,0.25)]" />
          <span className="flex items-center gap-1 text-[12px] font-semibold text-[var(--color-on-dark)]">
            <GoogleMark className="h-3.5 w-3.5" />
            Pay
          </span>
        </div>

        {/* Order notification chip */}
        <div className={cn(CHIP, 'float-slowest -left-3 bottom-16 rotate-1')}>
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
          <span className="text-[11px] font-bold text-[var(--color-text)]">
            Order received
            <span className="ml-1.5 font-medium text-[var(--color-text-mute)]">just now</span>
          </span>
        </div>

        {/* Stock chip */}
        <div className={cn(CHIP, 'float-slow -right-2 bottom-2 -rotate-1')}>
          <PackageCheck className="h-4 w-4 text-[var(--color-accent)]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
            Stock synced
          </span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS; 0 errors (pre-existing warnings only). The component is not rendered anywhere yet; that is fine.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(frontend)/globals.css" src/components/sections/EcommerceVignette.tsx
git commit -m "feat(vignette): EcommerceVignette component + float utilities"
```

### Task 3: Wire the vignette + Shopify copy overhaul

**Files:**
- Modify: `src/service-pages.test.ts`
- Modify: `src/app/(frontend)/ecommerce/page.tsx`

**Interfaces:**
- Consumes: `ServicePage` `visual` prop (Task 1), `EcommerceVignette` (Task 2).

- [ ] **Step 1: Extend the test first**

Append to `src/service-pages.test.ts` (after the existing `describe` block):

```ts
describe('ecommerce vignette + Shopify positioning', () => {
  const file = path.join(base, 'ecommerce', 'page.tsx');
  it('ecommerce/page.tsx renders EcommerceVignette', () => {
    expect(readFileSync(file, 'utf8')).toMatch(/EcommerceVignette/);
  });
  it('ecommerce/page.tsx positions Shopify in the intro', () => {
    expect(readFileSync(file, 'utf8')).toMatch(/custom Shopify storefront/);
  });
});
```

- [ ] **Step 2: Run the test, expect failure**

Run: `npx vitest run src/service-pages.test.ts`
Expected: FAIL — the two new tests fail (page neither imports the vignette nor carries the new intro); the original 10 still pass.

- [ ] **Step 3: Apply the page changes**

In `src/app/(frontend)/ecommerce/page.tsx`:

Add the import:

```tsx
import { EcommerceVignette } from '@/components/sections/EcommerceVignette';
```

Replace these `data` fields with exactly (all other fields unchanged):

```ts
  intro:
    'We build online shops on our own platform or as a custom Shopify storefront: products, stock, orders, and payments, with a dashboard and an iOS app so you run the shop from anywhere. No marketplace commission, no per-sale fee to a third party.',
  metaDescription:
    'russle builds custom online stores for ambitious businesses across the UK, on our own platform or as a custom Shopify storefront. Products, stock, orders, payments, and a dashboard.',
```

Replace the sixth `included` entry (`{ title: 'Optional extras', ... }`) with:

```ts
    { title: 'Our platform or Shopify', body: 'No monthly builder fee on ours, or a custom storefront on the Shopify store you already run.' },
```

Replace the second `how` entry (`'We agree the storefront, the checkout, and how stock is managed.'`) with:

```ts
    'We agree the storefront, the checkout, and whether it runs on our platform or Shopify.',
```

Replace the first `faq` entry's `a` (the `'Is this Shopify?'` answer) with:

```ts
      a: 'It can be. Most stores run on our platform, which means no monthly builder fee and no per-sale cut. If you run Shopify or want to, we design and build a custom storefront on top of it, so you keep the Shopify checkout and admin you know.',
```

Replace `schema.description` with:

```ts
    description: 'Custom online store design and build, on our own platform or as a headless Shopify storefront, for businesses across the UK.',
```

Replace the page component's return with:

```tsx
export default function EcommercePage() {
  return <ServicePage data={data} visual={<EcommerceVignette />} />;
}
```

- [ ] **Step 4: Run the full verification**

Run: `npx vitest run && npx tsc --noEmit && npm run lint`
Expected: all vitest green including guard 8/8 and the two new tests; tsc PASS; lint 0 errors.

- [ ] **Step 5: Visual check**

The dev server is already running at `http://localhost:3005`. Open `/ecommerce`: vignette sits right of the hero copy on desktop, stacks below CTAs on mobile widths; chips float subtly; `/web-design` and `/seo` heroes unchanged.

- [ ] **Step 6: Commit**

```bash
git add src/service-pages.test.ts "src/app/(frontend)/ecommerce/page.tsx"
git commit -m "feat(vignette): wire EcommerceVignette + Shopify positioning on /ecommerce"
```

---

## Self-Review (completed by plan author)

**Spec coverage:** §3.1 slot → Task 1; §3.2 component + motion → Task 2; §3.3 wiring + §4 copy strings → Task 3; §5 testing → Task 3 Steps 1-4 (+ Task 1 Step 2, Task 2 Step 3); §2 constraints → Global Constraints. No gaps.

**Placeholder scan:** every code step carries complete code; no TBDs.

**Type consistency:** `visual?: ReactNode` (Task 1) matches `visual={<EcommerceVignette />}` (Task 3); `EcommerceVignette({ className })` named export consistent between Tasks 2 and 3; `CHIP` constant used only within its own file.

**Copy strings match the spec §4 verbatim.** No `£`, no em dashes, no tier names anywhere in new code or copy (checked each string).
