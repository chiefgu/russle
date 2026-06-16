import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';
import { WhyRussleVisual } from '@/components/sections/WhyRussleVisual';

export function WhyRussle() {
  return (
    <Section tone="surface" spacing="xl">
      <div className="grid gap-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <Reveal>
            <Tag>Why russle</Tag>
            <h2 className="h2 mt-6 text-balance">
              One team for the work that should be one thing.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="text-big mt-10 max-w-3xl space-y-6 text-[var(--color-text)]">
              <p>
                Most businesses end up with a brand from one designer, a website from another, and their marketing from a third. Nothing fits together. The brand looks sharp on Instagram and amateur everywhere else.
              </p>
              <p className="text-[var(--color-text-mute)]">
                russle does the whole thing under one roof. Brand, website, search, email, and local marketing. Designed and built together so your business looks like one business, not five.
              </p>
              <p className="text-[var(--color-text-mute)]">
                One brief. One timeline. One quote. One number to call when something needs changing.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-5">
          <Reveal delay={0.1}>
            <WhyRussleVisual />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
