import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { TrackedButtonLink } from '@/components/ui/TrackedButtonLink';
import { Card } from '@/components/ui/Card';
import { CaseStudyGrid } from '@/components/sections/CaseStudyGrid';
import { getAllWork } from '@/lib/mdx';

const TIERS = [
  {
    name: 'Launch',
    price: 'From £2,500',
    timeline: '4 to 6 weeks',
    blurb:
      'A new brand identity and a website built around it. Local SEO and email systems wired in from day one. Designed and built by us, end to end.',
    included: [
      'Brand identity (logo, palette, type, toolkit)',
      'Website design and development (5 to 8 pages)',
      'Local SEO setup (Google Business Profile, locality pages, schema)',
      'Email marketing setup (Resend or equivalent)',
      'Photography direction and asset prep',
    ],
  },
  {
    name: 'Grow',
    price: 'On enquiry',
    timeline: 'Monthly retainer',
    blurb:
      'Ongoing brand and website care, plus the SEO, email, and local marketing that compounds over time. For businesses that have a brand and want it to keep working.',
    included: [
      'Site updates and small builds',
      'Ongoing local SEO and content',
      'Email marketing campaigns',
      'Google Business and directory management',
      'Monthly performance review',
    ],
  },
  {
    name: 'Manage',
    price: 'On enquiry',
    timeline: 'Monthly retainer',
    blurb:
      'Everything in Grow plus original content, ongoing creative campaigns, and monthly strategy. For businesses that want a studio acting as their full marketing function.',
    included: [
      'Everything in Grow',
      'Content production (copy, photography, social)',
      'Ongoing creative campaigns',
      'Monthly strategy session',
    ],
  },
];

export function PartnersOnePager() {
  const featured = getAllWork().slice(0, 3);

  return (
    <>
      <Section tone="bg" spacing="heroTop" container="narrow">
        <Tag>For partners</Tag>
        <h1 className="h1 mt-6 text-balance">
          A studio you can refer with confidence.
        </h1>
        <p className="text-big mt-8 max-w-2xl text-[var(--color-text-mute)]">
          russle is a brand-led growth studio in Alderley Edge. We design brands and
          websites for independent businesses across Cheshire and South Manchester,
          then run the SEO, email, and local systems that grow them.
        </p>
        <p className="text-body mt-6 max-w-2xl text-[var(--color-text-mute)]">
          This page is the short version of the studio for photographers, copywriters,
          interior designers, accountants, and other partners serving the same buyer.
          Forward it whenever a client of yours needs brand or website work.
        </p>
      </Section>

      {featured.length > 0 && (
        <CaseStudyGrid items={featured} variant="index" showHeader={false} />
      )}

      <Section tone="bg" spacing="l" container="main">
        <h2 className="h2">Three tiers.</h2>
        <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
          Most partner-referred clients land on Launch. Some upgrade to Grow or Manage
          once the brand and site are live.
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
          <li className="flex gap-6">
            <span className="h4 text-[var(--color-accent)]">1.</span>
            <div>
              <p className="h6">You spot the need.</p>
              <p className="text-body mt-2 text-[var(--color-text-mute)]">
                A client of yours mentions they need a new brand, a new site, or
                local marketing help. You forward this page or send a quick intro to
                hello@russle.co.uk.
              </p>
            </div>
          </li>
          <li className="flex gap-6">
            <span className="h4 text-[var(--color-accent)]">2.</span>
            <div>
              <p className="h6">We take it from there.</p>
              <p className="text-body mt-2 text-[var(--color-text-mute)]">
                We reply to your client within 24 hours, run a free 30-minute call,
                and share a fixed-price proposal. No pressure, no chase.
              </p>
            </div>
          </li>
          <li className="flex gap-6">
            <span className="h4 text-[var(--color-accent)]">3.</span>
            <div>
              <p className="h6">We send work back the same way.</p>
              <p className="text-body mt-2 text-[var(--color-text-mute)]">
                When our clients need photography, copy, interiors, or accounting,
                we introduce them to you first. Pure reciprocity.
              </p>
            </div>
          </li>
        </ol>
      </Section>

      <Section tone="bg" spacing="l" container="narrow">
        <h2 className="h2">Send a client our way.</h2>
        <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
          Forward this page, or send a quick intro to hello@russle.co.uk. We come
          back to your client inside 24 hours.
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
