import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';

const COMPARISONS = [
  {
    title: 'Versus a template',
    body: "Squarespace and Wix templates are free, and every other business in your sector uses the same one. Your brand becomes interchangeable. We build something only you have, on a setup you actually own.",
  },
  {
    title: 'Versus piecing it together',
    body: "Most small businesses hire a brand designer, then a web developer, then a marketing person, three contracts and three timelines. The brand looks one way, the website looks another, and the marketing has nothing to work with. We do all of it in one studio so it actually fits together.",
  },
];

export function VersusBlock() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="mb-12 max-w-3xl">
        <Reveal>
          <Tag>Why one studio</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">
            The brand, the site, and the marketing should belong to the same business.
          </h2>
        </Reveal>
      </div>

      <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] md:grid-cols-2">
        {COMPARISONS.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <div className="flex h-full flex-col bg-[var(--color-bg)] p-8 md:p-10">
              <h3 className="h4 text-balance">{c.title}</h3>
              <p className="text-body mt-6 text-[var(--color-text-mute)]">
                {c.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
