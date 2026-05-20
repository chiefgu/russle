'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { cn } from '@/lib/cn';

const WHATSAPP_HREF = 'https://wa.me/447377902508';

type MegaKind = 'services' | 'work';

type NavLink = {
  label: string;
  href: string;
  mega?: MegaKind;
};

const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: '/work', mega: 'work' },
  { label: 'Services', href: '/services', mega: 'services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const TIERS = [
  {
    name: 'Launch',
    href: '/launch',
    price: 'From £3,995',
    blurb: 'A new brand and website, built together.',
  },
  {
    name: 'Grow',
    href: '/grow',
    price: 'From £299/mo',
    blurb: 'We run the technical side every month.',
  },
  {
    name: 'Manage',
    href: '/manage',
    price: 'Talk to us',
    blurb: 'A small team running the marketing.',
  },
];

const CASE_STUDIES = [
  { slug: 'loop', title: 'Loop', sector: 'Community platform' },
  { slug: 'bethbakescakes', title: 'Beth Bakes Cakes', sector: 'Brand + custom storefront' },
  { slug: 'racing-life', title: 'Racing Life', sector: 'Sports media platform' },
  { slug: 'makeup-by-abigail', title: 'Makeup by Abigail', sector: 'Brand + website' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<MegaKind | null>(null);
  const closeTimer = useRef<number | null>(null);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setOpenMega(null);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Transparent at top, solid once scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mega on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMega(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Mega menu hover handlers with a short close delay so moving the cursor
  // from the trigger to the panel doesn't flash the menu shut.
  function openMegaWithCancel(kind: MegaKind) {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMega(kind);
  }

  function scheduleClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMega(null), 120);
  }

  const showSolid = scrolled || open || openMega !== null;

  return (
    <header
      data-navbar
      style={{
        background: showSolid ? 'var(--nav-bg, var(--color-bg))' : 'transparent',
      }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-200',
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

        <nav className="hidden items-center gap-10 md:flex" onMouseLeave={scheduleClose}>
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(link.href + '/');
            const hasMega = Boolean(link.mega);
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => {
                  if (link.mega) openMegaWithCancel(link.mega);
                  else scheduleClose();
                }}
                onFocus={() => {
                  if (link.mega) openMegaWithCancel(link.mega);
                }}
                aria-expanded={hasMega ? openMega === link.mega : undefined}
                aria-haspopup={hasMega ? 'true' : undefined}
                className={cn(
                  'label inline-flex items-center gap-1 transition-colors',
                  active
                    ? 'text-[var(--nav-text,var(--color-text))]'
                    : 'text-[var(--nav-text-mute,var(--color-text-mute))] hover:text-[var(--nav-text,var(--color-text))]',
                )}
              >
                {link.label}
                {hasMega && (
                  <ChevronDown
                    className={cn(
                      'h-3 w-3 transition-transform',
                      openMega === link.mega && 'rotate-180',
                    )}
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat to russle on WhatsApp"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-xl)] bg-[#25D366] px-4 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#1ebe5d] md:h-12 md:px-5"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
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

      {/* Mega menu panel — desktop only */}
      {openMega && (
        <div
          className="hidden border-t border-[var(--color-line)] bg-[var(--color-bg)] shadow-[0_24px_48px_-24px_rgba(26,20,16,0.18)] md:block"
          onMouseEnter={() => {
            if (closeTimer.current) {
              window.clearTimeout(closeTimer.current);
              closeTimer.current = null;
            }
          }}
          onMouseLeave={scheduleClose}
        >
          <div className="mx-auto max-w-[1800px] px-4 py-10 sm:px-6 md:px-8">
            {openMega === 'services' ? <ServicesMega /> : <WorkMega />}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-bg)] md:hidden">
          <nav className="flex flex-col gap-2 px-4 py-8 sm:px-6">
            <Link href="/work" className="h2 py-2 text-[var(--color-text)]">Work</Link>
            <Link href="/services" className="h2 py-2 text-[var(--color-text)]">Services</Link>
            <div className="ml-4 mb-2 flex flex-col gap-2 border-l border-[var(--color-line)] pl-4">
              {TIERS.map((tier) => (
                <Link
                  key={tier.href}
                  href={tier.href}
                  className="label py-1 text-[var(--color-text-mute)] hover:text-[var(--color-text)]"
                >
                  {tier.name} · {tier.price}
                </Link>
              ))}
            </div>
            <Link href="/about" className="h2 py-2 text-[var(--color-text)]">About</Link>
            <Link href="/contact" className="h2 py-2 text-[var(--color-text)]">Contact</Link>
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href="/start" variant="primary" size="lg">
                Start a project
              </ButtonLink>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-[var(--radius-xl)] bg-[#25D366] px-8 text-[14px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#1ebe5d]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>WhatsApp us</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function ServicesMega() {
  return (
    <div className="grid gap-12 md:grid-cols-12">
      <div className="md:col-span-8">
        <p className="label text-[var(--color-text-soft)]">Three tiers</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {TIERS.map((tier) => (
            <Link
              key={tier.href}
              href={tier.href}
              className="group block rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-6 transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)]"
            >
              <div className="flex items-start justify-between">
                <h3 className="h5 text-[var(--color-text)]">{tier.name}</h3>
                <ArrowUpRight className="h-4 w-4 text-[var(--color-text-soft)] transition-colors group-hover:text-[var(--color-accent)]" />
              </div>
              <p className="text-small mt-2 text-[var(--color-accent)]">{tier.price}</p>
              <p className="text-body mt-4 text-[var(--color-text-mute)]">{tier.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="md:col-span-4 md:border-l md:border-[var(--color-line)] md:pl-8">
        <p className="label text-[var(--color-text-soft)]">Compare</p>
        <Link
          href="/services"
          className="group mt-6 flex items-start justify-between gap-3 text-[var(--color-text)]"
        >
          <div>
            <p className="h6">See all three side by side</p>
            <p className="text-small mt-2 text-[var(--color-text-mute)]">
              Full comparison table at /services
            </p>
          </div>
          <ArrowUpRight className="mt-1 h-4 w-4 text-[var(--color-text-soft)] transition-colors group-hover:text-[var(--color-accent)]" />
        </Link>
        <Link
          href="/start"
          className="group mt-6 flex items-start justify-between gap-3 text-[var(--color-text)]"
        >
          <div>
            <p className="h6">Get a quote</p>
            <p className="text-small mt-2 text-[var(--color-text-mute)]">
              Quick or detailed brief, your call
            </p>
          </div>
          <ArrowUpRight className="mt-1 h-4 w-4 text-[var(--color-text-soft)] transition-colors group-hover:text-[var(--color-accent)]" />
        </Link>
      </div>
    </div>
  );
}

function WorkMega() {
  return (
    <div className="grid gap-12 md:grid-cols-12">
      <div className="md:col-span-8">
        <p className="label text-[var(--color-text-soft)]">Recent case studies</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {CASE_STUDIES.map((cs) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="group block rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-5 transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="h6 text-[var(--color-text)]">{cs.title}</h3>
                  <p className="text-small mt-1 text-[var(--color-text-mute)]">{cs.sector}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--color-text-soft)] transition-colors group-hover:text-[var(--color-accent)]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="md:col-span-4 md:border-l md:border-[var(--color-line)] md:pl-8">
        <p className="label text-[var(--color-text-soft)]">All work</p>
        <Link
          href="/work"
          className="group mt-6 flex items-start justify-between gap-3 text-[var(--color-text)]"
        >
          <div>
            <p className="h6">Browse every project</p>
            <p className="text-small mt-2 text-[var(--color-text-mute)]">
              The full index at /work
            </p>
          </div>
          <ArrowUpRight className="mt-1 h-4 w-4 text-[var(--color-text-soft)] transition-colors group-hover:text-[var(--color-accent)]" />
        </Link>
      </div>
    </div>
  );
}
