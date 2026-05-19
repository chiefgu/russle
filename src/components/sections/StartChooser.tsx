'use client';

import { useState } from 'react';
import { QuickIntake } from './QuickIntake';
import { IntakeForm } from './IntakeForm';

type Mode = 'quick' | 'detailed';

export function StartChooser() {
  const [mode, setMode] = useState<Mode>('quick');

  return (
    <div>
      <div
        role="tablist"
        aria-label="Choose intake type"
        className="mb-10 inline-flex rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-bg)] p-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'quick'}
          onClick={() => setMode('quick')}
          className={`rounded-[var(--radius-xl)] px-5 py-2 text-[12px] font-bold uppercase tracking-[0.08em] transition-colors ${
            mode === 'quick'
              ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
              : 'text-[var(--color-text-mute)] hover:text-[var(--color-text)]'
          }`}
        >
          Quick
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'detailed'}
          onClick={() => setMode('detailed')}
          className={`rounded-[var(--radius-xl)] px-5 py-2 text-[12px] font-bold uppercase tracking-[0.08em] transition-colors ${
            mode === 'detailed'
              ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
              : 'text-[var(--color-text-mute)] hover:text-[var(--color-text)]'
          }`}
        >
          Detailed brief
        </button>
      </div>

      <p className="text-small mb-8 max-w-xl text-[var(--color-text-soft)]">
        {mode === 'quick'
          ? 'Five fields, sixty seconds. Right answer if you just want to start a conversation.'
          : 'Eight sections, about five minutes. The more you share, the sharper our reply.'}
      </p>

      {mode === 'quick' ? <QuickIntake /> : <IntakeForm />}
    </div>
  );
}
