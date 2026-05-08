import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalityPage } from '@/components/sections/LocalityPage';
import { Section } from '@/components/layout/Section';
import { getLocalityBySlug } from '@/lib/locality';

const SLUG = 'wilmslow';

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
  src: '/locality/wilmslow-cafe.jpg',
  alt: 'A coffee shop interior in Wilmslow, looking down from a mezzanine onto the courtyard.',
};

const RESTAURANT = {
  src: '/locality/wilmslow-restaurant.jpg',
  alt: 'Interior of a Wilmslow restaurant with an olive tree, blue chairs, and a marble bar.',
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
              className="block aspect-square w-full object-cover sm:aspect-[4/3]"
            />
          </figure>
        </Section>
      }
      afterBody={
        <Section tone="bg" spacing="s" container="narrow">
          <figure className="overflow-hidden rounded-[var(--radius-l)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={RESTAURANT.src}
              alt={RESTAURANT.alt}
              className="block aspect-[3/4] w-full object-cover sm:aspect-[4/3] md:aspect-[16/10]"
            />
          </figure>
        </Section>
      }
    />
  );
}
