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
  title: 'Launch, a new brand and website',
  description:
    'russle Launch is the one-off project that gives an independent business a new brand, a new website, hosting, and the local marketing basics. From £3,995. Live in 4 to 6 weeks.',
  alternates: { canonical: '/launch' },
};

const INCLUDED = [
  {
    title: 'A new brand',
    body: 'A new logo, a colour palette, and the fonts your business uses everywhere. Designed to work on your sign, your social, your menus, and your website at the same time.',
  },
  {
    title: 'A custom-built website',
    body: 'Five to seven pages designed and built from scratch around the new brand. Custom code, no template, hosted on our own platform.',
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
    title: 'A self-edit CMS, by default',
    body: 'Marketing sites we build are looked after by us through the Grow retainer, not edited by you. If self-editing matters, tell us at kickoff and we will scope a CMS into the build.',
  },
  {
    title: 'E-commerce, by default',
    body: 'Online shops are an add-on. They sit on the same platform but include a web dashboard and an iOS app for managing products, stock, and orders. Quoted separately.',
  },
  {
    title: 'Original written content',
    body: 'We work with the words you supply or refer you to a copywriter we trust. We can scope a content phase into the project if you want it done in-house.',
  },
  {
    title: 'New photography',
    body: 'You supply photos or we refer you to a photographer. We direct, crop, and grade what is supplied.',
  },
];

const PROCESS = [
  {
    week: 'Week 1',
    title: 'Kickoff and brand exploration',
    body: 'A two-hour call to understand the business and the customer. We come back with two or three brand directions for you to choose between.',
  },
  {
    week: 'Week 2',
    title: 'Brand identity locked',
    body: 'The chosen direction is finalised. Logo, colours, fonts, basic guidelines. The website wireframe lands at the same time.',
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
    q: 'Why is the brand and the website one project, not two?',
    a: 'Because separating them is usually how you end up with a brand that does not fit the site, or a site the brand looks awkward on. Designed and built together by the same studio, the two actually look like the same business. Almost every Launch client comes to us after a project where they were separated and they had to fix it later.',
  },
  {
    q: 'What if I already have a brand?',
    a: 'Tell us at the call. If the brand is in good shape and you want the website built around it, the project gets cheaper and faster. If it needs a refresh, we will say so honestly. We do not push a new brand on you for the sake of it.',
  },
  {
    q: 'How long does it really take?',
    a: 'Four to six weeks from kickoff to live for most projects. The longest part is usually waiting for your copy, photos, or feedback, which is why we share the schedule on day one so you know exactly when we need your time.',
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
    a: 'Yes, if the brand is in good shape. Get in touch and we will scope a website-only project. Most businesses find the brand and the site work better designed together, which is why we recommend the full Launch.',
  },
  {
    q: 'Do I own the site and the brand?',
    a: 'Yes. Both transfer to you on launch. The site lives on our platform (because hosting is included), but the design files, the brand assets, and the IP are yours.',
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
              A new brand and a new website, built together.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-big mt-8 max-w-xl text-[var(--color-text-mute)]">
              The starting point for most clients. The brand and the website
              are designed and shipped as one project so they actually fit
              each other. Hosting, local SEO, and email marketing are set up
              before you go live.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex items-baseline gap-4">
              <p
                className="font-medium leading-none tracking-[-0.04em] text-[var(--color-text)]"
                style={{ fontSize: '64px' }}
              >
                From £3,995
              </p>
              <p className="text-body text-[var(--color-text-mute)]">
                One-off project
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-small mt-3 text-[var(--color-text-soft)]">
              Live in 4 to 6 weeks.
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
            Every Launch project includes the same six pieces. Concrete and
            predictable, so you know exactly what £3,995 covers before you
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
