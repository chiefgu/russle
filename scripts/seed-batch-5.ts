/**
 * 30-day calendar, batch 3 (Jun 23-30). Eight posts staged as DRAFTS with
 * randomised 9-11am UK publish times, each with content + 3 FAQs.
 * Run: npx payload run scripts/seed-batch-5.ts  (with DATABASE_URL + PAYLOAD_SECRET)
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

await post({
  slug: 'freelancer-vs-agency-vs-studio', title: 'Freelancer vs agency vs studio: who should build your website?',
  excerpt: 'Freelancer, agency, or studio? Each builds websites differently, at different prices and risks. Here is who suits which kind of business.',
  metaDescription: 'Freelancer vs agency vs studio for your website: cost, quality, risk, and who suits each. An honest guide from russle, a UK web design and SEO studio.',
  date: '2026-06-23', category: comparisons.id, tags: ['freelancer', 'agency', 'web design'],
  content: doc(
    p(t('The honest version: a freelancer is cheapest and most personal but a single point of failure, an agency is the most resourced but the most expensive and least personal, and a studio sits in between with senior people and a close relationship. The right choice depends on your budget and how much support you want.')),
    h('h2', 'A freelancer'),
    ul('Cheapest, and you work directly with the person doing the work.', 'Personal and flexible.', 'The risk: one person, so capacity, illness, or them moving on can leave you stuck.', 'Quality varies hugely, so references matter.'),
    h('h2', 'An agency'),
    ul('The most resourced, with teams for design, build, and strategy.', 'Can handle large, complex projects.', 'The most expensive, with overheads baked into the price.', 'You often deal with account managers rather than the people doing the work, and can feel like a small client.'),
    h('h2', 'A studio'),
    ul('Senior people doing the actual work, without agency overheads.', 'A close, direct relationship like a freelancer, with more reliability.', 'Brand and web under one roof, built as one.', 'More than a freelancer, less than an agency.'),
    h('h2', 'How to choose'),
    ul(lead('Tight budget, simple site:', ' a trusted freelancer.'), lead('Large, complex, well-funded project:', ' an agency.'), lead('Senior, brand-led work and a close relationship:', ' a studio.')),
    h('h2', 'Where we land'),
    p(t('russle is a studio, which is the sweet spot for most ambitious businesses: senior work, a direct relationship, brand and web together, without agency overheads. If that sounds right, send us a line.')),
  ),
  faq: [
    { question: 'Is it better to hire a freelancer or an agency for a website?', answer: 'A freelancer is cheaper and more personal but a single point of failure; an agency is more resourced but pricier and less personal. A studio sits in between. It depends on your budget and the project size.' },
    { question: 'What is the difference between a studio and an agency?', answer: 'A studio is smaller, with senior people doing the actual work and a direct relationship, without the overheads and account-manager layers of a larger agency.' },
    { question: 'How much does it cost to hire someone to build a website?', answer: 'Freelancers are cheapest, agencies the most expensive, with studios in between. What matters more is the thinking and brand work behind the build, which is where the value sits.' },
  ],
});

await post({
  slug: 'how-to-choose-a-web-designer', title: 'How to choose a web designer: questions to ask first',
  excerpt: 'Choosing a web designer is mostly about asking the right questions first. Here are the ones that save you from a disappointing, expensive mistake.',
  metaDescription: 'How to choose a web designer: the key questions to ask about process, ownership, SEO, and results before you hire. From russle, a UK web design and SEO studio.',
  date: '2026-06-24', category: guides.id, tags: ['web designer', 'hiring', 'web design'],
  content: doc(
    p(t('To choose a web designer well, ask about their process, who owns the finished site, how they handle SEO and speed, what happens after launch, and to see results from similar businesses. The answers tell you far more than a portfolio of pretty pictures.')),
    h('h2', 'Start with the outcome, not the look'),
    p(t('A good designer asks what the site is for before talking design. If the first conversation is all about visuals and not about your customers, enquiries, or goals, that is a warning sign.')),
    h('h2', 'Questions worth asking'),
    ul(lead('What is your process?', ' You want a clear path from discovery to launch, not just a promise to design something.'), lead('Who owns the site and content?', ' Make sure you own your domain, content, and ideally the build. Avoid being locked in.'), lead('How do you handle SEO and speed?', ' These decide whether anyone finds and stays on the site. They should have a real answer.'), lead('What happens after launch?', ' Updates, support, and who fixes things. A site is not finished at launch.'), lead('Can I see results, not just designs?', ' Ask what happened for similar businesses after their site went live.')),
    h('h2', 'Watch for the warning signs'),
    ul('No discovery, straight to a quote.', 'Vague answers on ownership or ongoing support.', 'A portfolio that all looks the same, or nothing like your kind of business.', 'A price that seems too good, which usually means a template and little thought.'),
    h('h2', 'Where we land'),
    p(t('We start every project with what the site needs to achieve, build it brand-led and fast, and hand over full ownership. If you are choosing between designers, send us a line and we will give you an honest view, even if it is not us.')),
  ),
  faq: [
    { question: 'What should I ask a web designer before hiring them?', answer: 'Ask about their process, who owns the finished site and content, how they handle SEO and speed, what support comes after launch, and to see results from similar businesses.' },
    { question: 'How do I know if a web designer is any good?', answer: 'Look for a clear process, honest answers on ownership and support, attention to SEO and speed, and real results rather than just attractive designs.' },
    { question: 'Should I own my website and domain?', answer: 'Yes. Always make sure you own your domain and content, and ideally the build, so you are never locked into one provider.' },
  ],
});

await post({
  slug: 'godaddy-vs-hiring-a-designer', title: 'GoDaddy builder vs hiring a designer',
  excerpt: 'GoDaddy’s builder is quick and cheap. A designer costs more and delivers more. Here is honestly which one your business needs.',
  metaDescription: 'GoDaddy website builder vs hiring a designer: cost, quality, SEO, and results compared for a small business. From russle, a UK web design and SEO studio.',
  date: '2026-06-25', category: comparisons.id, tags: ['godaddy', 'web designer', 'comparison'],
  content: doc(
    p(t('GoDaddy’s website builder is the quickest, cheapest way to get a basic site online yourself. A designer costs more but delivers a distinctive, better-performing site built around your business. For anything more than a simple placeholder, a designer is usually the better investment.')),
    h('h2', 'What the GoDaddy builder is good for'),
    ul('Cheap and fast, with hosting bundled in.', 'You can do it yourself, no developer needed.', 'Fine for a simple, single-purpose page.'),
    p(t('The catch: it is a basic template tool. The result looks generic, the SEO control is limited, and you are tied to their system.')),
    h('h2', 'What hiring a designer gives you'),
    ul('A brand-led design made for your business.', 'Proper SEO, speed, and structure.', 'Someone who thinks about what your customers need.', 'Full ownership and room to grow.'),
    p(t('The catch: it costs more and takes longer than clicking a template together.')),
    h('h2', 'How to choose'),
    ul(lead('A simple placeholder on the tightest budget, done yourself:', ' the builder.'), lead('A site that needs to be found, look distinctive, and bring in work:', ' a designer.')),
    h('h2', 'Where we land'),
    p(t('We build brand-led sites because that is what actually brings in customers, and we will say honestly when a builder is enough for now. Tell us about your business and we will give you a straight steer.')),
  ),
  faq: [
    { question: 'Is the GoDaddy website builder any good?', answer: 'For a cheap, simple page you build yourself, it does the job. For a distinctive, well-ranking business site, it is limited, and hiring a designer is usually the better investment.' },
    { question: 'Is it worth paying a designer instead of using a builder?', answer: 'If your website needs to be found and bring in customers, yes. A designer delivers a brand-led, better-performing site. For a simple placeholder, a builder may be enough.' },
    { question: 'Can I move off a GoDaddy site later?', answer: 'Your content can move, but the site itself is tied to GoDaddy’s system, so you would rebuild it elsewhere or as a custom build, which is often the reason people switch.' },
  ],
});

await post({
  slug: 'what-makes-a-good-website', title: 'What makes a good small business website in 2026',
  excerpt: 'A good small business website is clear, fast, trustworthy, and built to turn visitors into enquiries. Here is the checklist that actually matters.',
  metaDescription: 'What makes a good small business website in 2026: clarity, speed, trust, SEO, and conversion. A practical checklist from russle, a UK web design and SEO studio.',
  date: '2026-06-26', category: guides.id, tags: ['website', 'web design', 'small business'],
  content: doc(
    p(t('A good small business website is clear about what you do, fast to load, easy to trust, simple to act on, and findable in search. Get those five right and the design largely takes care of itself. Here is what each one means in real terms.')),
    h('h2', 'Clear in five seconds'),
    p(t('A visitor should know what you do, who it is for, and what to do next within seconds of landing. Lead with a plain statement, not a clever line.')),
    h('h2', 'Fast'),
    p(t('Speed affects both rankings and enquiries. A site that is slow on a phone loses people before they read a word.')),
    h('h2', 'Trustworthy'),
    p(t('Real photography, reviews, clear pricing or a starting point, and a human about page. People buy from businesses they believe.')),
    h('h2', 'Easy to act on'),
    p(t('One obvious next step on every page, and a short, simple way to get in touch. Do not make people hunt or fill in a wall of fields.')),
    h('h2', 'Findable'),
    p(t('Built so search engines, and now AI tools, can understand and recommend it: clear structure, sensible content, and the local details that help you get found.')),
    h('h2', 'Where we land'),
    p(t('We build sites against exactly this checklist, brand-led and made to convert. If you want yours measured against it, send us the link and we will give you an honest read.')),
  ),
  faq: [
    { question: 'What makes a good small business website?', answer: 'Clarity about what you do, fast loading, trust signals like reviews and real photos, an obvious next step, and being findable in search. Built around your customers, not a template.' },
    { question: 'What should every small business website have?', answer: 'A clear headline, an obvious call to action, real proof such as reviews, fast loading, mobile-friendly design, and the local and SEO basics so people can find it.' },
    { question: 'How do I know if my website is good?', answer: 'Check whether a stranger understands what you do in five seconds, whether it loads fast on a phone, whether there is an obvious next step, and whether it builds trust.' },
  ],
});

await post({
  slug: 'cheap-website-vs-investment-website', title: 'Cheap website vs investment website: the honest difference',
  excerpt: 'A cheap website and an investment website both cost money. Only one tends to pay it back. Here is the honest difference.',
  metaDescription: 'Cheap website vs an investment website: what each really costs, and which brings in work for a small business. From russle, a UK web design and SEO studio.',
  date: '2026-06-27', category: comparisons.id, tags: ['website cost', 'investment', 'comparison'],
  content: doc(
    p(t('A cheap website saves you money up front but often costs you enquiries every month. An investment website costs more to build but is made to bring in work and pay itself back. The right choice depends on whether the site is a box to tick or a tool to grow.')),
    h('h2', 'What a cheap website really costs'),
    ul('Low or no up-front cost.', 'A generic, templated look that blends in.', 'Limited SEO, so fewer people find it.', 'Little thought about converting visitors.'),
    p(t('The hidden cost is the enquiries it never brings in. A site no one finds or trusts is the most expensive kind.')),
    h('h2', 'What an investment website gives you'),
    ul('A brand-led design that stands out and builds trust.', 'Proper SEO and speed, so people find it and stay.', 'Structure built to turn visitors into enquiries.', 'Something that earns its cost back over time.'),
    h('h2', 'How to decide'),
    ul(lead('The website is just a formality you need to exist:', ' keep it cheap and simple.'), lead('The website is meant to bring in customers and grow the business:', ' invest in it.')),
    h('h2', 'Where we land'),
    p(t('We build investment websites, made to bring in work rather than just exist, and we will tell you honestly when a simple site is all you need for now. Send us a line and we will give you a straight view.')),
  ),
  faq: [
    { question: 'Is it worth paying more for a website?', answer: 'If the site is meant to bring in customers, yes. A cheap site that no one finds or trusts costs you enquiries every month, which often makes it more expensive in the long run.' },
    { question: 'Why are some websites so cheap?', answer: 'Cheap sites are usually templates with little thought about brand, SEO, or conversion. They get you online but rarely help you stand out or bring in work.' },
    { question: 'How much should a small business website cost?', answer: 'It ranges from a few hundred for a template to several thousand for a custom build. What matters is whether it is built to bring in work, which is where the value sits.' },
  ],
});

await post({
  slug: 'best-website-for-cafes-food-businesses', title: 'Best website platform for cafés and food businesses',
  excerpt: 'Cafés and food businesses have specific website needs: locations, menus, ordering, and a brand that looks as good as the food. Here is what works best.',
  metaDescription: 'The best website platform for cafés and small food businesses: locations, menus, ordering, and brand. A practical guide from russle, a UK web design and SEO studio.',
  date: '2026-06-28', category: comparisons.id, tags: ['cafe website', 'food business', 'best of'],
  content: doc(
    p(t('For most cafés and food businesses, a brand-led custom site or Squarespace handles the essentials best: clear locations and hours, an easy-to-update menu, and a look that matches the food. If you sell and ship products, add Shopify or a custom storefront. The right choice depends on whether you mainly serve in person or also sell online.')),
    h('h2', 'What a food business website actually needs'),
    ul(lead('Locations and hours,', ' easy to find and easy to keep accurate.'), lead('A menu', ' you can update yourself without a developer.'), lead('Strong photography,', ' because people eat with their eyes.'), lead('A brand', ' that looks as good as the food and stands out from the chains.'), lead('Local SEO,', ' so "near me" searches find you.')),
    h('h2', 'The options'),
    ul(lead('Squarespace:', ' clean templates and easy menu pages, good for a single café that mainly serves in person.'), lead('A custom build:', ' the best fit when the brand matters and you are growing across locations. We built Berry Boys, a Manchester açaí brand, a custom multi-store site their team updates themselves.'), lead('Shopify or a custom storefront:', ' if you sell and ship products, like a bakery posting cakes nationwide. We built Beth Bakes Cakes a custom storefront with a bespoke order builder.')),
    h('h2', 'How to choose'),
    ul(lead('A single café serving in person:', ' Squarespace or a brand-led custom site.'), lead('Growing across several locations:', ' a custom build that scales.'), lead('Selling and shipping products:', ' Shopify or a custom storefront.')),
    h('h2', 'Where we land'),
    p(t('We build brand-led sites for food businesses that want to look as good as they taste and grow without limits. Tell us about your place and we will point you the right way.')),
  ),
  faq: [
    { question: 'What is the best website platform for a café?', answer: 'For a single café that mainly serves in person, Squarespace or a brand-led custom site handles locations, hours, and menus well. For multiple locations or selling online, a custom build scales better.' },
    { question: 'How do I add a menu to my café website?', answer: 'Most platforms let you add a menu page you can edit yourself. A custom build can make it fully self-editable, so you update items and prices without a developer.' },
    { question: 'Do food businesses need local SEO?', answer: 'Yes. Most café and takeaway customers search "near me" or by area, so a complete Google Business Profile and location pages are among the most valuable things you can do.' },
  ],
});

await post({
  slug: 'rebrand-vs-refresh', title: 'Do you need a rebrand or a refresh?',
  excerpt: 'Not every tired brand needs a full rebrand. Here is how to tell whether you need a deep rebrand or just a refresh, and what each involves.',
  metaDescription: 'Rebrand vs refresh: how to tell which your business needs, what each involves, and what it costs. An honest guide from russle, a UK web design and SEO studio.',
  date: '2026-06-29', category: guides.id, tags: ['rebrand', 'brand refresh', 'branding'],
  content: doc(
    p(t('You need a refresh if the brand still fits but looks dated, and a rebrand if the business has outgrown or changed what the brand stands for. A refresh updates the look; a rebrand rethinks the foundations. Most businesses need a refresh more often than a full rebrand.')),
    h('h2', 'When a refresh is enough'),
    ul('The brand still represents who you are, it just looks tired.', 'You want to modernise the logo, colours, type, or website.', 'The name and positioning are still right.'),
    p(t('A refresh keeps what works and sharpens the rest. It is faster and cheaper.')),
    h('h2', 'When you need a rebrand'),
    ul('The business has changed: new audience, new offer, new direction.', 'The brand no longer matches what you do or who you serve.', 'The name or positioning is holding you back.', 'You are merging, repositioning, or starting a new chapter.'),
    p(t('A rebrand rethinks the strategy first, then the look. It is a bigger investment.')),
    h('h2', 'How to tell the difference'),
    p(t('Ask whether the problem is how the brand looks or what it stands for. Looks means a refresh. What it stands for means a rebrand.')),
    h('h2', 'Where we land'),
    p(t('We do both, and we will tell you honestly which you actually need, because paying for a full rebrand you do not need is as wasteful as patching one that needs rethinking. Send us a line and we will give you a straight answer.')),
  ),
  faq: [
    { question: 'What is the difference between a rebrand and a refresh?', answer: 'A refresh updates the look of a brand that still fits, such as the logo, colours, and website. A rebrand rethinks the foundations, including strategy, positioning, and sometimes the name.' },
    { question: 'How do I know if I need a rebrand?', answer: 'If the business has changed audience, offer, or direction and the brand no longer matches, you likely need a rebrand. If it just looks dated, a refresh is enough.' },
    { question: 'Is a refresh cheaper than a rebrand?', answer: 'Usually, yes. A refresh keeps the strategy and updates the look, so it is faster and cheaper. A rebrand rethinks the foundations, which takes more time and investment.' },
  ],
});

await post({
  slug: 'is-seo-worth-it-small-business', title: 'Is SEO worth it for a small business? An honest answer',
  excerpt: 'SEO takes time and money, so is it actually worth it for a small business? An honest answer, including when it is not.',
  metaDescription: 'Is SEO worth it for a small business in 2026? An honest look at the costs, the payoff, and when to bother. From russle, a UK web design and SEO studio.',
  date: '2026-06-30', category: guides.id, tags: ['seo', 'small business', 'marketing'],
  content: doc(
    p(t('For most small businesses, yes, SEO is worth it, because it brings in customers who are already looking for what you sell, and it compounds over time unlike paid advertising. It is worth it less if you need results this week or your customers never search for you. Here is the honest picture.')),
    h('h2', 'Why SEO is usually worth it'),
    ul(lead('Intent.', ' People searching for your service are ready to buy. That is the warmest traffic there is.'), lead('It compounds.', ' Unlike paid advertising, which stops the moment you stop paying, SEO keeps working and builds over time.'), lead('Local is winnable.', ' For a local business, ranking for "service near me" is realistic and high value.'), lead('Trust.', ' Ranking well makes you look established.')),
    h('h2', 'When it is worth less'),
    ul('You need customers this week. SEO is a medium-term game, not an instant one.', 'Your customers genuinely do not search for what you do.', 'Your site is broken or invisible, in which case fix the basics first.'),
    h('h2', 'What SEO actually involves'),
    ul('A fast, well-structured website.', 'Content that answers what your customers search for.', 'A strong Google Business Profile and reviews for local search.', 'Time and consistency, more than any clever trick.'),
    h('h2', 'Where we land'),
    p(t('We build SEO into the sites we make and offer ongoing help where it is worth it, and we will tell you honestly when your money is better spent elsewhere for now. Send us a line and we will give you a straight view.')),
  ),
  faq: [
    { question: 'Is SEO worth it for a small business?', answer: 'For most, yes. It brings in customers already searching for what you sell and compounds over time. It is worth less if you need instant results or your customers do not search for you.' },
    { question: 'How long does SEO take to work?', answer: 'Usually a few months to see meaningful movement, longer for competitive terms. It is a medium-term investment that builds, not an instant switch.' },
    { question: 'Is SEO better than paid advertising?', answer: 'They do different jobs. Paid advertising gives instant traffic that stops when you stop paying; SEO takes longer but compounds and keeps working. Many businesses use both.' },
  ],
});

console.log('Batch 3 (Jun 23-30) complete.');
