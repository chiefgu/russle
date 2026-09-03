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
  build: { icon: string; title: string; body: string; detail: string }[];
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
    blocks: ['proof', 'flow', 'pains', 'build', 'faq', 'cta'],
    buildHeading: 'Everything a food business sells, built in.',
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
        title: 'Middlemen own the relationship',
        body: 'Marketplaces and delivery apps sit between you and your customers, and keep the customer data for themselves.',
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
        detail:
          'Customers choose products and variants, pick a collection slot or delivery option, and pay before you lift a whisk. Orders land in one place with the details right, and nothing gets lost in a chat thread.',
      },
      {
        icon: 'ClipboardList',
        title: 'Custom order enquiries',
        body: 'Structured forms for bespoke work, so every request arrives with the date, size and detail you need.',
        detail:
          'The form asks what you need to quote: occasion, servings, date, flavours, budget and photos. You reply with a price, the customer approves and pays a deposit, and the job is booked.',
      },
      {
        icon: 'Repeat',
        title: 'Subscriptions and repeat orders',
        body: 'Let regulars set and forget, and give yourself predictable weekly volume.',
        detail:
          'Weekly boxes, monthly bakes or standing wholesale lines. Customers manage their own subscription, payments collect automatically, and you see the volume before you plan production.',
      },
      { icon: 'Truck', title: 'Wholesale and trade', body: 'Trade price lists and accounts alongside your retail shop.',
        detail:
          'Approved trade customers log in to their own price list and order in bulk. Retail shoppers never see trade prices, and a repeat wholesale order takes a minute to place.' },
      {
        icon: 'CalendarDays',
        title: 'Stock and collection dates',
        body: 'Sell what you have, cap what you can make, and close the dates you are away.',
        detail:
          'Set how many you can make and the site stops selling at the cap. Close dates for holidays and markets, and open pre-orders for the big weeks like Christmas and Mothering Sunday.',
      },
      { icon: 'Search', title: 'Found on Google', body: 'Product and location pages structured to rank for what you sell.',
        detail:
          'Each product and category page is structured so search engines understand what you sell and where you are. That is what surfaces you for searches like wedding cakes near me.' },
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
        a: 'It can be. Most food and drink clients run on our own platform, built and looked after by us. If you already run Shopify we build a custom storefront on top of it.',
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
        detail:
          'Clients pick a service, a person and a time from live availability, then pay a deposit to lock it in. Confirmations and reminders go out automatically, and the diary updates without you touching it.',
      },
      {
        icon: 'Eye',
        title: 'A portfolio that converts',
        body: 'Your work presented properly, with each service linked straight to booking.',
        detail:
          'Galleries organised by service, with each set of work linked to the booking flow for that service. Someone admiring balayage books balayage in two taps.',
      },
      { icon: 'Tags', title: 'Price lists that stay current', body: 'Update services and prices yourself in minutes.',
        detail:
          'Services, durations and prices live in a dashboard you control. Change a price once and it updates everywhere, including the booking flow.' },
      {
        icon: 'Star',
        title: 'Reviews built in',
        body: 'Google reviews pulled onto the site, and a flow that asks happy clients to leave one.',
        detail:
          'Your Google reviews display on the site automatically, and after each appointment clients get a simple link to leave one. The count climbs without you asking twice.',
      },
      {
        icon: 'MapPin',
        title: 'Local search',
        body: 'Structured to rank for treatments in your town, not just for your name.',
        detail:
          'Treatment pages structured for searches like balayage in your town, plus a Google Business Profile setup so you appear on the map when locals search.',
      },
      {
        icon: 'Gift',
        title: 'Gift vouchers',
        body: 'Vouchers sold from the site and paid upfront, ready for birthdays and Christmas.',
        detail:
          'Sold online, paid upfront, delivered by email with a code you redeem in the chair. December takes care of itself.',
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
    blocks: ['stats', 'flow', 'build', 'faq', 'cta'],
    buildHeading: 'The job pipeline, on your own domain.',
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
      { value: 'Direct', label: 'Enquiries and orders come straight to you, with the details attached.' },
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
        detail:
          'Job photos organised by type of work, each with a line on what was done. Buyers scroll a gallery before they read a word, so this is the first thing we get right.',
      },
      {
        icon: 'FileText',
        title: 'Quote request forms',
        body: 'Structured enquiries with photos attached, so you price from real information.',
        detail:
          'Customers describe the job, attach photos and add access details. You price from real information, and the time-wasters filter themselves out.',
      },
      {
        icon: 'Star',
        title: 'Reviews front and centre',
        body: 'Google reviews on the site, and a link that makes leaving one easy.',
        detail:
          'Google reviews pulled onto the site automatically, plus a link you can text a happy customer from the van. The reputation you earned, working in one place.',
      },
      {
        icon: 'MapPin',
        title: 'Area pages that rank',
        body: 'Pages for the towns you cover, written properly rather than copy-pasted.',
        detail:
          'A written page for each town you cover, with real local detail rather than the same paragraph with the town name swapped. That is the difference between ranking and not.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Trust where it counts',
        body: 'Gas Safe, NICEIC, TrustMark: whichever accreditations you hold, shown at the decision moment.',
        detail:
          'Accreditations, insurance and memberships shown next to the quote button, where the decision actually happens.',
      },
      {
        icon: 'PhoneCall',
        title: 'Urgent work routing',
        body: 'Click-to-call on mobile, and emergency enquiries flagged so you see them first.',
        detail:
          'Emergency enquiries get flagged and jump the queue, and on mobile your number is one tap away. When a pipe bursts, nobody fills in a long form.',
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
      'Cafes, restaurants and bars. We build sites that take bookings directly, show the menu without a PDF download, and take orders direct instead of through a third-party app.',
    metaTitle: 'Web Design for Cafes, Restaurants & Bars',
    metaDescription:
      'russle designs and builds websites for UK cafes, restaurants and bars. Direct table bookings, menus that stay current, ordering from your own site.',
    hero: 'A',
    blocks: ['flow', 'pains', 'build', 'faq', 'cta'],
    buildHeading: 'Bookings, menus and orders, direct.',
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
        title: 'Booking platforms own your diners',
        body: 'Take bookings through a third-party platform and the diner belongs to it, along with their details and the repeat visit.',
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
        detail:
          'Guests book from the site in seconds, get an instant confirmation and a reminder before they arrive. Walk-ins still matter, but the book fills itself.',
      },
      {
        icon: 'UtensilsCrossed',
        title: 'Menus that stay current',
        body: 'Update dishes and prices yourself. No PDFs, no reprints, readable on a phone.',
        detail:
          'Menus are pages, not PDFs. Update a dish or a price from your phone and it is live before the next table sits down.',
      },
      {
        icon: 'Star',
        title: 'Reviews that fill tables',
        body: 'Your Google reviews on the site, and an easy way to ask happy diners to leave one.',
        detail:
          'Google reviews pulled onto the site where they reassure new diners, plus a simple link you can share after a visit so the good nights turn into more bookings.',
      },
      {
        icon: 'Ticket',
        title: 'Events and private hire',
        body: 'Enquiry flows for the bookings that carry the real margin.',
        detail:
          'A proper enquiry flow for parties, functions and full hires: date, numbers, budget and requirements captured upfront, so you quote the real job.',
      },
      {
        icon: 'Search',
        title: 'Found for the right searches',
        body: 'Structured so brunch near me finds you, not just people who already know your name.',
        detail:
          'Structured so you surface for dishes, occasions and area searches, not just your name. Sunday roast near me is a search worth winning.',
      },
      {
        icon: 'Gift',
        title: 'Vouchers and experiences',
        body: 'Gift vouchers and tasting menus sold directly, paid before the visit.',
        detail:
          'Gift vouchers, tasting menus and experiences sold online and paid upfront. Money in the till before a plate is served.',
      },
    ],
    faq: [
      {
        q: 'Can bookings integrate with what we use now?',
        a: 'Yes. We work with the reservation system you run, or build booking into the site itself.',
      },
      {
        q: 'Can guests view the menu from a QR code on the table?',
        a: 'Yes. A QR code opens the live menu page on their phone, so it is always current and there is nothing to reprint.',
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
      'Website design and build for UK hospitality: direct table bookings, live menus, events and private hire.',
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
    blocks: ['pains', 'flow', 'build', 'faq', 'cta'],
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
      { value: 'Direct', label: 'Enquiries and orders come straight to you, with the details attached.' },
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
        detail:
          'Every page points a new patient at one clear next step, whether that is booking online or requesting a callback. Less friction, more first appointments.',
      },
      {
        icon: 'FileText',
        title: 'Treatment pages that rank',
        body: 'A page per treatment, written to answer real questions and structured for search.',
        detail:
          'One page per treatment, answering what patients actually ask: what it involves, how long it takes and what the alternatives are. Structured so search engines serve it up.',
      },
      {
        icon: 'CalendarCheck',
        title: 'Online booking and enquiries',
        body: 'Book or enquire out of hours, integrated with your patient system where it allows.',
        detail:
          'Patients book or enquire at ten at night, which is when they actually research. We integrate with your patient system where it allows, and build clean flows where it does not.',
      },
      {
        icon: 'Star',
        title: 'Reviews and team',
        body: 'Google reviews on the site and team pages that put faces to the clinic.',
        detail:
          'Google reviews on the site and profile pages that put names and faces to the clinic. People choose people.',
      },
      {
        icon: 'Tags',
        title: 'Clear fees',
        body: 'Treatment and fee pages that pre-qualify patients before they call.',
        detail:
          'Fee pages patients can find and understand, so the ones who call are ready to book rather than ready to shop around.',
      },
      {
        icon: 'CreditCard',
        title: 'Membership plans',
        body: 'Plan pages that explain the options and sign patients up without a phone call.',
        detail:
          'Your plans explained side by side, with sign-up handled online. Predictable recurring income without the front desk chasing forms.',
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
    blocks: ['pains', 'build', 'faq', 'cta'],
    buildHeading: 'Credibility first, then conversion.',
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
        detail:
          'A live calendar on the site, so a warm visitor becomes a booked meeting without an email chain. Reminders cut the no-shows.',
      },
      {
        icon: 'Calculator',
        title: 'Calculators',
        body: 'Mortgage, repayment and savings calculators that keep visitors engaged and informed.',
        detail:
          'Repayment, borrowing and savings calculators built to your products. Visitors get a useful answer, you get an engaged enquiry.',
      },
      {
        icon: 'ClipboardList',
        title: 'Qualified enquiries',
        body: 'Structured forms that capture situation and needs before the first call.',
        detail:
          'Forms that capture situation, timescale and needs before the first call, so you open the conversation already informed.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Credentials that reassure',
        body: 'Regulatory status, qualifications and memberships presented where they count.',
        detail:
          'Regulatory status, qualifications and professional memberships presented at the decision points, not hidden on an about page.',
      },
      {
        icon: 'TrendingUp',
        title: 'Insight that ranks',
        body: 'A publishing setup for the guides and answers your clients actually search for.',
        detail:
          'A publishing setup for guides and answers, structured so they surface in search results and AI answers. Expertise, made visible.',
      },
      {
        icon: 'FileText',
        title: 'Plain-English services',
        body: 'What you do, who it is for and what happens next, written without jargon.',
        detail:
          'Each service explained in the words a client would use: what you do, who it is for, what the first step is, and what happens next.',
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
        q: 'Who looks after the site?',
        a: 'We do. The site runs on our platform, built and kept healthy by us, with your domain and your content staying yours.',
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
    blocks: ['pains', 'flow', 'build', 'faq', 'cta'],
    buildHeading: 'The firm, properly presented.',
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
        detail:
          'The client picks the matter type and answers the essentials. The enquiry arrives with the basics attached, routed to the right desk, ready to triage.',
      },
      {
        icon: 'Scale',
        title: 'A page per area of law',
        body: 'Written to answer the questions clients search, structured to rank for them.',
        detail:
          'Employment, family, property, whatever the firm does: each area gets a page that answers first questions and is structured to rank for them.',
      },
      {
        icon: 'Users',
        title: 'People pages that persuade',
        body: 'Profiles that read like the person, not a CV template.',
        detail:
          'Profiles written like the person, not a CV: what they act on, how they work, and why clients come back to them.',
      },
      {
        icon: 'Eye',
        title: 'Transparency built in',
        body: 'The price and service information the SRA requires, designed rather than bolted on.',
        detail:
          'The price and service information the SRA requires, designed into the pages people actually read rather than buried in a PDF.',
      },
      {
        icon: 'Award',
        title: 'Proof of record',
        body: 'Testimonials, accreditations and outcomes presented within the rules.',
        detail:
          'Testimonials, accreditations and outcomes presented within the rules, where a comparing client will actually see them.',
      },
      {
        icon: 'Clock',
        title: 'Out-of-hours capture',
        body: 'Enquiries arrive at midnight. Callback requests queue for the morning with the details attached.',
        detail:
          'Enquiries land at midnight and queue with the details attached, so the morning starts with callbacks rather than voicemail.',
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
      'russle builds ecommerce for UK fashion and apparel brands. Editorial storefronts, drops and waitlists, back-in-stock alerts, Shopify or our platform.',
    hero: 'B',
    blocks: ['build', 'flow', 'pains', 'faq', 'cta'],
    buildHeading: 'Drop mechanics, editorial finish.',
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
        detail:
          'Full-bleed imagery, detail shots and fabric close-ups presented like a lookbook, with the buying mechanics tucked in cleanly underneath.',
      },
      {
        icon: 'Timer',
        title: 'Drops and waitlists',
        body: 'Timed releases, early access and waitlists that build pressure properly.',
        detail:
          'Timed releases with waitlists, early-access links for the list and a countdown that builds the moment. The infrastructure of a proper drop.',
      },
      {
        icon: 'Bell',
        title: 'Back-in-stock alerts',
        body: 'Sold out becomes a mailing list instead of a missed sale.',
        detail:
          'A sold-out size becomes a notify-me button. When you restock, the email goes out and the sale completes itself.',
      },
      {
        icon: 'Ruler',
        title: 'Size guidance that fits',
        body: 'Per-garment guidance that cuts returns and support messages.',
        detail:
          'Per-garment measurements and fit notes, not a generic chart. Fewer returns, and fewer messages asking will this fit.',
      },
      {
        icon: 'Store',
        title: 'Shopify or our platform',
        body: 'A custom storefront on the Shopify store you run, or a store built on our own platform.',
        detail:
          'If you run Shopify we design and build a custom storefront on top of it. Otherwise our platform handles products, stock, orders and payments, built and looked after by us.',
      },
      {
        icon: 'Mail',
        title: 'List building',
        body: 'Email and SMS capture wired into drops, because the list sells the next release.',
        detail:
          'Email and SMS capture wired into every drop, waitlist and back-in-stock alert. The list is the asset that sells the next release.',
      },
    ],
    faq: [
      {
        q: 'Shopify or something else?',
        a: 'Either. If you run Shopify we design and build a custom storefront on top of it. Otherwise our own platform handles products, stock, orders and payments.',
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
