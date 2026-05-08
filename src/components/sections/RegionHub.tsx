import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { TrackedButtonLink } from '@/components/ui/TrackedButtonLink';
import { Card } from '@/components/ui/Card';
import { CaseStudyGrid } from '@/components/sections/CaseStudyGrid';
import { CaseStudyBody } from '@/components/sections/CaseStudyBody';
import type { Locality } from '@/lib/locality';
import { getAllLocalities } from '@/lib/locality';
import { getAllWork } from '@/lib/mdx';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://russle.co.uk';

export function RegionHub({ locality }: { locality: Locality }) {
  const towns = getAllLocalities().filter((l) => !l.isHub);
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
    areaServed: towns.map((t) => ({ '@type': 'City', name: t.town })),
    priceRange: 'From £2,500',
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />

      <Section tone="bg" spacing="heroTop" container="narrow">
        <Tag>South Manchester &amp; Cheshire</Tag>
        <h1 className="h1 mt-6 text-balance">
          Brand and web design studio for South Manchester and Cheshire.
        </h1>
        <p className="text-big mt-8 max-w-2xl text-[var(--color-text-mute)]">
          {locality.heroParagraph}
        </p>
      </Section>

      <Section tone="bg" spacing="m" container="narrow">
        <CaseStudyBody body={locality.body} />
      </Section>

      <Section tone="bg" spacing="l" container="main">
        <h2 className="h2">Towns we work in.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {towns.map((t) => (
            <Link
              key={t.slug}
              href={t.routePath}
              className="group block transition-transform duration-200 hover:-translate-y-1"
            >
              <Card hover>
                <p className="label text-[var(--color-text-soft)]">{t.county}</p>
                <h3 className="h4 mt-3">{t.town}</h3>
                <p className="text-body mt-3 text-[var(--color-text-mute)]">
                  Brand and web design in {t.town}.
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {featuredCases.length > 0 && (
        <CaseStudyGrid items={featuredCases} variant="index" showHeader={false} />
      )}

      <Section tone="bg" spacing="l" container="narrow">
        <h2 className="h2">Start a project.</h2>
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
              content_id: 'region_hub',
              location_id: 'south-manchester-cheshire',
            }}
          >
            Start a project
          </TrackedButtonLink>
        </div>
      </Section>
    </>
  );
}
