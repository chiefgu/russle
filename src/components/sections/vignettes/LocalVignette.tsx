import { Search, Star, MapPin, Quote } from 'lucide-react';
import { getPlaceSummary } from '@/lib/google-places';

type Variant = 'listing' | 'results' | 'review';

/**
 * Shared locality-page vignette in three variants so the pages do not repeat
 * one visual nine times:
 *   listing - a local search with russle's listing card under it
 *   results - a local search with abstract result rows, russle's highlighted
 *   review  - a real Google review pulled live, quoted as a card
 * Server component: rating, count and review text come from the Google
 * Business Profile via getPlaceSummary, so nothing here goes stale.
 * Decorative, CSS only, no raster images.
 */
export async function LocalVignette({
  query,
  placeLine,
  variant = 'listing',
}: {
  /** The illustrated search, e.g. "web design wilmslow" */
  query: string;
  /** The locality line on the listing card, e.g. "Serving Wilmslow and SK9" */
  placeLine: string;
  variant?: Variant;
}) {
  const summary = await getPlaceSummary();
  const rating = summary ? (Math.round(summary.rating * 10) / 10).toFixed(1) : '5.0';
  const count = summary?.reviewCount;

  const stars = (size: string) => (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} fill-[var(--color-accent)] text-[var(--color-accent)]`} />
      ))}
    </span>
  );

  const searchBar = (
    <div className="flex items-center gap-3 rounded-full border border-[var(--color-line)] bg-[var(--color-bg)] px-5 py-3.5 shadow-[0_16px_40px_-24px_rgba(26,20,16,0.25)]">
      <Search className="h-4 w-4 text-[var(--color-text-soft)]" />
      <span className="text-body text-[var(--color-text)]">{query}</span>
      <span className="ml-auto h-4 w-px animate-pulse bg-[var(--color-accent)]" />
    </div>
  );

  const listingHeader = (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="h4 tracking-tight">
          russle<span className="text-[var(--color-accent)]">.</span>
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-small font-medium text-[var(--color-text)]">{rating}</span>
          {stars('h-3.5 w-3.5')}
          {count && <span className="text-small text-[var(--color-text-mute)]">({count})</span>}
        </div>
        <p className="text-small mt-2 text-[var(--color-text-mute)]">Web designer</p>
      </div>
      <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[var(--color-accent)]">
        <MapPin className="h-5 w-5 text-[var(--color-on-accent)]" />
      </span>
    </div>
  );

  // The full listing card: search up top, russle's card under it.
  if (variant === 'listing') {
    return (
      <div
        role="img"
        aria-label={`Illustration of a local Google search for ${query} showing the russle listing`}
        className="relative mx-auto w-full max-w-[460px]"
      >
        <div aria-hidden>
          {searchBar}
          <div className="float-slow mt-6 rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-7 shadow-[0_32px_64px_-32px_rgba(26,20,16,0.28)]">
            {listingHeader}
            <p className="text-small mt-4 border-t border-[var(--color-line)] pt-4 text-[var(--color-text-mute)]">
              {placeLine}
            </p>
            <div className="mt-5 flex gap-3">
              <span className="label rounded-full border border-[var(--color-line-2)] px-4 py-2 text-[var(--color-text)]">
                Website
              </span>
              <span className="label rounded-full border border-[var(--color-line-2)] px-4 py-2 text-[var(--color-text)]">
                Directions
              </span>
            </div>
          </div>
          <div className="float-slower absolute -right-2 top-[58%] rounded-full bg-[var(--color-dark)] px-4 py-2 shadow-[0_16px_32px_-16px_rgba(26,20,16,0.4)] sm:-right-6">
            <span className="text-small flex items-center gap-2 text-[var(--color-on-dark)]">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent-hi)]" />
              New enquiry, just now
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Abstract results page: skeleton rows, russle's row highlighted.
  if (variant === 'results') {
    return (
      <div
        role="img"
        aria-label={`Illustration of local search results for ${query} with the russle listing highlighted`}
        className="relative mx-auto w-full max-w-[460px]"
      >
        <div aria-hidden>
          {searchBar}
          <div className="float-slow mt-6 rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-7 shadow-[0_32px_64px_-32px_rgba(26,20,16,0.28)]">
            {[0, 1].map((i) => (
              <div key={i} className={`space-y-2.5 ${i === 0 ? '' : 'mt-6'}`}>
                <div className="h-3 w-2/5 rounded-full bg-[var(--color-surface-2)]" />
                <div className="h-2.5 w-4/5 rounded-full bg-[var(--color-surface)]" />
                <div className="h-2.5 w-3/5 rounded-full bg-[var(--color-surface)]" />
              </div>
            ))}
            <div className="mt-6 rounded-[16px] border border-[var(--color-accent)] bg-[var(--color-accent-tint)] p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="h5 tracking-tight">
                  russle<span className="text-[var(--color-accent)]">.</span>
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-small font-medium text-[var(--color-text)]">{rating}</span>
                  {stars('h-3 w-3')}
                  {count && <span className="text-small text-[var(--color-text-mute)]">({count})</span>}
                </div>
              </div>
              <p className="text-small mt-2 text-[var(--color-text-mute)]">{placeLine}</p>
            </div>
          </div>
          <div className="float-slower absolute -right-2 top-[30%] rounded-full bg-[var(--color-dark)] px-4 py-2 shadow-[0_16px_32px_-16px_rgba(26,20,16,0.4)] sm:-right-6">
            <span className="text-small flex items-center gap-2 text-[var(--color-on-dark)]">
              <Star className="h-3 w-3 fill-[var(--color-accent-hi)] text-[var(--color-accent-hi)]" />
              {rating} on Google
            </span>
          </div>
        </div>
      </div>
    );
  }

  // A real review, quoted. Falls back to the listing card when Places is down.
  const review = summary?.reviews.find((r) => r.text.length > 0 && r.text.length <= 420) ?? summary?.reviews[0];
  const reviewText = review
    ? review.text.length > 260
      ? `${review.text.slice(0, review.text.slice(0, 260).lastIndexOf(' '))}...`
      : review.text
    : null;

  return (
    <div
      role="img"
      aria-label="Illustration of a five-star Google review for russle"
      className="relative mx-auto w-full max-w-[460px]"
    >
      <div aria-hidden>
        <div className="float-slow rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-8 shadow-[0_32px_64px_-32px_rgba(26,20,16,0.28)]">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[var(--color-accent)]">
              <Quote className="h-5 w-5 text-[var(--color-on-accent)]" />
            </span>
            {stars('h-4 w-4')}
          </div>
          {reviewText ? (
            <>
              <p className="text-body mt-6 text-[var(--color-text)]">{reviewText}</p>
              <div className="mt-6 border-t border-[var(--color-line)] pt-5">
                <p className="h6">{review!.authorName}</p>
                <p className="text-small mt-1 text-[var(--color-text-mute)]">Google review</p>
              </div>
            </>
          ) : (
            <div className="mt-6">{listingHeader}</div>
          )}
        </div>
        <div className="float-slower absolute -right-2 -top-4 rounded-full bg-[var(--color-dark)] px-4 py-2 shadow-[0_16px_32px_-16px_rgba(26,20,16,0.4)] sm:-right-6">
          <span className="text-small flex items-center gap-2 text-[var(--color-on-dark)]">
            <Star className="h-3 w-3 fill-[var(--color-accent-hi)] text-[var(--color-accent-hi)]" />
            {rating} from {count ?? ''} review{count === 1 ? '' : 's'}
          </span>
        </div>
      </div>
    </div>
  );
}
