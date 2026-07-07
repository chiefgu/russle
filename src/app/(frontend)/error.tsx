'use client';

import { useEffect } from 'react';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';

export default function FrontendError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section tone="bg" spacing="heroTop" container="narrow">
      <Tag tone="accent">Something went wrong</Tag>
      <h1 className="h1 mt-6 text-balance">That did not load properly.</h1>
      <p className="text-big mt-6 text-[var(--color-text-mute)]">
        Try again in a moment. If it keeps happening, email hello@russle.co.uk and we will sort it.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-14 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--color-accent)] px-8 text-[14px] font-bold uppercase tracking-[0.08em] text-[var(--color-on-accent)] transition-colors hover:bg-[var(--color-accent-lo)]"
        >
          Try again
        </button>
        <ButtonLink href="/" variant="secondary" size="lg">Back to home</ButtonLink>
      </div>
    </Section>
  );
}
