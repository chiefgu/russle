import type { Metadata } from 'next';
import { PartnersOnePager } from '@/components/sections/PartnersOnePager';

export const metadata: Metadata = {
  title: 'For partners',
  description:
    'russle is a brand-led growth studio in Alderley Edge. A short overview for photographers, copywriters, interior designers, and accountants serving independent businesses across Cheshire and South Manchester.',
  alternates: { canonical: '/partners' },
  robots: { index: false, follow: true },
};

export default function PartnersPage() {
  return <PartnersOnePager />;
}
