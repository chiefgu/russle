import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/animations/Reveal';
import { getAllWork } from '@/lib/mdx';

/**
 * Monochrome client logo row. Each mark is rendered as a CSS mask filled with
 * one muted ink, so brand marks that ship in different colours read as one
 * unified strip on the plain background, no tiles. The logo source only needs
 * a transparent alpha channel defining the shape. Clients without a logo asset
 * are omitted (they still appear in /work).
 */
export function ClientTiles() {
  const clients = getAllWork().filter((w) => w.logo);
  if (clients.length === 0) return null;

  return (
    <Section tone="bg" spacing="l" container="main">
      <Reveal>
        <p className="label text-center text-[var(--color-text-soft)]">
          Trusted by the businesses we build for
        </p>
      </Reveal>
      <Reveal delay={0.1} className="mt-10">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 md:gap-x-20">
          {clients.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              aria-label={`${c.client} case study`}
              className="group block"
            >
              <span
                aria-hidden
                className="block w-[132px] bg-[var(--color-text-mute)] transition-colors duration-300 group-hover:bg-[var(--logo-color)] sm:w-[150px]"
                style={{
                  ['--logo-color' as string]: c.logoColor ?? 'var(--color-text)',
                  height: `calc(2.75rem * ${c.logoScale ?? 1})`,
                  maskImage: `url(${c.logo})`,
                  WebkitMaskImage: `url(${c.logo})`,
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                } as CSSProperties}
              />
            </Link>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
