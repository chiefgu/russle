import Link from 'next/link';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { getAllWork } from '@/lib/mdx';
import { cn } from '@/lib/cn';

type ProofCardProps = {
  slug: string;
  title: string;
  line: string;
  extra?: string;
  /** Card fill; pick the opposite of the section tone so the card reads as a card. */
  fill: 'bg' | 'surface';
};

// The proof / case-study panel: copy left, the case study's cover photo
// filling the right column, whole image linked. Falls back to full-width
// copy when the work entry has no cover.
export function ProofCard({ slug, title, line, extra, fill }: ProofCardProps) {
  const cover = getAllWork().find((w) => w.slug === slug)?.cover;
  const cardFill = fill === 'bg' ? 'bg-[var(--color-bg)]' : 'bg-[var(--color-surface)]';

  return (
    <div className={cn('overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)]', cardFill)}>
      <div className={cn('grid', cover && 'md:grid-cols-12')}>
        <div className={cn('p-10 md:p-12', cover && 'md:col-span-7')}>
          <p className="label text-[var(--color-text-soft)]">Proof</p>
          <p className="text-big mt-4 max-w-2xl text-[var(--color-text)]">{line}</p>
          {extra && <p className="text-body mt-4 max-w-2xl text-[var(--color-text-mute)]">{extra}</p>}
          <div className="mt-8">
            <ButtonLink href={`/work/${slug}`} variant="secondary" size="md" withArrow>
              Read the {title} case study
            </ButtonLink>
          </div>
        </div>
        {cover && (
          <Link
            href={`/work/${slug}`}
            aria-label={`${title} case study`}
            className="group relative block min-h-[240px] md:col-span-5"
          >
            <Image
              src={cover}
              alt={`${title} case study`}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
