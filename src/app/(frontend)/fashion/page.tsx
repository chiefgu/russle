import type { Metadata } from 'next';
import { IndustryPage } from '@/components/sections/IndustryPage';
import { INDUSTRIES } from '@/content/industries';
import { FashionVignette } from '@/components/sections/vignettes/FashionVignette';

const data = INDUSTRIES['fashion'];

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function FashionPage() {
  return <IndustryPage data={data} vignette={<FashionVignette />} />;
}
