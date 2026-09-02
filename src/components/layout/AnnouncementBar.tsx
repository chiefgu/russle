import { Star } from 'lucide-react';
import type { PlaceSummary } from '@/lib/google-places';
import { ANNOUNCEMENT_BAR_HEIGHT } from './announcement';

/**
 * Slim Google-reviews announcement bar at the very top of the site, above the
 * fixed Navbar (which offsets itself by ANNOUNCEMENT_BAR_HEIGHT while the bar
 * is on screen). Sits in normal flow so it scrolls away with the page.
 * Renders nothing when Places isn't configured or returns no data.
 */
export function AnnouncementBar({ summary }: { summary: PlaceSummary | null }) {
  if (!summary || summary.reviewCount === 0) return null;

  const rounded = Math.round(summary.rating * 10) / 10;
  const content = (
    <>
      <span className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < Math.floor(summary.rating)
                ? 'h-3 w-3 fill-[var(--color-accent)] text-[var(--color-accent)]'
                : 'h-3 w-3 text-[var(--color-line-2)]'
            }
          />
        ))}
      </span>
      <span className="label">
        {rounded.toFixed(1)} from {summary.reviewCount} review
        {summary.reviewCount === 1 ? '' : 's'} on Google
      </span>
      <span className="label hidden text-[var(--color-text-mute)] underline underline-offset-4 sm:inline">
        Read on Google
      </span>
    </>
  );

  const barClasses =
    'flex items-center justify-center gap-3 border-b border-[var(--color-line)] bg-[var(--color-surface)] px-4 text-[var(--color-text)]';

  if (!summary.googleMapsUri) {
    return (
      <div data-announcement className={barClasses} style={{ height: ANNOUNCEMENT_BAR_HEIGHT }}>
        {content}
      </div>
    );
  }

  return (
    <a
      data-announcement
      href={summary.googleMapsUri}
      target="_blank"
      rel="noopener noreferrer"
      className={`${barClasses} transition-colors hover:bg-[var(--color-accent-tint)]`}
      style={{ height: ANNOUNCEMENT_BAR_HEIGHT }}
    >
      {content}
    </a>
  );
}
