import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/animations/Reveal';

export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm a designer-developer who'd rather do one project well than ten projects fast.",
};

const PRINCIPLES = [
  {
    title: 'Slow craft.',
    body: 'I take one project at a time. You get my full attention, not a Slack channel staffed by juniors.',
  },
  {
    title: 'Direct contact.',
    body: 'No PMs, no proxies. You talk to the person doing the work, every day.',
  },
  {
    title: 'Real software.',
    body: "I write production code. Your site doesn't get handed off to a build team — it gets built by the person who designed it.",
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
  'Squarespace',
  'Figma',
  'Vercel',
  'Swift / SwiftUI',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — single huge statement */}
      <Section tone="bg" spacing="heroTop" container="main">
        <div className="max-w-5xl">
          <Reveal>
            <Tag>About</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h1 mt-6 text-balance">
              I&apos;m a designer-developer who&apos;d rather do one project well than ten projects fast.
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

      {/* Practice */}
      <Section tone="bg" spacing="xl">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Reveal>
              <Tag>The practice</Tag>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal delay={0.05}>
              <div className="text-big max-w-3xl space-y-6 text-[var(--color-text)]">
                <p>
                  russle is independent. One person, no team, no agency, no overhead — which means you talk to the person who designs and builds your project, and that person takes the time to do it well.
                </p>
                <p className="text-[var(--color-text-mute)]">
                  I work with founders, marketing leads, and small teams who want a website that feels deliberate. The work is design, brand, and code — end to end, on the same project, by the same hands. The Figma, the React, the Postgres schema, the brand-direction document, the post-launch DNS surprise at 9pm — all me, all the time.
                </p>
                <p className="text-[var(--color-text-mute)]">
                  Most projects start with a single 60-minute call, end with a launch four to twelve weeks later, and continue from there. I take on one client at a time so the work gets the attention it deserves.
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
                The tools I reach for first. Happy to work in your stack if needed.
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
