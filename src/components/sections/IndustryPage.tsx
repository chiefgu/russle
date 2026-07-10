import type { ReactNode } from 'react';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { FAQ } from '@/components/ui/FAQ';
import { Reveal } from '@/components/animations/Reveal';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { ReviewsBlock } from '@/components/sections/ReviewsBlock';
import { JsonLd } from '@/components/seo/JsonLd';
import type { IndustryBlock, IndustryPageData } from '@/content/industries';

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

  // Alternating surface rhythm for the variable blocks. Fixed-tone blocks
  // (stats: dark, faq: surface, cta: dark) sit outside the rotation.
  let flip = false;
  const nextTone = (): 'bg' | 'surface' => {
    flip = !flip;
    return flip ? 'surface' : 'bg';
  };

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

  const blocks: Record<IndustryBlock, () => ReactNode> = {
    pains: () => (
      <Section key="pains" tone={nextTone()} spacing="xl">
        <div className="mb-10 max-w-3xl">
          <Reveal><Tag>Sound familiar?</Tag></Reveal>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {data.pains.map((pain, i) => (
            <Reveal key={pain.title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-8 md:p-10">
                <h3 className="h5 text-balance">{pain.title}</h3>
                <p className="text-body mt-4 text-[var(--color-text-mute)]">{pain.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    ),

    build: () => (
      <Section key="build" tone={nextTone()} spacing="xl">
        <div className="mb-10 max-w-3xl">
          <Reveal><Tag>What we build</Tag></Reveal>
        </div>
        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
            {data.build.map((item) => (
              <div key={item.title} className="flex h-full flex-col bg-[var(--color-bg)] p-8 md:p-10">
                <h3 className="h5 text-balance">{item.title}</h3>
                <p className="text-body mt-4 text-[var(--color-text-mute)]">{item.body}</p>
              </div>
            ))}
            {/* pad the last row so the line-coloured grid backing never shows through */}
            {data.build.length % 3 !== 0 &&
              Array.from({ length: 3 - (data.build.length % 3) }).map((_, i) => (
                <div key={`pad-${i}`} aria-hidden className="hidden bg-[var(--color-bg)] sm:block" />
              ))}
          </div>
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

    proof: () => {
      if (!data.proof) return null;
      return (
        <Section key="proof" tone={nextTone()} spacing="xl">
          <Reveal>
            <div className="rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-10 md:p-12">
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
          </Reveal>
        </Section>
      );
    },

    reviews: () => <ReviewsBlock key="reviews" limit={3} />,

    vignetteShowcase: () => (
      <Section key="showcase" tone={nextTone()} spacing="xl">
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
      {data.blocks.map((block) => blocks[block]())}
    </>
  );
}
