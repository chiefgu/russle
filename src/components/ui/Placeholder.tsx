import { cn } from '@/lib/cn';

type Aspect = '1:1' | '4:3' | '16:9' | '3:2' | '3:4' | '2:3' | '21:9';

type PlaceholderProps = {
  label: string;
  hint?: string;
  aspect?: Aspect;
  className?: string;
  rounded?: boolean;
};

const aspectClass: Record<Aspect, string> = {
  '1:1': 'aspect-square',
  '4:3': 'aspect-[4/3]',
  '16:9': 'aspect-[16/9]',
  '3:2': 'aspect-[3/2]',
  '3:4': 'aspect-[3/4]',
  '2:3': 'aspect-[2/3]',
  '21:9': 'aspect-[21/9]',
};

export function Placeholder({
  label,
  hint,
  aspect = '4:3',
  className,
  rounded = true,
}: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={cn(
        'relative flex w-full flex-col items-center justify-center overflow-hidden border border-[var(--color-line-2)] bg-[var(--color-surface)]',
        rounded && 'rounded-[var(--radius-l)]',
        aspectClass[aspect],
        className,
      )}
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, transparent 0, transparent 14px, rgba(26, 20, 16, 0.045) 14px, rgba(26, 20, 16, 0.045) 15px)',
      }}
    >
      <p className="label text-[var(--color-text-soft)]">Image</p>
      <p className="text-body mt-3 max-w-xs text-balance text-center text-[var(--color-text-mute)]">
        {label}
      </p>
      {hint && (
        <p className="text-small mt-3 text-[var(--color-text-soft)]">{hint}</p>
      )}
    </div>
  );
}
