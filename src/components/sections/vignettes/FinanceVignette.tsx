import { CalendarCheck, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/cn';
import { CHIP, CHIP_LABEL, DARK_PILL, PILL_LABEL } from './chrome';

function SliderRow({ label, position }: { label: string; position: string }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
          {label}
        </span>
      </div>
      <div className="relative mt-2 h-1.5 rounded-full bg-[var(--color-surface-2)]">
        <div className={cn('absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent)]', position)} />
        <span
          className={cn(
            'absolute top-1/2 h-4 w-4 -translate-y-1/2 translate-x-[-8px] rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)] shadow-sm',
          )}
          style={{ left: position === 'w-2/3' ? '66.6%' : '40%' }}
        />
      </div>
    </div>
  );
}

export function FinanceVignette({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="A financial adviser website with a repayment calculator, a consultation booked and a qualified enquiry arriving."
      className={cn('relative mx-auto w-full max-w-[460px] px-6 py-8', className)}
    >
      <div aria-hidden>
        {/* Calculator card */}
        <div className="mx-auto w-[76%] rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-6 shadow-[0_24px_48px_-24px_rgba(26,20,16,0.25)]">
          <span className="label text-[var(--color-text-soft)]">Repayment calculator</span>

          <div className="mt-5 space-y-5">
            <SliderRow label="Amount" position="w-2/3" />
            <SliderRow label="Term" position="w-2/5" />
          </div>

          <div className="mt-6 rounded-[var(--radius-m)] bg-[var(--color-surface)] px-5 py-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
              Monthly repayment
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              {/* abstracted figure, same skeleton idiom as the other vignettes */}
              <span className="h-6 w-20 rounded-[6px] bg-[var(--color-accent-tint)]" />
              <span className="text-[14px] font-medium text-[var(--color-text-mute)]">/ month</span>
            </div>
          </div>
        </div>

        {/* Consultation chip */}
        <div className={cn(CHIP, 'float-slow -left-1 top-2 -rotate-2')}>
          <CalendarCheck className="h-4 w-4 text-[var(--color-accent)]" />
          <span className={CHIP_LABEL}>Consultation · Thu 10am</span>
        </div>

        {/* Qualified lead pill */}
        <div className={cn(DARK_PILL, 'float-slower -right-1 top-[20%] rotate-2')}>
          <span className={PILL_LABEL}>New enquiry</span>
          <span className="h-3 w-px bg-[rgba(248,247,245,0.25)]" />
          <span className={PILL_LABEL}>Pre-qualified</span>
        </div>

        {/* Credentials chip */}
        <div className={cn(CHIP, 'float-slowest -right-2 bottom-8 rotate-1')}>
          <ShieldCheck className="h-4 w-4 text-[var(--color-accent)]" />
          <span className={CHIP_LABEL}>Credentials shown</span>
        </div>
      </div>
    </div>
  );
}
