import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  upload: {
    imageSizes: [
      { name: 'card', width: 768, height: 480, position: 'centre' },
      { name: 'hero', width: 1600, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
};
