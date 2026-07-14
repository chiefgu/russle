import { ArrowRight, ArrowDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { CHIP_LABEL } from './vignettes/chrome';

export type FlowNode = { icon?: string; title: string; meta: string };
export type FlowData = {
  from: FlowNode;
  via: FlowNode & { chips: string[] };
  to: FlowNode;
};

const CARD =
  'rounded-[var(--radius-l)] border border-[var(--color-line)] p-6 md:p-7 shadow-[0_24px_48px_-28px_rgba(26,20,16,0.25)]';

function Connector() {
  return (
    <div aria-hidden className="flex items-center justify-center py-2 md:py-0">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line-2)] bg-[var(--color-bg)]">
        <ArrowDown className="h-4 w-4 text-[var(--color-accent)] md:hidden" />
        <ArrowRight className="hidden h-4 w-4 text-[var(--color-accent)] md:block" />
      </span>
    </div>
  );
}

// The mechanism diagram: enquiry source → what the site does → outcome.
// One component, parameterised per vertical from industries.ts.
export function IndustryFlow({
  flow,
  icons,
  className,
}: {
  flow: FlowData;
  icons: Record<string, LucideIcon>;
  className?: string;
}) {
  const FromIcon = flow.from.icon ? icons[flow.from.icon] : undefined;
  const ToIcon = flow.to.icon ? icons[flow.to.icon] : undefined;

  return (
    <div
      role="img"
      aria-label={`${flow.from.title} leads to ${flow.via.title}, which produces ${flow.to.title}.`}
      className={cn(
        'mx-auto grid max-w-4xl items-center md:grid-cols-[1fr_auto_1.3fr_auto_1fr] md:gap-1',
        className,
      )}
    >
      <div aria-hidden className="contents">
        {/* Source */}
        <div className={cn(CARD, 'bg-[var(--color-surface)]')}>
          <span className="label text-[var(--color-text-soft)]">{flow.from.meta}</span>
          <div className="mt-4 flex items-center gap-3">
            {FromIcon && (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-accent-tint)]">
                <FromIcon className="h-5 w-5 text-[var(--color-accent)]" />
              </span>
            )}
            <p className="h5">{flow.from.title}</p>
          </div>
        </div>

        <Connector />

        {/* The site */}
        <div className={cn(CARD, 'bg-[var(--color-bg)]')}>
          <span className="label text-[var(--color-accent)]">{flow.via.meta}</span>
          <p className="h5 mt-4">{flow.via.title}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {flow.via.chips.map((chip) => (
              <span
                key={chip}
                className="flex items-center gap-2 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-2 shadow-[0_10px_20px_-12px_rgba(26,20,16,0.3)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span className={CHIP_LABEL}>{chip}</span>
              </span>
            ))}
          </div>
        </div>

        <Connector />

        {/* Outcome */}
        <div className={cn(CARD, 'border-transparent bg-[var(--color-dark)] text-[var(--color-on-dark)]')}>
          <span className="label text-[var(--color-on-dark-mute)]">{flow.to.meta}</span>
          <div className="mt-4 flex items-center gap-3">
            {ToIcon && (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[rgba(248,247,245,0.12)]">
                <ToIcon className="h-5 w-5 text-[var(--color-on-dark)]" />
              </span>
            )}
            <p className="h5 text-[var(--color-on-dark)]">{flow.to.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
