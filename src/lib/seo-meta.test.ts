import { describe, it, expect } from 'vitest';
import { titleWithBrand, clampDescription, TITLE_MAX, DESCRIPTION_MAX } from './seo-meta';

// The real post titles and excerpts flagged as over-length by the OpenSEO
// site audit (2026-09-03). Blog metadata is composed from Payload records, so
// these cases are asserted here rather than by crawling the built site.

const LONG_TITLES = [
  'Conversion-led web design: turning visitors into customers',
  'Email marketing for small businesses: where to start',
  'Is SEO worth it for a small business? An honest answer',
  'Squarespace vs Wix: which is better for a small business?',
  'Website launch checklist: get these right before you go live',
  'What is a growth retainer, and what should it include?',
];

// Dropping the brand suffix cannot save a title that is already over on its
// own. These two are 61 characters before any suffix, so each needs a shorter
// `meta.title` set on the post in Payload. Listed here so the gap stays
// visible instead of silently failing the audit again.
const NEEDS_CMS_META_TITLE = [
  'Brand, website, marketing: why one team beats three suppliers',
  'What does a web design, ecommerce and SEO studio actually do?',
];

const LONG_EXCERPTS = [
  'Conversion-led web design: clarity, proof, speed, and clear calls to action that turn visitors into customers. From russle, a web design, ecommerce and SEO studio.',
  'How to rank in Google’s local Map Pack: Google Business Profile, reviews, and local signals explained for a small business. From russle, a UK web design and SEO studio.',
  'Why one team for brand, website, and marketing beats three separate suppliers: consistency, speed, and accountability. From russle, a web design, ecommerce and SEO studio.',
  'A website launch checklist for small businesses: SEO, speed, analytics, forms, and more to check before you go live. From russle, a UK web design and SEO studio.',
  'What a growth retainer is and what it should include: hosting, SEO, content, email, AI search, and reporting. From russle, a web design, ecommerce and SEO studio.',
];

describe('titleWithBrand', () => {
  it('keeps the brand suffix when the result still fits', () => {
    expect(titleWithBrand('Short title')).toBe('Short title | russle');
  });

  it('drops the suffix rather than letting the title truncate', () => {
    const long = 'Website launch checklist: get these right before you go live';
    expect(titleWithBrand(long)).toBe(long);
  });

  it('brings every audited post title inside the limit', () => {
    for (const title of LONG_TITLES) {
      expect(titleWithBrand(title).length, title).toBeLessThanOrEqual(TITLE_MAX);
    }
  });

  it('never makes a title longer than the bare title', () => {
    // The cases code cannot fix: still no worse than what was authored.
    for (const title of NEEDS_CMS_META_TITLE) {
      expect(titleWithBrand(title)).toBe(title);
      expect(title.length).toBeGreaterThan(TITLE_MAX);
      expect(title.length).toBeLessThanOrEqual(TITLE_MAX + 2);
    }
  });
});

describe('clampDescription', () => {
  it('passes through anything already short enough', () => {
    expect(clampDescription('A short description.')).toBe('A short description.');
  });

  it('returns undefined for empty input', () => {
    expect(clampDescription(undefined)).toBeUndefined();
    expect(clampDescription('')).toBeUndefined();
  });

  it('drops whole trailing sentences, never cuts mid-sentence', () => {
    const out = clampDescription(LONG_EXCERPTS[0])!;
    expect(out).toBe(
      'Conversion-led web design: clarity, proof, speed, and clear calls to action that turn visitors into customers.',
    );
    expect(out.endsWith('.')).toBe(true);
  });

  it('brings every audited excerpt inside the limit and keeps a full sentence', () => {
    for (const excerpt of LONG_EXCERPTS) {
      const out = clampDescription(excerpt)!;
      expect(out.length, excerpt).toBeLessThanOrEqual(DESCRIPTION_MAX);
      expect(out.length, excerpt).toBeGreaterThan(60);
      expect(/[.!?]$/.test(out), out).toBe(true);
    }
  });

  it('falls back to a word-boundary cut when one sentence exceeds the limit', () => {
    const single = `${'word '.repeat(60)}end.`;
    const out = clampDescription(single)!;
    expect(out.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
    expect(out.endsWith('...')).toBe(true);
    expect(out).not.toMatch(/\s\.\.\.$/);
  });
});
