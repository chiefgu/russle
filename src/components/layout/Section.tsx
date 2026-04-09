import { cn } from '@/lib/cn';
import { Container } from './Container';

type Tone = 'bg' | 'surface' | 'dark';
type Spacing = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'heroTop';

type SectionProps = {
  children: React.ReactNode;
  tone?: Tone;
  spacing?: Spacing;
  container?: 'main' | 'narrow' | 'none';
  id?: string;
  className?: string;
  as?: 'section' | 'header' | 'footer' | 'div';
};

const toneClasses: Record<Tone, string> = {
  bg: 'bg-[var(--color-bg)] text-[var(--color-text)]',
  surface: 'bg-[var(--color-surface)] text-[var(--color-text)]',
  dark: 'bg-[var(--color-dark)] text-[var(--color-on-dark)]',
};

const spacingClasses: Record<Spacing, string> = {
  xs: 'py-12 md:py-12',
  s: 'py-12 md:py-16',
  m: 'py-16 md:py-20',
  l: 'py-20 md:py-24',
  xl: 'py-24 md:py-[120px]',
  xxl: 'py-[120px] md:py-[160px]',
  heroTop: 'pt-[120px] md:pt-[160px] pb-16 md:pb-24',
};

export function Section({
  children,
  tone = 'bg',
  spacing = 'm',
  container = 'main',
  id,
  className,
  as: Tag = 'section',
}: SectionProps) {
  return (
    <Tag id={id} className={cn(toneClasses[tone], spacingClasses[spacing], className)}>
      {container === 'none' ? children : <Container size={container}>{children}</Container>}
    </Tag>
  );
}
