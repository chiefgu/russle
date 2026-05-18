import { Hero } from '@/components/sections/Hero';
import { ReviewsBar } from '@/components/sections/ReviewsBar';
import { ReviewsBlock } from '@/components/sections/ReviewsBlock';
import { VersusBlock } from '@/components/sections/VersusBlock';
import { CaseStudyShowcase } from '@/components/sections/CaseStudyShowcase';
import { OfferBlock } from '@/components/sections/OfferBlock';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { hasPlacesConfig } from '@/lib/google-places';
import { getAllWork } from '@/lib/mdx';

export default async function HomePage() {
  const work = getAllWork()
    .filter((w) => w.slug !== 'makeup-by-abigail')
    .slice(0, 4);
  const placesReady = hasPlacesConfig();

  return (
    <>
      <Hero />
      <ReviewsBar />
      <CaseStudyShowcase items={work} />
      <OfferBlock />
      <VersusBlock />
      <ProcessSteps />
      {placesReady && <ReviewsBlock />}
      <FAQSection />
      <CTAStrip />
    </>
  );
}
