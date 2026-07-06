import Link from 'next/link';
import { ArrowUpRight, Layout, ShoppingBag, Search } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';

const SERVICE_CARDS = [
  {
    icon: Layout,
    label: 'Web Design',
    detail: 'Fast, custom websites built from scratch to convert.',
    href: '/web-design',
  },
  {
    icon: ShoppingBag,
    label: 'Ecommerce',
    detail: 'Online stores on a platform you own, no marketplace cut.',
    href: '/ecommerce',
  },
  {
    icon: Search,
    label: 'SEO',
    detail: 'The organic and AI search work that gets you found.',
    href: '/seo',
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
            Websites, online stores, and the SEO that gets them found.
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-big mt-8 max-w-2xl text-[var(--color-text-mute)]">
            russle is a web design, ecommerce and SEO studio. We build fast,
            custom sites and stores for ambitious businesses, then run the SEO
            that keeps customers coming.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {SERVICE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.label}
                  href={card.href}
                  className="group flex h-full flex-col rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_18px_40px_-24px_rgba(26,20,16,0.25)] md:p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line-2)] text-[var(--color-accent)] transition-colors group-hover:border-[var(--color-accent)]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="h5 mt-5 text-[var(--color-text)]">{card.label}</p>
                  <p className="text-small mt-2 text-[var(--color-text-mute)]">
                    {card.detail}
                  </p>
                  <span className="label mt-auto inline-flex items-center gap-1 pt-6 text-[var(--color-accent)]">
                    See {card.label}
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
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
