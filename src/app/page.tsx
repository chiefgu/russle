import { Hero } from '@/components/sections/Hero';
import { ReviewsBar } from '@/components/sections/ReviewsBar';
import { ReviewsBlock } from '@/components/sections/ReviewsBlock';
import { VersusBlock } from '@/components/sections/VersusBlock';
import { CaseStudyShowcase } from '@/components/sections/CaseStudyShowcase';
import { OfferBlock } from '@/components/sections/OfferBlock';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Testimonial } from '@/components/sections/Testimonial';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { hasPlacesConfig } from '@/lib/google-places';
import { getAllWork } from '@/lib/mdx';

export default async function HomePage() {
  const work = getAllWork().slice(0, 4);
  const placesReady = hasPlacesConfig();

  return (
    <>
      <Hero />
      <ReviewsBar />
      <CaseStudyShowcase items={work} />
      <OfferBlock />
      <VersusBlock />
      <ProcessSteps />
      {placesReady ? (
        <ReviewsBlock />
      ) : (
        <Testimonial
          quote="russle understood that I needed less, not more. No price page, no booking calendar, no essay about me. Just the photography, the testimonials, and an enquiry form designed to convert. It's the first site I've had that I'm happy to send people to."
          author="Abigail"
          role="Owner"
          company="Makeup by Abigail"
        />
      )}
      <FAQSection />
      <CTAStrip />
    </>
  );
}
