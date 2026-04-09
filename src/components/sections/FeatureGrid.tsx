import { PenTool, Layout, Code, Boxes, Megaphone, RefreshCw } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal, Stagger, StaggerItem } from '@/components/animations/Reveal';

const FEATURES = [
  {
    icon: PenTool,
    title: 'Brand identity',
    body: 'Logos, type systems, colour, voice — and the brand-direction document that anchors every other decision on the project.',
  },
  {
    icon: Layout,
    title: 'Web design',
    body: 'Bespoke layouts and design systems for marketing sites, e-commerce, and product UI. Figma when it helps, the browser whenever I can.',
  },
  {
    icon: Code,
    title: 'Web development',
    body: 'Next.js + Tailwind for custom builds, Squarespace with the defaults torn out for lower-touch ones. The favourite tool never wins — the right tool does.',
  },
  {
    icon: Boxes,
    title: 'Custom features',
    body: 'Multi-step intake forms, bespoke product builders, CRMs, Stripe checkouts, content systems. The interesting half of the build.',
  },
  {
    icon: Megaphone,
    title: 'Launch support',
    body: 'DNS, hosting, transactional email, analytics, and on-call for the first month after launch. The boring bits matter most when something breaks.',
  },
  {
    icon: RefreshCw,
    title: 'Iteration',
    body: 'Most sites get better after launch. I plan a month of iteration into every project so the post-launch surprises actually get fixed.',
  },
];

export function FeatureGrid() {
  return (
    <Section tone="surface" spacing="xl">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <Tag>What I do</Tag>
            <h2 className="h2 mt-6 max-w-md text-balance">
              Three disciplines, one practice.
            </h2>
          </Reveal>
        </div>

        <Stagger className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] sm:grid-cols-2 md:col-span-8">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <StaggerItem
                key={f.title}
                className="group flex flex-col gap-6 bg-[var(--color-surface)] p-8 transition-colors duration-200 hover:bg-[var(--color-surface-2)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-m)] bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-on-accent)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="h6">{f.title}</h3>
                  <p className="text-body mt-3 text-[var(--color-text-mute)]">{f.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
