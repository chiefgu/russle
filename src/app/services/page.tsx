import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/animations/Reveal';
import { getAllWork } from '@/lib/mdx';

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
  { title: 'Website only', body: 'You already have a brand.' },
  { title: 'Brand only', body: "You already have a website or don't need one yet." },
  { title: 'One-page site', body: 'A launch page, an event, a single product.' },
  { title: 'Content', body: 'Writing, photography direction, social. On top of any tier.' },
];

const PROCESS_STEPS = [
  { n: '01', title: 'Discovery' },
  { n: '02', title: 'Direction' },
  { n: '03', title: 'Production' },
  { n: '04', title: 'Launch' },
];

function Bridge({
  to,
  children,
}: {
  to?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[var(--color-bg)] py-20 md:py-32">
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
  const work = getAllWork();

  return (
    <>
      {/* Hero */}
      <Section tone="bg" spacing="heroTop" container="main">
        <div className="max-w-5xl">
          <Reveal>
            <Tag tone="accent">Services</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h1 mt-6 text-balance">
              Brand, website, and the systems that grow them.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-big mt-8 max-w-3xl text-[var(--color-text-mute)]">
              Three tiers, one studio. Most projects start with Launch and stay with us through Grow and Manage as the business gets bigger.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10">
              <ButtonLink href="/start" variant="primary" size="lg" withArrow>
                Start a project
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Bridge to="01 Launch">
        Most projects start here. A new brand, a new site, both designed and built together.
      </Bridge>

      {/* Launch — large editorial treatment */}
      <Section tone="surface" spacing="xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
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
              <div className="rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-10 md:p-12">
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
          </div>
        </div>
      </Section>

      <Bridge to="02 Grow">
        Once you&apos;re live, the question becomes: how do you turn this into a working sales channel?
      </Bridge>

      {/* Grow — service cards */}
      <Section tone="surface" spacing="xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <p className="text-h3 font-medium tracking-[-0.04em] text-[var(--color-text-soft)]">
                02
              </p>
              <Tag tone="accent" className="mt-6">Grow</Tag>
              <h2 className="h2 mt-6 text-balance">
                The marketing that grows it.
              </h2>
              <p className="text-big mt-8 text-[var(--color-text-mute)]">
                A monthly arrangement after launch. Site care plus the four marketing services that turn a website into a working sales channel.
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

          <div className="md:col-span-8">
            <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] sm:grid-cols-2">
              {GROW_SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.05}>
                  <div className="flex h-full flex-col bg-[var(--color-bg)] p-8 md:p-10">
                    <h3 className="h4 text-balance">{s.title}</h3>
                    <p className="text-body mt-4 text-[var(--color-text-mute)]">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Bridge to="03 Manage">
        For businesses ready to lean in deeper, with a studio working alongside them month to month.
      </Bridge>

      {/* Manage — smaller, focused */}
      <Section tone="surface" spacing="xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
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
              <div className="rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-10 md:p-12">
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
          </div>
        </div>
      </Section>

      {/* Proof */}
      <Section tone="bg" spacing="xl">
        <div className="grid gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <Reveal>
              <Tag>Recent</Tag>
              <h2 className="h2 mt-6 text-balance">
                Built for a range of independent businesses.
              </h2>
              <p className="text-body mt-6 max-w-md text-[var(--color-text-mute)]">
                The work crosses sectors. What stays the same is the standard.
              </p>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {work.map((item) => (
                  <li key={item.slug} className="flex items-baseline gap-3">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--color-text-soft)]" />
                    <span className="text-big text-[var(--color-text)]">
                      {item.client}
                    </span>
                    <span className="text-small text-[var(--color-text-soft)]">
                      {item.sector}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <ButtonLink href="/work" variant="ghost" withArrow>
                  See the work
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <blockquote className="border-l-2 border-[var(--color-accent)] pl-8">
                <p className="h3 text-balance text-[var(--color-text)]">
                  &ldquo;russle understood that I needed less, not more. It&apos;s the first site I&apos;ve had that I&apos;m happy to send people to.&rdquo;
                </p>
                <footer className="mt-8">
                  <p className="text-body text-[var(--color-text)]">Abigail</p>
                  <p className="text-small text-[var(--color-text-mute)]">
                    Owner, Makeup by Abigail
                  </p>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* À la carte */}
      <Section tone="surface" spacing="xl">
        <div className="mb-12 max-w-3xl">
          <Reveal>
            <Tag>À la carte</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h2 mt-6 text-balance">Just the slice you need.</h2>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ALA_CARTE.map((slice, i) => (
            <Reveal key={slice.title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-8">
                <h3 className="h3 text-balance">{slice.title}</h3>
                <p className="text-body mt-4 text-[var(--color-text-mute)]">
                  {slice.body}
                </p>
                <p className="text-small mt-6 text-[var(--color-text-mute)]">
                  Pricing on enquiry.
                </p>
                <div className="mt-auto pt-8">
                  <ButtonLink href="/start" variant="secondary" size="md">
                    Start a project
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Compact process strip */}
      <Section tone="bg" spacing="xl">
        <div className="mb-10 max-w-2xl">
          <Reveal>
            <Tag>How it works</Tag>
            <h2 className="h2 mt-6 text-balance">Four phases, every project.</h2>
          </Reveal>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.05}>
              <div className="border-t border-[var(--color-line-2)] pt-6">
                <p className="label text-[var(--color-text-soft)]">{step.n}</p>
                <p className="h4 mt-3">{step.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTAStrip />
    </>
  );
}
