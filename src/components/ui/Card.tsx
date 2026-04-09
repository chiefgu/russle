import { cn } from '@/lib/cn';

type CardProps = {
  children: React.ReactNode;
  tone?: 'surface' | 'dark';
  hover?: boolean;
  className?: string;
};

export function Card({ children, tone = 'surface', hover = false, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-l)] p-8 md:p-10 transition-all duration-200',
        tone === 'surface'
          ? 'bg-[var(--color-surface)] text-[var(--color-text)]'
          : 'bg-[var(--color-dark-2)] text-[var(--color-on-dark)]',
        hover && tone === 'surface' && 'hover:bg-[var(--color-surface-2)] hover:-translate-y-1',
        hover && tone === 'dark' && 'hover:-translate-y-1',
        className,
      )}
    >
      {children}
    </div>
  );
}
