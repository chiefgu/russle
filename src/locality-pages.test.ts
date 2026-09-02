import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { LOCATIONS, LOCATION_SLUGS } from './content/locations';
import { ICONS } from './components/sections/icons';

const SLUGS = [
  'web-design-cheshire',
  'web-design-manchester',
  'web-design-alderley-edge',
  'web-design-wilmslow',
  'web-design-knutsford',
  'web-design-macclesfield',
  'web-design-altrincham',
  'web-design-hale',
  'web-design-didsbury',
];

const HUBS = ['web-design-cheshire', 'web-design-manchester'];

const base = path.resolve(__dirname, 'app', '(frontend)');

describe('locality pages', () => {
  it('data file has exactly the nine places', () => {
    expect(Object.keys(LOCATIONS).sort()).toEqual([...SLUGS].sort());
  });

  for (const slug of SLUGS) {
    const file = path.join(base, slug, 'page.tsx');
    it(`${slug}/page.tsx exists`, () => {
      expect(existsSync(file)).toBe(true);
    });
    it(`${slug}/page.tsx exports metadata and renders LocalityPage with the LocalVignette variant`, () => {
      const src = readFileSync(file, 'utf8');
      expect(src).toMatch(/export const metadata/);
      expect(src).toMatch(/LocalityPage/);
      expect(src).toMatch(/LocalVignette/);
      expect(src).toMatch(/vignetteVariant/);
    });
  }

  it('copy fields never state a price', () => {
    for (const data of Object.values(LOCATIONS)) {
      const copy = [
        data.h1,
        data.intro,
        data.metaTitle,
        data.metaDescription,
        data.buildHeading,
        data.grounding.heading,
        ...data.grounding.body,
        data.statement ?? '',
        ...(data.towns?.items ?? []).flatMap((t) => [t.name, t.line]),
        ...data.build.flatMap((b) => [b.title, b.body, b.detail]),
        ...data.faq.flatMap((f) => [f.q, f.a]),
      ].join('\n');
      expect(copy).not.toMatch(/£/);
    }
  });

  it('every page keeps areas, faq and cta, cta last', () => {
    for (const data of Object.values(LOCATIONS)) {
      expect(data.blocks).toContain('areas');
      expect(data.blocks).toContain('faq');
      expect(data.blocks[data.blocks.length - 1]).toBe('cta');
    }
  });

  it('build fills the bento grid exactly (multiples of 6)', () => {
    for (const data of Object.values(LOCATIONS)) {
      expect(data.build.length % 6, `${data.slug} build grid`).toBe(0);
    }
  });

  // The anti-doorway-page guard: body copy must be written per page, never
  // shared. Titles are labels and may repeat; bodies and details may not.
  it('build bodies and details are unique across all pages', () => {
    const seen = new Map<string, string>();
    for (const data of Object.values(LOCATIONS)) {
      for (const item of data.build) {
        for (const text of [item.body, item.detail]) {
          const owner = seen.get(text);
          expect(owner, `"${text.slice(0, 60)}..." appears in both ${owner} and ${data.slug}`).toBeUndefined();
          seen.set(text, data.slug);
        }
      }
    }
  });

  it('grounding and faq copy is unique across all pages', () => {
    const seen = new Map<string, string>();
    for (const data of Object.values(LOCATIONS)) {
      for (const text of [data.grounding.heading, ...data.grounding.body, ...data.faq.map((f) => f.a)]) {
        const owner = seen.get(text);
        expect(owner, `"${text.slice(0, 60)}..." appears in both ${owner} and ${data.slug}`).toBeUndefined();
        seen.set(text, data.slug);
      }
    }
  });

  it('every icon named in build data exists in the registry', () => {
    for (const data of Object.values(LOCATIONS)) {
      for (const item of data.build) {
        expect(ICONS[item.icon], `${data.slug}: icon "${item.icon}" missing from ICONS registry`).toBeDefined();
      }
    }
  });

  it('hubs have a towns directory whose links all resolve to live locality pages', () => {
    for (const slug of HUBS) {
      const data = LOCATIONS[slug];
      expect(data.towns, `${slug} towns`).toBeDefined();
      expect(data.blocks).toContain('towns');
      for (const town of data.towns!.items) {
        const target = town.href.replace(/^\//, '');
        expect(LOCATION_SLUGS, `${slug} links to unknown page ${town.href}`).toContain(target);
        expect(target).not.toBe(slug);
      }
    }
    // The Cheshire hub links every town page, so authority flows through it.
    const cheshireHrefs = LOCATIONS['web-design-cheshire'].towns!.items.map((t) => t.href);
    for (const slug of SLUGS.filter((s) => !HUBS.includes(s))) {
      expect(cheshireHrefs).toContain(`/${slug}`);
    }
  });

  it('town pages do not carry a towns directory', () => {
    for (const slug of SLUGS.filter((s) => !HUBS.includes(s))) {
      expect(LOCATIONS[slug].blocks).not.toContain('towns');
    }
  });

  it('blocks that need data have it: statement/proof', () => {
    for (const data of Object.values(LOCATIONS)) {
      if (data.blocks.includes('statement')) expect(data.statement, `${data.slug} statement`).toBeDefined();
      if (data.blocks.includes('proof')) expect(data.proof, `${data.slug} proof`).toBeDefined();
      expect(data.grounding.body.length, `${data.slug} grounding paragraphs`).toBeGreaterThan(0);
      expect(data.faq.length, `${data.slug} faq size`).toBeGreaterThanOrEqual(4);
    }
  });

  it('hubs run deeper than town pages: more grounding and faq', () => {
    for (const slug of HUBS) {
      expect(LOCATIONS[slug].grounding.body.length, `${slug} grounding depth`).toBeGreaterThanOrEqual(3);
      expect(LOCATIONS[slug].faq.length, `${slug} faq depth`).toBeGreaterThanOrEqual(5);
    }
  });

  it('structures vary: no two pages share hero variant and block order', () => {
    const shapes = Object.values(LOCATIONS).map((d) => `${d.hero}:${d.blocks.join(',')}`);
    expect(new Set(shapes).size).toBe(shapes.length);
  });

  it('vignette variants are spread, not repeated everywhere', () => {
    const variants = new Set(Object.values(LOCATIONS).map((d) => d.vignetteVariant));
    expect(variants.size).toBeGreaterThanOrEqual(3);
  });

  it('copy never uses an em dash', () => {
    const src = readFileSync(path.resolve(__dirname, 'content', 'locations.ts'), 'utf8');
    expect(src).not.toMatch(/—/);
  });
});

describe('locality footer and sitemap wiring', () => {
  const footer = readFileSync(path.resolve(__dirname, 'components', 'layout', 'Footer.tsx'), 'utf8');
  const sitemap = readFileSync(path.resolve(__dirname, 'app', 'sitemap.ts'), 'utf8');

  it('footer has an Areas strip driven by the locations data', () => {
    expect(footer).toMatch(/Areas/);
    expect(footer).toMatch(/LOCATION_LINKS/);
  });

  it('sitemap includes the locality routes', () => {
    expect(sitemap).toMatch(/LOCATION_SLUGS/);
  });
});
