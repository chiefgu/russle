import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonProps = CommonProps & {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-xl)] font-bold uppercase tracking-[0.08em] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed';

const sizes: Record<Size, string> = {
  md: 'h-12 px-6 text-[12px] md:text-[12px]',
  lg: 'h-14 px-8 text-[13px] md:text-[14px]',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--color-text)] text-[var(--color-bg)] hover:bg-[var(--color-dark-2)]',
  accent:
    'bg-[var(--color-accent)] text-[var(--color-on-accent)] hover:bg-[var(--color-accent-lo)]',
  secondary:
    'border border-[var(--color-line-2)] text-[var(--color-text)] hover:bg-[var(--color-surface)]',
  ghost:
    'text-[var(--color-text)] hover:text-[var(--color-accent)] px-2',
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(base, sizes[size], variants[variant], className);
}

export function ButtonLink({
  href,
  external = false,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className,
  children,
}: LinkButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowUpRight className="h-4 w-4" aria-hidden />}
    </>
  );

  if (external || /^https?:\/\//.test(href) || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes(variant, size, className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes(variant, size, className)}>
      {content}
    </Link>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  type = 'button',
  onClick,
  disabled,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes(variant, size, className)}
    >
      <span>{children}</span>
      {withArrow && <ArrowUpRight className="h-4 w-4" aria-hidden />}
    </button>
  );
}
