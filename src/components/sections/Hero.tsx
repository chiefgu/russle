import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';

const PRICE_CARDS = [
  {
    label: 'Launch',
    price: 'From £1,995',
    detail: 'A new brand, a new website, hosting, and the marketing basics. Live as soon as 14 days.',
    href: '/launch',
  },
  {
    label: 'Grow',
    price: 'From £299/mo',
    detail: 'Hosting, updates, Google Maps, and email kept running. No long-term contract.',
    href: '/grow',
  },
  {
    label: 'Manage',
    price: 'Talk to us',
    detail: 'A small team running the marketing alongside the build. Custom retainer.',
    href: '/manage',
  },
];

export function Hero() {
  return (
    <Section
      tone="bg"
      spacing="heroTopTight"
      container="main"
      className="flex min-h-screen flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <h1 className="h1 text-balance text-[var(--color-text)]">
            A new brand and website. Then the marketing that brings you customers.
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-big mt-8 max-w-2xl text-[var(--color-text-mute)]">
            One studio for independent businesses who want their brand and
            website to actually sell. We design the brand, build the website,
            host it for you, and run the local SEO and email that bring
            customers back.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {PRICE_CARDS.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className="group block border-l-2 border-[var(--color-accent)] pl-5 transition-opacity hover:opacity-80"
              >
                <p className="label text-[var(--color-text-soft)]">{card.label}</p>
                <p className="h3 mt-2 text-[var(--color-text)]">{card.price}</p>
                <p className="text-small mt-3 text-[var(--color-text-mute)]">
                  {card.detail}
                </p>
                <span className="label mt-4 inline-flex items-center gap-1 text-[var(--color-accent)]">
                  See {card.label}
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
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
