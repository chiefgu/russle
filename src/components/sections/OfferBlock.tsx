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
    title: 'Brand + Site, launched together',
    bullets: [
      'Brand identity (logo, palette, type, basic guidelines)',
      'Custom-designed website',
      'Built and shipped on Next.js',
      '4–6 week timeline',
      'Domain + hosting setup',
    ],
    price: 'From £2,500',
    ctaLabel: 'Start a project',
    ctaHref: '/start',
    ctaVariant: 'primary',
    emphasis: true,
  },
  {
    title: 'Ongoing care',
    bullets: [
      'Site updates',
      'Iterations after launch',
      'Hosting + domain handled',
      'Light design tweaks',
    ],
    price: 'On enquiry',
    ctaLabel: 'Get in touch',
    ctaHref: '/contact',
    ctaVariant: 'secondary',
  },
  {
    title: 'À la carte',
    description:
      'Already have a brand? Need just a logo? Need a one-page site? Need copy, photos, social, or ads? Pick the parts you need.',
    bullets: [],
    price: 'On enquiry',
    ctaLabel: 'See options',
    ctaHref: '/services',
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
