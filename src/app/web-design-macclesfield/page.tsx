import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalityPage } from '@/components/sections/LocalityPage';
import { Section } from '@/components/layout/Section';
import { getLocalityBySlug } from '@/lib/locality';

const SLUG = 'macclesfield';

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

const MILL = {
  src: '/locality/macclesfield-mill.jpg',
  alt: 'The interior of a Macclesfield silk mill, wooden floors stretching down between weaving frames.',
};

const MARKET = {
  src: '/locality/macclesfield-market.jpg',
  alt: 'The blue and white striped market in Macclesfield town centre with the church behind.',
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
              src={MILL.src}
              alt={MILL.alt}
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
              src={MARKET.src}
              alt={MARKET.alt}
              className="block aspect-[4/5] w-full object-cover sm:aspect-[4/3]"
            />
          </figure>
        </Section>
      }
    />
  );
}
