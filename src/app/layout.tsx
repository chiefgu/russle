import type { Metadata } from 'next';
import Script from 'next/script';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://russle.co.uk';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'russle — Web design, development, and branding',
    template: '%s — russle',
  },
  description:
    'russle is a one-person studio designing, building, and branding modern websites for ambitious teams.',
  keywords: [
    'web design',
    'web development',
    'branding',
    'next.js',
    'design studio',
    'UK',
  ],
  authors: [{ name: 'russle' }],
  creator: 'russle',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: 'russle',
    title: 'russle — Web design, development, and branding',
    description:
      'A one-person studio designing, building, and branding modern websites for ambitious teams.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'russle' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'russle — Web design, development, and branding',
    description:
      'A one-person studio designing, building, and branding modern websites.',
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-text)] focus:px-4 focus:py-2 focus:text-[var(--color-bg)]"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
