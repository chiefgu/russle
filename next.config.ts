import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  // Pin the workspace root so Next.js doesn't walk up and pick a stray
  // lockfile in ~/ as the project root.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
