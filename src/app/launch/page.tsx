import type { Metadata } from 'next';
import { Check, X } from 'lucide-react';

import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { FAQ } from '@/components/ui/FAQ';
import { Reveal } from '@/components/animations/Reveal';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { LaunchVisual } from '@/components/sections/LaunchVisual';
import { BethVisual } from '@/components/sections/BethVisual';

export const metadata: Metadata = {
  title: 'Launch, a new website built to bring customers in',
  description:
    'russle Launch is the one-off project that gives an independent business a new website, the copywriting, hosting, and the local marketing basics. From £1,995, with brand identity available. Live as soon as 14 days.',
  alternates: { canonical: '/launch' },
};

const INCLUDED = [
  {
    title: 'A custom-built website',
    body: 'Five to seven pages designed and built from scratch around your brand. Custom code, no template, hosted on our own platform.',
  },
  {
    title: 'The copywriting',
    body: 'The words for every page, written or refined with you so the site sounds like your business and reads well, not like a template.',
  },
  {
    title: 'Hosting on our platform',
    body: 'Your site lives on the russle platform. First year of hosting is included in the project price. After that, hosting is part of the Grow retainer.',
  },
  {
    title: 'Domain and email setup',
    body: 'We sort the domain, the email (so messages from your address actually reach the inbox), and the supporting bits that go with a real business site.',
  },
  {
    title: 'Google Maps and search ready',
    body: 'Google Business Profile claimed, optimised, and posting on day one. Local schema set up so the site appears in the map pack from launch, not six months later.',
  },
  {
    title: 'AI search optimisation (GEO)',
    body: 'Schema, structured content, and brand signals built in so your business is set up to surface in ChatGPT, Perplexity, and Google AI Overviews from day one.',
  },
  {
    title: 'Email marketing ready to go',
    body: 'A welcome flow for new subscribers, a newsletter template that matches the brand, and the list ready to receive customers from the first day the site is live.',
  },
  {
    title: 'Analytics and tracking installed',
    body: 'Google Analytics, Meta Pixel, cookie consent, and conversion events all wired in. You see where customers come from and what they do, from launch.',
  },
];

const NOT_INCLUDED = [
  {
    title: 'A new brand',
    body: 'If you already have a brand, we build around it and that is the base price. Need one created or refreshed? That is the main add-on, designed alongside the site and quoted per project. We will tell you honestly if yours needs it.',
  },
  {
    title: 'A self-edit CMS, by default',
    body: 'Marketing sites we build are looked after by us through the Grow retainer, not edited by you. If self-editing matters, tell us at kickoff and we will scope a CMS into the build.',
  },
  {
    title: 'E-commerce, by default',
    body: 'Online shops are an add-on. They sit on the same platform but include a web dashboard and an iOS app for managing products, stock, and orders. Quoted separately.',
  },
  {
    title: 'New photography',
    body: 'You supply photos or we refer you to a photographer. We direct, crop, and grade what is supplied.',
  },
];

const PROCESS = [
  {
    week: 'Week 1',
    title: 'Kickoff and discovery',
    body: 'A two-hour call to understand the business, the customer, and the brand. If a new brand is in scope, we come back with two or three directions to choose between.',
  },
  {
    week: 'Week 2',
    title: 'Direction and wireframe',
    body: 'The website wireframe lands. If brand is part of the project, the chosen direction is finalised here too: logo, colours, fonts, basic guidelines.',
  },
  {
    week: 'Weeks 3 and 4',
    title: 'Website design and copy',
    body: 'Page by page design, copy written or refined with you, photography slotted in. You review each page as it lands.',
  },
  {
    week: 'Week 5',
    title: 'Build and test',
    body: 'We build the site, set up hosting and email, configure the Google Business profile, and set up email marketing. You test on real devices.',
  },
  {
    week: 'Week 6',
    title: 'Launch and handover',
    body: 'Site goes live. Grow starts on launch day for most clients. A two-hour handover so you know what is where.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Should I do the brand and the website together?',
    a: 'If your brand needs work, yes, and it is what we recommend. Separating them is usually how you end up with a brand that does not fit the site, or a site the brand looks awkward on. Designed together by the same studio, the two look like the same business. If your brand is already in good shape, we just build around it and that is the starting price.',
  },
  {
    q: 'What if I already have a brand?',
    a: 'Perfect, that is the £1,995 starting point. We build the site around your existing brand. If it needs a refresh we will say so honestly, but we never push a new brand on you for the sake of it.',
  },
  {
    q: 'How long does it really take?',
    a: 'As soon as 14 days when your brand is already sorted and the content is ready. Four to six weeks is more typical. The longest part is usually waiting for your copy, photos, or feedback, which is why we share the schedule on day one so you know exactly when we need your time.',
  },
  {
    q: 'Do I have to take Grow after launch?',
    a: 'No. Launch is a complete project and the site is yours. Most clients take Grow because the alternative is finding a new agency every time the site needs anything, but it is your call.',
  },
  {
    q: 'What if I need e-commerce?',
    a: 'E-commerce is an add-on. The site sits on the same platform but includes a dashboard and an iOS app for managing products, stock, and orders. Quoted separately at the start of the project once we know the scope.',
  },
  {
    q: 'Can I get just a website?',
    a: 'Yes, that is the starting point. From £1,995 gets you the website, the copywriting, hosting, and the local SEO and email setup, built around your existing brand. Adding a new brand is the main upgrade, quoted per project. Most businesses find brand and site work better together, which is why we recommend it when the brand needs work.',
  },
  {
    q: 'Do I own everything?',
    a: 'Yes. Everything we make for you transfers on launch: the site, the copy, and the brand if it is part of the project. The site lives on our platform (because hosting is included), but the design files, the assets, and the IP are yours.',
  },
];

function LaunchHero() {
  return (
    <Section tone="bg" spacing="heroTopTight">
      <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
        <div className="md:col-span-6">
          <Reveal>
            <Tag tone="accent">Launch</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h1 mt-6 text-balance">
              A new website, built to bring you customers.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-big mt-8 max-w-xl text-[var(--color-text-mute)]">
              The starting point for most clients. A custom website with the
              copy written, hosting, local SEO, and email marketing all set up
              before you go live. Need a brand too? We design it alongside the
              site so the two fit each other.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex items-baseline gap-4">
              <p
                className="font-medium leading-none tracking-[-0.04em] text-[var(--color-text)]"
                style={{ fontSize: '64px' }}
              >
                From £1,995
              </p>
              <p className="text-body text-[var(--color-text-mute)]">
                One-off project
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-small mt-3 text-[var(--color-text-soft)]">
              Live as soon as 14 days.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/start" variant="primary" size="lg" withArrow>
                Start a project
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary" size="lg">
                Compare with Grow and Manage
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-6">
          <Reveal delay={0.1}>
            <LaunchVisual />
          </Reveal>
          <Reveal delay={0.15}>
            <div className="hidden md:-mt-16 md:block">
              <BethVisual />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function WhatsIncluded() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="mb-12 max-w-3xl">
        <Reveal>
          <Tag>What you get</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">
            Eight things, shipped together.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
            Every Launch project includes the same eight pieces. Concrete and
            predictable, so you know exactly what £1,995 covers before you
            sign anything.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] sm:grid-cols-2">
          {INCLUDED.map((item) => (
            <div
              key={item.title}
              className="flex h-full flex-col bg-[var(--color-bg)] p-8 md:p-10"
            >
              <div className="flex items-start gap-3">
                <Check
                  aria-hidden
                  className="mt-1 h-5 w-5 shrink-0 text-[var(--color-accent)]"
                />
                <h3 className="h5 text-balance">{item.title}</h3>
              </div>
              <p className="text-body mt-4 text-[var(--color-text-mute)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function WhatsNotIncluded() {
  return (
    <Section tone="surface" spacing="xl">
      <div className="mb-12 max-w-3xl">
        <Reveal>
          <Tag>Add-ons</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">
            What is not in the base price.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
            Honest about the add-ons. We scope these into the quote at the
            start so the final invoice never holds a surprise.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="grid gap-6 md:grid-cols-2">
          {NOT_INCLUDED.map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-8 md:p-10"
            >
              <div className="flex items-start gap-3">
                <X
                  aria-hidden
                  className="mt-1 h-5 w-5 shrink-0 text-[var(--color-text-soft)]"
                />
                <h3 className="h5 text-balance">{item.title}</h3>
              </div>
              <p className="text-body mt-4 text-[var(--color-text-mute)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function Process() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="mb-12 max-w-3xl">
        <Reveal>
          <Tag>The 6-week run</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">
            What actually happens, week by week.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <ol className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] md:grid-cols-5">
          {PROCESS.map((step, i) => (
            <li
              key={step.week}
              className="flex h-full flex-col bg-[var(--color-bg)] p-8 md:p-10"
            >
              <p className="label text-[var(--color-text-soft)]">
                Step {i + 1}
              </p>
              <p className="h6 mt-4 text-[var(--color-accent)]">{step.week}</p>
              <h3 className="h5 mt-2 text-balance">{step.title}</h3>
              <p className="text-small mt-4 text-[var(--color-text-mute)]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}

function LaunchFaq() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <Reveal>
            <Tag>Common questions</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h2 mt-6 text-balance">
              The things every Launch client asks first.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-big mt-6 text-[var(--color-text-mute)]">
              Honest answers about scope, ownership, and what happens after
              you sign.
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

export default function LaunchPage() {
  return (
    <>
      <LaunchHero />
      <WhatsIncluded />
      <WhatsNotIncluded />
      <Process />
      <LaunchFaq />
      <CTAStrip />
    </>
  );
}
