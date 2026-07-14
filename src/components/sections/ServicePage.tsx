import type { ReactNode } from 'react';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { FAQ } from '@/components/ui/FAQ';
import { Reveal } from '@/components/animations/Reveal';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { ProofCard } from '@/components/sections/ProofCard';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { IndustryFlow, type FlowData } from '@/components/sections/IndustryFlow';
import { ICONS } from '@/components/sections/icons';
import { JsonLd } from '@/components/seo/JsonLd';

export type ServicePageData = {
  slug: 'web-design' | 'ecommerce' | 'seo';
  tag: string;
  h1: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  includedHeading: string;
  included: { icon: string; title: string; body: string }[];
  flow: FlowData & { heading: string };
  how: string[];
  statement: string;
  caseStudy?: { slug: string; title: string; line: string };
  faq: { q: string; a: string }[];
  schema: Record<string, unknown>;
};

// Service pages share the industry pages' visual system: hero + vignette,
// bento deliverables, mechanism flow, dark numbered process band, proof with
// cover image, accent statement, FAQ, CTA. Tones alternate deliberately:
// bg / surface / bg / dark / bg / accent / surface / dark.
export function ServicePage({ data, visual }: { data: ServicePageData; visual?: ReactNode }) {
  const heroCopy = (
    <>
      <Reveal><Tag tone="accent">{data.tag}</Tag></Reveal>
      <Reveal delay={0.05}>
        <h1 className="h1 mt-6 text-balance">{data.h1}</h1>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">{data.intro}</p>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/start" variant="primary" size="lg" withArrow>Start a project</ButtonLink>
          <ButtonLink href="/work" variant="secondary" size="lg">See the work</ButtonLink>
        </div>
      </Reveal>
    </>
  );

  return (
    <>
      <JsonLd data={data.schema} />

      <Section tone="bg" spacing="heroTopTight">
        {visual ? (
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="max-w-3xl lg:col-span-7">{heroCopy}</div>
            <div className="mt-4 lg:col-span-5 lg:mt-0">
              <Reveal delay={0.25}>{visual}</Reveal>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl">{heroCopy}</div>
        )}
      </Section>

      {/* Deliverables bento */}
      <Section tone="surface" spacing="xl">
        <div className="mb-12 max-w-3xl">
          <Reveal>
            <Tag>What you get</Tag>
            <h2 className="h2 mt-6 text-balance">{data.includedHeading}</h2>
          </Reveal>
        </div>
        <Reveal>
          <BentoGrid items={data.included} sectionTone="surface" />
        </Reveal>
      </Section>

      {/* Mechanism flow */}
      <Section tone="bg" spacing="xl">
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

      {/* Process: dark band, ghost numerals */}
      <Section tone="dark" spacing="xl">
        <div className="mb-14 max-w-2xl">
          <Reveal><Tag tone="on-dark">How it works</Tag></Reveal>
        </div>
        <div className="grid gap-14 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:grid-cols-4">
          {data.how.map((step, i) => (
            <Reveal key={step} delay={i * 0.05}>
              <div className="relative">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-10 right-0 select-none text-[120px] font-medium leading-none tracking-[-0.06em] text-[rgba(248,247,245,0.07)]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-[14px] font-bold text-[var(--color-on-accent)]">
                  {i + 1}
                </span>
                <p className="text-big relative mt-6 text-[var(--color-on-dark)]">{step}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {data.caseStudy && (
        <Section tone="bg" spacing="l">
          <Reveal>
            <ProofCard
              slug={data.caseStudy.slug}
              title={data.caseStudy.title}
              line={data.caseStudy.line}
              fill="surface"
            />
          </Reveal>
        </Section>
      )}

      {/* Statement interlude */}
      <Section tone="accent" spacing="l">
        <Reveal>
          <p className="h1 max-w-4xl text-balance">{data.statement}</p>
        </Reveal>
      </Section>

      <Section tone="surface" spacing="xl">
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

      <CTAStrip />
    </>
  );
}
