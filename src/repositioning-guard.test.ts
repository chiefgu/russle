import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const SRC = path.resolve(__dirname);
const SCRIPTS = path.resolve(__dirname, '..', 'scripts');

// Retired in the 2026-07-01 reposition — excluded from the copy scan.
// NOTE: the web-design-* routes and LocalityPage were REVIVED for the local
// SEO drive (2026-09-02) and are scanned again; only the truly dead files stay.
const DOOMED = [
  'content/locality',
  'app/(frontend)/south-manchester-cheshire-brand-web-design',
  'components/sections/RegionHub.tsx',
  'lib/locality.ts',
];

// Local SEO drive (2026-09-02): locality pages and the site frame carry
// self-geo and local-audience copy by design. Geo rules are scoped to allow
// these files; every other rule (em dash, price, false claims) still applies
// to them in full.
const LOCAL_OK = [
  'content/locations.ts',
  'components/sections/LocalityPage.tsx',
  'components/sections/vignettes/LocalVignette.tsx',
  'app/(frontend)/web-design-',
  'app/(frontend)/layout.tsx',
  'components/layout/Footer.tsx',
  // A contact page saying where the studio is and how far it travels is
  // normal, and it carries local relevance for the same drive.
  'app/(frontend)/contact/page.tsx',
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

const BANNED: { label: string; re: RegExp; allow?: string[] }[] = [
  { label: 'em dash', re: /—/ },
  { label: 'independent business framing', re: /independent\s+business|\bindependents\b/i, allow: LOCAL_OK },
  { label: 'self geo: Alderley Edge', re: /Alderley Edge/, allow: LOCAL_OK },
  { label: 'self geo: South Manchester', re: /South Manchester/, allow: LOCAL_OK },
  { label: 'price on site', re: /£/ },
  { label: 'brand & growth agency self-descriptor', re: /brand\s*&\s*growth\s*agency|brand and growth agency/i },
  { label: 'ads as a marketed service', re: /\bads\b/i },
  // We do charge for the platform; never claim otherwise (2026-07-14).
  {
    label: 'false fee claim',
    re: /commission-free|no per-sale|per-sale (fee|cut)|builder fee|no commission|nothing skimmed|without a marketplace taking|no per-order/i,
  },
  // Clients run on our platform; they do not own it (2026-07-14).
  {
    label: 'false ownership claim',
    re: /platform you own|yours outright|you own the site|setup you actually own|on your platform/i,
  },
];

describe('national repositioning guard', () => {
  // Read every file once; test all banned terms against each. O(files), not O(files*terms).
  const contents = scannedFiles().map((f) => ({ rel: path.relative(path.resolve(__dirname, '..'), f), text: readFileSync(f, 'utf8') }));
  for (const { label, re, allow } of BANNED) {
    it(`has no "${label}" in retained source`, () => {
      const hits = contents
        .filter((c) => !(allow ?? []).some((a) => c.rel.includes(a)))
        .filter((c) => re.test(c.text))
        .map((c) => c.rel);
      expect(hits, `Found "${label}" in:\n${hits.join('\n')}`).toEqual([]);
    });
  }
});
