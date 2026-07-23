'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { useFocusTrap } from '@/lib/use-focus-trap';
import { cn } from '@/lib/cn';
import { ICONS } from './icons';

export type BentoItem = { icon: string; title: string; body: string; detail: string };

// Takeover detail dialog, same interaction language as Loop's "Ways to show
// up" cards: backdrop blur, spring entrance, focus trap, Escape, scroll lock.
function BentoDetailModal({
  item,
  open,
  onClose,
}: {
  item: BentoItem | null;
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  useFocusTrap(open, cardRef);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const Icon = item ? ICONS[item.icon] : null;

  return (
    <AnimatePresence>
      {open && item && Icon ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-[rgba(26,20,16,0.45)] backdrop-blur-[2px]"
          />

          <motion.div
            ref={cardRef}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[var(--radius-l)] bg-[var(--color-bg)] p-8 shadow-[0_24px_60px_rgba(26,20,16,0.3)] sm:w-[min(600px,calc(100%-32px))] sm:rounded-[var(--radius-l)] sm:p-12"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-text-mute)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-[var(--color-accent)]">
              <Icon className="h-7 w-7 text-[var(--color-on-accent)]" />
            </span>
            <h2 id={titleId} className="h3 mt-6 text-balance">
              {item.title}
            </h2>
            <p className="text-big mt-4 text-[var(--color-text-mute)]">{item.body}</p>
            <p className="text-body mt-5 text-[var(--color-text)]">{item.detail}</p>

            <div className="mt-8 border-t border-[var(--color-line)] pt-6">
              <ButtonLink href="/start" variant="primary" size="md" withArrow>
                Start a project
              </ButtonLink>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

// Six-cell bento: alternating wide/narrow cells that tile the grid exactly
// (rows [2,1] [1,2] [2,1] at lg), a featured accent-tinted lead cell, and
// ghost icons filling the wide cells at desktop. Cells take the opposite
// tone to the section so they always read as cards. Hover lifts with an
// accent wash; click opens the full takeover dialog above.
export function BentoGrid({ items, sectionTone }: { items: BentoItem[]; sectionTone: 'bg' | 'surface' }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const cellLight = sectionTone === 'surface' ? 'bg-[var(--color-bg)]' : 'bg-[var(--color-surface)]';

  return (
    <>
      <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const Icon = ICONS[item.icon];
          const wide = i === 0 || i === 3 || i === 4;
          const featured = i === 0;
          return (
            <motion.button
              key={item.title}
              type="button"
              aria-haspopup="dialog"
              onClick={() => setOpen(i)}
              whileHover={reduce ? undefined : { y: -3 }}
              transition={{ type: 'spring', stiffness: 360, damping: 26 }}
              className={cn(
                // Phones get a compact icon-beside-text row; sm+ returns to cards.
                'group relative flex h-full cursor-pointer gap-4 overflow-hidden p-6 pr-14 text-left outline-none sm:flex-col sm:gap-0 sm:p-8 md:p-10',
                'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-accent)]',
                wide && 'lg:col-span-2',
                cellLight,
              )}
            >
              {featured && <span aria-hidden className="absolute inset-0 bg-[var(--color-accent-tint)]" />}
              {/* hover wash */}
              <span
                aria-hidden
                className="absolute inset-0 bg-[var(--color-accent-tint)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              {wide && (
                <Icon
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 -right-6 hidden h-36 w-36 text-[var(--color-accent)] opacity-[0.08] transition-transform duration-500 group-hover:-rotate-6 lg:block"
                />
              )}

              {/* open affordance: arrow fades in and slides, Loop idiom */}
              <span
                aria-hidden
                className="absolute right-5 top-5 flex h-8 w-8 -translate-x-1 items-center justify-center text-[var(--color-accent)] opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:right-6 sm:top-6"
              >
                <ArrowUpRight className="h-5 w-5" />
              </span>

              <span
                className={cn(
                  'relative flex shrink-0 items-center justify-center rounded-[14px] transition-colors duration-300',
                  featured
                    ? 'h-12 w-12 bg-[var(--color-accent)] sm:h-14 sm:w-14'
                    : 'h-12 w-12 bg-[var(--color-accent-tint)] group-hover:bg-[var(--color-accent)]',
                )}
              >
                <Icon
                  className={cn(
                    'transition-colors duration-300',
                    featured
                      ? 'h-6 w-6 text-[var(--color-on-accent)] sm:h-7 sm:w-7'
                      : 'h-6 w-6 text-[var(--color-accent)] group-hover:text-[var(--color-on-accent)]',
                  )}
                />
              </span>
              <span className="min-w-0">
                <span className={cn('relative block text-balance sm:mt-6', featured ? 'h4' : 'h5')}>
                  {item.title}
                </span>
                <span
                  className={cn(
                    'text-body relative mt-2 block text-[var(--color-text-mute)] sm:mt-4',
                    wide && 'max-w-md',
                  )}
                >
                  {item.body}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <BentoDetailModal item={open === null ? null : items[open]} open={open !== null} onClose={() => setOpen(null)} />
    </>
  );
}
