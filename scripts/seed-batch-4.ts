/**
 * 30-day calendar, batch 2 (Jun 16-22). Seven posts staged as DRAFTS with
 * randomised 9-11am UK publish times, each with content + 3 FAQs.
 * Run: npx payload run scripts/seed-batch-4.ts   (with DATABASE_URL + PAYLOAD_SECRET)
 */
import { getPayload } from 'payload';
import config from '@payload-config';

/* eslint-disable @typescript-eslint/no-explicit-any */
const t = (text: string, bold = false): any => ({ type: 'text', text, version: 1, detail: 0, format: bold ? 1 : 0, mode: 'normal', style: '' });
const p = (...children: any[]): any => ({ type: 'paragraph', version: 1, format: '', indent: 0, direction: 'ltr', children });
const h = (tag: 'h2' | 'h3', text: string): any => ({ type: 'heading', tag, version: 1, format: '', indent: 0, direction: 'ltr', children: [t(text)] });
const ul = (...items: (string | any[])[]): any => ({ type: 'list', listType: 'bullet', tag: 'ul', start: 1, version: 1, format: '', indent: 0, direction: 'ltr', children: items.map((it, i) => ({ type: 'listitem', value: i + 1, version: 1, format: '', indent: 0, direction: 'ltr', children: Array.isArray(it) ? it : [t(it)] })) });
const doc = (...children: any[]): any => ({ root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children } });
const lead = (label: string, rest: string): any[] => [t(label, true), t(rest)];
/* eslint-enable @typescript-eslint/no-explicit-any */

// Random time in [08:00,10:00) UTC == [09:00,11:00) UK during BST.
function randTime(dateISO: string): string {
  const o = Math.floor(Math.random() * 120);
  return `${dateISO}T${String(8 + Math.floor(o / 60)).padStart(2, '0')}:${String(o % 60).padStart(2, '0')}:00.000Z`;
}

type Faq = { question: string; answer: string };
const payload = await getPayload({ config });

async function cat(slug: string, title: string, description: string) {
  const f = await payload.find({ collection: 'categories', where: { slug: { equals: slug } }, limit: 1 });
  const existing = f.docs[0];
  if (existing) {
    if (description && existing.description !== description) {
      await payload.update({ collection: 'categories', id: existing.id, data: { description } });
    }
    return existing;
  }
  return payload.create({ collection: 'categories', data: { title, slug, description } });
}
async function post(input: { slug: string; title: string; excerpt: string; date: string; category: number; tags: string[]; metaDescription: string; faq: Faq[]; content: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const data = { title: input.title, slug: input.slug, excerpt: input.excerpt, publishedAt: randTime(input.date), content: input.content, category: input.category, tags: input.tags, faq: input.faq, meta: { title: `${input.title} | russle`, description: input.metaDescription }, _status: 'draft' as const };
  const f = await payload.find({ collection: 'posts', where: { slug: { equals: input.slug } }, draft: true, overrideAccess: true, limit: 1 });
  if (f.docs[0]) {
    const { _status, ...contentData } = data; // eslint-disable-line @typescript-eslint/no-unused-vars
    await payload.update({ collection: 'posts', id: f.docs[0].id, data: contentData });
    console.log('Updated (content only):', input.slug);
  }
  else { await payload.create({ collection: 'posts', data }); console.log('Created:', input.slug); }
}

const guides = await cat('guides', 'Guides', 'Practical guides on brand, websites, and growth for ambitious businesses.');
const comparisons = await cat('comparisons', 'Comparisons', 'Honest comparisons to help you choose how to build.');
const local = await cat('local-notes', 'Local notes', 'Notes for businesses building an online presence across the UK.');

await post({
  slug: 'get-found-in-ai-search', title: 'How to get found in AI search (ChatGPT and Google AI Overviews)',
  excerpt: 'Search is shifting from blue links to AI answers. Here is how a small business gets mentioned by ChatGPT, Google AI Overviews, and the rest.',
  metaDescription: 'How to get your small business found in AI search: ChatGPT, Google AI Overviews, and Perplexity. Practical steps from russle, a UK web design and SEO studio.',
  date: '2026-06-16', category: guides.id, tags: ['ai search', 'seo', 'geo'],
  content: doc(
    p(t('To get found in AI search you need content that is clear, trustworthy, and easy for a machine to quote: plain answers to real questions, a named human author, structured data, and a consistent presence across the web. The same things that build trust with people build trust with AI.')),
    h('h2', 'What is changing'),
    p(t('More people are asking ChatGPT, Google AI Overviews, Gemini, and Perplexity instead of scrolling a list of links. These tools do not rank ten blue links; they pick a few sources, summarise them, and cite them. The goal is no longer just to rank, it is to be the source the answer is built from.')),
    h('h2', 'How to be the source AI picks'),
    ul(lead('Answer the question early.', ' Put a clear two or three sentence answer near the top of the page, before the detail. AI engines lift these.'), lead('Write for real questions.', ' Use headings phrased the way people actually ask, and answer each one plainly.'), lead('Show who is behind it.', ' A named author with real expertise carries more weight than a faceless brand.'), lead('Add structure.', ' Clean, valid structured data such as Article and FAQ helps machines understand and quote your content.'), lead('Be consistent everywhere.', ' The same name, details, and claims across your site, Google Business Profile, and listings make you easier to trust and cite.')),
    h('h2', 'What does not work'),
    p(t('Stuffing keywords, thin AI-spun articles, and contradicting yourself across the web. AI systems lean on trust signals, and those undo them.')),
    h('h2', 'Where we land'),
    p(t('We build this into every site and every post we publish, because being the answer is the next version of being found. If you want your site set up for AI search, send us a line and we will take a look.')),
  ),
  faq: [
    { question: 'How do I get my business mentioned by ChatGPT?', answer: 'Publish clear, trustworthy content that answers real questions early, with a named author and structured data, and keep your details consistent across the web. AI tools cite sources they can understand and trust.' },
    { question: 'Is SEO still worth it with AI search?', answer: 'Yes. The signals that help you rank, clear content, trust, and structure, are the same ones that get you cited in AI answers. Good SEO and AI visibility are now the same job.' },
    { question: 'What is GEO or AEO?', answer: 'Generative Engine Optimisation and Answer Engine Optimisation: optimising your content to be quoted inside AI-generated answers rather than only ranking in a list of links.' },
  ],
});

await post({
  slug: 'branding-cost-small-business', title: 'How much does branding cost for a small business?',
  excerpt: 'Branding costs anywhere from nothing to many thousands. Here is what changes the price, what you actually get, and where the value sits.',
  metaDescription: 'How much branding costs for a small business in 2026, what changes the price, and what you get for the money. An honest guide from russle, a UK web design and SEO studio.',
  date: '2026-06-17', category: guides.id, tags: ['branding cost', 'brand identity', 'pricing'],
  content: doc(
    p(t('Branding for a small business ranges from a cheap logo of a few pounds to a full brand identity of several thousand. What you pay for is not the logo, it is the strategy and system behind it. At russle, we can fold identity work into your website project when you need it. Send us a line and we will scope it and come back with a straight quote.')),
    h('h2', 'What you are paying for'),
    p(t('A logo is the cheap part. The cost of branding is the thinking: who you are for, why you are the obvious choice, and a system of colour, type, voice, and imagery that holds together everywhere. That groundwork is what makes a brand work, and what takes the time.')),
    h('h2', 'Typical ranges'),
    ul(lead('Logo only, online marketplace:', ' tens to low hundreds. Fast, but generic and easily copied.'), lead('Freelance logo and basic identity:', ' several hundred to low thousands.'), lead('Full brand identity from a studio:', ' low thousands upward, including strategy, a complete visual system, and guidelines.'), lead('Brand and website together:', ' from around two thousand, built as one.')),
    h('h2', 'Where the value sits'),
    p(t('A cheap logo that looks like everyone else does nothing for you. A brand that is clear and distinctive earns trust faster and lets you charge what you are worth. For a business competing on more than price, that pays for itself.')),
    h('h2', 'Where we land'),
    p(t('We build brand and website as one system, so the investment shows up where it counts, on the site that brings in work. If you are weighing it up, send us a line and we will give you an honest scope and price.')),
  ),
  faq: [
    { question: 'How much should a small business spend on branding?', answer: 'It depends on your stage. Testing an idea, a simple logo is fine. Competing seriously, a full identity from low thousands upward earns its keep by helping you stand out and charge more.' },
    { question: 'Why is professional branding expensive?', answer: 'Most of the cost is strategy and a complete visual system, not the logo. That groundwork is what makes the brand work everywhere and takes real time and skill.' },
    { question: 'What is included in a brand identity?', answer: 'Usually positioning, a logo and variations, a colour palette, typography, a voice, imagery direction, and guidelines so it stays consistent as you grow.' },
  ],
});

await post({
  slug: 'best-website-builders-small-business', title: 'Best website builders for small businesses in 2026',
  excerpt: 'An honest roundup of the main website builders for small businesses, what each is best at, and when a custom build beats all of them.',
  metaDescription: 'The best website builders for small businesses in 2026: Squarespace, Wix, Shopify, Webflow, and WordPress compared, plus when to go custom. From russle.',
  date: '2026-06-18', category: comparisons.id, tags: ['website builder', 'best of', 'comparison'],
  content: doc(
    p(t('For most small businesses, Squarespace is the best all-round builder, Shopify is best for selling, Webflow is best for design control, and Wix is best for absolute ease. If you want to stand out and grow without limits, a custom build beats all of them.')),
    h('h2', 'The main builders'),
    ul(lead('Squarespace:', ' the best all-rounder. Clean, design-led templates, easy to run. Great for a tidy, professional presence.'), lead('Wix:', ' the easiest to start. Drag-and-drop freedom and a big app market, more limited as you grow.'), lead('Shopify:', ' the best for selling. A dedicated commerce platform that handles payments, inventory, and checkout properly.'), lead('Webflow:', ' the most design control without code, with cleaner output. A steeper learning curve, closer to custom.'), lead('WordPress:', ' the most flexible and you own it, but it needs maintenance and care to stay fast.')),
    h('h2', 'When to skip the builders'),
    p(t('Every builder has a ceiling: a templated look, fixed performance, and features you cannot add. If you are competing on brand or building for the long term, a custom site has none of those limits.')),
    h('h2', 'Where we land'),
    p(t('We build custom because that is where the results are for ambitious businesses, and we will happily point you to the right builder when that is the smarter call. Tell us about your business and we will give you a straight steer.')),
  ),
  faq: [
    { question: 'What is the best website builder for a small business?', answer: 'Squarespace is the best all-rounder for a tidy, professional site. Shopify is best for selling, Webflow for design control, Wix for ease, and WordPress for flexibility. A custom build beats them all if you want no limits.' },
    { question: 'Are website builders good for SEO?', answer: 'They can be. Most modern builders produce SEO-capable sites, but you have less control over speed and structure than a custom build, which can matter as you grow.' },
    { question: 'Should I use a builder or hire a designer?', answer: 'A builder suits a simple site on a budget. Hire a designer or studio when you want to stand out, convert better, or need something a template cannot do.' },
  ],
});

await post({
  slug: 'framer-vs-webflow-vs-custom', title: 'Framer vs Webflow vs a custom website',
  excerpt: 'Framer and Webflow are the two leading design-led website tools. Here is how they compare with each other and with a custom build.',
  metaDescription: 'Framer vs Webflow vs a custom website: design control, speed, SEO, and cost compared for a small business. From russle, a UK web design and SEO studio.',
  date: '2026-06-19', category: comparisons.id, tags: ['framer', 'webflow', 'custom website'],
  content: doc(
    p(t('Framer is the fastest way to design and ship a good-looking site, Webflow gives more structure and control for content-heavy sites, and a custom build gives you everything with no platform ceiling. The right one depends on complexity and how far you are growing.')),
    h('h2', 'Framer'),
    ul('Very fast to design and launch, with a modern feel.', 'Excellent for marketing sites and landing pages.', 'Hosting included, less to maintain.', 'Less suited to large, complex, content-heavy sites, and you are inside Framer’s platform.'),
    h('h2', 'Webflow'),
    ul('More structure for bigger sites, with a real content system.', 'Strong design control and clean output.', 'A steeper learning curve than Framer.', 'Higher monthly fees, and still a platform.'),
    h('h2', 'A custom build'),
    ul('Anything you can imagine, built properly.', 'Performance and SEO fully in your control.', 'Full ownership, no platform fees or ceiling.', 'Costs more and needs a developer.'),
    h('h2', 'How to choose'),
    ul(lead('A fast, good-looking marketing site:', ' Framer.'), lead('A larger, content-heavy site with more structure:', ' Webflow.'), lead('A distinctive, growth-ready site with no limits:', ' a custom build.')),
    h('h2', 'Where we land'),
    p(t('We build custom because it gives the design freedom of these tools with full ownership and no ceiling. But both are excellent, and we will tell you honestly when one fits your situation better.')),
  ),
  faq: [
    { question: 'Is Framer better than Webflow?', answer: 'For fast, design-led marketing sites, Framer is quicker and simpler. For larger, content-heavy sites with more structure, Webflow has the edge. Neither is universally better.' },
    { question: 'Is Framer good for SEO?', answer: 'Yes, Framer produces fast, clean sites that handle the SEO basics well. For full control over performance and structure, a custom build goes further.' },
    { question: 'When should I choose custom over Framer or Webflow?', answer: 'When you need features the tools cannot do, full ownership, or no platform ceiling as you grow. For simpler marketing sites, either tool may serve you well.' },
  ],
});

await post({
  slug: 'why-website-speed-matters', title: 'Why website speed matters (and how to tell if yours is too slow)',
  excerpt: 'A slow website loses customers and rankings before anyone reads a word. Here is why speed matters and how to check yours in minutes.',
  metaDescription: 'Why website speed matters for SEO and conversions, and how to check if your site is too slow. A plain-English guide from russle, a UK web design and SEO studio.',
  date: '2026-06-20', category: guides.id, tags: ['website speed', 'core web vitals', 'performance'],
  content: doc(
    p(t('Website speed matters because slow sites lose visitors and rank lower. People leave pages that take more than a few seconds to load, and Google uses speed as a ranking factor. You can check yours for free in a couple of minutes.')),
    h('h2', 'Why speed costs you'),
    ul(lead('Lost visitors.', ' Many people leave if a page takes more than about three seconds on a phone. They are gone before they see anything.'), lead('Lower rankings.', ' Google measures speed through Core Web Vitals and favours faster pages, especially on mobile.'), lead('Fewer enquiries.', ' Every extra second of load time tends to lower the share of visitors who take action.')),
    h('h2', 'How to check yours'),
    ul('Run your homepage through Google PageSpeed Insights, free. It scores speed on mobile and desktop and lists what is slowing you down.', 'Test on a real phone on mobile data, not just your office wifi.', 'Watch the largest image and the first thing that loads: heavy images and bloated builders are the usual culprits.'),
    h('h2', 'Common causes of a slow site'),
    ul('Huge, unoptimised images.', 'A page builder or theme stacked with plugins.', 'Cheap or distant hosting.', 'Too much code loading before anything appears.'),
    h('h2', 'Where we land'),
    p(t('We build sites to be fast by default, because speed quietly affects both rankings and enquiries. If yours feels sluggish, send us the link and we will tell you what is dragging it down.')),
  ),
  faq: [
    { question: 'How fast should my website load?', answer: 'Aim for the main content to appear within about two to three seconds on a phone. Beyond that, you start losing visitors and rankings.' },
    { question: 'How do I check my website speed?', answer: 'Run it through Google PageSpeed Insights for free. It scores mobile and desktop speed and lists exactly what is slowing the page down.' },
    { question: 'Does website speed affect SEO?', answer: 'Yes. Google uses speed, measured through Core Web Vitals, as a ranking factor, particularly on mobile. Faster sites tend to rank and convert better.' },
  ],
});

await post({
  slug: 'canva-website-vs-real-website', title: 'Canva websites vs a real website build',
  excerpt: 'Canva can throw up a website in minutes. Here is honestly where that helps, where it falls short, and when you need a real build.',
  metaDescription: 'Canva websites vs a real website build: what Canva is good for, where it falls short, and when a small business needs a proper site. From russle.',
  date: '2026-06-21', category: comparisons.id, tags: ['canva', 'website builder', 'comparison'],
  content: doc(
    p(t('Canva is great for quickly putting a simple page online, especially if you already design in it. For a business that needs to be found, look distinctive, and convert, it falls short, and a real website build is the better investment.')),
    h('h2', 'What Canva websites are good for'),
    ul('Putting a simple, one-page site online fast.', 'Free or very cheap to start.', 'Easy if you already use Canva for graphics.', 'Fine for a link page, an event, or a quick placeholder.'),
    h('h2', 'Where they fall short'),
    ul('Very limited structure, so they do not suit a real multi-page business site.', 'Weaker SEO control, which makes it harder to be found.', 'A templated look that is hard to make truly yours.', 'You are tied to Canva’s system, with little room to grow.'),
    h('h2', 'When you need a real build'),
    p(t('The moment your website is meant to bring in customers rather than just exist, you have outgrown a Canva page. A real build gives you a brand-led design, proper SEO, the structure to grow, and full ownership.')),
    h('h2', 'Where we land'),
    p(t('We build real, brand-led websites because that is what brings in work. If a Canva page is doing for now, that is genuinely fine, and when you outgrow it, send us a line.')),
  ),
  faq: [
    { question: 'Is a Canva website good enough for a business?', answer: 'For a quick placeholder, link page, or event, yes. For a business that needs to be found and convert customers, it is too limited, and a real website build is worth it.' },
    { question: 'Can you do SEO on a Canva website?', answer: 'Only at a basic level. Canva gives you far less control over speed, structure, and metadata than a real build, which makes ranking harder.' },
    { question: 'When should I move off Canva?', answer: 'When the website needs to bring in customers rather than just exist. That is the point a brand-led, properly built site starts to pay for itself.' },
  ],
});

await post({
  slug: 'how-to-get-more-google-reviews', title: 'How to get more Google reviews (and why they matter)',
  excerpt: 'Google reviews are one of the strongest, cheapest ways to win local customers. Here is how to get more of them, the right way.',
  metaDescription: 'How to get more Google reviews for your business, why they matter for local SEO and trust, and how to ask without breaking the rules. From russle.',
  date: '2026-06-22', category: local.id, tags: ['google reviews', 'local seo', 'reputation'],
  content: doc(
    p(t('The best way to get more Google reviews is to ask happy customers at the right moment, make it a one-tap link, and reply to every review you get. Reviews build trust and are one of the strongest local search signals, so they are worth the effort.')),
    h('h2', 'Why reviews matter so much'),
    ul(lead('Trust.', ' Most people read reviews before choosing a local business. Strong, recent reviews win the click.'), lead('Local ranking.', ' The number, quality, and freshness of your reviews influence where you appear in local search and the map results.'), lead('Free and compounding.', ' Unlike paid advertising, reviews keep working, and they build over time.')),
    h('h2', 'How to get more, the right way'),
    ul(lead('Ask at the right moment.', ' Just after a good experience, when the customer is happiest.'), lead('Make it one tap.', ' Share your Google review link directly, so there is no hunting for where to leave it.'), lead('Ask in person and follow up.', ' A quick personal ask, backed by a text or email with the link, works best.'), lead('Reply to every review.', ' Thank the good ones and respond calmly to the rest. It shows you care and signals an active business.')),
    h('h2', 'What not to do'),
    p(t('Do not buy reviews, offer rewards for them, or only ask the customers you know will be positive. Google can penalise incentivised or fake reviews, and they erode the trust that makes reviews valuable.')),
    h('h2', 'Where we land'),
    p(t('Getting found locally is part of what we do for clients, and reviews are one of the simplest levers. If you want a hand setting up an easy review flow, send us a line.')),
  ),
  faq: [
    { question: 'How do I get more Google reviews?', answer: 'Ask happy customers right after a good experience, give them a one-tap review link, and reply to every review. A simple, well-timed ask is the most effective method.' },
    { question: 'Can I offer a discount for a Google review?', answer: 'No. Incentivised reviews break Google’s rules and can be removed or penalised. Ask for honest feedback instead, without a reward attached.' },
    { question: 'Do Google reviews help SEO?', answer: 'Yes. The number, quality, and freshness of your reviews are among the strongest local search signals, influencing where you appear in the map and local results.' },
  ],
});

console.log('Batch 2 (Jun 16-22) complete.');
