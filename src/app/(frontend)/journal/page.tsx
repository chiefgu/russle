import type { Metadata } from 'next';
import { JournalIndex } from '@/components/sections/JournalIndex';
import { getPublishedPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Guides, comparisons, and local notes from russle, a brand and web design studio in Alderley Edge.',
  alternates: { canonical: '/journal' },
};

export default async function Page() {
  const items = await getPublishedPosts();
  return <JournalIndex items={items} />;
}
