import { cn } from '@/lib/cn';

type ProjectBackdropProps = {
  backdropColor: string;
  backdropTone: 'light' | 'dark';
  children: React.ReactNode;
  className?: string;
};

/**
 * Full-bleed brand-coloured stage that the project hero sits on.
 * The colour is provided as inline style (because it's per-project)
 * and the tone determines whether the children render light-on-dark or
 * dark-on-light text. Padding is handled by the consumer.
 */
export function ProjectBackdrop({
  backdropColor,
  backdropTone,
  children,
  className,
}: ProjectBackdropProps) {
  return (
    <section
      className={cn(
        'relative w-full',
        backdropTone === 'light' ? 'text-[var(--color-on-dark)]' : 'text-[var(--color-text)]',
        className,
      )}
      style={{ background: backdropColor }}
    >
      {children}
    </section>
  );
}
