import { Hero } from '@/components/sections/Hero';
import { WhyRussle } from '@/components/sections/WhyRussle';
import { VersusBlock } from '@/components/sections/VersusBlock';
import { CaseStudyShowcase } from '@/components/sections/CaseStudyShowcase';
import { OfferBlock } from '@/components/sections/OfferBlock';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Testimonial } from '@/components/sections/Testimonial';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Section } from '@/components/layout/Section';
import { Placeholder } from '@/components/ui/Placeholder';
import { getAllWork } from '@/lib/mdx';

export default function HomePage() {
  const work = getAllWork().slice(0, 4);

  return (
    <>
      <Hero />
      <Section tone="bg" spacing="m" container="main" className="pt-0 md:pt-0">
        <Placeholder
          label="Hero feature image. Studio work-in-progress, brand mood, or a curated montage of recent projects."
          hint="3000 × 1500 (21:9) recommended"
          aspect="21:9"
        />
      </Section>
      <WhyRussle />
      <VersusBlock />
      <CaseStudyShowcase items={work} />
      <OfferBlock />
      <ProcessSteps />
      <Testimonial
        quote="russle understood that I needed less, not more. No price page, no booking calendar, no essay about me. Just the photography, the testimonials, and an enquiry form designed to convert. It's the first site I've had that I'm happy to send people to."
        author="Abigail"
        role="Owner"
        company="Makeup by Abigail"
      />
      <FAQSection />
      <CTAStrip />
    </>
  );
}
