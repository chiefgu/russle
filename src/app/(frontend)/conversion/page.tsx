import type { Metadata } from 'next';

import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { ConversionExplainer } from '@/components/sections/ConversionExplainer';

export const metadata: Metadata = {
  title: 'Conversion optimisation',
  description:
    'russle makes the website you already have earn more. We research how visitors behave, build several versions of a page, and keep the one that turns more of them into customers, as part of the ongoing SEO retainer.',
  alternates: { canonical: '/conversion' },
};

const METHOD = [
  {
    step: 'Research',
    body: 'We look at how visitors actually behave, using heatmaps, session recordings, reviews, support tickets, and the language your customers use. That shows us where the page is losing people and what to say instead.',
  },
  {
    step: 'Build the variants',
    body: 'We build several versions of the page, each leading on a different angle: the problem, the proof, or the outcome. Same offer, a different argument for it.',
  },
  {
    step: 'Test',
    body: 'We send the same visitors to each version and measure which one turns more of them into customers. We wait for a clear result rather than acting on a hunch.',
  },
  {
    step: 'Keep the winner',
    body: 'The winning version becomes the live page. We retire the rest and feed what we learned into the next round, so the improvement compounds over time.',
  },
];

const WHERE_IT_LIVES = [
  {
    tier: 'Every month',
    summary: 'Light and ongoing',
    body: 'Every SEO retainer client gets continual, evidence-led improvements to the live site: clearer copy, sharper calls to action, fewer points of friction. No traffic minimum, it runs every month.',
    cta: { label: 'How the retainer works', href: '/seo' },
  },
  {
    tier: 'When traffic allows',
    summary: 'Full and measured',
    body: 'Where there is enough traffic for a valid test, we run the complete method: research through to a tested winner. For clients running paid campaigns, the campaign traffic supplies the volume.',
    cta: { label: 'How the retainer works', href: '/seo' },
  },
];

function ConversionHero() {
  return (
    <Section tone="bg" spacing="heroTopTight">
      <div className="max-w-3xl">
        <Reveal>
          <Tag tone="accent">Conversion</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="h1 mt-6 text-balance">
            Make the site you already have earn more.
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-big mt-8 max-w-xl text-[var(--color-text-mute)]">
            Most sites lose customers not because the traffic is wrong, but
            because the page is not making its case well enough. We find what is
            costing you customers and fix it, version by version, until the site
            converts better.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#explainer" variant="primary" size="lg" withArrow>
              See how it works
            </ButtonLink>
            <ButtonLink href="/start" variant="secondary" size="lg">
              Start a project
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Method() {
  return (
    <Section tone="bg" spacing="xl" id="method">
      <div className="mb-12 max-w-3xl">
        <Reveal>
          <Tag>The method</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">
            Four steps, run calmly and in order.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <ol className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] md:grid-cols-2">
          {METHOD.map((item, i) => (
            <li
              key={item.step}
              className="flex h-full flex-col bg-[var(--color-bg)] p-8 md:p-10"
            >
              <p className="label text-[var(--color-text-soft)]">
                Step {i + 1}
              </p>
              <h3 className="h5 mt-4 text-balance">{item.step}</h3>
              <p className="text-body mt-4 text-[var(--color-text-mute)]">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-8 rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-8 md:p-10">
          <p className="label text-[var(--color-text-soft)]">A note on traffic</p>
          <p className="text-big mt-4 max-w-3xl text-[var(--color-text-mute)]">
            A true split test needs enough visitors to give a result you can
            trust. Where the numbers are there, usually on busier sites and on
            pages behind paid campaigns, we run the full test. Where they are
            not there yet, we improve from the evidence instead and revisit
            testing as your traffic grows.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

function WhereItLives() {
  return (
    <Section tone="surface" spacing="xl">
      <div className="mb-12 max-w-3xl">
        <Reveal>
          <Tag>Where it lives</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">
            Built into the retainer, not sold as an extra.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
            Conversion work is part of the ongoing SEO retainer. The depth scales
            with the traffic the site can support.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {WHERE_IT_LIVES.map((item, i) => (
          <Reveal key={item.tier} delay={0.1 + i * 0.08}>
            <div className="flex h-full flex-col rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-8 md:p-10">
              <p className="label text-[var(--color-text-soft)]">{item.tier}</p>
              <h3 className="h3 mt-3 text-[var(--color-accent)]">
                {item.summary}
              </h3>
              <p className="text-body mt-6 text-[var(--color-text-mute)]">
                {item.body}
              </p>
              <div className="mt-8">
                <ButtonLink href={item.cta.href} variant="secondary" withArrow>
                  {item.cta.label}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default function ConversionPage() {
  return (
    <>
      <ConversionHero />
      <ConversionExplainer />
      <Method />
      <WhereItLives />
      <CTAStrip />
    </>
  );
}
