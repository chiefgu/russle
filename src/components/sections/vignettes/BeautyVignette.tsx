import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { CHIP, CHIP_LABEL, DARK_PILL, PILL_LABEL, Stars } from './chrome';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// Which slots are filled per day column (0 = free, 1 = booked, 2 = just booked)
const SLOTS: number[][] = [
  [1, 1, 0, 1],
  [1, 0, 1, 1],
  [1, 1, 1, 0],
  [0, 1, 1, 1],
  [1, 1, 2, 1],
  [1, 1, 1, 1],
];

export function BeautyVignette({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="A salon booking diary filling up for the week, with a 2:30pm appointment just booked, a deposit paid and a new five-star review."
      className={cn('relative mx-auto w-full max-w-[520px] px-6 py-8', className)}
    >
      <div aria-hidden>
        {/* Diary card */}
        <div className="mx-auto w-[82%] rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-5 shadow-[0_24px_48px_-24px_rgba(26,20,16,0.25)]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
              This week
            </span>
            <span className="rounded-[var(--radius-pill)] bg-[var(--color-accent-tint)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-accent)]">
              21 booked
            </span>
          </div>

          <div className="mt-4 grid grid-cols-6 gap-2">
            {DAYS.map((day, col) => (
              <div key={day} className="flex flex-col gap-1.5">
                <span className="text-center text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
                  {day}
                </span>
                {SLOTS[col].map((state, row) => (
                  <span
                    key={row}
                    className={cn(
                      'h-5 rounded-[5px]',
                      state === 0 && 'border border-dashed border-[var(--color-line-2)]',
                      state === 1 && 'bg-[var(--color-surface-2)]',
                      state === 2 && 'bg-[var(--color-accent)]',
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Just booked chip */}
        <div className={cn(CHIP, 'float-slow -left-1 top-[42%] -rotate-2')}>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)]">
            <Check className="h-3 w-3 text-[var(--color-on-accent)]" />
          </span>
          <span className={CHIP_LABEL}>2:30pm · Booked</span>
        </div>

        {/* Deposit pill */}
        <div className={cn(DARK_PILL, 'float-slower -right-1 top-[58%] rotate-2')}>
          <span className={PILL_LABEL}>Deposit paid</span>
          <span className="h-3 w-px bg-[rgba(248,247,245,0.25)]" />
          <span className={PILL_LABEL}>Slot held</span>
        </div>

        {/* Review chip */}
        <div className={cn(CHIP, 'float-slowest -left-2 bottom-6 rotate-1')}>
          <Stars />
          <span className={CHIP_LABEL}>New review</span>
        </div>
      </div>
    </div>
  );
}
