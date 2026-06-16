import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const SRC = path.resolve(__dirname);

// Paths retired in Phase 2 — excluded so Phase 1 can pass before teardown.
const DOOMED = [
  'content/locality',
  'app/(frontend)/web-design-',
  'app/(frontend)/south-manchester-cheshire-brand-web-design',
  'components/sections/LocalityPage.tsx',
  'components/sections/RegionHub.tsx',
  'lib/locality.ts',
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

function retainedFiles(): string[] {
  return walk(SRC).filter((f) => {
    const rel = path.relative(SRC, f);
    return !DOOMED.some((d) => rel.includes(d));
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
  for (const { label, re } of BANNED) {
    it(`has no "${label}" in retained source`, () => {
      const hits = retainedFiles()
        .filter((f) => re.test(readFileSync(f, 'utf8')))
        .map((f) => path.relative(SRC, f));
      expect(hits, `Found "${label}" in:\n${hits.join('\n')}`).toEqual([]);
    });
  }
});
