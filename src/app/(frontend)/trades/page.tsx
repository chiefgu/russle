import type { Metadata } from 'next';
import { IndustryPage } from '@/components/sections/IndustryPage';
import { INDUSTRIES } from '@/content/industries';
import { TradesVignette } from '@/components/sections/vignettes/TradesVignette';

const data = INDUSTRIES['trades'];

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function TradesPage() {
  return <IndustryPage data={data} vignette={<TradesVignette />} />;
}
