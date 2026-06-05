import { getPayload } from 'payload';
import config from '@payload-config';
import type { Post } from '@/payload-types';

async function client() {
  return getPayload({ config });
}

/** Published posts, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const payload = await client();
  const { docs } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 1,
    limit: 100,
    overrideAccess: false,
  });
  return docs;
}

/** Slugs of published posts, for generateStaticParams. */
export async function getPublishedSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return posts.map((p) => p.slug).filter((s): s is string => Boolean(s));
}

/**
 * One post by slug. When `draft` is true, returns the latest draft version
 * (used by the preview route); otherwise only resolves a published post.
 */
export async function getPostBySlug(
  slug: string,
  draft = false,
): Promise<Post | null> {
  const payload = await client();
  const { docs } = await payload.find({
    collection: 'posts',
    where: draft
      ? { slug: { equals: slug } }
      : { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    draft,
    depth: 2,
    limit: 1,
    overrideAccess: draft,
  });
  return docs[0] ?? null;
}
