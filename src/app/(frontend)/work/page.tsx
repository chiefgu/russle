import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/PageHeader';
import { CaseStudyGrid } from '@/components/sections/CaseStudyGrid';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { getAllWork } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Selected work',
  description:
    'Selected case studies from russle. Brand, website, and growth projects for ambitious businesses across the UK.',
};

export default function WorkPage() {
  const work = getAllWork();

  return (
    <>
      <PageHeader
        label="Work"
        title="Recent projects."
        sub="A selection of websites, brands, and product work from the last 18 months."
      />
      <CaseStudyGrid items={work} variant="index" showHeader={false} />
      <CTAStrip />
    </>
  );
}
