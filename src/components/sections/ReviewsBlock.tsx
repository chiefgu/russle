import { Star } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { getPlaceSummary, type PlaceReview } from '@/lib/google-places';

/**
 * Full reviews block. Pulls 3 to 5 most recent reviews from the russle
 * Google Business Profile and renders them as cards. Renders nothing when
 * Places isn't configured or returns no data.
 */
export async function ReviewsBlock({ limit = 5 }: { limit?: number }) {
  const summary = await getPlaceSummary();
  if (!summary || summary.reviews.length === 0) return null;

  const rounded = Math.round(summary.rating * 10) / 10;
  const cards = summary.reviews.slice(0, limit);

  return (
    <Section tone="bg" spacing="xl">
      <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <Tag>Reviews</Tag>
          <h2 className="h2 mt-6 text-balance">
            What clients say on Google.
          </h2>
        </div>
        <div className="md:col-span-4 md:text-right">
          <div className="flex items-center gap-3 md:justify-end">
            <div className="flex items-center gap-1" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.floor(summary.rating)
                      ? 'h-5 w-5 fill-[var(--color-accent)] text-[var(--color-accent)]'
                      : 'h-5 w-5 text-[var(--color-line-2)]'
                  }
                />
              ))}
            </div>
            <p className="text-body text-[var(--color-text)]">
              <span className="font-medium">{rounded.toFixed(1)}</span>
              <span className="text-[var(--color-text-mute)]">
                {' '}from {summary.reviewCount}
              </span>
            </p>
          </div>
          {summary.googleMapsUri && (
            <a
              href={summary.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-3 inline-block text-[var(--color-text-mute)] underline-offset-4 hover:text-[var(--color-text)] hover:underline"
            >
              Read on Google
            </a>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </Section>
  );
}

function ReviewCard({ review }: { review: PlaceReview }) {
  return (
    <div className="flex h-full flex-col rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-8 md:p-10">
      <div className="flex items-center gap-1" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < review.rating
                ? 'h-4 w-4 fill-[var(--color-accent)] text-[var(--color-accent)]'
                : 'h-4 w-4 text-[var(--color-line-2)]'
            }
          />
        ))}
      </div>
      <p className="text-body mt-6 text-[var(--color-text)]">{review.text}</p>
      <div className="mt-auto pt-8">
        <p className="h6">{review.authorName}</p>
        {review.relativeTime && (
          <p className="label mt-1 text-[var(--color-text-soft)]">
            {review.relativeTime}
          </p>
        )}
      </div>
    </div>
  );
}
