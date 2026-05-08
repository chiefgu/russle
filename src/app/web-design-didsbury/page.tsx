import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalityPage } from '@/components/sections/LocalityPage';
import { Section } from '@/components/layout/Section';
import { getLocalityBySlug } from '@/lib/locality';

const SLUG = 'didsbury';

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

const BARBERS = {
  src: '/locality/didsbury-barbers.jpg',
  alt: 'Kraft Barbering, an independent barbershop on Wilmslow Road, Didsbury.',
};

const GARDENS = {
  src: '/locality/didsbury-gardens.jpg',
  alt: 'Festoon lights strung over an autumn garden bar in Didsbury.',
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
              src={BARBERS.src}
              alt={BARBERS.alt}
              className="block aspect-[3/4] w-full object-cover sm:aspect-[4/3]"
            />
          </figure>
        </Section>
      }
      afterBody={
        <Section tone="bg" spacing="s" container="main">
          <figure className="overflow-hidden rounded-[var(--radius-l)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={GARDENS.src}
              alt={GARDENS.alt}
              className="block aspect-[4/3] w-full object-cover md:aspect-[16/10]"
            />
          </figure>
        </Section>
      }
    />
  );
}
