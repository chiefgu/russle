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

describe('retired locality redirects', () => {
  for (const source of RETIRED) {
    it(`301s ${source} to /services`, () => {
      const re = new RegExp(
        `source:\\s*'${source.replace(/[/-]/g, '\\$&')}'[\\s\\S]{0,120}?destination:\\s*'/services'[\\s\\S]{0,60}?permanent:\\s*true`,
      );
      expect(re.test(CONFIG)).toBe(true);
    });
  }
});
