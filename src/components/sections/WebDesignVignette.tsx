import { Zap, PenTool, MousePointerClick, Search } from 'lucide-react';
import { cn } from '@/lib/cn';

const CHIP =
  'absolute flex items-center gap-2 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 shadow-[0_16px_32px_-16px_rgba(26,20,16,0.3)]';

export function WebDesignVignette({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="A custom website in the browser, hand-built to load fast, convert visitors, and be found from day one."
      className={cn('relative mx-auto w-full max-w-[460px] px-6 py-8', className)}
    >
      <div aria-hidden>
        {/* Browser card */}
        <div className="mx-auto w-[78%] overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] shadow-[0_24px_48px_-24px_rgba(26,20,16,0.25)]">
          {/* chrome bar */}
          <div className="flex items-center gap-1.5 border-b border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[var(--color-line-2)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--color-line-2)]" />
            <span className="h-2 w-2 rounded-full bg-[var(--color-line-2)]" />
            <span className="ml-2 h-4 flex-1 rounded-full bg-[var(--color-bg)]" />
          </div>

          {/* mock page */}
          <div className="p-5">
            {/* nav */}
            <div className="flex items-center justify-between">
              <span className="h-2.5 w-10 rounded-full bg-[var(--color-line-2)]" />
              <div className="flex gap-2">
                <span className="h-2 w-6 rounded-full bg-[var(--color-surface-2)]" />
                <span className="h-2 w-6 rounded-full bg-[var(--color-surface-2)]" />
                <span className="h-2 w-6 rounded-full bg-[var(--color-surface-2)]" />
              </div>
            </div>

            {/* headline */}
            <div className="mt-6 space-y-2">
              <div className="h-3.5 w-5/6 rounded-full bg-[var(--color-surface-2)]" />
              <div className="h-3.5 w-3/5 rounded-full bg-[var(--color-surface-2)]" />
            </div>

            {/* CTA */}
            <div className="mt-5 inline-flex h-9 items-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-on-accent)]">
              Get in touch
            </div>

            {/* image block */}
            <div className="mt-5 h-16 rounded-[var(--radius-m)] bg-[var(--color-surface-2)]" />
          </div>
        </div>

        {/* Loads fast dark pill */}
        <div className="float-slower absolute -right-1 top-6 flex rotate-2 items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-4 py-2.5 shadow-[0_16px_32px_-16px_rgba(26,20,16,0.4)]">
          <Zap className="h-4 w-4 text-[var(--color-accent-hi)]" />
          <span className="text-[12px] font-semibold text-[var(--color-on-dark)]">Loads fast</span>
        </div>

        {/* No templates chip */}
        <div className={cn(CHIP, 'float-slow -left-1 top-[38%] -rotate-2')}>
          <PenTool className="h-4 w-4 text-[var(--color-accent)]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
            No templates
          </span>
        </div>

        {/* Built to convert chip */}
        <div className={cn(CHIP, 'float-slowest -right-3 bottom-14 rotate-1')}>
          <MousePointerClick className="h-4 w-4 text-[var(--color-accent)]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
            Built to convert
          </span>
        </div>

        {/* Found from day one chip */}
        <div className={cn(CHIP, 'float-slow -left-2 bottom-2 -rotate-1')}>
          <Search className="h-4 w-4 text-[var(--color-accent)]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
            Found from day one
          </span>
        </div>
      </div>
    </div>
  );
}
