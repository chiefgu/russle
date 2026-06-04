import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { TrackedButtonLink } from '@/components/ui/TrackedButtonLink';
import { FAQ } from '@/components/ui/FAQ';
import { CaseStudyGrid } from '@/components/sections/CaseStudyGrid';
import { CaseStudyBody } from '@/components/sections/CaseStudyBody';
import type { Locality } from '@/lib/locality';
import { getAllWork } from '@/lib/mdx';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://russle.co.uk';

const SERVICES = [
  {
    title: 'Brand identity',
    body: 'Logo, palette, type, and the toolkit your business uses everywhere from sign to social.',
  },
  {
    title: 'Websites',
    body: 'Designed and built by us. Fast, ranked, and easy for you to update.',
  },
  {
    title: 'Growth systems',
    body: 'Local SEO, email marketing, and the systems that turn traffic into bookings.',
  },
];

export function LocalityPage({
  locality,
  afterHero,
  afterBody,
}: {
  locality: Locality;
  afterHero?: React.ReactNode;
  afterBody?: React.ReactNode;
}) {
  const allWork = getAllWork();
  const featuredCases = locality.caseStudySlugs
    .map((slug) => allWork.find((w) => w.slug === slug))
    .filter((w): w is NonNullable<typeof w> => Boolean(w));

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}${locality.routePath}#localbusiness`,
    name: 'russle',
    description: locality.metaDescription,
    url: `${SITE_URL}${locality.routePath}`,
    telephone: '+44 7875 607616',
    email: 'hello@russle.co.uk',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Alderley Edge',
      addressRegion: 'Cheshire',
      addressCountry: 'GB',
    },
    areaServed: {
      '@type': 'City',
      name: locality.town,
    },
    priceRange: 'From £1,995',
  };

  const faqItems = locality.faqs.map((f) => ({ q: f.question, a: f.answer }));

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />

      <Section tone="bg" spacing="heroTop" container="narrow">
        <Tag>{locality.county}</Tag>
        <h1 className="h1 mt-6 text-balance">
          Brand and web design studio in {locality.town}.
        </h1>
        <p className="text-big mt-8 max-w-2xl text-[var(--color-text-mute)]">
          {locality.heroParagraph}
        </p>
      </Section>

      {afterHero}

      <Section tone="bg" spacing="m" container="narrow">
        <CaseStudyBody body={locality.body} />
      </Section>

      {afterBody}

      <Section tone="bg" spacing="l" container="main">
        <h2 className="h2">What we do for {locality.town} businesses.</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title}>
              <h3 className="h4">{s.title}</h3>
              <p className="text-body mt-4 text-[var(--color-text-mute)]">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {featuredCases.length > 0 && (
        <CaseStudyGrid items={featuredCases} variant="index" showHeader={false} />
      )}

      {faqItems.length > 0 && (
        <Section tone="bg" spacing="l" container="narrow">
          <h2 className="h2">Frequently asked.</h2>
          <div className="mt-12">
            <FAQ items={faqItems} />
          </div>
        </Section>
      )}

      <Section tone="bg" spacing="l" container="narrow">
        <h2 className="h2">Start a project in {locality.town}.</h2>
        <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
          Tell us about your business in eight short steps. We come back inside 24 hours.
        </p>
        <div className="mt-10">
          <TrackedButtonLink
            href="/start"
            variant="primary"
            size="lg"
            withArrow
            eventName="select_content"
            eventParams={{
              content_type: 'cta_start_project',
              content_id: 'locality_page',
              location_id: locality.slug,
            }}
          >
            Start a project
          </TrackedButtonLink>
        </div>
      </Section>
    </>
  );
}
