import type { Metadata } from 'next';
import { Check, X } from 'lucide-react';

import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { FAQ } from '@/components/ui/FAQ';
import { Reveal } from '@/components/animations/Reveal';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { GrowFlow } from '@/components/sections/GrowFlow';

export const metadata: Metadata = {
  title: 'Grow, the monthly arrangement',
  description:
    'russle Grow is the monthly arrangement after launch. Hosting, small updates, Google Business Profile, local SEO, and email all looked after. From £299 a month, no long-term contract.',
  alternates: { canonical: '/grow' },
};

const INCLUDED = [
  {
    title: 'Hosting on our platform',
    body: 'Your site lives on the russle platform. No separate Vercel or WordPress host, no surprise bill. Hosting is included in the monthly fee.',
  },
  {
    title: 'Small updates each month',
    body: 'Up to 2 hours of design or development work a month. New offer on the homepage, a swap of opening hours, a Christmas banner, a fresh photo set. Bigger work gets quoted.',
  },
  {
    title: 'Google Business Profile, run for you',
    body: 'We post weekly from photos and updates you share, answer reviews, keep the listing accurate, and watch the search performance month to month.',
  },
  {
    title: 'Local SEO kept healthy',
    body: 'Rankings tracked, schema fixed when Google changes the rules, locality pages refreshed every quarter, listings across the directories that actually matter.',
  },
  {
    title: 'AI search optimisation (GEO) maintained',
    body: 'Keeping you visible in ChatGPT, Perplexity, and Google AI Overviews. Structured content tuned for AI citation, llms.txt kept current, brand entity signals reinforced.',
  },
  {
    title: 'Email system maintained',
    body: 'Welcome flow, newsletter templates, list health, deliverability. The plumbing that keeps your past customers reachable, kept in working order.',
  },
  {
    title: 'Performance and uptime monitoring',
    body: 'We watch site speed, uptime, broken links, and Core Web Vitals. You hear from us before customers do.',
  },
  {
    title: 'Monthly performance email',
    body: 'A plain-English summary of the month: traffic, enquiries, what moved, what we worked on, what is next. No 40-page PDF, just the numbers that matter.',
  },
  {
    title: '30-minute monthly check-in',
    body: 'A call or coffee to talk about what is happening in the business, what is coming up, and how the site needs to keep up.',
  },
];

const NOT_INCLUDED = [
  {
    title: 'Original content writing',
    body: 'Blog posts, case studies, social captions, ad copy. We will refer you to a copywriter we trust, or move you onto Manage where content production is included.',
  },
  {
    title: 'Photography or video',
    body: 'You supply the assets, we use them. For new shoots we refer to a photographer.',
  },
  {
    title: 'Paid advertising management',
    body: 'Google Ads, Meta Ads, LinkedIn campaigns. Only lives inside Manage where ads sit alongside ongoing content and strategy.',
  },
  {
    title: 'Big builds or major redesigns',
    body: 'A new section, a new template, a custom integration. We scope and quote these as separate small projects on top of the monthly.',
  },
];

const RHYTHM = [
  {
    when: 'Each week',
    what: 'GBP post published, monitoring checked, anything urgent handled.',
  },
  {
    when: 'Each month',
    what: 'Performance email sent, 30-min check-in, small updates batched and shipped.',
  },
  {
    when: 'Each quarter',
    what: 'Locality pages refreshed, SEO audit, plan for the next 90 days.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'When does Grow start?',
    a: 'The day your Launch goes live. Most clients move straight onto Grow on launch day because that is when the marketing actually starts. If you want to wait, that is fine, we just hand it over and you can come back when you want it run for you.',
  },
  {
    q: 'Can I cancel?',
    a: 'Yes. There is no long-term contract. Either side can give 30 days notice, in writing. The site is yours, the brand assets are yours, the data is yours.',
  },
  {
    q: 'Why is hosting included?',
    a: 'Because the studio that built the site is the studio running it. We do not want you on a hosting plan we cannot see, with a support team that does not know your project. Including hosting in Grow means one bill, one studio, one phone number when something needs fixing.',
  },
  {
    q: 'Why does it start at £299 a month?',
    a: 'That is the floor we can deliver the work properly at, including the platform, the local SEO maintenance, the GBP management, and a real monthly check-in. Most retainers settle higher than the floor once we know what your business actually needs.',
  },
  {
    q: 'What if I want more than 2 hours of updates one month?',
    a: 'Tell us. Bigger pieces of work get scoped and quoted as separate projects on top of the monthly. We do not run a hidden hourly meter; you always know what something costs before we start.',
  },
  {
    q: 'Can I do this myself?',
    a: 'Some of it, yes. The Google Business Profile is yours and you can post to it. The site, less so. Our sites are designed to be looked after by us, not edited by you. That is what Grow is for, and it is why we keep the price low. If self-editing matters, tell us at the start of Launch and we will scope a CMS into the build.',
  },
  {
    q: 'Do I have to take Grow?',
    a: 'No. Launch ships as a complete one-off project. Grow is the recommended next step, not a requirement. Most clients take it because the alternative is finding a new agency every time something needs doing.',
  },
];

function GrowHero() {
  return (
    <Section tone="bg" spacing="heroTopTight">
      <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
        <div className="md:col-span-6">
          <Reveal>
            <Tag tone="accent">Grow</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h1 mt-6 text-balance">
              The monthly arrangement that runs after launch.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-big mt-8 max-w-xl text-[var(--color-text-mute)]">
              Once the brand and the site are live, Grow is the small monthly
              fee that keeps both doing their job. Hosting, updates, Google
              Business, local search, and email, all looked after by the studio
              that built it.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex items-baseline gap-4">
              <p
                className="font-medium leading-none tracking-[-0.04em] text-[var(--color-text)]"
                style={{ fontSize: '64px' }}
              >
                From £299
              </p>
              <p className="text-body text-[var(--color-text-mute)]">
                per month
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-small mt-3 text-[var(--color-text-soft)]">
              No long-term contract, 30 days notice.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/start" variant="primary" size="lg" withArrow>
                Start a project
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary" size="lg">
                Compare with Launch and Manage
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-6">
          <Reveal delay={0.1}>
            <GrowFlow />
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
          <h2 className="h2 mt-6 text-balance">Eight things, every month.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
            The full list of what is in Grow. Concrete and predictable, the
            same every month so you always know what you are paying for.
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
          <Tag>What is not in Grow</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">
            Honest about what we do not do at this tier.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
            Grow is the technical and platform side. The creative content work
            lives in Manage or in a partner referral. Setting expectations now
            avoids the awkward conversation later.
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

function MonthlyRhythm() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="mb-12 max-w-3xl">
        <Reveal>
          <Tag>How it runs</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">
            The rhythm of a Grow month.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] md:grid-cols-3">
          {RHYTHM.map((step, i) => (
            <div
              key={step.when}
              className="flex h-full flex-col bg-[var(--color-bg)] p-8 md:p-10"
            >
              <p className="label text-[var(--color-text-soft)]">
                0{i + 1}
              </p>
              <h3 className="h3 mt-4 text-[var(--color-accent)]">{step.when}</h3>
              <p className="text-body mt-6 text-[var(--color-text-mute)]">
                {step.what}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function GrowFaq() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <Reveal>
            <Tag>Common questions</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h2 mt-6 text-balance">
              Everything we get asked about Grow.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-big mt-6 text-[var(--color-text-mute)]">
              No surprises, no buried clauses. If your question is not here,
              send it through and we will answer.
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

export default function GrowPage() {
  return (
    <>
      <GrowHero />
      <WhatsIncluded />
      <WhatsNotIncluded />
      <MonthlyRhythm />
      <GrowFaq />
      <CTAStrip />
    </>
  );
}
