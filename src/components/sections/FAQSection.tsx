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
    q: 'Why not just use a Squarespace template?',
    a: "Templates are free, and every other business in your sector uses the same one. Your brand becomes interchangeable. We build something only you have, on a setup you actually own. No monthly subscription to a website builder, no per-sale fees.",
  },
  {
    q: 'Why not hire a freelancer for a few hundred quid?',
    a: "A cheap freelancer can build a working website. They can't design your brand to match, and they can't run the marketing behind it once you're live. You end up hiring three or four different people for three or four invoices, and nothing actually fits together.",
  },
  {
    q: 'What if I already have a brand?',
    a: "Fine. Book just the website portion à la carte. See services for the breakdown.",
  },
  {
    q: 'What if I don\'t like what you make?',
    a: "After the discovery call, the first thing you get is a brand-direction document and a homepage concept. If either misses, we revise on the studio's time. The launch fee covers two rounds of revision per stage; the goal is alignment, not invoice padding.",
  },
  {
    q: 'Will you write my content?',
    a: 'Writing, photography direction, and social content sit in the Manage tier, or on top of any launch à la carte. If you bring your own words and photos, the base launch covers the rest.',
  },
  {
    q: 'What does Grow actually cover?',
    a: "Site updates and design tweaks, search visibility (showing up on Google), email marketing (welcome flows, customer follow-ups, promotions), local search (Google Business Profile, listings, reviews), and a monthly report in plain English. It's the marketing that turns a website into a working sales channel.",
  },
  {
    q: "What if I'm not sure exactly what I need yet?",
    a: "That's what start is for. The eight questions take five minutes and surface the scope by asking the right things, even if you don't know where you'll land.",
  },
  {
    q: 'Where are you based, and who am I working with?',
    a: "russle is an independent UK studio. You work directly with the team that designs and builds your project, not a project manager and a junior.",
  },
  {
    q: 'Can we talk before I fill in the form?',
    a: "Yes. There's a quiet booking link on the contact page. Most clients find the intake form a faster way in, but talking first is fine if you'd prefer.",
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
                Email the studio
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
