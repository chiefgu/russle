import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalityPage } from '@/components/sections/LocalityPage';
import { Section } from '@/components/layout/Section';
import { getLocalityBySlug } from '@/lib/locality';

const SLUG = 'altrincham';

export async function generateMetadata(): Promise<Metadata> {
  const loc = getLocalityBySlug(SLUG);
  if (!loc) return {};
  return {
    title: `Brand & web design in ${loc.town}`,
    description: loc.metaDescription,
    alternates: { canonical: loc.routePath },
    openGraph: {
      title: `russle | Brand & web design in ${loc.town}`,
      description: loc.metaDescription,
      url: loc.routePath,
    },
  };
}

const FLORIST = {
  src: '/locality/altrincham-market.jpg',
  alt: 'A flower and plants stall inside the Altrincham Market hall.',
};

const CROWD = {
  src: '/locality/altrincham-market-2.jpg',
  alt: 'Inside Altrincham Market on a busy day, packed with diners and drinkers.',
};

export default function Page() {
  const loc = getLocalityBySlug(SLUG);
  if (!loc) notFound();

  return (
    <LocalityPage
      locality={loc}
      afterHero={
        <Section tone="bg" spacing="s" container="narrow">
          <figure className="overflow-hidden rounded-[var(--radius-l)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FLORIST.src}
              alt={FLORIST.alt}
              className="block aspect-[3/4] w-full object-cover sm:aspect-[4/3]"
            />
          </figure>
        </Section>
      }
      afterBody={
        <Section tone="bg" spacing="s" container="narrow">
          <figure className="overflow-hidden rounded-[var(--radius-l)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CROWD.src}
              alt={CROWD.alt}
              className="block aspect-square w-full object-cover sm:aspect-[16/10]"
            />
          </figure>
        </Section>
      }
    />
  );
}
