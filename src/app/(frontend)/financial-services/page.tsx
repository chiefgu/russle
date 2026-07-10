import type { Metadata } from 'next';
import { IndustryPage } from '@/components/sections/IndustryPage';
import { INDUSTRIES } from '@/content/industries';
import { FinanceVignette } from '@/components/sections/vignettes/FinanceVignette';

const data = INDUSTRIES['financial-services'];

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function FinancialServicesPage() {
  return <IndustryPage data={data} vignette={<FinanceVignette />} />;
}
