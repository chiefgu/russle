import type { CollectionConfig } from 'payload';

// Blog email capture. Admin-only visibility; created via /api/subscribe.
export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false, // API route uses overrideAccess
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true },
    { name: 'source', type: 'text', admin: { description: 'Where they signed up, e.g. the post slug.' } },
  ],
};
