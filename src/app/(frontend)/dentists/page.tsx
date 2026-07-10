import type { Metadata } from 'next';
import { IndustryPage } from '@/components/sections/IndustryPage';
import { INDUSTRIES } from '@/content/industries';
import { DentistsVignette } from '@/components/sections/vignettes/DentistsVignette';

const data = INDUSTRIES['dentists'];

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function DentistsPage() {
  return <IndustryPage data={data} vignette={<DentistsVignette />} />;
}
