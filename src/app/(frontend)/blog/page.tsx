import type { Metadata } from 'next';
import { JournalIndex } from '@/components/sections/JournalIndex';
import { getPublishedPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Guides, comparisons, and notes from russle, a brand & growth agency.',
  alternates: { canonical: '/blog' },
};

export default async function Page() {
  const items = await getPublishedPosts();
  return <JournalIndex items={items} />;
}
