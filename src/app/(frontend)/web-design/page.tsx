import type { Metadata } from 'next';
import { ServicePage, type ServicePageData } from '@/components/sections/ServicePage';

const data: ServicePageData = {
  slug: 'web-design',
  tag: 'Web design',
  h1: 'Custom websites, built to be found and to convert.',
  intro:
    'We design and build fast, custom websites for ambitious businesses. No templates, no page builders. Every site is built from scratch on our own platform, so it loads fast, reads well to search engines, and turns visitors into customers.',
  metaTitle: 'Web design',
  metaDescription:
    'russle designs and builds fast, custom websites for ambitious businesses across the UK. Built from scratch, built to convert, and ready for search from day one.',
  included: [
    { title: 'Custom design, no templates', body: 'Designed around your business, not a theme every competitor can buy.' },
    { title: 'Built from scratch', body: 'Hand-built code on our own platform. Fast, secure, and yours.' },
    { title: 'Built to convert', body: 'Structured so visitors take the next step, not just look around.' },
    { title: 'Ready for search', body: 'Clean, fast, and structured so Google and AI search can read it from day one.' },
    { title: 'Hosting handled', body: 'Hosting on our platform, one bill, looked after by us.' },
    { title: 'Optional extras', body: 'Booking, an AI assistant, or a logo and identity if your project needs one.' },
  ],
  how: [
    'Start with a short brief so we understand the business and the goal.',
    'We agree the shape of the site and the pages it needs.',
    'You review real, clickable pages in the browser as they land, not flat mockups.',
    'We launch, then stay on to keep it fast, healthy, and found.',
  ],
  caseStudy: {
    slug: 'loop',
    title: 'Loop',
    line: 'An editorial launch site with a tokenised referral engine underneath, built to seed a community before the product shipped.',
  },
  faq: [
    { q: 'Do I need a brand first?', a: 'No. If you have a logo and colours we build around them. If you do not, we keep it clean and simple, and we can create an identity as part of the project if you want one.' },
    { q: 'Can I edit it myself?', a: 'Marketing sites are looked after by us so the design stays tight. Online stores come with a dashboard. If you want to edit pages yourself, tell us up front and we will build that in.' },
    { q: 'How long does it take?', a: 'Most sites go live in four to six weeks, faster when everything is ready.' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web design',
    provider: { '@type': 'Organization', name: 'russle', url: 'https://russle.co.uk' },
    areaServed: 'GB',
    name: 'Web design',
    description: 'Custom website design and build for ambitious businesses across the UK.',
  },
};

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function WebDesignPage() {
  return <ServicePage data={data} />;
}
