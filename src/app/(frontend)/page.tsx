import { Hero } from '@/components/sections/Hero';
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
  // Mum's Granola is pinned as the final slide so the Google-reviews section
  // that follows always hands off from it.
  const allWork = getAllWork().filter((w) => w.slug !== 'makeup-by-abigail');
  const pinnedLast = allWork.find((w) => w.slug === 'mums-granola');
  const work = [
    ...allWork
      .filter((w) => w.slug !== 'mums-granola')
      .slice(0, pinnedLast ? 3 : 4),
    ...(pinnedLast ? [pinnedLast] : []),
  ];
  const placesReady = hasPlacesConfig();

  return (
    <>
      <Hero />
      <TrustpilotStrip />
      <ClientTiles />
      <Capabilities />
      <CaseStudyShowcase items={work} />
      {placesReady && <ReviewsBlock />}
      <OfferBlock />
      <ProcessSteps />
      <FreeReviewBand />
      <FAQSection />
      <CTAStrip />
    </>
  );
}
