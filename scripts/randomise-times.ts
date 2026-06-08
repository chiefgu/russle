/**
 * Randomises every draft post's publishedAt TIME to a random minute between
 * 9 and 11am UK (08:00-10:00 UTC during BST), keeping its DATE. Makes the
 * auto-publish cadence look natural rather than firing at a fixed minute.
 * Run with env loaded:
 *   export DATABASE_URL=... PAYLOAD_SECRET=...
 *   npx payload run scripts/randomise-times.ts
 */
import { getPayload } from 'payload';
import config from '@payload-config';

// Random time in [08:00, 10:00) UTC == [09:00, 11:00) UK during BST.
function randomMorningUTC(dateISO: string): string {
  const offset = Math.floor(Math.random() * 120); // 0..119 minutes from 08:00 UTC
  const h = 8 + Math.floor(offset / 60);
  const m = offset % 60;
  return `${dateISO}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00.000Z`;
}

const payload = await getPayload({ config });

const drafts = await payload.find({
  collection: 'posts',
  where: { _status: { equals: 'draft' } },
  draft: true,
  overrideAccess: true,
  limit: 200,
});

for (const d of drafts.docs) {
  const date = String(d.publishedAt).slice(0, 10); // YYYY-MM-DD
  const newAt = randomMorningUTC(date);
  await payload.update({ collection: 'posts', id: d.id, data: { publishedAt: newAt, _status: 'draft' } });
  console.log(d.slug, '->', newAt);
}

console.log(`Randomised ${drafts.docs.length} draft(s).`);
