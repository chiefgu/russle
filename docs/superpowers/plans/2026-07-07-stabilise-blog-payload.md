# Stabilise: Payload/Blog Bugs + Prod Content Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the four audit §8 bugs (missing `posts_faq` migration, Payload draft exposure, missing error boundaries, analytics consent/conversion gaps), make the seed scripts prod-safe, then refresh the live Payload blog content to the repositioned copy.

**Architecture:** Code fixes ship as one branch (`stabilise-blog-payload`) through the normal verify→merge→Vercel pipeline, with `payload migrate` wired into the build so the new migration lands with the deploy. The prod content refresh is a separate ordered runbook executed AFTER the code deploy: Neon backup branch → patched seed scripts against prod → retire script (hard-deletes the two geo posts) → live verification.

**Tech Stack:** Next.js 16 (App Router), Payload 3 + @payloadcms/db-postgres (Neon), vitest, Vercel, neonctl.

## Global Constraints

- **Env var is `DATABASE_URL`** (not DATABASE_URI). `.env.local` points at the Neon `dev` branch; prod targeting is ONLY via shell `export DATABASE_URL=<prod>` (+ `PAYLOAD_SECRET`) before `npx payload run ...`.
- **Every command that touches the prod DB must run with `NODE_ENV=production` exported.** Payload's postgres adapter runs drizzle `pushDevSchema` whenever `NODE_ENV !== 'production'` (node_modules/@payloadcms/db-postgres/dist/connect.js:110) — without this, a local seed run against prod can silently alter the prod schema.
- Repositioning guard must stay 8/8 (`npx vitest run src/repositioning-guard.test.ts`): no em dashes, `£`, geo terms, `\bads\b`, or "brand & growth agency" in any new copy/comments under src/ or scripts/.
- Voice in any user-facing copy: lowercase russle, studio "we", no prices.
- Run `npx tsc --noEmit`, `npm run lint`, `npm run build` in the FOREGROUND, unsandboxed (sandboxed Node stalls; vitest is fine sandboxed). `cd /Users/henry/Desktop/russle/russle-site` explicitly in every shell step.
- Branch: create `stabilise-blog-payload` off current `main`. Never commit pulled env files; delete them after use.

---

## Phase A — Code fixes

### Task 1: `posts_faq` migration + migrate-on-build

The `faq` array field (src/collections/Posts.ts:41-54) was added after the only migration (20260605_113948_initial); dev push-mode masks it locally, but any migrate-only DB throws `relation "posts_faq" does not exist` on EVERY posts query (blog list, post pages, sitemap, admin). Prod survives today only because prod was originally push-seeded; the migration chain must become self-sufficient.

**Files:**
- Create: `src/migrations/<timestamp>_posts_faq.ts` (generated)
- Modify: `src/migrations/index.ts` (auto-updated by the CLI)
- Modify: `package.json:7` (build script)
- Create: `scripts/smoke-posts.ts`

- [ ] **Step 1: Create branch**

```bash
cd /Users/henry/Desktop/russle/russle-site
git checkout main && git pull --ff-only && git checkout -b stabilise-blog-payload
```

- [ ] **Step 2: Generate the migration**

```bash
npx payload migrate:create posts_faq
```
Expected: a new file under `src/migrations/` and an updated `src/migrations/index.ts`. Inspect the generated `up`: it MUST create `posts_faq` AND `_posts_v_faq` (versions mirror) with `question`/`answer` columns, FKs to `posts`/`_posts_v`, `_order`/`_parent_id` columns and indexes, matching the shape of the existing `posts_texts`/`_posts_v_texts` tables in 20260605_113948_initial.ts:88-123. If the diff includes unrelated drift beyond the two faq tables, STOP and report (do not hand-edit blindly).

- [ ] **Step 3: Rehearse against a fresh Neon branch of prod**

```bash
npx vercel env pull /tmp/russle-prod.env --environment=production
neonctl projects list   # find the russle project id
neonctl branches create --project-id <id> --name migrate-rehearsal-20260707 --parent main
# neonctl prints the new branch's connection string; use IT (not prod main):
export NODE_ENV=production
export DATABASE_URL=<rehearsal-branch-connection-string>
export PAYLOAD_SECRET=$(grep '^PAYLOAD_SECRET=' /tmp/russle-prod.env | cut -d'=' -f2- | tr -d '"')
npx payload migrate
```
Expected: runs exactly one pending migration (posts_faq), exit 0.

- [ ] **Step 4: Smoke the posts query against the rehearsal branch**

Create `scripts/smoke-posts.ts`:

```ts
/**
 * Smoke test: can we query posts (incl. the faq join) on this DATABASE_URL?
 * Run: npx payload run scripts/smoke-posts.ts
 */
import { getPayload } from 'payload';
import config from '@payload-config';

const payload = await getPayload({ config });
const res = await payload.find({ collection: 'posts', limit: 1, overrideAccess: true, draft: true });
console.log('OK posts query, total:', res.totalDocs);
process.exit(0);
```

Run (same env as Step 3): `npx payload run scripts/smoke-posts.ts`
Expected: `OK posts query, total: <n>` with no `posts_faq` error. Then clean up: `unset DATABASE_URL PAYLOAD_SECRET NODE_ENV` and delete the rehearsal branch: `neonctl branches delete migrate-rehearsal-20260707 --project-id <id>`.

- [ ] **Step 5: Wire migrate into the build**

In `package.json`, change `"build": "next build"` to:

```json
"build": "payload migrate && next build",
```
Note: Vercel preview builds share the prod `DATABASE_URL` (known repo state), so previews will also run migrations — acceptable because `payload migrate` is idempotent via the `payload_migrations` table; note it in the commit body.

- [ ] **Step 6: Verify local suite still green**

```bash
npx vitest run && npx tsc --noEmit && npm run lint
```
Expected: 39/39, tsc clean, 0 lint errors. (Local dev DB already has the tables via push-mode; `payload migrate` locally is a no-op or fast-forward — run `npx payload migrate` once locally to confirm exit 0.)

- [ ] **Step 7: Commit**

```bash
git add src/migrations package.json scripts/smoke-posts.ts
git commit -m "fix(payload): posts_faq migration + migrate-on-build

Vercel preview builds share prod DATABASE_URL; payload migrate is
idempotent via payload_migrations, so build-time migrate is safe."
```

### Task 2: Lock down draft reads + GraphQL playground

**Files:**
- Modify: `src/collections/Posts.ts:15`
- Modify: `src/payload.config.ts` (add `graphQL` key)
- Test: `src/payload-access.test.ts` (new)

Categories/Media keep `read: () => true` deliberately: Categories has no versions (no drafts to leak) and its docs must stay publicly readable for population on posts; Media is public imagery.

- [ ] **Step 1: Write the failing source-level test**

Create `src/payload-access.test.ts` (same source-grep idiom as service-pages.test.ts):

```ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const read = (p: string) => readFileSync(path.resolve(__dirname, p), 'utf8');

describe('payload access hardening', () => {
  it('Posts read access is status-gated, not wide open', () => {
    const src = read('collections/Posts.ts');
    expect(src).not.toMatch(/read:\s*\(\)\s*=>\s*true/);
    expect(src).toMatch(/_status.*published/);
  });
  it('GraphQL playground is disabled in production', () => {
    expect(read('payload.config.ts')).toMatch(/disablePlaygroundInProduction:\s*true/);
  });
});
```

Run: `npx vitest run src/payload-access.test.ts` — Expected: FAIL (both).

- [ ] **Step 2: Status-gate Posts read**

In `src/collections/Posts.ts`, replace `access: { read: () => true },` with:

```ts
  access: {
    // Anonymous requests see published posts only; logged-in admin sees all.
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
```

- [ ] **Step 3: Disable the GraphQL playground in production**

In `src/payload.config.ts`, add to the `buildConfig({ ... })` object (top level, alongside `collections`):

```ts
  graphQL: {
    disablePlaygroundInProduction: true,
  },
```

- [ ] **Step 4: Confirm the frontend and preview still work**

- `src/lib/posts.ts` `getPublishedPosts` uses `overrideAccess: false` + its own published filter: unaffected.
- `getPostBySlug(slug, { draft: true })` passes `overrideAccess` for preview: verify by reading src/lib/posts.ts:33-49 that draft/preview path sets `overrideAccess: true` (or equivalent) so the access change cannot break /preview. If it relies on anonymous draft read, fix THAT call site to pass `overrideAccess: true` (server-side only) and note it in the commit.

Run: `npx vitest run && npx tsc --noEmit`
Expected: all green including the new test (41/41).

- [ ] **Step 5: Commit**

```bash
git add src/collections/Posts.ts src/payload.config.ts src/payload-access.test.ts
git commit -m "fix(payload): status-gate Posts read, disable GraphQL playground in prod"
```

### Task 3: Error boundaries

**Files:**
- Create: `src/app/(frontend)/error.tsx`
- Create: `src/app/global-error.tsx`

There is no root layout above the route groups, so `global-error.tsx` must self-supply `<html>/<body>` with inline styles (token hex values hardcoded). The frontend `error.tsx` matches `src/app/(frontend)/not-found.tsx`'s Section/Tag/ButtonLink composition. Admin keeps Payload's built-ins.

- [ ] **Step 1: Create `src/app/(frontend)/error.tsx`**

```tsx
'use client';

import { useEffect } from 'react';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';

export default function FrontendError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section tone="bg" spacing="heroTop" container="narrow">
      <Tag tone="accent">Something went wrong</Tag>
      <h1 className="h1 mt-6 text-balance">That did not load properly.</h1>
      <p className="text-big mt-6 text-[var(--color-text-mute)]">
        Try again in a moment. If it keeps happening, email hello@russle.co.uk and we will sort it.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-14 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--color-accent)] px-8 text-[14px] font-bold uppercase tracking-[0.08em] text-[var(--color-on-accent)] transition-colors hover:bg-[var(--color-accent-hi)]"
        >
          Try again
        </button>
        <ButtonLink href="/" variant="secondary" size="lg">Back to home</ButtonLink>
      </div>
    </Section>
  );
}
```
(Before committing, compare the button classes to the primary variant in `src/components/ui/Button.tsx` and align if they drifted.)

- [ ] **Step 2: Create `src/app/global-error.tsx`**

```tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#F8F7F5',
          color: '#1A1410',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center', padding: 24 }}>
          <p style={{ fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#DF5613', fontWeight: 700, margin: 0 }}>
            russle
          </p>
          <h1 style={{ fontSize: 32, margin: '16px 0 8px', letterSpacing: '-0.02em' }}>Something went wrong.</h1>
          <p style={{ color: 'rgba(26,20,16,0.54)', margin: 0 }}>Try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 24, height: 48, padding: '0 28px', borderRadius: 999, border: 0, background: '#DF5613', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify + exercise**

```bash
npx tsc --noEmit && npm run lint
```
Expected: clean. Then exercise the boundary once in dev: start the dev server, temporarily add `throw new Error('boundary check')` at the top of `src/app/(frontend)/conversion/page.tsx`'s component, load /conversion, confirm the styled error page renders with a working "Try again"; REVERT the throw before committing (`git diff` must show only the two new files).

- [ ] **Step 4: Commit**

```bash
git add src/app/global-error.tsx "src/app/(frontend)/error.tsx"
git commit -m "fix(app): frontend + global error boundaries"
```

### Task 4: ContactForm conversion + consent-gated Vercel Analytics

**Files:**
- Modify: `src/components/sections/ContactForm.tsx` (add trackConversion on success)
- Create: `src/components/layout/ConsentGatedAnalytics.tsx`
- Modify: `src/components/layout/CookieBanner.tsx` (dispatch consent-change event)
- Modify: `src/app/(frontend)/layout.tsx:155` (swap `<Analytics />`)

Out of scope (flag, don't fix): Meta Pixel's init fires `fbq('track','PageView')` after `consent revoke` on load — revoke queues events until grant per Meta's consent API; confirm-and-decide separately.

- [ ] **Step 1: Wire the dormant contact_form conversion**

Read `src/lib/conversions.ts:22-26` for the exact `contact_form` variant shape, then in `src/components/sections/ContactForm.tsx`: import `trackConversion` from `@/lib/conversions` and call it immediately after the successful-submit check (the `res.ok`/success branch before `setState('success')`), mirroring the IntakeForm precedent at src/components/sections/IntakeForm.tsx:264:

```ts
trackConversion({ type: 'contact_form' });
```
(Extend with the variant's required fields if the union defines any; the call must typecheck against the existing union, not a widened one.)

- [ ] **Step 2: Create the consent gate**

`src/components/layout/ConsentGatedAnalytics.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';

const STORAGE_KEY = 'russle-cookie-consent-v1';
export const CONSENT_CHANGE_EVENT = 'russle-consent-change';

export function ConsentGatedAnalytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const read = () => setGranted(localStorage.getItem(STORAGE_KEY) === 'granted');
    read();
    window.addEventListener(CONSENT_CHANGE_EVENT, read);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, read);
  }, []);

  return granted ? <Analytics /> : null;
}
```
First read `src/components/layout/CookieBanner.tsx:7` and confirm the stored value is the raw string `'granted' | 'denied'`; if it is JSON-wrapped, adjust the `read()` comparison to match the actual stored shape.

- [ ] **Step 3: Broadcast consent changes from CookieBanner**

In `CookieBanner.tsx`, immediately after the `localStorage.setItem(STORAGE_KEY, ...)` write in the choice handler, add:

```ts
window.dispatchEvent(new Event('russle-consent-change'));
```
(Use the literal string; importing the constant from ConsentGatedAnalytics is fine too — keep them identical.)

- [ ] **Step 4: Swap the unconditional mount**

In `src/app/(frontend)/layout.tsx`: replace the `<Analytics />` at line ~155 with `<ConsentGatedAnalytics />`, replace the `@vercel/analytics/next` import with `import { ConsentGatedAnalytics } from '@/components/layout/ConsentGatedAnalytics';`.

- [ ] **Step 5: Verify**

```bash
npx vitest run && npx tsc --noEmit && npm run lint
```
Expected: all green. In the dev server: with no stored consent, no `/_vercel/insights` script loads; after accepting the banner, it loads without a reload (event-driven); after declining, it does not.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/ContactForm.tsx src/components/layout/ConsentGatedAnalytics.tsx src/components/layout/CookieBanner.tsx "src/app/(frontend)/layout.tsx"
git commit -m "fix(analytics): contact_form conversion + consent-gate Vercel Analytics"
```

### Task 5: Seed-script prod-safety

**Files:**
- Modify: `scripts/seed-content.ts`, `seed-blog.ts`, `seed-batch-2.ts` … `seed-batch-7.ts`, `seed-faqs.ts`, `seed-post-squarespace.ts`, `retire-local-posts.ts`

Four mechanical rules, applied consistently:

- [ ] **Step 1: Preserve `_status` on update in every seed script**

In every update-or-create block (seed-content.ts:102-108, seed-blog.ts:96-102, seed-batch-2.ts:56-57, seed-batch-3.ts:49-50, seed-batch-4.ts:34-35, seed-batch-5.ts:33-34, seed-batch-6.ts:33-34, seed-batch-7.ts:34-35, seed-post-squarespace.ts:99-104), the UPDATE call must not carry `_status` (creates keep it). Worked example (seed-batch-4 shape):

```ts
if (existing.docs[0]) {
  // Refresh content only; never flip a live post's publish state.
  const { _status, ...contentData } = data;
  await payload.update({ collection: 'posts', id: existing.docs[0].id, data: contentData, overrideAccess: true });
} else {
  await payload.create({ collection: 'posts', data, overrideAccess: true });
}
```
Apply the identical transform in each script (variable names differ per file; the rule is: destructure `_status` out of the update payload only).

- [ ] **Step 2: Make the two draft-blind lookups draft-aware**

`seed-batch-2.ts:55` and `seed-post-squarespace.ts:98`: add `draft: true, overrideAccess: true` to the `payload.find` options (matching seed-batch-3's:48 pattern) so draft-only slugs update instead of colliding with the unique slug constraint.

- [ ] **Step 3: seed-faqs must not force status; categories must update descriptions**

- `seed-faqs.ts:87`: remove `_status: entry.status` from the update payload (FAQ content only). Delete the now-unused status map values if lint flags them.
- In every script's category upsert helper (`upsertCategory`/`cat()`, e.g. seed-content.ts:65-73, seed-batch-4.ts:27-30): when the category exists but `description` differs, update it:

```ts
const existing = found.docs[0];
if (existing) {
  if (description && existing.description !== description) {
    await payload.update({ collection: 'categories', id: existing.id, data: { description }, overrideAccess: true });
  }
  return existing;
}
return payload.create({ collection: 'categories', data: { title, slug, description }, overrideAccess: true });
```
(Adapt to each helper's actual signature; scripts whose helper takes no description keep create-only.)

- [ ] **Step 4: Make retire-local-posts honest**

`scripts/retire-local-posts.ts:2-4`: rewrite the docstring to state what it does: permanently DELETES the two retired local-SEO posts by slug (`local-seo-cheshire-south-manchester`, `cheshire-marketing-playbook`); keep the delete behavior.

- [ ] **Step 5: Verify**

```bash
npx vitest run && npx tsc --noEmit && npm run lint
```
Expected: all green (guard still 8/8 — no banned strings in the edits). Then rehearse the full refresh against the LOCAL dev DB (which mirrors the old prod content shape): run each seed script + retire once via `npx payload run scripts/<file>.ts` (no env exports — .env.local applies); every script must exit 0, second run of seed-batch-2 must exit 0 (idempotency proof).

- [ ] **Step 6: Commit**

```bash
git add scripts/
git commit -m "fix(seeds): preserve _status on update, draft-aware lookups, category description refresh, honest retire docstring"
```

### Task 6: Ship Phase A

- [ ] **Step 1: Full verification**

```bash
npx vitest run && npx tsc --noEmit && npm run lint && rm -rf .next && npm run build
```
Expected: all green; build now runs `payload migrate` first (against the dev DB: no-op) then compiles all routes.

- [ ] **Step 2: Merge + deploy**

```bash
git checkout main && git pull --ff-only origin main
git merge --no-ff stabilise-blog-payload -m "Merge stabilise-blog-payload: posts_faq migration, draft lockdown, error boundaries, analytics consent, prod-safe seeds"
git push origin main
```
Watch `npx vercel ls russle --prod` (foreground, unsandboxed) until the new deployment is Ready. The build-time `payload migrate` applies posts_faq to prod during this deploy.

- [ ] **Step 3: Post-deploy checks**

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://russle.co.uk/blog                      # 200
curl -s "https://russle.co.uk/cms-api/posts?where\[_status\]\[equals\]=draft&limit=1"   # totalDocs: 0
curl -s -o /dev/null -w "%{http_code}\n" https://russle.co.uk/cms-api/graphql-playground # non-200 (404/403)
```

---

## Phase B — Prod content refresh (runbook, AFTER Phase A deploy)

### Task 7: Refresh live blog content

- [ ] **Step 1: Backup prod DB**

```bash
neonctl branches create --project-id <id> --name backup-content-refresh-20260707 --parent main
```
Record the branch name in the session notes. Do not proceed without it.

- [ ] **Step 2: Point the shell at prod (this shell only)**

```bash
cd /Users/henry/Desktop/russle/russle-site
npx vercel env pull /tmp/russle-prod.env --environment=production
export NODE_ENV=production
export DATABASE_URL=$(grep '^DATABASE_URL=' /tmp/russle-prod.env | cut -d'=' -f2- | tr -d '"')
export PAYLOAD_SECRET=$(grep '^PAYLOAD_SECRET=' /tmp/russle-prod.env | cut -d'=' -f2- | tr -d '"')
```
Never echo the values. Sanity-check the target before writing anything: `npx payload run scripts/smoke-posts.ts` → prints the prod post count.

- [ ] **Step 3: Record the published count (churn guard)**

```bash
curl -s "https://russle.co.uk/cms-api/posts?where\[_status\]\[equals\]=published&limit=0" | head -c 300
```
Note `totalDocs` (call it N).

- [ ] **Step 4: Run the reworded seeds against prod**

```bash
for s in seed-content seed-batch-2 seed-batch-3 seed-batch-4 seed-batch-5 seed-batch-6 seed-batch-7 seed-faqs seed-post-squarespace; do
  npx payload run scripts/$s.ts || { echo "FAILED: $s"; break; }
done
```
(seed-blog.ts is the dev smoke post — skip.) Every script must exit 0; on any failure STOP and assess before continuing.

- [ ] **Step 5: Retire the two geo posts (deletes them)**

```bash
npx payload run scripts/retire-local-posts.ts
```
Expected output: `Deleted: local-seo-cheshire-south-manchester`, `Deleted: cheshire-marketing-playbook` (or NOT FOUND if already gone).

- [ ] **Step 6: Verify, then drop creds**

```bash
# published count: N minus however many retired posts were published (expect N or N-1 or N-2)
curl -s "https://russle.co.uk/cms-api/posts?where\[_status\]\[equals\]=published&limit=0" | head -c 300
# no stale copy on live rendered posts (spot-check 3 reworded slugs):
for slug in what-is-a-brand-and-growth-agency website-not-getting-enquiries is-seo-worth-it-small-business; do
  curl -s "https://russle.co.uk/blog/$slug" | grep -ciE "cheshire|south manchester|brand and growth agency|1,995" && echo "STALE: $slug" || echo "clean: $slug"
done
unset DATABASE_URL PAYLOAD_SECRET NODE_ENV
rm /tmp/russle-prod.env
```
All spot-checks must print `clean`. (A 404 for a draft slug is fine — check published ones.)

- [ ] **Step 7: Note the backup retention**

Leave `backup-content-refresh-20260707` in place for a week, then delete via `neonctl branches delete`. Record in the final report.

---

## Self-Review (completed by plan author)

**Coverage vs the work order:** posts_faq → Task 1; draft exposure → Task 2; error boundaries → Task 3; analytics consent + contact conversion → Task 4; prod content refresh → Tasks 5 (safety) + 7 (runbook); Task 6 ships and sequences the deploy before the refresh.

**Placeholder scan:** all code steps carry code; two verify-then-adapt instructions (conversions union fields, CookieBanner storage shape) name the exact file:line to check and the rule to apply — investigation facts, not gaps.

**Type/name consistency:** `ConsentGatedAnalytics` name matches across Task 4 steps; `smoke-posts.ts` created in Task 1 is reused in Task 7 Step 2; STORAGE_KEY string matches the investigated value `russle-cookie-consent-v1`; event string literal identical in both files.

**Safety rails:** NODE_ENV=production on all prod-touching runs (push-mode hazard); Neon backup branch mandatory before writes; churn guard via published-count; seeds patched to preserve status BEFORE any prod run; retire runs AFTER seeds so the reworded geo posts cannot be resurrected.
