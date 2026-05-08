import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalityPage } from '@/components/sections/LocalityPage';
import { Section } from '@/components/layout/Section';
import { getLocalityBySlug } from '@/lib/locality';

const SLUG = 'prestbury';

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

const ROAD = {
  src: '/locality/prestbury-road.jpg',
  alt: 'The main road through Prestbury village, with Bacchus and the row of historic buildings in view.',
};

const BUILDING = {
  src: '/locality/prestbury-road-2.jpg',
  alt: 'An ivy and flower-covered building on a Prestbury village street.',
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
              src={ROAD.src}
              alt={ROAD.alt}
              className="block aspect-[4/3] w-full object-cover md:aspect-[16/10]"
            />
          </figure>
        </Section>
      }
      afterBody={
        <Section tone="bg" spacing="s" container="narrow">
          <figure className="overflow-hidden rounded-[var(--radius-l)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BUILDING.src}
              alt={BUILDING.alt}
              className="block aspect-[3/4] w-full object-cover sm:aspect-[4/3]"
            />
          </figure>
        </Section>
      }
    />
  );
}
