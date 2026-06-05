/**
 * One-off local verification seed: creates a category + a published post via the
 * Payload Local API so we can smoke-test /journal end-to-end without the admin UI.
 * Run with: npx payload run scripts/seed-blog.ts
 * Safe to re-run — it upserts by slug. Uses top-level await so `payload run`
 * awaits the work before exiting.
 */
import { getPayload } from 'payload';
import config from '@payload-config';

// Dev seeder only — Payload's generated Lexical type uses strict string-literal
// unions; typing this blob as `any` keeps the production build's type-check green
// without hand-writing the full SerializedEditorState union.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lexical: any = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [
      {
        type: 'heading',
        tag: 'h2',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr' as const,
        children: [
          {
            type: 'text',
            text: 'Why local SEO matters for Cheshire studios',
            version: 1,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
          },
        ],
      },
      {
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr' as const,
        children: [
          {
            type: 'text',
            text: 'This is a seeded test post body to verify the Lexical renderer, metadata, and JSON-LD output.',
            version: 1,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
          },
        ],
      },
    ],
  },
};

const payload = await getPayload({ config });

const existingCat = await payload.find({
  collection: 'categories',
  where: { slug: { equals: 'guides' } },
  limit: 1,
});
const category =
  existingCat.docs[0] ??
  (await payload.create({
    collection: 'categories',
    data: { title: 'Guides', slug: 'guides', description: 'How-to guides from the studio.' },
  }));

const slug = 'seed-local-seo';
const existingPost = await payload.find({
  collection: 'posts',
  where: { slug: { equals: slug } },
  limit: 1,
});

const data = {
  title: 'A seeded note on local SEO',
  slug,
  excerpt: 'A throwaway seeded post used to verify the blog renders end to end.',
  publishedAt: '2026-06-05T09:00:00.000Z',
  content: lexical,
  category: category.id,
  tags: ['seo', 'local'],
  _status: 'published' as const,
};

if (existingPost.docs[0]) {
  await payload.update({ collection: 'posts', id: existingPost.docs[0].id, data });
  console.log('Updated seeded post:', slug);
} else {
  await payload.create({ collection: 'posts', data });
  console.log('Created seeded post:', slug);
}
