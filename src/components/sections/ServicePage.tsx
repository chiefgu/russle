import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { FAQ } from '@/components/ui/FAQ';
import { Reveal } from '@/components/animations/Reveal';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { JsonLd } from '@/components/seo/JsonLd';

export type ServicePageData = {
  slug: 'web-design' | 'ecommerce' | 'seo';
  tag: string;
  h1: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  included: { title: string; body: string }[];
  how: string[];
  caseStudy?: { slug: string; title: string; line: string };
  faq: { q: string; a: string }[];
  schema: Record<string, unknown>;
};

export function ServicePage({ data }: { data: ServicePageData }) {
  return (
    <>
      <JsonLd data={data.schema} />

      <Section tone="bg" spacing="heroTopTight">
        <div className="max-w-3xl">
          <Reveal><Tag tone="accent">{data.tag}</Tag></Reveal>
          <Reveal delay={0.05}>
            <h1 className="h1 mt-6 text-balance">{data.h1}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">{data.intro}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/start" variant="primary" size="lg" withArrow>Start a project</ButtonLink>
              <ButtonLink href="/work" variant="secondary" size="lg">See the work</ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="bg" spacing="xl">
        <div className="mb-10 max-w-3xl">
          <Reveal><Tag>What you get</Tag></Reveal>
        </div>
        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
            {data.included.map((item) => (
              <div key={item.title} className="flex h-full flex-col bg-[var(--color-bg)] p-8 md:p-10">
                <h3 className="h5 text-balance">{item.title}</h3>
                <p className="text-body mt-4 text-[var(--color-text-mute)]">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="surface" spacing="xl">
        <div className="mb-10 max-w-2xl">
          <Reveal><Tag>How it works</Tag></Reveal>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)]">
          {data.how.map((step, i) => (
            <Reveal key={step} delay={i * 0.05}>
              <li className="grid gap-6 bg-[var(--color-surface)] p-8 md:grid-cols-12 md:p-12">
                <div className="md:col-span-2">
                  <span className="text-h3 font-medium tracking-[-0.04em] text-[var(--color-text-soft)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="md:col-span-10">
                  <p className="text-big text-[var(--color-text)]">{step}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {data.caseStudy && (
        <Section tone="bg" spacing="xl">
          <Reveal>
            <div className="rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-10 md:p-12">
              <p className="label text-[var(--color-text-soft)]">Proof</p>
              <p className="text-big mt-4 max-w-2xl text-[var(--color-text)]">{data.caseStudy.line}</p>
              <div className="mt-8">
                <ButtonLink href={`/work/${data.caseStudy.slug}`} variant="secondary" size="md" withArrow>
                  Read the {data.caseStudy.title} case study
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Section>
      )}

      <Section tone="surface" spacing="xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <Tag>Common questions</Tag>
              <h2 className="h2 mt-6 text-balance">Straight answers.</h2>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.05}><FAQ items={data.faq} /></Reveal>
          </div>
        </div>
      </Section>

      <CTAStrip />
    </>
  );
}
