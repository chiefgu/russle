import { Section } from '@/components/layout/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';

type CTAStripProps = {
  heading?: string;
  sub?: string;
};

export function CTAStrip({
  heading = 'Got a project in mind?',
  sub = 'Tell us about it. We respond to every enquiry within 24 hours.',
}: CTAStripProps) {
  return (
    <Section tone="dark" spacing="xl">
      <div className="grid items-end gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <h2 className="h1 max-w-3xl text-balance">{heading}</h2>
          <p className="text-big mt-6 max-w-xl text-[rgba(255,255,255,0.78)]">{sub}</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5">
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <ButtonLink href="/start" variant="primary" size="lg" withArrow>
              Start a project
            </ButtonLink>
            <ButtonLink
              href="/contact#call"
              variant="secondary-on-dark"
              size="lg"
            >
              Book a call
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
