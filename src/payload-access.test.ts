import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const read = (p: string) => readFileSync(path.resolve(__dirname, p), 'utf8');

describe('payload access hardening', () => {
  it('Posts read access is status-gated, not wide open', () => {
    const src = read('collections/Posts.ts');
    expect(src).not.toMatch(/read:\s*\(\)\s*=>\s*true/);
    expect(src).toMatch(/_status.*published/);
  });
  it('GraphQL playground is disabled in production', () => {
    expect(read('payload.config.ts')).toMatch(/disablePlaygroundInProduction:\s*true/);
  });
});
