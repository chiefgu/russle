/**
 * Search-result length limits. Google truncates around these points, so a
 * title or description past them is written but never read.
 *
 * These helpers are the fallback path only. An explicit `meta.title` or
 * `meta.description` on a post, or a `metaTitle` / `metaDescription` in work
 * frontmatter, is always used as authored.
 */

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

/**
 * Post titles are suffixed with the brand for recognition in results. When
 * that suffix is what pushes the title past the limit, drop it: the truncated
 * "… | rus" ending reads worse than no suffix at all.
 */
export function titleWithBrand(title: string, brand = 'russle'): string {
  const suffixed = `${title} | ${brand}`;
  return suffixed.length <= TITLE_MAX ? suffixed : title;
}

/**
 * Bring an already-composed title inside the limit. Applied to whatever we end
 * up rendering, including a `meta.title` authored in the CMS, because an
 * override that truncates in results helps nobody. A title still over the
 * limit once the brand suffix is gone can only be fixed by shortening it in
 * the CMS.
 */
export function fitTitle(title: string, brand = 'russle'): string {
  if (title.length <= TITLE_MAX) return title;
  const suffix = ` | ${brand}`;
  if (title.endsWith(suffix)) {
    return title.slice(0, -suffix.length);
  }
  return title;
}

/**
 * Excerpts double as meta descriptions. Most end with a boilerplate studio
 * sentence ("From russle, a web design, ecommerce and SEO studio.") that reads
 * well on the page but wastes the description's limited space. Drop trailing
 * sentences until the description fits, rather than cutting mid-word.
 */
export function clampDescription(text: string | null | undefined): string | undefined {
  if (!text) return undefined;
  const trimmed = text.trim();
  if (trimmed.length <= DESCRIPTION_MAX) return trimmed;

  // Split on sentence ends, keeping the punctuation with its sentence.
  const sentences = trimmed.match(/[^.!?]+[.!?]*\s*/g) ?? [trimmed];
  let out = '';
  for (const sentence of sentences) {
    const next = (out + sentence).trimEnd();
    if (next.length > DESCRIPTION_MAX) break;
    out = next + ' ';
  }
  out = out.trim();
  if (out) return out;

  // A single sentence longer than the limit: cut on a word boundary.
  const cut = trimmed.slice(0, DESCRIPTION_MAX - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}...`;
}
