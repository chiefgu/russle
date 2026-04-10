import type { Viewport } from 'next';
import { Hero } from '@/components/sections/Hero';
import { LogoWall } from '@/components/sections/LogoWall';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { CaseStudyGrid } from '@/components/sections/CaseStudyGrid';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Testimonial } from '@/components/sections/Testimonial';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { getAllWork } from '@/lib/mdx';

// Solid peach navbar + matching notch on the home page. Same colour, no
// gradient, no mismatch.
export const viewport: Viewport = {
  themeColor: '#F3A183',
};

export default function HomePage() {
  const work = getAllWork().slice(0, 3);

  return (
    <>
      {/*
        Solid peach navbar + matching notch + matching html/body
        background. The hero gradient sits BELOW the navbar inside
        its own wrapping <div>, so the gradient still shows in the
        hero band but the navbar above it is a single flat colour.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body {
              background: #F3A183;
            }
            :root {
              --nav-bg: #F3A183;
            }
          `,
        }}
      />
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
