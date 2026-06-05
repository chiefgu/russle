import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { StartChooser } from '@/components/sections/StartChooser';

export const metadata: Metadata = {
  title: 'Start a project',
  description:
    'Eight short steps, about five minutes. Tell us about your project and we come back inside 24 hours with questions or a call slot.',
};

export default function StartPage() {
  return (
    <>
      <Section tone="bg" spacing="heroTop" container="narrow">
        <div className="mb-12">
          <Tag>Start a project</Tag>
          <h1 className="h1 mt-6 text-balance">Tell us about your project.</h1>
          <p className="text-big mt-8 max-w-xl text-[var(--color-text-mute)]">
            Pick the shape that fits. Quick is five fields and sixty seconds.
            Detailed is eight sections for projects that already have shape.
            Either way, we come back inside 24 hours with questions or a call
            slot.
          </p>
          <p className="text-small mt-6 max-w-xl text-[var(--color-text-soft)]">
            Prefer to chat first? WhatsApp us at{' '}
            <a
              href="https://wa.me/447377902508"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] underline-offset-4 hover:underline"
            >
              07377 902508
            </a>{' '}
            or email{' '}
            <a
              href="mailto:hello@russle.co.uk"
              className="text-[var(--color-accent)] underline-offset-4 hover:underline"
            >
              hello@russle.co.uk
            </a>
            .
          </p>
        </div>
        <StartChooser />
      </Section>
    </>
  );
}
