import type { Metadata } from 'next';
import { IndustryPage } from '@/components/sections/IndustryPage';
import { INDUSTRIES } from '@/content/industries';
import { SolicitorsVignette } from '@/components/sections/vignettes/SolicitorsVignette';

const data = INDUSTRIES['solicitors'];

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function SolicitorsPage() {
  return <IndustryPage data={data} vignette={<SolicitorsVignette />} />;
}
