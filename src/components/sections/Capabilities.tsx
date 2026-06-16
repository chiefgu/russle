import {
  Globe,
  Calendar,
  ShoppingBag,
  MapPin,
  Mail,
  Utensils,
  Sparkles,
  BrainCircuit,
  Hammer,
} from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';

const CAPABILITIES = [
  {
    icon: Hammer,
    title: 'Custom builds',
    body: 'If you need something specific that none of these cover, we build it. Almost everything we used to outsource, we now do in-house.',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce stores',
    body: 'Online shops on our own platform. Products, stock, orders, payments. Comes with a dashboard and an iOS app for managing the shop from your phone.',
  },
  {
    icon: Sparkles,
    title: 'AI integrations',
    body: 'Practical AI built into the site. Chatbots that actually answer questions, content help, smart booking, customer support, recommendations.',
  },
  {
    icon: BrainCircuit,
    title: 'AI search optimisation (GEO)',
    body: 'Showing up when people ask ChatGPT, Perplexity, or Google AI Overviews for what you do. Schema, structured content, and brand signals that AI search engines actually read.',
  },
  {
    icon: Globe,
    title: 'Brochure and service-business sites',
    body: 'A clean site that shows what you do, who you do it for, what it costs, and how to get in touch.',
  },
  {
    icon: Calendar,
    title: 'Online booking and reservations',
    body: 'Customers book appointments, classes, or tables directly from your site. Clinics, studios, venues, restaurants, professional services.',
  },
  {
    icon: MapPin,
    title: 'Local SEO and Google Business',
    body: 'Showing up on Google Maps and in the local search results when someone nearby looks for what you do. Set up at launch, maintained every month.',
  },
  {
    icon: Mail,
    title: 'Email marketing',
    body: 'Welcome flows, newsletters, customer follow-ups, promotions. The retention work that keeps the same customer coming back.',
  },
  {
    icon: Utensils,
    title: 'Online ordering for food',
    body: 'Takeaway and pickup orders direct from your site. No third-party app, no commission cut. Yours, on your platform.',
  },
];

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

      <Reveal>
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="flex h-full flex-col bg-[var(--color-bg)] p-8 md:p-10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line-2)] text-[var(--color-accent)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="h5 mt-6 text-balance">{cap.title}</h3>
                <p className="text-body mt-4 text-[var(--color-text-mute)]">
                  {cap.body}
                </p>
              </div>
            );
          })}
        </div>
      </Reveal>

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
