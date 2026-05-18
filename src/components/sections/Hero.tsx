import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';

const DOT_PATTERN = 'radial-gradient(circle, rgba(26,20,16,0.28) 1.2px, transparent 1.8px)';
const DOT_MASK = 'radial-gradient(ellipse at center, transparent 0%, transparent 35%, black 95%)';

const PRICE_CARDS = [
  {
    label: 'New brand + website',
    price: 'From £3,995',
    detail: 'Logo, colours, fonts, and a new site. Live in 4 to 6 weeks.',
  },
  {
    label: 'Ongoing care',
    price: 'From £299/mo',
    detail: 'Hosting, updates, Google Maps, and email. No long-term contract.',
  },
  {
    label: 'Full marketing',
    price: 'Talk to us',
    detail: 'Brand and site plus ongoing campaigns and content.',
  },
];

export function Hero() {
  return (
    <Section
      tone="bg"
      spacing="heroTopTight"
      container="main"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: DOT_PATTERN,
          backgroundSize: '24px 24px',
          maskImage: DOT_MASK,
          WebkitMaskImage: DOT_MASK,
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <Reveal>
          <Tag tone="accent">Alderley Edge studio</Tag>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="h1 mt-6 text-balance text-[var(--color-text)]">
            A new brand and website. Then the marketing that brings you customers.
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-big mt-8 max-w-2xl text-[var(--color-text-mute)]">
            One studio for independent businesses across Cheshire and South Manchester. We design the brand, build the website, host it for you, and run the local SEO and email that bring customers back.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {PRICE_CARDS.map((card) => (
              <div
                key={card.label}
                className="border-l-2 border-[var(--color-accent)] pl-5"
              >
                <p className="label text-[var(--color-text-soft)]">{card.label}</p>
                <p className="h3 mt-2 text-[var(--color-text)]">{card.price}</p>
                <p className="text-small mt-3 text-[var(--color-text-mute)]">
                  {card.detail}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/start" variant="primary" size="lg" withArrow>
              Start a project
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary" size="lg">
              See the work
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
