import type { Metadata } from 'next';
import { PartnersOnePager } from '@/components/sections/PartnersOnePager';

export const metadata: Metadata = {
  title: 'For partners',
  description:
    'russle is a brand & growth agency. A short overview for photographers, copywriters, interior designers, and accountants whose clients need a brand and a website that match.',
  alternates: { canonical: '/partners' },
  robots: { index: false, follow: true },
};

export default function PartnersPage() {
  return <PartnersOnePager />;
}
