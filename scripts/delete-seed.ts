/**
 * Removes the throwaway verification seed (post + test category) created by
 * scripts/seed-blog.ts. Run with env loaded:
 *   npx payload run scripts/delete-seed.ts
 * Uses top-level await so `payload run` awaits the work before exiting.
 */
import { getPayload } from 'payload';
import config from '@payload-config';

const payload = await getPayload({ config });

const posts = await payload.find({
  collection: 'posts',
  where: { slug: { equals: 'seed-local-seo' } },
  limit: 10,
});
for (const p of posts.docs) {
  await payload.delete({ collection: 'posts', id: p.id });
  console.log('Deleted post:', p.slug);
}

const cats = await payload.find({
  collection: 'categories',
  where: { slug: { equals: 'guides' } },
  limit: 10,
});
for (const c of cats.docs) {
  await payload.delete({ collection: 'categories', id: c.id });
  console.log('Deleted category:', c.slug);
}

console.log('Seed cleanup complete.');
