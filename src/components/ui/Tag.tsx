import { cn } from '@/lib/cn';

type TagProps = {
  children: React.ReactNode;
  tone?: 'default' | 'accent' | 'on-dark';
  className?: string;
  withDot?: boolean;
};

export function Tag({ children, tone = 'default', className, withDot = true }: TagProps) {
  const toneClasses = {
    default: 'text-[var(--color-text-mute)]',
    accent: 'text-[var(--color-accent)]',
    'on-dark': 'text-[var(--color-on-dark-mute)]',
  };

  const dotColor = {
    default: 'bg-[var(--color-text-mute)]',
    accent: 'bg-[var(--color-accent)]',
    'on-dark': 'bg-[var(--color-on-dark-mute)]',
  };

  return (
    <span
      className={cn(
        'label inline-flex items-center gap-2',
        toneClasses[tone],
        className,
      )}
    >
      {withDot && (
        <span
          aria-hidden
          className={cn('h-1 w-1 rounded-full', dotColor[tone])}
        />
      )}
      {children}
    </span>
  );
}
