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
      { source: '/journal', destination: '/blog', permanent: true },
      { source: '/journal/:slug', destination: '/blog/:slug', permanent: true },
      // Retired local SEO pages now point at the web design service.
      { source: '/web-design-alderley-edge', destination: '/web-design', permanent: true },
      { source: '/web-design-altrincham', destination: '/web-design', permanent: true },
      { source: '/web-design-chester', destination: '/web-design', permanent: true },
      { source: '/web-design-didsbury', destination: '/web-design', permanent: true },
      { source: '/web-design-hale', destination: '/web-design', permanent: true },
      { source: '/web-design-knutsford', destination: '/web-design', permanent: true },
      { source: '/web-design-macclesfield', destination: '/web-design', permanent: true },
      { source: '/web-design-prestbury', destination: '/web-design', permanent: true },
      { source: '/web-design-wilmslow', destination: '/web-design', permanent: true },
      { source: '/south-manchester-cheshire-brand-web-design', destination: '/web-design', permanent: true },
      // Retired tier + pricing pages (reposition 2026-07-01).
      { source: '/services', destination: '/', permanent: true },
      { source: '/launch', destination: '/web-design', permanent: true },
      { source: '/grow', destination: '/seo', permanent: true },
      { source: '/manage', destination: '/seo', permanent: true },
    ];
  },
};

export default withPayload(nextConfig);
