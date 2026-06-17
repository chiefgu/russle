import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://russle.co.uk';

export default function robots(): MetadataRoute.Robots {
  return {
    // /for/* are private per-lead outreach proposals; /admin, /cms-api and
    // /preview are CMS internals - keep them all out of search.
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/for/', '/admin/', '/cms-api/', '/preview'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
