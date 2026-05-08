import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalityPage } from '@/components/sections/LocalityPage';
import { Section } from '@/components/layout/Section';
import { getLocalityBySlug } from '@/lib/locality';

const SLUG = 'knutsford';

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

const HERO_IMAGE = {
  src: '/locality/knutsford-street.jpg',
  alt: 'King Street in Knutsford at golden hour, bunting strung between the buildings and the tower at the end of the street.',
};

const TATTON = {
  src: '/locality/knutsford-tatton-park.jpg',
  alt: 'The conservatory at Tatton Park, the heritage estate next to Knutsford.',
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
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              className="block aspect-[3/4] w-full object-cover sm:aspect-[4/3] md:aspect-[3/2]"
            />
            <figcaption className="text-small mt-3 text-[var(--color-text-soft)]">
              King Street, Knutsford.
            </figcaption>
          </figure>
        </Section>
      }
      afterBody={
        <Section tone="bg" spacing="s" container="narrow">
          <figure className="overflow-hidden rounded-[var(--radius-l)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={TATTON.src}
              alt={TATTON.alt}
              className="block aspect-[3/4] w-full object-cover sm:aspect-[4/3]"
            />
            <figcaption className="text-small mt-3 text-[var(--color-text-soft)]">
              Tatton Park, the heritage anchor for the wider Knutsford catchment.
            </figcaption>
          </figure>
        </Section>
      }
    />
  );
}
