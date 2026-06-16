import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { TrackedButtonLink } from '@/components/ui/TrackedButtonLink';
import { Card } from '@/components/ui/Card';
import { FAQ } from '@/components/ui/FAQ';
import { CaseStudyGrid } from '@/components/sections/CaseStudyGrid';
import { getAllWork } from '@/lib/mdx';

const TIERS = [
  {
    name: 'Launch',
    price: 'From £1,995',
    timeline: 'One-off, as soon as 14 days',
    blurb:
      'A new brand and a new website, built together. The local SEO and email systems are set up before launch. Designed and built by us, end to end.',
    included: [
      'A new logo, colours, and fonts',
      'A website built from scratch (5 to 7 pages)',
      'Hosting on our platform, first year included',
      'Google Maps and search setup',
      'Email marketing ready to go',
    ],
  },
  {
    name: 'Grow',
    price: 'From £299/mo',
    timeline: 'No long-term contract',
    blurb:
      'Monthly arrangement after launch. We run the hosting, the small updates, the Google Business profile, and the local SEO. The studio keeps the brand and the site doing their job.',
    included: [
      'Hosting on our platform',
      'Up to 2 hrs/mo of small updates',
      'Google Business Profile run for them',
      'Local SEO maintenance and reporting',
      'Monthly performance email + 30-min check-in',
    ],
  },
  {
    name: 'Manage',
    price: 'Talk to us',
    timeline: 'Custom retainer',
    blurb:
      'Everything in Grow plus original content writing, ongoing campaigns, and monthly strategy. For clients who want a team running the marketing alongside the build.',
    included: [
      'Everything in Grow',
      'Original content writing for the site',
      'Ongoing campaigns, organic and paid',
      'Monthly strategy session',
      'Quarterly review and planning',
    ],
  },
];

const PARTNER_FAQ = [
  {
    q: 'What kind of client should I send?',
    a: 'Businesses whose brand or website is holding them back. Most of our work spans hospitality, retail, beauty, fitness, and professional services, but we are not pinned to a sector. If your client takes their brand seriously and would value a brand and a site that look like the same business, send them.',
  },
  {
    q: 'Do you pay a referral fee?',
    a: 'No, and we are very direct about why. Pure reciprocity works better than fees at this scale. We refer your clients back to you when they need photography, copy, interiors, or accounting. Cash referrals get tracked, sour quickly, and replace a real working relationship with an invoice trail. We would rather have the relationship.',
  },
  {
    q: 'How quickly do you reply?',
    a: 'Inside 24 hours, every time. The follow-up call is usually inside the first week. If we are at capacity we say so on the first call, not the third, and we will point you to someone else.',
  },
  {
    q: 'What happens if it is not a fit?',
    a: 'We say so and explain why, then introduce your client to a studio better suited to them. The referral goes back to you with our notes so nothing is wasted.',
  },
  {
    q: 'Can I see how a project actually runs?',
    a: 'Yes. Drop us a line and we will walk you through a recent project end to end, from kickoff to launch to the first three months of Grow. Easier on a coffee than over email.',
  },
];

const HOW_IT_WORKS = [
  {
    n: '1',
    title: 'You spot the need.',
    body: 'A client of yours mentions they need a new brand, a new site, or help getting found locally. You forward this page or send a quick intro to hello@russle.co.uk.',
  },
  {
    n: '2',
    title: 'We take it from there.',
    body: 'We reply to your client inside 24 hours, run a free 30-minute call, and share a fixed-price proposal. No pressure, no chase.',
  },
  {
    n: '3',
    title: 'We send work back the same way.',
    body: 'When our clients need photography, copy, interiors, or accounting, we introduce them to you first. Pure reciprocity, no fees in either direction.',
  },
];

export function PartnersOnePager() {
  const featured = getAllWork().slice(0, 3);

  return (
    <>
      <Section tone="bg" spacing="heroTop" container="narrow">
        <Tag>For partners</Tag>
        <h1 className="h1 mt-6 text-balance">
          A team you can refer with confidence.
        </h1>
        <p className="text-big mt-8 max-w-2xl text-[var(--color-text-mute)]">
          russle is a brand &amp; growth agency. We design brands, build
          websites, host them, and run the marketing and AI that bring
          customers back.
        </p>
        <p className="text-body mt-6 max-w-2xl text-[var(--color-text-mute)]">
          This page is the short version of the studio for photographers,
          copywriters, interior designers, accountants, and other partners
          serving the same buyer. Forward it whenever a client of yours needs
          brand or website work.
        </p>
      </Section>

      {featured.length > 0 && (
        <CaseStudyGrid items={featured} variant="index" showHeader={false} />
      )}

      <Section tone="bg" spacing="l" container="main">
        <h2 className="h2">Three tiers.</h2>
        <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
          Most partner-referred clients land on Launch. After launch they move
          onto Grow, which is where the recurring revenue lives for the
          studio.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <Card key={tier.name}>
              <p className="label text-[var(--color-text-soft)]">{tier.timeline}</p>
              <h3 className="h3 mt-3">{tier.name}</h3>
              <p className="h6 mt-2 text-[var(--color-accent)]">{tier.price}</p>
              <p className="text-body mt-6 text-[var(--color-text-mute)]">
                {tier.blurb}
              </p>
              <ul className="mt-6 flex flex-col gap-2">
                {tier.included.map((item) => (
                  <li
                    key={item}
                    className="text-small relative pl-5 text-[var(--color-text-mute)]"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-[var(--color-accent)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="bg" spacing="l" container="narrow">
        <h2 className="h2">How the partnership works.</h2>
        <ol className="mt-10 flex flex-col gap-6">
          {HOW_IT_WORKS.map((step) => (
            <li key={step.n} className="flex gap-6">
              <span className="h4 text-[var(--color-accent)]">{step.n}.</span>
              <div>
                <p className="h6">{step.title}</p>
                <p className="text-body mt-2 text-[var(--color-text-mute)]">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface" spacing="xl" container="narrow">
        <Tag>Common questions</Tag>
        <h2 className="h2 mt-6 text-balance">
          What partners usually want to know first.
        </h2>
        <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
          Honest answers up front so you know what you are sending your client
          into.
        </p>
        <div className="mt-12">
          <FAQ items={PARTNER_FAQ} />
        </div>
      </Section>

      <Section tone="bg" spacing="l" container="narrow">
        <h2 className="h2">Send a client our way.</h2>
        <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
          Forward this page, or send a quick intro to hello@russle.co.uk. We
          come back to your client inside 24 hours.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <TrackedButtonLink
            href="/start"
            variant="primary"
            size="lg"
            withArrow
            eventName="select_content"
            eventParams={{
              content_type: 'cta_start_project',
              content_id: 'partner_one_pager',
            }}
          >
            Start a project
          </TrackedButtonLink>
          <TrackedButtonLink
            href="mailto:hello@russle.co.uk"
            variant="secondary"
            size="lg"
            eventName="select_content"
            eventParams={{
              content_type: 'cta_email_studio',
              content_id: 'partner_one_pager',
            }}
          >
            Email the studio
          </TrackedButtonLink>
        </div>
      </Section>
    </>
  );
}
