import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import { Reveal } from '@/components/animations/Reveal';

const ITEMS: FAQItem[] = [
  {
    q: 'How long does a project take?',
    a: 'Most websites take 4–12 weeks from kickoff to launch, depending on scope. Brand-only projects are 2–4 weeks. I take one project at a time, so the timeline is about how much you can review — not how busy I am.',
  },
  {
    q: 'How much does it cost?',
    a: 'Most websites land between £4k and £15k depending on scope. Branding is £2k–£8k. I quote a fixed price after the discovery call — no hourly games.',
  },
  {
    q: 'Do you work with agencies?',
    a: 'Yes — happy to white-label or work as part of a larger team. Get in touch with the agency name and what you need.',
  },
  {
    q: 'What stack do you build on?',
    a: "Depends on the project. For custom marketing sites and product work it's usually Next.js + Tailwind on the front end with a custom backend (NestJS, Prisma, Postgres, Stripe, Resend). For lower-touch builds it's Squarespace with the defaults torn out — same standard of design, half the maintenance. The right tool always beats the favourite tool.",
  },
  {
    q: 'Will I be able to update the site myself?',
    a: "Yes. The right answer depends on the platform. Squarespace lets you edit everything inline. On a custom build it's usually a small CMS layer (Sanity or Payload) or Markdown files in a repo. We choose during discovery, based on how often you'll actually update things.",
  },
  {
    q: 'What if I already have a brand?',
    a: "Even better — I'll work inside your existing system. The brand-direction doc still gets written, just inheriting your tokens.",
  },
];

export function FAQSection() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <Tag>FAQ</Tag>
            <h2 className="h2 mt-6 text-balance">Common questions.</h2>
            <p className="text-body mt-6 max-w-sm text-[var(--color-text-mute)]">
              Can&apos;t see what you&apos;re looking for? Just{' '}
              <a href="mailto:hello@russle.co.uk" className="link">
                email me
              </a>
              .
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal delay={0.05}>
            <FAQ items={ITEMS} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
