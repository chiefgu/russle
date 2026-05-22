import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';

type Variant = {
  angle: string;
  headline: string;
  sub: string;
  cta: string;
  winner?: boolean;
};

// Illustrative only. A sample local cake studio, used to show the method.
// These are not real results and must never be presented as metrics.
const VARIANTS: Variant[] = [
  {
    angle: 'Problem',
    headline: 'Cake shopping should not be stressful.',
    sub: 'Tell us the date and the occasion. We handle the rest.',
    cta: 'Start your order',
  },
  {
    angle: 'Proof',
    headline: "Knutsford's most-booked celebration cakes.",
    sub: 'Hundreds of five-star reviews from local families.',
    cta: 'See the work',
    winner: true,
  },
  {
    angle: 'Outcome',
    headline: 'The centrepiece everyone remembers.',
    sub: 'Made for your moment, delivered to your door.',
    cta: 'Book a tasting',
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
