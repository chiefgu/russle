import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';

type PageHeaderProps = {
  label: string;
  title: string;
  sub?: string;
};

export function PageHeader({ label, title, sub }: PageHeaderProps) {
  return (
    <Section tone="bg" spacing="heroTop" container="main">
      <div className="max-w-4xl">
        <Reveal>
          <Tag>{label}</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="h1 mt-6 text-balance">{title}</h1>
        </Reveal>
        {sub && (
          <Reveal delay={0.15}>
            <p className="text-big mt-8 max-w-2xl text-[var(--color-text-mute)]">{sub}</p>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
