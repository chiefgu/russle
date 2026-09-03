import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { PageHeader } from '@/components/sections/PageHeader';
import { ContactForm } from '@/components/sections/ContactForm';
import { InfoPanel } from '@/components/sections/InfoPanel';
import { CalEmbed } from '@/components/sections/CalEmbed';
import { Reveal } from '@/components/animations/Reveal';
import { Tag } from '@/components/ui/Tag';

export const metadata: Metadata = {
  title: 'Contact the studio',
  description:
    'Talk to russle about a new project or an existing one. Drop a line, or book a quick chat.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Have a question?"
        sub="Or not ready to start yet. Drop a line, book a quick chat, or head to /start when you're ready."
      />

      <Section tone="bg" spacing="xl" container="main" className="pt-0 md:pt-0">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <InfoPanel />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="surface" spacing="xl" container="main">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <Tag as="h2">What happens next</Tag>
              <p className="h2 mt-6 text-balance">No pitch deck, just a conversation.</p>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.05}>
              <p className="text-body text-[var(--color-text-mute)]">
                Send a message and you get a reply from the person who would do the
                work, usually the same working day. The first conversation is a
                short call or an exchange of emails about what the business needs,
                what already exists, and whether we are a fit. Nothing is charged
                for that, and you are not handed to an account manager afterwards.
              </p>
              <p className="text-body mt-6 text-[var(--color-text-mute)]">
                If it looks like a fit, the next step is a written proposal: what we
                would build, in what order, and how long it takes. If it is not a
                fit, we will say so and point you somewhere better.
              </p>
              <p className="text-body mt-6 text-[var(--color-text-mute)]">
                The studio is based in Alderley Edge, so meeting in person is easy
                anywhere in Cheshire or South Manchester, from Wilmslow and
                Knutsford to Altrincham and Didsbury. We work with clients across
                the UK and abroad the rest of the time, over calls and shared
                previews, so distance has never been the deciding factor.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <CalEmbed />
    </>
  );
}
