/**
 * Tiny GA4 helper. The actual <Script> tag is mounted in app/layout.tsx.
 * Use these helpers to fire custom events and to grant or deny consent
 * from the cookie banner.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export function hasGa(): boolean {
  return !!GA_ID;
}

export function grantAnalyticsConsent(): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  });
}

export function denyAnalyticsConsent(): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

export function gaEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) return;
  window.gtag('event', name, params || {});
}

export function gaPageview(url: string): void {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) return;
  window.gtag('config', GA_ID, { page_path: url });
}
