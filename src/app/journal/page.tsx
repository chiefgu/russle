import type { Metadata } from 'next';
import { JournalIndex } from '@/components/sections/JournalIndex';
import { getAllJournal } from '@/lib/journal';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Guides, comparisons, and local notes from russle, a brand and web design studio in Alderley Edge.',
  alternates: { canonical: '/journal' },
};

export default function Page() {
  return <JournalIndex items={getAllJournal()} />;
}
