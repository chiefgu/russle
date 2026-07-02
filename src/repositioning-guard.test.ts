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
