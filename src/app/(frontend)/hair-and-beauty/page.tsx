import type { Metadata } from 'next';
import { IndustryPage } from '@/components/sections/IndustryPage';
import { INDUSTRIES } from '@/content/industries';
import { BeautyVignette } from '@/components/sections/vignettes/BeautyVignette';

const data = INDUSTRIES['hair-and-beauty'];

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function HairAndBeautyPage() {
  return <IndustryPage data={data} vignette={<BeautyVignette />} />;
}
