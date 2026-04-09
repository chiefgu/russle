'use client';

import { useState } from 'react';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Multi-step project intake. Ported from the Guest Digital intake form
 * (../../../../../src/app/page.tsx in the parent project) with identical
 * field IDs and step structure, restyled with russle tokens.
 *
 * Submission target: /api/intake (Resend → hello@russle.co.uk).
 */

type Field = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  options?: string[];
  placeholder?: string;
  required?: boolean;
};

type SectionDef = {
  title: string;
  blurb: string;
  fields: Field[];
};

const SECTIONS: SectionDef[] = [
  {
    title: 'Business Goals',
    blurb: 'Start with the why. The clearer this is, the easier the rest gets.',
    fields: [
      { id: 'primary_goal', label: "What's the primary business goal of the website?", type: 'textarea' },
      { id: 'target_audience', label: 'Who is the target audience or market?', type: 'textarea' },
      { id: 'visitor_action', label: 'What action do you want visitors to take?', type: 'textarea' },
    ],
  },
  {
    title: 'Scope of Work',
    blurb: 'How big is this thing? Honest answers — we can refine in the call.',
    fields: [
      { id: 'page_count', label: 'How many pages will the site need?', type: 'text' },
      {
        id: 'ecommerce',
        label: 'Do you need e-commerce functionality?',
        type: 'select',
        options: ['No', 'Yes — basic (under 50 products)', 'Yes — full store (50+ products)', 'Not sure'],
      },
      { id: 'user_accounts', label: 'Will the site require user accounts or logins?', type: 'select', options: ['No', 'Yes', 'Not sure'] },
      {
        id: 'custom_features',
        label: 'Are there any custom features you need?',
        type: 'textarea',
        placeholder: 'e.g. booking system, calculators, live chat, integrations…',
      },
      {
        id: 'cms_needs',
        label: 'Do you need ongoing content management (CMS) or a static site?',
        type: 'select',
        options: ['CMS — I want to update content myself', 'Static — content rarely changes', 'Not sure'],
      },
    ],
  },
  {
    title: 'Content & Assets',
    blurb: 'What do you have, what do you need? Real content always beats lorem ipsum.',
    fields: [
      {
        id: 'content_provided',
        label: 'Will you provide written content, images, photography, and/or videos?',
        type: 'select',
        options: ['Yes — I have everything ready', 'Partially — I need help with some', 'No — I need full content creation', 'Not sure yet'],
      },
      {
        id: 'stock_images',
        label: 'Do you need stock images or custom graphics?',
        type: 'select',
        options: ['No — I have my own', 'Yes — stock images', 'Yes — custom graphics/illustrations', 'Both stock and custom'],
      },
    ],
  },
  {
    title: 'Design & Branding',
    blurb: 'How do you want to look, and how much of that exists already?',
    fields: [
      {
        id: 'existing_branding',
        label: 'Do you already have a logo and brand guidelines?',
        type: 'select',
        options: ['Yes — full brand kit', 'Yes — logo only', 'No — I need branding', 'Starting from scratch'],
      },
      {
        id: 'design_approach',
        label: 'Do you prefer a template, a custom design, or a hybrid approach?',
        type: 'select',
        options: ['Template-based (faster, more affordable)', 'Fully custom design', 'Hybrid (custom feel, efficient build)', 'Not sure — advise me'],
      },
      {
        id: 'mobile_accessibility',
        label: 'Do you require mobile-first or accessibility compliance?',
        type: 'select',
        options: ['Mobile-responsive is fine', 'Mobile-first design', 'WCAG accessibility compliance needed', 'Both mobile-first and accessibility'],
      },
    ],
  },
  {
    title: 'Technical Requirements',
    blurb: 'The plumbing. Skip what doesn&apos;t apply.',
    fields: [
      {
        id: 'hosting_domain',
        label: 'Does the site need hosting and a domain name?',
        type: 'select',
        options: ['Yes — I need both', 'I have hosting, need a domain', 'I have a domain, need hosting', 'I have both already'],
      },
      { id: 'multi_language', label: 'Does the site require multi-language support?', type: 'select', options: ['No', 'Yes', 'Possibly in the future'] },
      {
        id: 'integrations',
        label: 'What integrations do you need?',
        type: 'textarea',
        placeholder: 'e.g. email marketing, CRM, payment gateways, booking systems, APIs…',
      },
    ],
  },
  {
    title: 'Maintenance & Support',
    blurb: 'What happens after launch matters as much as launch day.',
    fields: [
      {
        id: 'maintenance_owner',
        label: 'Who will handle future updates and maintenance?',
        type: 'select',
        options: ['I will manage it myself', 'I need ongoing support', 'A mix of both', 'Not sure yet'],
      },
      {
        id: 'content_update_frequency',
        label: 'How often do you expect to update content?',
        type: 'select',
        options: ['Rarely (a few times a year)', 'Monthly', 'Weekly', 'Daily'],
      },
      {
        id: 'training_needed',
        label: 'Do you need training on how to update the site yourself?',
        type: 'select',
        options: ['No', 'Yes — basic training', 'Yes — comprehensive training', 'Not sure'],
      },
    ],
  },
  {
    title: 'Value & ROI',
    blurb: 'Helps me size the investment to the outcome you need.',
    fields: [
      {
        id: 'revenue_contribution',
        label: 'How do you expect the website to contribute to revenue?',
        type: 'textarea',
        placeholder: 'e.g. direct sales, bookings, lead generation, advertising…',
      },
      { id: 'lead_value', label: 'What is the average value of a lead, enquiry, or sale for your business?', type: 'text', placeholder: 'e.g. £500 per lead, £50 per sale…' },
      { id: 'reduce_costs', label: 'Do you want the site to reduce operational costs?', type: 'textarea', placeholder: 'e.g. automation, fewer support calls, online bookings…' },
      { id: 'growth_targets', label: 'Do you have growth targets the site should help achieve?', type: 'textarea', placeholder: 'e.g. 100 leads/month, 50% more online bookings…' },
    ],
  },
  {
    title: 'Your Details',
    blurb: 'Last step. Where should I send the proposal?',
    fields: [
      { id: 'client_name', label: 'Your name', type: 'text', required: true },
      { id: 'client_email', label: 'Email address', type: 'email', required: true },
      { id: 'client_company', label: 'Business / company name', type: 'text' },
      { id: 'client_phone', label: 'Phone number (optional)', type: 'text' },
      { id: 'timeline', label: 'When do you need the site live?', type: 'select', options: ['ASAP', 'Within 1 month', 'Within 3 months', '3-6 months', 'No rush'] },
      {
        id: 'budget_range',
        label: 'Approximate budget range',
        type: 'select',
        options: ['Under £2,000', '£2,000 - £5,000', '£5,000 - £10,000', '£10,000 - £25,000', '£25,000+', 'Not sure — advise me'],
      },
      { id: 'anything_else', label: 'Anything else I should know?', type: 'textarea' },
    ],
  },
];

type FormData = Record<string, string>;

export function IntakeForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const section = SECTIONS[step];
  const isLast = step === SECTIONS.length - 1;
  const progress = ((step + 1) / SECTIONS.length) * 100;

  function updateField(id: string, value: string) {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || 'Something went wrong.');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[var(--radius-l)] bg-[var(--color-surface)] p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-on-accent)]">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="h2 mt-8">Your brief is in.</h2>
        <p className="text-big mt-4 text-[var(--color-text-mute)]">
          Thanks for taking the time. I&apos;ll come back within 24 hours with next steps.
        </p>
        <p className="text-small mt-8 text-[var(--color-text-soft)]">
          russle · hello@russle.co.uk
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <span className="label text-[var(--color-text-soft)]">
            Step {step + 1} / {SECTIONS.length}
          </span>
          <span className="label text-[var(--color-text-soft)]">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="mt-3 h-px w-full bg-[var(--color-line)]">
          <div
            className="h-px bg-[var(--color-accent)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Section header */}
      <div className="mb-10">
        <h2 className="h2">{section.title}</h2>
        <p className="text-big mt-4 text-[var(--color-text-mute)]">{section.blurb}</p>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-8">
        {section.fields.map((field) => (
          <FieldRender key={field.id} field={field} value={formData[field.id] || ''} onChange={(v) => updateField(field.id, v)} />
        ))}
      </div>

      {error && (
        <p className="text-small mt-6 text-[var(--color-accent)]" role="alert">
          {error}
        </p>
      )}

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between border-t border-[var(--color-line)] pt-8">
        <button
          type="button"
          onClick={() => setStep(Math.max(0, step - 1))}
          className={cn(
            'inline-flex h-12 items-center gap-2 rounded-[var(--radius-xl)] px-6 text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-mute)] transition-all hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]',
            step === 0 && 'invisible',
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || !formData.client_name || !formData.client_email}
            className="inline-flex h-14 items-center gap-2 rounded-[var(--radius-xl)] bg-[var(--color-accent)] px-8 text-[14px] font-bold uppercase tracking-[0.08em] text-[var(--color-on-accent)] transition-colors hover:bg-[var(--color-accent-lo)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? 'Sending…' : 'Submit brief'}
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep(Math.min(SECTIONS.length - 1, step + 1))}
            className="inline-flex h-14 items-center gap-2 rounded-[var(--radius-xl)] bg-[var(--color-text)] px-8 text-[14px] font-bold uppercase tracking-[0.08em] text-[var(--color-bg)] transition-colors hover:bg-[var(--color-dark-2)]"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function FieldRender({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (v: string) => void;
}) {
  const fieldClasses =
    'w-full rounded-[var(--radius-m)] bg-[var(--color-surface)] px-5 py-4 text-body text-[var(--color-text)] placeholder:text-[var(--color-text-soft)] outline-none transition-colors duration-200 focus:bg-[var(--color-surface-2)]';

  return (
    <div>
      <label htmlFor={field.id} className="label block text-[var(--color-text-mute)]">
        {field.label}
        {field.required && <span className="ml-1 text-[var(--color-accent)]">*</span>}
      </label>

      <div className="mt-3">
        {field.type === 'textarea' ? (
          <textarea
            id={field.id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className={cn(fieldClasses, 'resize-none')}
          />
        ) : field.type === 'select' ? (
          <div className="grid gap-2">
            {field.options!.map((option) => {
              const selected = value === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange(option)}
                  className={cn(
                    'group flex items-center gap-3 rounded-[var(--radius-m)] border px-5 py-4 text-left text-body transition-all',
                    selected
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent-tint)] text-[var(--color-text)]'
                      : 'border-[var(--color-line-2)] bg-[var(--color-bg)] text-[var(--color-text-mute)] hover:border-[var(--color-text-mute)] hover:text-[var(--color-text)]',
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all',
                      selected
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)]'
                        : 'border-[var(--color-line-2)] group-hover:border-[var(--color-text-mute)]',
                    )}
                  >
                    {selected && <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-on-accent)]" />}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <input
            id={field.id}
            type={field.type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={fieldClasses}
          />
        )}
      </div>
    </div>
  );
}
