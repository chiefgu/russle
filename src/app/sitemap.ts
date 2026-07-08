import type { MetadataRoute } from 'next';
import { getAllWork } from '@/lib/mdx';
import { getPublishedPosts } from '@/lib/posts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://russle.co.uk';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  // Each post's own last-edit time. Content rewrites bump updatedAt, so the
  // sitemap reflects real freshness (and prompts re-crawl) rather than the
  // original publish date. Never use request time: a lastmod that changes on
  // every fetch trains crawlers to ignore the signal.
  const postModified = (p: (typeof posts)[number]) =>
    new Date(p.updatedAt ?? p.publishedAt ?? Date.parse('2026-06-01'));

  // Site-wide anchor for pages with no per-record timestamp (marketing routes,
  // MDX case studies): the most recent content change across the blog. Stable
  // between edits, moves only when something is actually published or updated.
  const siteModified = posts.reduce<Date>((latest, p) => {
    const d = postModified(p);
    return d > latest ? d : latest;
  }, new Date(Date.parse('2026-06-01')));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: siteModified, priority: 1 },
    { url: `${SITE_URL}/web-design`, lastModified: siteModified, priority: 0.9 },
    { url: `${SITE_URL}/ecommerce`, lastModified: siteModified, priority: 0.9 },
    { url: `${SITE_URL}/seo`, lastModified: siteModified, priority: 0.9 },
    { url: `${SITE_URL}/work`, lastModified: siteModified, priority: 0.9 },
    { url: `${SITE_URL}/conversion`, lastModified: siteModified, priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: siteModified, priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: siteModified, priority: 0.8 },
    { url: `${SITE_URL}/start`, lastModified: siteModified, priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: siteModified, priority: 0.8 },
  ];

  const workRoutes: MetadataRoute.Sitemap = getAllWork().map((post) => ({
    url: `${SITE_URL}/work/${post.slug}`,
    lastModified: siteModified,
    priority: 0.7,
  }));

  const journalRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: postModified(p),
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes, ...journalRoutes];
}
