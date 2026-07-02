import type { Metadata } from 'next';
import { ServicePage, type ServicePageData } from '@/components/sections/ServicePage';

const data: ServicePageData = {
  slug: 'ecommerce',
  tag: 'Ecommerce',
  h1: 'Online stores that sell, on a platform you own.',
  intro:
    'We build online shops on our own platform: products, stock, orders, and payments, with a dashboard and an iOS app so you run the shop from anywhere. No marketplace commission, no per-sale fee to a third party.',
  metaTitle: 'Ecommerce',
  metaDescription:
    'russle builds custom online stores for ambitious businesses across the UK. Products, stock, orders, payments, a dashboard and an iOS app, on a platform you own.',
  included: [
    { title: 'Full storefront', body: 'Products, collections, cart, and checkout, built around your range.' },
    { title: 'Payments and orders', body: 'Take payment and manage orders without a marketplace taking a cut.' },
    { title: 'Dashboard and iOS app', body: 'Manage products, stock, and orders from your desk or your phone.' },
    { title: 'Stock that stays right', body: 'Inventory that updates as you sell, online and in person.' },
    { title: 'Built for search', body: 'Product and category pages structured to rank and to show in AI answers.' },
    { title: 'Optional extras', body: 'Online ordering for food, subscriptions, or an AI assistant.' },
  ],
  how: [
    'Start with a short brief covering your range and how you sell.',
    'We agree the storefront, the checkout, and how stock is managed.',
    'You review the real store in the browser as it comes together.',
    'We launch, then stay on to keep it selling and found.',
  ],
  caseStudy: {
    slug: 'berry-boys',
    title: 'Berry Boys',
    line: 'A multi-store site that took a Manchester acai bar off Instagram and onto its own checkout, edited by the three founders themselves.',
  },
  faq: [
    { q: 'Is this Shopify?', a: 'Usually our own platform, which means no monthly builder fee and no per-sale cut. If you already run Shopify and want to keep it, we can build the storefront on top of it.' },
    { q: 'Can I manage it myself?', a: 'Yes. Stores come with a web dashboard and an iOS app for products, stock, and orders.' },
    { q: 'Do you do food ordering?', a: 'Yes, takeaway and pickup ordering direct from your site, with no third-party app or commission.' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'E-commerce development',
    provider: { '@type': 'Organization', name: 'russle', url: 'https://russle.co.uk' },
    areaServed: 'GB',
    name: 'Ecommerce',
    description: 'Custom online store design and build on a platform you own, for businesses across the UK.',
  },
};

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function EcommercePage() {
  return <ServicePage data={data} />;
}
