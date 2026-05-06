import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';

export function WhyRussle() {
  return (
    <Section tone="surface" spacing="xl">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <Tag>Why russle</Tag>
            <h2 className="h2 mt-6 text-balance">
              One studio for the work that should be one thing.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal delay={0.05}>
            <div className="text-big max-w-3xl space-y-6 text-[var(--color-text)]">
              <p>
                Most independent businesses end up with a brand from one designer, a website from another, and their marketing from a third. Nothing fits together. The brand looks sharp on Instagram and amateur everywhere else.
              </p>
              <p className="text-[var(--color-text-mute)]">
                russle does the whole thing in one studio. Brand, website, search, email, and local marketing. Designed and built together so your business looks like one business, not five.
              </p>
              <p className="text-[var(--color-text-mute)]">
                One brief. One timeline. One quote. One number to call when something needs changing.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
