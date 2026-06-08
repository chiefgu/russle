import { cn } from '@/lib/cn';

/**
 * The canonical russle wordmark: lowercase "russle" followed by a coral full
 * stop. This is the single source of truth for the wordmark on the site, so the
 * mark cannot drift between the navbar, footer, and anywhere else it appears.
 *
 * Spec: Satoshi 500 (inherited from the heading classes passed via className),
 * letter-spacing handled by those classes, word in the current text colour, and
 * the full stop in the coral accent. Sizing comes from `className` (e.g. "h4").
 *
 * The full stop scales on hover when an ancestor is a `group` (used in the
 * navbar); it is inert elsewhere.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('lowercase', className)}>
      russle
      <span className="inline-block text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-[1.4]">
        .
      </span>
    </span>
  );
}
