import { Check, Lock, PhoneCall } from 'lucide-react';
import { cn } from '@/lib/cn';
import { CHIP, CHIP_LABEL, DARK_PILL, PILL_LABEL } from './chrome';

const CASE_TYPES = [
  { label: 'Employment', selected: false },
  { label: 'Family', selected: true },
  { label: 'Property', selected: false },
];

export function SolicitorsVignette({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="A law firm enquiry flow: the client picks a case type, books a callback for 4pm, and the enquiry stays confidential."
      className={cn('relative mx-auto w-full max-w-[560px] px-6 py-10', className)}
    >
      <div aria-hidden>
        {/* Case-type selector card */}
        <div className="mx-auto w-[64%] rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-6 shadow-[0_24px_48px_-24px_rgba(26,20,16,0.25)]">
          <span className="label text-[var(--color-text-soft)]">What do you need help with?</span>

          <div className="mt-5 space-y-2.5">
            {CASE_TYPES.map((caseType) => (
              <div
                key={caseType.label}
                className={cn(
                  'flex items-center justify-between rounded-[var(--radius-m)] border px-4 py-3.5',
                  caseType.selected
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-tint)]'
                    : 'border-[var(--color-line)] bg-[var(--color-bg)]',
                )}
              >
                <span
                  className={cn(
                    'text-[13px] font-semibold',
                    caseType.selected ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]',
                  )}
                >
                  {caseType.label}
                </span>
                {caseType.selected ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)]">
                    <Check className="h-3 w-3 text-[var(--color-on-accent)]" />
                  </span>
                ) : (
                  <span className="h-5 w-5 rounded-full border-2 border-[var(--color-line-2)]" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-dark)] text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-on-dark)]">
            Continue
          </div>
        </div>

        {/* Callback chip */}
        <div className={cn(CHIP, 'float-slow left-[4%] top-[57%] -rotate-2')}>
          <PhoneCall className="h-4 w-4 text-[var(--color-accent)]" />
          <span className={CHIP_LABEL}>Callback today · 4:00pm</span>
        </div>

        {/* Confidential pill */}
        <div className={cn(DARK_PILL, 'float-slower -right-1 top-8 rotate-2')}>
          <Lock className="h-4 w-4 text-[var(--color-on-dark)]" />
          <span className={PILL_LABEL}>Confidential enquiry</span>
        </div>

        {/* Routed chip */}
        <div className={cn(CHIP, 'float-slowest right-4 -bottom-1 rotate-1')}>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] font-bold text-[var(--color-on-accent)]">
            F
          </span>
          <span className={CHIP_LABEL}>Routed to family team</span>
        </div>
      </div>
    </div>
  );
}
