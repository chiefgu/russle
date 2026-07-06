import { Search, ArrowUp, Sparkles, TrendingUp, CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/cn';

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.5z" />
      <path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A11.5 11.5 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.6 14.7a7 7 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4z" />
      <path fill="#EA4335" d="M12 4.6c1.7 0 3.2.6 4.4 1.7L19.7 3A11.5 11.5 0 0 0 1.8 7.3l3.8 3A6.9 6.9 0 0 1 12 4.6z" />
    </svg>
  );
}

const CHIP =
  'absolute flex items-center gap-2 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 shadow-[0_16px_32px_-16px_rgba(26,20,16,0.3)]';

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-2 py-1.5">
      <span className="h-6 w-6 shrink-0 rounded-full bg-[var(--color-surface-2)]" />
      <div className="flex-1 space-y-1.5">
        <div className="h-2 w-3/4 rounded-full bg-[var(--color-surface-2)]" />
        <div className="h-2 w-1/2 rounded-full bg-[var(--color-surface)]" />
      </div>
    </div>
  );
}

export function SeoVignette({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Search results with your site climbing the rankings, cited in AI answers and reported monthly."
      className={cn('relative mx-auto w-full max-w-[460px] px-6 py-8', className)}
    >
      <div aria-hidden>
        {/* SERP card */}
        <div className="mx-auto w-[78%] rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-5 shadow-[0_24px_48px_-24px_rgba(26,20,16,0.25)]">
          {/* search bar */}
          <div className="flex items-center gap-2.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-2)] px-4 py-2.5">
            <Search className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-soft)]" />
            <span className="h-2.5 w-2/3 rounded-full bg-[var(--color-bg)]" />
          </div>

          {/* results */}
          <div className="mt-5 space-y-2.5">
            <SkeletonRow />

            {/* your result, climbing */}
            <div className="flex items-center gap-3 rounded-[var(--radius-m)] bg-[var(--color-accent-tint)] px-3 py-3">
              <span className="h-6 w-6 shrink-0 rounded-full bg-[var(--color-accent)]" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2 w-5/6 rounded-full bg-[var(--color-line-2)]" />
                <div className="h-2 w-2/3 rounded-full bg-[var(--color-line)]" />
              </div>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]">
                <ArrowUp className="h-3.5 w-3.5 text-[var(--color-on-accent)]" />
              </span>
            </div>

            <SkeletonRow />
          </div>
        </div>

        {/* Google chip */}
        <div className={cn(CHIP, 'float-slow -right-1 top-6 rotate-2')}>
          <GoogleMark className="h-4.5 w-4.5" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
            Found on Google
          </span>
        </div>

        {/* Impressions dark pill */}
        <div className="float-slower absolute -left-1 top-[42%] flex -rotate-2 items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-4 py-2.5 shadow-[0_16px_32px_-16px_rgba(26,20,16,0.4)]">
          <TrendingUp className="h-4 w-4 text-[var(--color-accent-hi)]" />
          <span className="text-[12px] font-semibold text-[var(--color-on-dark)]">Impressions climbing</span>
        </div>

        {/* AI answers chip */}
        <div className={cn(CHIP, 'float-slowest -right-3 bottom-16 -rotate-1')}>
          <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
            Cited in AI answers
          </span>
        </div>

        {/* Reporting chip */}
        <div className={cn(CHIP, 'float-slow -left-2 bottom-2 rotate-1')}>
          <CalendarCheck className="h-4 w-4 text-[var(--color-accent)]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
            Reported monthly
          </span>
        </div>
      </div>
    </div>
  );
}
