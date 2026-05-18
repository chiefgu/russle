/**
 * Google Places API v1 client. Server-only. Used to pull the russle Google
 * Business Profile rating, review count, and individual reviews for display
 * on the marketing site.
 *
 * Required env:
 *   GOOGLE_PLACES_API_KEY      - server-side only, never prefix NEXT_PUBLIC_
 *   GOOGLE_PLACES_PLACE_ID     - the ChIJ... Place ID from the Place ID Finder
 *
 * Caching: results are cached via Next.js fetch revalidate for 24 hours so
 * we stay well under the free-tier ceiling (~10k requests/month). One fetch
 * per server build + one per day per region.
 */

const PLACE_DETAILS_URL = 'https://places.googleapis.com/v1/places';

export type PlaceReview = {
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  relativeTime: string;
  text: string;
};

export type PlaceSummary = {
  rating: number;
  reviewCount: number;
  reviews: PlaceReview[];
  googleMapsUri?: string;
};

export function hasPlacesConfig(): boolean {
  return (
    Boolean(process.env.GOOGLE_PLACES_API_KEY) &&
    Boolean(process.env.GOOGLE_PLACES_PLACE_ID)
  );
}

/**
 * Fetch the russle place summary from the Places API. Returns null when:
 *   - env is missing
 *   - the API returns an error or empty payload
 *   - we are running on the client (defensive; this should never be called there)
 *
 * Callers should always handle null by rendering no reviews UI.
 */
export async function getPlaceSummary(): Promise<PlaceSummary | null> {
  if (typeof window !== 'undefined') return null;
  if (!hasPlacesConfig()) return null;

  const placeId = process.env.GOOGLE_PLACES_PLACE_ID!;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY!;

  try {
    const res = await fetch(`${PLACE_DETAILS_URL}/${placeId}`, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask':
          'rating,userRatingCount,reviews.rating,reviews.text,reviews.authorAttribution,reviews.relativePublishTimeDescription,googleMapsUri',
      },
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('[google-places] API error', res.status, body);
      return null;
    }

    const json = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      googleMapsUri?: string;
      reviews?: Array<{
        rating?: number;
        text?: { text?: string };
        relativePublishTimeDescription?: string;
        authorAttribution?: {
          displayName?: string;
          photoUri?: string;
        };
      }>;
    };

    if (!json.rating || !json.userRatingCount) return null;

    const reviews: PlaceReview[] = (json.reviews ?? [])
      .filter((r) => r.rating && r.text?.text)
      .map((r) => ({
        authorName: r.authorAttribution?.displayName ?? 'Anonymous',
        authorPhotoUrl: r.authorAttribution?.photoUri,
        rating: r.rating!,
        relativeTime: r.relativePublishTimeDescription ?? '',
        text: r.text!.text!,
      }));

    return {
      rating: json.rating,
      reviewCount: json.userRatingCount,
      reviews,
      googleMapsUri: json.googleMapsUri,
    };
  } catch (err) {
    console.error('[google-places] fetch threw', err);
    return null;
  }
}
