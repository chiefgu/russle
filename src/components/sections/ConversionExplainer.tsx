import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';

type Variant = {
  angle: string;
  headline: string;
  sub: string;
  cta: string;
  winner?: boolean;
  /** Relative conversion bar width (illustrative, no numbers claimed) */
  share: string;
};

// Illustrative only. A sample furniture brand, used to show the method.
// These are not real results and must never be presented as metrics.
const VARIANTS: Variant[] = [
  {
    angle: 'Problem',
    headline: 'Buying a sofa online should not be a gamble.',
    sub: 'Free fabric samples to your door before you commit.',
    cta: 'Order free samples',
    share: 'w-[42%]',
  },
  {
    angle: 'Proof',
    headline: 'The sofa thousands of UK homes sit on.',
    sub: 'Five-star reviews from living rooms across the country.',
    cta: 'Shop the range',
    winner: true,
    share: 'w-[85%]',
  },
  {
    angle: 'Outcome',
    headline: 'The room everyone gathers in.',
    sub: 'Delivered in days, made to last decades.',
    cta: 'Find your sofa',
    share: 'w-[58%]',
  },
];

export function ConversionExplainer() {
  return (
    <Section tone="surface" spacing="xl" id="explainer">
      <div className="mb-12 max-w-3xl">
        <Reveal>
          <Tag tone="accent">How it works</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">
            We do not guess which message works. We let your visitors decide.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
            We build several versions of the same page, each making a different
            case, and send the same visitors to each. The version that wins more
            customers is the one we keep.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {VARIANTS.map((v, i) => (
          <Reveal key={v.angle} delay={0.1 + i * 0.08}>
            <div
              className={`relative flex h-full flex-col rounded-[var(--radius-l)] border bg-[var(--color-bg)] p-6 md:p-8 ${
                v.winner
                  ? 'border-[var(--color-accent)]'
                  : 'border-[var(--color-line)]'
              }`}
            >
              {v.winner && (
                <span className="absolute right-4 top-4 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-on-accent)]">
                  Kept
                </span>
              )}
              <p className="label text-[var(--color-text-soft)]">
                Variant {String.fromCharCode(65 + i)}
              </p>
              <p className="h6 mt-3 text-[var(--color-accent)]">{v.angle}</p>

              <div className="mt-5 overflow-hidden rounded-[var(--radius-m)] border border-[var(--color-line)]">
                <div className="flex gap-1.5 border-b border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-line-2)]" />
                  <span className="h-2 w-2 rounded-full bg-[var(--color-line-2)]" />
                  <span className="h-2 w-2 rounded-full bg-[var(--color-line-2)]" />
                </div>
                <div className="bg-[var(--color-bg)] p-5">
                  <h3 className="h5 text-balance">{v.headline}</h3>
                  <p className="text-small mt-3 text-[var(--color-text-mute)]">
                    {v.sub}
                  </p>
                  <span className="mt-4 inline-block rounded-[var(--radius-s)] bg-[var(--color-accent)] px-4 py-2 text-small font-semibold text-[var(--color-on-accent)]">
                    {v.cta}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <p className="label text-[var(--color-text-soft)]">Conversions</p>
                <div className="mt-2 h-2 rounded-full bg-[var(--color-surface-2)]">
                  <div
                    className={`h-2 rounded-full ${v.share} ${
                      v.winner ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-line-2)]'
                    }`}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <p className="text-big mt-10 text-center text-[var(--color-text)]">
          Same visitors to each version. Keep the winner, retire the rest.
        </p>
      </Reveal>
      <Reveal delay={0.35}>
        <p className="text-small mt-3 text-center text-[var(--color-text-soft)]">
          Illustrative example. Real tests run on your own pages and your own
          customers.
        </p>
      </Reveal>
    </Section>
  );
}
