import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';
import type { WorkMeta } from '@/lib/mdx';

type CaseStudyShowcaseProps = {
  items: WorkMeta[];
};

export function CaseStudyShowcase({ items }: CaseStudyShowcaseProps) {
  return (
    <>
      {items.map((item, i) => (
        <CaseStudyBand key={item.slug} item={item} flip={i % 2 === 1} />
      ))}
    </>
  );
}

function CaseStudyBand({ item, flip }: { item: WorkMeta; flip: boolean }) {
  const onBackdrop =
    item.backdropTone === 'light'
      ? 'text-[var(--color-on-dark)]'
      : 'text-[var(--color-text)]';
  const onBackdropMute =
    item.backdropTone === 'light'
      ? 'text-[var(--color-on-dark-mute)]'
      : 'text-[var(--color-text-mute)]';
  const labelMute =
    item.backdropTone === 'light' ? 'text-white/50' : 'text-black/50';
  const chipBorder =
    item.backdropTone === 'light'
      ? 'border-white/20 text-white/80'
      : 'border-black/15 text-black/70';
  const arrowBorder =
    item.backdropTone === 'light'
      ? 'border-white/30 hover:bg-white hover:text-[var(--color-text)]'
      : 'border-black/20 hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]';

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: item.backdropColor }}
    >
      <Container size="main">
        <div
          className={`grid items-center gap-12 md:grid-cols-12 md:gap-16 ${
            flip ? 'md:[direction:rtl]' : ''
          }`}
        >
          {/* Text side */}
          <div className={`md:col-span-6 ${flip ? 'md:[direction:ltr]' : ''}`}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <Tag tone={item.backdropTone === 'light' ? 'on-dark' : 'default'}>
                  Selected work
                </Tag>
                {item.tags?.slice(0, 2).map((t) => (
                  <Tag
                    key={t}
                    tone={item.backdropTone === 'light' ? 'on-dark' : 'default'}
                    withDot={false}
                  >
                    {t}
                  </Tag>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className={`h2 mt-6 text-balance ${onBackdrop}`}>
                {item.title}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className={`text-big mt-6 max-w-2xl ${onBackdropMute}`}>
                {item.summary}
              </p>
            </Reveal>

            {item.scope && item.scope.length > 0 && (
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <p className={`label mr-2 ${labelMute}`}>Scope</p>
                  {item.scope.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className={`rounded-[var(--radius-pill)] border px-3 py-1 text-small ${chipBorder}`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  href={`/work/${item.slug}`}
                  className={`group inline-flex items-center gap-3 ${onBackdrop}`}
                >
                  <span className="text-big font-medium">See case study</span>
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all group-hover:translate-x-1 group-hover:-translate-y-1 ${arrowBorder}`}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Link>
                {item.status === 'live' && item.live && (
                  <a
                    href={item.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-body inline-flex items-center gap-1 hover:opacity-70 transition-opacity ${onBackdropMute}`}
                  >
                    Visit site
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
                {item.status === 'launching-soon' && (
                  <span className={`text-body ${onBackdropMute}`}>
                    Launching soon
                  </span>
                )}
              </div>
            </Reveal>
          </div>

          {/* Cover side */}
          <div className={`md:col-span-6 ${flip ? 'md:[direction:ltr]' : ''}`}>
            <Reveal delay={0.1}>
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[var(--radius-l)] p-6 md:p-10">
                {item.cover ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.cover}
                    alt={`${item.title} cover`}
                    className="max-h-full max-w-full rounded-[var(--radius-m)] object-contain shadow-2xl"
                  />
                ) : (
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
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
