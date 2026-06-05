import { Section } from '@/components/layout/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';

export default function NotFound() {
  return (
    <Section tone="bg" spacing="heroTop" container="narrow">
      <div className="text-center">
        <Tag>404</Tag>
        <h1 className="h1 mt-6">Nothing here.</h1>
        <p className="text-big mt-8 text-[var(--color-text-mute)]">
          The page you&apos;re after doesn&apos;t exist. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="primary" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/work" variant="secondary" size="lg">
            See the work
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
