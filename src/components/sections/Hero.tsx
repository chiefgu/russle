import Link from 'next/link';
import { Layout, ShoppingBag, Search, ArrowUpRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';
import { HomeHeroVignette } from '@/components/sections/vignettes/HomeHeroVignette';

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
    detail: 'Custom online stores, with orders coming straight to you.',
    href: '/ecommerce',
  },
  {
    icon: Search,
    label: 'SEO',
    detail: 'Coming up on Google, and in AI answers, when customers search.',
    href: '/seo',
  },
];

// Split hero: copy and a single primary action on the left, a visual on the
// right. One clear CTA (start a project) with a quiet audit link underneath.
// The three service cards sit below, above the client logos.
export function Hero() {
  return (
    <Section
      tone="bg"
      spacing="heroTopTight"
      container="main"
      className="flex min-h-screen flex-col justify-center"
    >
      <div className="grid w-full gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="max-w-2xl lg:col-span-6">
          <Reveal>
            <h1 className="h1 text-balance text-[var(--color-text)]">
              Websites, online stores, and the SEO that gets them found.
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-big mt-8 max-w-xl text-[var(--color-text-mute)]">
              russle is a web design, ecommerce and SEO studio. We build fast,
              custom sites and stores for ambitious businesses, then do the work
              that gets them coming up on Google when your customers search.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/start" variant="primary" size="lg" withArrow>
                Start a project
              </ButtonLink>
              <Link
                href="/free-site-review"
                className="group inline-flex items-center gap-1.5 text-body text-[var(--color-text-mute)] transition-colors hover:text-[var(--color-text)]"
              >
                or get a free website audit
                <span aria-hidden className="text-[var(--color-accent)] transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={0.35}>
            <HomeHeroVignette />
          </Reveal>
        </div>
      </div>

      {/* Three core services */}
      <div className="mt-16 grid gap-5 sm:grid-cols-3 md:mt-20">
        {SERVICE_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <Reveal key={card.label} delay={0.1 + i * 0.05}>
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_18px_40px_-24px_rgba(26,20,16,0.25)] md:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line-2)] text-[var(--color-accent)] transition-colors group-hover:border-[var(--color-accent)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <p className="h5 mt-5 text-[var(--color-text)]">{card.label}</p>
                <p className="text-small mt-2 text-[var(--color-text-mute)]">{card.detail}</p>
                <span className="label mt-auto inline-flex items-center gap-1 pt-6 text-[var(--color-accent)]">
                  See {card.label}
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
