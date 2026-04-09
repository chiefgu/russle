import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';

type TestimonialProps = {
  quote: string;
  author: string;
  role: string;
  company?: string;
};

export function Testimonial({ quote, author, role, company }: TestimonialProps) {
  return (
    <Section tone="bg" spacing="l" container="narrow">
      <Reveal>
        <blockquote className="text-center">
          <p className="h3 text-balance">&ldquo;{quote}&rdquo;</p>
          <footer className="mt-10">
            <p className="text-body text-[var(--color-text)]">{author}</p>
            <p className="text-small text-[var(--color-text-mute)]">
              {role}
              {company && ` · ${company}`}
            </p>
          </footer>
        </blockquote>
      </Reveal>
    </Section>
  );
}
