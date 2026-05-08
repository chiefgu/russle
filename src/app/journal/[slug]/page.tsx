import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JournalArticle } from '@/components/sections/JournalArticle';
import { getJournalBySlug, getJournalSlugs } from '@/lib/journal';

type Params = { slug: string };

export async function generateStaticParams() {
  return getJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalBySlug(slug);
  if (!entry) return { title: 'Not found' };
  return {
    title: entry.title,
    description: entry.metaDescription,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      title: `russle | ${entry.title}`,
      description: entry.metaDescription,
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = getJournalBySlug(slug);
  if (!entry) notFound();
  return <JournalArticle entry={entry} />;
}
