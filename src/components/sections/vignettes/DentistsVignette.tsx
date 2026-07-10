import { BellRing, UserPlus } from 'lucide-react';
import { cn } from '@/lib/cn';
import { CHIP, CHIP_LABEL, DARK_PILL, PILL_LABEL, Stars } from './chrome';

// Calendar dot states: 0 = past/empty, 1 = available, 2 = booked (accent)
const MONTH: number[] = [
  0, 0, 1, 1, 2, 1, 1,
  1, 2, 1, 1, 1, 2, 0,
  1, 1, 2, 2, 1, 1, 1,
  2, 1, 1, 1, 2, 1, 0,
];

export function DentistsVignette({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="A dental clinic booking calendar filling with new patient appointments, a recall reminder and a five-star review score."
      className={cn('relative mx-auto w-full max-w-[520px] px-6 py-8', className)}
    >
      <div aria-hidden>
        {/* Calendar card */}
        <div className="mx-auto w-[72%] rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-6 shadow-[0_24px_48px_-24px_rgba(26,20,16,0.25)]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
              Appointments
            </span>
            <span className="rounded-[var(--radius-pill)] bg-[var(--color-accent-tint)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-accent)]">
              9 new this week
            </span>
          </div>

          <div className="mt-5 grid grid-cols-7 gap-2.5">
            {MONTH.map((state, i) => (
              <span
                key={i}
                className={cn(
                  'aspect-square rounded-full',
                  state === 0 && 'bg-transparent',
                  state === 1 && 'bg-[var(--color-surface-2)]',
                  state === 2 && 'bg-[var(--color-accent)]',
                )}
              />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between rounded-[var(--radius-m)] bg-[var(--color-surface)] px-4 py-3">
            <div className="space-y-1.5">
              <div className="h-2.5 w-24 rounded-full bg-[var(--color-surface-2)]" />
              <div className="h-2.5 w-16 rounded-full bg-[var(--color-line)]" />
            </div>
            <span className="inline-flex h-9 items-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-4 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-on-accent)]">
              Book online
            </span>
          </div>
        </div>

        {/* New patient chip */}
        <div className={cn(CHIP, 'float-slow -left-1 top-8 -rotate-2')}>
          <UserPlus className="h-4 w-4 text-[var(--color-accent)]" />
          <span className={CHIP_LABEL}>New patient enquiry</span>
        </div>

        {/* Recall reminder pill */}
        <div className={cn(DARK_PILL, 'float-slower -right-1 top-[24%] rotate-2')}>
          <BellRing className="h-4 w-4 text-[var(--color-on-dark)]" />
          <span className={PILL_LABEL}>Reminder · 2 days before</span>
        </div>

        {/* Reviews chip */}
        <div className={cn(CHIP, 'float-slowest -right-2 bottom-6 rotate-1')}>
          <Stars />
          <span className={CHIP_LABEL}>5.0 · 212 reviews</span>
        </div>
      </div>
    </div>
  );
}
