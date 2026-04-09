import { cn } from '@/lib/cn';

type MarqueeProps = {
  children: React.ReactNode;
  duration?: number;
  className?: string;
};

/**
 * Pure CSS marquee — duplicates children once and animates a 50% transform
 * so the loop is seamless. The `marquee` keyframes live in globals.css.
 */
export function Marquee({ children, duration = 30, className }: MarqueeProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="marquee gap-16"
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center gap-16">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-16">
          {children}
        </div>
      </div>
    </div>
  );
}
