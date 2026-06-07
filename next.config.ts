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
    ];
  },
};

export default withPayload(nextConfig);
