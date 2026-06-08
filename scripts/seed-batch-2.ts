/**
 * Seeds three SEO posts: enquiries/conversion (Guides), Wix vs WordPress vs
 * custom (Comparisons), and what a brand-led website is (Guides).
 * Idempotent: upserts by slug. Run with env loaded:
 *   export DATABASE_URL=... PAYLOAD_SECRET=...
 *   npx payload run scripts/seed-batch-2.ts
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
// Each item is a string, or an array of inline text nodes (for bold lead-ins).
const ul = (...items: (string | any[])[]): any => ({
  type: 'list', listType: 'bullet', tag: 'ul', start: 1, version: 1, format: '', indent: 0, direction: 'ltr',
  children: items.map((it, i) => ({
    type: 'listitem', value: i + 1, version: 1, format: '', indent: 0, direction: 'ltr',
    children: Array.isArray(it) ? it : [t(it)],
  })),
});
const doc = (...children: any[]): any => ({
  root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children },
});
/* eslint-enable @typescript-eslint/no-explicit-any */

const payload = await getPayload({ config });

async function upsertCategory(slug: string, title: string, description: string) {
  const found = await payload.find({ collection: 'categories', where: { slug: { equals: slug } }, limit: 1 });
  return found.docs[0] ?? (await payload.create({ collection: 'categories', data: { title, slug, description } }));
}

async function upsertPost(input: {
  slug: string; title: string; excerpt: string; publishedAt: string;
  category: number; tags: string[]; metaDescription: string;
  status?: 'published' | 'draft';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}) {
  const status = (input.status ?? 'published') as 'published' | 'draft';
  const data = {
    title: input.title, slug: input.slug, excerpt: input.excerpt, publishedAt: input.publishedAt,
    content: input.content, category: input.category, tags: input.tags,
    meta: { title: `${input.title} | russle`, description: input.metaDescription },
    _status: status,
  };
  const found = await payload.find({ collection: 'posts', where: { slug: { equals: input.slug } }, limit: 1 });
  if (found.docs[0]) { await payload.update({ collection: 'posts', id: found.docs[0].id, data }); console.log(status === 'draft' ? 'Drafted:' : 'Published:', input.slug); }
  else { await payload.create({ collection: 'posts', data }); console.log(status === 'draft' ? 'Drafted:' : 'Published:', input.slug); }
}

const guides = await upsertCategory('guides', 'Guides', 'Practical guides on brand, websites, and growth for independent businesses.');
const comparisons = await upsertCategory('comparisons', 'Comparisons', 'Honest comparisons to help you choose how to build.');

// ---- Post 1: enquiries ----
await upsertPost({
  slug: 'website-not-getting-enquiries',
  title: "Why your website isn't getting enquiries (and how to fix it)",
  excerpt: 'A good-looking website that brings in nothing is more common than you would think. Here are the usual reasons, and how to turn visits into enquiries.',
  metaDescription: 'Your website looks fine but no one enquires? The common reasons a small business site fails to convert, and how to fix them. From russle, a Cheshire studio.',
  publishedAt: '2026-06-08T10:00:00.000Z',
  category: guides.id,
  tags: ['conversion', 'website', 'enquiries'],
  content: doc(
    p(t('Plenty of businesses have a website they are quietly proud of that brings in almost nothing. It looks fine. It just sits there. The problem is rarely the design on its own. It is usually that the site was built to look good rather than to move a visitor from curious to in touch. Here are the reasons we see most often.')),
    h('h2', 'It is not clear what you do in the first five seconds'),
    p(t('Most visitors decide whether to stay almost instantly. If your homepage opens with a clever line or a slideshow instead of a plain statement of what you do, who it is for, and what to do next, people leave before they understand you. Say it straight, above the fold.')),
    h('h2', 'There is no obvious next step'),
    p(t('A site full of information but no clear action is a dead end. Every page should point somewhere: book a call, get a quote, see the menu, start an enquiry. One primary action per page, repeated, beats ten competing links.')),
    h('h2', 'It asks for too much, too soon'),
    p(t('A long contact form is a wall. The more fields you demand before someone has decided to trust you, the fewer people finish. Ask for the minimum, make the first step small, and let the conversation do the rest.')),
    h('h2', 'It is slow'),
    p(t('A site that takes too long to load loses people before they see anything, and speed is a Google ranking factor too. If yours is sluggish on a phone, that alone could be costing you enquiries every week.')),
    h('h2', 'It does not build trust'),
    p(t('People buy from businesses they believe. Real photography, reviews, recognisable clients, a clear starting price, a human about page. Without proof, even a polished site feels risky to act on.')),
    h('h2', 'The right people are not finding it'),
    p(t('Sometimes the site converts fine, there is just no one on it. If you are invisible in local search, the fix is not the website, it is being found. That is a different job, and an important one.')),
    h('h2', 'How to fix it'),
    p(t('Start with one question on every page: what do I want the visitor to do here, and is that obvious. Then tighten the first screen, cut the form down, sort the speed, and add proof. None of this requires a rebuild. Most of it is sharpening what you already have.')),
    h('h2', 'Where we come in'),
    p(t('Turning a website into something that actually brings in work is most of what we do. If yours looks fine but stays quiet, send us the link and we will tell you honestly where it is leaking.')),
  ),
});

// ---- Post 2: Wix vs WordPress vs custom ----
await upsertPost({
  slug: 'wix-vs-wordpress-vs-custom',
  title: 'Wix vs WordPress vs a custom website: which should you choose?',
  excerpt: 'Three common ways to build a small business website, and the honest trade-offs of each, so you can pick the one that fits where your business is heading.',
  metaDescription: 'Wix vs WordPress vs a custom website: an honest comparison of cost, control, speed, and SEO for small businesses. From russle, a Cheshire brand and web studio.',
  publishedAt: '2026-06-11T10:00:00.000Z',
  status: 'draft',
  category: comparisons.id,
  tags: ['wix', 'wordpress', 'custom website'],
  content: doc(
    p(t('Most small businesses end up choosing between Wix, WordPress, and a custom build. None of them is the right answer for everyone. They sit at different points on the same scale: how easy it is to use versus how much control and headroom you get. Here is the honest version.')),
    h('h2', 'Wix'),
    p(t('Wix is the easiest way to get online.')),
    ul(
      'Drag-and-drop, with no technical skill needed.',
      'Everything in one place: hosting, templates, support.',
      'Cheap to start.',
    ),
    p(t('The trade-offs show up later. You are locked into their system, performance is limited, and it is hard to make a Wix site look like anything other than a Wix site. Great for a simple presence, limiting once you want to stand out or grow.')),
    h('h2', 'WordPress'),
    p(t('WordPress runs a huge share of the web, and for good reason.')),
    ul(
      'Hugely flexible, with a plugin for almost anything.',
      'You own your site and can move it.',
      'A massive ecosystem of themes and developers.',
    ),
    p(t('The catch is maintenance. Plugins need updating, things break, security needs minding, and the flexibility means it is easy to end up with a slow, bloated site if it is not built carefully. Powerful, but it asks for upkeep.')),
    h('h2', 'A custom website'),
    p(t('A custom build is made for your business rather than assembled from parts.')),
    ul(
      'A brand-led design that looks like no one else.',
      'Performance and SEO you control.',
      'Any feature built properly, nothing bolted on.',
      'Full ownership of the code.',
    ),
    p(t('It costs more up front and needs a developer to build and maintain it. In return you get a faster, more distinctive site with no platform ceiling.')),
    h('h2', 'How to choose'),
    ul(
      [t('Just need to be online, simple needs, tight budget:', true), t(' Wix.')],
      [t('Want flexibility and a big ecosystem, with someone to maintain it:', true), t(' WordPress.')],
      [t('Competing on brand, focused on growth, or you need something specific:', true), t(' a custom build.')],
    ),
    p(t('A rough rule: the more your website is meant to win you customers rather than just exist, the further toward custom it pays to go.')),
    h('h2', 'Where we sit'),
    p(t('We build custom, because that is where we add the most value for businesses that want to stand out and grow. We will also tell you honestly when Wix or WordPress would serve you better for now. If you are weighing it up, send us a line about your business and we will give you a straight steer.')),
  ),
});

// ---- Post 3: brand-led website ----
await upsertPost({
  slug: 'what-is-a-brand-led-website',
  title: 'What is a brand-led website, and why does it convert better?',
  excerpt: 'Most websites are built page by page. A brand-led website starts from who you are and works outward, and that difference is why it converts better.',
  metaDescription: 'What a brand-led website is, how it differs from a templated site, and why starting from your brand converts better. From russle, a brand and web studio.',
  publishedAt: '2026-06-14T10:00:00.000Z',
  status: 'draft',
  category: guides.id,
  tags: ['brand', 'web design', 'conversion'],
  content: doc(
    p(t('Most websites are assembled. You pick a template, drop in your logo and some copy, and arrange the pages. A brand-led website is built the other way around. It starts from who you are, what you stand for, and who you are for, and every design and copy decision flows from that. The result looks and reads like one coherent thing rather than a tidy template with your name on it.')),
    h('h2', 'What "brand-led" actually means'),
    p(t('A brand is more than a logo. It is the whole impression: the colours, the type, the tone of voice, the photography, the way the site carries someone from a first glance to a decision. A brand-led website treats all of that as the starting point, not decoration added at the end.')),
    p(t('In practice that means:')),
    ul(
      'The design comes from your brand, so you look like no one else.',
      'The words sound like you, consistently, from the homepage to the contact form.',
      'The structure is built around what your customers need in order to decide, not around a generic template.',
    ),
    h('h2', 'Why it converts better'),
    p(t('Distinctiveness and trust both move the needle, and a brand-led site builds both.')),
    ul(
      [t('It is memorable.', true), t(' A site that looks like every competitor is instantly forgettable. One that feels unmistakably yours sticks.')],
      [t('It builds trust faster.', true), t(' Consistency reads as competence. When the brand holds together, people believe the business behind it.')],
      [t('It speaks to the right people.', true), t(' Built around your actual customers, it answers their questions and removes their doubts, which is what turns a visit into an enquiry.')],
    ),
    p(t('A template can look perfectly nice. It just rarely feels like anyone, and nice but forgettable does not convert.')),
    h('h2', 'When it is worth it'),
    p(t('If you are testing an idea or you only need a simple presence, a template is fine. The moment you are competing on more than price, or you want the website to actively bring in work, the brand-led approach starts to pay for itself. It is the difference between having a website and having one that sells for you.')),
    h('h2', 'How we work'),
    p(t('Brand and website as one system is what we do. We build the brand and the site together so the impression holds from the first click to the enquiry. If yours feels like a template with your logo on it, that is usually the thing worth fixing first.')),
  ),
});

console.log('Batch 2 complete.');
