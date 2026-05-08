import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocalityPage } from '@/components/sections/LocalityPage';
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

export default function Page() {
  const loc = getLocalityBySlug(SLUG);
  if (!loc) notFound();
  return <LocalityPage locality={loc} />;
}
