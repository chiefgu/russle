import type { PaletteSwatch, FontEntry } from '@/lib/mdx';

type DesignNotesProps = {
  palette?: PaletteSwatch[];
  fonts?: FontEntry[];
  stack?: string[];
  accentColor: string;
};

/**
 * Sidebar shown next to case study body. Surfaces the colours, fonts,
 * and stack of the project. Educates the visitor that I think in systems.
 */
export function DesignNotes({ palette, fonts, stack, accentColor }: DesignNotesProps) {
  if (!palette?.length && !fonts?.length && !stack?.length) return null;

  return (
    <div className="sticky top-32 flex flex-col gap-12">
      {palette && palette.length > 0 && (
        <div>
          <p className="label text-[var(--color-text-soft)]">Palette</p>
          <ul className="mt-4 flex flex-col gap-3">
            {palette.map((swatch) => (
              <li key={swatch.hex} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-8 w-8 shrink-0 rounded-[var(--radius-s)] border border-[var(--color-line)]"
                  style={{ background: swatch.hex }}
                />
                <div className="min-w-0">
                  <p className="text-body leading-tight">{swatch.name}</p>
                  <p className="text-small font-mono uppercase text-[var(--color-text-soft)]">
                    {swatch.hex}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {fonts && fonts.length > 0 && (
        <div>
          <p className="label text-[var(--color-text-soft)]">Type</p>
          <ul className="mt-4 flex flex-col gap-3">
            {fonts.map((font) => (
              <li key={`${font.role}-${font.family}`}>
                <p className="text-body leading-tight">{font.family}</p>
                <p className="label text-[var(--color-text-soft)]">{font.role}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {stack && stack.length > 0 && (
        <div>
          <p className="label text-[var(--color-text-soft)]">Stack</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <li
                key={tech}
                className="rounded-[var(--radius-pill)] border border-[var(--color-line-2)] px-3 py-1 text-small"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Decorative accent dot pulled from the project brand */}
      <div className="flex items-center gap-3 border-t border-[var(--color-line)] pt-8">
        <span
          aria-hidden
          className="h-2 w-2 rounded-full"
          style={{ background: accentColor }}
        />
        <p className="label text-[var(--color-text-soft)]">Brand accent</p>
      </div>
    </div>
  );
}
