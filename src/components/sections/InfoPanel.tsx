import { Card } from '@/components/ui/Card';

type Block = {
  label: string;
  value: string | string[];
  href?: string;
};

const BLOCKS: Block[] = [
  { label: 'Email', value: 'hello@russle.co.uk', href: 'mailto:hello@russle.co.uk' },
  { label: 'Based', value: 'United Kingdom' },
  { label: 'Hours', value: 'Mon–Fri, 9–6 GMT' },
];

const SOCIAL: { label: string; href: string }[] = [
  { label: 'Instagram', href: 'https://instagram.com/russleuk' },
];

export function InfoPanel() {
  return (
    <Card className="flex flex-col gap-8">
      {BLOCKS.map((b) => (
        <div key={b.label}>
          <p className="label text-[var(--color-text-soft)]">{b.label}</p>
          {b.href ? (
            <a href={b.href} className="h5 mt-2 inline-block hover:text-[var(--color-accent)] transition-colors">
              {b.value}
            </a>
          ) : (
            <p className="h5 mt-2">{b.value}</p>
          )}
        </div>
      ))}

      <div>
        <p className="label text-[var(--color-text-soft)]">Social</p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {SOCIAL.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h6 hover:text-[var(--color-accent)] transition-colors"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
