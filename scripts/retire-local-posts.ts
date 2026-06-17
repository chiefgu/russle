/**
 * National repositioning cleanup: retire the explicitly local/Cheshire blog
 * posts so they leave the live site and the publish cron won't republish them.
 * Sets _status=draft + a far-future publishedAt (content preserved, reversible).
 * Run: npx payload run scripts/retire-local-posts.ts
 */
import { getPayload } from 'payload';
import config from '@payload-config';

const payload = await getPayload({ config });
const SLUGS = ['local-seo-cheshire-south-manchester', 'cheshire-marketing-playbook'];

for (const slug of SLUGS) {
  const f = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, draft: true, overrideAccess: true, limit: 1 });
  const doc = f.docs[0];
  if (!doc) { console.log('NOT FOUND:', slug); continue; }
  await payload.delete({ collection: 'posts', id: doc.id, overrideAccess: true });
  console.log('Deleted:', slug);
}
console.log('Retire done.');
