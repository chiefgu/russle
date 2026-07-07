import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { GeistMono } from 'geist/font/mono';
import { ConsentGatedAnalytics } from '@/components/layout/ConsentGatedAnalytics';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { PageviewTracker } from '@/components/layout/PageviewTracker';
import { JsonLd } from '@/components/seo/JsonLd';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Render edge-to-edge on devices with safe areas (iPhone notch, dynamic island,
  // bottom home indicator). Lets per-page backgrounds extend behind the bezel.
  viewportFit: 'cover',
  themeColor: '#F8F7F5',
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://russle.co.uk';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'russle | Web design, ecommerce & SEO',
    template: 'russle | %s',
  },
  description:
    'russle is a web design, ecommerce and SEO studio. We build fast, custom websites and online stores for ambitious businesses across the UK, then run the SEO that gets them found.',
  keywords: [
    'web design',
    'website design',
    'web development',
    'ecommerce',
    'online store',
    'SEO',
    'search engine optimisation',
    'technical SEO',
    'AI search',
    'GEO',
    'UK',
  ],
  authors: [{ name: 'russle' }],
  creator: 'russle',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: 'russle',
    title: 'russle | Web design, ecommerce & SEO',
    description:
      'A web design, ecommerce and SEO studio for ambitious businesses across the UK. Fast custom sites and stores, then the SEO that gets them found.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'russle' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'russle | Web design, ecommerce & SEO',
    description: 'A web design, ecommerce and SEO studio for ambitious businesses across the UK.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <body>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'russle',
            url: SITE_URL,
            description:
              'A web design, ecommerce and SEO studio for ambitious businesses across the UK.',
            email: 'hello@russle.co.uk',
            areaServed: 'GB',
            logo: `${SITE_URL}/og.png`,
            sameAs: ['https://instagram.com/russleuk'],
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-text)] focus:px-4 focus:py-2 focus:text-[var(--color-bg)]"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />

        {/* Consent Mode v2 default-deny, must run before gtag.js loads. */}
        {(GA_ID || META_PIXEL_ID) && (
          <Script id="consent-default" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
            `}
          </Script>
        )}

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}

        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('consent', 'revoke');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {(GA_ID || META_PIXEL_ID) && <PageviewTracker />}
        {(GA_ID || META_PIXEL_ID) && <CookieBanner />}
        <ConsentGatedAnalytics />
      </body>
    </html>
  );
}
