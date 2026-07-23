'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { trackConversion } from '@/lib/conversions';

// End-of-article email capture. One field, no modal, no nagging.
export function BlogCapture({ source }: { source: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email');
    setState('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error('failed');
      trackConversion({ type: 'blog_subscribe' });
      setState('done');
    } catch {
      setState('error');
    }
  }

  return (
    <div className="rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 md:p-10">
      {state === 'done' ? (
        <>
          <p className="h5">You are on the list.</p>
          <p className="text-body mt-2 text-[var(--color-text-mute)]">
            The next guide will land in your inbox when it is published.
          </p>
        </>
      ) : (
        <>
          <p className="h5">Guides like this, straight to your inbox.</p>
          <p className="text-body mt-2 text-[var(--color-text-mute)]">
            Practical writing for business owners. No pitch, unsubscribe any time.
          </p>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              name="email"
              type="email"
              required
              maxLength={200}
              placeholder="you@yourbusiness.co.uk"
              aria-label="Email address"
              className="w-full rounded-[var(--radius-m)] border border-[var(--color-line-2)] bg-[var(--color-bg)] px-4 py-3 text-body text-[var(--color-text)] placeholder:text-[var(--color-text-soft)] focus:border-[var(--color-accent)] focus:outline-none sm:max-w-sm"
            />
            <Button type="submit" variant="primary" size="md" disabled={state === 'sending'}>
              {state === 'sending' ? 'Adding...' : 'Subscribe'}
            </Button>
          </form>
          {state === 'error' && (
            <p className="text-small mt-3 text-[var(--color-accent)]">
              That did not go through. Try again in a minute.
            </p>
          )}
        </>
      )}
    </div>
  );
}
