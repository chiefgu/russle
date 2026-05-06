import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Reveal } from '@/components/animations/Reveal';
import { getAllWork } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Brand, website, and the systems that grow them. Three tiers: Launch, Grow, Manage. From £2,500.',
};

const LAUNCH_INCLUDED = [
  'Brand identity (logo, palette, type, basic guidelines)',
  'Custom-designed website (typically 5–7 pages)',
  'Built and shipped on Next.js',
  'Domain and hosting setup',
  'Analytics and email handed over',
  '4–6 week timeline',
];

const GROW_INCLUDED = [
  'Site updates and iterations after launch',
  'SEO setup and ongoing optimisation',
  'Email marketing (templates, automations, campaigns)',
  'Local business optimisation (Google Business Profile, citations, reviews)',
  'Hosting + domain handled',
  'Monthly reporting and recommendations',
];

const MANAGE_INCLUDED = [
  'Everything in Grow',
  'Content creation (copy, photography direction, social)',
  'Ongoing campaign work',
  'Higher-touch monthly strategy calls',
  'Quarterly review and planning',
];

const ALA_CARTE = [
  { title: 'Web only', body: 'You already have a brand.' },
  { title: 'Brand only', body: "You already have a site or don't need one yet." },
  { title: 'One-page site', body: 'A launch page, an event, a single product.' },
  { title: 'Content', body: 'Copy, photography direction, social. On top of any tier.' },
];

type TierProps = {
  tag: string;
  title: string;
  blurb: string;
  price: string;
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: 'primary' | 'secondary';
  bullets: string[];
  tone: 'bg' | 'surface';
  delay?: number;
};

function Tier({
  tag,
  title,
  blurb,
  price,
  ctaLabel,
  ctaHref,
  ctaVariant,
  bullets,
  tone,
}: TierProps) {
  return (
    <Section tone={tone} spacing="xl">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <Tag>{tag}</Tag>
            <h2 className="h2 mt-6 text-balance">{title}</h2>
            <p className="text-big mt-6 text-[var(--color-text-mute)]">
              {blurb}
            </p>
            <p className="text-big mt-6 text-[var(--color-text)]">{price}</p>
            <div className="mt-8">
              <ButtonLink
                href={ctaHref}
                variant={ctaVariant}
                size="lg"
                withArrow={ctaVariant === 'primary'}
              >
                {ctaLabel}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal delay={0.05}>
            <p className="label text-[var(--color-text-soft)]">
              What&apos;s included
            </p>
            <ul className="mt-4 grid gap-3 text-body text-[var(--color-text)] md:grid-cols-2 md:gap-x-8">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-text-mute)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
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
              Three tiers, one studio. Launch starts at £2,500. Grow and Manage are monthly retainers, scoped to where the business is and where it is going.
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

      <Tier
        tag="Launch"
        title="Brand and website, built together."
        blurb="The starting point for most projects. Brand identity and a custom website, designed and shipped as one engagement."
        price="From £2,500"
        ctaLabel="Start a project"
        ctaHref="/start"
        ctaVariant="primary"
        bullets={LAUNCH_INCLUDED}
        tone="surface"
      />

      <Tier
        tag="Grow"
        title="Once you're live, the systems that grow it."
        blurb="A monthly retainer. Site care plus the marketing systems that turn a website into a working sales channel."
        price="On enquiry"
        ctaLabel="Get in touch"
        ctaHref="/contact"
        ctaVariant="secondary"
        bullets={GROW_INCLUDED}
        tone="bg"
      />

      <Tier
        tag="Manage"
        title="Full ongoing partnership."
        blurb="For businesses that want a studio embedded in the work, not a series of one-offs."
        price="On enquiry"
        ctaLabel="Get in touch"
        ctaHref="/contact"
        ctaVariant="secondary"
        bullets={MANAGE_INCLUDED}
        tone="surface"
      />

      {/* Proof bar */}
      <Section tone="bg" spacing="xl">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-4">
            <Reveal>
              <Tag>Recent</Tag>
              <h2 className="h2 mt-6 text-balance">Who we&apos;ve built for.</h2>
              <p className="text-body mt-6 text-[var(--color-text-mute)]">
                A range of businesses. The work crosses sectors.
              </p>
              <div className="mt-8">
                <ButtonLink href="/work" variant="ghost" withArrow>
                  See the work
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.05}>
              <ul className="grid gap-x-12 gap-y-4 sm:grid-cols-2 md:gap-x-16">
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
              <blockquote className="mt-12 border-l-2 border-[var(--color-line-2)] pl-6">
                <p className="text-big text-balance text-[var(--color-text)]">
                  &ldquo;russle understood that I needed less, not more. It&apos;s the first site I&apos;ve had that I&apos;m happy to send people to.&rdquo;
                </p>
                <footer className="mt-4">
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

      {/* Process — bg tone so it alternates from à la carte surface above */}
      <ProcessSteps tone="bg" />

      <CTAStrip />
    </>
  );
}
