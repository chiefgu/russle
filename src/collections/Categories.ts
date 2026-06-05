import type { CollectionConfig } from 'payload';
import { formatSlugHook } from '@/lib/formatSlug';

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
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
    { name: 'description', type: 'textarea' },
  ],
};
