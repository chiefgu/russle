'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isOnFill = scrolled || open;

  return (
    <header
      data-navbar
      data-scrolled={isOnFill ? 'true' : 'false'}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        // When scrolled: a translucent dark tint + heavy blur. Picks up
        // whatever colour is behind it (cream on most pages, coral on the
        // home gradient) instead of forcing a cream fill that fights the
        // underlying surface. The 8% black dims the background just enough
        // to maintain text contrast on light AND coral.
        isOnFill
          ? 'bg-black/[0.06] backdrop-blur-xl backdrop-saturate-150 border-b border-[var(--color-line)]'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-[1800px] items-center justify-between px-4 py-5 sm:px-6 md:px-8">
        <Link href="/" aria-label="russle home" className="group flex items-center gap-2">
          <span className="h4 lowercase tracking-tight text-[var(--nav-text,var(--color-text))]">
            russle
          </span>
          <span
            aria-hidden
            className="h-2 w-2 rounded-full bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-150"
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'label transition-colors',
                  active
                    ? 'text-[var(--nav-text,var(--color-text))]'
                    : 'text-[var(--nav-text-mute,var(--color-text-mute))] hover:text-[var(--nav-text,var(--color-text))]',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ButtonLink href="/start" variant="primary" size="md">
              Start a project
            </ButtonLink>
          </div>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--nav-border,var(--color-line-2))] text-[var(--nav-text,var(--color-text))] md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — opaque so dropdown content doesn't bleed through */}
      {open && (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-bg)] md:hidden">
          <nav className="flex flex-col gap-2 px-4 py-8 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="h2 py-2 text-[var(--color-text)]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6">
              <ButtonLink href="/start" variant="primary" size="lg">
                Start a project
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
