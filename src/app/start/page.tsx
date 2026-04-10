import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { IntakeForm } from '@/components/sections/IntakeForm';

export const metadata: Metadata = {
  title: 'Start a project',
  description:
    "Eight short steps, about five minutes. Tell me about your project and I'll come back within 24 hours.",
};

export default function StartPage() {
  return (
    <>
      <Section tone="bg" spacing="heroTop" container="narrow">
        <div className="mb-12">
          <Tag>Project intake</Tag>
          <h1 className="h1 mt-6 text-balance">Tell me about your project.</h1>
          <p className="text-big mt-8 max-w-xl text-[var(--color-text-mute)]">
            Eight steps, about five minutes. The more detail, the better my reply.
          </p>
        </div>
        <IntakeForm />
      </Section>
    </>
  );
}
