import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Reveal } from '@/components/animations/Reveal';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Three ways to work together. Brand + site as one piece, ongoing care once you are live, or just the slice you need.',
};

const LAUNCH_INCLUDED = [
  'Brand identity (logo, palette, type, basic guidelines)',
  'Custom-designed website (typically 5–7 pages)',
  'Built and shipped on Next.js',
  'Domain and hosting setup',
  '4–6 week timeline',
];

const LAUNCH_YOU_BRING = [
  'Copy and photography for the site',
  'A view on what you want it to feel like (or trust me to find it)',
  'Decisions, on time',
];

const ALA_CARTE = [
  {
    title: 'Web only',
    body: 'You already have a brand.',
  },
  {
    title: 'Brand only',
    body: "You already have a site or don't need one yet.",
  },
  {
    title: 'One-page site',
    body: 'A launch page, an event, a single product.',
  },
  {
    title: 'Content',
    body: 'Copy, photography, social, ads. Added on top of any launch.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="bg" spacing="heroTop" container="main">
        <div className="max-w-5xl">
          <Reveal>
            <Tag>Services</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h1 mt-6 text-balance">What you can book.</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-big mt-8 max-w-2xl text-[var(--color-text-mute)]">
              Three ways to work together. Brand + site as one piece, ongoing care once you&apos;re live, or just the slice you need.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Section 1: Brand + Site (the launch) */}
      <Section tone="surface" spacing="xl">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <Tag>The launch</Tag>
              <h2 className="h2 mt-6 text-balance">
                Brand + site, launched together.
              </h2>
              <p className="text-big mt-6 text-[var(--color-text-mute)]">
                From £2,500.
              </p>
              <div className="mt-8">
                <ButtonLink href="/start" variant="primary" size="lg" withArrow>
                  Start a project
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <div className="grid gap-12 md:col-span-8 md:grid-cols-2">
            <Reveal delay={0.05}>
              <div>
                <p className="label text-[var(--color-text-soft)]">
                  What&apos;s included
                </p>
                <ul className="mt-4 space-y-3 text-body text-[var(--color-text)]">
                  {LAUNCH_INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-text-mute)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="label text-[var(--color-text-soft)]">
                  What you bring
                </p>
                <ul className="mt-4 space-y-3 text-body text-[var(--color-text)]">
                  {LAUNCH_YOU_BRING.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-text-mute)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-small mt-6 text-[var(--color-text-mute)]">
                  If you&apos;d rather not, content services can be added on top, à la carte.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Section 2: Ongoing care */}
      <Section tone="bg" spacing="xl">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <Tag>Ongoing care</Tag>
              <h2 className="h2 mt-6 text-balance">After launch.</h2>
              <p className="text-big mt-6 text-[var(--color-text-mute)]">
                Pricing on enquiry.
              </p>
              <div className="mt-8">
                <ButtonLink href="/contact" variant="secondary" size="lg">
                  Get in touch
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.05}>
              <p className="text-big text-[var(--color-text)]">
                The retainer covers technical upkeep: site updates, iterations, hosting, fixes. Content work like copywriting or photography is scoped separately, à la carte.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Section 3: À la carte */}
      <Section tone="surface" spacing="xl">
        <div className="mb-12 max-w-3xl">
          <Reveal>
            <Tag>À la carte</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h2 mt-6 text-balance">Just the slice you need.</h2>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ALA_CARTE.map((slice, i) => (
            <Reveal key={slice.title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-8">
                <h3 className="h3 text-balance">{slice.title}</h3>
                <p className="text-body mt-4 text-[var(--color-text-mute)]">
                  {slice.body}
                </p>
                <p className="text-small mt-6 text-[var(--color-text-mute)]">
                  Pricing on enquiry.
                </p>
                <div className="mt-auto pt-8">
                  <ButtonLink href="/start" variant="secondary" size="md">
                    Start a project
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Section 4: Process, reuse existing component (tone=bg so it
          alternates from the À la carte section above). */}
      <ProcessSteps tone="bg" />

      <CTAStrip />
    </>
  );
}
