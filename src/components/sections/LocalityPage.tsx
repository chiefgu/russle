import type { ReactNode } from 'react';
import Link from 'next/link';
import { Star, MapPin, ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { FAQ } from '@/components/ui/FAQ';
import { Reveal } from '@/components/animations/Reveal';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { ProofCard } from '@/components/sections/ProofCard';
import { ReviewsBlock } from '@/components/sections/ReviewsBlock';
import { JsonLd } from '@/components/seo/JsonLd';
import { getPlaceSummary } from '@/lib/google-places';
import {
  LOCATION_LINKS,
  type LocalityBlock,
  type LocalityPageData,
} from '@/content/locations';

type Tone = 'bg' | 'surface' | 'dark' | 'accent';

const FIXED_TONES: Partial<Record<LocalityBlock, Tone>> = {
  statement: 'accent',
  reviews: 'bg',
  faq: 'surface',
  cta: 'dark',
};

// Same tone-planning idea as IndustryPage: fixed tones hold, variable blocks
// alternate light tones so no two adjacent sections match.
function planLocalityTones(blocks: LocalityBlock[]): Tone[] {
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

// Renders a locality landing page from its ordered block list. Hero variants
// and block order come from data, so no two places share a structure.
export async function LocalityPage({ data, vignette }: { data: LocalityPageData; vignette: ReactNode }) {
  const summary = await getPlaceSummary();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const tones = planLocalityTones(data.blocks);

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

  const blocks: Record<LocalityBlock, (tone: Tone) => ReactNode> = {
    // Local narrative left, studio-facts card right (real rating, real base).
    grounding: (tone) => (
      <Section key="grounding" tone={tone} spacing="xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Reveal>
              <Tag>The local case</Tag>
              <h2 className="h2 mt-6 text-balance">{data.grounding.heading}</h2>
            </Reveal>
            {data.grounding.body.map((para, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <p className="text-body mt-6 max-w-2xl text-[var(--color-text-mute)]">{para}</p>
              </Reveal>
            ))}
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <div
                className={`rounded-[var(--radius-l)] border border-[var(--color-line)] p-8 md:p-10 ${
                  tone === 'surface' ? 'bg-[var(--color-bg)]' : 'bg-[var(--color-surface)]'
                }`}
              >
                <p className="label text-[var(--color-text-soft)]">The studio</p>
                <div className="mt-6 flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                  <p className="text-body text-[var(--color-text)]">
                    Based in Alderley Edge, working across Cheshire and South Manchester.
                  </p>
                </div>
                {summary && (
                  <div className="mt-6 flex items-start gap-4 border-t border-[var(--color-line)] pt-6">
                    <Star className="mt-1 h-5 w-5 shrink-0 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                    <div>
                      <p className="text-body text-[var(--color-text)]">
                        Rated {(Math.round(summary.rating * 10) / 10).toFixed(1)} from{' '}
                        {summary.reviewCount} Google review{summary.reviewCount === 1 ? '' : 's'}.
                      </p>
                      {summary.googleMapsUri && (
                        <a
                          href={summary.googleMapsUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label mt-2 inline-block text-[var(--color-text-mute)] underline-offset-4 hover:text-[var(--color-text)] hover:underline"
                        >
                          Read on Google
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    ),

    // Hub pages: town-by-town directory with a line of context per place,
    // linking down to the town pages so authority flows through the hub.
    towns: (tone) => {
      if (!data.towns) return null;
      return (
        <Section key="towns" tone={tone} spacing="xl">
          <div className="mb-12 max-w-3xl">
            <Reveal>
              <Tag>Town by town</Tag>
              <h2 className="h2 mt-6 text-balance">{data.towns.heading}</h2>
            </Reveal>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {data.towns.items.map((town, i) => (
              <Reveal key={town.href} delay={i * 0.04}>
                <Link
                  href={town.href}
                  className={`group flex h-full items-start justify-between gap-4 rounded-[var(--radius-l)] border border-[var(--color-line)] p-8 transition-all hover:border-[var(--color-accent)] ${
                    tone === 'surface' ? 'bg-[var(--color-bg)]' : 'bg-[var(--color-surface)]'
                  }`}
                >
                  <div>
                    <h3 className="h5 text-[var(--color-text)]">{town.name}</h3>
                    <p className="text-body mt-3 text-[var(--color-text-mute)]">{town.line}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[var(--color-text-soft)] transition-colors group-hover:text-[var(--color-accent)]" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      );
    },

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

    statement: () => (
      <Section key="statement" tone="accent" spacing="l">
        <Reveal>
          <p className="h1 max-w-4xl text-balance">{data.statement}</p>
        </Reveal>
      </Section>
    ),

    // Cross-link mesh to the sibling locality pages.
    areas: (tone) => (
      <Section key="areas" tone={tone} spacing="l">
        <Reveal>
          <Tag>Where we work</Tag>
          <h2 className="h3 mt-6 text-balance">Web design across Cheshire and South Manchester.</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-3">
            {LOCATION_LINKS.filter((l) => l.href !== `/${data.slug}`).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label rounded-full border border-[var(--color-line-2)] px-5 py-2.5 text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </Reveal>
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
