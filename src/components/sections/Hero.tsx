import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal, Stagger, StaggerItem } from '@/components/animations/Reveal';

export function Hero() {
  return (
    <Section tone="bg" spacing="heroTop" container="main">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <Tag tone="default">Independent studio</Tag>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="h1 mt-6 text-balance text-[var(--color-text)]">
            A studio for founders, teams, and anyone who cares how things look, feel, and work.
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-big mx-auto mt-8 max-w-2xl text-balance text-[var(--color-text-mute)]">
            A one-person practice running discovery, design, build, and brand integration on every project — start to finish, by the same hands.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/start" variant="accent" size="lg" withArrow>
              Start a project
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary" size="lg">
              See the work
            </ButtonLink>
          </div>
        </Reveal>

        <Stagger className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] sm:grid-cols-3">
          {[
            { label: 'Design', value: 'Brand systems, UI, prototyping' },
            { label: 'Build', value: 'Next.js, Squarespace, custom code' },
            { label: 'Brand', value: 'Identity, voice, integration' },
          ].map((c) => (
            <StaggerItem
              key={c.label}
              className="bg-[var(--color-bg)] p-6 text-left"
            >
              <p className="label text-[var(--color-text-soft)]">{c.label}</p>
              <p className="text-body mt-2 text-[var(--color-text)]">{c.value}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
