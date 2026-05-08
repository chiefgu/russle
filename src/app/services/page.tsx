import type { Metadata } from 'next';
import Link from 'next/link';
import { Monitor, Palette, FileText, PenLine, ArrowUpRight } from 'lucide-react';

import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/animations/Reveal';
import { Placeholder } from '@/components/ui/Placeholder';
import { GrowFlow } from '@/components/sections/GrowFlow';
import { LaunchVisual } from '@/components/sections/LaunchVisual';
import { BethVisual } from '@/components/sections/BethVisual';
import { ManageVisual } from '@/components/sections/ManageVisual';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Brand, website, and the systems that grow them. Three tiers: Launch, Grow, Manage. From £2,500.',
};

const LAUNCH_INCLUDED = [
  'Brand identity (logo, colours, fonts, basic guidelines)',
  'Custom-designed website (typically 5–7 pages)',
  'Real, custom-built code, yours to own. No template.',
  'Domain and hosting setup',
  'Analytics, email, and basic search setup handed over',
  '4–6 week timeline',
];

const GROW_SERVICES = [
  {
    title: 'Search visibility',
    body: 'Showing up on Google when people look for what you do. Technical setup, content recommendations, and ongoing improvements.',
  },
  {
    title: 'Email marketing',
    body: 'Welcome flows, customer follow-ups, promotions. The email side of every business that actually retains customers.',
  },
  {
    title: 'Local search',
    body: 'Google Business Profile, listings across the directories that matter, and review management. The basics done properly.',
  },
  {
    title: 'Site care',
    body: 'Updates, design tweaks, hosting, and the small things that keep the site working. No surprises.',
  },
];

const MANAGE_ADDITIONS = [
  'Content (writing, photography direction, social posts)',
  'Ongoing campaign work',
  'Monthly strategy calls',
  'Quarterly review and planning',
];

const ALA_CARTE = [
  {
    title: 'Website only',
    body: 'You already have a brand.',
    icon: Monitor,
  },
  {
    title: 'Brand only',
    body: "You already have a website or don't need one yet.",
    icon: Palette,
  },
  {
    title: 'One-page site',
    body: 'A launch page, an event, a single product.',
    icon: FileText,
  },
  {
    title: 'Content',
    body: 'Writing, photography direction, social. On top of any tier.',
    icon: PenLine,
  },
];

function Bridge({
  to,
  children,
}: {
  to?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[var(--color-line)] bg-[var(--color-bg)] py-20 md:py-28">
      <Container size="main">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span
              aria-hidden
              className="inline-block h-px w-12 bg-[var(--color-accent)]"
            />
            {to && (
              <p className="label mt-8 text-[var(--color-text-soft)]">
                Next &middot; {to}
              </p>
            )}
            <p className="h3 mt-6 text-balance italic text-[var(--color-text)]">
              {children}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero — tight framing, not the full editorial */}
      <Section tone="bg" spacing="heroTopTight">
        <div className="max-w-3xl">
          <Reveal>
            <Tag tone="accent">Services</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h2 mt-6 text-balance">
              Three tiers, one studio.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-big mt-6 max-w-xl text-[var(--color-text-mute)]">
              Most projects start with Launch and stay with us through Grow and Manage as the business gets bigger.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Launch — first tier (info left, visual right; bullets centered below) */}
      <Section tone="bg" spacing="xl">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-h3 font-medium tracking-[-0.04em] text-[var(--color-text-soft)]">
                01
              </p>
              <Tag tone="accent" className="mt-6">Launch</Tag>
              <h2 className="h1 mt-6 text-balance">
                Brand and website, built together.
              </h2>
              <p className="text-big mt-8 text-[var(--color-text-mute)]">
                The starting point for most projects. The brand identity and the website, designed and shipped as one engagement so they actually fit each other.
              </p>
              <div className="mt-10 flex items-end gap-4">
                <p className="font-medium leading-none tracking-[-0.04em] text-[var(--color-text)]" style={{ fontSize: '64px' }}>
                  £2,500
                </p>
                <p className="text-body pb-2 text-[var(--color-text-mute)]">
                  starting price
                </p>
              </div>
              <div className="mt-10">
                <ButtonLink href="/start" variant="primary" size="lg" withArrow>
                  Start a project
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.05}>
              <LaunchVisual />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="hidden md:-mt-16 md:block">
                <BethVisual />
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-16 max-w-3xl rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-10 md:mt-20 md:p-12">
            <p className="label text-[var(--color-text-soft)]">
              What you get
            </p>
            <ul className="mt-6 space-y-4 text-big text-[var(--color-text)]">
              {LAUNCH_INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <Bridge to="02 Grow">
        Once you&apos;re live, the question becomes: how do you turn this into a working sales channel?
      </Bridge>

      {/* Grow — info left, GrowFlow right; services grid centered below */}
      <Section tone="bg" spacing="xl">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-h3 font-medium tracking-[-0.04em] text-[var(--color-text-soft)]">
                02
              </p>
              <Tag tone="accent" className="mt-6">Grow</Tag>
              <h2 className="h1 mt-6 text-balance">
                The site stops being a brochure.
              </h2>
              <p className="text-big mt-8 text-[var(--color-text-mute)]">
                A monthly arrangement after launch. Three engines &mdash; search, email, local &mdash; and site care, all run by the same studio that built the brand.
              </p>
              <p className="text-big mt-6 text-[var(--color-text)]">
                On enquiry.
              </p>
              <div className="mt-10">
                <ButtonLink href="/contact" variant="secondary" size="lg">
                  Get in touch
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.05}>
              <GrowFlow />
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-16 max-w-4xl md:mt-20">
            <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] sm:grid-cols-2">
              {GROW_SERVICES.map((s) => (
                <div key={s.title} className="flex h-full flex-col bg-[var(--color-bg)] p-8 md:p-10">
                  <h3 className="h4 text-balance">{s.title}</h3>
                  <p className="text-body mt-4 text-[var(--color-text-mute)]">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <Bridge to="03 Manage">
        For businesses ready to lean in deeper, with a studio working alongside them month to month.
      </Bridge>

      {/* Manage — info left, ManageVisual right; bullets centered below */}
      <Section tone="bg" spacing="xl">
        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-h3 font-medium tracking-[-0.04em] text-[var(--color-text-soft)]">
                03
              </p>
              <Tag tone="accent" className="mt-6">Manage</Tag>
              <h2 className="h2 mt-6 text-balance">
                Full ongoing partnership.
              </h2>
              <p className="text-big mt-8 text-[var(--color-text-mute)]">
                Everything in Grow, plus the work that needs constant attention. For businesses that want a studio working alongside them month to month, not a series of one-off projects.
              </p>
              <p className="text-big mt-6 text-[var(--color-text)]">
                On enquiry.
              </p>
              <div className="mt-10">
                <ButtonLink href="/contact" variant="secondary" size="lg">
                  Get in touch
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.05}>
              <ManageVisual />
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-16 max-w-3xl rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-10 md:mt-20 md:p-12">
            <p className="label text-[var(--color-text-soft)]">
              What Manage adds
            </p>
            <ul className="mt-6 space-y-4 text-big text-[var(--color-text)]">
              {MANAGE_ADDITIONS.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* À la carte */}
      <Section tone="bg" spacing="xl">
        <div className="mb-12 max-w-3xl">
          <Reveal>
            <Tag>À la carte</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h2 mt-6 text-balance">Just the slice you need.</h2>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ALA_CARTE.map((slice, i) => {
            const Icon = slice.icon;
            return (
              <Reveal key={slice.title} delay={i * 0.05}>
                <Link
                  href="/start"
                  className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_18px_48px_-20px_rgba(26,20,16,0.18)]"
                >
                  {/* Accent bar that grows in on hover */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                  />

                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-line-2)] bg-[var(--color-bg)] text-[var(--color-text-mute)] transition-all duration-300 group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent-tint)] group-hover:text-[var(--color-accent)]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="h4 mt-8 text-balance">{slice.title}</h3>
                  <p className="text-body mt-4 text-[var(--color-text-mute)]">
                    {slice.body}
                  </p>
                  <p className="text-small mt-6 text-[var(--color-text-mute)]">
                    Pricing on enquiry.
                  </p>

                  <div className="mt-auto flex items-center gap-2 pt-10 text-[var(--color-text)]">
                    <span className="label">Start a project</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CTAStrip />
    </>
  );
}
