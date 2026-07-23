import { Section } from '@/components/layout/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';

/**
 * Promotes the free site review as a low-commitment entry point for visitors
 * who are not ready to start a project. Accent band so it reads as an offer,
 * not another content section.
 */
export function FreeReviewBand() {
  return (
    <Section tone="accent" spacing="l">
      <div className="grid items-center gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <Reveal>
            <p className="label text-[var(--color-on-accent)] opacity-80">Not ready to commit?</p>
            <h2 className="h2 mt-4 max-w-2xl text-balance">
              Get a free, honest audit of your current site.
            </h2>
            <p className="text-big mt-4 max-w-xl text-[var(--color-on-accent)] opacity-90">
              A short video walkthrough of what is working, what is costing you
              customers, and what we would fix first. Yours to keep, whether you
              build with us or not.
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-4 md:text-right">
          <Reveal delay={0.1}>
            <ButtonLink href="/free-site-review" variant="primary" size="lg" withArrow>
              Request your free audit
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
