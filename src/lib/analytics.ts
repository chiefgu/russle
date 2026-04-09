/**
 * Tiny GA4 helper. The actual <Script> tag is mounted in app/layout.tsx.
 * Use these helpers to fire custom events from client components.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export function gaEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) return;
  window.gtag('event', name, params || {});
}

export function gaPageview(url: string): void {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) return;
  window.gtag('config', GA_ID, { page_path: url });
}
