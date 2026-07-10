import { Check, FileText } from 'lucide-react';
import { cn } from '@/lib/cn';
import { CHIP, CHIP_LABEL, DARK_PILL, PILL_LABEL, Stars } from './chrome';

export function TradesVignette({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="A trades job pipeline: a before-and-after job photo, a quote sent and accepted, and a five-star review earned."
      className={cn('relative mx-auto w-full max-w-[560px] px-6 py-10', className)}
    >
      <div aria-hidden>
        {/* Before / after job card */}
        <div className="mx-auto w-[80%] rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-5 shadow-[0_24px_48px_-24px_rgba(26,20,16,0.25)]">
          <div className="relative overflow-hidden rounded-[var(--radius-m)]">
            <div className="grid aspect-[16/9] grid-cols-2">
              {/* before: rough */}
              <div className="relative bg-[var(--color-surface-2)]">
                <div className="absolute left-4 top-4 h-2 w-10 rounded-full bg-[var(--color-line-2)]" />
                <div className="absolute bottom-5 left-4 right-6 h-10 rounded-[6px] border border-dashed border-[var(--color-line-2)]" />
              </div>
              {/* after: finished */}
              <div className="relative bg-[var(--color-accent-tint)]">
                <div className="absolute left-6 top-4 h-2 w-10 rounded-full bg-[var(--color-accent)]" />
                <div className="absolute bottom-5 left-6 right-4 h-10 rounded-[6px] bg-[var(--color-bg)] shadow-sm" />
              </div>
            </div>
            {/* slider handle */}
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[var(--color-bg)]" />
            <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-bg)] shadow-md">
              <span className="text-[10px] font-bold text-[var(--color-text-soft)]">↔</span>
            </div>
            {/* labels */}
            <span className="absolute left-3 top-3 rounded-[var(--radius-pill)] bg-[var(--color-bg)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
              Before
            </span>
            <span className="absolute right-3 top-3 rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--color-on-dark)]">
              After
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-32 rounded-full bg-[var(--color-surface-2)]" />
              <div className="h-3 w-20 rounded-full bg-[var(--color-surface)]" />
            </div>
            <div className="inline-flex h-10 items-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-on-accent)]">
              Request a quote
            </div>
          </div>
        </div>

        {/* Quote sent chip */}
        <div className={cn(CHIP, 'float-slow -left-1 top-6 -rotate-2')}>
          <FileText className="h-4 w-4 text-[var(--color-accent)]" />
          <span className={CHIP_LABEL}>Quote sent · same day</span>
        </div>

        {/* Accepted chip */}
        <div className={cn(CHIP, 'float-slower left-6 -bottom-1 rotate-1')}>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)]">
            <Check className="h-3 w-3 text-[var(--color-on-accent)]" />
          </span>
          <span className={CHIP_LABEL}>Accepted · Job booked</span>
        </div>

        {/* Review pill */}
        <div className={cn(DARK_PILL, 'float-slowest -right-1 top-[38%] rotate-2')}>
          <Stars />
          <span className={PILL_LABEL}>Review earned</span>
        </div>
      </div>
    </div>
  );
}
