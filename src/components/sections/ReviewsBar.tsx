import { Star } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { getPlaceSummary } from '@/lib/google-places';

/**
 * Thin trust strip designed to sit immediately under the Hero. Renders
 * nothing when Google Places isn't configured or returns no data, so the
 * homepage stays clean until reviews are real.
 */
export async function ReviewsBar() {
  const summary = await getPlaceSummary();
  if (!summary || summary.reviewCount === 0) return null;

  const rounded = Math.round(summary.rating * 10) / 10;
  const fullStars = Math.floor(summary.rating);

  return (
    <Section tone="surface" spacing="s">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={
                  i < fullStars
                    ? 'h-5 w-5 fill-[var(--color-accent)] text-[var(--color-accent)]'
                    : 'h-5 w-5 text-[var(--color-line-2)]'
                }
              />
            ))}
          </div>
          <p className="text-body text-[var(--color-text)]">
            <span className="font-medium">{rounded.toFixed(1)}</span>{' '}
            <span className="text-[var(--color-text-mute)]">
              from {summary.reviewCount} review
              {summary.reviewCount === 1 ? '' : 's'} on Google
            </span>
          </p>
        </div>
        {summary.googleMapsUri && (
          <a
            href={summary.googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="label text-[var(--color-text-mute)] underline-offset-4 hover:text-[var(--color-text)] hover:underline"
          >
            Read on Google
          </a>
        )}
      </div>
    </Section>
  );
}
