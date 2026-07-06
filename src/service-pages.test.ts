import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const PAGES = ['web-design', 'ecommerce', 'seo'];
const base = path.resolve(__dirname, 'app', '(frontend)');

describe('service pages', () => {
  for (const slug of PAGES) {
    const file = path.join(base, slug, 'page.tsx');
    it(`${slug}/page.tsx exists`, () => {
      expect(existsSync(file)).toBe(true);
    });
    it(`${slug}/page.tsx exports metadata and renders ServicePage`, () => {
      const src = readFileSync(file, 'utf8');
      expect(src).toMatch(/export const metadata/);
      expect(src).toMatch(/ServicePage/);
    });
    it(`${slug}/page.tsx has no price`, () => {
      expect(readFileSync(file, 'utf8')).not.toMatch(/£/);
    });
  }
});

describe('ecommerce vignette + Shopify positioning', () => {
  const file = path.join(base, 'ecommerce', 'page.tsx');
  it('ecommerce/page.tsx renders EcommerceVignette', () => {
    expect(readFileSync(file, 'utf8')).toMatch(/EcommerceVignette/);
  });
  it('ecommerce/page.tsx positions Shopify in the intro', () => {
    expect(readFileSync(file, 'utf8')).toMatch(/custom Shopify storefront/);
  });
});
