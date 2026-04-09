import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { IntakeForm } from '@/components/sections/IntakeForm';

export const metadata: Metadata = {
  title: 'Start a project',
  description:
    'Eight short steps. Tell me about your project and I&apos;ll come back with a real proposal within 24 hours.',
};

export default function StartPage() {
  return (
    <>
      <Section tone="bg" spacing="heroTop" container="narrow">
        <div className="mb-12">
          <Tag>Project intake</Tag>
          <h1 className="h1 mt-6 text-balance">Tell me about your project.</h1>
          <p className="text-big mt-8 max-w-xl text-[var(--color-text-mute)]">
            Eight short steps. Takes about 5 minutes. The more you share, the faster I can come back with a real proposal.
          </p>
        </div>
        <IntakeForm />
      </Section>
    </>
  );
}
