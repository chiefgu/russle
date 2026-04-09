/**
 * In-memory IP rate limiter. Suitable for low-volume contact forms on a
 * single Vercel/Node instance. Replace with Upstash + sliding window if
 * traffic grows.
 */
type Bucket = {
  tokens: number;
  refilledAt: number;
};

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetMs: number;
};

export function rateLimit(
  key: string,
  { capacity, intervalMs }: { capacity: number; intervalMs: number },
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { tokens: capacity, refilledAt: now };

  // Refill any tokens that have accrued since last access.
  const elapsed = now - bucket.refilledAt;
  const refill = (elapsed / intervalMs) * capacity;
  bucket.tokens = Math.min(capacity, bucket.tokens + refill);
  bucket.refilledAt = now;

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    buckets.set(key, bucket);
    return {
      ok: true,
      remaining: Math.floor(bucket.tokens),
      resetMs: ((capacity - bucket.tokens) / capacity) * intervalMs,
    };
  }

  buckets.set(key, bucket);
  return {
    ok: false,
    remaining: 0,
    resetMs: ((1 - bucket.tokens) / capacity) * intervalMs,
  };
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}
