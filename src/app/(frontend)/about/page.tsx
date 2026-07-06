import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/animations/Reveal';

export const metadata: Metadata = {
  title: 'About the studio',
  description:
    'russle is a web design, ecommerce and SEO studio. Websites, online stores, and the SEO systems behind them, for ambitious businesses across the UK.',
};

const PRINCIPLES = [
  {
    title: 'Built to be found.',
    body: 'A fast site and the search work that grows on top of it. Design, build, and SEO pulling in the same direction. Nothing fights itself.',
  },
  {
    title: 'Direct contact.',
    body: 'No middlemen. You talk to the people doing the work, every day. Every email gets answered.',
  },
  {
    title: 'Real custom websites.',
    body: "Not a Squarespace template with the colours changed. A fast, accessible site that's yours to own outright, with no monthly subscription to a website builder.",
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
      {/* Hero */}
      <Section tone="bg" spacing="heroTop" container="main">
        <div className="max-w-4xl">
          <Reveal>
            <Tag tone="accent">About</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h1 mt-6 text-balance">
              An independent UK studio for web design, ecommerce, and the SEO that keeps them found.
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
                  russle is an independent UK studio. The work covers everything from designing and building the website or store through to the SEO that scales the business once it&apos;s live.
                </p>
                <p className="text-[var(--color-text-mute)]">
                  Clients are businesses that take their website seriously and want one team to design it, build it, and grow it. The design, the build, the launch, the SEO after you go live, all the same team.
                </p>
                <p className="text-[var(--color-text-mute)]">
                  Projects start with the intake form at /start, and launch four to six weeks later.
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
              <Tag>Built on</Tag>
              <p className="text-body mt-4 max-w-xs text-[var(--color-text-mute)]">
                The tools the team reaches for first. We can work in your existing setup if you have one.
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
