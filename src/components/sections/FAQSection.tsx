import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import { Reveal } from '@/components/animations/Reveal';

const ITEMS: FAQItem[] = [
  {
    q: 'How long does a launch take?',
    a: 'Four to six weeks from kickoff to live, depending on scope. Most projects land around five.',
  },
  {
    q: 'What if I already have a brand or logo?',
    a: "That's fine. Book just the website portion à la carte. See services.",
  },
  {
    q: 'Will you write my content?',
    a: 'Content (copy, photography, social, ads) sits on top of the £2,500 base, à la carte. If you bring your own copy and photos, the base launch covers the rest.',
  },
  {
    q: 'What does ongoing care cover?',
    a: "Site updates, post-launch iterations, hosting and domain management, and small fixes. It's technical, not editorial.",
  },
  {
    q: "What if I'm not sure exactly what I need yet?",
    a: "That's what start is for. The eight questions take five minutes and surface the scope by asking the right things, even if you don't know where you'll land.",
  },
  {
    q: 'Where are you based, and who am I working with?',
    a: "I'm Henry. Independent, UK-based. You'll work with me directly through the whole project, not a project manager and a junior.",
  },
  {
    q: 'Can we talk before I fill in the form?',
    a: "Yes. There's a quiet booking link on the contact page. Most clients find the intake form a faster way in, but talking first is fine if you'd prefer.",
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
