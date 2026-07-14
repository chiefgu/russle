import type { ReactNode } from 'react';
import { Section } from '@/components/layout/Section';
import { ICONS } from '@/components/sections/icons';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { FAQ } from '@/components/ui/FAQ';
import { Reveal } from '@/components/animations/Reveal';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { ProofCard } from '@/components/sections/ProofCard';
import { ReviewsBlock } from '@/components/sections/ReviewsBlock';
import { IndustryFlow } from '@/components/sections/IndustryFlow';
import { JsonLd } from '@/components/seo/JsonLd';
import { cn } from '@/lib/cn';
import type { IndustryBlock, IndustryPageData } from '@/content/industries';


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
    build: (tone) => (
      <Section key="build" tone={tone} spacing="xl">
        <div className="mb-12 max-w-3xl">
          <Reveal>
            <Tag>What we build</Tag>
            <h2 className="h2 mt-6 text-balance">{data.buildHeading}</h2>
          </Reveal>
        </div>
        <Reveal>
          <BentoGrid items={data.build} sectionTone={tone === 'surface' ? 'surface' : 'bg'} />
        </Reveal>
      </Section>
    ),

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
      return (
        <Section key="proof" tone={tone} spacing="l">
          <Reveal>
            <ProofCard
              slug={data.proof.slug}
              title={data.proof.title}
              line={data.proof.line}
              extra={data.proof.extra}
              fill={tone === 'surface' ? 'bg' : 'surface'}
            />
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
