import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/animations/Reveal';

export const metadata: Metadata = {
  title: 'About',
  description:
    'russle is an independent UK studio. Brand, website, and the systems that grow them.',
};

const PRINCIPLES = [
  {
    title: 'Brand-led growth.',
    body: 'A brand and a site that look like the same business. SEO, email, and local that compound on top. Nothing fights itself.',
  },
  {
    title: 'Direct contact.',
    body: 'No PMs, no proxies. You talk to the team doing the work, every day. Every email gets answered.',
  },
  {
    title: 'Real software.',
    body: "Production code, not no-code stitched together. The site is fast, accessible, and yours to own. No platform lock-in.",
  },
];

const STACK = [
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'NestJS',
  'Prisma',
  'PostgreSQL',
  'Stripe',
  'Resend',
  'Figma',
  'Vercel',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero, single statement */}
      <Section tone="bg" spacing="heroTop" container="main">
        <div className="max-w-5xl">
          <Reveal>
            <Tag tone="accent">About</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h1 mt-6 text-balance">
              An independent UK studio for brand, website, and the systems that grow them.
            </h1>
          </Reveal>
        </div>
      </Section>

      {/* Principles */}
      <Section tone="surface" spacing="xl">
        <Reveal>
          <Tag>Principles</Tag>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="flex h-full flex-col bg-[var(--color-surface)] p-10 md:p-12">
                <h3 className="h3 max-w-xs text-balance">{p.title}</h3>
                <p className="text-body mt-6 text-[var(--color-text-mute)]">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The work */}
      <Section tone="bg" spacing="xl">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <Tag>The work</Tag>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal delay={0.05}>
              <div className="text-big max-w-3xl space-y-6 text-[var(--color-text)]">
                <p>
                  russle is independent. The work covers brand, design, and code through to the systems that grow the business once it&apos;s live: SEO, email marketing, and local optimisation.
                </p>
                <p className="text-[var(--color-text-mute)]">
                  Clients are independent businesses that have outgrown the cheap end of the market and don&apos;t want an agency relationship to manage. The brand-direction document, the React, the Postgres schema, the SEO setup, the email automations, the 9pm DNS panic on launch night, all the same studio.
                </p>
                <p className="text-[var(--color-text-mute)]">
                  Projects start with the intake form at /start, and ship four to six weeks later.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Stack */}
      <Section tone="surface" spacing="l">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <Tag>Stack</Tag>
              <p className="text-body mt-4 max-w-xs text-[var(--color-text-mute)]">
                The tools the studio reaches for first. Happy to work in your stack if needed.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal delay={0.05}>
              <ul className="flex flex-wrap gap-3">
                {STACK.map((t) => (
                  <li
                    key={t}
                    className="rounded-[var(--radius-pill)] border border-[var(--color-line-2)] px-5 py-2 text-body"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <CTAStrip />
    </>
  );
}
