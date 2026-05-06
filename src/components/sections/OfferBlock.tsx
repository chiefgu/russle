import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';

type OfferCard = {
  title: string;
  description?: string;
  bullets: string[];
  price: string;
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: 'primary' | 'secondary';
  emphasis?: boolean;
};

const CARDS: OfferCard[] = [
  {
    title: 'Launch',
    description: 'Brand identity and a custom-designed website, built and shipped together.',
    bullets: [
      'Brand identity (logo, colours, fonts, basic guidelines)',
      'Custom-designed website',
      'Real, custom-built code (no template, yours to own)',
      '4–6 week timeline',
      'Domain and hosting setup',
    ],
    price: 'From £2,500',
    ctaLabel: 'Start a project',
    ctaHref: '/start',
    ctaVariant: 'primary',
    emphasis: true,
  },
  {
    title: 'Grow',
    description: 'Once you are launched, the marketing that turns the website into a working sales channel.',
    bullets: [
      'Site updates and design tweaks',
      'Search visibility (showing up on Google when people look for what you do)',
      'Email marketing (welcome flows, customer follow-ups, promotions)',
      'Local search (Google Business Profile, listings, reviews)',
      'Hosting and domain handled',
      'Monthly reporting in plain English',
    ],
    price: 'On enquiry',
    ctaLabel: 'See more',
    ctaHref: '/services',
    ctaVariant: 'secondary',
  },
  {
    title: 'Manage',
    description: 'Everything in Grow, plus the work that needs ongoing attention.',
    bullets: [
      'Content (writing, photography direction, social posts)',
      'Ongoing campaign work',
      'Monthly strategy calls',
      'Quarterly review and planning',
    ],
    price: 'On enquiry',
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
          <Tag>What you can book</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">
            Three ways to work together.
          </h2>
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

              {card.description && (
                <p className="text-body mt-4 text-[var(--color-text-mute)]">
                  {card.description}
                </p>
              )}

              {card.bullets.length > 0 && (
                <ul className="mt-6 space-y-3 text-body text-[var(--color-text-mute)]">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-text-mute)]"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto pt-8">
                <p
                  className={`text-big ${
                    card.emphasis
                      ? 'text-[var(--color-text)]'
                      : 'text-[var(--color-text-mute)]'
                  }`}
                >
                  {card.price}
                </p>
                <div className="mt-6">
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
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
