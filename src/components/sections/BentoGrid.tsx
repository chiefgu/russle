import { cn } from '@/lib/cn';
import { ICONS } from './icons';

export type BentoItem = { icon: string; title: string; body: string };

// Six-cell bento: alternating wide/narrow cells that tile the grid exactly
// (rows [2,1] [1,2] [2,1] at lg), a featured accent-tinted cell, one inverted
// dark cell, and ghost icons filling the wide cells. Light cells take the
// opposite tone to the section so they always read as cards.
export function BentoGrid({ items, sectionTone }: { items: BentoItem[]; sectionTone: 'bg' | 'surface' }) {
  const cellLight = sectionTone === 'surface' ? 'bg-[var(--color-bg)]' : 'bg-[var(--color-surface)]';
  return (
    <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const Icon = ICONS[item.icon];
        const wide = i === 0 || i === 3 || i === 4;
        const featured = i === 0;
        const dark = i === 3;
        return (
          <div
            key={item.title}
            className={cn(
              'relative flex h-full flex-col overflow-hidden p-8 md:p-10',
              wide && 'lg:col-span-2',
              dark ? 'bg-[var(--color-dark)]' : cellLight,
            )}
          >
            {featured && <span aria-hidden className="absolute inset-0 bg-[var(--color-accent-tint)]" />}
            {wide && (
              <Icon
                aria-hidden
                className={cn(
                  'pointer-events-none absolute -bottom-6 -right-6 h-36 w-36',
                  dark ? 'text-[var(--color-on-dark)] opacity-[0.08]' : 'text-[var(--color-accent)] opacity-[0.08]',
                )}
              />
            )}
            <span
              className={cn(
                'relative flex items-center justify-center rounded-[14px]',
                featured
                  ? 'h-14 w-14 bg-[var(--color-accent)]'
                  : dark
                    ? 'h-12 w-12 bg-[rgba(248,247,245,0.12)]'
                    : 'h-12 w-12 bg-[var(--color-accent-tint)]',
              )}
            >
              <Icon
                className={cn(
                  featured
                    ? 'h-7 w-7 text-[var(--color-on-accent)]'
                    : dark
                      ? 'h-6 w-6 text-[var(--color-on-dark)]'
                      : 'h-6 w-6 text-[var(--color-accent)]',
                )}
              />
            </span>
            <h3 className={cn('relative mt-6 text-balance', featured ? 'h4' : 'h5', dark && 'text-[var(--color-on-dark)]')}>
              {item.title}
            </h3>
            <p
              className={cn(
                'text-body relative mt-4',
                wide && 'max-w-md',
                dark ? 'text-[var(--color-on-dark-mute)]' : 'text-[var(--color-text-mute)]',
              )}
            >
              {item.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}
