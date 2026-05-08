import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';

// Soft dot overlay. Lives on top of --color-bg and fades to invisible
// toward the headline via a radial mask, so it reads as ambient texture,
// never a section.
const DOT_PATTERN = 'radial-gradient(circle, rgba(26,20,16,0.28) 1.2px, transparent 1.8px)';
const DOT_MASK = 'radial-gradient(ellipse at center, transparent 0%, transparent 35%, black 95%)';

export function Hero() {
  return (
    <Section
      tone="bg"
      spacing="heroTopTight"
      container="main"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: DOT_PATTERN,
          backgroundSize: '24px 24px',
          maskImage: DOT_MASK,
          WebkitMaskImage: DOT_MASK,
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <Reveal>
          <Tag tone="accent">Independent studio</Tag>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="h1 mt-6 text-balance text-[var(--color-text)]">
            Brand, website, and the systems that grow them.
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-big mx-auto mt-8 max-w-2xl text-balance text-[var(--color-text-mute)]">
            We design the brand, build the website, then run the search, email, and local marketing that grows it. From £2,500.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/start" variant="primary" size="lg" withArrow>
              Start a project
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary" size="lg">
              See the work
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mx-auto mt-16 flex flex-col items-center justify-center gap-3 text-body text-[var(--color-text-mute)] sm:flex-row sm:gap-6">
            <span>From £2,500</span>
            <span aria-hidden className="hidden h-4 w-px bg-[var(--color-line-2)] sm:block" />
            <span>Live in 4&ndash;6 weeks</span>
            <span aria-hidden className="hidden h-4 w-px bg-[var(--color-line-2)] sm:block" />
            <span>One studio, brand to growth</span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
