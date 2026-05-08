import { Check, Play, Mail, Search, FileText, MapPin } from 'lucide-react';

import { cn } from '@/lib/cn';

type ManageVisualProps = {
  className?: string;
};

const months = [
  { label: 'Feb', state: 'past' as const },
  { label: 'Mar', state: 'past' as const },
  { label: 'Apr', state: 'past' as const },
  { label: 'May', state: 'current' as const },
  { label: 'Jun', state: 'planned' as const },
  { label: 'Jul', state: 'planned' as const },
];

const thisMonth = [
  { icon: Mail, label: 'Email', detail: 'Tasting box flow', done: true },
  { icon: Search, label: 'Search', detail: 'H1 + meta audit', done: true },
  { icon: FileText, label: 'Content', detail: 'Brand guide PDF', done: false },
  { icon: MapPin, label: 'Local', detail: 'GBP photo refresh', done: false },
];

export function ManageVisual({ className }: ManageVisualProps) {
  return (
    <div
      role="img"
      aria-label="The Manage tier runs as a monthly cadence: each month a recurring set of search, email, content and local-search work, with progress visible across the year."
      className={cn(
        // Square through tablet (column too narrow for 4 items at 4:3); 4:3 at lg+
        'relative mx-auto flex aspect-square w-full max-w-[640px] flex-col gap-4 p-4 lg:aspect-[4/3] lg:p-6',
        className,
      )}
    >
      {/* Eyebrow */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-mute)]">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          <span>Ongoing · monthly cadence</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
          12-mo retainer
        </div>
      </div>

      {/* Month strip */}
      <div className="grid flex-shrink-0 grid-cols-6 gap-1.5 md:gap-2">
        {months.map((m) => (
          <Month key={m.label} label={m.label} state={m.state} />
        ))}
      </div>

      {/* This-month detail card */}
      <div className="flex flex-1 flex-col gap-2 overflow-hidden rounded-[var(--radius-m)] border border-[var(--color-line-2)] bg-[var(--color-surface)] p-3 md:gap-3 md:p-4">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-mute)]">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            <span>This month · May 2026</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            2/4 done
          </span>
        </div>

        <ul className="flex flex-1 flex-col justify-around">
          {thisMonth.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2.5 border-b border-[var(--color-line)] py-1.5 last:border-b-0 md:gap-3 md:py-2"
            >
              <span
                aria-hidden
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                  item.done
                    ? 'bg-[var(--color-accent)] text-[var(--color-on-accent)]'
                    : 'border border-[var(--color-line-2)] bg-[var(--color-bg)] text-[var(--color-text-mute)]',
                )}
              >
                {item.done ? <Check className="h-3 w-3" /> : <Play className="h-2.5 w-2.5 fill-current" />}
              </span>
              <item.icon className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-mute)]" />
              <span className="text-xs font-medium tracking-[-0.01em] text-[var(--color-text)] md:text-sm">
                {item.label}
              </span>
              <span className="ml-auto truncate text-[11px] text-[var(--color-text-mute)] md:text-xs">
                {item.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type MonthState = 'past' | 'current' | 'planned';

function Month({ label, state }: { label: string; state: MonthState }) {
  const containerClass =
    state === 'current'
      ? 'border-[var(--color-accent)] bg-[var(--color-accent-tint)]'
      : 'border-[var(--color-line-2)] bg-[var(--color-surface)]';

  const dotClass =
    state === 'past'
      ? 'bg-[var(--color-accent)]'
      : state === 'current'
        ? 'bg-[var(--color-accent)]'
        : 'bg-[var(--color-line-2)]';

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1.5 rounded-[var(--radius-s)] border p-1.5 md:gap-2 md:p-2',
        containerClass,
      )}
    >
      <span
        className={cn(
          'font-mono text-[10px] uppercase tracking-[0.14em]',
          state === 'current' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-mute)]',
        )}
      >
        {label}
      </span>
      <div className="flex flex-col gap-0.5">
        {state === 'current' ? (
          <>
            <span aria-hidden className="h-1.5 w-6 rounded-[1px] bg-[var(--color-accent)]" />
            <span aria-hidden className="h-1.5 w-6 rounded-[1px] bg-[var(--color-accent)]" />
            <span aria-hidden className="h-1.5 w-6 rounded-[1px] bg-[var(--color-accent)]/40" />
          </>
        ) : (
          <>
            <span aria-hidden className={cn('h-1 w-1 rounded-full', dotClass)} />
            <span aria-hidden className={cn('h-1 w-1 rounded-full', dotClass)} />
            <span aria-hidden className={cn('h-1 w-1 rounded-full', dotClass)} />
          </>
        )}
      </div>
    </div>
  );
}
