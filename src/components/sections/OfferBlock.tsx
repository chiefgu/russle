import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';

const STEPS = [
  {
    title: 'We build it',
    body: 'A custom website or online store, designed and built from scratch on our own platform. A one-off project, shipped and yours.',
    links: [
      { label: 'See web design', href: '/web-design' },
      { label: 'See ecommerce', href: '/ecommerce' },
    ],
  },
  {
    title: 'We keep you found',
    body: 'Once you are live, we run the SEO that grows your traffic and keeps everything healthy. An ongoing arrangement, no long-term contract.',
    links: [{ label: 'See SEO', href: '/seo' }],
  },
];

export function OfferBlock() {
  return (
    <Section tone="bg" spacing="xl">
      <div className="mb-12 max-w-3xl">
        <Reveal><Tag>How to work with us</Tag></Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2 mt-6 text-balance">Build once, then get found.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
            We build your site or store, then keep customers coming with ongoing SEO. Start a project and we will scope the right shape with you.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.05}>
            <div className="flex h-full flex-col rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-8 md:p-10">
              <h3 className="h3 text-balance">{step.title}</h3>
              <p className="text-body mt-4 text-[var(--color-text-mute)]">{step.body}</p>
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                {step.links.map((link, j) => (
                  <ButtonLink key={link.href} href={link.href} variant={j === 0 ? 'primary' : 'secondary'} size="md" withArrow={j === 0}>
                    {link.label}
                  </ButtonLink>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <ButtonLink href="/start" variant="ghost" size="md" withArrow>Start a project</ButtonLink>
      </div>
    </Section>
  );
}
