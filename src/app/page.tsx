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

// Override the layout-level theme-color so the iOS status bar tint matches
// the navbar on the home page. The navbar uses the same coral gradient as
// the hero, but iOS theme-color can only be a single colour — so we pick
// the visual midpoint of the gradient (~#EF8875). The notch tint and the
// solid navbar are within a tone of each other, no visible seam.
export const viewport: Viewport = {
  themeColor: '#EF8875',
};

export default function HomePage() {
  const work = getAllWork().slice(0, 3);

  return (
    <>
      {/*
        Three things in one style block:

        1. Paint the coral gradient onto html AND body so iPhone safe-area
           insets (notch in portrait, bezel in landscape, rubber-band
           overscroll) all show coral instead of the cream default.

        2. Set --nav-bg to the same gradient so the solid navbar disappears
           into the hero band. The navbar reads var(--nav-bg) at runtime.

        3. The notch theme-color is set separately via the viewport export
           above (single colour, gradient midpoint).
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body {
              background: #EC6F66;
              background: linear-gradient(to right, #F3A183, #EC6F66);
            }
            :root {
              --nav-bg: linear-gradient(to right, #F3A183, #EC6F66);
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
