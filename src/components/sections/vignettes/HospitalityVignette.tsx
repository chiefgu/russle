import { Check, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/cn';
import { CHIP, CHIP_LABEL, DARK_PILL, PILL_LABEL, SkeletonLine } from './chrome';

function QRMark({ className }: { className?: string }) {
  // Abstract QR mark drawn as a 5x5 grid
  const cells = [
    1, 1, 0, 1, 1,
    1, 0, 1, 0, 1,
    0, 1, 1, 1, 0,
    1, 0, 1, 0, 1,
    1, 1, 0, 1, 1,
  ];
  return (
    <span className={cn('grid grid-cols-5 gap-[1.5px]', className)}>
      {cells.map((on, i) => (
        <span
          key={i}
          className={cn('h-[3px] w-[3px] rounded-[1px]', on ? 'bg-[var(--color-text)]' : 'bg-transparent')}
        />
      ))}
    </span>
  );
}

export function HospitalityVignette({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="A restaurant taking a direct table booking for four at 7:30pm, with a live menu and a QR code that opens the menu."
      className={cn('relative mx-auto w-full max-w-[460px] px-6 py-8', className)}
    >
      <div aria-hidden>
        {/* Menu card in the back */}
        <div className="absolute left-8 top-2 w-[46%] -rotate-3 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-3.5 w-3.5 text-[var(--color-accent)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
              Tonight
            </span>
          </div>
          <div className="mt-3 space-y-2.5">
            <div className="flex items-center justify-between gap-3">
              <SkeletonLine className="w-3/5" />
              <SkeletonLine className="w-5 bg-[var(--color-line-2)]" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <SkeletonLine className="w-2/5" />
              <SkeletonLine className="w-5 bg-[var(--color-line-2)]" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <SkeletonLine className="w-1/2" />
              <SkeletonLine className="w-5 bg-[var(--color-line-2)]" />
            </div>
          </div>
        </div>

        {/* Booking card in front */}
        <div className="relative ml-auto mt-16 w-[70%] rotate-1 rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-6 shadow-[0_24px_48px_-24px_rgba(26,20,16,0.3)]">
          <span className="label text-[var(--color-text-soft)]">Booking</span>
          <p className="mt-3 text-[17px] font-semibold tracking-[-0.01em] text-[var(--color-text)]">
            Table for 4 · 7:30pm
          </p>
          <p className="text-small mt-1 text-[var(--color-text-mute)]">Friday, window seats</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent-tint)] px-3.5 py-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-accent)]">
              <Check className="h-2.5 w-2.5 text-[var(--color-on-accent)]" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-accent)]">
              Confirmed
            </span>
          </div>
        </div>

        {/* Scan-for-menu chip */}
        <div className={cn(CHIP, 'float-slow -left-1 bottom-4 -rotate-2')}>
          <QRMark />
          <span className={CHIP_LABEL}>Scan for menu</span>
        </div>

        {/* Reminder pill */}
        <div className={cn(DARK_PILL, 'float-slower -right-2 top-4 rotate-2')}>
          <span className={PILL_LABEL}>Reminder sent</span>
          <span className="h-3 w-px bg-[rgba(248,247,245,0.25)]" />
          <span className={PILL_LABEL}>No-show avoided</span>
        </div>
      </div>
    </div>
  );
}
