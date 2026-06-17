import type { MetadataRoute } from 'next';
import { getAllWork } from '@/lib/mdx';
import { getPublishedPosts } from '@/lib/posts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://russle.co.uk';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, priority: 1 },
    { url: `${SITE_URL}/work`, lastModified, priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified, priority: 0.85 },
    { url: `${SITE_URL}/launch`, lastModified, priority: 0.85 },
    { url: `${SITE_URL}/grow`, lastModified, priority: 0.85 },
    { url: `${SITE_URL}/manage`, lastModified, priority: 0.85 },
    { url: `${SITE_URL}/conversion`, lastModified, priority: 0.85 },
    { url: `${SITE_URL}/about`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/start`, lastModified, priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified, priority: 0.8 },
  ];

  const workRoutes: MetadataRoute.Sitemap = getAllWork().map((post) => ({
    url: `${SITE_URL}/work/${post.slug}`,
    lastModified,
    priority: 0.7,
  }));

  const posts = await getPublishedPosts();
  const journalRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : lastModified,
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes, ...journalRoutes];
}
