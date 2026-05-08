import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/cn';
import { LoopWordmark } from '@/components/ui/LoopWordmark';

type LaunchVisualProps = {
  className?: string;
};

export function LaunchVisual({ className }: LaunchVisualProps) {
  return (
    <div
      role="img"
      aria-label="The Launch tier ships a brand identity and a custom website together as a single, coherent system."
      className={cn(
        // No aspect-lock — cards size to content so the whole visual hugs tight,
        // letting two visuals stack with no wasted vertical space between them.
        'mx-auto w-full max-w-[640px]',
        className,
      )}
    >
      <div className="relative grid grid-cols-[40%_1fr] items-center md:grid-cols-[40%_1fr_48%]">
        {/* Brand identity card */}
        <div className="rounded-[var(--radius-m)] border border-[var(--color-line-2)] bg-[var(--color-surface)] p-3 shadow-sm md:p-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-mute)]">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#C2544D]" />
            <span>Brand identity</span>
          </div>

          <LoopWordmark className="mt-4 h-9 w-auto md:h-12" color="#1A1412" />

          <div className="mt-4 grid grid-cols-4 gap-1">
            <div aria-hidden className="h-6 bg-[#C2544D]" />
            <div aria-hidden className="h-6 bg-[#8B2F2A]" />
            <div aria-hidden className="h-6 bg-[#F3C9BD]" />
            <div aria-hidden className="h-6 bg-[#1A1412]" />
          </div>

          <div className="mt-4 border-t border-[var(--color-line)] pt-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Type
            </div>
            <div className="mt-1 font-serif text-sm tracking-[-0.01em] text-[var(--color-text)]">
              Newsreader 300
            </div>
            <div className="text-[11px] text-[var(--color-text-mute)]">
              + Manrope · UI
            </div>
          </div>
        </div>

        {/* Connector — visible md+ */}
        <div className="relative hidden h-px md:block">
          <div className="absolute inset-0 bg-[var(--color-line-2)]" />
          <ArrowRight className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-bg)] text-[#C2544D]" />
        </div>

        {/* Website mockup card */}
        <div className="overflow-hidden rounded-[var(--radius-m)] border border-[var(--color-line-2)] bg-[#FAF6F1] shadow-sm">
          {/* browser chrome */}
          <div className="flex items-center gap-1.5 border-b border-[#E7DBCE] bg-[#EFE4D8] px-3 py-2">
            <span aria-hidden className="h-2 w-2 rounded-full bg-[#E7DBCE]" />
            <span aria-hidden className="h-2 w-2 rounded-full bg-[#E7DBCE]" />
            <span aria-hidden className="h-2 w-2 rounded-full bg-[#E7DBCE]" />
            <div className="ml-2 truncate font-mono text-[10px] text-[#6C5F59]">
              loop.com
            </div>
          </div>

          {/* hero */}
          <div className="space-y-3 px-3 py-4 md:px-4 md:py-5">
            <div className="flex items-center justify-between">
              <LoopWordmark className="h-4 w-auto md:h-5" color="#1A1412" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#6C5F59]">
                join
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span aria-hidden className="h-px w-4 bg-[#C2544D]" />
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] font-bold text-[#C2544D]">
                waitlist open
              </span>
            </div>

            <div className="font-serif text-base leading-tight tracking-[-0.01em] text-[#1A1412] md:text-lg">
              Show up for{' '}
              <em className="italic text-[#C2544D]">each other</em>,
              <br />
              in real life.
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 bg-[#C2544D] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF6F1]">
                Get invite
                <ArrowRight className="h-3 w-3" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6C5F59]">
                + 2 friends
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
