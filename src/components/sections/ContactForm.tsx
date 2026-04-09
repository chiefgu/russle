'use client';

import { useState } from 'react';
import { Input, Textarea } from '@/components/ui/Input';
import { Button, ButtonLink } from '@/components/ui/Button';

type State = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || 'Something went wrong.');
      }

      setState('success');
      form.reset();
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-[var(--radius-l)] bg-[var(--color-surface)] p-10">
        <p className="label text-[var(--color-accent)]">Message received</p>
        <h3 className="h3 mt-4">Thanks — I&apos;ll reply within 24 hours.</h3>
        <p className="text-body mt-4 text-[var(--color-text-mute)]">
          For a longer brief or a project intake,{' '}
          <a href="/start" className="link">
            use the questionnaire
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input label="Your name" name="name" required autoComplete="name" />
      <Input label="Email" name="email" type="email" required autoComplete="email" />
      <Input label="Company" name="company" autoComplete="organization" />
      <Textarea label="Your message" name="message" required rows={6} />

      {error && (
        <p className="text-small text-[var(--color-accent)]" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="primary" size="lg" disabled={state === 'submitting'} withArrow>
          {state === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>
        <p className="text-small text-[var(--color-text-soft)]">
          Got a longer brief?{' '}
          <ButtonLink href="/start" variant="ghost" size="md">
            Project intake →
          </ButtonLink>
        </p>
      </div>
    </form>
  );
}
