/**
 * Seeds one SEO comparison post (Squarespace vs custom) + a Comparisons category.
 * Idempotent: upserts by slug. Run with env loaded:
 *   export DATABASE_URL=... PAYLOAD_SECRET=...
 *   npx payload run scripts/seed-post-squarespace.ts
 */
import { getPayload } from 'payload';
import config from '@payload-config';

/* eslint-disable @typescript-eslint/no-explicit-any */
const t = (text: string, bold = false): any => ({
  type: 'text', text, version: 1, detail: 0, format: bold ? 1 : 0, mode: 'normal', style: '',
});
const p = (...children: any[]): any => ({
  type: 'paragraph', version: 1, format: '', indent: 0, direction: 'ltr', children,
});
const h = (tag: 'h2' | 'h3', text: string): any => ({
  type: 'heading', tag, version: 1, format: '', indent: 0, direction: 'ltr', children: [t(text)],
});
const ul = (items: string[]): any => ({
  type: 'list', listType: 'bullet', tag: 'ul', start: 1, version: 1, format: '', indent: 0, direction: 'ltr',
  children: items.map((item, i) => ({
    type: 'listitem', value: i + 1, version: 1, format: '', indent: 0, direction: 'ltr', children: [t(item)],
  })),
});
const doc = (...children: any[]): any => ({
  root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children },
});
/* eslint-enable @typescript-eslint/no-explicit-any */

const payload = await getPayload({ config });

// Category (upsert)
const found = await payload.find({ collection: 'categories', where: { slug: { equals: 'comparisons' } }, limit: 1 });
const comparisons =
  found.docs[0] ??
  (await payload.create({
    collection: 'categories',
    data: { title: 'Comparisons', slug: 'comparisons', description: 'Honest comparisons to help you choose how to build.' },
  }));

const slug = 'squarespace-vs-custom-website';
const content = doc(
  p(t('There is no universally right choice between Squarespace and a custom website. There is only the right choice for where your business is now and where it is heading. Both build perfectly good websites. They are just good at different things, and picking the wrong one costs you either money you did not need to spend or growth you cannot unlock later.')),
  h('h2', 'What Squarespace does well'),
  p(t('Squarespace is a genuinely good product, and for a lot of businesses it is the sensible starting point.')),
  ul([
    'It is quick to launch and cheap to run.',
    'The templates look tidy out of the box.',
    'You can edit it yourself without a developer.',
    'Hosting, security, and updates are handled for you.',
  ]),
  p(t('If you need a clean presence online this month and your needs are simple, it is hard to argue with.')),
  h('h2', 'Where it starts to hold you back'),
  p(t('The limits tend to show up as you grow.')),
  ul([
    'Every Squarespace site is built from the same components, so it is hard to look truly different from your competitors.',
    'Performance is largely fixed. You cannot tune it much, and speed is now both a ranking and a conversion factor.',
    'Bespoke features, a real booking flow, a custom CRM, an unusual product builder, are either impossible or bolted on with clunky third-party widgets.',
    'You are renting the platform. Your content and design live inside their system, on their terms.',
  ]),
  p(t('For a simple brochure site this rarely matters. For a business trying to stand out and convert, it eventually does.')),
  h('h2', 'What a custom build gives you'),
  p(t('A custom website is built around your business rather than a template built around everyone else’s.')),
  ul([
    'A brand-led design that looks like no one else.',
    'Performance you control, which helps both SEO and conversions.',
    'Any feature you can justify, built properly rather than patched in.',
    'Full ownership of the code and the content.',
  ]),
  p(t('The trade-off is real. It costs more up front, and you need someone to build it and keep it running.')),
  h('h2', 'How to choose'),
  p(t('A rough rule of thumb.')),
  ul([
    'Testing an idea, tight budget, simple needs: start on Squarespace and move later if you outgrow it.',
    'Competing on brand, planning to grow, or you need something the templates cannot do: invest in a custom build from the start and save yourself the rebuild.',
  ]),
  p(t('There is no shame in either. The mistake is paying for a custom build you do not need yet, or forcing a growing business to stay inside a template that is quietly capping it.')),
  h('h2', 'Where we land'),
  p(t('We build custom, brand-led sites because that is where we add the most value, and we will tell you honestly when a template would serve you better for now. If you are weighing it up, send us a line about your business and we will give you a straight steer.')),
);

const data = {
  title: 'Squarespace vs a custom website: which is right for your business?',
  slug,
  excerpt: 'Squarespace is a brilliant starting point, and the wrong tool for some businesses. An honest look at when to use it and when a custom build pays for itself.',
  publishedAt: '2026-06-08T09:00:00.000Z',
  content,
  category: comparisons.id,
  tags: ['squarespace', 'custom website', 'web design'],
  meta: {
    title: 'Squarespace vs a custom website: which is right for your business? | russle',
    description: 'Squarespace vs a custom website for a small business: an honest comparison of cost, speed, SEO, and control, from russle, a UK web design and SEO studio.',
  },
  _status: 'published' as const,
};

const existing = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 });
if (existing.docs[0]) {
  await payload.update({ collection: 'posts', id: existing.docs[0].id, data });
  console.log('Updated:', slug);
} else {
  await payload.create({ collection: 'posts', data });
  console.log('Created:', slug);
}
console.log('Done.');
