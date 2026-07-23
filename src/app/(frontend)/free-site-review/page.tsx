import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';
import { SiteReviewForm } from '@/components/sections/SiteReviewForm';
import { CTAStrip } from '@/components/sections/CTAStrip';

export const metadata: Metadata = {
  title: 'Free Website Audit',
  description:
    'A free five-minute review of your website from russle: what is costing you enquiries, what to fix first, and whether it is worth rebuilding. No obligation.',
};

const COVERS = [
  { title: 'What is costing you enquiries', body: 'The specific places visitors give up, and why.' },
  { title: 'What to fix first', body: 'The two or three changes that would matter most, in order.' },
  { title: 'An honest verdict', body: 'If your current site is fine, we will say so. Not everything needs a rebuild.' },
];

export default function FreeSiteReviewPage() {
  return (
    <>
      <Section tone="bg" spacing="heroTopTight">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="max-w-2xl lg:col-span-6">
            <Reveal><Tag tone="accent">Free website audit</Tag></Reveal>
            <Reveal delay={0.05}>
              <h1 className="h1 mt-6 text-balance">A second opinion on your website, free.</h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-big mt-6 text-[var(--color-text-mute)]">
                Send us your site and we will record a short, plain-English review:
                what is working, what is costing you customers, and what we would
                fix first. Yours to keep, whoever you build with.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-10 space-y-5">
                {COVERS.map((c) => (
                  <li key={c.title} className="flex items-start gap-4">
                    <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    <p className="text-body text-[var(--color-text)]">
                      <span className="font-semibold">{c.title}.</span>{' '}
                      <span className="text-[var(--color-text-mute)]">{c.body}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.25}>
              <div className="rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 md:p-10">
                <SiteReviewForm />
                <p className="text-small mt-4 text-[var(--color-text-soft)]">
                  No mailing list, no follow-up sequence. One review, then it is up to you.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
      <CTAStrip />
    </>
  );
}
