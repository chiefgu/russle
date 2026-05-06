import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';

type CaseStudyResultsProps = {
  items: string[];
  accentColor?: string;
};

export function CaseStudyResults({ items, accentColor }: CaseStudyResultsProps) {
  if (!items || items.length === 0) return null;

  return (
    <Section tone="surface" spacing="xl" container="main">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Reveal>
            <Tag>Results</Tag>
          </Reveal>
        </div>
        <div className="md:col-span-9">
          <Reveal delay={0.05}>
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-2 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: accentColor || 'var(--color-accent)' }}
                  />
                  <p className="text-big text-[var(--color-text)]">{item}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
