import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';

const STEPS = [
  {
    n: '01',
    title: 'Discovery',
    body: 'We start with a 60-min call. You explain the business, the audience, the constraints. I leave with a shape of the work.',
  },
  {
    n: '02',
    title: 'Direction',
    body: 'Within a week you get a brand or design direction document — tokens, type, references, the why behind every move.',
  },
  {
    n: '03',
    title: 'Production',
    body: 'Iterative builds with weekly reviews. You see the work in the browser, not just Figma.',
  },
  {
    n: '04',
    title: 'Launch & after',
    body: "Domain, analytics, email, the lot. Then a month of free iteration once you've used the live site with real users.",
  },
];

export function ProcessSteps() {
  return (
    <Section tone="surface" spacing="xl">
      <div className="mb-12 max-w-2xl md:mb-16">
        <Reveal>
          <Tag>How it works</Tag>
          <h2 className="h2 mt-6 text-balance">A small process for big outcomes.</h2>
        </Reveal>
      </div>

      <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)]">
        {STEPS.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.05}>
            <div className="grid gap-6 bg-[var(--color-surface)] p-8 md:grid-cols-12 md:p-12">
              <div className="md:col-span-2">
                <span className="text-h3 font-medium tracking-[-0.04em] text-[var(--color-text-soft)]">
                  {step.n}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="h4">{step.title}</h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-big text-[var(--color-text-mute)]">{step.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
