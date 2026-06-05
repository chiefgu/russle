import { describe, expect, it } from 'vitest';
import { slugify } from './formatSlug';

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
  it('strips punctuation and apostrophes', () => {
    expect(slugify("Cheshire's Best Web Design!")).toBe('cheshires-best-web-design');
  });
  it('collapses repeated separators and trims edges', () => {
    expect(slugify('  multiple   spaces -- here ')).toBe('multiple-spaces-here');
  });
  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('');
  });
});
