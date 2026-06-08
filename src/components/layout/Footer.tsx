import Link from 'next/link';
import { Container } from './Container';
import { Wordmark } from '@/components/ui/Wordmark';

const FOOTER_COLUMNS = [
  {
    title: 'Services',
    links: [
      { label: 'Launch', href: '/launch' },
      { label: 'Grow', href: '/grow' },
      { label: 'Manage', href: '/manage' },
      { label: 'Conversion', href: '/conversion' },
      { label: 'Compare tiers', href: '/services' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'For partners', href: '/partners' },
    ],
  },
  {
    title: 'Get started',
    links: [
      { label: 'Project intake', href: '/start' },
      { label: 'Email us', href: 'mailto:hello@russle.co.uk' },
      { label: 'Instagram', href: 'https://instagram.com/russleuk', external: true },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <Container size="main">
        <div className="grid gap-12 py-20 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <Link href="/" className="group inline-flex items-center">
              <Wordmark className="h2" />
            </Link>
            <p className="text-big mt-6 max-w-md text-[var(--color-text-mute)]">
              russle. Brand and web design studio. Alderley Edge.
            </p>
            <p className="text-small mt-4 max-w-md text-[var(--color-text-mute)]">
              Working with independents across Alderley Edge, Wilmslow, Knutsford,
              Altrincham, Macclesfield, Prestbury, Hale, Chester, and Didsbury.
            </p>
            <a
              href="mailto:hello@russle.co.uk"
              className="h4 mt-10 inline-block hover:text-[var(--color-accent)] transition-colors"
            >
              hello@russle.co.uk
            </a>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <p className="label text-[var(--color-text-soft)]">{col.title}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {col.links.map((link) => {
                  const isExternal =
                    'external' in link && link.external;
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-body text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-body text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-[var(--color-line)] py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-small text-[var(--color-text-mute)]">
            © {year} russle. Built in this repo.
          </p>
          <p className="text-small text-[var(--color-text-mute)]">
            Based in the United Kingdom.
          </p>
        </div>
      </Container>

      {/* Decorative wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-0 right-0 select-none text-center text-[20vw] font-medium leading-none tracking-[-0.07em] text-[var(--color-surface-2)] md:-bottom-16"
      >
        <Wordmark />
      </div>
    </footer>
  );
}
