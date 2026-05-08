import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RegionHub } from '@/components/sections/RegionHub';
import { getLocalityBySlug } from '@/lib/locality';

const SLUG = 'region-hub';

export async function generateMetadata(): Promise<Metadata> {
  const loc = getLocalityBySlug(SLUG);
  if (!loc) return {};
  return {
    title: 'Brand & web design in South Manchester & Cheshire',
    description: loc.metaDescription,
    alternates: { canonical: loc.routePath },
    openGraph: {
      title: 'russle | Brand & web design in South Manchester & Cheshire',
      description: loc.metaDescription,
      url: loc.routePath,
    },
  };
}

export default function Page() {
  const loc = getLocalityBySlug(SLUG);
  if (!loc) notFound();
  return <RegionHub locality={loc} />;
}
