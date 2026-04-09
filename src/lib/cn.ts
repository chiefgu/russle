/**
 * Tiny class-name joiner. No clsx/twMerge dependency to keep the bundle lean —
 * the project doesn't have variant-heavy class merging needs.
 */
export function cn(...inputs: Array<string | undefined | null | false>): string {
  return inputs.filter(Boolean).join(' ');
}
