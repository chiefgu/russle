import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { seoPlugin } from '@payloadcms/plugin-seo';
import sharp from 'sharp';

import { Users } from '@/collections/Users';
import { Media } from '@/collections/Media';
import { Categories } from '@/collections/Categories';
import { Posts } from '@/collections/Posts';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: { user: Users.slug },
  routes: { admin: '/admin', api: '/cms-api' },
  editor: lexicalEditor(),
  collections: [Users, Media, Categories, Posts],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
    seoPlugin({
      collections: ['posts'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.title ?? 'russle'} | russle`,
      generateDescription: ({ doc }) => doc?.excerpt ?? '',
    }),
  ],
});
