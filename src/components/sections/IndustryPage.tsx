import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Award, Bell, Calculator, CalendarCheck, CalendarDays, CalendarX, Camera,
  ClipboardList, Clock, CreditCard, Eye, FileQuestion, FileText, Gift, Layers,
  ListChecks, Lock, Mail, MapPin, MessageSquare, PackageCheck, Percent, Phone,
  PhoneCall, QrCode, Repeat, RotateCcw, Ruler, Scale, Search, ShieldCheck,
  ShoppingBag, Split, Star, Store, Tags, Ticket, Timer, TrendingDown,
  TrendingUp, Truck, UserPlus, Users, UtensilsCrossed, Wallet,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Section } from '@/components/layout/Section';
import { getAllWork } from '@/lib/mdx';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { FAQ } from '@/components/ui/FAQ';
import { Reveal } from '@/components/animations/Reveal';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { ReviewsBlock } from '@/components/sections/ReviewsBlock';
import { IndustryFlow } from '@/components/sections/IndustryFlow';
import { JsonLd } from '@/components/seo/JsonLd';
import { cn } from '@/lib/cn';
import type { IndustryBlock, IndustryPageData } from '@/content/industries';

// Icon registry: industries.ts stays pure data and names icons as strings.
export const ICONS: Record<string, LucideIcon> = {
  Award, Bell, Calculator, CalendarCheck, CalendarDays, CalendarX, Camera,
  ClipboardList, Clock, CreditCard, Eye, FileQuestion, FileText, Gift, Layers,
  ListChecks, Lock, Mail, MapPin, MessageSquare, PackageCheck, Percent, Phone,
  PhoneCall, QrCode, Repeat, RotateCcw, Ruler, Scale, Search, ShieldCheck,
  ShoppingBag, Split, Star, Store, Tags, Ticket, Timer, TrendingDown,
  TrendingUp, Truck, UserPlus, Users, UtensilsCrossed, Wallet,
};

type Tone = 'bg' | 'surface' | 'dark' | 'accent';

const FIXED_TONES: Partial<Record<IndustryBlock, Tone>> = {
  pains: 'dark',
  stats: 'dark',
  statement: 'accent',
  reviews: 'bg',
  faq: 'surface',
  cta: 'dark',
};

// Assign light tones to the variable blocks so no two adjacent sections share
// a tone. Differing from the previous section wins; differing from the next
// fixed section is best-effort (two light tones can't always satisfy both).
export function planTones(blocks: IndustryBlock[]): Tone[] {
  const tones: Tone[] = [];
  let prev: Tone = 'bg'; // hero
  blocks.forEach((block, i) => {
    const fixed = FIXED_TONES[block];
    if (fixed) {
      tones.push(fixed);
      prev = fixed;
      return;
    }
    const next = FIXED_TONES[blocks[i + 1] ?? 'cta'];
    let tone: Tone = prev === 'surface' ? 'bg' : 'surface';
    if (tone === next) {
      const alt: Tone = tone === 'bg' ? 'surface' : 'bg';
      if (alt !== prev) tone = alt;
    }
    tones.push(tone);
    prev = tone;
  });
  return tones;
}

// Renders an industry landing page from its ordered block list. Hero variants
// and block order come from data, so no two verticals share a structure.
export function IndustryPage({ data, vignette }: { data: IndustryPageData; vignette: ReactNode }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const tones = planTones(data.blocks);

  const heroCopy = (centred: boolean) => (
    <>
      <Reveal><Tag tone="accent">{data.tag}</Tag></Reveal>
      <Reveal delay={0.05}>
        <h1 className="h1 mt-6 text-balance">{data.h1}</h1>
      </Reveal>
      <Reveal delay={0.15}>
        <p className={`text-big mt-6 max-w-2xl text-[var(--color-text-mute)] ${centred ? 'mx-auto' : ''}`}>
          {data.intro}
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <div className={`mt-10 flex flex-col gap-3 sm:flex-row ${centred ? 'sm:justify-center' : ''}`}>
          <ButtonLink href="/start" variant="primary" size="lg" withArrow>Start a project</ButtonLink>
          <ButtonLink href="/work" variant="secondary" size="lg">See the work</ButtonLink>
        </div>
      </Reveal>
    </>
  );

  const hero =
    data.hero === 'A' ? (
      <Section tone="bg" spacing="heroTopTight">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="max-w-3xl lg:col-span-7">{heroCopy(false)}</div>
          <div className="mt-4 lg:col-span-5 lg:mt-0">
            <Reveal delay={0.25}>{vignette}</Reveal>
          </div>
        </div>
      </Section>
    ) : data.hero === 'B' ? (
      <Section tone="bg" spacing="heroTopTight">
        <div className="mx-auto max-w-3xl text-center">{heroCopy(true)}</div>
        <div className="mt-14 md:mt-16">
          <Reveal delay={0.25}>{vignette}</Reveal>
        </div>
      </Section>
    ) : (
      <Section tone="bg" spacing="heroTopTight">
        <div className="max-w-3xl">{heroCopy(false)}</div>
      </Section>
    );

  const blocks: Record<IndustryBlock, (tone: Tone) => ReactNode> = {
    // "The old way": dark band, ghost numerals, accent icon squircles.
    pains: () => (
      <Section key="pains" tone="dark" spacing="xl">
        <div className="mb-14 max-w-3xl">
          <Reveal><Tag tone="on-dark">The old way</Tag></Reveal>
        </div>
        <div className="grid gap-14 md:grid-cols-3 md:gap-10">
          {data.pains.map((pain, i) => {
            const Icon = ICONS[pain.icon];
            return (
              <Reveal key={pain.title} delay={i * 0.05}>
                <div className="relative">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-10 right-0 select-none text-[120px] font-medium leading-none tracking-[-0.06em] text-[rgba(248,247,245,0.07)]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-[14px] bg-[var(--color-accent)]">
                    <Icon className="h-6 w-6 text-[var(--color-on-accent)]" />
                  </span>
                  <h3 className="h4 relative mt-6 text-balance text-[var(--color-on-dark)]">{pain.title}</h3>
                  <p className="text-body relative mt-4 text-[var(--color-on-dark-mute)]">{pain.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>
    ),

    // Bento: alternating wide/narrow cells that tile the grid exactly,
    // a featured accent-tinted cell and one inverted dark cell. Light cells
    // take the opposite tone to the section so they always read as cards.
    build: (tone) => {
      const cellLight = tone === 'surface' ? 'bg-[var(--color-bg)]' : 'bg-[var(--color-surface)]';
      return (
        <Section key="build" tone={tone} spacing="xl">
          <div className="mb-12 max-w-3xl">
            <Reveal>
              <Tag>What we build</Tag>
              <h2 className="h2 mt-6 text-balance">{data.buildHeading}</h2>
            </Reveal>
          </div>
          <Reveal>
            <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
              {data.build.map((item, i) => {
                const Icon = ICONS[item.icon];
                const wide = i === 0 || i === 3 || i === 4; // rows: [2,1] [1,2] [2,1]
                const featured = i === 0;
                const dark = i === 3;
                return (
                  <div
                    key={item.title}
                    className={cn(
                      'relative flex h-full flex-col overflow-hidden p-8 md:p-10',
                      wide && 'lg:col-span-2',
                      dark ? 'bg-[var(--color-dark)]' : cellLight,
                    )}
                  >
                    {featured && (
                      <span aria-hidden className="absolute inset-0 bg-[var(--color-accent-tint)]" />
                    )}
                    {wide && (
                      <Icon
                        aria-hidden
                        className={cn(
                          'pointer-events-none absolute -bottom-6 -right-6 h-36 w-36',
                          dark ? 'text-[var(--color-on-dark)] opacity-[0.08]' : 'text-[var(--color-accent)] opacity-[0.08]',
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        'relative flex items-center justify-center rounded-[14px]',
                        featured
                          ? 'h-14 w-14 bg-[var(--color-accent)]'
                          : dark
                            ? 'h-12 w-12 bg-[rgba(248,247,245,0.12)]'
                            : 'h-12 w-12 bg-[var(--color-accent-tint)]',
                      )}
                    >
                      <Icon
                        className={cn(
                          featured
                            ? 'h-7 w-7 text-[var(--color-on-accent)]'
                            : dark
                              ? 'h-6 w-6 text-[var(--color-on-dark)]'
                              : 'h-6 w-6 text-[var(--color-accent)]',
                        )}
                      />
                    </span>
                    <h3
                      className={cn(
                        'relative mt-6 text-balance',
                        featured ? 'h4' : 'h5',
                        dark && 'text-[var(--color-on-dark)]',
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        'text-body relative mt-4',
                        wide && 'max-w-md',
                        dark ? 'text-[var(--color-on-dark-mute)]' : 'text-[var(--color-text-mute)]',
                      )}
                    >
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Section>
      );
    },

    stats: () => (
      <Section key="stats" tone="dark" spacing="l">
        <div className="grid gap-10 md:grid-cols-3">
          {(data.stats ?? []).map((stat, i) => (
            <Reveal key={stat.value + stat.label} delay={i * 0.05}>
              <p className="h2">{stat.value}</p>
              <p className="text-body mt-3 max-w-xs text-[var(--color-on-dark-mute)]">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Section>
    ),

    // The mechanism diagram: search/trigger → the site → outcome.
    flow: (tone) => {
      if (!data.flow) return null;
      return (
        <Section key="flow" tone={tone} spacing="xl">
          <div className="mb-12 max-w-2xl">
            <Reveal>
              <Tag>The mechanism</Tag>
              <h2 className="h2 mt-6 text-balance">{data.flow.heading}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <IndustryFlow flow={data.flow} icons={ICONS} />
          </Reveal>
        </Section>
      );
    },

    // Full-bleed accent interlude: one oversized line.
    statement: () => (
      <Section key="statement" tone="accent" spacing="l">
        <Reveal>
          <p className="h1 max-w-4xl text-balance">{data.statement}</p>
        </Reveal>
      </Section>
    ),

    proof: (tone) => {
      if (!data.proof) return null;
      const cardFill = tone === 'surface' ? 'bg-[var(--color-bg)]' : 'bg-[var(--color-surface)]';
      const work = getAllWork().find((w) => w.slug === data.proof!.slug);
      const cover = work?.cover;
      return (
        <Section key="proof" tone={tone} spacing="l">
          <Reveal>
            <div className={cn('overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)]', cardFill)}>
              <div className={cn('grid', cover && 'md:grid-cols-12')}>
                <div className={cn('p-10 md:p-12', cover && 'md:col-span-7')}>
                  <p className="label text-[var(--color-text-soft)]">Proof</p>
                  <p className="text-big mt-4 max-w-2xl text-[var(--color-text)]">{data.proof.line}</p>
                  {data.proof.extra && (
                    <p className="text-body mt-4 max-w-2xl text-[var(--color-text-mute)]">{data.proof.extra}</p>
                  )}
                  <div className="mt-8">
                    <ButtonLink href={`/work/${data.proof.slug}`} variant="secondary" size="md" withArrow>
                      Read the {data.proof.title} case study
                    </ButtonLink>
                  </div>
                </div>
                {cover && (
                  <Link
                    href={`/work/${data.proof.slug}`}
                    aria-label={`${data.proof.title} case study`}
                    className="group relative block min-h-[240px] md:col-span-5"
                  >
                    <Image
                      src={cover}
                      alt={`${data.proof.title} case study`}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        </Section>
      );
    },

    reviews: () => <ReviewsBlock key="reviews" limit={3} />,

    vignetteShowcase: (tone) => (
      <Section key="showcase" tone={tone} spacing="xl">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><Tag tone="accent">{data.tag}</Tag></Reveal>
          <Reveal delay={0.05}>
            <h2 className="h2 mt-6 text-balance">{data.showcase?.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-big mt-6 text-[var(--color-text-mute)]">{data.showcase?.sub}</p>
          </Reveal>
        </div>
        <div className="mt-14 md:mt-16">
          <Reveal delay={0.15}>{vignette}</Reveal>
        </div>
      </Section>
    ),

    faq: () => (
      <Section key="faq" tone="surface" spacing="xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <Tag>Common questions</Tag>
              <h2 className="h2 mt-6 text-balance">Straight answers.</h2>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.05}><FAQ items={data.faq} /></Reveal>
          </div>
        </div>
      </Section>
    ),

    cta: () => <CTAStrip key="cta" />,
  };

  return (
    <>
      <JsonLd data={data.schema} />
      <JsonLd data={faqSchema} />
      {hero}
      {data.blocks.map((block, i) => blocks[block](tones[i]))}
    </>
  );
}
