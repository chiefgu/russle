import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { FAQ, type FAQItem } from '@/components/ui/FAQ';
import { Reveal } from '@/components/animations/Reveal';

const ITEMS: FAQItem[] = [
  {
    q: 'How long does a build take?',
    a: 'As soon as 14 days when everything is ready, four to six weeks for most, depending on scope.',
  },
  {
    q: 'Why not just use a Squarespace template?',
    a: 'Templates are free, and every competitor can buy the same one. We build something only you have, on a setup you actually own. No monthly subscription to a website builder, no per-sale fees.',
  },
  {
    q: 'Why not just use a full-service agency?',
    a: 'You can, and for some businesses that is the right call. With russle you work with the senior people doing the work, not an account manager relaying messages to juniors. Design, build, and SEO sit in one team, so nothing gets lost in the handoffs that make agencies slow.',
  },
  {
    q: 'Do I need a brand first?',
    a: 'No. If you have a logo and colours we build around them. If you do not, we keep it clean and simple, and we can create an identity as part of the project if you want one.',
  },
  {
    q: 'Will you write my content?',
    a: 'Yes, writing and content sit inside the SEO work, or on top of any build. If you bring your own words and photos, the build covers the rest.',
  },
  {
    q: 'What does the SEO retainer cover?',
    a: 'Technical SEO, content, rankings and reporting, AI search visibility, and keeping the site healthy month to month. It is the work that turns a website into a channel that brings customers in.',
  },
  {
    q: "What if I'm not sure exactly what I need yet?",
    a: 'That is what start is for. A few short questions surface the scope by asking the right things, even if you do not know where you will land.',
  },
  {
    q: 'Where are you based, and who am I working with?',
    a: 'russle is an independent UK studio. You work directly with the people who design and build your project, not an account manager and a junior.',
  },
  {
    q: 'Can we talk before I fill in the form?',
    a: 'Yes. There is a quiet booking link on the contact page. Most clients find the intake form a faster way in, but talking first is fine if you would prefer.',
  },
];

export function FAQSection() {
  return (
    <Section tone="surface" spacing="xl">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <Tag>FAQ</Tag>
            <h2 className="h2 mt-6 text-balance">Common questions.</h2>
            <p className="text-body mt-6 max-w-sm text-[var(--color-text-mute)]">
              Can&apos;t see what you&apos;re looking for?{' '}
              <a href="mailto:hello@russle.co.uk" className="link">
                Email us
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
