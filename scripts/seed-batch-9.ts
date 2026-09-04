/**
 * Batch 9 (Sep 8-21, 2026). Six posts staged as DRAFTS, slotted into the gaps
 * left by batch 8 so the calendar covers every weekday rather than alternate
 * days. Combined with batch 8 the queue runs Mon 7 to Mon 21 without a gap.
 *
 * Topic selection grounded in DataForSEO metrics pulled 2026-09-04 (UK):
 *   website maintenance uk 210/mo KD 0      <- best available opening
 *   product photography for ecommerce 140/mo KD 0, commercial intent
 *   small business seo tips 140/mo KD 18
 *   local seo checklist 110/mo KD 29
 *   website not showing on google 30/mo KD 11
 * Checked and rejected: "how to rank higher on google maps" (40/mo, KD 20)
 * duplicates the existing google-map-pack post, and "structured data seo"
 * (90/mo) sits at KD 53 with no supporting authority behind it yet.
 *
 * The service-area post has almost no search volume (10/mo) and is in anyway:
 * it is the one thing here nobody else writes, we learned it first-hand on our
 * own profile, and it supports the locality pages.
 *
 * House rules: no em dashes, no overclaims, no emoji, studio voice is "we",
 * British English, no price figures.
 *
 * Run: npx payload run scripts/seed-batch-9.ts  (with DATABASE_URL + PAYLOAD_SECRET)
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

/* ─────────────────────────────── 1: Tue 8 ─────────────────────────────── */
await post({
  slug: 'what-website-maintenance-involves',
  title: 'What website maintenance actually involves',
  excerpt:
    'Most maintenance plans are vague on purpose. Here is what the work actually consists of, what happens when nobody does it, and what to ask before you sign up to one.',
  metaDescription:
    'What website maintenance actually covers: updates, security, backups, monitoring, speed and content. What it costs you to skip, and what to ask a provider.',
  date: '2026-09-08', category: guides.id, tags: ['hosting', 'maintenance'],
  faq: [
    { question: 'Can I just leave the site alone?', answer: 'You can, and plenty do. The risks build slowly: an out-of-date plugin gets exploited, a form quietly stops sending, the content ages. None of it announces itself, which is exactly why it goes unnoticed for months.' },
    { question: 'Is maintenance different from hosting?', answer: 'Yes. Hosting is the server the site sits on. Maintenance is somebody actually looking after what runs on it. Plenty of businesses pay for the first and assume it includes the second.' },
    { question: 'What should a maintenance plan include as a minimum?', answer: 'Updates, backups you have tested by restoring one, uptime monitoring, security patching, and a named person who answers when something breaks. Anything vaguer than that is worth questioning.' },
  ],
  content: doc(
    p(t('Website maintenance is one of those line items that everybody sells and nobody explains. It sounds like insurance, which makes it easy to cut. In reality it is a specific list of jobs, and skipping them has specific consequences.')),
    h('h2', 'Keeping the thing running'),
    p(t('Software underneath a website goes out of date whether the site changes or not. Frameworks get security patches, dependencies get deprecated, payment providers change their integrations. A site nobody touches for two years is not frozen in time, it is slowly drifting out of support.')),
    p(t('The work here is unglamorous: applying updates, checking nothing broke afterwards, and keeping the versions current enough that a serious fix is possible when one is needed urgently.')),
    h('h2', 'Backups you have actually tested'),
    p(t('Almost everyone has backups. Far fewer have ever restored one. A backup you have never tested is a belief, not a safety net, and the moment you discover the difference is the worst possible moment.')),
    h('h2', 'Watching, so you find out before your customers do'),
    p(t('Uptime monitoring is the obvious part. The less obvious part is watching the things that fail silently: a contact form that stops delivering, a payment webhook that starts erroring, a page that begins timing out on mobile. None of these take the site down, so nobody notices, and enquiries simply stop arriving.')),
    p(t('We have seen a business lose a month of enquiries to a form that looked fine and sent nothing. The site was up the entire time.')),
    h('h2', 'Speed, which decays'),
    p(t('Sites get slower on their own. Images get added at full size, a tracking script gets pasted in, a third-party embed starts loading more than it used to. Left alone for a year, most sites are measurably slower than the day they launched, and speed affects both rankings and how many people stay.')),
    h('h2', 'The content nobody owns'),
    p(t('The commonest form of neglect is not technical at all. Prices change, staff leave, a service is dropped, the opening hours move, and the website still says what it said eighteen months ago. Every one of those quietly costs trust with someone who was ready to buy.')),
    h('h2', 'What to ask before signing anything'),
    ul(
      'What exactly is included, written down, rather than "support"',
      'How often backups run, and when one was last restored to check it works',
      'What the response time is when something is genuinely broken',
      'Whether small content changes are included or billed separately',
      'Who owns the hosting account, the domain and the code if you leave',
    ),
    p(...lead('The short version. ', 'Maintenance is updates, backups, monitoring, speed and content, done by somebody specific. If a provider cannot list what they do, that is the answer to whether they are doing it.')),
  ),
});

/* ─────────────────────────────── 2: Thu 10 ─────────────────────────────── */
await post({
  slug: 'product-photography-for-an-online-store',
  title: 'Product photography for an online store',
  excerpt:
    'Photography is usually the biggest thing standing between a business and a working shop. Here is what you actually need, in what order, and what you can do yourself.',
  metaDescription:
    'What product photography an online store really needs: the shots that matter, doing it yourself versus hiring, and the mistakes that cost you sales.',
  date: '2026-09-10', category: guides.id, tags: ['ecommerce', 'photography'],
  faq: [
    { question: 'Can I photograph products on my phone?', answer: 'Yes, for most small businesses. A recent phone near a large window, with a clean background and a tripod, beats a poorly lit studio attempt. The camera is rarely the limiting factor.' },
    { question: 'How many photos does each product need?', answer: 'Three at a minimum: the product clearly on a plain background, one showing scale or use, and one detail shot. More helps, but those three do most of the selling.' },
    { question: 'Do I need a photographer?', answer: 'It pays for itself when the product is the brand, when there are people or interiors in shot, or when you are launching a whole range at once. For restocking one item, do it yourself.' },
  ],
  content: doc(
    p(t('Ask a business why the online shop has not launched and the honest answer is usually photography. The build finished months ago. What is missing is pictures of the products, and it stalls more shops than any technical problem.')),
    h('h2', 'Why it matters more than the design'),
    p(t('Online, nobody can pick the thing up. The photograph is doing the entire job of the shelf, the packaging and the shop assistant at once. A beautifully designed store full of dim, cluttered snaps converts worse than a plain one with clear pictures.')),
    h('h2', 'The three shots that do the work'),
    ul(
      'The plain one: the product filling the frame on a clean background, evenly lit, showing the true colour',
      'The context one: the product in use, worn, held or on a table, so the size is obvious',
      'The detail one: the stitching, the texture, the finish, whatever justifies the price',
    ),
    p(t('Everything beyond that is a bonus. Get those three right for every product before shooting anything clever for one of them.')),
    h('h2', 'Doing it yourself, properly'),
    p(t('A phone from the last few years is enough. What actually changes the result is light and consistency.')),
    ul(
      'Shoot near a big window on an overcast day, with the light coming from the side rather than behind you',
      'Turn the room lights off, because mixing daylight and bulbs makes colours go strange',
      'Use a tripod, or anything that stops the camera moving between shots',
      'Keep the background the same for every product, so the shop looks like one shop',
      'Photograph the whole range in one session, because matching the light on a different day is harder than it sounds',
    ),
    h('h2', 'The mistakes that cost sales'),
    p(t('Inconsistency is the big one. Twelve products shot on twelve different surfaces in twelve different lights make a shop look improvised, whatever the design is doing. After that: photographs that hide the scale, colours that do not match the real thing and generate returns, and images uploaded at full camera size, which is the single most common reason a shop loads slowly.')),
    h('h2', 'What to do before the build finishes'),
    p(t('Start the photography before you think you need to. It is the part with the longest lead time and the part nobody can do for you, and a finished shop waiting on pictures is the most expensive kind of waiting there is.')),
    p(...lead('The short version. ', 'Three shots per product, one session, one background, natural light, resized before upload. That gets a shop live faster than any decision about the design.')),
  ),
});

/* ─────────────────────────────── 3: Tue 15 ─────────────────────────────── */
await post({
  slug: 'small-business-seo-what-actually-works',
  title: 'Small business SEO: what actually works',
  excerpt:
    'Most SEO advice is written for businesses with a marketing department. Here is the short list that genuinely moves things for a business with none of that.',
  metaDescription:
    'Practical SEO for small businesses: the handful of things that actually move rankings when you have no marketing team, and what to ignore.',
  date: '2026-09-15', category: guides.id, tags: ['seo'],
  faq: [
    { question: 'How long before I see anything?', answer: 'Weeks for local and long-tail searches, months for anything competitive. Rankings tend to move in steps rather than smoothly, which makes early progress easy to miss.' },
    { question: 'Do I need to blog every week?', answer: 'No. A handful of genuinely useful pages beats forty thin ones, and publishing filler to hit a schedule can hold a site back rather than help it.' },
    { question: 'Is it worth paying someone?', answer: 'It depends whether they will do the boring parts. Anyone selling rankings rather than work is selling you nothing. Ask what they will actually change on the site in month one.' },
  ],
  content: doc(
    p(t('Most SEO advice assumes a team, a budget and a content calendar. If you are running the business and doing the marketing between jobs, almost none of it applies. This is the shorter list that does.')),
    h('h2', 'Be findable for what you actually sell'),
    p(t('Write the words your customers use on the pages that sell those things. Not a clever brand phrase, the plain description. A page called "Services" that lists nine things ranks for none of them, whereas a page about the one job you most want more of has a chance.')),
    h('h2', 'One page per thing worth selling'),
    p(t('If three services matter, that is three pages, each answering what it is, who it is for, what it costs to consider, and what happens next. This is the single most common gap on small business sites, and it is entirely fixable in an afternoon of writing.')),
    h('h2', 'Local, if you serve an area'),
    p(t('For most small businesses this is the highest return work there is. The Business Profile, the reviews, and being consistent about where you are. It moves faster than anything national and the searches convert better, because someone searching for a plumber nearby is not browsing.')),
    h('h2', 'Speed and mobile, once'),
    p(t('Most visitors are on a phone on a mediocre connection. If pages take five seconds, a good number leave before seeing anything. This is usually a one-off fix rather than an ongoing job: compress the images, remove the scripts nobody uses, and stop.')),
    h('h2', 'Answer the questions you get asked'),
    p(t('Every question you answer on the phone five times a week is a page somebody is searching for. That is where useful content comes from, rather than from a keyword tool. It also makes the sales conversation shorter, because people arrive already knowing the answer.')),
    h('h2', 'What to ignore'),
    ul(
      'Keyword density, which stopped mattering more than a decade ago',
      'Buying links, which is a risk with no upside for a business this size',
      'Chasing a national head term when the local version converts better anyway',
      'Publishing weekly for the sake of it',
      'Anything sold with a promised position attached',
    ),
    p(...lead('The short version. ', 'Plain words, one page per service, local signals, a fast site, and answers to the questions you already get. That is most of the available upside for a small business.')),
  ),
});

/* ─────────────────────────────── 4: Thu 17 ─────────────────────────────── */
await post({
  slug: 'local-seo-checklist',
  title: 'A local SEO checklist for small businesses',
  excerpt:
    'A short, honest checklist for getting found in your own town, in the order that matters. No tools required for most of it.',
  metaDescription:
    'A practical local SEO checklist: Google Business Profile, reviews, consistent details, location pages and what to do first if you only have an afternoon.',
  date: '2026-09-17', category: local.id, tags: ['seo', 'local'],
  faq: [
    { question: 'What is the single highest impact item?', answer: 'A complete, correctly categorised Google Business Profile, followed by reviews arriving steadily. Together they decide most local results before the website is even considered.' },
    { question: 'Do I need to be listed in lots of directories?', answer: 'A handful of real ones helps, mostly by making your details consistent across the web. Bulk submission to hundreds of low quality directories does nothing useful and looks like exactly what it is.' },
    { question: 'How often should I check any of this?', answer: 'Once a quarter is plenty, other than reviews, which should be a continuous habit rather than a task.' },
  ],
  content: doc(
    p(t('Local search rewards a small number of unglamorous things done consistently. Here they are in the order we would do them, with the honest note that the first two account for most of the result.')),
    h('h2', 'One: the Business Profile'),
    ul(
      'Claim it, and check nobody else has claimed a duplicate',
      'Set the primary category to the single thing you most want to be found for',
      'Add secondary categories, but only ones that genuinely apply',
      'List the areas you actually serve, and resist adding the whole county',
      'Real photographs, added occasionally rather than all at once',
      'Hours that are true, including seasonal changes',
    ),
    h('h2', 'Two: reviews, as a habit'),
    p(t('Ask every satisfied customer, soon after the work, in a way that suits how you already talk to them. One ask, one gentle reminder, then leave it. Reply to every review you get, briefly and like a person.')),
    p(t('The thing that matters more than the total is that they keep arriving. Twenty reviews with the most recent from last year reads worse than eight that are current.')),
    h('h2', 'Three: consistent details everywhere'),
    p(t('The same business name, phone number and address format on your site, your profile, your social accounts and any directory you appear in. Where an old address or a former trading name is still live somewhere, fix it or get it removed.')),
    h('h2', 'Four: say where you are on your own site'),
    p(t('Put the town in the words on the page, not only in the footer. If several areas genuinely matter to the business, give each a page with something specific to say about working there. If you cannot write something specific, do not make the page.')),
    h('h2', 'Five: the technical minimum'),
    ul(
      'Address and phone number in the site markup, not just in an image',
      'A page that loads quickly on a phone',
      'A link to the Business Profile, and a link back to the site from it',
    ),
    h('h2', 'If you only have an afternoon'),
    p(t('Do the profile properly and ask your last ten customers for a review. That is the whole afternoon, and it will do more than a month of anything else on this list.')),
    p(...lead('The short version. ', 'Profile, reviews, consistency, then pages. Most businesses skip straight to the pages and wonder why nothing moves.')),
  ),
});

/* ─────────────────────────────── 5: Fri 18 ─────────────────────────────── */
await post({
  slug: 'why-your-new-website-is-not-on-google',
  title: 'Why your new website is not showing on Google',
  excerpt:
    'A new site can take days or weeks to appear, and sometimes something is genuinely blocking it. Here is how to tell which, in the order worth checking.',
  metaDescription:
    'New website not appearing on Google? How long indexing really takes, how to check whether you are indexed, and the settings that block a site entirely.',
  date: '2026-09-18', category: guides.id, tags: ['seo', 'launch'],
  faq: [
    { question: 'How long should it take?', answer: 'Anywhere from a day to a few weeks for a brand new site. Being indexed and ranking are different things: appearing for your own business name happens quickly, competing for anything else takes far longer.' },
    { question: 'How do I check if I am indexed?', answer: 'Search for site: followed by your domain, with no space. If pages come back, Google has them. If nothing does, something is blocking it or it is simply too soon.' },
    { question: 'Will submitting my site speed it up?', answer: 'Adding the site to Search Console and submitting the sitemap helps Google find everything sooner. It does not buy you rankings, and no service that charges to submit your site to hundreds of engines is worth paying.' },
  ],
  content: doc(
    p(t('A new site not appearing on Google is usually one of two things: it has not been long enough, or something is telling Google to stay away. The second is quick to rule out, so start there.')),
    h('h2', 'First, check whether you are actually indexed'),
    p(t('Search for your domain with site: in front of it and no space after the colon. If your pages come back, you are indexed and this is a ranking question, not an indexing one. If nothing comes back at all, keep reading.')),
    h('h2', 'The setting that blocks everything'),
    p(t('The most common cause by far is a "discourage search engines" or "noindex" setting left on from when the site was being built. It exists so unfinished sites stay private, and it gets forgotten on launch day more often than anything else in web design.')),
    p(t('The same applies to a password or holding page in front of the site. If a visitor cannot see it without logging in, neither can Google.')),
    h('h2', 'Then the plumbing'),
    ul(
      'A robots.txt file that disallows everything, again usually left from development',
      'A sitemap that was never submitted, so Google has to find pages on its own',
      'Pages that only exist behind a search or filter, with nothing linking to them',
      'A canonical tag pointing every page at the homepage, which happens with some themes',
    ),
    h('h2', 'If it is indexed but nowhere to be found'),
    p(t('Search your exact business name. If you appear, indexing is fine and the real question is competitiveness. A new site has no history and no links, so ranking for anything that other businesses want takes months of doing the ordinary things well.')),
    p(t('This is where most people go wrong, because "not on Google" and "not on page one for a competitive term" feel identical from the outside and need completely different responses.')),
    h('h2', 'What actually helps'),
    ul(
      'Set up Search Console and submit the sitemap, once',
      'Make sure every page is linked from somewhere on the site',
      'Get a few genuine links, starting with your own profiles and any supplier or client site that would credit you',
      'Give it a few weeks before drawing conclusions',
    ),
    p(...lead('The short version. ', 'Rule out noindex and password gates first, then submit the sitemap, then be patient. Most new site panics are simply a week too early.')),
  ),
});

/* ─────────────────────────────── 6: Mon 21 ─────────────────────────────── */
await post({
  slug: 'your-service-area-could-be-hurting-your-ranking',
  title: 'Your service area could be hurting your ranking',
  excerpt:
    'If you hide your address, Google places you in the middle of the areas you list. Adding the whole county can quietly move you out of your own town.',
  metaTitle: 'Your service area could be hurting you | russle',
  metaDescription:
    'Service-area businesses get anchored at the centre of the areas they list. Why adding the whole county pulls you out of your own town, and how to fix it.',
  date: '2026-09-21', category: local.id, tags: ['seo', 'local'],
  faq: [
    { question: 'Should I add every place I would travel to?', answer: 'No. List the places you genuinely want work from and can reach easily. A long list does not extend your reach, it dilutes where Google thinks you are.' },
    { question: 'Would adding my address fix it?', answer: 'It anchors you precisely, but Google now shows any address you add, so it only suits businesses happy to publish a real premises. Hidden addresses are no longer an option.' },
    { question: 'How long before a change takes effect?', answer: 'Usually days to a couple of weeks. Change it once and leave it alone, because repeatedly editing location settings is not a signal you want to send.' },
  ],
  content: doc(
    p(t('Here is a piece of local search that catches out most businesses without a shopfront. If you do not show a public address, Google works out roughly where you are from the areas you say you serve, and it places you in the middle of them. Add enough distant places and that middle stops being anywhere near you.')),
    h('h2', 'Why distance is decided for you'),
    p(t('Local rankings weigh how close you are to whoever is searching. A business with a shop has an obvious answer. A service-area business does not, so Google infers one, and the inference is only as good as the list you gave it.')),
    h('h2', 'What this looks like in reality'),
    p(t('Take a studio in a Cheshire village that also serves the surrounding towns. That is a tight cluster, and the middle of it sits close to home, which is what you want. Now add the whole county, and a city thirty miles the other way. The middle of that footprint lands miles from the village, out where nobody is searching for you.')),
    p(t('Nothing about the profile looks wrong. The categories are right, the reviews are good, the hours are correct. It simply competes as though it were somewhere else, and the searches happening on its own high street go to businesses that look nearer.')),
    h('h2', 'The instinct that causes it'),
    p(t('Every business adds the big places for the same reason: it feels like it widens the net. It does not. Listing a city does not make you competitive there, because you are still a long way from everyone searching in it. What it does is weaken you where you were genuinely strong.')),
    h('h2', 'What to do instead'),
    ul(
      'List the towns and villages you actually work in, and stop',
      'Remove county-wide and city-wide entries unless you are genuinely based there',
      'Keep the cluster tight around where you want the work to come from',
      'Cover the wider area with pages on your own site, which is where broad reach belongs',
    ),
    h('h2', 'Where the broad reach really comes from'),
    p(t('The profile is the wrong tool for covering a region. Its job is to win the searches happening near you. Pages on your own site are what compete for the wider terms, and those have no distance limit at all.')),
    p(t('Get the two doing separate jobs and both improve. Ask the profile to do both and it does neither well.')),
    p(...lead('The short version. ', 'Your service-area list is a location setting, not a wish list. Keep it tight, and let your website chase the wider area.')),
  ),
});

console.log('\nBatch 9 staged. With batch 8 the queue now runs Mon 7 to Mon 21 with no weekday gaps.');
