import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalityPage } from '@/components/sections/LocalityPage';
import { Section } from '@/components/layout/Section';
import { getLocalityBySlug } from '@/lib/locality';

const SLUG = 'alderley-edge';

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
  src: '/locality/alderley-edge-house.jpg',
  alt: 'A building tucked into ivy and lit lanterns in Alderley Edge village.',
};

const BAKERY = {
  src: '/locality/alderley-edge-bakery.jpg',
  alt: 'G. Wienholt pastrycook on Clifton Street, Alderley Edge.',
};

const RESTAURANT = {
  src: '/locality/alderley-edge-restaurant.jpg',
  alt: 'Interior of an Alderley Edge restaurant with a brass bar and trailing greenery.',
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
              className="block aspect-[3/4] w-full object-cover sm:aspect-[4/3] md:aspect-[16/10]"
            />
          </figure>
        </Section>
      }
      afterBody={
        <Section tone="bg" spacing="s" container="narrow">
          <div className="grid gap-6 md:grid-cols-2">
            <figure className="overflow-hidden rounded-[var(--radius-l)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={BAKERY.src}
                alt={BAKERY.alt}
                className="block aspect-square w-full object-cover"
              />
              <figcaption className="text-small mt-3 text-[var(--color-text-soft)]">
                A high-street independent on Clifton Street, off London Road.
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-[var(--radius-l)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={RESTAURANT.src}
                alt={RESTAURANT.alt}
                className="block aspect-square w-full object-cover"
              />
              <figcaption className="text-small mt-3 text-[var(--color-text-soft)]">
                The interior bar at a London Road restaurant.
              </figcaption>
            </figure>
          </div>
        </Section>
      }
    />
  );
}
