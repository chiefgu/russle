/**
 * One-off OG image generator. Renders a 1200x630 PNG to public/og.png from a
 * hand-written SVG. Run with `node scripts/generate-og.mjs` whenever the
 * tagline changes.
 *
 * Uses Satoshi from public/fonts so the output matches the site's brand type.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const fontPath = resolve(root, 'public/fonts/Satoshi-Variable.woff2');
const outPath = resolve(root, 'public/og.png');

// Embed Satoshi as base64 inside the SVG so sharp's text rendering picks it up.
// Sharp's SVG renderer (librsvg) supports @font-face with data URIs.
const fontBase64 = readFileSync(fontPath).toString('base64');

const TITLE = 'russle';
const SUBTITLE = 'WEB DESIGN, DEVELOPMENT, AND BRANDING';
const TAGLINE = 'A studio for founders, teams, and anyone who cares how things look, feel, and work.';

const BG = '#F8F7F5';
const TEXT = '#1A1410';
const TEXT_MUTE = '#1A141052'; // 32% alpha
const ACCENT = '#DF5613';

// 1200x630 — the canonical OG ratio
const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: 'Satoshi';
        src: url('data:font/woff2;base64,${fontBase64}') format('woff2');
        font-weight: 300 900;
        font-style: normal;
      }
      .wordmark {
        font-family: 'Satoshi', sans-serif;
        font-weight: 500;
        font-size: 80px;
        letter-spacing: -3px;
        fill: ${TEXT};
      }
      .label {
        font-family: 'Satoshi', sans-serif;
        font-weight: 700;
        font-size: 24px;
        letter-spacing: 2px;
        fill: ${TEXT_MUTE};
        text-transform: uppercase;
      }
      .tagline {
        font-family: 'Satoshi', sans-serif;
        font-weight: 500;
        font-size: 64px;
        letter-spacing: -2px;
        fill: ${TEXT};
      }
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>

  <!-- Top: wordmark + accent dot -->
  <g transform="translate(80, 110)">
    <text x="0" y="0" class="wordmark">russle</text>
    <circle cx="280" cy="-25" r="14" fill="${ACCENT}"/>
  </g>

  <!-- Bottom: subtitle + tagline -->
  <g transform="translate(80, 380)">
    <text x="0" y="0" class="label">${SUBTITLE}</text>
    <text x="0" y="74" class="tagline">A studio for founders,</text>
    <text x="0" y="150" class="tagline">teams, and anyone who</text>
    <text x="0" y="226" class="tagline">cares how things work.</text>
  </g>
</svg>
`;

const buffer = await sharp(Buffer.from(svg))
  .png()
  .toBuffer();

writeFileSync(outPath, buffer);
console.log(`✓ wrote ${outPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
