/**
 * 30-day calendar, batch 4 (Jul 1-8). Eight posts staged as DRAFTS with
 * randomised 9-11am UK publish times, each with content + 3 FAQs.
 * Run: npx payload run scripts/seed-batch-6.ts  (with DATABASE_URL + PAYLOAD_SECRET)
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
  return f.docs[0] ?? (await payload.create({ collection: 'categories', data: { title, slug, description } }));
}
async function post(input: { slug: string; title: string; excerpt: string; date: string; category: number; tags: string[]; metaDescription: string; faq: Faq[]; content: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const data = { title: input.title, slug: input.slug, excerpt: input.excerpt, publishedAt: randTime(input.date), content: input.content, category: input.category, tags: input.tags, faq: input.faq, meta: { title: `${input.title} | russle`, description: input.metaDescription }, _status: 'draft' as const };
  const f = await payload.find({ collection: 'posts', where: { slug: { equals: input.slug } }, draft: true, overrideAccess: true, limit: 1 });
  if (f.docs[0]) { await payload.update({ collection: 'posts', id: f.docs[0].id, data }); console.log('Updated:', input.slug); }
  else { await payload.create({ collection: 'posts', data }); console.log('Created:', input.slug); }
}

const guides = await cat('guides', 'Guides', 'Practical guides on brand, websites, and growth for ambitious businesses.');
const comparisons = await cat('comparisons', 'Comparisons', 'Honest comparisons to help you choose how to build.');
const local = await cat('local-notes', 'Local notes', 'Notes for businesses building an online presence across the UK.');

await post({
  slug: 'squarespace-vs-wix', title: 'Squarespace vs Wix: which is better for a small business?',
  excerpt: 'Squarespace and Wix are the two most popular website builders. Here is the honest comparison to help a small business pick between them.',
  metaDescription: 'Squarespace vs Wix for a small business: design, ease, SEO, and cost compared honestly. From russle, a UK web design and SEO studio.',
  date: '2026-07-01', category: comparisons.id, tags: ['squarespace', 'wix', 'comparison'],
  content: doc(
    p(t('Squarespace is the better choice for a clean, design-led site, while Wix is easier and more flexible to build yourself. For most small businesses that want to look professional, Squarespace wins; for absolute ease and drag-and-drop control, Wix does. Here is the honest comparison.')),
    h('h2', 'Squarespace'),
    ul('Cleaner, more design-led templates that look professional out of the box.', 'Tidy, consistent results, harder to make look messy.', 'Slightly less layout freedom.', 'Good for a polished, professional presence.'),
    h('h2', 'Wix'),
    ul('The easiest to use, with true drag-and-drop control.', 'More freedom to place things exactly where you want.', 'A bigger app market for extra features.', 'Easier to end up looking cluttered if you are not careful.'),
    h('h2', 'How to choose'),
    ul(lead('Want a clean, professional look with less effort:', ' Squarespace.'), lead('Want maximum drag-and-drop control and flexibility:', ' Wix.'), lead('Want to look truly distinctive and grow without limits:', ' neither, a custom build.')),
    h('h2', 'Where we land'),
    p(t('For businesses that want to stand out and grow, we build custom, and we will tell you honestly when Squarespace or Wix is the smarter start. Send us a line and we will give you a straight steer.')),
  ),
  faq: [
    { question: 'Is Squarespace or Wix better for a small business?', answer: 'Squarespace is better for a clean, professional, design-led site; Wix is easier and more flexible to build yourself. It depends on whether you value polish or drag-and-drop control.' },
    { question: 'Which is better for SEO, Squarespace or Wix?', answer: 'Both are capable for a simple site and have improved a lot. Neither matches the control of a custom build, but either can handle the SEO basics if you do them.' },
    { question: 'Which is easier to use, Squarespace or Wix?', answer: 'Wix is generally easier, with true drag-and-drop. Squarespace is a little more structured, which keeps results tidy but gives slightly less freedom.' },
  ],
});

await post({
  slug: 'cheshire-marketing-playbook', title: 'A marketing playbook for ambitious small businesses',
  excerpt: 'A practical, no-nonsense marketing playbook for small businesses growing online, from brand to local search to repeat custom.',
  metaDescription: 'A practical marketing playbook for small businesses growing online: brand, website, local SEO, reviews, and email. From russle.',
  date: '2026-07-02', category: local.id, tags: ['marketing', 'local business'],
  content: doc(
    p(t('For a small business, the marketing that works is simpler than most advice suggests: a clear brand, a website that converts, a strong local search presence, steady reviews, and a way to keep in touch with customers. Nail those five and you are ahead of most competitors. Here is the playbook.')),
    h('h2', 'Get the brand clear'),
    p(t('Before any tactics, be clear on who you are for and why you are the obvious choice. A muddled brand makes every other bit of marketing work harder for less.')),
    h('h2', 'Build a website that converts'),
    p(t('Your site should make it obvious what you do and easy to get in touch. For small businesses competing with the big chains, a brand-led site that stands out is a real advantage.')),
    h('h2', 'Win local search'),
    p(t('Claim and complete your Google Business Profile, name the towns you serve on your site, and keep your details consistent everywhere. This is the highest-return work for a local business.')),
    h('h2', 'Build reviews steadily'),
    p(t('Ask happy customers for a Google review at the right moment, make it one tap, and reply to every one. Reviews win both trust and local ranking.')),
    h('h2', 'Keep in touch'),
    p(t('The cheapest growth is repeat custom. A simple email list, used occasionally and well, keeps you front of mind without paying for ads.')),
    h('h2', 'Where we land'),
    p(t('This is exactly the work we do for small businesses across the UK: brand, web, and the local growth around them. If you want a hand with any of it, send us a line.')),
  ),
  faq: [
    { question: 'How should a small local business market itself?', answer: 'Start with a clear brand and a website that converts, then win local search through your Google Business Profile, build reviews steadily, and keep in touch with customers by email. Those basics beat most competitors.' },
    { question: 'What is the most important marketing for a local business?', answer: 'A complete Google Business Profile and steady reviews. For local businesses, local search is where most customers look, and it is realistic to win.' },
    { question: 'Do I need to pay for ads to grow locally?', answer: 'Not necessarily. Strong local search, reviews, a converting website, and repeat custom by email often grow a local business without ongoing ad spend.' },
  ],
});

await post({
  slug: 'website-copy-that-converts', title: 'How to write website copy that converts',
  excerpt: 'Most website copy talks about the business. Copy that converts talks to the customer. Here is how to write words that turn visitors into enquiries.',
  metaDescription: 'How to write website copy that converts: clarity, customer focus, and clear calls to action. A practical guide from russle, a UK web design and SEO studio.',
  date: '2026-07-03', category: guides.id, tags: ['website copy', 'copywriting', 'conversion'],
  content: doc(
    p(t('Website copy converts when it is clear, speaks to the customer’s problem, and tells them exactly what to do next. Most copy fails because it talks about the business instead of the reader. Here is how to write words that bring in enquiries.')),
    h('h2', 'Lead with the customer, not yourself'),
    p(t('Open with what the visitor wants or worries about, not your history. "We help X do Y" beats "Established in 2010, we are passionate about". People care about their problem first.')),
    h('h2', 'Be clear, not clever'),
    p(t('A clear headline that says what you do beats a clever one that needs decoding. If a visitor has to work out what you offer, they leave.')),
    h('h2', 'Write the way you speak'),
    p(t('Plain, human language reads as trustworthy. Drop the jargon and the corporate filler. Short sentences. One idea at a time.')),
    h('h2', 'Make every page ask for something'),
    p(t('End each page with one clear next step: book a call, get a quote, see the menu. Tell people exactly what to do, do not leave them guessing.')),
    h('h2', 'Back it up'),
    p(t('Reviews, results, and real detail make claims believable. "80 bowls prepped before 8am" beats "we work hard". Specific beats vague.')),
    h('h2', 'Where we land'),
    p(t('We write the copy as part of the build, because the words do as much of the converting as the design. If your site looks fine but the words are not landing, send us the link and we will tell you what to sharpen.')),
  ),
  faq: [
    { question: 'How do I write website copy that converts?', answer: 'Lead with the customer’s problem, be clear rather than clever, write the way you speak, and end every page with one obvious next step backed by real proof.' },
    { question: 'What is the biggest mistake in website copy?', answer: 'Talking about the business instead of the customer. Visitors care about their own problem first, so copy that opens with your history or jargon loses them.' },
    { question: 'How long should website copy be?', answer: 'As long as it needs to be and no longer. Lead with the key point, keep sentences short, and cut anything that does not help the reader decide.' },
  ],
});

await post({
  slug: 'wordpress-vs-webflow', title: 'WordPress vs Webflow: which should you choose?',
  excerpt: 'WordPress and Webflow both build serious sites, in very different ways. Here is the honest comparison for a small business choosing between them.',
  metaDescription: 'WordPress vs Webflow for a small business: flexibility, design, maintenance, and SEO compared. From russle, a UK web design and SEO studio.',
  date: '2026-07-04', category: comparisons.id, tags: ['wordpress', 'webflow', 'comparison'],
  content: doc(
    p(t('WordPress is the more flexible, widely supported option but needs maintenance, while Webflow gives cleaner design control with less upkeep but more platform lock-in. For most small businesses, Webflow is simpler to live with, WordPress is more powerful if you have support. Here is the honest comparison.')),
    h('h2', 'WordPress'),
    ul('The most flexible, with a plugin for almost anything.', 'You own it and can host it anywhere.', 'A huge ecosystem of themes and developers.', 'Needs maintenance: updates, security, and care to stay fast.'),
    h('h2', 'Webflow'),
    ul('Strong visual design control with cleaner output.', 'Hosting and security handled, so less upkeep.', 'A gentler day-to-day than WordPress.', 'Higher monthly fees and more platform lock-in.'),
    h('h2', 'Which suits a small business'),
    ul(lead('Want maximum flexibility and ownership, with someone to maintain it:', ' WordPress.'), lead('Want a designed site with less to maintain:', ' Webflow.'), lead('Want neither the upkeep nor the platform fees, and you compete on brand:', ' a custom build.')),
    h('h2', 'Where we land'),
    p(t('We build custom rather than in either, for full ownership and no ceiling, but both are capable. We will tell you honestly when one of them is the right call for your situation.')),
  ),
  faq: [
    { question: 'Is WordPress or Webflow better?', answer: 'WordPress is more flexible and you own it, but it needs maintenance. Webflow has cleaner design control and less upkeep but more lock-in. It depends on whether you have support and value flexibility or simplicity.' },
    { question: 'Does Webflow or WordPress have better SEO?', answer: 'Both can rank well. Webflow tends to produce clean, fast sites by default; WordPress can match it but only if built carefully, since plugins can slow it down.' },
    { question: 'Is WordPress hard to maintain?', answer: 'It needs regular updates, security, and care to stay fast, which is its main downside. Webflow handles more of that for you, at the cost of higher fees and lock-in.' },
  ],
});

await post({
  slug: 'google-map-pack', title: 'How to rank in Google’s local Map Pack',
  excerpt: 'The local Map Pack is the three businesses Google shows at the top of local searches. Here is how a small business earns one of those spots.',
  metaDescription: 'How to rank in Google’s local Map Pack: Google Business Profile, reviews, and local signals explained for a small business. From russle, a UK web design and SEO studio.',
  date: '2026-07-05', category: local.id, tags: ['map pack', 'local seo', 'google business profile'],
  content: doc(
    p(t('To rank in Google’s local Map Pack, you need a complete and accurate Google Business Profile, steady genuine reviews, consistent business details across the web, and a website that backs up where you are and what you do. It is one of the most winnable, valuable things a local business can do.')),
    h('h2', 'What the Map Pack is'),
    p(t('When you search for a local service, Google shows a map with three businesses at the top, above the normal results. Those three spots get most of the local clicks, so earning one matters.')),
    h('h2', 'How to earn a spot'),
    ul(lead('Complete your Google Business Profile.', ' Every field, the right categories, real photos, accurate hours. This is the single biggest factor.'), lead('Get steady, genuine reviews.', ' Number, quality, and freshness all count. Ask happy customers and reply to every review.'), lead('Keep your details consistent.', ' The same name, address, and phone number everywhere they appear online.'), lead('Back it up on your site.', ' Name the areas you serve and make your location clear, so your website supports the profile.')),
    h('h2', 'What does not help'),
    p(t('Fake reviews, keyword-stuffed business names, and inconsistent details. Google is good at spotting these and they can hurt you.')),
    h('h2', 'Where we land'),
    p(t('Getting found locally is core to what we do for clients, and the Map Pack is usually the highest-return place to start. If you want a hand, send us a line.')),
  ),
  faq: [
    { question: 'How do I get my business in the Google Map Pack?', answer: 'Complete your Google Business Profile fully, earn steady genuine reviews, keep your business details consistent everywhere, and back it up with clear location information on your website.' },
    { question: 'What is the Google Map Pack?', answer: 'It is the group of three local businesses Google shows on a map at the top of local search results. Those spots get most of the local clicks.' },
    { question: 'How long does it take to rank in the Map Pack?', answer: 'It varies, but completing your profile and building reviews can show results within weeks to a few months. Consistency over time is what holds the position.' },
  ],
});

await post({
  slug: 'in-house-vs-growth-retainer', title: 'In-house marketing vs a growth retainer',
  excerpt: 'Should you hire in-house for marketing or use an outside growth retainer? Here is the honest comparison for a small business.',
  metaDescription: 'In-house marketing vs a growth retainer for a small business: cost, skills, and results compared. From russle, a UK web design and SEO studio.',
  date: '2026-07-06', category: comparisons.id, tags: ['marketing', 'growth retainer', 'comparison'],
  content: doc(
    p(t('Hiring in-house gives you dedicated focus but is expensive and hard to cover every skill, while a growth retainer gives you a range of skills for less than one salary but with less day-to-day presence. For most small businesses, a retainer is the more practical start. Here is the honest comparison.')),
    h('h2', 'Hiring in-house'),
    ul('A dedicated person focused only on your business.', 'Deep knowledge of your brand over time.', 'Expensive once you add salary, tax, and tools.', 'One person rarely covers brand, web, SEO, email, and content well.'),
    h('h2', 'A growth retainer'),
    ul('A range of skills across brand, web, and growth for a monthly fee.', 'Usually far less than a full salary.', 'Senior experience without the overhead.', 'Less day-to-day presence than an in-house hire.'),
    h('h2', 'How to choose'),
    ul(lead('Lots of ongoing work and the budget for a salary:', ' an in-house hire, ideally backed by outside specialists.'), lead('Want broad skills and senior help without the cost of a hire:', ' a growth retainer.')),
    h('h2', 'Where we land'),
    p(t('Our Grow retainer is built exactly for this: brand, web, SEO, email, and local growth for a monthly fee, without hiring a whole team. If that fits where you are, send us a line.')),
  ),
  faq: [
    { question: 'Should I hire in-house or use a marketing retainer?', answer: 'In-house gives dedicated focus but is expensive and hard to cover every skill. A retainer gives broad senior skills for less than a salary, with less daily presence. For most small businesses, a retainer is the practical start.' },
    { question: 'How much does a marketing retainer cost?', answer: 'It varies with scope, but a retainer is usually far less than the full cost of an in-house hire once you add salary, tax, and tools, while covering a wider range of skills.' },
    { question: 'What does a growth retainer include?', answer: 'Typically a mix of brand, website updates, SEO, email, and local marketing for a monthly fee, giving you senior help across several areas without hiring a whole team.' },
  ],
});

await post({
  slug: 'website-launch-checklist', title: 'Website launch checklist: get these right before you go live',
  excerpt: 'Launching a website is where avoidable mistakes happen. Here is the checklist to run before you go live, so nothing important gets missed.',
  metaDescription: 'A website launch checklist for small businesses: SEO, speed, analytics, forms, and more to check before you go live. From russle, a UK web design and SEO studio.',
  date: '2026-07-07', category: guides.id, tags: ['website launch', 'checklist', 'web design'],
  content: doc(
    p(t('Before you launch a website, check that it works on mobile, loads fast, has its SEO basics in place, that forms and links work, analytics is set up, and that you can be found and contacted. Run this checklist and you avoid the mistakes that cost enquiries on day one.')),
    h('h2', 'Before you go live'),
    ul(lead('Mobile.', ' Check every page on a real phone, not just desktop.'), lead('Speed.', ' Run it through PageSpeed Insights and fix the obvious drags.'), lead('SEO basics.', ' Page titles, descriptions, a sitemap, and clean URLs in place.'), lead('Forms and links.', ' Test every form actually sends, and click every link.'), lead('Analytics.', ' Set up so you can see traffic and enquiries from day one.'), lead('Contact details.', ' Correct, consistent, and easy to find.')),
    h('h2', 'After you launch'),
    ul('Submit your sitemap to Google Search Console and request indexing.', 'Update your Google Business Profile and links to point at the new site.', 'Watch analytics and search for anything broken in the first week.'),
    h('h2', 'The mistake to avoid'),
    p(t('Launching quietly and assuming Google will find it. Tell Google it exists, point your profiles at it, and check the basics actually work.')),
    h('h2', 'Where we land'),
    p(t('We run exactly this kind of checklist before every launch, so sites go live working and findable. If you are about to launch, send us the link and we will give it an honest once-over.')),
  ),
  faq: [
    { question: 'What should I check before launching a website?', answer: 'Test it on a real phone, check speed, confirm the SEO basics, test every form and link, set up analytics, and make sure your contact details are correct and easy to find.' },
    { question: 'What do I do after launching a website?', answer: 'Submit your sitemap to Google Search Console and request indexing, point your Google Business Profile and links at the new site, and watch for anything broken in the first week.' },
    { question: 'Why is my new website not showing on Google?', answer: 'New sites take time to be indexed. Submit your sitemap in Search Console and request indexing to speed it up, and make sure the site is not blocking search engines.' },
  ],
});

await post({
  slug: 'email-marketing-for-small-businesses', title: 'Email marketing for small businesses: where to start',
  excerpt: 'Email is the cheapest, most reliable way to bring customers back. Here is how a small business starts email marketing without overcomplicating it.',
  metaDescription: 'Email marketing for small businesses: how to start, what to send, and why it beats social media for repeat custom. From russle, a UK web design and SEO studio.',
  date: '2026-07-08', category: guides.id, tags: ['email marketing', 'small business', 'marketing'],
  content: doc(
    p(t('To start email marketing, collect customer emails with permission, pick a simple tool, and send occasional useful emails that keep you front of mind. It is the cheapest way to bring customers back, and unlike social media, you own the list. Here is how to start without overcomplicating it.')),
    h('h2', 'Why email is worth it'),
    ul(lead('You own the list.', ' Social platforms can change the rules or bury your posts. Your email list is yours.'), lead('It brings people back.', ' Repeat custom is cheaper than finding new customers, and email is the best tool for it.'), lead('It is cheap.', ' A small list costs little or nothing to run.')),
    h('h2', 'How to start'),
    ul(lead('Collect emails with permission.', ' A simple sign-up on your site and at the point of sale, with a clear reason to join.'), lead('Pick a simple tool.', ' A basic email platform is plenty to begin. Do not over-buy.'), lead('Send something useful, occasionally.', ' A monthly note with news, offers, or genuinely helpful tips beats frequent noise.'), lead('Keep it human.', ' Write the way you would to a regular customer, not like a corporate newsletter.')),
    h('h2', 'What to avoid'),
    ul('Buying lists or adding people without consent.', 'Emailing too often or only ever selling.', 'Overcomplicating it before you have started.'),
    h('h2', 'Where we land'),
    p(t('Email is part of our Grow retainer, because it is one of the most reliable ways to turn one-off customers into regulars. If you want help getting started, send us a line.')),
  ),
  faq: [
    { question: 'How do I start email marketing for a small business?', answer: 'Collect customer emails with permission through a simple sign-up, pick a basic email tool, and send occasional useful emails that keep you front of mind. Start simple and build from there.' },
    { question: 'Is email marketing still worth it?', answer: 'Yes. You own your email list, unlike social media followers, and email is the cheapest, most reliable way to bring customers back for repeat custom.' },
    { question: 'How often should I send marketing emails?', answer: 'Quality over frequency. A monthly email with genuinely useful news, offers, or tips usually beats frequent emails that customers learn to ignore.' },
  ],
});

console.log('Batch 4 (Jul 1-8) complete.');
