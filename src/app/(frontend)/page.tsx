import { Hero } from '@/components/sections/Hero';
import { ReviewsBar } from '@/components/sections/ReviewsBar';
import { TrustpilotStrip } from '@/components/sections/TrustpilotStrip';
import { ClientTiles } from '@/components/sections/ClientTiles';
import { ReviewsBlock } from '@/components/sections/ReviewsBlock';
import { Capabilities } from '@/components/sections/Capabilities';
import { CaseStudyShowcase } from '@/components/sections/CaseStudyShowcase';
import { OfferBlock } from '@/components/sections/OfferBlock';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { FreeReviewBand } from '@/components/sections/FreeReviewBand';
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
      <TrustpilotStrip />
      <ClientTiles />
      <Capabilities />
      <CaseStudyShowcase items={work} />
      <OfferBlock />
      <ProcessSteps />
      <FreeReviewBand />
      {placesReady && <ReviewsBlock />}
      <FAQSection />
      <CTAStrip />
    </>
  );
}
