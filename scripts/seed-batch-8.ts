/**
 * Batch 8 (Sep 4-16, 2026). Six posts staged as DRAFTS with randomised 9-11am
 * UK publish times, each with content + 3 FAQs. Restarts the calendar after the
 * queue emptied on Jul 14.
 *
 * Topic selection is grounded in DataForSEO metrics pulled 2026-09-03 (UK):
 *   seo cheshire 170/mo KD 0 · local seo uk 50/mo KD 10
 *   how much does an ecommerce website cost uk 50/mo KD 0
 *   website redesign cost 70/mo KD 0
 * Deliberately NOT targeted: "web design cheshire" (KD 19) and the general
 * website-cost cluster, both already owned by /web-design-cheshire and the
 * small-business-website-cost-2026 post. Writing them again would split them.
 *
 * The three story posts are problem-led rather than portfolio retellings, so
 * they stand on their own and do not duplicate the /work case studies.
 *
 * House rules: no em dashes, no overclaims, no emoji, studio voice is "we",
 * British English, and no price figures anywhere (matches every existing post,
 * cost posts included).
 *
 * Run: npx payload run scripts/seed-batch-8.ts  (with DATABASE_URL + PAYLOAD_SECRET)
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

function randTime(dateISO: string): string {
  const o = Math.floor(Math.random() * 120);
  return `${dateISO}T${String(8 + Math.floor(o / 60)).padStart(2, '0')}:${String(o % 60).padStart(2, '0')}:00.000Z`;
}

type Faq = { question: string; answer: string };
const payload = await getPayload({ config });

async function cat(slug: string, title: string, description: string) {
  const f = await payload.find({ collection: 'categories', where: { slug: { equals: slug } }, limit: 1 });
  const existing = f.docs[0];
  if (existing) return existing;
  return payload.create({ collection: 'categories', data: { title, slug, description } });
}

async function post(input: {
  slug: string; title: string; excerpt: string; date: string; category: number;
  tags: string[]; metaTitle?: string; metaDescription: string; faq: Faq[];
  content: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  // Keep the search-result title inside 60 characters. Earlier batches always
  // appended the brand, which is what pushed two posts over.
  const metaTitle = input.metaTitle ?? `${input.title} | russle`;
  if (metaTitle.length > 60) throw new Error(`meta title too long (${metaTitle.length}): ${metaTitle}`);
  if (input.metaDescription.length > 160) throw new Error(`meta description too long (${input.metaDescription.length}): ${input.slug}`);

  const data = {
    title: input.title, slug: input.slug, excerpt: input.excerpt,
    publishedAt: randTime(input.date), content: input.content,
    category: input.category, tags: input.tags, faq: input.faq,
    meta: { title: metaTitle, description: input.metaDescription },
    _status: 'draft' as const,
  };
  const f = await payload.find({ collection: 'posts', where: { slug: { equals: input.slug } }, draft: true, overrideAccess: true, limit: 1 });
  if (f.docs[0]) {
    const { _status, ...contentData } = data; // eslint-disable-line @typescript-eslint/no-unused-vars
    await payload.update({ collection: 'posts', id: f.docs[0].id, data: contentData });
    console.log('Updated:', input.slug);
  } else {
    await payload.create({ collection: 'posts', data });
    console.log('Created:', input.slug, '->', input.date);
  }
}

const guides = await cat('guides', 'Guides', 'Practical guides on brand, websites, and growth for ambitious businesses.');
const local = await cat('local-notes', 'Local notes', 'Notes on getting found locally, from a studio in Alderley Edge.');

/* ─────────────────────────────── 1 ─────────────────────────────── */
await post({
  slug: 'seo-in-cheshire',
  title: 'SEO in Cheshire: how local businesses get found',
  excerpt:
    'Local search comes down to relevance, distance and prominence. Here is what each one means for a business in Wilmslow, Knutsford or Macclesfield, and which to fix first.',
  metaTitle: 'SEO in Cheshire: how local businesses get found',
  metaDescription:
    'How local search works for Cheshire businesses: relevance, distance and prominence, your Google Business Profile, reviews, and what to fix first.',
  date: '2026-09-04', category: local.id, tags: ['seo', 'local', 'cheshire'],
  faq: [
    { question: 'How long does local SEO take to work?', answer: 'For a town-level search, a few weeks to a few months once the profile and the site are right. County-wide terms take longer because you are competing with agencies that have years of links behind them. Anyone promising a fixed timescale is guessing.' },
    { question: 'Do I need a shop address to rank locally?', answer: 'No. Service-area businesses rank in local results without a public address, but Google then works out roughly where you are from the areas you serve, so keep those tight and honest.' },
    { question: 'How many reviews do I need?', answer: 'There is no threshold. What matters is that they keep arriving, that they are genuine, and that they mention the town and the job. A steady trickle beats a burst of ten and then silence.' },
  ],
  content: doc(
    p(t('Local search in Cheshire is decided by three things: how relevant you are to what was typed, how close you are to the person typing it, and how well known you are online. Google calls them relevance, distance and prominence. Almost everything worth doing sits under one of those three, and most businesses can move two of them within a month.')),
    h('h2', 'Relevance: say plainly what you do'),
    p(t('Relevance is the easiest to fix and the most often fudged. If you fit kitchens, the words on your site and the categories on your profile should say kitchen fitting, not "bespoke interior solutions". Google reads the plain version. So do customers.')),
    p(t('The same goes for the places you serve. A page that mentions the town, the surrounding villages and the postcodes you actually cover gives Google something to match. A page that says "we serve the North West" gives it nothing.')),
    h('h2', 'Prominence: reviews and mentions'),
    p(t('Prominence is the closest thing to a reputation score. Reviews are the visible part, and in a small town they carry real weight, because a business with steady recent reviews looks alive and one with four reviews from 2023 does not.')),
    p(t('Ask every happy customer, and ask soon after the job while they still remember the detail. The strongest reviews mention three things without being told to: the town, the work, and the outcome. You cannot script that, and you should not try.')),
    p(t('The less visible part is being mentioned elsewhere: local directories, a chamber listing, a supplier page, the local paper. Consistency matters more than volume. The same business name, the same phone number, the same spelling everywhere.')),
    h('h2', 'Distance: the one you cannot argue with'),
    p(t('Distance is the signal nobody can optimise away. Google measures from where the searcher is to where it thinks you are, and it will show the closer business more often, all else being equal.')),
    p(t('If you have no public address, Google places you at the middle of the areas you say you serve. That has a consequence most service-area businesses never notice: adding a very broad area drags your centre point away from where you actually work. A studio in Alderley Edge that also lists Chester and Manchester ends up anchored in the middle of the county, which is nowhere useful. Keeping the list to the towns you genuinely serve pulls it back.')),
    h('h2', 'Your Business Profile is the biggest lever'),
    p(t('The profile is doing more work than the website in local results, and it takes an afternoon rather than a project.')),
    ul(
      'Primary category set to the thing you most want to be found for, with secondary categories after it',
      'Service areas limited to the towns you would genuinely travel to',
      'Real photos of real work, added regularly rather than fifteen on day one',
      'Hours that are true, including "by appointment" if that is how you work',
      'A post every week or two, so the profile looks tended rather than abandoned',
    ),
    h('h2', 'What the website still has to do'),
    p(t('The profile gets you into the running. The site is what Google checks to confirm the claim, and what a customer reads before they call.')),
    p(t('That means a page for each area you seriously want work from, with genuinely different content on each one. Not the same page with the town swapped, which is the oldest trick in local SEO and one Google has been catching for a decade. If you cannot say something specific about working in a town, do not make a page for it.')),
    h('h2', 'What to fix first'),
    ul(
      'Claim and complete the Google Business Profile, categories and service areas included',
      'Ask your last ten customers for a review, individually and by name',
      'Make sure the town and the service appear in plain words on your site',
      'Check your business details match everywhere they appear online',
      'Only then start building pages for the towns that matter most',
    ),
    p(...lead('The short version. ', 'Get the profile right, keep the reviews coming, be specific about where you work, and be patient with the county-wide terms. The town-level searches are the ones that turn into work anyway.')),
  ),
});

/* ─────────────────────────────── 2 ─────────────────────────────── */
await post({
  slug: 'what-does-an-online-store-cost',
  title: 'What does an online store cost to build?',
  excerpt:
    'The honest answer is that it depends on what you sell and how much of the work is yours. Here is what actually moves the number, and what it costs to run once it is live.',
  metaDescription:
    'What drives the cost of building an online store in the UK: platform, product range, photography, integrations and migration, plus what it costs to run.',
  date: '2026-09-07', category: guides.id, tags: ['ecommerce', 'cost'],
  faq: [
    { question: 'Is Shopify cheaper than a custom build?', answer: 'To start, almost always. Over several years the gap narrows, because app subscriptions and transaction fees keep running while a build is paid once. Which works out cheaper depends on your volume and how unusual your requirements are.' },
    { question: 'What is the most underestimated cost?', answer: 'Product content. Photography, descriptions, sizes, variants and stock data for a few hundred products take longer than the build itself, and no developer can do it for you without your input.' },
    { question: 'Can I start small and add to it?', answer: 'Yes, and usually you should. Launch with the range you can photograph properly and the payment methods your customers use, then add subscriptions, bundles or wholesale once real orders tell you what is worth building.' },
  ],
  content: doc(
    p(t('An online store can cost anything from a weekend of your own time to a project that runs for months. The range is that wide because the phrase covers everything from twelve products on a template to a storefront with wholesale pricing, subscriptions and stock synced to a till. What follows is what actually moves the number.')),
    h('h2', 'What you are paying for'),
    p(t('Roughly, a store build is four things: the design, the storefront itself, the product data, and everything that has to talk to something else. Most quotes differ because they include different amounts of the last two.')),
    h('h2', 'The platform decision moves it most'),
    p(t('A hosted platform gets you selling quickly and charges you monthly, plus a slice of each sale on some plans. A custom storefront costs more up front and less per order, and it lets the shop work exactly the way your business does rather than the way the platform assumes.')),
    p(t('Neither is the right answer in general. A shop with a simple range and standard checkout rarely needs a custom build. A business with unusual ordering, made-to-order items, or a catalogue that changes daily often finds the template fighting it within a year.')),
    h('h2', 'The costs that surprise people'),
    ul(
      'Product photography, which is usually the single biggest line outside the build',
      'Writing product descriptions, which nobody enjoys and everybody underestimates',
      'Migrating existing orders, customers and URLs from an old shop without losing search rankings',
      'Integrations: accounting, stock, shipping labels, an EPOS till, a subscription tool',
      'Anything involving variants, because complexity grows faster than the product count suggests',
    ),
    h('h2', 'What it costs to run'),
    p(t('The build is the smaller number over five years. Hosting, the platform subscription, payment fees, apps, and someone keeping it current all continue. Payment processing alone is a real percentage of revenue, and it is worth knowing yours before you compare platforms.')),
    p(t('The other running cost is attention. A store that nobody updates stops earning. Whoever owns it needs an hour a week for stock, content and the small fixes that accumulate, or somebody doing it for them.')),
    h('h2', 'How to get a number you can trust'),
    p(t('Ask for a quote against a written scope: how many products, which payment methods, which integrations, who writes the content, who takes the photographs, and what happens after launch. A quote without those is a guess, and it will be revised once the work starts.')),
    p(t('It is also worth asking what happens when you want to change something in a year, because that answer tells you more about the real cost than the build price does.')),
    p(...lead('The short version. ', 'Platform choice, product data and integrations decide the cost, in that order. Scope those three honestly and the quotes you get back will be comparable.')),
  ),
});

/* ─────────────────────────────── 3 ─────────────────────────────── */
await post({
  slug: 'when-is-a-website-redesign-worth-it',
  title: 'When is a website redesign worth the cost?',
  excerpt:
    'A redesign is worth it when the site is losing you work, not when you are bored of it. Here is how to tell the difference, and when the problem is not the website at all.',
  metaDescription:
    'How to tell whether a website redesign is worth the cost: the signs it is time, the signs the problem is elsewhere, and the difference from a rebuild.',
  date: '2026-09-09', category: guides.id, tags: ['web design', 'cost'],
  faq: [
    { question: 'How often should a website be redesigned?', answer: 'There is no schedule. A well-built site that is kept current can run for five years or more. One built on a platform that has been abandoned may need replacing after two, whatever it looks like.' },
    { question: 'What is the difference between a redesign and a rebuild?', answer: 'A redesign changes how the site looks and reads on top of what is already there. A rebuild replaces what is underneath. If the foundations are slow, insecure or impossible to edit, a redesign paints over the problem.' },
    { question: 'Will a redesign hurt my Google rankings?', answer: 'It can, if URLs change without redirects or content is cut. Done properly, with the structure planned and old addresses pointed at new ones, rankings usually hold and often improve because the new site is faster.' },
  ],
  content: doc(
    p(t('A redesign is worth the money when the current site is costing you work. It is not worth it because you have grown tired of looking at it, which is the most common reason people ask and the worst reason to spend.')),
    h('h2', 'The signs it is genuinely time'),
    ul(
      'People arrive and leave without doing anything, and they have been doing that for months',
      'You cannot update it yourself, so it has quietly gone out of date',
      'It is slow on a phone, which is where most of your visitors are',
      'It no longer matches what you sell, because the business moved and the site did not',
      'You avoid sending people to it, which is the clearest signal of the lot',
    ),
    p(t('That last one deserves its own line. If you find yourself sending prospects to your Instagram instead of your website, the site has already failed and you knew before anyone told you.')),
    h('h2', 'The signs the problem is somewhere else'),
    p(t('Plenty of sites get replaced when they were not the bottleneck. If nobody is visiting at all, a redesign changes nothing, because a better looking page still needs someone to find it. That is a search and marketing problem, and rebuilding is an expensive way to avoid it.')),
    p(t('Equally, if enquiries arrive and go unanswered for three days, no amount of design will fix the conversion rate. Fix the follow-up first, then look at the site.')),
    h('h2', 'Redesign or rebuild'),
    p(t('A redesign changes the surface. A rebuild replaces what sits under it. The question that separates them is whether the foundations are sound: is it fast, is it secure, can it be edited, will it still be supported in three years.')),
    p(t('If the answer to those is yes, a redesign is good value and quick. If the answer is no, redesigning is decorating a house with damp.')),
    h('h2', 'What it should pay back'),
    p(t('Before agreeing to anything, write down what you expect to change: more enquiries, better quality enquiries, fewer questions answered by phone, orders taken without a conversation. Then make sure the site is set up to measure those, so in six months you can tell whether it worked instead of guessing.')),
    p(t('A redesign with no measurement is a matter of taste, and taste is a poor basis for a business decision.')),
    p(...lead('The short version. ', 'Redesign when the site is losing you work and the foundations are sound. Rebuild when they are not. If nobody is visiting, spend the money on being found instead.')),
  ),
});

/* ─────────────────────────────── 4 ─────────────────────────────── */
await post({
  slug: 'instagram-dms-are-costing-you-orders',
  title: 'Selling through Instagram DMs is costing you orders',
  excerpt:
    'Taking orders in the messages works until the week you are busy. Here is what the DM actually costs a small food business, and what replaces it without losing the personal bit.',
  metaTitle: 'Instagram DMs are costing you orders | russle',
  metaDescription:
    'Why taking orders through Instagram DMs quietly loses a small business work, what it costs, and what to replace it with without losing the personal touch.',
  date: '2026-09-11', category: guides.id, tags: ['ecommerce', 'food and drink'],
  faq: [
    { question: 'Will I lose the personal touch if orders come through a form?', answer: 'Not if the form asks the questions you would have asked anyway. Most customers prefer it, because they can order at eleven at night without feeling they are bothering you.' },
    { question: 'What about customers who only use Instagram?', answer: 'They still message you, and that is fine. The point is that the people who want to order at midnight without a conversation now can, and they are the orders you were quietly losing.' },
    { question: 'Do I need to take payment online?', answer: 'A deposit is usually enough for made-to-order work. It filters out the enquiries that were never going to happen and protects you against a cancellation the day before.' },
  ],
  content: doc(
    p(t('Taking orders through Instagram messages works perfectly until the first genuinely busy week. Then a message gets buried, someone waits two days for a price, and an order you never knew about goes to whoever answered first. The system does not fail loudly. It just leaks.')),
    h('h2', 'What the DM actually costs'),
    p(t('The obvious cost is your evening. The less obvious one is the same six questions, typed out again: what sizes, how much, how far ahead do I need to book, do you deliver, can you do gluten free, is that date free. Every one of those has a fixed answer that a page could give at three in the morning.')),
    p(t('Then there is the quoting. A message that says "how much for a birthday cake" cannot be answered, so you ask about servings, flavours, the date and the design, and you go back and forth four times before you can give a number. Multiply that by a busy month.')),
    h('h2', 'The orders you never see'),
    p(t('This is the part that does not show up anywhere. Some people will not send a message at all. They want to know the price, check the date is free, and pay, without a conversation with a stranger. If your only route is a DM, those customers quietly buy from someone else, and you never learn they existed.')),
    p(t('Nothing in your inbox tells you this is happening, which is exactly why it goes on for years.')),
    h('h2', 'What replaces it'),
    p(t('Not a shopping cart bolted onto a bakery. What works for made-to-order businesses is a structured enquiry: the form asks what you need in order to quote, so the first reply can be a real answer rather than a question.')),
    ul(
      'Occasion, date and number of servings, so you can check the diary immediately',
      'Flavours and dietary requirements, chosen from what you actually offer',
      'A budget range, which saves both sides an awkward conversation',
      'Photos of what they have in mind, uploaded rather than described',
      'A deposit once you have agreed, so the date is genuinely held',
    ),
    h('h2', 'What that looked like for Beth'),
    p(t('Beth Bakes Cakes was running the whole operation through Instagram messages. We built a storefront with a cake builder for the bespoke work and straightforward ordering for everything else, with the enquiry arriving complete and a deposit taken at the point of agreement.')),
    p(t('The change that mattered was not the ordering. It was that customers could order at midnight, and the questions stopped arriving one at a time.')),
    p(...lead('The short version. ', 'The DM is not free. It costs your evenings, your quoting time, and the orders from people who will not message a stranger. A structured enquiry keeps the personal part and stops the leak.')),
  ),
});

/* ─────────────────────────────── 5 ─────────────────────────────── */
await post({
  slug: 'when-instagram-is-your-only-shopfront',
  title: 'When Instagram is your only shopfront',
  excerpt:
    'A busy Instagram feels like a business asset until you try to do something with it. Here is what you cannot do on rented ground, and when it starts to matter.',
  metaDescription:
    'Why relying on Instagram as your only shopfront limits a growing brand, what you cannot do on rented ground, and when a website starts to matter.',
  date: '2026-09-14', category: guides.id, tags: ['brand', 'ecommerce'],
  faq: [
    { question: 'We get all our customers from Instagram. Why change?', answer: 'You do not have to stop. The site catches the people searching right now who have never heard of you, and it keeps working when the algorithm changes what it shows your followers.' },
    { question: 'Is a website worth it for one location?', answer: 'Usually yes, because search is where people look for opening hours, menus and directions. It matters more the moment you open a second place, because then people need to choose between them.' },
    { question: 'What should the site do that Instagram cannot?', answer: 'Be found in search, take orders or bookings without a conversation, hold a customer list you own, and say the same thing to everyone without depending on what a feed decides to show.' },
  ],
  content: doc(
    p(t('A strong Instagram feels like an asset, and in most ways it is. It is also rented ground. You do not own the audience, you cannot export it, and the reach you had last year is not the reach you have this year. That does not matter at all until it does.')),
    h('h2', 'You are renting the relationship'),
    p(t('The follower count is not a customer list. You cannot email those people, you cannot see who they are, and whether they see your post is decided by a system that changes without notice. Businesses discover this the week a post that used to reach thousands reaches a few hundred.')),
    h('h2', 'Search does not look there'),
    p(t('When someone new wants what you sell, they do not scroll a feed. They search for it, on Google or increasingly by asking an assistant. If everything you have is inside an app, you are absent from the moment a stranger is actively looking to buy, which is the most valuable moment there is.')),
    h('h2', 'The things you cannot do'),
    ul(
      'Take an order at two in the morning without a conversation',
      'Show a full range properly, rather than whatever the grid surfaces',
      'Send a message to your customers that does not depend on an algorithm',
      'Tell people which of your locations is nearest and what is on there',
      'Prove to a supplier, a landlord or a lender that the business is real',
    ),
    h('h2', 'When it starts to matter'),
    p(t('Usually at the second location. One shop and a busy feed can coexist happily. The moment there are two, customers need to know which is which, what is on at each, and how to get there, and a grid of photographs cannot answer that.')),
    p(t('It matters again when you start selling beyond the people who already follow you: wholesale, events, delivery, anything where somebody needs to look you up rather than stumble across you.')),
    h('h2', 'How it went for Berry Boys'),
    p(t('Berry Boys built a genuine following in Manchester before they had a website at all. When the second store opened, we built a site that could carry both, with room in the structure for the next one, so opening a location does not mean rebuilding anything.')),
    p(t('The brand did not change. What changed is that it now exists somewhere they own, and somewhere Google can read.')),
    p(...lead('The short version. ', 'Keep the Instagram. Just stop letting it be the only place your business exists, because search, second locations and customer lists all need ground you own.')),
  ),
});

/* ─────────────────────────────── 6 ─────────────────────────────── */
await post({
  slug: 'you-do-not-need-a-big-range-to-sell-online',
  title: 'You do not need a big range to sell online',
  excerpt:
    'One product, made well, is enough to build a shop around. Here is why a small range is an advantage online, and what a one-product store actually needs.',
  metaDescription:
    'Why a single product is enough to sell online, what a one-product store actually needs, and how a small range makes the whole thing easier to run.',
  date: '2026-09-16', category: guides.id, tags: ['ecommerce', 'food and drink'],
  faq: [
    { question: 'Will a one-product shop look empty?', answer: 'Not if it is designed as one page rather than a catalogue with a single item in it. The story, the making and the reviews fill the space that a product grid would, and they sell better.' },
    { question: 'Do I need a subscription option?', answer: 'Only for something people finish and rebuy. For consumables it is worth adding once you know people are reordering by hand, because that is proof the demand exists.' },
    { question: 'What if I want to add products later?', answer: 'Build it so the shop can grow, then do not fill it prematurely. Adding a second product to a working shop is straightforward. Launching with eight products you cannot photograph properly is not.' },
  ],
  content: doc(
    p(t('People put off selling online because they think a shop needs a catalogue. It does not. One product, made well and explained properly, is enough, and in several ways it is easier to sell than thirty.')),
    h('h2', 'A small range is an advantage'),
    p(t('A visitor to a big catalogue has to choose, and choosing is work. A visitor to a one-product page only has to decide whether they want it. That is a much simpler question, and it converts better.')),
    p(t('It is also far less work behind the scenes. One set of photographs, one description, one price, one stock number. The reason most small shops go stale is that keeping forty products current is a job nobody has time for.')),
    h('h2', 'What a one-product shop actually needs'),
    ul(
      'Photographs that show the thing honestly, including the scale of it',
      'The story of why it exists, which is doing most of the selling',
      'What is in it, what it costs to post, and when it arrives',
      'A checkout that takes seconds and does not demand an account',
      'Somewhere for reviews to accumulate, because the first ones matter most',
    ),
    h('h2', 'Sell the making, not the product'),
    p(t('With a single product, the specification is thin and the story is not. Who makes it, where, why it started, what is different about how it is done. That is what people read before they buy something from a business they have not heard of, and it is the part a big catalogue never has room for.')),
    h('h2', 'How that worked for Mum\u2019s Granola'),
    p(t('Mum’s Granola started at a kitchen table, supplying a single cafe, with no shop of her own. We built a one-page storefront that runs from the story to the checkout in a single scroll, with everything editable by the owner so nothing waits on us.')),
    p(t('The range has not needed to grow for the shop to work. That was rather the point.')),
    h('h2', 'When to add more'),
    p(t('Add a product when customers ask for it, not when the page looks sparse. Real demand is the only signal worth acting on, and one product selling steadily is a far better position than six that nobody has tried.')),
    p(...lead('The short version. ', 'One good product is a shop. Photograph it properly, tell the story behind it, keep the checkout short, and add to the range only when someone asks.')),
  ),
});

console.log('\nBatch 8 staged. Six drafts queued for Sep 4-16; the publish cron picks each up on its date.');
