import type { CollectionConfig } from 'payload';
import { formatSlugHook } from '@/lib/formatSlug';
import { revalidatePost, revalidatePostDelete } from './hooks/revalidatePost';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', '_status', 'publishedAt'],
    preview: (doc) =>
      doc?.slug
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/preview?slug=${doc.slug}&secret=${process.env.PREVIEW_SECRET}`
        : null,
  },
  access: { read: () => true },
  versions: { drafts: { autosave: false } },
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidatePostDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      hooks: { beforeValidate: [formatSlugHook('title')] },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText' },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'tags', type: 'text', hasMany: true },
  ],
};
