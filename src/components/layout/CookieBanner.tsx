'use client';

import { useEffect, useState } from 'react';
import { grantAnalyticsConsent, denyAnalyticsConsent } from '@/lib/analytics';
import { grantPixelConsent, denyPixelConsent } from '@/lib/pixel';

const STORAGE_KEY = 'russle-cookie-consent-v1';

type Choice = 'granted' | 'denied';

function applyConsent(value: Choice) {
  if (value === 'granted') {
    grantAnalyticsConsent();
    grantPixelConsent();
  } else {
    denyAnalyticsConsent();
    denyPixelConsent();
  }
}

export function CookieBanner() {
  const [choice, setChoice] = useState<Choice | null | 'loading'>('loading');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'granted' || stored === 'denied') {
        setChoice(stored);
        applyConsent(stored);
      } else {
        setChoice(null);
      }
    } catch {
      setChoice(null);
    }
  }, []);

  function decide(value: Choice) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore storage errors */
    }
    setChoice(value);
    applyConsent(value);
  }

  if (choice !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 right-4 left-4 z-50 max-w-md rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 shadow-2xl sm:left-auto sm:bottom-6 sm:right-6"
    >
      <p className="text-body text-[var(--color-text)]">
        We use cookies to see how the site is used.
      </p>
      <p className="text-small mt-2 text-[var(--color-text-mute)]">
        Analytics and Meta Pixel only. No tracking until you choose.
      </p>
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => decide('granted')}
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--color-text)] px-5 text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-bg)] transition-colors hover:bg-[var(--color-dark-2)]"
        >
          Sounds fine
        </button>
        <button
          type="button"
          onClick={() => decide('denied')}
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius-xl)] border border-[var(--color-line-2)] px-5 text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg)]"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
