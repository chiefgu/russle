import { getPayload } from 'payload';
import config from '@payload-config';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Scheduled publishing. A Vercel cron hits this through the morning window; it
 * publishes any draft post whose publishedAt has arrived. Each post's
 * publishedAt is a randomised time between 9 and 11am UK, so the run that picks
 * it up varies day to day rather than firing at a fixed minute.
 *
 * Catch-up by design: it publishes every due draft on each run, so a missed run
 * is recovered on the next one. Guarded by CRON_SECRET, which Vercel sends as a
 * Bearer token automatically. The route fails closed: if CRON_SECRET is unset it
 * refuses every request rather than publishing to anonymous callers.
 */
export async function GET(req: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const payload = await getPayload({ config });
  const now = new Date().toISOString();

  const due = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { _status: { equals: 'draft' } },
        { publishedAt: { less_than_equal: now } },
      ],
    },
    draft: true,
    overrideAccess: true,
    sort: 'publishedAt',
    limit: 50,
  });

  const published: string[] = [];
  for (const doc of due.docs) {
    await payload.update({
      collection: 'posts',
      id: doc.id,
      data: { _status: 'published' },
    });
    published.push(String(doc.slug));
  }

  return Response.json({ ok: true, ranAt: now, publishedCount: published.length, published });
}
