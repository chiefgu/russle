// Locality landing pages (local SEO drive, spec 2026-09-02, reworked same day).
// Pure data, same convention as industries.ts: icons are lucide names resolved
// via ICONS, the vignette is passed to LocalityPage by each route.
// Copy rules: no em dashes, no banned words, no overclaims, studio voice is
// "we". No russle pricing anywhere (enforced by locality-pages.test.ts).
// No invented local claims: only real facts (studio based in Alderley Edge,
// real Google rating, Berry Boys is a real Manchester client).
// Every build item is written FOR its page: bodies and details are unique
// across the site (enforced by locality-pages.test.ts) so no two pages share
// body copy. Titles may repeat; they are labels.

export type LocalityBlock =
  | 'grounding'
  | 'towns'
  | 'build'
  | 'proof'
  | 'reviews'
  | 'statement'
  | 'areas'
  | 'faq'
  | 'cta';

export type LocalityBuildItem = {
  icon: string;
  title: string;
  body: string;
  detail: string;
};

export type LocalityPageData = {
  slug: string;
  /** Footer / areas-mesh link label */
  label: string;
  /** The place name used in running copy */
  place: string;
  tag: string;
  h1: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  /** LocalVignette props */
  vignetteQuery: string;
  vignettePlaceLine: string;
  vignetteVariant: 'listing' | 'results' | 'review';
  /** A: copy left, vignette right. B: copy centred, vignette below. C: copy-only hero. */
  hero: 'A' | 'B' | 'C';
  blocks: LocalityBlock[];
  grounding: { heading: string; body: string[] };
  /** Hub pages only: the town-by-town directory with context lines. */
  towns?: { heading: string; items: { href: string; name: string; line: string }[] };
  buildHeading: string;
  /** Six items, written for this page (fills the bento grid exactly). */
  build: LocalityBuildItem[];
  statement?: string;
  proof?: { slug: string; title: string; line: string; extra?: string };
  faq: { q: string; a: string }[];
  schema: Record<string, unknown>;
};

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const provider = {
  '@type': 'Organization',
  name: 'russle',
  url: 'https://russle.co.uk',
  sameAs: [
    'https://maps.google.com/?cid=10305147079107514350',
    'https://instagram.com/russleuk',
    'https://uk.trustpilot.com/review/russle.co.uk',
  ],
};

function localServiceSchema(place: string, region: string, description: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web design',
    name: `Web design in ${place}`,
    description,
    provider,
    areaServed: {
      '@type': 'City',
      name: place,
      containedInPlace: { '@type': 'AdministrativeArea', name: region },
    },
  };
}

// ---------------------------------------------------------------------------
// The nine pages
// ---------------------------------------------------------------------------

export const LOCATIONS: Record<string, LocalityPageData> = {
  // ------------------------------------------------------------------ HUB 1
  'web-design-cheshire': {
    slug: 'web-design-cheshire',
    label: 'Cheshire',
    place: 'Cheshire',
    tag: 'Cheshire',
    h1: 'Web design in Cheshire, from a studio that lives here.',
    intro:
      'We are a web design, ecommerce and SEO studio based in Alderley Edge, building for businesses across Cheshire. Custom sites and stores, then the search work that gets them found.',
    metaTitle: 'Web Design Cheshire',
    metaDescription:
      'russle is a web design and SEO studio in Alderley Edge, building custom websites and online stores for Cheshire businesses. Rated 5.0 on Google.',
    vignetteQuery: 'web design cheshire',
    vignettePlaceLine: 'Based in Alderley Edge, serving all of Cheshire',
    vignetteVariant: 'results',
    hero: 'B',
    blocks: ['grounding', 'towns', 'build', 'proof', 'reviews', 'areas', 'faq', 'cta'],
    grounding: {
      heading: 'A county of independents deserves better websites.',
      body: [
        'Cheshire runs on independent businesses: makers, food producers, trades, salons, boutiques and family firms that compete with national chains every day. Most of their websites do not do them justice, and most were built by agencies that never have to walk past the shopfront.',
        'The county is not one market. Wilmslow trades differently from Macclesfield, Knutsford from Altrincham, and a site that converts in one can miss in another. Working here means we design for the actual customers a business serves, not a generic idea of the north west.',
        'We are based in Alderley Edge and work with businesses from Macclesfield to Chester. That means face-to-face kickoffs when you want them, and a studio whose own name is attached to the work locally.',
      ],
    },
    towns: {
      heading: 'Where we work, town by town.',
      items: [
        {
          href: '/web-design-alderley-edge',
          name: 'Alderley Edge',
          line: 'Home. The studio is based in the village, where reputation does the marketing and the website has to keep up.',
        },
        {
          href: '/web-design-wilmslow',
          name: 'Wilmslow',
          line: 'The biggest commercial centre in our corner of the county, and the most crowded search results.',
        },
        {
          href: '/web-design-knutsford',
          name: 'Knutsford',
          line: 'Considered shopfronts and King Street standards. The websites should carry the same care.',
        },
        {
          href: '/web-design-macclesfield',
          name: 'Macclesfield',
          line: 'A town that makes things, with work that deserves better than a dated template.',
        },
        {
          href: '/web-design-altrincham',
          name: 'Altrincham',
          line: 'The market rebuilt the town around independents, and expectations online rose with it.',
        },
        {
          href: '/web-design-hale',
          name: 'Hale',
          line: 'Quietly excellent businesses that need restraint in design, not template shine.',
        },
        {
          href: '/web-design-didsbury',
          name: 'Didsbury',
          line: 'South Manchester loyalty at Cheshire standards, still easier to find on Instagram than Google.',
        },
        {
          href: '/web-design-manchester',
          name: 'Manchester',
          line: 'The city itself: brands and stores competing city-wide, including our client Berry Boys.',
        },
      ],
    },
    buildHeading: 'Everything a Cheshire business needs to get found and sell.',
    build: [
      {
        icon: 'PenTool',
        title: 'A custom-built website',
        body: 'Designed around your business and your county, never assembled from a theme.',
        detail:
          'Cheshire customers can tell the difference between a business that invested and one that filled in a template. We design from your work, your customers and your patch, then build it fast and easy to run.',
      },
      {
        icon: 'ShoppingBag',
        title: 'Online stores',
        body: 'Sell beyond your town without handing the relationship to a marketplace.',
        detail:
          'A Cheshire food producer or boutique does not need a marketplace taking the customer data. We build storefronts with products, checkout and orders in one place, sized to the business.',
      },
      {
        icon: 'MapPin',
        title: 'Local SEO',
        body: 'Turn county-wide searches into enquiries from the towns you actually serve.',
        detail:
          'Location pages, reviews, structured data and your Business Profile working as one system. When someone in Wilmslow or Northwich searches for what you do, you are in the running.',
      },
      {
        icon: 'Search',
        title: 'SEO that compounds',
        body: 'Positions earned month after month, not rented by the click.',
        detail:
          'Fast pages, clean structure and content that answers what Cheshire customers actually type. Built in from the first sprint, so the site starts earning search traffic instead of waiting for a retrofit.',
      },
      {
        icon: 'Bot',
        title: 'AI search (GEO)',
        body: 'Show up when customers ask an assistant instead of typing into Google.',
        detail:
          'A growing share of local recommendations now comes from AI answers. We structure your pages and data so assistants can read, trust and recommend the business, alongside the classic rankings.',
      },
      {
        icon: 'Server',
        title: 'Hosting and care',
        body: 'One local studio hosting, watching and improving the site after launch.',
        detail:
          'No ticket queue in another timezone. We host on fast UK infrastructure, monitor everything, and handle changes ourselves. When something needs doing, you message the people who built it.',
      },
    ],
    proof: {
      slug: 'bethbakescakes',
      title: 'Beth Bakes Cakes',
      line: 'A custom storefront that took a cake business out of the DMs and into structured orders, deposits and collection slots.',
      extra: 'Designed, built and run on our own commerce platform.',
    },
    faq: [
      {
        q: 'Do you meet clients in person?',
        a: 'Yes. We are based in Alderley Edge, so anywhere in Cheshire is close. Kickoffs and reviews can happen at your place or over a call, whichever suits.',
      },
      {
        q: 'Do you only work with Cheshire businesses?',
        a: 'No, we build for clients across the UK and beyond. Cheshire is home, so local businesses get the same studio with shorter travel.',
      },
      {
        q: 'What does a typical build include?',
        a: 'Design, build, content structure, SEO foundations, analytics and launch. Ecommerce, bookings and email marketing come in when the business needs them.',
      },
      {
        q: 'Can you help us rank in local search?',
        a: 'Yes. Local SEO is part of how we build: location relevance, reviews, structured data and a Google Business Profile that pull in the same direction.',
      },
      {
        q: 'We already have a website. Can you take it over?',
        a: 'Usually, yes. We will review what you have honestly. Sometimes it needs a rebuild, sometimes a redesign on solid bones, and we will tell you which.',
      },
      {
        q: 'Which parts of Cheshire do you cover?',
        a: 'All of it. Most of our local work sits in the east of the county, from Macclesfield through Wilmslow and Knutsford up to Altrincham, but Chester and the west are no problem.',
      },
    ],
    schema: localServiceSchema(
      'Cheshire',
      'England',
      'Web design, ecommerce and SEO for Cheshire businesses, from a studio based in Alderley Edge.',
    ),
  },

  // ------------------------------------------------------------------ HUB 2
  'web-design-manchester': {
    slug: 'web-design-manchester',
    label: 'Manchester',
    place: 'Manchester',
    tag: 'Manchester',
    h1: 'Web design for Manchester businesses that want to be found.',
    intro:
      'From our studio just south of the city, we build custom websites and online stores for Manchester businesses, then do the SEO that gets them showing up when customers search.',
    metaTitle: 'Web Design Manchester',
    metaDescription:
      'russle builds custom websites and ecommerce for Manchester businesses, backed by SEO and AI search work. Studio south of the city, rated 5.0 on Google.',
    vignetteQuery: 'web design manchester',
    vignettePlaceLine: 'Serving Manchester from south of the city',
    vignetteVariant: 'listing',
    hero: 'A',
    blocks: ['proof', 'grounding', 'build', 'towns', 'reviews', 'areas', 'faq', 'cta'],
    grounding: {
      heading: 'Built for a city that expects better.',
      body: [
        'Manchester businesses compete in one of the busiest markets in the country. A template site with stock photos does not cut through here, and neither does a brochure page that Google has no reason to rank.',
        'The city also punishes slow follow-through. A brand that drops products, opens a second site or runs a launch weekend needs a website that keeps pace, not a rebuild every time the business moves.',
        'We build sites with a point of view: designed around the business, quick to load, structured to rank, and measured so you can see what they bring in. Berry Boys, the Manchester acai brand with stores on Deansgate and St Ann Street, runs on one.',
      ],
    },
    towns: {
      heading: 'South of the city, we go deeper.',
      items: [
        {
          href: '/web-design-didsbury',
          name: 'Didsbury',
          line: 'M20 has the most loyal independent customers in the city, and the most underbuilt websites.',
        },
        {
          href: '/web-design-altrincham',
          name: 'Altrincham',
          line: 'The market town that reset what south Manchester expects from independents.',
        },
        {
          href: '/web-design-hale',
          name: 'Hale',
          line: 'Where understatement is the brand, and the website has to carry it.',
        },
        {
          href: '/web-design-cheshire',
          name: 'Cheshire',
          line: 'Our home county, covered town by town from the studio in Alderley Edge.',
        },
      ],
    },
    buildHeading: 'What we build for Manchester businesses.',
    build: [
      {
        icon: 'PenTool',
        title: 'A custom-built website',
        body: 'Distinct enough to hold attention in a city full of good design.',
        detail:
          'Manchester has strong studios and strong brands, so average dies quickly here. We design sites with character that load fast, read clearly and give a business its own visual ground to stand on.',
      },
      {
        icon: 'ShoppingBag',
        title: 'Online stores',
        body: 'Multi-store, drops and launches, built on rails that scale with the brand.',
        detail:
          'Berry Boys runs its Deansgate and St Ann Street stores on our build, with room for the next opening already in the architecture. We build commerce that grows with the plan, not against it.',
      },
      {
        icon: 'Search',
        title: 'SEO that compounds',
        body: 'A realistic route up the rankings in the region’s most contested results.',
        detail:
          'Nobody honest promises quick wins on Manchester head terms. We target the searches with buying intent, fix the technical layer properly, and publish content that earns positions instead of renting attention.',
      },
      {
        icon: 'Bot',
        title: 'AI search (GEO)',
        body: 'Be the business AI assistants name when someone asks for a recommendation.',
        detail:
          'City customers increasingly ask ChatGPT and Google AI where to go and who to use. We structure entities, reviews and page data so the assistants have something solid to cite: you.',
      },
      {
        icon: 'Sparkles',
        title: 'Brand and identity',
        body: 'A visual system strong enough to run from shop signage to screen.',
        detail:
          'City brands live everywhere at once: storefront, packaging, social, site. We design identities that survive all of it, and when a brand already exists we extend it faithfully rather than flattening it.',
      },
      {
        icon: 'CalendarCheck',
        title: 'Bookings and enquiries',
        body: 'Pipelines that turn city footfall and searches into booked work.',
        detail:
          'Venues, services and studios in Manchester live on bookings. We build flows that capture them with the details attached, deposits taken where you want them, and every conversion tracked to its source.',
      },
    ],
    proof: {
      slug: 'berry-boys',
      title: 'Berry Boys',
      line: 'A Manchester acai brand with stores on Deansgate and St Ann Street, given its first real home off Instagram.',
      extra: 'A multi-store site built to scale as new locations open.',
    },
    faq: [
      {
        q: 'Do you work with businesses in central Manchester?',
        a: 'Yes. Our studio is south of the city in Alderley Edge, and we work with Manchester businesses regularly, in person or over a call.',
      },
      {
        q: 'Can you build an online store, not just a website?',
        a: 'Yes, stores are half of what we do: products, checkout, orders and stock, on our own commerce platform or as a custom Shopify storefront.',
      },
      {
        q: 'How do you approach SEO in a competitive market?',
        a: 'Honestly. City-wide head terms take time, so we target the searches your customers actually make, build the technical foundations properly, and add content that earns positions month after month.',
      },
      {
        q: 'Who will we actually deal with?',
        a: 'The people doing the work. russle is a studio, not an account-management layer, so feedback goes straight to the person building your site.',
      },
      {
        q: 'Have you built for Manchester businesses before?',
        a: 'Yes. Berry Boys in the city centre runs on our work: a multi-store site for its Deansgate and St Ann Street locations, built to add the next store without a rebuild.',
      },
    ],
    schema: localServiceSchema(
      'Manchester',
      'Greater Manchester',
      'Web design, ecommerce and SEO for Manchester businesses, including multi-store brands.',
    ),
  },

  // ------------------------------------------------------------------ TOWNS
  'web-design-alderley-edge': {
    slug: 'web-design-alderley-edge',
    label: 'Alderley Edge',
    place: 'Alderley Edge',
    tag: 'Alderley Edge',
    h1: 'The web design studio based in Alderley Edge.',
    intro:
      'russle is based here in the village. We design and build custom websites and online stores for Alderley Edge businesses, and for clients across Cheshire and beyond.',
    metaTitle: 'Web Design Alderley Edge',
    metaDescription:
      'russle is a web design and SEO studio based in Alderley Edge, building custom sites and stores for village businesses and across Cheshire.',
    vignetteQuery: 'web design alderley edge',
    vignettePlaceLine: 'Based in Alderley Edge, SK9',
    vignetteVariant: 'listing',
    hero: 'A',
    blocks: ['grounding', 'reviews', 'build', 'statement', 'areas', 'faq', 'cta'],
    grounding: {
      heading: 'Your web designer is up the road, not up the motorway.',
      body: [
        'Alderley Edge businesses trade on reputation. The village is small, word travels, and how you present matters. Your website should hold up to the same scrutiny as your shopfront.',
        'Being based here means the conversation can happen over a coffee in the village, and it means our name is attached to the work locally. We do not hand a site over and disappear; we look after it.',
      ],
    },
    buildHeading: 'What we build, from the village outwards.',
    build: [
      {
        icon: 'PenTool',
        title: 'A custom-built website',
        body: 'Built to the standard the village judges everything else by.',
        detail:
          'On London Road, presentation is the baseline. We design each site from scratch around the business behind it, so the first impression online matches the one through the door.',
      },
      {
        icon: 'Sparkles',
        title: 'Brand and identity',
        body: 'Identity work done alongside the site, so nothing feels bolted on.',
        detail:
          'Plenty of village businesses have outgrown a logo drawn years ago. We rebuild the identity and the website as one piece, from wordmark and type to the way it all behaves on screen.',
      },
      {
        icon: 'MapPin',
        title: 'Local SEO',
        body: 'Own the searches made within a mile of the studio.',
        detail:
          'When someone nearby searches for what you do, the winner is decided by relevance, reviews and profile signals. We set all three up properly, and we are subject to the same searches ourselves.',
      },
      {
        icon: 'ShoppingBag',
        title: 'Online stores',
        body: 'Take the village business to customers who have never walked past it.',
        detail:
          'A strong local reputation is a wasted asset if it stops at the parish boundary. We build storefronts that carry it further: products, payment and orders handled on a site you control.',
      },
      {
        icon: 'CalendarCheck',
        title: 'Bookings and enquiries',
        body: 'Appointments and enquiries captured while you are with a client.',
        detail:
          'Salons, clinics, advisers and trades here run on the diary. We build booking and enquiry flows that fill it without the phone tennis, with deposits and reminders where they help.',
      },
      {
        icon: 'Server',
        title: 'Hosting and care',
        body: 'Looked after by the studio up the road, for as long as you run it.',
        detail:
          'The site is monitored, backed up and kept current by us, not a faceless host. If something needs changing, you can ask in person; most of our clients do.',
      },
    ],
    statement: 'A studio on your doorstep, with work that travels well beyond it.',
    faq: [
      {
        q: 'Are you actually based in Alderley Edge?',
        a: 'Yes, the studio is based in the village. Our Google Business Profile and reviews are all under russle, Alderley Edge.',
      },
      {
        q: 'Can we meet before committing to anything?',
        a: 'Of course. A first conversation costs nothing and usually tells both sides quickly whether the fit is right.',
      },
      {
        q: 'What kind of businesses do you work with?',
        a: 'Independents mostly: food and drink, salons and aesthetics, trades, boutiques, professional services and ecommerce brands. The work on our site shows the range.',
      },
      {
        q: 'Do you look after the site after launch?',
        a: 'Yes. Hosting, monitoring, updates and small changes are part of how we work. Most clients stay with us long after launch.',
      },
    ],
    schema: localServiceSchema(
      'Alderley Edge',
      'Cheshire',
      'Custom web design, ecommerce and SEO from a studio based in Alderley Edge, Cheshire.',
    ),
  },

  'web-design-wilmslow': {
    slug: 'web-design-wilmslow',
    label: 'Wilmslow',
    place: 'Wilmslow',
    tag: 'Wilmslow',
    h1: 'Web design for Wilmslow businesses, built one village over.',
    intro:
      'We are based in Alderley Edge, minutes from Wilmslow. Custom websites, online stores and the SEO that gets SK9 businesses found by the people searching for them.',
    metaTitle: 'Web Design Wilmslow',
    metaDescription:
      'russle builds custom websites and online stores for Wilmslow businesses, from a studio in neighbouring Alderley Edge. SEO built in, rated 5.0 on Google.',
    vignetteQuery: 'web design wilmslow',
    vignettePlaceLine: 'Serving Wilmslow and SK9 from Alderley Edge',
    vignetteVariant: 'results',
    hero: 'B',
    blocks: ['grounding', 'build', 'reviews', 'areas', 'faq', 'cta'],
    grounding: {
      heading: 'Wilmslow is competitive. Your website should act like it.',
      body: [
        'Wilmslow has one of the strongest independent business scenes in the north west, and one of the busiest. Whatever you do here, someone nearby does it too, and customers compare online before they ever walk in.',
        'We build sites that win those comparisons: sharper design than the template your competitor bought, faster pages, and search foundations that give Google a reason to show you first. From the studio one village over, so working sessions are easy to arrange.',
      ],
    },
    buildHeading: 'Built to win the comparison.',
    build: [
      {
        icon: 'PenTool',
        title: 'A custom-built website',
        body: 'When customers open three tabs, be the one they do not close.',
        detail:
          'Wilmslow customers shortlist online before they spend. We design for that exact moment: a site that looks more considered, answers faster and asks for the enquiry more confidently than the other two tabs.',
      },
      {
        icon: 'MapPin',
        title: 'Local SEO',
        body: 'Get into the SK9 results your competitors currently own.',
        detail:
          'Wilmslow searches are contested, which makes the fundamentals decisive: location relevance on the page, a well-run Business Profile, reviews that keep arriving. We run that as one system, not three afterthoughts.',
      },
      {
        icon: 'ShoppingBag',
        title: 'Online stores',
        body: 'Retail that keeps selling after the shops on Grove Street shut.',
        detail:
          'For Wilmslow retail and food businesses, the site is the branch that never closes. We build stores with real product management behind them, so keeping it stocked is not a second job.',
      },
      {
        icon: 'CalendarCheck',
        title: 'Bookings and enquiries',
        body: 'Every quote request arriving complete, timed and traceable.',
        detail:
          'A missed enquiry in a town this busy is a competitor’s customer. We build enquiry and booking flows that capture the job details up front and tell you which channel earned each one.',
      },
      {
        icon: 'Mail',
        title: 'Email marketing',
        body: 'Bring Wilmslow customers back more often than the passing trade does.',
        detail:
          'Repeat visits are where local businesses win. We set up the capture, the welcome flow and the campaigns, all in your brand voice, so the customer list becomes an asset rather than a spreadsheet.',
      },
      {
        icon: 'Server',
        title: 'Hosting and care',
        body: 'A site that stays quick and current without you chasing anyone.',
        detail:
          'Speed decays and content drifts on an unattended site. Ours are hosted, watched and tuned continuously, with changes handled by the studio that built them, ten minutes from your door.',
      },
    ],
    faq: [
      {
        q: 'How local are you to Wilmslow?',
        a: 'Next door. The studio is in Alderley Edge, so we can be in Wilmslow in minutes for kickoffs, reviews or a photo walk of the business.',
      },
      {
        q: 'Can you help us show up for Wilmslow searches?',
        a: 'Yes. We build location relevance into the site itself and tie it to your Google Business Profile and reviews, which is what local rankings actually run on.',
      },
      {
        q: 'How long does a build take?',
        a: 'Most sites launch in a few weeks. Stores and bigger builds take longer. You get a straight timeline at the start and updates while we build.',
      },
      {
        q: 'What happens after launch?',
        a: 'We host and look after the site, watch how it performs, and keep improving it. A website is not a one-off purchase; it is a working asset.',
      },
    ],
    schema: localServiceSchema(
      'Wilmslow',
      'Cheshire',
      'Custom web design, ecommerce and local SEO for Wilmslow businesses, from a studio in neighbouring Alderley Edge.',
    ),
  },

  'web-design-knutsford': {
    slug: 'web-design-knutsford',
    label: 'Knutsford',
    place: 'Knutsford',
    tag: 'Knutsford',
    h1: 'Web design for Knutsford independents.',
    intro:
      'Boutiques, food businesses, interiors, trades and professional firms: Knutsford runs on independents, and we build the websites that let them compete with anyone.',
    metaTitle: 'Web Design Knutsford',
    metaDescription:
      'russle designs and builds websites and online stores for Knutsford businesses. A Cheshire studio, twenty minutes away, rated 5.0 on Google.',
    vignetteQuery: 'web design knutsford',
    vignettePlaceLine: 'Serving Knutsford and WA16',
    vignetteVariant: 'review',
    hero: 'C',
    blocks: ['statement', 'grounding', 'build', 'reviews', 'areas', 'faq', 'cta'],
    grounding: {
      heading: 'King Street standards, applied online.',
      body: [
        'Knutsford businesses set a high bar in person: considered shopfronts, good products, real service. Then the website lets the side down with a tired template and a contact form nobody answers.',
        'We close that gap. Sites that carry the same care as the shop itself, ecommerce for the ones ready to sell beyond the town, and the search work that brings new customers in. We are based in Alderley Edge, twenty minutes up the road.',
      ],
    },
    buildHeading: 'What Knutsford businesses build with us.',
    build: [
      {
        icon: 'PenTool',
        title: 'A custom-built website',
        body: 'Design with the care of a King Street window, applied to every page.',
        detail:
          'A Knutsford business would not dress its window with clip art, and its website should not read that way either. We design deliberately: real photography, proper type, pages composed rather than filled.',
      },
      {
        icon: 'Sparkles',
        title: 'Brand and identity',
        body: 'The whole presence considered as one: mark, packaging, site.',
        detail:
          'For boutiques and makers, brand is most of the value. We refine or rebuild it and carry it through the website faithfully, so the online version of the business feels like walking in.',
      },
      {
        icon: 'ShoppingBag',
        title: 'Online stores',
        body: 'Let the town’s best shops sell to people who have never visited.',
        detail:
          'Knutsford retail has customers far beyond WA16 who just cannot get there on a Saturday. A proper store, with stock, payment and delivery handled cleanly, turns them from admirers into buyers.',
      },
      {
        icon: 'MapPin',
        title: 'Local SEO',
        body: 'Be the answer when the town and its villages go searching.',
        detail:
          'From Mobberley to Mere, the catchment is bigger than the high street. We build the location signals that collect it: page relevance, review momentum and a Business Profile kept properly alive.',
      },
      {
        icon: 'Mail',
        title: 'Email marketing',
        body: 'The regulars list, formalised and working every month.',
        detail:
          'Knutsford independents live on regulars. We turn that goodwill into a channel: sign-ups on the site, considered campaigns, new-arrival and event notes that read like the owner wrote them.',
      },
      {
        icon: 'Server',
        title: 'Hosting and care',
        body: 'Everything kept running by one studio you can actually reach.',
        detail:
          'Hosting, security, backups and the steady stream of small changes every business accumulates, all handled by us. One relationship, twenty minutes away, no third-party maze.',
      },
    ],
    statement: 'The website should be the best-dressed thing your business owns.',
    faq: [
      {
        q: 'Do you visit Knutsford clients?',
        a: 'Yes, happily. We are twenty minutes away in Alderley Edge, and seeing the business in person usually makes for a better site.',
      },
      {
        q: 'We sell in the shop. Is online worth it?',
        a: 'For most Knutsford independents, yes. Even without a full store, a site that ranks and takes enquiries pays its way. When you are ready to sell online, we build that too.',
      },
      {
        q: 'Can you refresh our brand at the same time?',
        a: 'Yes. Brand and site built together always come out stronger than either done alone, and it keeps everything a customer sees consistent.',
      },
      {
        q: 'How do we start?',
        a: 'A short conversation about the business and what you want the site to do. From there you get a clear proposal, a timeline and one point of contact.',
      },
    ],
    schema: localServiceSchema(
      'Knutsford',
      'Cheshire',
      'Web design, brand and ecommerce for Knutsford independents, from a Cheshire studio.',
    ),
  },

  'web-design-macclesfield': {
    slug: 'web-design-macclesfield',
    label: 'Macclesfield',
    place: 'Macclesfield',
    tag: 'Macclesfield',
    h1: 'Web design for Macclesfield businesses.',
    intro:
      'Makers, manufacturers, trades and town-centre independents: we build custom websites and stores for Macclesfield businesses, with the search work that gets them found.',
    metaTitle: 'Web Design Macclesfield',
    metaDescription:
      'russle builds custom websites, online stores and SEO for Macclesfield businesses. A Cheshire studio, rated 5.0 on Google.',
    vignetteQuery: 'web design macclesfield',
    vignettePlaceLine: 'Serving Macclesfield and SK10, SK11',
    vignetteVariant: 'review',
    hero: 'A',
    blocks: ['grounding', 'build', 'reviews', 'statement', 'areas', 'faq', 'cta'],
    grounding: {
      heading: 'A town that makes things deserves a site that sells them.',
      body: [
        'Macclesfield has always made things: silk once, now everything from precision engineering to independent food and drink. What a lot of those businesses share is a website that undersells the quality of the work.',
        'We build sites that put the work first: clear about what you make, easy to enquire or buy, and structured so the right searches find you. Based in Alderley Edge, we are fifteen minutes from the town centre.',
      ],
    },
    buildHeading: 'From workshop to web.',
    build: [
      {
        icon: 'PenTool',
        title: 'A custom-built website',
        body: 'The craft in your workshop, finally visible in your website.',
        detail:
          'Macclesfield businesses tend to be better than their websites admit. We design around the work itself: what gets made, how it is made, and why a customer should pick the people who make it properly.',
      },
      {
        icon: 'ShoppingBag',
        title: 'Online stores',
        body: 'Sell what the town makes to customers the town has never met.',
        detail:
          'Whether it is small-batch food, printed goods or manufactured product lines, we build stores that handle variants, stock and shipping sensibly, so selling beyond SK11 stops being an aspiration.',
      },
      {
        icon: 'Search',
        title: 'SEO that compounds',
        body: 'Rank for the work you want more of, not just your name.',
        detail:
          'For makers and trades, the valuable searches describe the job: the material, the product, the problem. We structure the site around those queries and add the content that wins them over time.',
      },
      {
        icon: 'MapPin',
        title: 'Local SEO',
        body: 'Cover the town, Bollington, Prestbury and the hill villages in one sweep.',
        detail:
          'Macclesfield’s catchment spreads into the Peak fringe. We wire up the location signals so nearby searches find you first, with reviews and profile activity keeping the position warm.',
      },
      {
        icon: 'CalendarCheck',
        title: 'Bookings and enquiries',
        body: 'Quote requests that arrive with the job half-specified.',
        detail:
          'For trades and workshops, a vague enquiry costs a site visit. Our forms ask the right questions up front: dimensions, materials, timelines, photos, so your first reply can be a real answer.',
      },
      {
        icon: 'Server',
        title: 'Hosting and care',
        body: 'Maintained like good machinery: serviced, monitored, improved.',
        detail:
          'A working site needs the same discipline as a working shop floor. We host it, watch its performance, patch what needs patching and keep improving it while you get on with the actual work.',
      },
    ],
    statement: 'Good work, shown properly, wins better customers.',
    faq: [
      {
        q: 'Do you work with trades and manufacturers?',
        a: 'Yes, alongside shops, food businesses and services. Sites that win quotes and trade enquiries are a big part of what we build.',
      },
      {
        q: 'Can you photograph or present our work properly?',
        a: 'We design around real work, not stock imagery, and we will tell you what photography the site needs. The result looks like your business, because it is.',
      },
      {
        q: 'Will we be able to update the site ourselves?',
        a: 'Yes, where you want to. Products, posts and content are editable without touching code, and we handle anything structural.',
      },
      {
        q: 'How does the SEO side work for a Macclesfield business?',
        a: 'The site is built to rank from day one, then we target the searches that matter: what you do, where you do it, and the questions customers ask before buying.',
      },
    ],
    schema: localServiceSchema(
      'Macclesfield',
      'Cheshire',
      'Custom web design, ecommerce and SEO for Macclesfield makers, trades and independents.',
    ),
  },

  'web-design-altrincham': {
    slug: 'web-design-altrincham',
    label: 'Altrincham',
    place: 'Altrincham',
    tag: 'Altrincham',
    h1: 'Web design for Altrincham businesses.',
    intro:
      'Altrincham rebuilt itself around independents, and we build the websites to match: custom sites, online stores and local SEO for WA14 and WA15 businesses.',
    metaTitle: 'Web Design Altrincham',
    metaDescription:
      'russle builds custom websites and online stores for Altrincham businesses, with SEO built in. A Cheshire studio, rated 5.0 on Google.',
    vignetteQuery: 'web design altrincham',
    vignettePlaceLine: 'Serving Altrincham, WA14 and WA15',
    vignetteVariant: 'review',
    hero: 'B',
    blocks: ['grounding', 'reviews', 'build', 'areas', 'faq', 'cta'],
    grounding: {
      heading: 'The market taught everyone what good looks like.',
      body: [
        'Altrincham is proof that independents win when the standard is high. The market changed what people expect from a night out; the same shift is happening online, and a dated site now reads the way an empty unit used to.',
        'We build for that expectation: food and drink businesses that take orders and bookings, shops that sell online properly, services that turn searches into enquiries. Based in Alderley Edge, twenty minutes down the A538.',
      ],
    },
    buildHeading: 'Built for the Altrincham standard.',
    build: [
      {
        icon: 'PenTool',
        title: 'A custom-built website',
        body: 'Designed to the standard the market hall set for everything else.',
        detail:
          'Altrincham customers have been trained by good rooms, good food and good branding. A site here has to feel curated, not assembled, so we design each one from its own materials: your product, your people, your tone.',
      },
      {
        icon: 'ShoppingBag',
        title: 'Online stores',
        body: 'The Saturday queue, converted into a seven-day sales channel.',
        detail:
          'Traders and shops here already have demand; the store just extends its opening hours. We build retail sites where browsing feels like the stall at its best and checkout takes seconds.',
      },
      {
        icon: 'CalendarCheck',
        title: 'Bookings and enquiries',
        body: 'Tables, classes and appointments filled while the room is busy.',
        detail:
          'Food, fitness and services run Altrincham’s evenings. We build booking flows that take the reservation, the deposit and the dietary note in one pass, and drop it into the systems you already use.',
      },
      {
        icon: 'MapPin',
        title: 'Local SEO',
        body: 'Win WA14 and WA15 searches before the chains buy their way in.',
        detail:
          'Local results reward genuine local relevance, which independents have and chains fake. We make yours legible to Google: consistent details, active reviews and pages that name their patch honestly.',
      },
      {
        icon: 'Mail',
        title: 'Email marketing',
        body: 'Turn one great visit into a habit with a list you own.',
        detail:
          'The businesses that thrive here are the ones people come back to. We build the email side to drive that: sign-up worth giving an address for, then short, well-made sends that pull people back in.',
      },
      {
        icon: 'Sparkles',
        title: 'Brand and identity',
        body: 'Identity sharp enough to hold its own on a crowded street.',
        detail:
          'Stamford New Road does not forgive bland. Whether you need a refresh or a full identity, we design marks and systems with enough character to be remembered, then apply them everywhere consistently.',
      },
    ],
    faq: [
      {
        q: 'Do you work with food and drink businesses?',
        a: 'A lot. Ordering, bookings, menus and the search work that fills tables are all things we build regularly.',
      },
      {
        q: 'We are on social already. Why does the site matter?',
        a: 'Social reaches the people who already follow you. The site catches the ones searching right now, takes the order or booking, and builds a customer list you own.',
      },
      {
        q: 'Can you take over a site another agency built?',
        a: 'Usually yes. We will review it honestly and tell you whether it is worth keeping, improving or replacing.',
      },
      {
        q: 'How far do you travel for clients?',
        a: 'Altrincham is well within range; the studio is twenty minutes away in Alderley Edge. Face to face or remote, whichever works for you.',
      },
    ],
    schema: localServiceSchema(
      'Altrincham',
      'Greater Manchester',
      'Web design, ecommerce and local SEO for Altrincham independents and food businesses.',
    ),
  },

  'web-design-hale': {
    slug: 'web-design-hale',
    label: 'Hale',
    place: 'Hale',
    tag: 'Hale',
    h1: 'Web design for Hale businesses.',
    intro:
      'Hale expects quality by default. We build websites that carry it: custom design, quiet confidence, and the search foundations that bring the right customers in.',
    metaTitle: 'Web Design Hale',
    metaDescription:
      'russle designs and builds websites for Hale businesses: custom design with SEO built in, from a Cheshire studio rated 5.0 on Google.',
    vignetteQuery: 'web design hale',
    vignettePlaceLine: 'Serving Hale and WA15',
    vignetteVariant: 'listing',
    hero: 'C',
    blocks: ['grounding', 'statement', 'build', 'reviews', 'areas', 'faq', 'cta'],
    grounding: {
      heading: 'Understated is a design decision.',
      body: [
        'Hale businesses rarely need to shout. Salons, clinics, interiors, advisers and restaurants here trade on being quietly excellent, and the website has to carry that without tipping into generic luxury cliches.',
        'We design with restraint: real typography, real photography, no template sheen. Then we do the unglamorous work underneath, speed, structure and local search, that quietly brings the right people in.',
      ],
    },
    buildHeading: 'Quietly excellent, properly built.',
    build: [
      {
        icon: 'PenTool',
        title: 'A custom-built website',
        body: 'Confidence expressed through restraint, not volume.',
        detail:
          'The Hale register is easy to get wrong: too plain reads lazy, too polished reads generic. We design in between, with typography and space doing the talking and every element earning its place.',
      },
      {
        icon: 'Sparkles',
        title: 'Brand and identity',
        body: 'An identity that whispers the right things about the business.',
        detail:
          'For clinics, advisers and interiors businesses, trust is won before the first meeting. We shape identities that signal judgement and quality quietly, then keep them consistent across everything printed and on screen.',
      },
      {
        icon: 'CalendarCheck',
        title: 'Bookings and enquiries',
        body: 'Discreet, frictionless routes from interest to appointment.',
        detail:
          'Hale customers do not chase; they move on. We build booking and consultation flows that take seconds, hold deposits where appropriate, and confirm with the tone of a good front desk.',
      },
      {
        icon: 'MapPin',
        title: 'Local SEO',
        body: 'Visible to the village and WA15 without ever feeling like advertising.',
        detail:
          'The businesses people trust here are found, not pushed. We handle the finding: precise local pages, a well-kept profile and steady reviews, so discovery feels like a recommendation.',
      },
      {
        icon: 'Mail',
        title: 'Email marketing',
        body: 'Occasional, immaculate and worth opening.',
        detail:
          'For this audience, one considered email beats a weekly blast. We design templates that match the brand and help you send only when there is something genuinely worth saying.',
      },
      {
        icon: 'Server',
        title: 'Hosting and care',
        body: 'Standards maintained as carefully as they were set.',
        detail:
          'A refined site that slips out of date undoes its own message. We keep everything fast, current and secure in the background, with changes handled promptly by the studio that designed it.',
      },
    ],
    statement: 'Restraint reads as confidence. Templates read as everyone else.',
    faq: [
      {
        q: 'What kind of Hale businesses do you build for?',
        a: 'Salons and aesthetics, food and drink, interiors, advisers and other independents where presentation matters. The common thread is caring how the business comes across.',
      },
      {
        q: 'Can the site take bookings and deposits?',
        a: 'Yes. Booking flows, structured enquiries and deposits are standard parts of what we build, matched to how you actually take work.',
      },
      {
        q: 'Will you use our existing brand?',
        a: 'If it is strong, yes, faithfully. If it needs work, we will say so and can rebuild it alongside the site.',
      },
      {
        q: 'Where are you based?',
        a: 'Alderley Edge, about twenty minutes away. Close enough for in-person working sessions whenever they are useful.',
      },
    ],
    schema: localServiceSchema(
      'Hale',
      'Greater Manchester',
      'Custom web design for Hale businesses: restrained design, bookings and local SEO from a Cheshire studio.',
    ),
  },

  'web-design-didsbury': {
    slug: 'web-design-didsbury',
    label: 'Didsbury',
    place: 'Didsbury',
    tag: 'Didsbury',
    h1: 'Web design for Didsbury businesses.',
    intro:
      'South Manchester runs on independents, and Didsbury is their capital. We build the websites: custom sites, stores and local SEO for M20 businesses.',
    metaTitle: 'Web Design Didsbury',
    metaDescription:
      'russle builds custom websites and online stores for Didsbury and south Manchester businesses. SEO built in, rated 5.0 on Google.',
    vignetteQuery: 'web design didsbury',
    vignettePlaceLine: 'Serving Didsbury, West Didsbury and M20',
    vignetteVariant: 'listing',
    hero: 'A',
    blocks: ['grounding', 'build', 'proof', 'reviews', 'areas', 'faq', 'cta'],
    grounding: {
      heading: 'Burton Road proves the appetite. The websites lag behind.',
      body: [
        'Didsbury and West Didsbury have the customers independents dream of: local, loyal and happy to spend with businesses they like. Most of those businesses are still easier to find on Instagram than on Google, which leaves the searches to whoever bothers to show up.',
        'We build sites that show up: fast, characterful, structured for local search, and able to take the order or booking on the spot. We work across south Manchester from our studio in Alderley Edge.',
      ],
    },
    buildHeading: 'What M20 businesses build with us.',
    build: [
      {
        icon: 'PenTool',
        title: 'A custom-built website',
        body: 'Character kept intact, because that is why M20 customers choose you.',
        detail:
          'Didsbury regulars pick independents precisely because they are not chains. We design sites that keep the personality: the voice, the interior, the people, while making everything effortless to find and use.',
      },
      {
        icon: 'ShoppingBag',
        title: 'Online stores',
        body: 'Neighbourhood favourites, shipped anywhere the fans move to.',
        detail:
          'Didsbury loyalty survives house moves. A proper store lets the coffee, the bakes or the goods follow customers who leave M20, and gives locals a way to order ahead of the weekend rush.',
      },
      {
        icon: 'MapPin',
        title: 'Local SEO',
        body: 'Collect the M20 searches currently going to whoever shows up.',
        detail:
          'The gap between footfall and search visibility is the opportunity in Didsbury. We close it: pages that name the area honestly, a live Business Profile and review momentum that compounds.',
      },
      {
        icon: 'CalendarCheck',
        title: 'Bookings and enquiries',
        body: 'Brunch tables, classes and appointments booked while you serve.',
        detail:
          'The busiest rooms in Didsbury lose the most phone calls. We move bookings onto the site with deposits and reminders built in, so full sessions stop costing you the next ones.',
      },
      {
        icon: 'Mail',
        title: 'Email marketing',
        body: 'A neighbourhood list that fills the quiet Tuesdays.',
        detail:
          'When your customers live within a mile, email is absurdly effective. We set up the capture and the sends: new menu, new stock, event nights, written like you and timed for the lulls.',
      },
      {
        icon: 'Bot',
        title: 'AI search (GEO)',
        body: 'Be the answer when someone asks an assistant where to go in Didsbury.',
        detail:
          '"Best brunch in Didsbury" is being asked of chatbots right now. We structure your pages, reviews and details so AI assistants can find, verify and recommend you, not just the aggregators.',
      },
    ],
    proof: {
      slug: 'berry-boys',
      title: 'Berry Boys',
      line: 'A Manchester acai brand given a multi-store site built to grow as new locations open.',
      extra: 'Real Manchester work, minutes up the road from M20.',
    },
    faq: [
      {
        q: 'Do you work with Didsbury cafes and food businesses?',
        a: 'Yes, food and drink is one of our strongest areas: ordering, bookings, menus and the local search work that fills quiet sessions.',
      },
      {
        q: 'We get most customers from Instagram. Why add a website?',
        a: 'Instagram reaches followers; Google reaches intent. A site catches people searching for what you do right now, and it keeps working when the algorithm changes.',
      },
      {
        q: 'Can you build a store for our products?',
        a: 'Yes, full ecommerce with products, checkout and orders, sized to the business rather than an enterprise platform you will fight with.',
      },
      {
        q: 'Are you Manchester-based?',
        a: 'Just south: the studio is in Alderley Edge, and south Manchester is core territory. Berry Boys in the city centre runs on our work.',
      },
    ],
    schema: localServiceSchema(
      'Didsbury',
      'Greater Manchester',
      'Web design, ecommerce and local SEO for Didsbury and south Manchester independents.',
    ),
  },
};

export const LOCATION_SLUGS = Object.keys(LOCATIONS);

export const LOCATION_LINKS = Object.values(LOCATIONS).map((d) => ({
  label: d.label,
  href: `/${d.slug}`,
}));
