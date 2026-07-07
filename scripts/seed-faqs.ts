/**
 * Adds FAQ Q&A to existing posts (and pushes the new faq schema via Payload init).
 * Preserves each post's published/draft status. Run with env loaded:
 *   export DATABASE_URL=... PAYLOAD_SECRET=...
 *   npx payload run scripts/seed-faqs.ts
 */
import { getPayload } from 'payload';
import config from '@payload-config';

type Faq = { question: string; answer: string };
type Entry = { status: 'published' | 'draft'; items: Faq[] };

const FAQS: Record<string, Entry> = {
  'small-business-website-cost-2026': {
    status: 'published',
    items: [
      { question: 'How much does a small business website cost in the UK?', answer: 'It ranges from a few hundred pounds for a template to several thousand for a custom, brand-led build. At russle, every project includes the brand groundwork as standard, not just the pages. Send us a line and we will scope it and come back with a straight quote.' },
      { question: 'Why do website prices vary so much?', answer: 'Most of the cost is the thinking before the build: positioning, structure, copy, and design. Custom brand work, e-commerce, and ongoing SEO push the price up; a simple template keeps it down.' },
      { question: 'Is a cheap website worth it?', answer: 'For testing an idea, yes. But a cheap site that no one finds or trusts costs you enquiries every month, which often makes it the most expensive option in the long run.' },
    ],
  },
  'brand-or-logo-what-you-need': {
    status: 'published',
    items: [
      { question: 'What is the difference between a brand and a logo?', answer: 'A logo is a single mark. A brand is the whole impression: colours, type, voice, photography, and how your site carries someone from a first glance to an enquiry. The logo sits inside the brand.' },
      { question: 'Do I need a full brand or just a logo?', answer: 'If you are testing an idea, a clean logo and a tidy template are often enough. Once you are competing on more than price, the full brand starts to matter.' },
      { question: 'When should I invest in branding?', answer: 'When your website, invoices, and social all look like different companies, you are leaking trust. That is usually the point to build the brand properly.' },
    ],
  },
  'local-seo-cheshire-south-manchester': {
    status: 'published',
    items: [
      { question: 'How do I get my business found in local search?', answer: 'Start with your Google Business Profile: claim it, fill in every field, pick the right categories, add photos, and keep your hours accurate. It does more local heavy lifting than your website.' },
      { question: 'Does my website need to mention my town?', answer: 'Yes. Name the towns you serve, in your own words, on pages that matter, rather than hiding it in the footer.' },
      { question: 'How important are reviews for local SEO?', answer: 'Very. Reviews are one of the strongest local signals and the easiest to influence. Ask happy customers at the right moment and reply to every review.' },
    ],
  },
  'squarespace-vs-custom-website': {
    status: 'published',
    items: [
      { question: 'Is Squarespace good for a small business?', answer: 'Yes, for a simple, quick, cheap presence it is hard to beat. The limits show up as you grow: fixed performance, a templated look, and no real custom features.' },
      { question: 'When is a custom website worth it over Squarespace?', answer: 'When you are competing on brand, planning to grow, or you need a feature the templates cannot do. Then a custom build saves you the rebuild later.' },
      { question: 'Can you move from Squarespace to a custom site later?', answer: 'Yes. Many businesses start on Squarespace and move to a custom build once they outgrow it. Your content comes with you; the platform does not.' },
    ],
  },
  'website-not-getting-enquiries': {
    status: 'published',
    items: [
      { question: 'Why is my website not getting enquiries?', answer: 'Usually because it is not clear what you do in the first five seconds, there is no obvious next step, the contact form asks for too much, the site is slow, or it does not build enough trust.' },
      { question: 'How do I get more enquiries from my website?', answer: 'Make the next step obvious on every page, shorten the contact form, fix the load speed, and add proof like reviews and real photography. Most of this does not require a rebuild.' },
      { question: 'Could the problem be that no one is visiting?', answer: 'Yes. Sometimes the site converts fine and the issue is visibility. If you are invisible in local search, the fix is being found, not the website itself.' },
    ],
  },
  'wix-vs-wordpress-vs-custom': {
    status: 'draft',
    items: [
      { question: 'Which is best: Wix, WordPress, or a custom website?', answer: 'Wix is easiest and cheapest, WordPress is flexible but needs upkeep, and a custom build is the most distinctive and fastest but costs more. The right one depends on how much you need the site to grow.' },
      { question: 'Is WordPress better than Wix?', answer: 'WordPress is more flexible and you own it, but it needs maintenance. Wix is simpler and hands-off but more limited. Neither is universally better; it depends on your needs.' },
      { question: 'When should I choose a custom website?', answer: 'When you are competing on brand, focused on growth, or you need something the builders cannot do. Otherwise a builder may serve you fine for now.' },
    ],
  },
  'what-is-a-brand-led-website': {
    status: 'draft',
    items: [
      { question: 'What is a brand-led website?', answer: 'One built from your brand outward rather than assembled from a template. The design, words, and structure all come from who you are and who you are for, so the site feels like one coherent thing.' },
      { question: 'Why does a brand-led website convert better?', answer: 'It is more memorable, builds trust faster through consistency, and is structured around what your customers need in order to decide, which is what turns a visit into an enquiry.' },
      { question: 'Is a brand-led website worth it for a small business?', answer: 'If you only need a simple presence, a template is fine. Once you are competing on more than price or want the site to bring in work, the brand-led approach starts to pay for itself.' },
    ],
  },
};

const payload = await getPayload({ config });

for (const [slug, entry] of Object.entries(FAQS)) {
  const found = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    draft: true,
    overrideAccess: true,
    limit: 1,
  });
  const doc = found.docs[0];
  if (!doc) { console.log('MISSING:', slug); continue; }
  // Content-only update: never flip a live post's publish state from here.
  await payload.update({
    collection: 'posts',
    id: doc.id,
    data: { faq: entry.items },
  });
  console.log('FAQ added:', slug);
}

console.log('FAQ seed complete.');
