import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { CaseStudyBody } from '@/components/sections/CaseStudyBody';
import type { JournalEntry } from '@/lib/journal';

const TYPE_LABEL: Record<string, string> = {
  guide: 'Guide',
  comparison: 'Comparison',
  'local-appreciation': 'Local',
  positioning: 'Studio',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function JournalArticle({ entry }: { entry: JournalEntry }) {
  return (
    <>
      <Section tone="bg" spacing="heroTop" container="narrow">
        <div className="flex items-center gap-3">
          <Tag>{TYPE_LABEL[entry.type] || entry.type}</Tag>
          <span className="label text-[var(--color-text-soft)]">
            {formatDate(entry.date)}
          </span>
        </div>
        <h1 className="h1 mt-6 text-balance">{entry.title}</h1>
        <p className="text-big mt-8 max-w-2xl text-[var(--color-text-mute)]">
          {entry.summary}
        </p>
      </Section>

      <Section tone="bg" spacing="m" container="narrow">
        <CaseStudyBody body={entry.body} />
      </Section>

      <Section tone="bg" spacing="l" container="narrow">
        <h2 className="h2">Have a project in mind?</h2>
        <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
          Tell us about it in eight short steps. We come back inside 24 hours.
        </p>
        <div className="mt-10">
          <ButtonLink href="/start" variant="primary" size="lg" withArrow>
            Start a project
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
