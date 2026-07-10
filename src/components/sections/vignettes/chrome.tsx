import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';

// Shared chrome for industry vignettes, matching the EcommerceVignette idiom.

export const CHIP =
  'absolute flex items-center gap-2 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 shadow-[0_16px_32px_-16px_rgba(26,20,16,0.3)]';

export const DARK_PILL =
  'absolute flex items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-4 py-2.5 shadow-[0_16px_32px_-16px_rgba(26,20,16,0.4)]';

export const CHIP_LABEL =
  'text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]';

export const PILL_LABEL = 'text-[12px] font-semibold text-[var(--color-on-dark)]';

export function Stars({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <span className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />
      ))}
    </span>
  );
}

export function SkeletonLine({ className }: { className?: string }) {
  return <div className={cn('h-3 rounded-full bg-[var(--color-surface-2)]', className)} />;
}
