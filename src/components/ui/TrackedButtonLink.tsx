'use client';

import { ButtonLink } from '@/components/ui/Button';
import { gaEvent } from '@/lib/analytics';

type Props = {
  href: string;
  variant?: 'primary' | 'accent' | 'secondary' | 'secondary-on-dark' | 'ghost';
  size?: 'md' | 'lg';
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
  eventName: string;
  eventParams?: Record<string, unknown>;
};

export function TrackedButtonLink({
  href,
  variant,
  size,
  withArrow,
  className,
  children,
  eventName,
  eventParams,
}: Props) {
  return (
    <ButtonLink
      href={href}
      variant={variant}
      size={size}
      withArrow={withArrow}
      className={className}
      onClick={() => gaEvent(eventName, eventParams)}
    >
      {children}
    </ButtonLink>
  );
}
