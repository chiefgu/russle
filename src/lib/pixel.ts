/**
 * Meta Pixel wrapper. Mirrors lib/analytics.ts shape so the cookie banner
 * can call both providers interchangeably. The actual <Script> tag is
 * mounted in app/layout.tsx, which also default-denies consent on init.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

export function hasPixel(): boolean {
  return !!META_PIXEL_ID;
}

export function grantPixelConsent(): void {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('consent', 'grant');
}

export function denyPixelConsent(): void {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('consent', 'revoke');
}

export function trackPixel(
  name: string,
  params?: Record<string, unknown>,
  opts?: { eventID?: string },
): void {
  if (typeof window === 'undefined' || !window.fbq) return;
  if (opts?.eventID) {
    window.fbq('track', name, params ?? {}, { eventID: opts.eventID });
  } else {
    window.fbq('track', name, params ?? {});
  }
}

export function trackPixelCustom(
  name: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('trackCustom', name, params ?? {});
}
