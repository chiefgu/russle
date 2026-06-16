import type { Metadata } from 'next';
import { Check } from 'lucide-react';

import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { FAQ } from '@/components/ui/FAQ';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/animations/Reveal';
import { GrowFlow } from '@/components/sections/GrowFlow';
import { LaunchVisual } from '@/components/sections/LaunchVisual';
import { BethVisual } from '@/components/sections/BethVisual';
import { ManageVisual } from '@/components/sections/ManageVisual';

export const metadata: Metadata = {
  title: 'Brand, web & growth services',
  description:
    'russle offers Launch, Grow, and Manage tiers. Brand, website, e-commerce, hosting, SEO, and email marketing for ambitious businesses. Launch from £1,995. Grow from £299/mo.',
};

const LAUNCH_INCLUDED = [
  'A new logo, colour palette, and font system',
  'A website built from scratch, around the new brand (5 to 7 pages typical)',
  'Custom-built code, no template, hosted on our own platform',
  'Domain, hosting, and business email setup',
  'Google Maps and Google search set up before launch',
  'AI search optimisation (GEO) so you surface in ChatGPT, Perplexity, and AI Overviews',
  'Email marketing ready to go (welcome flow, newsletter signup)',
  'Analytics and tracking installed (GA4, Meta Pixel, conversion events)',
  'Live as soon as 14 days',
];

const GROW_INCLUDED = [
  'Hosting on our platform, included',
  'Up to 2 hours of small site updates each month',
  'Your Google Business Profile run on your behalf',
  'Local search kept healthy (rankings, listings, schema)',
  'AI search optimisation (GEO) maintained (ChatGPT, Perplexity, AI Overviews)',
  'Email system maintained (deliverability, templates, list health)',
  'Analytics and tracking maintained (data integrity, broken-tracker fixes)',
  'Performance and uptime monitoring',
  'Monthly performance email, plain English',
  '30-minute monthly check-in call',
];

const MANAGE_INCLUDED = [
  'Everything in Grow',
  'Original content writing for your site (case studies, guides, blog)',
  'Content optimised for both human and AI readers (GEO)',
  'Ongoing campaigns, organic and paid',
  'Monthly strategy session',
  'Quarterly review and planning',
  'Detailed analytics dashboards and insights',
];

type Cell = boolean | string;

type CompareRow = {
  label: string;
  launch: Cell;
  grow: Cell;
  manage: Cell;
};

type CompareSection = {
  title: string;
  rows: CompareRow[];
};

const COMPARISON: CompareSection[] = [
  {
    title: 'Setup',
    rows: [
      { label: 'New brand identity', launch: true, grow: false, manage: false },
      { label: 'New website, custom-built', launch: true, grow: false, manage: false },
      { label: 'Hosting on our platform', launch: 'First year', grow: true, manage: true },
      { label: 'Domain and email setup', launch: true, grow: false, manage: false },
      { label: 'Google Maps and search setup', launch: true, grow: false, manage: false },
      { label: 'AI search optimisation (GEO) setup', launch: true, grow: false, manage: false },
      { label: 'Email marketing setup', launch: true, grow: false, manage: false },
      { label: 'Analytics and tracking installed', launch: true, grow: false, manage: false },
    ],
  },
  {
    title: 'Ongoing care',
    rows: [
      { label: 'Site updates each month', launch: false, grow: 'Up to 2 hrs', manage: 'More' },
      { label: 'Google Business Profile management', launch: false, grow: true, manage: true },
      { label: 'Local search monitoring and fixes', launch: false, grow: true, manage: true },
      { label: 'AI search optimisation (GEO) maintenance', launch: false, grow: true, manage: true },
      { label: 'Email system maintained', launch: false, grow: true, manage: true },
      { label: 'Analytics tracking maintained', launch: false, grow: true, manage: true },
      { label: 'Performance and uptime monitoring', launch: false, grow: true, manage: true },
      { label: 'Monthly performance email', launch: false, grow: 'Plain email', manage: 'Full dashboard' },
      { label: 'Monthly check-in', launch: false, grow: '30 min', manage: '60 min' },
      { label: 'Conversion optimisation', launch: false, grow: 'Ongoing', manage: 'Full' },
    ],
  },
  {
    title: 'Marketing work',
    rows: [
      { label: 'Original content writing', launch: false, grow: false, manage: true },
      { label: 'Content tuned for AI citation (GEO)', launch: false, grow: false, manage: true },
      { label: 'Ongoing campaigns (organic + paid)', launch: false, grow: false, manage: true },
      { label: 'Monthly strategy session', launch: false, grow: false, manage: true },
      { label: 'Quarterly review and planning', launch: false, grow: false, manage: true },
    ],
  },
  {
    title: 'Terms',
    rows: [
      { label: 'Contract', launch: 'One-off project', grow: 'No long-term', manage: 'Custom' },
      { label: 'Notice period', launch: false, grow: '30 days', manage: 'Per agreement' },
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: 'How long does it take to see results from local SEO?',
    a: 'Most clients see a meaningful change in the Google Maps pack within 60 to 90 days, and lift in organic search inside 4 to 6 months. SEO is slower than paid ads but the traffic keeps coming once it lands, which is why we recommend it for almost every business we work with.',
  },
  {
    q: 'Do you guarantee a number-one ranking?',
    a: 'No, and you should walk away from anyone who does. Google does not allow agencies to guarantee positions, and any agency promising a top spot is either being dishonest or about to do something that gets your site penalised. What we do guarantee is the work and the reporting, so you can see exactly what is moving and why.',
  },
  {
    q: 'Why does Grow start at £299 a month?',
    a: 'Because that covers hosting, the platform, the search and local maintenance, your Google Business Profile run on your behalf, and a real monthly check-in. Most retainers settle higher once we know what your business actually needs.',
  },
  {
    q: 'Do I really need ongoing care after launch?',
    a: 'Most businesses do. A website that nobody updates ages quickly, the rankings drift, and the Google Business Profile goes quiet. Grow is the small monthly investment that keeps the brand and the site doing their job. If you want to run it yourself, that is fine, we just hand it over and answer questions when you need.',
  },
  {
    q: 'Can I edit the website myself?',
    a: 'Not really, and that is by design. Marketing sites we build are looked after by us through the Grow retainer, which keeps the design tight and the content fresh without you having to learn a CMS. Online shops are different: they come with a dashboard and an iOS app for managing products, stock, and orders. If you want to edit the marketing pages yourself, tell us at the start and we will scope a CMS into the build.',
  },
  {
    q: 'What if I just want a website with no brand work?',
    a: 'Get in touch. We can scope a website-only project but most businesses find the brand and site work better when they are designed together, which is why Launch is our default starting point.',
  },
  {
    q: 'Do you run paid ads?',
    a: 'Only inside Manage, where ads sit alongside ongoing campaigns and content. We do not sell ads as a standalone service. If paid is the only thing you need right now, we will recommend someone who specialises in it.',
  },
];

function ServicesHero() {
  return (
    <Section tone="bg" spacing="heroTopTight">
      <div className="max-w-3xl">
        <Reveal>
          <Tag tone="accent">Services</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="h1 mt-6 text-balance">Three tiers. Pick the level that fits.</h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-big mt-6 max-w-xl text-[var(--color-text-mute)]">
            Most clients start with Launch, the one-off brand and website build.
            After launch, they move onto Grow, the monthly arrangement that keeps
            everything running. Manage is for businesses who want a team
            running the marketing as well.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

type TierProps = {
  index: string;
  name: string;
  headline: string;
  pitch: string;
  price: string;
  priceNote: string;
  pageHref: string;
  cta: { label: string; href: string };
  included: string[];
  visual: React.ReactNode;
  extraVisual?: React.ReactNode;
};

function Tier({
  index,
  name,
  headline,
  pitch,
  price,
  priceNote,
  pageHref,
  cta,
  included,
  visual,
  extraVisual,
}: TierProps) {
  return (
    <Section tone="bg" spacing="xl">
      <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
        <div className="md:col-span-5">
          <Reveal>
            <p className="label text-[var(--color-text-soft)]">Tier {index}</p>
            <h2 className="h2 mt-3 text-[var(--color-accent)]">{name}</h2>
            <h3 className="h1 mt-6 text-balance text-[var(--color-text)]">
              {headline}
            </h3>
            <p className="text-big mt-8 text-[var(--color-text-mute)]">{pitch}</p>
            <div className="mt-10 flex items-baseline gap-4">
              <p
                className="font-medium leading-none tracking-[-0.04em] text-[var(--color-text)]"
                style={{ fontSize: '56px' }}
              >
                {price}
              </p>
              <p className="text-body text-[var(--color-text-mute)]">{priceNote}</p>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={pageHref} variant="primary" size="lg" withArrow>
                How {name} works
              </ButtonLink>
              <ButtonLink href={cta.href} variant="secondary" size="lg">
                {cta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={0.05}>{visual}</Reveal>
          {extraVisual && (
            <Reveal delay={0.1}>
              <div className="hidden md:-mt-16 md:block">{extraVisual}</div>
            </Reveal>
          )}
        </div>
      </div>

      <Reveal delay={0.15}>
        <div className="mx-auto mt-16 max-w-3xl rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-10 md:mt-20 md:p-12">
          <p className="label text-[var(--color-text-soft)]">What you get</p>
          <ul className="mt-6 flex flex-col gap-4 text-big text-[var(--color-text)]">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <Check
                  aria-hidden
                  className="mt-1 h-5 w-5 shrink-0 text-[var(--color-accent)]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

function CellRender({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center" aria-label="Included">
        <Check className="h-5 w-5 text-[var(--color-accent)]" aria-hidden />
      </span>
    );
  }
  if (value === false) {
    return <span className="text-[var(--color-text-soft)]" aria-label="Not included">·</span>;
  }
  return <span className="text-small text-[var(--color-text)]">{value}</span>;
}

function ComparisonTable() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="mb-12 max-w-3xl">
        <Reveal>
          <Tag>Compare</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">Side by side, line by line.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
            What sits in which tier, with nothing hidden.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="overflow-x-auto rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)]">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-[var(--color-line)]">
                <th className="px-6 py-6 align-bottom md:px-8">
                  <span className="label text-[var(--color-text-soft)]">
                    What you get
                  </span>
                </th>
                <th className="px-6 py-6 align-bottom md:px-8">
                  <p className="label text-[var(--color-text-soft)]">Launch</p>
                  <p className="h4 mt-2 text-[var(--color-text)]">From £1,995</p>
                  <p className="text-small mt-1 text-[var(--color-text-mute)]">One-off</p>
                </th>
                <th className="px-6 py-6 align-bottom md:px-8">
                  <p className="label text-[var(--color-text-soft)]">Grow</p>
                  <p className="h4 mt-2 text-[var(--color-text)]">From £299/mo</p>
                  <p className="text-small mt-1 text-[var(--color-text-mute)]">
                    No long-term contract
                  </p>
                </th>
                <th className="px-6 py-6 align-bottom md:px-8">
                  <p className="label text-[var(--color-text-soft)]">Manage</p>
                  <p className="h4 mt-2 text-[var(--color-text)]">Talk to us</p>
                  <p className="text-small mt-1 text-[var(--color-text-mute)]">Custom</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((section) => (
                <Fragment key={section.title}>
                  <tr className="border-b border-[var(--color-line)] bg-[var(--color-surface)]/40">
                    <td
                      colSpan={4}
                      className="px-6 py-3 md:px-8 label text-[var(--color-text-mute)]"
                    >
                      {section.title}
                    </td>
                  </tr>
                  {section.rows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={
                        i === section.rows.length - 1
                          ? 'border-b border-[var(--color-line)]'
                          : ''
                      }
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 text-body font-normal text-[var(--color-text)] md:px-8"
                      >
                        {row.label}
                      </th>
                      <td className="px-6 py-4 md:px-8">
                        <CellRender value={row.launch} />
                      </td>
                      <td className="px-6 py-4 md:px-8">
                        <CellRender value={row.grow} />
                      </td>
                      <td className="px-6 py-4 md:px-8">
                        <CellRender value={row.manage} />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}

function RussellPlatform() {
  return (
    <Section tone="surface" spacing="xl">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <Reveal>
            <Tag>Our platform</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h1 mt-6 text-balance">
              Hosted on our own platform, not someone else&apos;s.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-big mt-8 max-w-xl text-[var(--color-text-mute)]">
              Every site we build runs on the russle platform. Hosting we own,
              one bill, one studio looking after the site. For online shops,
              the platform also includes a web dashboard and an iOS app so you
              can manage orders, stock, and posts from your phone.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-big mt-6 max-w-xl text-[var(--color-text-mute)]">
              You do not pay a separate hosting bill, you do not learn
              WordPress, and the studio that designed the brand is the one
              keeping the site running. Day-to-day edits are part of Grow, not
              something you have to learn yourself.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-6">
          <Reveal delay={0.1}>
            <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] sm:grid-cols-2">
              {[
                {
                  title: 'Hosting included',
                  body: 'No separate Vercel or WordPress host, no surprise bill. One studio, one invoice.',
                },
                {
                  title: 'Run by the studio that built it',
                  body: 'Day-to-day edits are part of Grow. You do not have to learn WordPress.',
                },
                {
                  title: 'E-commerce dashboard',
                  body: 'Online shops get a web dashboard for managing products, orders, and stock.',
                },
                {
                  title: 'iOS app for shop owners',
                  body: 'Manage orders, post offers, and check stats from your phone. Online shops only.',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="flex h-full flex-col bg-[var(--color-bg)] p-8 md:p-10"
                >
                  <h3 className="h5 text-balance">{card.title}</h3>
                  <p className="text-body mt-4 text-[var(--color-text-mute)]">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function ServicesFaq() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <Reveal>
            <Tag>Common questions</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h2 mt-6 text-balance">
              Honest answers about how this works.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-big mt-6 text-[var(--color-text-mute)]">
              The questions every business owner asks before signing on. If
              yours is not here, send it through.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <FAQ items={FAQ_ITEMS} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

// React.Fragment shorthand needs an explicit import in some toolchains; using
// the named version keeps this portable.
import { Fragment } from 'react';

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <Tier
        index="01"
        name="Launch"
        headline="A new brand and a new website, built together."
        pitch="The starting point for most clients. The brand and the website are designed and shipped as one project so they actually fit each other. By the time you go live, the marketing basics are already in place."
        price="From £1,995"
        priceNote="One-off project"
        pageHref="/launch"
        cta={{ label: 'Start a project', href: '/start' }}
        included={LAUNCH_INCLUDED}
        visual={<LaunchVisual />}
        extraVisual={<BethVisual />}
      />
      <Tier
        index="02"
        name="Grow"
        headline="We run the technical side, you run your business."
        pitch="A monthly arrangement after launch. Hosting, small updates, Google Business, local search, and email all looked after by the studio that built the brand. No long-term contract."
        price="From £299"
        priceNote="Per month"
        pageHref="/grow"
        cta={{ label: 'Start a project', href: '/start' }}
        included={GROW_INCLUDED}
        visual={<GrowFlow />}
      />
      <Tier
        index="03"
        name="Manage"
        headline="A team running the marketing alongside the build."
        pitch="Everything in Grow, plus original content for your site, ongoing campaigns, and a monthly strategy session. For businesses who want a team acting as their marketing function, not a series of one-off projects."
        price="Talk to us"
        priceNote="Custom retainer"
        pageHref="/manage"
        cta={{ label: 'Get in touch', href: '/contact' }}
        included={MANAGE_INCLUDED}
        visual={<ManageVisual />}
      />
      <ComparisonTable />
      <RussellPlatform />
      <ServicesFaq />
      <CTAStrip />
    </>
  );
}
