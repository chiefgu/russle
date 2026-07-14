// Industry landing pages ("Solutions" pattern). Pure data: vignettes are
// passed to IndustryPage by each route, same convention as ServicePage.
// Icons are lucide names resolved via the ICONS registry in IndustryPage.
// Copy rules: no em dashes, no banned words, no overclaims, studio voice is "we".
// No russle pricing anywhere in these fields (enforced by industry-pages.test.ts).

export type IndustryBlock =
  | 'pains'
  | 'build'
  | 'stats'
  | 'flow'
  | 'statement'
  | 'proof'
  | 'reviews'
  | 'vignetteShowcase'
  | 'faq'
  | 'cta';

type FlowNode = { icon?: string; title: string; meta: string };

export type IndustryPageData = {
  slug: string;
  /** Footer link label */
  label: string;
  tag: string;
  h1: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  /** A: copy left, vignette right. B: copy centred, vignette full-width below. C: copy-only hero, vignette mid-page. */
  hero: 'A' | 'B' | 'C';
  blocks: IndustryBlock[];
  buildHeading: string;
  pains: { icon: string; title: string; body: string }[];
  build: { icon: string; title: string; body: string }[];
  stats?: { value: string; label: string }[];
  flow?: { heading: string; from: FlowNode; via: FlowNode & { chips: string[] }; to: FlowNode };
  statement?: string;
  proof?: { slug: string; title: string; line: string; extra?: string };
  showcase?: { heading: string; sub: string };
  faq: { q: string; a: string }[];
  schema: Record<string, unknown>;
};

const provider = { '@type': 'Organization', name: 'russle', url: 'https://russle.co.uk' };

function serviceSchema(name: string, audience: string, description: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web design',
    name,
    description,
    provider,
    areaServed: 'GB',
    audience: { '@type': 'Audience', audienceType: audience },
  };
}

export const INDUSTRIES: Record<string, IndustryPageData> = {
  'food-and-drink': {
    slug: 'food-and-drink',
    label: 'Food & Drink',
    tag: 'Food & Drink',
    h1: 'Websites that sell what you make.',
    intro:
      'Bakeries, cake makers, producers and farm shops are where we do our strongest work. We build sites that take orders while you bake, box and grow, from custom cake enquiries to subscriptions and wholesale.',
    metaTitle: 'Web Design for Bakeries & Food Brands',
    metaDescription:
      'russle designs and builds websites for UK bakeries, cake makers, producers and farm shops. Online ordering, custom enquiries, subscriptions and wholesale.',
    hero: 'A',
    blocks: ['proof', 'flow', 'pains', 'build', 'statement', 'faq', 'cta'],
    buildHeading: 'Everything a food business sells, built in.',
    statement: 'The bakery closes at five. The order book stays open.',
    flow: {
      heading: 'From search to sold, while you bake.',
      from: { icon: 'Search', title: '"Birthday cake near me"', meta: 'Tuesday, 8pm' },
      via: {
        title: 'The order takes itself',
        meta: 'Your site',
        chips: ['Flavour picked', 'Date checked', 'Deposit paid'],
      },
      to: { icon: 'PackageCheck', title: 'Boxed and collected Saturday', meta: 'The outcome' },
    },
    pains: [
      {
        icon: 'MessageSquare',
        title: 'Orders live in your DMs',
        body: 'Instagram messages, missed calls and a paper diary hold up fine until a busy week loses you an order.',
      },
      {
        icon: 'Wallet',
        title: 'Middlemen take a cut',
        body: 'Marketplaces and delivery apps sit between you and your customers, and charge you for the introduction.',
      },
      {
        icon: 'Repeat',
        title: 'You answer the same questions daily',
        body: 'Flavours, sizes, lead times, allergens. A good site answers them while you make things.',
      },
    ],
    build: [
      {
        icon: 'ShoppingBag',
        title: 'Online ordering',
        body: 'Products, variants and collection slots, with payment taken upfront.',
      },
      {
        icon: 'ClipboardList',
        title: 'Custom order enquiries',
        body: 'Structured forms for bespoke work, so every request arrives with the date, size and detail you need.',
      },
      {
        icon: 'Repeat',
        title: 'Subscriptions and repeat orders',
        body: 'Let regulars set and forget, and give yourself predictable weekly volume.',
      },
      { icon: 'Truck', title: 'Wholesale and trade', body: 'Trade price lists and accounts alongside your retail shop.' },
      {
        icon: 'CalendarDays',
        title: 'Stock and collection dates',
        body: 'Sell what you have, cap what you can make, and close the dates you are away.',
      },
      { icon: 'Search', title: 'Found on Google', body: 'Product and location pages structured to rank for what you sell.' },
    ],
    proof: {
      slug: 'bethbakescakes',
      title: 'Beth Bakes Cakes',
      line: 'Beth Bakes Cakes moved from Instagram DMs to her own storefront: custom cake enquiries, collection slots and payments, all run from an iPhone.',
      extra: 'We also built Mum’s Granola and Berry Boys. Food and drink is home ground for us.',
    },
    faq: [
      {
        q: 'Can customers order custom cakes or bespoke products?',
        a: 'Yes. We build structured enquiry forms that capture size, flavour, date and budget, with an approve-and-pay flow so deposits land before the work starts.',
      },
      {
        q: 'Do you handle delivery and collection?',
        a: 'We build collection slots, local delivery zones and national shipping, whichever mix fits how you sell.',
      },
      {
        q: 'Is this Shopify?',
        a: 'It can be. Most food and drink clients run on our own platform, which has no monthly builder fee. If you already run Shopify we build a custom storefront on top of it.',
      },
      {
        q: 'Can I update products and prices myself?',
        a: 'Yes. You get a dashboard and an iOS app for products, stock, orders and collection dates.',
      },
      {
        q: 'What about allergens?',
        a: 'Allergen information is built into product pages properly, not buried in a footer PDF.',
      },
    ],
    schema: serviceSchema(
      'Web design for food and drink businesses',
      'Bakeries, cake makers, food and drink producers, farm shops',
      'Website design and build for UK bakeries, producers and farm shops: online ordering, custom enquiries, subscriptions and wholesale.',
    ),
  },

  'hair-and-beauty': {
    slug: 'hair-and-beauty',
    label: 'Hair & Beauty',
    tag: 'Hair & Beauty',
    h1: 'A website that fills your diary.',
    intro:
      'Salons, barbers, makeup artists and aesthetics clinics. We design sites that look as good as your work and turn browsers into booked appointments, with deposits taken at the moment of booking.',
    metaTitle: 'Web Design for Salons, Barbers & Beauty',
    metaDescription:
      'russle designs and builds websites for UK salons, barbers, makeup artists and clinics. Online booking with deposits, portfolios that convert, local search.',
    hero: 'B',
    blocks: ['pains', 'build', 'flow', 'proof', 'faq', 'cta'],
    buildHeading: 'Booked, paid, and back next month.',
    flow: {
      heading: 'From search to booked.',
      from: { icon: 'Search', title: '"Balayage near me"', meta: 'Sunday night' },
      via: {
        title: 'Booked and held with a deposit',
        meta: 'Your site',
        chips: ['Stylist picked', 'Deposit paid', 'Reminder set'],
      },
      to: { icon: 'CalendarCheck', title: 'A diary that shows up', meta: 'The outcome' },
    },
    pains: [
      {
        icon: 'CalendarX',
        title: 'No-shows cost you money',
        body: 'An empty chair is unpaid time. Deposits at booking change behaviour overnight.',
      },
      {
        icon: 'Camera',
        title: 'Instagram does the heavy lifting',
        body: 'Your portfolio lives on the grid, but a grid cannot take bookings or rank on Google.',
      },
      {
        icon: 'Lock',
        title: 'Booking apps own your clients',
        body: 'Third-party booking platforms market rival salons to the client list you built.',
      },
    ],
    build: [
      {
        icon: 'CalendarCheck',
        title: 'Online booking',
        body: 'Clients pick a service, a person and a slot, and pay a deposit to hold it.',
      },
      {
        icon: 'Eye',
        title: 'A portfolio that converts',
        body: 'Your work presented properly, with each service linked straight to booking.',
      },
      { icon: 'Tags', title: 'Price lists that stay current', body: 'Update services and prices yourself in minutes.' },
      {
        icon: 'Star',
        title: 'Reviews built in',
        body: 'Google reviews pulled onto the site, and a flow that asks happy clients to leave one.',
      },
      {
        icon: 'MapPin',
        title: 'Local search',
        body: 'Structured to rank for treatments in your town, not just for your name.',
      },
      {
        icon: 'Gift',
        title: 'Gift vouchers',
        body: 'Vouchers sold from the site and paid upfront, ready for birthdays and Christmas.',
      },
    ],
    proof: {
      slug: 'makeup-by-abigail',
      title: 'Makeup by Abigail',
      line: 'Makeup by Abigail books bridal work through a site that shows the portfolio properly and captures every enquiry detail before the first reply.',
    },
    faq: [
      {
        q: 'Can it take deposits?',
        a: 'Yes. Deposits are taken at booking, which is the single biggest fix for no-shows.',
      },
      {
        q: 'Does it work with my existing booking system?',
        a: 'Usually. We integrate the system you already use, or build booking into the site itself so you stop paying per-booking fees.',
      },
      {
        q: 'Will it look like every other salon site?',
        a: 'No. Every site is designed from scratch around your brand and your work. No templates.',
      },
      {
        q: 'Can I update prices and services myself?',
        a: 'Yes. You get a dashboard to manage services, prices and the portfolio.',
      },
    ],
    schema: serviceSchema(
      'Web design for hair and beauty businesses',
      'Salons, barbers, makeup artists, aesthetics clinics',
      'Website design and build for UK salons, barbers and beauty professionals: online booking with deposits, portfolios and local search.',
    ),
  },

  trades: {
    slug: 'trades',
    label: 'Trades',
    tag: 'Trades',
    h1: 'The website that wins you the job.',
    intro:
      'Builders, electricians, landscapers and installers. When word of mouth slows down, your website is your next best sales tool: proof of your work, quick quote requests, and the reviews that close the deal.',
    metaTitle: 'Web Design for Trades & Home Improvement',
    metaDescription:
      'russle designs and builds websites for UK trades: builders, electricians, landscapers and installers. Job galleries, quote requests and reviews that win work.',
    hero: 'A',
    blocks: ['stats', 'flow', 'build', 'statement', 'faq', 'cta'],
    buildHeading: 'The job pipeline, on your own domain.',
    statement: 'Word of mouth got you here. The website takes it from here.',
    flow: {
      heading: 'From search to booked job.',
      from: { icon: 'Search', title: '"Loft conversion quotes"', meta: 'The search' },
      via: {
        title: 'Photos in, quote out',
        meta: 'Your site',
        chips: ['Job photos attached', 'Quote from real info', 'Review earned'],
      },
      to: { icon: 'Award', title: 'The job, booked', meta: 'The outcome' },
    },
    stats: [
      { value: 'One team', label: 'Design, build and SEO under one roof.' },
      { value: 'No templates', label: 'Every site is designed from scratch around your work.' },
      { value: 'Yours', label: 'You own the site, the domain and the content outright.' },
    ],
    pains: [
      {
        icon: 'Search',
        title: 'Word of mouth checks you out first',
        body: 'Referrals still search your name before they call. The site confirms you are the right choice.',
      },
      {
        icon: 'FileQuestion',
        title: 'Quotes from thin information',
        body: 'A name and a number means a site visit before you can price anything.',
      },
      {
        icon: 'Star',
        title: 'Your reviews are scattered',
        body: 'Checkatrade, Google and Facebook each hold a piece of your reputation.',
      },
    ],
    build: [
      {
        icon: 'Camera',
        title: 'A gallery that sells',
        body: 'Job photos organised by type of work, because that is what buyers check first.',
      },
      {
        icon: 'FileText',
        title: 'Quote request forms',
        body: 'Structured enquiries with photos attached, so you price from real information.',
      },
      {
        icon: 'Star',
        title: 'Reviews front and centre',
        body: 'Google reviews on the site, and a link that makes leaving one easy.',
      },
      {
        icon: 'MapPin',
        title: 'Area pages that rank',
        body: 'Pages for the towns you cover, written properly rather than copy-pasted.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Trust where it counts',
        body: 'Gas Safe, NICEIC, TrustMark: whichever accreditations you hold, shown at the decision moment.',
      },
      {
        icon: 'PhoneCall',
        title: 'Urgent work routing',
        body: 'Click-to-call on mobile, and emergency enquiries flagged so you see them first.',
      },
    ],
    faq: [
      {
        q: 'Most of my work is word of mouth. Why bother?',
        a: 'Because word of mouth checks you out online before calling. The site confirms the recommendation, and keeps the pipeline moving when referrals go quiet.',
      },
      {
        q: 'Can customers send photos with an enquiry?',
        a: 'Yes. Quote forms take photos and job details, so you arrive at the pricing conversation informed.',
      },
      {
        q: 'Do you write the content?',
        a: 'Yes. You talk, we write. Most trades clients give us an hour on the phone and a folder of job photos.',
      },
      {
        q: 'How fast can it go live?',
        a: 'Most trades sites go from kickoff to live in a few weeks, depending on how quickly photos and sign-off come back.',
      },
    ],
    schema: serviceSchema(
      'Web design for trades and home improvement',
      'Builders, electricians, plumbers, landscapers, installers',
      'Website design and build for UK trades: job galleries, quote request forms, review integration and local area pages.',
    ),
  },

  hospitality: {
    slug: 'hospitality',
    label: 'Hospitality',
    tag: 'Hospitality',
    h1: 'More covers, fewer no-shows.',
    intro:
      'Cafes, restaurants and bars. We build sites that take bookings directly, show the menu without a PDF download, and stop third-party apps taxing your tables.',
    metaTitle: 'Web Design for Cafes, Restaurants & Bars',
    metaDescription:
      'russle designs and builds websites for UK cafes, restaurants and bars. Direct table bookings, menus that stay current, commission-free ordering.',
    hero: 'A',
    blocks: ['flow', 'pains', 'build', 'statement', 'faq', 'cta'],
    buildHeading: 'Bookings, menus and orders, direct.',
    statement: 'Every table booked direct is margin kept.',
    flow: {
      heading: 'From search to seated.',
      from: { icon: 'Search', title: '"Brunch near me"', meta: 'Thursday, 9pm' },
      via: {
        title: 'Menu read, table picked',
        meta: 'Your site',
        chips: ['Menu on the page', 'Table for four', 'Reminder set'],
      },
      to: { icon: 'UtensilsCrossed', title: 'A full table that shows up', meta: 'Saturday' },
    },
    pains: [
      {
        icon: 'FileText',
        title: 'The PDF menu',
        body: 'Nobody wants to pinch-zoom a PDF on a phone, and Google cannot read one properly either.',
      },
      {
        icon: 'Percent',
        title: 'Delivery apps eat the margin',
        body: 'Commission on every order, and they keep the customer data for themselves.',
      },
      {
        icon: 'CalendarX',
        title: 'No-shows on the busy nights',
        body: 'A table held for a no-show is a table you turned other guests away for.',
      },
    ],
    build: [
      {
        icon: 'CalendarCheck',
        title: 'Table bookings',
        body: 'Bookings on your own site, with confirmations and reminders that cut no-shows.',
      },
      {
        icon: 'UtensilsCrossed',
        title: 'Menus that stay current',
        body: 'Update dishes and prices yourself. No PDFs, no reprints, readable on a phone.',
      },
      {
        icon: 'QrCode',
        title: 'Commission-free ordering',
        body: 'Takeaway and order-at-table direct from your site, with nothing skimmed per order.',
      },
      {
        icon: 'Ticket',
        title: 'Events and private hire',
        body: 'Enquiry flows for the bookings that carry the real margin.',
      },
      {
        icon: 'Search',
        title: 'Found for the right searches',
        body: 'Structured so brunch near me finds you, not just people who already know your name.',
      },
      {
        icon: 'Gift',
        title: 'Vouchers and experiences',
        body: 'Gift vouchers and tasting menus sold directly, paid before the visit.',
      },
    ],
    faq: [
      {
        q: 'Can bookings integrate with what we use now?',
        a: 'Yes. We work with the reservation system you run, or build booking into the site itself.',
      },
      {
        q: 'Can we take takeaway orders without a delivery app?',
        a: 'Yes. Direct ordering from your own site with no per-order commission.',
      },
      {
        q: 'Who updates the menu?',
        a: 'You do, from a dashboard, in minutes. Eighty-six a dish on a Friday night from your phone.',
      },
      {
        q: 'Do you help with photography?',
        a: 'We art-direct it. Good food photography earns its cost back quickly, and we will tell you honestly if yours needs redoing.',
      },
    ],
    schema: serviceSchema(
      'Web design for hospitality businesses',
      'Cafes, restaurants, bars, pubs',
      'Website design and build for UK hospitality: direct table bookings, live menus, commission-free takeaway ordering.',
    ),
  },

  dentists: {
    slug: 'dentists',
    label: 'Dentists',
    tag: 'Dentists & Clinics',
    h1: 'A website that books new patients.',
    intro:
      'Dentists, clinics and private healthcare. Choosing a dentist is a trust decision, so we design sites that feel as professional as the care, and make booking a first appointment effortless.',
    metaTitle: 'Web Design for Dentists & Clinics',
    metaDescription:
      'russle designs and builds websites for UK dentists and private clinics. New patient journeys, treatment pages that rank, online booking and reviews.',
    hero: 'B',
    blocks: ['pains', 'flow', 'build', 'stats', 'faq', 'cta'],
    buildHeading: 'Everything a growing clinic needs.',
    flow: {
      heading: 'From search to first appointment.',
      from: { icon: 'Search', title: '"Invisalign near me"', meta: 'Tuesday, 10pm' },
      via: {
        title: 'Questions answered, fees clear',
        meta: 'Your site',
        chips: ['Treatment explained', 'Fees upfront', 'Book online'],
      },
      to: { icon: 'UserPlus', title: 'A new patient, booked', meta: 'The outcome' },
    },
    stats: [
      { value: 'One team', label: 'Design, build and SEO under one roof.' },
      { value: 'Sign-off', label: 'Every clinical claim is approved by you before it ships.' },
      { value: 'Yours', label: 'You own the site, the domain and the content outright.' },
    ],
    pains: [
      {
        icon: 'Eye',
        title: 'New patients judge in seconds',
        body: 'A dated site reads as a dated clinic, fairly or not.',
      },
      {
        icon: 'Phone',
        title: 'The phone is the only front door',
        body: 'If booking means calling in office hours, the evening browsers are gone by morning.',
      },
      {
        icon: 'Search',
        title: 'Treatment searches pass you by',
        body: 'Implants, aligners and whitening are searched constantly. Generic pages do not surface.',
      },
    ],
    build: [
      {
        icon: 'UserPlus',
        title: 'New patient journeys',
        body: 'From first search to booked appointment with as little friction as we can engineer.',
      },
      {
        icon: 'FileText',
        title: 'Treatment pages that rank',
        body: 'A page per treatment, written to answer real questions and structured for search.',
      },
      {
        icon: 'CalendarCheck',
        title: 'Online booking and enquiries',
        body: 'Book or enquire out of hours, integrated with your patient system where it allows.',
      },
      {
        icon: 'Star',
        title: 'Reviews and team',
        body: 'Google reviews on the site and team pages that put faces to the clinic.',
      },
      {
        icon: 'Tags',
        title: 'Clear fees',
        body: 'Treatment and fee pages that pre-qualify patients before they call.',
      },
      {
        icon: 'CreditCard',
        title: 'Membership plans',
        body: 'Plan pages that explain the options and sign patients up without a phone call.',
      },
    ],
    faq: [
      {
        q: 'Can patients book online?',
        a: 'Yes. We integrate the booking system you run where it allows it, and build clean enquiry flows where it does not.',
      },
      {
        q: 'Do you write the treatment pages?',
        a: 'Yes, with your clinical sign-off on every claim before anything goes live.',
      },
      {
        q: 'Do you understand healthcare advertising rules?',
        a: 'We write conservatively, avoid outcome promises, and build your compliance review into the process.',
      },
      {
        q: 'Can the site grow with the clinic?',
        a: 'Yes. Adding treatments, team members or a second location is routine, not a rebuild.',
      },
    ],
    schema: serviceSchema(
      'Web design for dentists and clinics',
      'Dentists, dental clinics, private healthcare clinics',
      'Website design and build for UK dentists and clinics: new patient journeys, treatment pages, online booking and reviews.',
    ),
  },

  'financial-services': {
    slug: 'financial-services',
    label: 'Financial Services',
    tag: 'Financial Services',
    h1: 'A website that earns trust first.',
    intro:
      'Advisers, brokers and accountants. Nobody hands their finances to a site that feels flimsy. We design calm, credible sites that turn careful researchers into booked consultations.',
    metaTitle: 'Web Design for Financial Services',
    metaDescription:
      'russle designs and builds websites for UK advisers, brokers and accountants. Credible design, consultation booking, calculators and qualified enquiries.',
    hero: 'A',
    blocks: ['pains', 'build', 'statement', 'stats', 'faq', 'cta'],
    buildHeading: 'Credibility first, then conversion.',
    statement: 'Trust is won before the first meeting.',
    stats: [
      { value: 'One team', label: 'Design, build and SEO under one roof.' },
      { value: 'Sign-off', label: 'Your compliance review is built into our copy process.' },
      { value: 'No templates', label: 'Every site is designed from scratch around your firm.' },
    ],
    pains: [
      {
        icon: 'ShieldCheck',
        title: 'Credibility is the product',
        body: 'Your website is the first due diligence a client runs on you.',
      },
      {
        icon: 'Mail',
        title: 'Enquiries arrive cold',
        body: 'A name and a number tells you nothing. Structured enquiries arrive half-qualified.',
      },
      {
        icon: 'Scale',
        title: 'Promotion rules make copy hard',
        body: 'Financial promotions rules turn every sentence into a decision. We write around them with you.',
      },
    ],
    build: [
      {
        icon: 'CalendarCheck',
        title: 'Consultation booking',
        body: 'A calendar on the site, so a good first impression becomes a meeting immediately.',
      },
      {
        icon: 'Calculator',
        title: 'Calculators',
        body: 'Mortgage, repayment and savings calculators that keep visitors engaged and informed.',
      },
      {
        icon: 'ClipboardList',
        title: 'Qualified enquiries',
        body: 'Structured forms that capture situation and needs before the first call.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Credentials that reassure',
        body: 'Regulatory status, qualifications and memberships presented where they count.',
      },
      {
        icon: 'TrendingUp',
        title: 'Insight that ranks',
        body: 'A publishing setup for the guides and answers your clients actually search for.',
      },
      {
        icon: 'FileText',
        title: 'Plain-English services',
        body: 'What you do, who it is for and what happens next, written without jargon.',
      },
    ],
    faq: [
      {
        q: 'How do you handle financial promotions rules?',
        a: 'We write conservatively and build your compliance sign-off into the process. You approve every claim before it ships.',
      },
      {
        q: 'Can you build calculators?',
        a: 'Yes, custom to your products and rates, and designed to match the rest of the site.',
      },
      {
        q: 'Can clients book a consultation directly?',
        a: 'Yes. We embed your calendar or build booking natively, so interest converts while it is warm.',
      },
      {
        q: 'Who owns the site?',
        a: 'You do. Site, domain and content are yours outright, hosted wherever suits you.',
      },
    ],
    schema: serviceSchema(
      'Web design for financial services',
      'Financial advisers, mortgage brokers, accountants, wealth managers',
      'Website design and build for UK financial services firms: credible design, consultation booking, calculators and qualified enquiries.',
    ),
  },

  solicitors: {
    slug: 'solicitors',
    label: 'Solicitors',
    tag: 'Solicitors & Law',
    h1: 'Serious work deserves a serious website.',
    intro:
      'Solicitors, firms and chambers. Clients arrive stressed and compare three firms in an evening. We build sites that answer their first questions, prove your record, and make the first step feel safe.',
    metaTitle: 'Web Design for Solicitors & Law Firms',
    metaDescription:
      'russle designs and builds websites for UK solicitors and law firms. Case-type enquiry flows, service pages that rank, and client journeys that feel safe.',
    hero: 'A',
    blocks: ['pains', 'flow', 'build', 'statement', 'faq', 'cta'],
    buildHeading: 'The firm, properly presented.',
    statement: 'Clients shortlist in an evening. Make the list.',
    flow: {
      heading: 'From search to the right desk.',
      from: { icon: 'Search', title: '"Employment solicitor near me"', meta: 'The search' },
      via: {
        title: 'Triage happens on the site',
        meta: 'Your site',
        chips: ['Case type picked', 'Details attached', 'Callback booked'],
      },
      to: { icon: 'Users', title: 'The right team, first time', meta: 'The outcome' },
    },
    pains: [
      {
        icon: 'ListChecks',
        title: 'Every client compares',
        body: 'Shortlists are built online before anyone calls. If the site undersells the firm, you are off the list before the first conversation.',
      },
      {
        icon: 'FileQuestion',
        title: 'Enquiries need triage',
        body: 'A vague contact form wastes fee-earner time. Case-type flows route enquiries to the right desk with the basics attached.',
      },
      {
        icon: 'TrendingDown',
        title: 'Directories outrank you',
        body: 'Legal directories rank for your own services. Purpose-built service pages take that traffic back.',
      },
    ],
    build: [
      {
        icon: 'Split',
        title: 'Case-type enquiry flows',
        body: 'Clients pick the matter, answer the essentials, and land with the right person.',
      },
      {
        icon: 'Scale',
        title: 'A page per area of law',
        body: 'Written to answer the questions clients search, structured to rank for them.',
      },
      {
        icon: 'Users',
        title: 'People pages that persuade',
        body: 'Profiles that read like the person, not a CV template.',
      },
      {
        icon: 'Eye',
        title: 'Transparency built in',
        body: 'The price and service information the SRA requires, designed rather than bolted on.',
      },
      {
        icon: 'Award',
        title: 'Proof of record',
        body: 'Testimonials, accreditations and outcomes presented within the rules.',
      },
      {
        icon: 'Clock',
        title: 'Out-of-hours capture',
        body: 'Enquiries arrive at midnight. Callback requests queue for the morning with the details attached.',
      },
    ],
    faq: [
      {
        q: 'Are enquiries confidential?',
        a: 'Yes. Enquiries are encrypted in transit, sent only to the addresses you nominate, and we minimise what is stored.',
      },
      {
        q: 'Do you handle SRA transparency requirements?',
        a: 'We design the required price and service information into the site properly, with your compliance sign-off.',
      },
      {
        q: 'Can different departments get their own enquiries?',
        a: 'Yes. Case-type flows route each enquiry to the right team with the basics already captured.',
      },
      {
        q: 'Can we edit content ourselves?',
        a: 'Yes. Fee-earner profiles, insights and service pages are all editable from a dashboard.',
      },
    ],
    schema: serviceSchema(
      'Web design for solicitors and law firms',
      'Solicitors, law firms, chambers',
      'Website design and build for UK solicitors and law firms: case-type enquiry flows, service pages that rank, SRA transparency built in.',
    ),
  },

  fashion: {
    slug: 'fashion',
    label: 'Fashion',
    tag: 'Fashion & Apparel',
    h1: 'A storefront as sharp as the clothes.',
    intro:
      'Fashion and apparel brands live or die on presentation. We build editorial storefronts with the drop mechanics to match: waitlists, back-in-stock alerts and a checkout that keeps up.',
    metaTitle: 'Web Design for Fashion & Apparel Brands',
    metaDescription:
      'russle designs and builds ecommerce for UK fashion and apparel brands. Editorial storefronts, drops and waitlists, back-in-stock alerts, Shopify or our platform.',
    hero: 'B',
    blocks: ['build', 'flow', 'pains', 'statement', 'faq', 'cta'],
    buildHeading: 'Drop mechanics, editorial finish.',
    statement: 'The drop sells out. The brand stays yours.',
    flow: {
      heading: 'From drop to sold out.',
      from: { icon: 'Bell', title: 'The drop goes live', meta: 'Friday, 6pm' },
      via: {
        title: 'The list does the selling',
        meta: 'Your site',
        chips: ['Waitlist notified', 'Early access', 'Back-in-stock alerts'],
      },
      to: { icon: 'ShoppingBag', title: 'Sold through, list grown', meta: 'The outcome' },
    },
    pains: [
      {
        icon: 'Layers',
        title: 'Templates flatten the brand',
        body: 'A distinctive label on the same theme as everyone else stops being distinctive.',
      },
      {
        icon: 'MessageSquare',
        title: 'Drops outgrow the DMs',
        body: 'Releasing stock through stories and messages caps how big a drop can get.',
      },
      {
        icon: 'RotateCcw',
        title: 'Returns eat the margin',
        body: 'Honest product pages and proper size guidance cut returns before they happen.',
      },
    ],
    build: [
      {
        icon: 'Camera',
        title: 'Editorial product pages',
        body: 'Lookbook-grade presentation with the detail shots that sell the make.',
      },
      {
        icon: 'Timer',
        title: 'Drops and waitlists',
        body: 'Timed releases, early access and waitlists that build pressure properly.',
      },
      {
        icon: 'Bell',
        title: 'Back-in-stock alerts',
        body: 'Sold out becomes a mailing list instead of a missed sale.',
      },
      {
        icon: 'Ruler',
        title: 'Size guidance that fits',
        body: 'Per-garment guidance that cuts returns and support messages.',
      },
      {
        icon: 'Store',
        title: 'Shopify or our platform',
        body: 'A custom storefront on the Shopify store you run, or our own platform with no monthly builder fee.',
      },
      {
        icon: 'Mail',
        title: 'List building',
        body: 'Email and SMS capture wired into drops, because the list sells the next release.',
      },
    ],
    faq: [
      {
        q: 'Shopify or something else?',
        a: 'Either. If you run Shopify we design and build a custom storefront on top of it. Otherwise our own platform handles products, stock, orders and payments with no monthly builder fee.',
      },
      {
        q: 'Can you handle drops?',
        a: 'Yes. Timed releases, waitlists, early access links and back-in-stock alerts are all standard builds for us.',
      },
      {
        q: 'Do you art-direct photography?',
        a: 'Yes. The storefront is only as strong as the imagery, so we plan shoots with you rather than around you.',
      },
      {
        q: 'Can we sell internationally?',
        a: 'Yes. Multi-currency display and international shipping rules, set up per market.',
      },
    ],
    schema: serviceSchema(
      'Web design for fashion and apparel brands',
      'Fashion brands, apparel brands, accessories brands',
      'Ecommerce design and build for UK fashion and apparel brands: editorial storefronts, drops, waitlists and back-in-stock alerts.',
    ),
  },
};

export const INDUSTRY_SLUGS = Object.keys(INDUSTRIES);

export const INDUSTRY_LINKS = Object.values(INDUSTRIES).map((d) => ({
  label: d.label,
  href: `/${d.slug}`,
}));
