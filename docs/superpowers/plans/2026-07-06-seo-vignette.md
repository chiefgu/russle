# /seo Hero Vignette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the second composed vignette, a climbing-SERP illustration, to the `/seo` hero via the existing ServicePage `visual` slot.

**Architecture:** One new server component (`SeoVignette`) in the established vignette idiom: token-driven JSX, `role="img"`, local CHIP constant and local SVG mark, reusing the `float-*` utilities already in globals.css. Wiring is a one-line prop on `/seo/page.tsx`; no copy changes.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, lucide-react, vitest.

## Global Constraints

Copied from the spec (`docs/superpowers/specs/2026-07-06-seo-vignette-design.md`):

- **Honesty:** the highlighted result is in SECOND position with an up arrow — climbing, never a #1 badge (the /seo FAQ refuses "guarantee number one").
- Repositioning guard bans in `src/`: `£`, em dash (—), `/\bads\b/i`, "brand & growth agency", geo terms.
- Lowercase **russle**; no tier names; no prices.
- `/web-design` and `/ecommerce` untouched; `/seo` page changes are import + `visual` prop ONLY.
- Verification from `russle-site/`: `npx vitest run`, `npx tsc --noEmit`, `npm run lint` — **tsc/lint foreground, unsandboxed** (sandboxed Node stalls). Branch: `reposition-web-ecommerce-seo`.

---

### Task 1: `SeoVignette` component

**Files:**
- Create: `src/components/sections/SeoVignette.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/cn`; `float-slow`/`float-slower`/`float-slowest` utilities (already in globals.css); design tokens.
- Produces: `SeoVignette({ className }: { className?: string })` — named export, server component. Task 2 renders it.

- [ ] **Step 1: Create the component**

Create `src/components/sections/SeoVignette.tsx` with exactly:

```tsx
import { Search, ArrowUp, Sparkles, TrendingUp, CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/cn';

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

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-2 py-1.5">
      <span className="h-6 w-6 shrink-0 rounded-full bg-[var(--color-surface-2)]" />
      <div className="flex-1 space-y-1.5">
        <div className="h-2 w-3/4 rounded-full bg-[var(--color-surface-2)]" />
        <div className="h-2 w-1/2 rounded-full bg-[var(--color-surface)]" />
      </div>
    </div>
  );
}

export function SeoVignette({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Search results with your site climbing the rankings, cited in AI answers and reported monthly."
      className={cn('relative mx-auto w-full max-w-[460px] px-6 py-8', className)}
    >
      <div aria-hidden>
        {/* SERP card */}
        <div className="mx-auto w-[78%] rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-5 shadow-[0_24px_48px_-24px_rgba(26,20,16,0.25)]">
          {/* search bar */}
          <div className="flex items-center gap-2.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-2)] px-4 py-2.5">
            <Search className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-soft)]" />
            <span className="h-2.5 w-2/3 rounded-full bg-[var(--color-bg)]" />
          </div>

          {/* results */}
          <div className="mt-5 space-y-2.5">
            <SkeletonRow />

            {/* your result, climbing */}
            <div className="flex items-center gap-3 rounded-[var(--radius-m)] bg-[var(--color-accent-tint)] px-3 py-3">
              <span className="h-6 w-6 shrink-0 rounded-full bg-[var(--color-accent)]" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2 w-5/6 rounded-full bg-[var(--color-line-2)]" />
                <div className="h-2 w-2/3 rounded-full bg-[var(--color-line)]" />
              </div>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]">
                <ArrowUp className="h-3.5 w-3.5 text-[var(--color-on-accent)]" />
              </span>
            </div>

            <SkeletonRow />
          </div>
        </div>

        {/* Google chip */}
        <div className={cn(CHIP, 'float-slow -right-1 top-6 rotate-2')}>
          <GoogleMark className="h-4.5 w-4.5" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
            Found on Google
          </span>
        </div>

        {/* Impressions dark pill */}
        <div className="float-slower absolute -left-1 top-[42%] flex -rotate-2 items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-4 py-2.5 shadow-[0_16px_32px_-16px_rgba(26,20,16,0.4)]">
          <TrendingUp className="h-4 w-4 text-[var(--color-accent-hi)]" />
          <span className="text-[12px] font-semibold text-[var(--color-on-dark)]">Impressions climbing</span>
        </div>

        {/* AI answers chip */}
        <div className={cn(CHIP, 'float-slowest -right-3 bottom-16 -rotate-1')}>
          <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
            Cited in AI answers
          </span>
        </div>

        {/* Reporting chip */}
        <div className={cn(CHIP, 'float-slow -left-2 bottom-2 rotate-1')}>
          <CalendarCheck className="h-4 w-4 text-[var(--color-accent)]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
            Reported monthly
          </span>
        </div>
      </div>
    </div>
  );
}
```

Note: `h-4.5`/`w-4.5` are valid Tailwind 4 arbitrary-spacing utilities (18px). If lint or the dev overlay rejects them, use `h-[18px] w-[18px]`.

- [ ] **Step 2: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: tsc PASS; lint 0 errors (12 pre-existing warnings elsewhere). Component not rendered anywhere yet — fine.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/SeoVignette.tsx
git commit -m "feat(vignette): SeoVignette climbing-SERP component"
```

### Task 2: Wire the vignette on `/seo` (TDD)

**Files:**
- Modify: `src/service-pages.test.ts`
- Modify: `src/app/(frontend)/seo/page.tsx`

**Interfaces:**
- Consumes: `SeoVignette` (Task 1); `ServicePage` `visual` prop (already shipped).

- [ ] **Step 1: Extend the test first**

In `src/service-pages.test.ts`, append inside the file (after the `'ecommerce vignette + Shopify positioning'` describe block):

```ts
describe('seo vignette', () => {
  const file = path.join(base, 'seo', 'page.tsx');
  it('seo/page.tsx renders SeoVignette', () => {
    expect(readFileSync(file, 'utf8')).toMatch(/SeoVignette/);
  });
});
```

- [ ] **Step 2: Run the test, expect failure**

Run: `npx vitest run src/service-pages.test.ts`
Expected: FAIL — the new test fails; the existing 11 pass.

- [ ] **Step 3: Wire the page**

In `src/app/(frontend)/seo/page.tsx`, add the import below the ServicePage import:

```tsx
import { SeoVignette } from '@/components/sections/SeoVignette';
```

and replace the default export's return:

```tsx
export default function SeoPage() {
  return <ServicePage data={data} visual={<SeoVignette />} />;
}
```

No other changes to the file.

- [ ] **Step 4: Full verification**

Run: `npx vitest run && npx tsc --noEmit && npm run lint`
Expected: all green (38 tests), guard 8/8, tsc PASS, lint 0 errors.

- [ ] **Step 5: Visual check**

User verifies at `http://localhost:3005/seo` (hot reload). `/ecommerce` and `/web-design` unchanged.

- [ ] **Step 6: Commit**

```bash
git add src/service-pages.test.ts "src/app/(frontend)/seo/page.tsx"
git commit -m "feat(vignette): wire SeoVignette on /seo"
```

---

## Self-Review (completed by plan author)

**Spec coverage:** §3 component (SERP card, second-position highlight + ArrowUp, four chips with mirrored positions, local GoogleMark/CHIP) → Task 1; §4 wiring → Task 2; §5 testing → Task 2 Steps 1-4; §2 honesty constraint → Task 1 (row 2 of 3, ArrowUp badge, no #1); §6 constraints → Global Constraints. No gaps.

**Placeholder scan:** all steps carry complete code/commands.

**Type consistency:** `SeoVignette({ className })` named export matches Task 2's import/usage; `SkeletonRow` used only within its own file; icons imported (Search, ArrowUp, Sparkles, TrendingUp, CalendarCheck) all appear in the JSX.

**Copy check:** chip strings carry no banned terms; no `£`, no em dashes, no tier names.
