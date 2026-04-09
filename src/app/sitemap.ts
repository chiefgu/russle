import type { MetadataRoute } from 'next';
import { getAllWork } from '@/lib/mdx';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://russle.co.uk';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, priority: 1 },
    { url: `${SITE_URL}/work`, lastModified, priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/start`, lastModified, priority: 0.9 },
  ];

  const workRoutes: MetadataRoute.Sitemap = getAllWork().map((post) => ({
    url: `${SITE_URL}/work/${post.slug}`,
    lastModified,
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes];
}
