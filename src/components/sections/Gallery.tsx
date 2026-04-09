import { Reveal } from '@/components/animations/Reveal';
import { cn } from '@/lib/cn';
import type { GalleryItem, GalleryLayout } from '@/lib/mdx';

type GalleryProps = {
  items: GalleryItem[];
};

type Row =
  | { kind: 'single'; layout: GalleryLayout; item: GalleryItem }
  | { kind: 'group'; layout: 'half' | 'third'; items: GalleryItem[] }
  | { kind: 'feature'; layout: 'feature-left' | 'feature-right'; item: GalleryItem };

/**
 * Group consecutive `half`/`third` items into a row, leave everything else
 * as standalone rows. The result is an editorial spread, not a uniform grid.
 */
function buildRows(items: GalleryItem[]): Row[] {
  const rows: Row[] = [];
  let i = 0;

  while (i < items.length) {
    const item = items[i];
    const layout = item.layout ?? 'wide';

    if (layout === 'half') {
      const group = [item];
      while (i + 1 < items.length && (items[i + 1].layout ?? 'wide') === 'half') {
        group.push(items[i + 1]);
        i += 1;
        if (group.length === 2) break;
      }
      rows.push({ kind: 'group', layout: 'half', items: group });
      i += 1;
      continue;
    }

    if (layout === 'third') {
      const group = [item];
      while (i + 1 < items.length && (items[i + 1].layout ?? 'wide') === 'third') {
        group.push(items[i + 1]);
        i += 1;
        if (group.length === 3) break;
      }
      rows.push({ kind: 'group', layout: 'third', items: group });
      i += 1;
      continue;
    }

    if (layout === 'feature-left' || layout === 'feature-right') {
      rows.push({ kind: 'feature', layout, item });
      i += 1;
      continue;
    }

    rows.push({ kind: 'single', layout, item });
    i += 1;
  }

  return rows;
}

const ASPECT_CLASS: Record<NonNullable<GalleryItem['aspect']>, string> = {
  '16:9': 'aspect-[16/9]',
  '4:5': 'aspect-[4/5]',
  '1:1': 'aspect-square',
  '3:2': 'aspect-[3/2]',
  auto: '',
};

function Figure({ item, className }: { item: GalleryItem; className?: string }) {
  const aspect = item.aspect ? ASPECT_CLASS[item.aspect] : '';
  const showBg = !!item.bg;

  return (
    <figure className={className}>
      <div
        className={cn(
          'overflow-hidden rounded-[var(--radius-l)]',
          aspect,
          showBg ? '' : 'bg-[var(--color-bg)]',
        )}
        style={showBg ? { background: item.bg } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className={cn(
            'block w-full',
            aspect ? 'h-full object-cover' : 'h-auto',
          )}
        />
      </div>
      {item.caption && (
        <figcaption className="text-small mt-3 text-[var(--color-text-soft)]">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Gallery({ items }: GalleryProps) {
  const rows = buildRows(items);

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      {rows.map((row, idx) => {
        if (row.kind === 'single') {
          const widthClass =
            row.layout === 'hero'
              ? 'w-full'
              : row.layout === 'wide'
                ? 'mx-auto max-w-5xl'
                : 'mx-auto max-w-2xl';
          return (
            <Reveal key={idx} className={widthClass}>
              <Figure item={row.item} />
            </Reveal>
          );
        }

        if (row.kind === 'group') {
          const colsClass =
            row.layout === 'half'
              ? 'md:grid-cols-2'
              : 'md:grid-cols-3';
          return (
            <div key={idx} className={cn('grid gap-6 md:gap-10', colsClass)}>
              {row.items.map((item, i) => (
                <Reveal key={item.src} delay={i * 0.05}>
                  <Figure item={item} />
                </Reveal>
              ))}
            </div>
          );
        }

        // Feature: image + caption split, alternating sides
        const imageOnLeft = row.layout === 'feature-left';
        return (
          <div key={idx} className="grid gap-8 md:grid-cols-12 md:gap-12">
            <div className={cn('md:col-span-8', !imageOnLeft && 'md:order-2')}>
              <Reveal>
                <Figure item={row.item} />
              </Reveal>
            </div>
            <div
              className={cn(
                'flex flex-col justify-center md:col-span-4',
                !imageOnLeft && 'md:order-1',
              )}
            >
              <Reveal delay={0.1}>
                {row.item.caption && (
                  <p className="text-big text-balance text-[var(--color-text-mute)]">
                    {row.item.caption}
                  </p>
                )}
              </Reveal>
            </div>
          </div>
        );
      })}
    </div>
  );
}
