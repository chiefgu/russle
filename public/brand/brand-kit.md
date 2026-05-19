# russle brand kit

A short, opinionated guide to using the russle logo across the site, decks, social, and print. Keep the system small. Less variation, more recognition.

## Files in this folder

| File | Use when |
|---|---|
| `wordmark-dot.svg` | Default. Light backgrounds (cream, white). |
| `wordmark-dot-on-dark.svg` | Dark backgrounds (near-black, navy, deep accent). |
| `wordmark-dot-mono.svg` | Single-colour print, embossing, embroidery, foil. Uses `currentColor`, set the colour via CSS or SVG fill. |
| `wordmark.svg` | Cropped contexts where the dot would not fit (favicon strip, tight nav). Light backgrounds. |
| `wordmark-on-dark.svg` | Same as above, dark backgrounds. |
| `dot.svg` | Icon-only mark. Use for app icons, small avatars, social handles where the wordmark would be illegible. |

## Palette

| Token | Hex | Use |
|---|---|---|
| Text (default) | `#1A1410` | Wordmark on light backgrounds. Site body text. |
| Cream (background) | `#F8F7F5` | Wordmark on dark backgrounds. Site background. |
| Accent (coral) | `#DF5613` | The dot. Buttons, accents, hover states. |
| Surface | `#EFEDE6` | Quiet card and section backgrounds. |
| Surface 2 | `#E6E2D6` | Hover and deeper-quiet surfaces. |

The dot is always coral. Do not recolour it for variant compositions.

## Sizing

| Surface | Minimum |
|---|---|
| Desktop nav | 32px wordmark height |
| Print | 12mm wordmark height |
| Favicon | Use `dot.svg`, not the wordmark |
| App icon | Use `dot.svg` on cream background, 1024x1024 |
| Social avatar | Use `dot.svg`, 400x400 minimum |

## Clear space

Keep clear space equal to the dot's diameter on all four sides. Nothing else should crowd the lockup inside that boundary, including type, photography, or other graphics.

## Do

- Use the default `wordmark-dot.svg` for 95% of cases
- Place the lockup on a calm background, not on top of busy photography
- Pair with Geist Mono for in-product UI typography
- Recolour the wordmark text fill for special contexts using `wordmark-dot-mono.svg` + a parent colour
- Convert the text to paths in Figma (right-click → Outline Stroke) before exporting to any context that does not load Geist Mono

## Do not

- Do not place the wordmark over busy photography or strong patterns
- Do not stretch, skew, rotate, or condense the lockup
- Do not recolour the coral dot
- Do not change the relative size of the dot to the wordmark
- Do not add a tagline below the lockup (the tagline lives elsewhere, not in the mark)
- Do not use the wordmark at sizes where the letterforms collapse (under 16px is a hard floor)

## Typography

| Use | Font |
|---|---|
| Wordmark and logo lockups | Satoshi, weight 500, letter-spacing -0.04em |
| Site UI (body, headings, display) | Satoshi via Fontshare, self-hosted on russle.co.uk |
| Code, technical UI | Geist Mono, reserved for monospace contexts only |
| Print and email | Satoshi if available, fallback `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif` |

The SVG files reference `Satoshi` with a system sans-serif fallback. On the russle site the font loads automatically. In Figma or Illustrator, install Satoshi first (free from Fontshare), then either keep as live text or convert to paths via Outline Stroke. For print or anywhere a font may not be available, always export with text outlined.

## Logo construction

The wordmark is `russle` set in Satoshi, weight 500, letter-spacing -0.04em. The dot is a coral circle one quarter the wordmark's font-size in diameter (the wordmark at 40px gets a 10px dot). The dot sits centred vertically on the wordmark midline, not the baseline. The horizontal gap between the last letter and the dot is roughly the dot's diameter.

## Practical workflow

1. Drop the SVG into Figma
2. If the destination lacks Geist Mono: select the text node, right-click → Outline Stroke
3. Export at 2x or 3x as PNG for raster contexts (Behance covers, app icon platforms)
4. Keep the SVG as the source of truth in this folder
