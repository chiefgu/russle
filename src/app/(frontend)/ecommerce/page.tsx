import type { Metadata } from 'next';
import { ServicePage, type ServicePageData } from '@/components/sections/ServicePage';
import { EcommerceVignette } from '@/components/sections/EcommerceVignette';

const data: ServicePageData = {
  slug: 'ecommerce',
  tag: 'Ecommerce',
  h1: 'Online stores that sell, on a platform you own.',
  intro:
    'We build online shops on our own platform or as a custom Shopify storefront: products, stock, orders, and payments, with a dashboard and an iOS app so you run the shop from anywhere. No marketplace commission, no per-sale fee to a third party.',
  metaTitle: 'Ecommerce',
  metaDescription:
    'russle builds custom online stores for ambitious businesses across the UK, on our own platform or as a custom Shopify storefront. Products, stock, orders, payments, and a dashboard.',
  includedHeading: 'A store you own outright.',
  statement: 'Your store, your customers, your margin.',
  flow: {
    heading: 'From product range to repeat orders.',
    from: { icon: 'ShoppingBag', title: 'Your product range', meta: 'The start' },
    via: {
      title: 'A storefront that runs itself',
      meta: 'Your store',
      chips: ['Stock synced', 'Payments direct', 'Run from your phone'],
    },
    to: { icon: 'TrendingUp', title: 'Orders without commission', meta: 'The result' },
  },
  included: [
    { icon: 'Store', title: 'Full storefront', body: 'Products, collections, cart, and checkout, built around your range.' },
    { icon: 'CreditCard', title: 'Payments and orders', body: 'Take payment and manage orders without a marketplace taking a cut.' },
    { icon: 'Smartphone', title: 'Dashboard and iOS app', body: 'Manage products, stock, and orders from your desk or your phone.' },
    { icon: 'PackageCheck', title: 'Stock that stays right', body: 'Inventory that updates as you sell, online and in person.' },
    { icon: 'Search', title: 'Built for search', body: 'Product and category pages structured to rank and to show in AI answers.' },
    { icon: 'ShoppingBag', title: 'Our platform or Shopify', body: 'No monthly builder fee on ours, or a custom storefront on the Shopify store you already run.' },
  ],
  how: [
    'Start with a short brief covering your range and how you sell.',
    'We agree the storefront, the checkout, and whether it runs on our platform or Shopify.',
    'You review the real store in the browser as it comes together.',
    'We launch, then stay on to keep it selling and found.',
  ],
  caseStudy: {
    slug: 'berry-boys',
    title: 'Berry Boys',
    line: 'A multi-store site that took a Manchester acai bar off Instagram and onto its own checkout, edited by the three founders themselves.',
  },
  faq: [
    { q: 'Is this Shopify?', a: 'It can be. Most stores run on our platform, which means no monthly builder fee and no per-sale cut. If you run Shopify or want to, we design and build a custom storefront on top of it, so you keep the Shopify checkout and admin you know.' },
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
    description: 'Custom online store design and build, on our own platform or as a headless Shopify storefront, for businesses across the UK.',
  },
};

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function EcommercePage() {
  return <ServicePage data={data} visual={<EcommerceVignette />} />;
}
