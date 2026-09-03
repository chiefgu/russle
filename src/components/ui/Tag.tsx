import { cn } from '@/lib/cn';

type TagProps = {
  children: React.ReactNode;
  tone?: 'default' | 'accent' | 'on-dark';
  className?: string;
  withDot?: boolean;
  /**
   * Element to render. Sections whose only label is a Tag should pass `as="h2"`
   * so the document keeps a valid heading order (H1 → H2 → H3) for screen
   * readers and crawlers. Styling is identical either way.
   */
  as?: 'span' | 'h2' | 'h3';
};

export function Tag({ children, tone = 'default', className, withDot = true, as: Component = 'span' }: TagProps) {
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
    <Component
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
    </Component>
  );
}
