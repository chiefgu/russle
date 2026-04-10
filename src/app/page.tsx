import { Hero } from '@/components/sections/Hero';
import { LogoWall } from '@/components/sections/LogoWall';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { CaseStudyGrid } from '@/components/sections/CaseStudyGrid';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Testimonial } from '@/components/sections/Testimonial';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { getAllWork } from '@/lib/mdx';

export default function HomePage() {
  const work = getAllWork().slice(0, 3);

  return (
    <>
      {/* Coral gradient hero band — Hero + LogoWall sit on one continuous surface */}
      <div className="bg-[#EC6F66] bg-gradient-to-r from-[#F3A183] to-[#EC6F66]">
        <Hero />
        <LogoWall />
      </div>
      <FeatureGrid />
      <CaseStudyGrid items={work} variant="home" />
      <ProcessSteps />
      <Testimonial
        quote="russle understood that I needed less, not more. No price page, no booking calendar, no essay about me — just the photography, the testimonials, and an enquiry form designed to convert. It's the first site I've had that I'm happy to send people to."
        author="Abigail"
        role="Owner"
        company="Makeup by Abigail"
      />
      <FAQSection />
      <CTAStrip />
    </>
  );
}
