import type { FieldHook } from 'payload';

/** Pure slugify: lowercase, strip non-alphanumerics, hyphenate. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Payload field hook for a `slug` field: if the slug is empty, derive it from
 * the named source field (e.g. `title`); otherwise normalise whatever was typed.
 */
export const formatSlugHook =
  (sourceField: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === 'string' && value.length > 0) {
      return slugify(value);
    }
    const source = data?.[sourceField] ?? originalDoc?.[sourceField];
    return typeof source === 'string' ? slugify(source) : value;
  };
