import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const CONFIG = readFileSync(path.resolve(__dirname, '..', 'next.config.ts'), 'utf8');

const RETIRED = [
  '/web-design-alderley-edge',
  '/web-design-altrincham',
  '/web-design-chester',
  '/web-design-didsbury',
  '/web-design-hale',
  '/web-design-knutsford',
  '/web-design-macclesfield',
  '/web-design-prestbury',
  '/web-design-wilmslow',
  '/south-manchester-cheshire-brand-web-design',
];

function assertRedirect(source: string, destination: string) {
  const re = new RegExp(
    `source:\\s*'${source.replace(/[/-]/g, '\\$&')}'[\\s\\S]{0,120}?destination:\\s*'${destination.replace(/[/-]/g, '\\$&')}'[\\s\\S]{0,60}?permanent:\\s*true`,
  );
  return re.test(CONFIG);
}

describe('retired locality redirects', () => {
  for (const source of RETIRED) {
    it(`301s ${source} to /web-design`, () => {
      expect(assertRedirect(source, '/web-design')).toBe(true);
    });
  }
});

describe('retired tier + services redirects', () => {
  const TIER: [string, string][] = [
    ['/services', '/'],
    ['/launch', '/web-design'],
    ['/grow', '/seo'],
    ['/manage', '/seo'],
  ];
  for (const [source, dest] of TIER) {
    it(`301s ${source} to ${dest}`, () => {
      expect(assertRedirect(source, dest)).toBe(true);
    });
  }
});
