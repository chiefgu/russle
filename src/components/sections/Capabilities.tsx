import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';
import { CapabilitiesGrid } from '@/components/sections/CapabilitiesGrid';

export function Capabilities() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="mb-10 max-w-3xl md:hidden">
        <Reveal>
          <Tag>What we can do for you</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h3 mt-6 text-balance">
            What we build.
          </h2>
        </Reveal>
      </div>

      <CapabilitiesGrid />

      <Reveal delay={0.1}>
        <div className="mt-10">
          <ButtonLink href="/conversion" variant="secondary" size="lg" withArrow>
            See how we make sites convert
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
