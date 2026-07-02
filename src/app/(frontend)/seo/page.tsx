import type { Metadata } from 'next';
import { ServicePage, type ServicePageData } from '@/components/sections/ServicePage';

const data: ServicePageData = {
  slug: 'seo',
  tag: 'SEO',
  h1: 'The SEO that gets your site found.',
  intro:
    'A fast, well-built site is only worth it if people find it. We run ongoing SEO, technical, content, and AI search, so you climb the rankings and show up when customers are looking, on Google and in tools like ChatGPT.',
  metaTitle: 'SEO',
  metaDescription:
    'russle runs ongoing organic and technical SEO for ambitious businesses across the UK, including content, rankings, reporting, and AI search visibility (GEO).',
  included: [
    { title: 'Technical SEO', body: 'The under-the-hood work: speed, structure, crawlability, and schema.' },
    { title: 'Content and on-page', body: 'Pages and articles written to rank for what your customers search.' },
    { title: 'AI search (GEO)', body: 'Showing up when people ask ChatGPT, Perplexity, or Google AI Overviews for what you do.' },
    { title: 'Rankings and reporting', body: 'Tracked every month, in plain English, so you see what is moving and why.' },
    { title: 'Kept healthy', body: 'Broken links, dropped rankings, and tracking issues caught and fixed.' },
    { title: 'Local when it helps', body: 'Google Business Profile and local search set up when your customers search nearby.' },
  ],
  how: [
    'We audit where you stand and where the opportunities are.',
    'We fix the technical basics that hold rankings back.',
    'We publish and optimise content for people and for AI search.',
    'We report and adjust every month.',
  ],
  faq: [
    { q: 'How long until I see results?', a: 'Most sites see movement in three to six months. SEO compounds, the traffic keeps coming once it lands.' },
    { q: 'Do you guarantee number one?', a: 'No, and walk away from anyone who does. We guarantee the work and the reporting, so you can see exactly what is moving and why.' },
    { q: 'Is this local SEO?', a: 'It can include local search and Google Business Profile when your customers search nearby, but most of the work is broader organic and technical SEO, plus AI search visibility.' },
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Search engine optimization',
    provider: { '@type': 'Organization', name: 'russle', url: 'https://russle.co.uk' },
    areaServed: 'GB',
    name: 'SEO',
    description: 'Ongoing organic, technical, and AI-search optimisation for businesses across the UK.',
  },
};

export const metadata: Metadata = { title: data.metaTitle, description: data.metaDescription };

export default function SeoPage() {
  return <ServicePage data={data} />;
}
