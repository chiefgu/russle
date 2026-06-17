import type { NextConfig } from 'next';
import path from 'node:path';
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  // Pin the workspace root so Next.js doesn't walk up and pick a stray
  // lockfile in ~/ as the project root.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      // Vercel Blob public URLs
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  async redirects() {
    return [
      // Blog moved from /journal to /blog. 301 the old paths.
      { source: '/journal', destination: '/blog', permanent: true },
      { source: '/journal/:slug', destination: '/blog/:slug', permanent: true },
      // Local SEO pages retired in the national repositioning. 301 their
      // ranking authority to /services rather than 404 into dead links.
      { source: '/web-design-alderley-edge', destination: '/services', permanent: true },
      { source: '/web-design-altrincham', destination: '/services', permanent: true },
      { source: '/web-design-chester', destination: '/services', permanent: true },
      { source: '/web-design-didsbury', destination: '/services', permanent: true },
      { source: '/web-design-hale', destination: '/services', permanent: true },
      { source: '/web-design-knutsford', destination: '/services', permanent: true },
      { source: '/web-design-macclesfield', destination: '/services', permanent: true },
      { source: '/web-design-prestbury', destination: '/services', permanent: true },
      { source: '/web-design-wilmslow', destination: '/services', permanent: true },
      { source: '/south-manchester-cheshire-brand-web-design', destination: '/services', permanent: true },
    ];
  },
};

export default withPayload(nextConfig);
