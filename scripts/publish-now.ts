/**
 * Publish a queued draft immediately, ahead of its scheduled date.
 *
 * The cron only runs between 8 and 10am, so bringing a post forward outside
 * that window needs a direct publish. Sets publishedAt to now so the post does
 * not appear back-dated, then flips it to published.
 *
 * The revalidate hook no-ops outside a Next request context, so the static
 * blog pages still need a deploy afterwards for the post to appear.
 *
 * Run: npx payload run scripts/publish-now.ts <slug>  (with DATABASE_URL + PAYLOAD_SECRET)
 */
import { getPayload } from 'payload';
import config from '@payload-config';

const slug = process.argv[process.argv.length - 1];
if (!slug || slug.endsWith('.ts')) {
  console.error('Usage: npx payload run scripts/publish-now.ts <slug>');
  process.exit(1);
}

const payload = await getPayload({ config });

const found = await payload.find({
  collection: 'posts',
  where: { slug: { equals: slug } },
  draft: true,
  overrideAccess: true,
  limit: 1,
});

const doc = found.docs[0];
if (!doc) {
  console.error(`No post found with slug "${slug}"`);
  process.exit(1);
}
if (doc._status === 'published') {
  console.log(`"${slug}" is already published (${doc.publishedAt}). Nothing to do.`);
  process.exit(0);
}

const now = new Date().toISOString();
await payload.update({
  collection: 'posts',
  id: doc.id,
  data: { publishedAt: now, _status: 'published' },
  overrideAccess: true,
});

console.log(`Published "${doc.title}"`);
console.log(`  slug:        /blog/${slug}`);
console.log(`  publishedAt: ${now}`);
console.log('  Deploy to rebuild the static pages.');
