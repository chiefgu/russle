import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Tag } from '@/components/ui/Tag';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { Reveal } from '@/components/animations/Reveal';
import { ProjectBackdrop } from '@/components/sections/ProjectBackdrop';
import { DesignNotes } from '@/components/sections/DesignNotes';
import { Gallery } from '@/components/sections/Gallery';
import { CaseStudyBody } from '@/components/sections/CaseStudyBody';
import { getAllWork, getWorkBySlug, getWorkSlugs } from '@/lib/mdx';

type Params = { slug: string };

export async function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getWorkBySlug(slug);
  if (!post) return { title: 'Not found' };
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: `${post.title} — russle`,
      description: post.summary,
      images: post.cover ? [{ url: post.cover }] : [{ url: '/og.png' }],
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getWorkBySlug(slug);
  if (!post) notFound();

  const all = getAllWork();
  const idx = all.findIndex((p) => p.slug === slug);
  const next = all[(idx + 1) % all.length];

  const onBackdrop =
    post.backdropTone === 'light'
      ? 'text-[var(--color-on-dark)]'
      : 'text-[var(--color-text)]';
  const onBackdropMute =
    post.backdropTone === 'light'
      ? 'text-[var(--color-on-dark-mute)]'
      : 'text-[var(--color-text-mute)]';

  // When the case study hero is dark (light text on dark backdrop), the
  // navbar's default dark text becomes invisible while sitting transparently
  // over the hero. Override the navbar text variables — but only for the
  // un-scrolled state, so the cream-filled scrolled state still uses dark text.
  const navOverride =
    post.backdropTone === 'light'
      ? `header[data-navbar][data-scrolled="false"] {
          --nav-text: var(--color-on-dark);
          --nav-text-mute: var(--color-on-dark-mute);
          --nav-border: rgba(248, 247, 245, 0.20);
        }`
      : null;

  return (
    <>
      {navOverride && (
        <style dangerouslySetInnerHTML={{ __html: navOverride }} />
      )}
      {/* Backdrop hero — full-bleed brand colour with project hero crop */}
      <ProjectBackdrop
        backdropColor={post.backdropColor}
        backdropTone={post.backdropTone}
      >
        <Container size="main">
          <div className="max-w-5xl pt-[140px] md:pt-[180px]">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                {post.tags?.map((t) => (
                  <Tag key={t} tone={post.backdropTone === 'light' ? 'on-dark' : 'default'}>
                    {t}
                  </Tag>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className={`h1 mt-6 text-balance ${onBackdrop}`}>{post.title}</h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className={`text-big mt-8 max-w-2xl ${onBackdropMute}`}>
                {post.summary}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div
                className={`mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t pt-8 md:grid-cols-5 ${
                  post.backdropTone === 'light'
                    ? 'border-white/15'
                    : 'border-black/10'
                }`}
              >
                <Meta label="Client" value={post.client} tone={post.backdropTone} />
                <Meta label="Sector" value={post.sector} tone={post.backdropTone} />
                <Meta label="Year" value={post.year} tone={post.backdropTone} />
                <Meta label="Role" value={post.role} tone={post.backdropTone} />
                {post.live && (
                  <div>
                    <p
                      className={`label ${
                        post.backdropTone === 'light'
                          ? 'text-white/50'
                          : 'text-black/50'
                      }`}
                    >
                      Live
                    </p>
                    <a
                      href={post.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-body mt-2 inline-flex items-center gap-1 hover:opacity-70 transition-opacity ${onBackdrop}`}
                    >
                      Visit site
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Cover image — natural aspect, sits on the brand backdrop */}
          {post.cover && (
            <Reveal delay={0.3}>
              <div className="mt-16 flex justify-center md:mt-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.cover}
                  alt={`${post.title} hero`}
                  className="block h-auto max-h-[80vh] w-auto max-w-full rounded-[var(--radius-l)] shadow-2xl"
                />
              </div>
            </Reveal>
          )}
          {!post.cover && (
            <Reveal delay={0.3}>
              <div
                className="mt-16 flex aspect-[16/9] w-full items-center justify-center rounded-[var(--radius-l)] md:mt-24"
                style={{
                  background:
                    post.backdropTone === 'light'
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(0,0,0,0.06)',
                }}
              >
                <span
                  className={`text-[18vw] font-medium leading-none tracking-[-0.07em] md:text-[10vw] ${
                    post.backdropTone === 'light'
                      ? 'text-white/15'
                      : 'text-black/15'
                  }`}
                >
                  {post.client}
                </span>
              </div>
            </Reveal>
          )}

          {/* Bottom padding inside the backdrop */}
          <div className="h-20 md:h-32" />
        </Container>
      </ProjectBackdrop>

      {/* Body — two-column with design notes sidebar */}
      <Section tone="bg" spacing="xl" container="main">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-8">
            <CaseStudyBody body={post.body} />
          </div>
          <aside className="md:col-span-4 md:border-l md:border-[var(--color-line)] md:pl-12">
            <DesignNotes
              palette={post.palette}
              fonts={post.fonts}
              stack={post.stack}
              accentColor={post.accentColor || post.backdropColor}
            />
          </aside>
        </div>
      </Section>

      {/* Gallery — varying-width image stack */}
      {post.gallery && post.gallery.length > 0 && (
        <Section tone="surface" spacing="l" container="main">
          <Gallery items={post.gallery} />
        </Section>
      )}

      {/* Next case */}
      {next && next.slug !== post.slug && (
        <Link href={`/work/${next.slug}`} className="group block">
          <Section
            tone="bg"
            spacing="l"
            container="main"
            className="border-t border-[var(--color-line)]"
          >
            <div className="flex items-center justify-between gap-6">
              <div>
                <p className="label text-[var(--color-text-soft)]">Next project</p>
                <p className="h2 mt-3 transition-colors group-hover:text-[var(--color-accent)]">
                  {next.title}
                </p>
              </div>
              <div
                className="hidden h-20 w-20 shrink-0 rounded-[var(--radius-l)] md:block"
                style={{ background: next.backdropColor }}
                aria-hidden
              />
              <ArrowUpRight className="h-12 w-12 shrink-0 text-[var(--color-text)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </Section>
        </Link>
      )}

      <CTAStrip />
    </>
  );
}

function Meta({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'light' | 'dark';
}) {
  return (
    <div>
      <p
        className={`label ${
          tone === 'light' ? 'text-white/50' : 'text-black/50'
        }`}
      >
        {label}
      </p>
      <p
        className={`text-body mt-2 ${
          tone === 'light'
            ? 'text-[var(--color-on-dark)]'
            : 'text-[var(--color-text)]'
        }`}
      >
        {value}
      </p>
    </div>
  );
}
