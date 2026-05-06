import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';

const COMPARISONS = [
  {
    title: 'Versus a template',
    body: "Squarespace and Wix templates are free and every other business in your sector uses the same one. Your brand becomes interchangeable. We build something only you have, on a stack you actually own.",
  },
  {
    title: 'Versus a freelancer',
    body: "A cheap freelancer can ship a working site. They can't build a brand and a site that match, and they can't run the SEO, email, and local systems behind it. Three people, three invoices, three things that don't fit together.",
  },
  {
    title: 'Versus an agency',
    body: "Agencies bill £15k+ for the launch alone, quote in PowerPoints, and assign your project to a junior. We're the studio you'd hire if you knew where to look. Same standard of work, none of the overhead.",
  },
];

export function VersusBlock() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="mb-12 max-w-3xl">
        <Reveal>
          <Tag>Versus</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">
            Why not the cheap or the expensive option.
          </h2>
        </Reveal>
      </div>

      <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] md:grid-cols-3">
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
