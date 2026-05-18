import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';

type OfferCard = {
  title: string;
  pitch: string;
  price: string;
  priceNote: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: 'primary' | 'secondary';
  emphasis?: boolean;
};

const CARDS: OfferCard[] = [
  {
    title: 'Launch',
    pitch: 'A new brand and a new website, built and shipped together.',
    price: 'From £3,995',
    priceNote: 'One-off',
    bullets: [
      'A new logo, colours, and fonts',
      'A website built around the brand',
      'Hosting on our platform, first year included',
      'Set up on Google Maps and Google search',
      'Email marketing ready to go',
      'Live in 4 to 6 weeks',
    ],
    ctaLabel: 'Start a project',
    ctaHref: '/start',
    ctaVariant: 'primary',
    emphasis: true,
  },
  {
    title: 'Grow',
    pitch: 'We run the technical side so the brand and the site keep working for you.',
    price: 'From £299/mo',
    priceNote: 'No long-term contract',
    bullets: [
      'Hosting and small updates each month',
      'Your Google Business Profile run for you',
      'Local search kept healthy',
      'Email system maintained',
      'Monthly performance email',
      '30-minute monthly check-in',
    ],
    ctaLabel: 'How Grow works',
    ctaHref: '/grow',
    ctaVariant: 'secondary',
  },
  {
    title: 'Manage',
    pitch: 'Everything in Grow, plus a small team running the marketing.',
    price: 'Talk to us',
    priceNote: 'Custom retainer',
    bullets: [
      'Everything in Grow',
      'Writing for your site (case studies, guides)',
      'Ongoing campaigns, organic and paid',
      'Monthly strategy session',
      'Quarterly review and planning',
    ],
    ctaLabel: 'Get in touch',
    ctaHref: '/contact',
    ctaVariant: 'secondary',
  },
];

export function OfferBlock() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="mb-12 max-w-3xl">
        <Reveal>
          <Tag>How to work with us</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">Pick the level that fits.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
            Most clients start with Launch, then move onto Grow once the brand and
            site are live. Manage is for businesses who want us running the
            marketing as well.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.05}>
            <div
              className={`flex h-full flex-col rounded-[var(--radius-l)] border p-8 md:p-10 ${
                card.emphasis
                  ? 'border-[var(--color-text)] bg-[var(--color-surface)]'
                  : 'border-[var(--color-line)] bg-[var(--color-bg)]'
              }`}
            >
              <h3 className="h3 text-balance">{card.title}</h3>
              <p className="text-body mt-4 text-[var(--color-text-mute)]">
                {card.pitch}
              </p>

              <div className="mt-6 border-t border-[var(--color-line)] pt-6">
                <p
                  className={`h4 ${
                    card.emphasis
                      ? 'text-[var(--color-text)]'
                      : 'text-[var(--color-text)]'
                  }`}
                >
                  {card.price}
                </p>
                <p className="label mt-2 text-[var(--color-text-soft)]">
                  {card.priceNote}
                </p>
              </div>

              <ul className="mt-6 flex flex-col gap-3 text-body text-[var(--color-text-mute)]">
                {card.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <ButtonLink
                  href={card.ctaHref}
                  variant={card.ctaVariant}
                  size="md"
                  withArrow={card.ctaVariant === 'primary'}
                >
                  {card.ctaLabel}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <ButtonLink href="/services" variant="ghost" size="md" withArrow>
          See a full comparison
        </ButtonLink>
      </div>
    </Section>
  );
}
