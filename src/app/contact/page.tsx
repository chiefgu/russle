import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { PageHeader } from '@/components/sections/PageHeader';
import { ContactForm } from '@/components/sections/ContactForm';
import { InfoPanel } from '@/components/sections/InfoPanel';
import { CalEmbed } from '@/components/sections/CalEmbed';
import { Reveal } from '@/components/animations/Reveal';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Got a project in mind, or a question about the work?',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Let's talk."
        sub="Got a project in mind, or a question about the work?"
      />

      <Section tone="bg" spacing="l" container="main">
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
