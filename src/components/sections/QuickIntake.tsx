'use client';

import { useEffect, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { trackConversion } from '@/lib/conversions';

type Attribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  referrer: string;
  landing_page: string;
};

const EMPTY: Attribution = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  referrer: '',
  landing_page: '',
};

function readAttribution(): Attribution {
  if (typeof window === 'undefined') return EMPTY;
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    referrer: document.referrer || '',
    landing_page: window.location.pathname || '',
  };
}

const PROJECT_TYPES = [
  'New brand and website',
  'New website only',
  'Website refresh',
  'Ongoing marketing and SEO',
  'Online shop',
  'Not sure, want to chat',
];

const BUDGET_RANGES = [
  'Under 2,000',
  '2,000 to 5,000',
  '5,000 to 10,000',
  '10,000 to 25,000',
  '25,000+',
  'Not sure, advise me',
];

type State = 'idle' | 'submitting' | 'success' | 'error';

export function QuickIntake() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState<string | null>(null);
  const [attribution, setAttribution] = useState<Attribution>(EMPTY);
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    setAttribution(readAttribution());
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    setError(null);

    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());

    const payload = {
      // Map to the intake schema so the same API route handles both forms.
      client_name: formData.client_name,
      client_email: formData.client_email,
      client_phone: formData.client_phone || undefined,
      project_type: projectType || undefined,
      budget_range: budget || undefined,
      anything_else: formData.anything_else || undefined,
      brief_type: 'quick',
      ...attribution,
    };

    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || 'Something went wrong.');
      }
      trackConversion({
        type: 'intake_submit',
        budget_range: budget,
        utm_source: attribution.utm_source,
      });
      setState('success');
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-[var(--radius-l)] bg-[var(--color-surface)] p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-on-accent)]">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="h2 mt-8">Got it.</h2>
        <p className="text-big mt-4 text-[var(--color-text-mute)]">
          We&apos;ll read your enquiry and reply inside 24 hours.
        </p>
        <p className="text-small mt-8 text-[var(--color-text-soft)]">
          russle | hello@russle.co.uk
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input label="Your name" name="client_name" required autoComplete="name" />
        <Input
          label="Email"
          name="client_email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <Input label="Phone (optional)" name="client_phone" autoComplete="tel" />

      <div>
        <label className="label block text-[var(--color-text-mute)]">
          What kind of project?
        </label>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {PROJECT_TYPES.map((option) => {
            const selected = projectType === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setProjectType(option)}
                className={`group flex items-center gap-3 rounded-[var(--radius-m)] border px-5 py-4 text-left text-body transition-all ${
                  selected
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-tint)] text-[var(--color-text)]'
                    : 'border-[var(--color-line-2)] bg-[var(--color-bg)] text-[var(--color-text-mute)] hover:border-[var(--color-text-mute)] hover:text-[var(--color-text)]'
                }`}
              >
                <span
                  aria-hidden
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    selected
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)]'
                      : 'border-[var(--color-line-2)] group-hover:border-[var(--color-text-mute)]'
                  }`}
                >
                  {selected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-on-accent)]" />
                  )}
                </span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="label block text-[var(--color-text-mute)]">
          Rough budget (optional)
        </label>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {BUDGET_RANGES.map((option) => {
            const selected = budget === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setBudget(option)}
                className={`group flex items-center gap-3 rounded-[var(--radius-m)] border px-5 py-4 text-left text-body transition-all ${
                  selected
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-tint)] text-[var(--color-text)]'
                    : 'border-[var(--color-line-2)] bg-[var(--color-bg)] text-[var(--color-text-mute)] hover:border-[var(--color-text-mute)] hover:text-[var(--color-text)]'
                }`}
              >
                <span
                  aria-hidden
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    selected
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)]'
                      : 'border-[var(--color-line-2)] group-hover:border-[var(--color-text-mute)]'
                  }`}
                >
                  {selected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-on-accent)]" />
                  )}
                </span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Textarea
        label="Anything else we should know? (optional)"
        name="anything_else"
        rows={3}
      />

      {error && (
        <p className="text-small text-[var(--color-accent)]" role="alert">
          {error}
        </p>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={state === 'submitting'}
          withArrow
        >
          {state === 'submitting' ? 'Sending…' : 'Send enquiry'}
        </Button>
      </div>
    </form>
  );
}
