import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalityPage } from '@/components/sections/LocalityPage';
import { Section } from '@/components/layout/Section';
import { getLocalityBySlug } from '@/lib/locality';

const SLUG = 'hale';

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

const SPA = {
  src: '/locality/hale-restaurant.avif',
  alt: 'The pool at a Hale spa hotel, blue tile and lit loungers, evening light through glass.',
};

const STUDIO = {
  src: '/locality/hale-gym.jpg',
  alt: 'A boutique studio storefront in the Hale and Hale Barns area.',
};

export default function Page() {
  const loc = getLocalityBySlug(SLUG);
  if (!loc) notFound();

  return (
    <LocalityPage
      locality={loc}
      afterHero={
        <Section tone="bg" spacing="s" container="main">
          <figure className="overflow-hidden rounded-[var(--radius-l)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SPA.src}
              alt={SPA.alt}
              className="block aspect-[16/10] w-full object-cover md:aspect-[21/9]"
            />
          </figure>
        </Section>
      }
      afterBody={
        <Section tone="bg" spacing="s" container="narrow">
          <figure className="overflow-hidden rounded-[var(--radius-l)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={STUDIO.src}
              alt={STUDIO.alt}
              className="block aspect-[3/4] w-full object-cover sm:aspect-[4/3]"
            />
          </figure>
        </Section>
      }
    />
  );
}
