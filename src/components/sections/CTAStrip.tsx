import { Section } from '@/components/layout/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';

type CTAStripProps = {
  heading?: string;
  sub?: string;
};

export function CTAStrip({
  heading = 'Got a project in mind?',
  sub = 'Tell me about it. I respond to every enquiry within 24 hours.',
}: CTAStripProps) {
  return (
    <Section tone="dark" spacing="xl">
      <div className="grid items-end gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <h2 className="h1 max-w-3xl text-balance">{heading}</h2>
          <p className="text-big mt-6 max-w-xl text-[var(--color-on-dark-mute)]">{sub}</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5">
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <ButtonLink href="/start" variant="accent" size="lg" withArrow>
              Start a project
            </ButtonLink>
            <ButtonLink
              href="/contact#call"
              variant="secondary"
              size="lg"
              className="border-[var(--color-on-dark-mute)] text-[var(--color-on-dark)] hover:bg-[var(--color-dark-2)]"
            >
              Book a call
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
