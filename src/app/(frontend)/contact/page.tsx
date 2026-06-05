import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { PageHeader } from '@/components/sections/PageHeader';
import { ContactForm } from '@/components/sections/ContactForm';
import { InfoPanel } from '@/components/sections/InfoPanel';
import { CalEmbed } from '@/components/sections/CalEmbed';
import { Reveal } from '@/components/animations/Reveal';

export const metadata: Metadata = {
  title: 'Contact the studio',
  description:
    'Talk to russle about a new project or an existing one. Drop a line, or book a quick chat.',
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

      <CalEmbed />
    </>
  );
}
