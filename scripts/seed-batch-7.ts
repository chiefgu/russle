/**
 * Batch 7 (Jul 9-15). Seven posts staged as DRAFTS with randomised 9-11am UK
 * publish times, each with content + 3 FAQs. National brand & growth agency
 * positioning (no local framing). Continues the calendar after batch 6.
 * Run: npx payload run scripts/seed-batch-7.ts  (with DATABASE_URL + PAYLOAD_SECRET)
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

await post({
  slug: 'what-is-a-brand-and-growth-agency', title: 'What does a brand and growth agency actually do?',
  excerpt: 'A brand and growth agency designs the brand, builds the website or store, and runs the marketing that scales it, all under one roof. Here is what that means in practice.',
  metaDescription: 'What a brand and growth agency does: brand, website, e-commerce, SEO, email, and AI under one team. From russle, a brand and growth agency.',
  date: '2026-07-09', category: guides.id, tags: ['agency', 'brand', 'growth'],
  content: doc(
    p(t('A brand and growth agency does the whole job in one place: it designs the brand, builds the website or store, then runs the marketing and AI that turn it into revenue. The point is that one team owns the outcome, so the brand, the site, and the growth all pull in the same direction instead of being stitched together from three suppliers.')),
    h('h2', 'Brand'),
    p(t('The name, the look, the voice, and the rules that keep them consistent. A brand is what makes a business recognisable and trusted before anyone reads a word.')),
    h('h2', 'Product'),
    p(t('The website or store itself: the thing customers actually use to buy, book, or enquire. Built to convert, fast, and owned by you, not rented from a template.')),
    h('h2', 'Growth'),
    p(t('The work that scales it once it is live: search, content, email, and increasingly AI search. This is where a growth agency differs from a design studio, it stays on after launch and is measured on results.')),
    h('h2', 'Why one team'),
    p(t('When brand, build, and growth sit with one team, nothing gets lost in the handoffs that make the typical designer-then-developer-then-marketer chain slow and expensive. One brief, one timeline, one number to call.')),
    h('h2', 'Where we land'),
    p(t('That is exactly how russle works: brand, website, and the growth behind them, run by one team for ambitious businesses across the UK. If that is the kind of partner you are looking for, send us a line.')),
  ),
  faq: [
    { question: 'What is the difference between an agency and a studio?', answer: 'A studio usually focuses on design and craft; an agency takes on the wider job, including the marketing and growth that run after launch. russle does both, brand and the growth behind it, under one team.' },
    { question: 'What does a brand and growth agency cost?', answer: 'It depends on scope. A one-off brand and website build starts from a fixed project fee, and ongoing growth is a monthly retainer. The point is one predictable relationship rather than several separate invoices.' },
    { question: 'Do I need an agency or can I do it myself?', answer: 'If your brand and site are holding you back and you do not have the time or team to fix and grow them, an agency is usually the faster, more joined-up route. If you have the skills in-house, you may not need one.' },
  ],
});

await post({
  slug: 'one-team-vs-three-suppliers', title: 'Brand, website, marketing: why one team beats three suppliers',
  excerpt: 'Hiring a brand designer, a web developer, and a marketer separately is how most businesses end up looking like three different companies. Here is why one team works better.',
  metaDescription: 'Why one team for brand, website, and marketing beats three separate suppliers: consistency, speed, and accountability. From russle, a brand and growth agency.',
  date: '2026-07-10', category: guides.id, tags: ['agency', 'brand', 'process'],
  content: doc(
    p(t('Most businesses build their brand from one supplier, their website from another, and their marketing from a third. The result is predictable: nothing fits together, the brand looks sharp in one place and amateur everywhere else, and no one owns the outcome. One team that does all three avoids the gaps. Here is why it works better.')),
    h('h2', 'Consistency'),
    p(t('When the same team designs the brand and builds the site, the logo, the colours, the voice, and the layout all agree. Three suppliers means three interpretations of who you are.')),
    h('h2', 'Speed'),
    p(t('Every handoff between suppliers is a delay and a chance for something to get lost. One team works from one brief and one timeline, so the work moves.')),
    h('h2', 'Accountability'),
    p(t('When the site underperforms, three suppliers point at each other. One team owns the result end to end, which means there is no one to hide behind.')),
    h('h2', 'Cost over time'),
    p(t('Three relationships means three sets of overhead, three invoices, and a lot of your time spent project-managing. One team is usually cheaper once you count the hours you get back.')),
    h('h2', 'Where we land'),
    p(t('russle is built around this: brand, website, and growth from one team, designed and built together so your business looks like one business, not five. If you are tired of stitching suppliers together, send us a line.')),
  ),
  faq: [
    { question: 'Is it cheaper to use one team or several suppliers?', answer: 'Once you count your own time spent coordinating, one team is usually cheaper, and the result is more consistent. Several suppliers can look cheaper line by line but cost more in delays and rework.' },
    { question: 'Can one team really do brand, web, and marketing well?', answer: 'Yes, when the team is set up for it. The skills are related, and doing them together is what keeps the brand, site, and marketing consistent. The key is whether they can show work across all three.' },
    { question: 'What if I already have a brand?', answer: 'Then a good team builds on it rather than starting over. You can bring an existing brand and have the website and growth built around it.' },
  ],
});

await post({
  slug: 'what-is-a-growth-retainer', title: 'What is a growth retainer, and what should it include?',
  excerpt: 'A growth retainer is a monthly arrangement that keeps your brand, website, and marketing working after launch. Here is what a good one includes and how to judge it.',
  metaDescription: 'What a growth retainer is and what it should include: hosting, SEO, content, email, AI search, and reporting. From russle, a brand and growth agency.',
  date: '2026-07-11', category: guides.id, tags: ['growth', 'retainer', 'marketing'],
  content: doc(
    p(t('A growth retainer is a monthly arrangement where an agency keeps your website and marketing working and improving after launch, rather than handing it over and walking away. A good one covers the technical upkeep and the growth work, reports in plain English, and has no long lock-in. Here is what to look for.')),
    h('h2', 'The upkeep'),
    ul('Hosting, security, and performance kept healthy.', 'Small site updates and fixes each month.', 'Analytics and tracking kept accurate.'),
    h('h2', 'The growth work'),
    ul('Search visibility, including local and AI search.', 'Content that earns traffic and answers real questions.', 'Email that brings customers back.', 'Your Google Business Profile kept active.'),
    h('h2', 'The reporting'),
    p(t('A monthly summary in plain English: what was done, what moved, and what is next. If you cannot tell what you are paying for, the retainer is not working.')),
    h('h2', 'The terms'),
    p(t('A good retainer is month to month or short notice, not a year you cannot leave. Confidence comes from the results, not the contract.')),
    h('h2', 'Where we land'),
    p(t('russle Grow is exactly this: the technical side and the growth side kept running every month, with a plain-English report and no long-term contract. Manage adds a full team running campaigns and strategy on top. Send us a line for a straight steer on which fits.')),
  ),
  faq: [
    { question: 'How much does a growth retainer cost?', answer: 'It varies with scope. A maintenance-and-growth retainer typically starts in the low hundreds per month and rises with the amount of campaign and content work involved. russle Grow starts from a fixed monthly fee with no long-term contract.' },
    { question: 'Do I need a retainer after my website launches?', answer: 'Most businesses benefit from one. A site that nobody updates ages quickly, rankings drift, and the marketing goes quiet. A retainer keeps the brand and site doing their job, but it should always be optional.' },
    { question: 'What should a growth retainer include?', answer: 'Hosting and upkeep, search and local visibility, content and email, AI search optimisation, and a clear monthly report. If you cannot see what is being done and why, it is not a good retainer.' },
  ],
});

await post({
  slug: 'ai-in-brand-and-web-2026', title: 'How AI is changing brand and web in 2026',
  excerpt: 'AI has changed how people find businesses and what a website has to do. Here is what actually matters for brand and web in 2026, without the hype.',
  metaDescription: 'How AI is changing brand and web in 2026: AI search, GEO, practical AI features, and what still matters. From russle, a brand and growth agency.',
  date: '2026-07-12', category: guides.id, tags: ['AI', 'GEO', 'web design'],
  content: doc(
    p(t('AI has changed two things that matter for any business with a website: how people find you, and what your site can do. The hype is loud, but the practical shifts are clear. Here is what actually matters in 2026, and what has not changed.')),
    h('h2', 'People search differently'),
    p(t('A growing share of buyers ask ChatGPT, Perplexity, or Google AI Overviews instead of scrolling a results page. If your site is not structured for AI to read and cite, you are invisible in that channel.')),
    h('h2', 'GEO sits alongside SEO'),
    p(t('Generative engine optimisation is about being the source an AI quotes: clear structure, real answers, schema, and brand signals AI engines trust. It does not replace SEO, it sits next to it.')),
    h('h2', 'AI inside the site'),
    p(t('Practical AI features now earn their place: assistants that actually answer questions, smarter search, and content help. The test is whether they save the customer time, not whether they look clever.')),
    h('h2', 'What has not changed'),
    p(t('A clear brand, a fast site, and copy that speaks to the customer still do most of the work. AI raises the ceiling; it does not excuse a weak foundation.')),
    h('h2', 'Where we land'),
    p(t('We build AI search optimisation and practical AI features into the work as standard, on top of a brand and site that stand on their own. If you want to be found when people ask an AI, send us a line.')),
  ),
  faq: [
    { question: 'What is GEO and how is it different from SEO?', answer: 'GEO, generative engine optimisation, is about getting cited by AI search tools like ChatGPT and Google AI Overviews. SEO is about ranking in the classic results page. They overlap but are not the same, and in 2026 you want both.' },
    { question: 'Do I need AI features on my website?', answer: 'Only where they genuinely help the customer, such as answering questions or speeding up a booking. AI for its own sake adds clutter. The useful question is whether a feature saves the visitor time.' },
    { question: 'Will AI replace web designers?', answer: 'No, but it changes the job. AI speeds up parts of the work and adds new things to get right, like AI search. Judgement about brand, clarity, and what converts still matters.' },
  ],
});

await post({
  slug: 'conversion-led-web-design', title: 'Conversion-led web design: turning visitors into customers',
  excerpt: 'A beautiful website that nobody acts on is an expensive brochure. Conversion-led design is about turning visitors into enquiries and sales. Here is how it works.',
  metaDescription: 'Conversion-led web design: clarity, proof, speed, and clear calls to action that turn visitors into customers. From russle, a brand and growth agency.',
  date: '2026-07-13', category: guides.id, tags: ['conversion', 'web design', 'growth'],
  content: doc(
    p(t('Conversion-led web design means building a site to turn visitors into customers, not just to look good. A site can be beautiful and still fail if it does not make the next step obvious. Here is what actually moves the numbers.')),
    h('h2', 'Be clear in five seconds'),
    p(t('A visitor should know what you do, who it is for, and what to do next within seconds of landing. Confusion is the biggest leak on most sites.')),
    h('h2', 'One obvious next step per page'),
    p(t('Every page should ask for one thing: book a call, get a quote, start an order. Too many choices and people make none.')),
    h('h2', 'Prove it'),
    p(t('Reviews, results, and real detail turn claims into trust. Specific beats vague every time, and trust is what converts.')),
    h('h2', 'Make it fast'),
    p(t('Speed is a conversion feature. A slow site loses people before they see your offer, and it costs you in search too.')),
    h('h2', 'Measure and improve'),
    p(t('Conversion is not a one-off. Track what people do, find where they drop off, and fix it. Small, steady improvements compound.')),
    h('h2', 'Where we land'),
    p(t('We build sites to convert, then keep improving them through the growth work after launch. If your site looks fine but the enquiries are not coming, send us the link and we will tell you what to fix.')),
  ),
  faq: [
    { question: 'What is conversion-led web design?', answer: 'Designing a website primarily to turn visitors into customers, by being clear, fast, trustworthy, and pointing to one obvious next step on every page, rather than designing only for looks.' },
    { question: 'Why is my website not getting enquiries?', answer: 'Usually because it is unclear, slow, or does not ask for the next step, or because the right people are not finding it. The fix starts with clarity and a single obvious call to action, then traffic.' },
    { question: 'How do I improve my website conversion rate?', answer: 'Make the offer clear in seconds, add proof, speed the site up, give one clear call to action per page, then measure where people drop off and fix the biggest leak first.' },
  ],
});

await post({
  slug: 'how-to-choose-a-brand-agency', title: 'How to choose a brand and web agency',
  excerpt: 'Choosing the agency that builds your brand and website is a big decision. Here are the questions to ask and the warning signs to watch for before you commit.',
  metaDescription: 'How to choose a brand and web agency: portfolio, ownership, results, and the questions to ask first. From russle, a brand and growth agency.',
  date: '2026-07-14', category: guides.id, tags: ['agency', 'hiring', 'brand'],
  content: doc(
    p(t('Choosing the agency that builds your brand and website shapes how your business looks and performs for years. The good news is that a few sharp questions separate the safe choices from the risky ones. Here is what to ask and what to watch for.')),
    h('h2', 'Look at the work, not the words'),
    p(t('A portfolio tells you more than a pitch. Does their work look distinctive and varied, or like the same template recoloured? Can they show results, not just pictures?')),
    h('h2', 'Ask who actually does the work'),
    p(t('Will you work with the people designing and building, or an account manager relaying messages to juniors? The answer tells you a lot about quality and speed.')),
    h('h2', 'Check what you own'),
    p(t('You should own your brand and your site outright, with no lock-in to a platform you cannot leave. Ask plainly what happens if you part ways.')),
    h('h2', 'Understand what happens after launch'),
    p(t('A brand and site are the start, not the end. Ask how they handle the growth afterwards, and whether support is a real relationship or a ticket queue.')),
    h('h2', 'Warning signs'),
    ul('Guarantees of a number-one Google ranking.', 'No clear pricing or scope.', 'A portfolio you cannot verify is live.', 'Pressure to sign before you understand the work.'),
    h('h2', 'Where we land'),
    p(t('russle is built to pass these tests: you work directly with the team, you own everything, and the relationship continues through the growth after launch. Send us a line and ask us anything on this list.')),
  ),
  faq: [
    { question: 'What should I ask a brand and web agency before hiring them?', answer: 'Ask to see live work and results, who will actually do the work, what you own at the end, what happens after launch, and how they price. Clear answers are a good sign; vague ones are not.' },
    { question: 'How much should a brand and website cost?', answer: 'It varies with scope, but expect a fixed project fee for a brand and custom website rather than an hourly guess. Be wary of quotes far below the market, they usually mean a template or corners cut.' },
    { question: 'What are the warning signs of a bad agency?', answer: 'Guaranteed rankings, no clear pricing, a portfolio you cannot verify, heavy lock-in, and pressure to sign quickly. Any one of these is worth pausing over.' },
  ],
});

await post({
  slug: 'signs-you-have-outgrown-your-website', title: 'Signs your business has outgrown its website',
  excerpt: 'A website that was fine at the start can quietly hold a growing business back. Here are the signs it is time to rebuild, and what to do about them.',
  metaDescription: 'Signs your business has outgrown its website: it looks dated, converts poorly, or cannot scale. From russle, a brand and growth agency.',
  date: '2026-07-15', category: guides.id, tags: ['web design', 'rebrand', 'growth'],
  content: doc(
    p(t('A website that did the job when you started can quietly become the thing holding you back. The signs are easy to miss because the site still loads and still works, it just no longer matches where the business is going. Here is what to look for.')),
    h('h2', 'It looks behind your ambition'),
    p(t('If the site looks smaller or older than the business actually is, it sets the wrong expectation before a customer reads a word. Your brand should look like where you are heading, not where you started.')),
    h('h2', 'It does not convert'),
    p(t('Traffic comes but enquiries do not. That usually means the message is unclear, the next step is buried, or the site is too slow to hold attention.')),
    h('h2', 'You cannot change it easily'),
    p(t('If updating a price or adding a page means waiting on someone or fighting a clunky builder, the site is a brake, not an asset.')),
    h('h2', 'It cannot do what you need next'),
    p(t('Outgrowing a template often shows up as a missing capability: a proper store, bookings, AI search, an integration. If the platform cannot follow you, it is time.')),
    h('h2', 'It is invisible in search'),
    p(t('If customers cannot find you in Google or in AI search, the best site in the world cannot help. Visibility is part of the job.')),
    h('h2', 'Where we land'),
    p(t('When a business outgrows its site, we rebuild the brand and site together and put the growth engine behind them so the new site keeps earning. If two or more of these sound familiar, send us a line.')),
  ),
  faq: [
    { question: 'How do I know if I need a new website?', answer: 'If your site looks behind your ambition, brings traffic but few enquiries, is hard to update, cannot do what you need next, or is invisible in search, it is probably time to rebuild rather than patch.' },
    { question: 'Should I rebuild or just refresh my website?', answer: 'A refresh fixes look and copy on a site that still works underneath. A rebuild is right when the platform itself cannot scale or convert. If the foundation is the problem, refreshing only delays it.' },
    { question: 'How often should a business redesign its website?', answer: 'There is no fixed rule, but most businesses get three to five years from a well-built site. The real trigger is need, not age: rebuild when the site stops keeping up with the business.' },
  ],
});

console.log('Batch 7 done.');
