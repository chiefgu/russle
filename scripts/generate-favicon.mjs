/**
 * One-off favicon + apple-touch-icon generator. Renders the russle 'r' lowercase
 * mark inside a rounded square in brand orange, exports favicon.ico (32x32) and
 * apple-touch-icon.png (180x180).
 *
 * Run with `node scripts/generate-favicon.mjs`.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const fontPath = resolve(root, 'public/fonts/Satoshi-Variable.woff2');
const fontBase64 = readFileSync(fontPath).toString('base64');

const ACCENT = '#DF5613';
const ON_ACCENT = '#FFFFFF';

/**
 * SVG sources are scaled later by sharp via `density`. We render at the target
 * pixel size directly so the rounded square + glyph stay crisp.
 */
function squareSvg(size) {
  const r = Math.round(size * 0.22);
  const fontSize = Math.round(size * 0.78);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        @font-face {
          font-family: 'Satoshi';
          src: url('data:font/woff2;base64,${fontBase64}') format('woff2');
          font-weight: 300 900;
          font-style: normal;
        }
        .glyph {
          font-family: 'Satoshi', sans-serif;
          font-weight: 700;
          font-size: ${fontSize}px;
          letter-spacing: -${size * 0.04}px;
          fill: ${ON_ACCENT};
          text-anchor: middle;
          dominant-baseline: central;
        }
      </style>
    </defs>
    <rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${ACCENT}"/>
    <text x="${size / 2}" y="${size * 0.56}" class="glyph">r</text>
  </svg>`;
}

// 180x180 apple-touch-icon
const appleBuf = await sharp(Buffer.from(squareSvg(180))).png().toBuffer();
writeFileSync(resolve(root, 'public/apple-touch-icon.png'), appleBuf);
console.log(`✓ apple-touch-icon.png (${(appleBuf.length / 1024).toFixed(0)} KB)`);

// 32x32 PNG (favicon.ico stub — sharp can't write multi-resolution .ico, but
// modern browsers accept a .ico that's actually a PNG, and Next.js metadata
// supports a PNG favicon directly. We'll write favicon.png and let layout.tsx
// reference both.)
const fav32 = await sharp(Buffer.from(squareSvg(64))).resize(32, 32).png().toBuffer();
writeFileSync(resolve(root, 'public/favicon-32x32.png'), fav32);
console.log(`✓ favicon-32x32.png (${(fav32.length / 1024).toFixed(0)} KB)`);

const fav16 = await sharp(Buffer.from(squareSvg(64))).resize(16, 16).png().toBuffer();
writeFileSync(resolve(root, 'public/favicon-16x16.png'), fav16);
console.log(`✓ favicon-16x16.png (${(fav16.length / 1024).toFixed(0)} KB)`);

// Also write favicon.ico — we use the 32x32 PNG and rename. Modern browsers
// (everything since IE11) accept this.
writeFileSync(resolve(root, 'public/favicon.ico'), fav32);
console.log(`✓ favicon.ico (PNG-in-ico)`);
