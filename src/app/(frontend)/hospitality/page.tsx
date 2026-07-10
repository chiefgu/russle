import type { Metadata } from 'next';
import { IndustryPage } from '@/components/sections/IndustryPage';
import { INDUSTRIES } from '@/content/industries';
import { HospitalityVignette } from '@/components/sections/vignettes/HospitalityVignette';

const data = INDUSTRIES['hospitality'];

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function HospitalityPage() {
  return <IndustryPage data={data} vignette={<HospitalityVignette />} />;
}
