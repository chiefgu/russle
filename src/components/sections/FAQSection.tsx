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
    a: "Templates are free, and every other business in your sector uses the same one. Your brand becomes interchangeable. We build something that's only yours, on a stack you actually own (no platform lock-in, no per-sale fees).",
  },
  {
    q: 'Why not hire a freelancer for a few hundred quid?',
    a: "A cheap freelancer can ship a working site. They can't build a brand and a site that match, and they can't run the SEO, email, and local systems behind it. You end up with three people, three invoices, and three things that don't talk to each other.",
  },
  {
    q: 'Why not go to a proper agency?',
    a: "Agencies bill £15k+ for the launch alone, quote in PowerPoints, and assign your project to a junior. We're the studio you'd hire if you knew where to look. Same standard of work, none of the overhead.",
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
    a: 'Content (copy, photography direction, social) sits in the Manage tier, or on top of any launch à la carte. If you bring your own copy and photos, the base launch covers the rest.',
  },
  {
    q: 'What does Grow actually cover?',
    a: "Site updates and iterations, SEO setup and ongoing optimisation, email marketing setup and campaigns, local business optimisation (Google Business Profile, citations, reviews), and monthly reporting. It's the systems that turn a website into a working sales channel.",
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
