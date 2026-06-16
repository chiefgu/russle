import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';

const STEPS = [
  {
    n: '01',
    title: 'Discovery',
    body: 'Start with the intake form. We review the brief, then we book a 60-minute call to walk through it together. We come away with the shape of the work.',
  },
  {
    n: '02',
    title: 'Direction',
    body: 'Within a week, a brand-direction document covering colours, type, references, and the reasoning behind every choice.',
  },
  {
    n: '03',
    title: 'Production',
    body: 'You see the work as real, clickable pages in the browser, not flat mockups, and shape it with us as each page lands.',
  },
  {
    n: '04',
    title: 'Launch & after',
    body: "Domain, analytics, email, the lot. Then a month of free iteration once you have lived with the site.",
  },
];

type ProcessStepsProps = {
  tone?: 'surface' | 'bg';
};

export function ProcessSteps({ tone = 'surface' }: ProcessStepsProps = {}) {
  // Cards always render on the opposite tone so they read as distinct from
  // the surrounding section, regardless of which tone the section uses.
  const cardBg =
    tone === 'surface' ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-bg)]';

  return (
    <Section tone={tone} spacing="xl">
      <div className="mb-12 max-w-2xl md:mb-16">
        <Reveal>
          <Tag>How it works</Tag>
          <h2 className="h2 mt-6 text-balance">Four phases.</h2>
        </Reveal>
      </div>

      <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)]">
        {STEPS.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.05}>
            <div className={`grid gap-6 ${cardBg} p-8 md:grid-cols-12 md:p-12`}>
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
