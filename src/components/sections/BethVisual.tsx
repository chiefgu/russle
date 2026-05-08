import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/cn';

type BethVisualProps = {
  className?: string;
};

/**
 * Beth Bakes Cakes — brand identity card + website mockup pair.
 * Tokens from src/content/work/bethbakescakes.mdx:
 * chocolate #6B4226, blush #FBDCE2, caramel #C8845C, cream #FFFAF4.
 * Fonts: Fraunces (display) + DM Sans (body), Nixie One (logo accent).
 */
export function BethVisual({ className }: BethVisualProps) {
  return (
    <div
      role="img"
      aria-label="Beth Bakes Cakes — a brand identity and a custom storefront, shipped as one engagement."
      className={cn(
        'mx-auto w-full max-w-[640px]',
        className,
      )}
    >
      <div className="relative grid grid-cols-[40%_1fr] items-center md:grid-cols-[40%_1fr_48%]">
        {/* Brand identity card */}
        <div className="rounded-[var(--radius-m)] border border-[var(--color-line-2)] bg-[var(--color-surface)] p-3 shadow-sm md:p-4">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-mute)]">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#6B4226]" />
            <span>Brand identity</span>
          </div>

          <div className="mt-4 font-serif text-[20px] italic leading-[1.05] tracking-[-0.01em] text-[#6B4226] md:text-[24px]">
            Beth Bakes
            <br />
            Cakes
          </div>

          <div className="mt-4 grid grid-cols-4 gap-1">
            <div aria-hidden className="h-6 bg-[#6B4226]" />
            <div aria-hidden className="h-6 bg-[#C8845C]" />
            <div aria-hidden className="h-6 bg-[#FBDCE2]" />
            <div aria-hidden className="h-6 border border-[#E7DBCE] bg-[#FFFAF4]" />
          </div>

          <div className="mt-4 border-t border-[var(--color-line)] pt-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Type
            </div>
            <div className="mt-1 font-serif text-sm tracking-[-0.01em] text-[var(--color-text)]">
              Fraunces 300
            </div>
            <div className="text-[11px] text-[var(--color-text-mute)]">
              + DM Sans · UI
            </div>
          </div>
        </div>

        {/* Connector — visible md+ */}
        <div className="relative hidden h-px md:block">
          <div className="absolute inset-0 bg-[var(--color-line-2)]" />
          <ArrowRight className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-bg)] text-[#6B4226]" />
        </div>

        {/* Website mockup card */}
        <div className="overflow-hidden rounded-[var(--radius-m)] border border-[var(--color-line-2)] bg-[#FFFAF4] shadow-sm">
          {/* browser chrome */}
          <div className="flex items-center gap-1.5 border-b border-[#E7DBCE] bg-[#FBDCE2] px-3 py-2">
            <span aria-hidden className="h-2 w-2 rounded-full bg-[#E7DBCE]" />
            <span aria-hidden className="h-2 w-2 rounded-full bg-[#E7DBCE]" />
            <span aria-hidden className="h-2 w-2 rounded-full bg-[#E7DBCE]" />
            <div className="ml-2 truncate font-mono text-[10px] text-[#6B4226]/70">
              bethbakescakes.com
            </div>
          </div>

          {/* hero — blush overlay panel */}
          <div className="relative">
            <div aria-hidden className="absolute inset-0 bg-[#FBDCE2]/70" />
            <div className="relative space-y-3 px-3 py-4 md:px-4 md:py-5">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base italic leading-none tracking-[-0.01em] text-[#6B4226] md:text-lg">
                  Beth Bakes
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#6B4226]/70">
                  order
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span aria-hidden className="h-px w-4 bg-[#6B4226]" />
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] font-bold text-[#6B4226]">
                  taking orders
                </span>
              </div>

              <div className="font-serif text-base leading-tight tracking-[-0.01em] text-[#6B4226] md:text-lg">
                Bespoke cakes,
                <br />
                <em className="italic">made in York</em>.
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1 bg-[#6B4226] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FFFAF4]">
                  Build a cake
                  <ArrowRight className="h-3 w-3" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6B4226]/70">
                  or markets
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caption — natural flow */}
      <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
        brand + storefront · launched 2026
      </div>
    </div>
  );
}
