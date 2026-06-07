/**
 * Seeds real SEO blog content for /journal via the Payload Local API.
 * Idempotent: upserts categories + posts by slug. Run with env loaded:
 *   export DATABASE_URL=... PAYLOAD_SECRET=...
 *   npx payload run scripts/seed-content.ts
 * Uses top-level await so `payload run` awaits the work.
 */
import { getPayload } from 'payload';
import config from '@payload-config';

// ---- Lexical helpers (typed loosely; Payload's generated union is too strict for literals) ----
/* eslint-disable @typescript-eslint/no-explicit-any */
const t = (text: string, bold = false): any => ({
  type: 'text',
  text,
  version: 1,
  detail: 0,
  format: bold ? 1 : 0,
  mode: 'normal',
  style: '',
});
const p = (...children: any[]): any => ({
  type: 'paragraph',
  version: 1,
  format: '',
  indent: 0,
  direction: 'ltr',
  children,
});
const h = (tag: 'h2' | 'h3', text: string): any => ({
  type: 'heading',
  tag,
  version: 1,
  format: '',
  indent: 0,
  direction: 'ltr',
  children: [t(text)],
});
const ul = (items: string[]): any => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  version: 1,
  format: '',
  indent: 0,
  direction: 'ltr',
  children: items.map((item, i) => ({
    type: 'listitem',
    value: i + 1,
    version: 1,
    format: '',
    indent: 0,
    direction: 'ltr',
    children: [t(item)],
  })),
});
const doc = (...children: any[]): any => ({
  root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children },
});
/* eslint-enable @typescript-eslint/no-explicit-any */

const payload = await getPayload({ config });

async function upsertCategory(slug: string, title: string, description: string) {
  const found = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  });
  if (found.docs[0]) return found.docs[0];
  return payload.create({ collection: 'categories', data: { title, slug, description } });
}

async function upsertPost(input: {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: number;
  tags: string[];
  metaDescription: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}) {
  const data = {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    publishedAt: input.publishedAt,
    content: input.content,
    category: input.category,
    tags: input.tags,
    meta: { title: `${input.title} | russle`, description: input.metaDescription },
    _status: 'published' as const,
  };
  const found = await payload.find({
    collection: 'posts',
    where: { slug: { equals: input.slug } },
    limit: 1,
  });
  if (found.docs[0]) {
    await payload.update({ collection: 'posts', id: found.docs[0].id, data });
    console.log('Updated:', input.slug);
  } else {
    await payload.create({ collection: 'posts', data });
    console.log('Created:', input.slug);
  }
}

const guides = await upsertCategory('guides', 'Guides', 'Practical guides on brand, websites, and growth for independent businesses.');
const local = await upsertCategory('local-notes', 'Local notes', 'Notes for businesses building in Cheshire and South Manchester.');

// ---- Post 1 ----
await upsertPost({
  slug: 'small-business-website-cost-2026',
  title: 'How much does a small business website cost in 2026?',
  excerpt:
    'A clear, honest breakdown of what a small business website costs in 2026, what moves the price, and where the money actually goes.',
  metaDescription:
    'What a small business website costs in 2026, what changes the price, and where the budget goes. An honest guide from russle, a Cheshire studio.',
  publishedAt: '2026-06-02T09:00:00.000Z',
  category: guides.id,
  tags: ['website cost', 'small business', 'pricing'],
  content: doc(
    p(t('It is the first question almost every business owner asks, and the honest answer is that it depends on what the site needs to do. A simple presence is one thing. A site built to win enquiries and rank locally is another. Here is how we think about it.')),
    h('h2', 'What you are actually paying for'),
    p(t('A website price is rarely about the number of pages. Most of the cost sits in the thinking before the build: the positioning, the structure, the words, and the design decisions that make a visitor trust you in the first few seconds. The build itself is the easy part once that groundwork is done.')),
    h('h2', 'Typical ranges'),
    p(t('As a rough guide for an independent business in 2026:')),
    ul([
      'Template site, light setup: a few hundred pounds, fast, but it looks like everyone else.',
      'Custom small business site, properly structured for search and enquiries: low thousands.',
      'Brand and website together, built as one system: from around two thousand pounds upward, depending on scope.',
    ]),
    p(t('At russle, a Launch project starts at 1,995 pounds and includes the brand groundwork, not just the pages.')),
    h('h2', 'What pushes the price up'),
    ul([
      'Custom brand work rather than an off-the-shelf look.',
      'E-commerce or booking systems that need real integration.',
      'More pages, more copy, and more bespoke layouts.',
      'Ongoing SEO and content rather than a one-off launch.',
    ]),
    h('h2', 'Where the value sits'),
    p(t('A cheap site that no one finds and no one trusts is the most expensive option, because it costs you enquiries every month. The sites that pay for themselves are the ones built around a clear position and a clear next step for the visitor. That is the part worth investing in.')),
    p(t('If you are weighing up a project, we are happy to give you a straight answer on what it would take. No hard sell.')),
  ),
});

// ---- Post 2 ----
await upsertPost({
  slug: 'brand-or-logo-what-you-need',
  title: 'Brand or logo: what independent businesses actually need',
  excerpt:
    'A logo is one small part of a brand. Here is what the difference means in practice, and what to invest in first.',
  metaDescription:
    'The difference between a brand and a logo, and what an independent business should invest in first. A plain-English guide from russle.',
  publishedAt: '2026-06-03T09:00:00.000Z',
  category: guides.id,
  tags: ['branding', 'logo', 'brand identity'],
  content: doc(
    p(t('People often use the words brand and logo to mean the same thing. They are not. Understanding the difference saves you money and stops you buying the wrong thing.')),
    h('h2', 'A logo is a mark. A brand is the whole impression.'),
    p(t('A logo is a single symbol. A brand is everything someone feels when they come across your business: the colours, the type, the tone of voice, the photography, the way the website carries them from a first glance to an enquiry. The logo sits inside the brand, it is not the brand itself.')),
    h('h2', 'What a brand actually includes'),
    ul([
      'A clear position: who you are for and why you are the obvious choice.',
      'A colour palette and type system that work everywhere, not just on the logo.',
      'A voice, so your words sound like you across the site, email, and social.',
      'Rules for how it all fits together, so it stays consistent as you grow.',
    ]),
    h('h2', 'When a logo on its own is enough'),
    p(t('If you are testing an idea, a clean logo and a tidy template can be plenty to get going. There is no sense over-investing before you know the business has legs.')),
    h('h2', 'When you have outgrown it'),
    p(t('The moment you are competing on more than price, the brand starts to matter. If your website, your invoices, and your social all look like they belong to different companies, you are leaking trust. That is usually the point to build the brand properly rather than bolt on another logo.')),
    p(t('At russle we build brand and website as one system, so the impression holds together from the first click to the enquiry. If you are not sure which you need, ask us and we will tell you honestly.')),
  ),
});

// ---- Post 3 ----
await upsertPost({
  slug: 'local-seo-cheshire-south-manchester',
  title: 'Local SEO in Cheshire and South Manchester: where to start',
  excerpt:
    'If you run a business in Cheshire or South Manchester, here is a practical starting point for getting found in local search.',
  metaDescription:
    'A practical local SEO starting guide for businesses in Cheshire and South Manchester, from russle. Google Business Profile, on-page signals, and reviews.',
  publishedAt: '2026-06-04T09:00:00.000Z',
  category: local.id,
  tags: ['local seo', 'cheshire', 'south manchester'],
  content: doc(
    p(t('Most independent businesses do not need to rank across the whole country. They need to be found by people nearby who are ready to buy. That is local SEO, and a few fundamentals get you most of the way there.')),
    h('h2', 'Start with your Google Business Profile'),
    p(t('For local search, your Google Business Profile does more heavy lifting than your website. Claim it, fill in every field, pick the right categories, add real photos, and keep your opening hours accurate. This is the single highest-return hour you can spend.')),
    h('h2', 'Make your location obvious on the site'),
    p(t('Search engines and visitors both want to know where you are and who you serve. Name the towns you work in, in your own words, on pages that matter. A studio serving Alderley Edge, Wilmslow, Hale, and Knutsford should say so clearly rather than hiding it in a footer.')),
    ul([
      'A clear, human description of the area you cover.',
      'Town or service pages where they genuinely add value, not thin doorway pages.',
      'Consistent name, address, and phone number everywhere they appear.',
    ]),
    h('h2', 'Earn reviews, and reply to them'),
    p(t('Reviews are one of the strongest local signals and the easiest to influence. Ask happy customers at the right moment, make it a one-tap link, and reply to every review you get. It tells Google you are active and tells the next customer you care.')),
    h('h2', 'Publish content that answers real questions'),
    p(t('The questions your customers ask are the searches you want to win. A short, useful article that answers one of them, written plainly, will quietly bring in the right people for years. This page is an example of exactly that.')),
    p(t('We help businesses across Cheshire and South Manchester get found and turn that visibility into enquiries. If local search is where you are stuck, that is the kind of work we do every week.')),
  ),
});

console.log('Content seed complete.');
