import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';
import { getAllWork } from '@/lib/mdx';

/**
 * Recent work strip — pulls real client names from the case study MDX files
 * and displays them as text wordmarks linking to each case study. No fake
 * logos. As more case studies ship, this scales automatically.
 */
export function LogoWall() {
  const work = getAllWork();
  if (work.length === 0) return null;

  return (
    <Section tone="transparent" spacing="s" container="main">
      <Reveal>
        <p className="label text-center text-[var(--color-text-soft)]">
          Recent work
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16">
          {work.map((item, i) => (
            <div key={item.slug} className="flex items-center gap-x-12 md:gap-x-16">
              <Link
                href={`/work/${item.slug}`}
                className="whitespace-nowrap font-medium tracking-[-0.02em] text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-text)]"
                style={{ fontSize: '28px' }}
              >
                {item.client}
              </Link>
              {i < work.length - 1 && (
                <span
                  aria-hidden
                  className="hidden h-1 w-1 rounded-full bg-[var(--color-text-soft)] md:block"
                />
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
