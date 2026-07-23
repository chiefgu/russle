'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { trackConversion } from '@/lib/conversions';

const FIELD =
  'w-full rounded-[var(--radius-m)] border border-[var(--color-line-2)] bg-[var(--color-bg)] px-4 py-3.5 text-body text-[var(--color-text)] placeholder:text-[var(--color-text-soft)] focus:border-[var(--color-accent)] focus:outline-none';

export function SiteReviewForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState('sending');
    setError('');
    try {
      const res = await fetch('/api/site-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error || 'Something went wrong. Email hello@russle.co.uk instead.');
        setState('error');
        return;
      }
      trackConversion({ type: 'site_review_request' });
      setState('done');
    } catch {
      setError('Something went wrong. Email hello@russle.co.uk instead.');
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-10 text-center">
        <p className="h4">Got it.</p>
        <p className="text-body mt-3 text-[var(--color-text-mute)]">
          Your review will land in your inbox within two working days, from a person, not a robot.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required maxLength={120} placeholder="Your name" aria-label="Your name" className={FIELD} />
        <input name="email" type="email" required maxLength={200} placeholder="Email" aria-label="Email" className={FIELD} />
      </div>
      <input name="url" required maxLength={300} placeholder="Your website address" aria-label="Your website address" className={FIELD} />
      <textarea
        name="notes"
        rows={3}
        maxLength={2000}
        placeholder="Anything specific bothering you about it? (optional)"
        aria-label="Notes"
        className={`${FIELD} resize-none`}
      />
      {state === 'error' && <p className="text-small text-[var(--color-accent)]">{error}</p>}
      <Button type="submit" variant="accent" size="lg" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending...' : 'Request my free review'}
      </Button>
    </form>
  );
}
