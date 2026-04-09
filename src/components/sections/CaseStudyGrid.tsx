import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/animations/Reveal';
import type { WorkMeta } from '@/lib/mdx';

type CaseStudyGridProps = {
  items: WorkMeta[];
  variant?: 'home' | 'index';
  showHeader?: boolean;
};

export function CaseStudyGrid({ items, variant = 'home', showHeader = true }: CaseStudyGridProps) {
  const cols = variant === 'home' ? 'md:grid-cols-3' : 'md:grid-cols-2';

  return (
    <Section tone="bg" spacing="xl">
      {showHeader && (
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Tag>Selected work</Tag>
            <h2 className="h2 mt-6 max-w-md text-balance">Recent projects.</h2>
          </Reveal>
          {variant === 'home' && (
            <Reveal delay={0.1}>
              <ButtonLink href="/work" variant="ghost" withArrow>
                All projects
              </ButtonLink>
            </Reveal>
          )}
        </div>
      )}

      <Stagger className={`grid gap-6 sm:grid-cols-2 ${cols}`}>
        {items.map((item) => (
          <StaggerItem key={item.slug}>
            <Link
              href={`/work/${item.slug}`}
              className="group block overflow-hidden rounded-[var(--radius-l)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Backdrop colour stage with the project hero */}
              <div
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden p-6 md:p-8"
                style={{ background: item.backdropColor }}
              >
                {item.cover ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.cover}
                    alt={`${item.title} cover`}
                    className="max-h-full max-w-full rounded-[var(--radius-m)] object-contain shadow-2xl"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span
                      className="text-[18vw] font-medium leading-none tracking-[-0.07em] sm:text-[14vw] md:text-[8vw]"
                      style={{
                        color:
                          item.backdropTone === 'light'
                            ? 'rgba(255,255,255,0.16)'
                            : 'rgba(0,0,0,0.16)',
                      }}
                    >
                      {item.client.split(' ')[0]}
                    </span>
                  </div>
                )}

                {/* Tags overlay */}
                {item.tags && item.tags.length > 0 && (
                  <div className="absolute left-6 top-6 flex flex-wrap gap-2 md:left-8 md:top-8">
                    {item.tags.slice(0, 2).map((t) => (
                      <Tag
                        key={t}
                        tone={item.backdropTone === 'light' ? 'on-dark' : 'default'}
                        withDot={false}
                      >
                        {t}
                      </Tag>
                    ))}
                  </div>
                )}
              </div>

              {/* Card meta on cream background */}
              <div className="flex items-start justify-between gap-4 bg-[var(--color-bg)] p-6 md:p-8">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="label text-[var(--color-text-soft)]">{item.year}</span>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--color-text-soft)]" />
                    <span className="label text-[var(--color-text-soft)]">{item.sector}</span>
                  </div>
                  <h3 className="h5 mt-3 text-balance">{item.title}</h3>
                  <p className="text-body mt-2 line-clamp-2 text-[var(--color-text-mute)]">
                    {item.summary}
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-line-2)] transition-all group-hover:bg-[var(--color-text)] group-hover:text-[var(--color-bg)] group-hover:border-transparent">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
