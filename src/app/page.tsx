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
// the coral gradient on the home page only. iOS theme-color can only be a
// single colour, never a gradient — so we pick the visual midpoint of the
// gradient (#F3A183 → #EC6F66 averages to ~#EF8875) so the safe-area strip
// reads as a continuation of the band underneath the navbar instead of a
// flat slab.
export const viewport: Viewport = {
  themeColor: '#EF8875',
};

export default function HomePage() {
  const work = getAllWork().slice(0, 3);

  return (
    <>
      {/*
        Paint the coral gradient onto html AND body so the safe-area insets
        on iPhone (notch / dynamic island in portrait, bezel in landscape,
        rubber-band overscroll) all show coral instead of the cream default.
        The visible band still ends correctly because the wrapping <div>
        below repeats the gradient and the FeatureGrid below has its own
        opaque surface background.

        Three layers needed because iOS Safari paints in this order:
          1. html background  → visible during rubber-band overscroll
          2. body background  → visible in the viewport area outside any child
          3. element bg       → visible inside its own paint area
        Without 1+2, the safe-area inset above the body shows cream.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body {
              background: #EC6F66;
              background: linear-gradient(to right, #F3A183, #EC6F66);
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
