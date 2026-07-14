import { PackageCheck, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/cn';
import { CHIP, CHIP_LABEL, DARK_PILL, PILL_LABEL, SkeletonLine } from './chrome';

export function FoodDrinkVignette({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="A bakery storefront taking an order: a boxed product, an order received alert, a Saturday collection slot and a live stock count."
      className={cn('relative mx-auto w-full max-w-[460px] px-6 py-8', className)}
    >
      <div aria-hidden>
        {/* Product card */}
        <div className="mx-auto w-[78%] rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-5 shadow-[0_24px_48px_-24px_rgba(26,20,16,0.25)]">
          <div className="relative overflow-hidden rounded-[var(--radius-m)] bg-[var(--color-surface-2)]">
            <div className="aspect-[4/3]" />
            {/* abstract cake box: lid band + ribbon, opaque enough to read */}
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <div className="relative h-24 w-28 overflow-hidden rounded-[10px] bg-[var(--color-bg)] shadow-md">
                <div className="absolute -top-1 left-1/2 h-4 w-[112%] -translate-x-1/2 rounded-[6px] bg-[rgba(223,86,19,0.22)]" />
                <div className="absolute inset-y-0 left-1/2 w-2.5 -translate-x-1/2 bg-[rgba(223,86,19,0.22)]" />
                <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-accent)]">
                  <span className="h-3 w-3 rounded-full bg-[var(--color-bg)]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <SkeletonLine className="w-2/3" />
            <SkeletonLine className="w-1/2 bg-[var(--color-surface)]" />
          </div>

          {/* stock pill + CTA */}
          <div className="mt-5 flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-accent-tint)] px-3.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-accent)]">
                12 left
              </span>
            </div>
            <div className="inline-flex h-10 items-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-on-accent)]">
              Order for Saturday
            </div>
          </div>
        </div>

        {/* Collection slot chip */}
        <div className={cn(CHIP, 'float-slow -left-1 top-10 -rotate-2')}>
          <CalendarDays className="h-4 w-4 text-[var(--color-accent)]" />
          <span className={CHIP_LABEL}>Collection · Sat 9:00</span>
        </div>

        {/* Order received pill (lower on mobile so it clears the collection chip) */}
        <div className={cn(DARK_PILL, 'float-slower -right-1 top-[30%] rotate-2 sm:top-[16%]')}>
          <PackageCheck className="h-4 w-4 text-[var(--color-on-dark)]" />
          <span className={PILL_LABEL}>Order received · just now</span>
        </div>

        {/* Subscription chip (desktop only; collides with the stock pill at phone widths) */}
        <div className={cn(CHIP, 'float-slowest -right-2 bottom-8 hidden rotate-1 sm:flex')}>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] font-bold text-[var(--color-on-accent)]">
            4
          </span>
          <span className={CHIP_LABEL}>Weekly subscribers</span>
        </div>
      </div>
    </div>
  );
}
