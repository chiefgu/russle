/**
 * 30-day calendar, batch 1 (Jun 9-15). Five comparison posts staged as dated
 * DRAFTS (Jun 11 + 14 are staged separately). Each includes content + 3 FAQs.
 * Run with env loaded:
 *   export DATABASE_URL=... PAYLOAD_SECRET=...
 *   npx payload run scripts/seed-batch-3.ts
 */
import { getPayload } from 'payload';
import config from '@payload-config';

/* eslint-disable @typescript-eslint/no-explicit-any */
const t = (text: string, bold = false): any => ({
  type: 'text', text, version: 1, detail: 0, format: bold ? 1 : 0, mode: 'normal', style: '',
});
const p = (...children: any[]): any => ({ type: 'paragraph', version: 1, format: '', indent: 0, direction: 'ltr', children });
const h = (tag: 'h2' | 'h3', text: string): any => ({ type: 'heading', tag, version: 1, format: '', indent: 0, direction: 'ltr', children: [t(text)] });
const ul = (...items: (string | any[])[]): any => ({
  type: 'list', listType: 'bullet', tag: 'ul', start: 1, version: 1, format: '', indent: 0, direction: 'ltr',
  children: items.map((it, i) => ({ type: 'listitem', value: i + 1, version: 1, format: '', indent: 0, direction: 'ltr', children: Array.isArray(it) ? it : [t(it)] })),
});
const doc = (...children: any[]): any => ({ root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children } });
const lead = (label: string, rest: string): any[] => [t(label, true), t(rest)];
/* eslint-enable @typescript-eslint/no-explicit-any */

type Faq = { question: string; answer: string };

const payload = await getPayload({ config });

async function upsertCategory(slug: string, title: string, description: string) {
  const found = await payload.find({ collection: 'categories', where: { slug: { equals: slug } }, limit: 1 });
  return found.docs[0] ?? (await payload.create({ collection: 'categories', data: { title, slug, description } }));
}

async function upsertPost(input: {
  slug: string; title: string; excerpt: string; publishedAt: string;
  category: number; tags: string[]; metaDescription: string; faq: Faq[];
  status?: 'published' | 'draft';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}) {
  const status = (input.status ?? 'draft') as 'published' | 'draft';
  const data = {
    title: input.title, slug: input.slug, excerpt: input.excerpt, publishedAt: input.publishedAt,
    content: input.content, category: input.category, tags: input.tags, faq: input.faq,
    meta: { title: `${input.title} | russle`, description: input.metaDescription },
    _status: status,
  };
  const found = await payload.find({ collection: 'posts', where: { slug: { equals: input.slug } }, draft: true, overrideAccess: true, limit: 1 });
  if (found.docs[0]) { await payload.update({ collection: 'posts', id: found.docs[0].id, data }); console.log('Updated:', input.slug, `(${status})`); }
  else { await payload.create({ collection: 'posts', data }); console.log('Created:', input.slug, `(${status})`); }
}

const comparisons = await upsertCategory('comparisons', 'Comparisons', 'Honest comparisons to help you choose how to build.');

// Jun 9 ----------------------------------------------------------------------
await upsertPost({
  slug: 'shopify-vs-custom-storefront',
  title: 'Shopify vs a custom storefront: which is right for your shop?',
  excerpt: 'Shopify is the fastest way to start selling online. A custom storefront gives you control and a brand that stands out. Here is how to choose.',
  metaDescription: 'Shopify vs a custom storefront for a small shop: an honest comparison of cost, control, brand, and growth. From russle, a Cheshire brand and web studio.',
  publishedAt: '2026-06-09T10:00:00.000Z',
  category: comparisons.id, tags: ['shopify', 'ecommerce', 'custom storefront'],
  content: doc(
    p(t('Shopify and a custom storefront both sell products well. They are good at different things. The right choice depends on how standard your products are, how much the brand matters, and how far you plan to grow.')),
    h('h2', 'What Shopify does well'),
    ul('Quick to launch and well supported.', 'Payments, checkout, and inventory handled for you.', 'A huge app store for extra features.', 'Reliable hosting and security out of the box.'),
    p(t('For a straightforward shop that needs to be selling this month, it is hard to beat.')),
    h('h2', 'Where Shopify holds you back'),
    ul('Most Shopify shops use the same themes, so it is hard to look truly different.', 'Customising beyond the theme means apps that add monthly fees and can slow the site down.', 'You pay transaction fees unless you use Shopify Payments.', 'An unusual product or ordering flow can be a fight against the platform.'),
    h('h2', 'What a custom storefront gives you'),
    ul('A brand-led shop that looks like no one else.', 'Any buying experience you can imagine, built properly. We built Beth Bakes Cakes a custom cake builder that takes a bespoke order from occasion to deposit in one flow.', 'Performance you control, which helps SEO and conversions.', 'No per-app tax on every new feature.'),
    p(t('The trade-off is more cost up front and someone to build and maintain it.')),
    h('h2', 'How to choose'),
    ul(lead('Standard products, simple needs, want to start fast:', ' Shopify.'), lead('A distinctive brand, an unusual ordering flow, or building for the long term:', ' a custom storefront.')),
    h('h2', 'Where we land'),
    p(t('We build custom storefronts when the brand and the buying experience matter, and we will tell you honestly when Shopify is the smarter start. Send us a line about what you sell and we will give you a straight steer.')),
  ),
  faq: [
    { question: 'Is Shopify good for a small business?', answer: 'Yes, for a standard shop it is one of the fastest, most reliable ways to start selling. The limits show up when you want a distinctive brand or an unusual buying flow.' },
    { question: 'When is a custom storefront worth it over Shopify?', answer: 'When your brand needs to stand out, you have an unusual ordering process, or you want to avoid stacking monthly app fees as you grow.' },
    { question: 'Does Shopify charge transaction fees?', answer: 'Shopify charges transaction fees unless you use Shopify Payments, on top of the monthly plan. A custom build has no per-sale platform fee, though you handle hosting and payments yourself.' },
  ],
});

// Jun 10 ---------------------------------------------------------------------
await upsertPost({
  slug: 'squarespace-alternatives',
  title: 'Squarespace alternatives for a growing business',
  excerpt: 'Outgrown Squarespace, or want more control from the start? Here are the realistic alternatives, from other builders to a custom build, and who each suits.',
  metaDescription: 'The best Squarespace alternatives for a growing small business: Wix, WordPress, Webflow, Shopify, and custom builds compared. From russle, a Cheshire studio.',
  publishedAt: '2026-06-10T10:00:00.000Z',
  category: comparisons.id, tags: ['squarespace alternatives', 'website builder', 'comparison'],
  content: doc(
    p(t('Squarespace is a great starting point. The usual reasons to look elsewhere are the same ones: you want a site that looks less templated, more control over performance and SEO, or a feature Squarespace cannot do. Here are the realistic options.')),
    h('h2', 'Other website builders'),
    ul(lead('Wix:', ' more flexible layout control and a bigger app market, but still a builder with builder limits.'), lead('Webflow:', ' more design freedom and cleaner output, with a steeper learning curve. Closer to custom.'), lead('WordPress:', ' hugely flexible and you own it, but it needs maintenance and can get bloated if built carelessly.')),
    p(t('Moving from one builder to another can solve a specific gap, but you are still inside a platform.')),
    h('h2', 'For selling products'),
    ul(lead('Shopify:', ' if e-commerce is the main job, a dedicated commerce platform beats stretching Squarespace.')),
    h('h2', 'A custom build'),
    p(t('If the reason you are leaving Squarespace is that you want to stand out and grow without a ceiling, a custom website is the honest answer.')),
    ul('A brand-led design that looks like no one else.', 'Performance and SEO you control.', 'Any feature, built properly.', 'Full ownership of the code and content.'),
    p(t('It costs more and needs someone to build it, but there is no platform limit to hit later.')),
    h('h2', 'How to choose'),
    ul(lead('Want an easier switch with a bit more freedom:', ' Wix or Webflow.'), lead('Selling products seriously:', ' Shopify or a custom storefront.'), lead('Competing on brand and building for the long term:', ' a custom build.')),
    h('h2', 'Where we land'),
    p(t('Most businesses leaving Squarespace want to look less generic and grow without limits, which is exactly what a custom build is for. If that is you, send us a line and we will tell you honestly what would serve you best.')),
  ),
  faq: [
    { question: 'What is the best alternative to Squarespace?', answer: 'It depends on why you are leaving. For more design freedom, Webflow; for flexibility you own, WordPress; for selling, Shopify; and for a distinctive, growth-ready site with no platform ceiling, a custom build.' },
    { question: 'Should I switch from Squarespace to WordPress?', answer: 'Only if you need its flexibility and have someone to maintain it. WordPress is powerful but needs upkeep; if you mainly want to look less templated, a custom build may suit you better.' },
    { question: 'Can I move my content off Squarespace?', answer: 'Yes. Your text and images come with you to any platform or a custom build. The design does not transfer, which is usually the point of moving.' },
  ],
});

// Jun 12 ---------------------------------------------------------------------
await upsertPost({
  slug: 'webflow-vs-wordpress',
  title: 'Webflow vs WordPress for a small business',
  excerpt: 'Webflow and WordPress both build serious websites in very different ways. Here is the honest comparison for a small business deciding between them.',
  metaDescription: 'Webflow vs WordPress for a small business: design freedom, maintenance, SEO, and cost compared honestly. From russle, a Cheshire brand and web studio.',
  publishedAt: '2026-06-12T10:00:00.000Z',
  category: comparisons.id, tags: ['webflow', 'wordpress', 'comparison'],
  content: doc(
    p(t('Webflow and WordPress can both build a proper website. They get there in opposite ways: Webflow is a visual design tool with hosting built in, WordPress is open software you host and extend yourself. Here is how they compare for a small business.')),
    h('h2', 'Webflow'),
    ul('Strong visual design control without writing code.', 'Clean output and fast hosting included.', 'Less to maintain than WordPress.', 'Costs more in monthly fees, and you are inside Webflow’s platform.'),
    p(t('Good when design matters and you want less upkeep.')),
    h('h2', 'WordPress'),
    ul('The most flexible option, with a plugin for almost anything.', 'You own it and can host it anywhere.', 'A massive ecosystem of themes, plugins, and developers.', 'It needs maintenance: updates, security, and care to stay fast.'),
    p(t('Good when you need maximum flexibility and have someone to look after it.')),
    h('h2', 'Which suits a small business'),
    ul(lead('Want a designed site with less to maintain:', ' Webflow.'), lead('Want maximum flexibility and ownership, and can handle upkeep:', ' WordPress.'), lead('Want neither the platform fees of Webflow nor the upkeep of WordPress, and you compete on brand:', ' a custom build is worth considering.')),
    h('h2', 'Where we land'),
    p(t('We build custom rather than in either, because it gives our clients the design freedom of Webflow with full ownership and no platform ceiling. But both are capable tools, and we will tell you honestly when one of them fits your situation better.')),
  ),
  faq: [
    { question: 'Is Webflow better than WordPress?', answer: 'Neither is universally better. Webflow gives more design control with less maintenance but more platform lock-in; WordPress gives more flexibility and ownership but needs upkeep.' },
    { question: 'Is Webflow good for SEO?', answer: 'Yes, Webflow produces clean, fast sites which help SEO. WordPress can match it but only if built carefully, since plugins can slow it down.' },
    { question: 'Which is cheaper, Webflow or WordPress?', answer: 'WordPress software is free but you pay for hosting, plugins, and maintenance. Webflow bundles hosting into a higher monthly fee. Total cost depends on how much building and upkeep each needs.' },
  ],
});

// Jun 13 ---------------------------------------------------------------------
await upsertPost({
  slug: 'template-vs-custom-website',
  title: 'Template vs custom website: the real difference',
  excerpt: 'A template gets you online fast and cheap. A custom site is built around your business. Here is what the difference actually means for results.',
  metaDescription: 'Template vs custom website: the real difference in brand, performance, SEO, and results for a small business. From russle, a Cheshire brand and web studio.',
  publishedAt: '2026-06-13T10:00:00.000Z',
  category: comparisons.id, tags: ['template website', 'custom website', 'comparison'],
  content: doc(
    p(t('Almost every website is one of two things: a template you fill in, or a custom build made for your business. Both can look fine. The difference shows up in how distinctive, fast, and effective the site is. Here is the honest version.')),
    h('h2', 'What a template gives you'),
    ul('Online fast, often within days.', 'Cheap to start.', 'You can usually edit it yourself.', 'A tidy, predictable result.'),
    p(t('The catch: a template is built for everyone, so it rarely feels like anyone. You are arranging someone else’s design around your content.')),
    h('h2', 'What a custom build gives you'),
    ul('A brand-led design that looks like no one else.', 'Structure built around what your customers need in order to decide.', 'Performance you control, which helps SEO and conversions.', 'Full ownership and no platform ceiling.'),
    p(t('The catch: it costs more and needs someone to build it.')),
    h('h2', 'The part that matters'),
    p(t('A template can look nice, but nice and forgettable does not win you customers. A custom site earns trust faster and is built to convert, not just to exist. The more your website is meant to bring in work, the more that difference is worth.')),
    h('h2', 'How to choose'),
    ul(lead('Testing an idea, tight budget, simple needs:', ' a template is sensible.'), lead('Competing on brand or relying on the site for enquiries:', ' a custom build pays for itself.')),
    h('h2', 'Where we land'),
    p(t('We build custom because that is where the results are for businesses that want to stand out and grow. We will also tell you honestly when a template would do for now. Send us a line and we will give you a straight answer.')),
  ),
  faq: [
    { question: 'Is a template website bad?', answer: 'No. For testing an idea or a simple presence on a tight budget, a template is a sensible choice. It just rarely helps you stand out or convert as well as a custom build.' },
    { question: 'Why is a custom website more expensive?', answer: 'Most of the cost is the thinking and design built around your business: positioning, structure, and a brand-led look, rather than arranging your content in someone else’s template.' },
    { question: 'Will a custom site rank better than a template?', answer: 'It can, because you control performance, structure, and content. A template can rank too, but you are limited by what the template allows.' },
  ],
});

// Jun 15 ---------------------------------------------------------------------
await upsertPost({
  slug: 'wix-alternatives',
  title: 'Wix alternatives worth considering in 2026',
  excerpt: 'If Wix feels limiting or you want something more distinctive, here are the realistic alternatives for a small business, and who each one suits.',
  metaDescription: 'The best Wix alternatives for a small business in 2026: Squarespace, WordPress, Webflow, Shopify, and custom builds compared. From russle, a Cheshire studio.',
  publishedAt: '2026-06-15T10:00:00.000Z',
  category: comparisons.id, tags: ['wix alternatives', 'website builder', 'comparison'],
  content: doc(
    p(t('Wix is easy and cheap to start, which is why so many businesses begin there. The usual reasons to move on: you want a site that looks less templated, better performance, or a feature Wix handles awkwardly. Here are the realistic options.')),
    h('h2', 'Other builders'),
    ul(lead('Squarespace:', ' cleaner, more design-led templates, and similarly easy to run.'), lead('Webflow:', ' far more design control with cleaner output, at the cost of a steeper learning curve.'), lead('WordPress:', ' the most flexible and you own it, but it needs maintenance.')),
    p(t('A different builder can fix a specific gap, but you are still working inside a platform.')),
    h('h2', 'For selling products'),
    ul(lead('Shopify:', ' if e-commerce is the main job, a dedicated commerce platform beats stretching a general builder.')),
    h('h2', 'A custom build'),
    p(t('If you are leaving Wix because you want to stand out and grow without limits, a custom website is the honest answer: a brand-led design, performance and SEO you control, any feature built properly, and full ownership. It costs more and needs someone to build it, but there is no ceiling to hit later.')),
    h('h2', 'How to choose'),
    ul(lead('Want an easy switch with tidier design:', ' Squarespace.'), lead('Want maximum control:', ' Webflow or WordPress.'), lead('Selling seriously:', ' Shopify or a custom storefront.'), lead('Competing on brand and building for the long term:', ' a custom build.')),
    h('h2', 'Where we land'),
    p(t('Most businesses leaving Wix want to look less generic and grow without limits, which is what a custom build is for. Tell us about your business and we will give you a straight, honest steer.')),
  ),
  faq: [
    { question: 'What is the best alternative to Wix?', answer: 'It depends why you are switching. For tidier design, Squarespace; for control, Webflow or WordPress; for selling, Shopify; and for a distinctive, growth-ready site, a custom build.' },
    { question: 'Is Squarespace better than Wix?', answer: 'Squarespace tends to look more design-led and cleaner, while Wix offers more drag-and-drop freedom. Neither is universally better; it depends on the look and control you want.' },
    { question: 'Can I move my site off Wix?', answer: 'Your content can move, but Wix does not let you export the site itself, so you rebuild the design on the new platform or as a custom build. That is often the reason to switch.' },
  ],
});

console.log('Batch 1 (Jun 9-15) complete.');
