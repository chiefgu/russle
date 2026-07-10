import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { INDUSTRIES } from './content/industries';

const SLUGS = [
  'food-and-drink',
  'hair-and-beauty',
  'trades',
  'hospitality',
  'dentists',
  'financial-services',
  'solicitors',
  'fashion',
];

const base = path.resolve(__dirname, 'app', '(frontend)');

describe('industry pages', () => {
  it('data file has exactly the eight verticals', () => {
    expect(Object.keys(INDUSTRIES).sort()).toEqual([...SLUGS].sort());
  });

  for (const slug of SLUGS) {
    const file = path.join(base, slug, 'page.tsx');
    it(`${slug}/page.tsx exists`, () => {
      expect(existsSync(file)).toBe(true);
    });
    it(`${slug}/page.tsx exports metadata and renders IndustryPage with a vignette`, () => {
      const src = readFileSync(file, 'utf8');
      expect(src).toMatch(/export const metadata/);
      expect(src).toMatch(/IndustryPage/);
      expect(src).toMatch(/Vignette/);
    });
  }

  it('copy fields never state a price', () => {
    for (const data of Object.values(INDUSTRIES)) {
      const copy = [
        data.h1,
        data.intro,
        data.metaTitle,
        data.metaDescription,
        ...data.pains.flatMap((p) => [p.title, p.body]),
        ...data.build.flatMap((b) => [b.title, b.body]),
        ...(data.stats ?? []).flatMap((s) => [s.value, s.label]),
        ...data.faq.flatMap((f) => [f.q, f.a]),
      ].join('\n');
      expect(copy).not.toMatch(/£/);
    }
  });

  it('every page keeps faq and cta, cta last', () => {
    for (const data of Object.values(INDUSTRIES)) {
      expect(data.blocks).toContain('faq');
      expect(data.blocks[data.blocks.length - 1]).toBe('cta');
    }
  });

  it('content fills its grids exactly: build is a multiple of 6 (2-col and 3-col), pains and stats multiples of 3', () => {
    for (const data of Object.values(INDUSTRIES)) {
      expect(data.build.length % 6, `${data.slug} build grid`).toBe(0);
      expect(data.pains.length % 3, `${data.slug} pains grid`).toBe(0);
      if (data.stats) expect(data.stats.length % 3, `${data.slug} stats row`).toBe(0);
    }
  });

  it('structures vary: no two pages share hero variant and block order', () => {
    const shapes = Object.values(INDUSTRIES).map((d) => `${d.hero}:${d.blocks.join(',')}`);
    expect(new Set(shapes).size).toBe(shapes.length);
  });
});

describe('footer and sitemap wiring', () => {
  const footer = readFileSync(path.resolve(__dirname, 'components', 'layout', 'Footer.tsx'), 'utf8');
  const sitemap = readFileSync(path.resolve(__dirname, 'app', 'sitemap.ts'), 'utf8');

  it('footer has an Industries column driven by the industries data', () => {
    expect(footer).toMatch(/Industries/);
    expect(footer).toMatch(/INDUSTRY_LINKS/);
  });

  it('sitemap includes every industry route', () => {
    expect(sitemap).toMatch(/INDUSTR/);
  });
});

describe('stray duplicate files are gone', () => {
  it('no Finder-duplicate files remain', () => {
    expect(existsSync(path.join(base, 'web-design', 'page 2.tsx'))).toBe(false);
    expect(existsSync(path.resolve(__dirname, 'components', 'sections', 'RelatedPosts 2.tsx'))).toBe(false);
  });
});
