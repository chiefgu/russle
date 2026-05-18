import type { MetadataRoute } from 'next';
import { getAllWork } from '@/lib/mdx';
import { getAllLocalities } from '@/lib/locality';
import { getAllJournal } from '@/lib/journal';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://russle.co.uk';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, priority: 1 },
    { url: `${SITE_URL}/work`, lastModified, priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified, priority: 0.85 },
    { url: `${SITE_URL}/grow`, lastModified, priority: 0.85 },
    { url: `${SITE_URL}/about`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/start`, lastModified, priority: 0.9 },
    { url: `${SITE_URL}/journal`, lastModified, priority: 0.8 },
  ];

  const workRoutes: MetadataRoute.Sitemap = getAllWork().map((post) => ({
    url: `${SITE_URL}/work/${post.slug}`,
    lastModified,
    priority: 0.7,
  }));

  const localityRoutes: MetadataRoute.Sitemap = getAllLocalities().map((loc) => ({
    url: `${SITE_URL}${loc.routePath}`,
    lastModified,
    priority: loc.isHub ? 0.85 : 0.75,
  }));

  const journalRoutes: MetadataRoute.Sitemap = getAllJournal().map((p) => ({
    url: `${SITE_URL}/journal/${p.slug}`,
    lastModified: new Date(p.date),
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes, ...localityRoutes, ...journalRoutes];
}
