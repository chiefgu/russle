'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstRun = useRef(true);

  useEffect(() => {
    const isFirst = firstRun.current;
    firstRun.current = false;

    if (typeof window === 'undefined') return;

    const qs = searchParams?.toString();
    const path = pathname + (qs ? `?${qs}` : '');

    // GA: gtag('config', ID) on initial load fires page_view automatically.
    // Skip the first run to avoid double-counting; fire on every subsequent
    // route change.
    if (!isFirst && window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    // Pixel: the init script fires the first PageView. Subsequent client-side
    // navigations need to be fired manually because fbq init doesn't observe
    // history changes.
    if (!isFirst && window.fbq && process.env.NEXT_PUBLIC_META_PIXEL_ID) {
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  return null;
}

export function PageviewTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
