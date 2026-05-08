import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import type { JournalMeta } from '@/lib/journal';

const TYPE_LABEL: Record<string, string> = {
  guide: 'Guide',
  comparison: 'Comparison',
  'local-appreciation': 'Local',
  positioning: 'Studio',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function JournalIndex({ items }: { items: JournalMeta[] }) {
  return (
    <>
      <Section tone="bg" spacing="heroTop" container="narrow">
        <Tag>Journal</Tag>
        <h1 className="h1 mt-6 text-balance">Notes from the studio.</h1>
        <p className="text-big mt-8 max-w-2xl text-[var(--color-text-mute)]">
          Guides, comparisons, and local notes from russle. Useful if you are
          weighing up a brand or website project, or building an indie business in
          Cheshire and South Manchester.
        </p>
      </Section>

      <Section tone="bg" spacing="m" container="narrow">
        {items.length === 0 ? (
          <p className="text-big text-[var(--color-text-mute)]">
            New entries coming soon.
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-[var(--color-line)]">
            {items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/journal/${item.slug}`}
                  className="group flex items-start justify-between gap-6 py-8 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="label text-[var(--color-text-soft)]">
                        {formatDate(item.date)}
                      </span>
                      <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--color-text-soft)]" />
                      <span className="label text-[var(--color-text-soft)]">
                        {TYPE_LABEL[item.type] || item.type}
                      </span>
                    </div>
                    <h2 className="h4 mt-3 max-w-2xl text-balance group-hover:text-[var(--color-accent)] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-body mt-3 max-w-2xl text-[var(--color-text-mute)]">
                      {item.summary}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-line-2)] transition-all group-hover:bg-[var(--color-text)] group-hover:text-[var(--color-bg)] group-hover:border-transparent"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
