import { Bell } from 'lucide-react';
import { cn } from '@/lib/cn';
import { CHIP, CHIP_LABEL, DARK_PILL, PILL_LABEL, SkeletonLine } from './chrome';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export function FashionVignette({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="An editorial fashion product page with size selection, a back-in-stock alert and a countdown to the next drop."
      className={cn('relative mx-auto w-full max-w-[520px] px-6 py-8', className)}
    >
      <div aria-hidden>
        {/* Editorial product tile */}
        <div className="mx-auto w-[62%] rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-5 shadow-[0_24px_48px_-24px_rgba(26,20,16,0.25)]">
          <div className="relative overflow-hidden rounded-[var(--radius-m)] bg-[var(--color-surface-2)]">
            <div className="aspect-[3/4]" />
            {/* abstract garment: draped shape */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-32 w-24">
                <div className="absolute inset-x-3 top-0 h-5 rounded-t-[12px] bg-[var(--color-bg)]" />
                <div className="absolute inset-x-0 top-4 bottom-0 rounded-[14px] bg-[var(--color-bg)] shadow-sm" />
                <div className="absolute inset-x-5 top-9 bottom-4 rounded-[10px] bg-[var(--color-accent-tint)]" />
              </div>
            </div>
            <span className="absolute left-3 top-3 rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--color-on-dark)]">
              New drop
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <SkeletonLine className="w-3/4" />
            <SkeletonLine className="w-1/3 bg-[var(--color-surface)]" />
          </div>

          {/* size pills */}
          <div className="mt-4 flex gap-1.5">
            {SIZES.map((size) => (
              <span
                key={size}
                className={cn(
                  'flex h-8 w-9 items-center justify-center rounded-[8px] border text-[10px] font-bold',
                  size === 'M'
                    ? 'border-[var(--color-dark)] bg-[var(--color-dark)] text-[var(--color-on-dark)]'
                    : 'border-[var(--color-line)] text-[var(--color-text-mute)]',
                )}
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Back in stock chip */}
        <div className={cn(CHIP, 'float-slow -left-1 top-[22%] -rotate-2')}>
          <Bell className="h-4 w-4 text-[var(--color-accent)]" />
          <span className={CHIP_LABEL}>Back in stock · Notify me</span>
        </div>

        {/* Drop countdown pill */}
        <div className={cn(DARK_PILL, 'float-slower -right-1 top-6 rotate-2')}>
          <span className={PILL_LABEL}>Drop live in</span>
          <span className="rounded-[6px] bg-[rgba(248,247,245,0.14)] px-2 py-0.5 font-mono text-[12px] font-semibold tracking-[0.06em] text-[var(--color-on-dark)]">
            02:14:09
          </span>
        </div>

        {/* Waitlist chip */}
        <div className={cn(CHIP, 'float-slowest -right-2 bottom-10 rotate-1')}>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] font-bold text-[var(--color-on-accent)]">
            86
          </span>
          <span className={CHIP_LABEL}>On the waitlist</span>
        </div>
      </div>
    </div>
  );
}
