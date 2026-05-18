import { Mail } from 'lucide-react';

import { cn } from '@/lib/cn';
import { LoopWordmark } from '@/components/ui/LoopWordmark';

type WhyRussleVisualProps = {
  className?: string;
};

export function WhyRussleVisual({ className }: WhyRussleVisualProps) {
  return (
    <div
      role="img"
      aria-label="One studio: the same brand running consistently across the brand book, the website, and the marketing, designed and built together."
      className={cn(
        'relative mx-auto flex aspect-[4/3] w-full max-w-[640px] flex-col gap-3 p-3 md:p-4',
        className,
      )}
    >
      {/* Top eyebrow */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-mute)]">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#C2544D]" />
          <span>One system</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
          loop · case study
        </span>
      </div>

      {/* Three surfaces */}
      <div className="relative grid flex-1 grid-cols-3 gap-2 md:gap-3">
        {/* Connecting accent line across the top — loop's terracotta */}
        <div
          aria-hidden
          className="absolute left-[16%] right-[16%] top-[14%] hidden h-px bg-[#C2544D]/40 md:block"
        />

        {/* Surface 1 — BRAND. Real loop palette + wordmark. */}
        <Surface label="Brand">
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-2 py-3">
            <LoopWordmark className="h-7 w-auto md:h-9" color="#1A1412" />
            <div className="flex gap-0.5">
              <span aria-hidden className="h-3 w-3 rounded-full bg-[#C2544D]" />
              <span aria-hidden className="h-3 w-3 rounded-full bg-[#8B2F2A]" />
              <span aria-hidden className="h-3 w-3 rounded-full bg-[#F3C9BD]" />
              <span aria-hidden className="h-3 w-3 rounded-full bg-[#1A1412]" />
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Bloom
            </div>
          </div>
        </Surface>

        {/* Surface 2 — WEBSITE. Loop hero with waitlist eyebrow. */}
        <Surface label="Website" framed paper>
          <div className="flex items-center gap-1 border-b border-[#E7DBCE] bg-[#EFE4D8] px-2 py-1">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#E7DBCE]" />
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#E7DBCE]" />
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#E7DBCE]" />
            <span className="ml-1 truncate font-mono text-[8px] text-[#6C5F59] md:text-[9px]">
              loop.com
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-1.5 px-2.5 py-2.5">
            {/* Nav row: wordmark + join */}
            <div className="flex items-center justify-between">
              <LoopWordmark className="h-3 w-auto md:h-4" color="#1A1412" />
              <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-[#6C5F59] md:text-[8px]">
                join
              </span>
            </div>

            {/* Eyebrow with accent line */}
            <div className="mt-1 flex items-center gap-1">
              <span aria-hidden className="h-px w-2 bg-[#C2544D]" />
              <span className="font-mono text-[7px] font-bold uppercase tracking-[0.18em] text-[#C2544D] md:text-[8px]">
                waitlist open
              </span>
            </div>

            {/* Hero copy */}
            <div className="font-serif text-[10px] leading-[1.15] tracking-[-0.01em] text-[#1A1412] md:text-[11px]">
              Show up for{' '}
              <em className="italic text-[#C2544D]">each other</em>,
              <br />
              in real life.
            </div>

            {/* CTA + caption */}
            <div className="mt-auto flex items-center gap-1.5">
              <span className="inline-flex items-center gap-0.5 bg-[#C2544D] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-[#FAF6F1] md:text-[9px]">
                Get invite
              </span>
              <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-[#6C5F59] md:text-[8px]">
                + 2 friends
              </span>
            </div>
          </div>
        </Surface>

        {/* Surface 3 — MARKETING. Loop welcome email rendered as a real inbox row. */}
        <Surface label="Marketing" framed paper>
          <div className="flex items-center gap-1 border-b border-[#E7DBCE] bg-[#EFE4D8] px-2 py-1">
            <Mail className="h-2.5 w-2.5 text-[#6C5F59]" />
            <span className="ml-0.5 truncate font-mono text-[8px] uppercase tracking-[0.14em] text-[#6C5F59] md:text-[9px]">
              Inbox · 1
            </span>
            <span className="ml-auto font-mono text-[7px] uppercase tracking-[0.14em] text-[#6C5F59] md:text-[8px]">
              now
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-1.5 px-2.5 py-2.5">
            {/* Sender row: wordmark + reply */}
            <div className="flex items-center justify-between">
              <LoopWordmark className="h-3 w-auto md:h-4" color="#1A1412" />
              <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-[#6C5F59] md:text-[8px]">
                reply
              </span>
            </div>

            {/* Subject eyebrow with accent line */}
            <div className="mt-1 flex items-center gap-1">
              <span aria-hidden className="h-px w-2 bg-[#C2544D]" />
              <span className="font-mono text-[7px] font-bold uppercase tracking-[0.18em] text-[#C2544D] md:text-[8px]">
                subject · welcome
              </span>
            </div>

            {/* Body */}
            <div className="font-serif text-[10px] leading-[1.15] tracking-[-0.01em] text-[#1A1412] md:text-[11px]">
              You&rsquo;re{' '}
              <em className="italic text-[#C2544D]">in</em>.
              <br />
              Bring two friends.
            </div>

            {/* Open/click metrics */}
            <div className="mt-auto flex items-center gap-1.5">
              <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-[#C2544D]" />
              <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-[#6C5F59] md:text-[8px]">
                opened
              </span>
              <span className="font-mono text-[7px] uppercase tracking-[0.16em] font-bold text-[#1A1412] md:text-[8px]">
                64%
              </span>
            </div>
          </div>
        </Surface>
      </div>

      {/* Caption */}
      <div className="flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
        <span>One brief</span>
        <span aria-hidden className="h-px w-3 bg-[var(--color-line-2)]" />
        <span>One quote</span>
        <span aria-hidden className="h-px w-3 bg-[var(--color-line-2)]" />
        <span>One studio</span>
      </div>
    </div>
  );
}

function Surface({
  label,
  children,
  framed = false,
  paper = false,
}: {
  label: string;
  children: React.ReactNode;
  framed?: boolean;
  paper?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-mute)] md:text-[10px]">
        {label}
      </span>
      <div
        className={cn(
          'flex flex-1 flex-col overflow-hidden rounded-[var(--radius-m)] border border-[var(--color-line-2)] shadow-sm',
          paper
            ? 'bg-[#FAF6F1]'
            : framed
              ? 'bg-[var(--color-bg)]'
              : 'bg-[var(--color-surface)]',
        )}
      >
        {children}
      </div>
    </div>
  );
}
