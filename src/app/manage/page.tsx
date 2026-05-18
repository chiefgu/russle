import type { Metadata } from 'next';
import { Check } from 'lucide-react';

import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { FAQ } from '@/components/ui/FAQ';
import { Reveal } from '@/components/animations/Reveal';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { ManageVisual } from '@/components/sections/ManageVisual';

export const metadata: Metadata = {
  title: 'Manage, the full marketing retainer',
  description:
    'russle Manage is the full retainer: everything in Grow plus original content, ongoing campaigns, and monthly strategy. For businesses who want a small team running the marketing.',
  alternates: { canonical: '/manage' },
};

const INCLUDED = [
  {
    title: 'Everything in Grow',
    body: 'Hosting, monthly site updates, Google Business management, local SEO maintenance, email system, performance monitoring, monthly report, monthly check-in. The full technical and platform side already covered.',
  },
  {
    title: 'Original content written for the site',
    body: 'Case studies, blog posts, guides, and the supporting copy that keeps the site current. Written in your brand voice by us, planned around what your customers actually search for.',
  },
  {
    title: 'Ongoing campaigns, organic and paid',
    body: 'Quarterly campaigns run end to end. Strategy, creative, copy, landing pages, and the paid spend management on top. We work to the channels that suit the business, not a template.',
  },
  {
    title: 'Monthly strategy session',
    body: 'An hour each month with the studio working on the business with you. What is working, what is not, what to do next, where the budget should go. Less of a check-in, more of a planning meeting.',
  },
  {
    title: 'Quarterly review and planning',
    body: 'Every three months we sit down to look at the bigger picture. What the data is telling us, where the brand is going, what to invest in next quarter. The plan lands as a written document.',
  },
  {
    title: 'A studio acting as your marketing function',
    body: 'For businesses who want a small team running this work alongside the rest of the business, not a series of one-off projects or a freelancer chain. The retainer is structured around what you actually need.',
  },
];

const WHO_ITS_FOR = [
  {
    title: 'You have a brand and a site already',
    body: 'Manage is not a starting point. It is the next level up from Grow, usually a year or two after launch when the business is bigger and the marketing needs more horsepower.',
  },
  {
    title: 'You are not going to hire in-house yet',
    body: 'You need the work done but you do not have the volume or the budget for a full-time marketing hire. A retainer with a studio is the cheaper, more flexible answer.',
  },
  {
    title: 'You want one team, not five vendors',
    body: 'No separate copywriter, photographer, paid agency, SEO consultant, and developer to manage. One retainer, one bill, one point of contact.',
  },
  {
    title: 'You want it run, not learned',
    body: 'You would rather pay for the marketing to happen than learn to do it yourself. The hours you would have spent fighting WordPress are better spent on the business.',
  },
];

const PRICING_FACTORS = [
  'How many original pieces of content you need each month',
  'Whether paid advertising is part of the retainer or not',
  'How many channels we are actively running (organic, paid, email, social)',
  'Whether the work needs a content brief from scratch or can run from your existing one',
  'How frequently you want the strategy session and the review',
];

const FAQ_ITEMS = [
  {
    q: 'Why is Manage bespoke and not a fixed price?',
    a: 'Because every Manage relationship is different and a fixed price would either undercharge half our clients or scare off the other half. The retainer is built around what your business actually needs: how many channels we are running, how much content, whether paid advertising is in scope. We quote once we know the shape of the work.',
  },
  {
    q: 'Roughly what does Manage cost?',
    a: 'Most Manage retainers settle between £1,500 and £4,000 a month, depending on volume and channels. The retainer scales with the business. We are happy to share a real range once we have had a 30-minute call to understand what you are running.',
  },
  {
    q: 'Do I need Grow first, or can I start with Manage?',
    a: 'Grow first is the normal path. Manage assumes the brand, the site, and the platform are already in place and humming. If you are starting from scratch, you would do Launch, then Grow, then move onto Manage when the business gets to the point where the marketing needs more horsepower.',
  },
  {
    q: 'How long is the commitment?',
    a: 'Three months minimum so we have time to make the work pay back, then rolling with 60 days notice on either side. Long enough to do real work, short enough that you are never trapped in a contract that is no longer serving you.',
  },
  {
    q: 'Will you work with my existing agencies or freelancers?',
    a: 'Yes, if it makes sense. Some businesses already have a copywriter or a photographer they love and want to keep using. We slot into that and own the bits they do not. The retainer scope reflects what you need from us, not what we want to sell.',
  },
  {
    q: 'Do you do paid ads inside Manage?',
    a: 'Yes. Paid lives inside Manage rather than as a standalone service because it works best when it sits alongside the organic content, the local SEO, and the email work. Running paid in isolation usually means burning budget on traffic the rest of the funnel cannot convert.',
  },
  {
    q: 'How is Manage different from a marketing agency?',
    a: 'We built the brand and the site, we host the platform, and we know the business from the ground up. A marketing agency picking up the work mid-flight has to learn all of that, and the handover never really finishes. Manage is the same studio doing the next level of work.',
  },
];

function ManageHero() {
  return (
    <Section tone="bg" spacing="heroTopTight">
      <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
        <div className="md:col-span-6">
          <Reveal>
            <Tag tone="accent">Manage</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h1 mt-6 text-balance">
              A small team running the marketing alongside you.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-big mt-8 max-w-xl text-[var(--color-text-mute)]">
              Manage is the full retainer. Everything in Grow plus original
              content, ongoing campaigns, and a monthly strategy session. For
              businesses who want a studio acting as their marketing function,
              not a series of one-off projects.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex items-baseline gap-4">
              <p
                className="font-medium leading-none tracking-[-0.04em] text-[var(--color-text)]"
                style={{ fontSize: '64px' }}
              >
                Talk to us
              </p>
              <p className="text-body text-[var(--color-text-mute)]">
                Custom retainer
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-small mt-3 text-[var(--color-text-soft)]">
              3-month minimum, then rolling with 60 days notice.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="primary" size="lg" withArrow>
                Get in touch
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary" size="lg">
                Compare with Launch and Grow
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-6">
          <Reveal delay={0.1}>
            <ManageVisual />
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
            Everything in Grow, plus the work that needs constant attention.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
            Manage is the level above Grow. The technical and platform side is
            already covered. The new layer is the creative and strategic work
            that scales the business beyond the launch.
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

function WhoItsFor() {
  return (
    <Section tone="surface" spacing="xl">
      <div className="mb-12 max-w-3xl">
        <Reveal>
          <Tag>Who Manage is for</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">
            Not everyone needs this. Most clients sit on Grow.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
            Manage is the right shape if the business is past the early stage
            and the marketing needs more horsepower. If you are not sure, ask
            on the call and we will tell you honestly.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="grid gap-6 md:grid-cols-2">
          {WHO_ITS_FOR.map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-8 md:p-10"
            >
              <h3 className="h5 text-balance">{item.title}</h3>
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

function PricingShape() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <Reveal>
            <Tag>How pricing works</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h2 mt-6 text-balance">
              Bespoke, but not opaque.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-big mt-6 text-[var(--color-text-mute)]">
              We quote Manage based on the shape of the work, not a fixed
              ladder. Most retainers settle between £1,500 and £4,000 a month.
              We share a real range on the first call.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <div className="rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-8 md:p-10">
              <p className="label text-[var(--color-text-soft)]">
                What affects the price
              </p>
              <ul className="mt-6 flex flex-col gap-4 text-body text-[var(--color-text)]">
                {PRICING_FACTORS.map((factor) => (
                  <li key={factor} className="flex items-start gap-3">
                    <Check
                      aria-hidden
                      className="mt-1 h-5 w-5 shrink-0 text-[var(--color-accent)]"
                    />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function ManageFaq() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <Reveal>
            <Tag>Common questions</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h2 mt-6 text-balance">
              What businesses ask before signing on Manage.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-big mt-6 text-[var(--color-text-mute)]">
              Honest answers about price, commitment, and how Manage fits
              alongside what you have already.
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

export default function ManagePage() {
  return (
    <>
      <ManageHero />
      <WhatsIncluded />
      <WhoItsFor />
      <PricingShape />
      <ManageFaq />
      <CTAStrip />
    </>
  );
}
