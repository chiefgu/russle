import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { JournalArticle } from '@/components/sections/JournalArticle';
import { getPostBySlug, getPublishedSlugs } from '@/lib/posts';
import type { Media } from '@/payload-types';

type Params = { slug: string };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://russle.co.uk';

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

function ogImageUrl(post: Awaited<ReturnType<typeof getPostBySlug>>): string | undefined {
  const meta = post?.meta as { image?: number | Media } | undefined;
  const img = meta?.image ?? post?.heroImage;
  if (img && typeof img !== 'number' && img.url) return img.url;
  return undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Not found' };
  const meta = post.meta as { title?: string; description?: string } | undefined;
  const title = meta?.title ?? post.title;
  const description = meta?.description ?? post.excerpt;
  const image = ogImageUrl(post);
  return {
    title,
    description,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      title: `russle | ${post.title}`,
      description,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const post = await getPostBySlug(slug, isDraft);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt,
    image: ogImageUrl(post),
    author: { '@type': 'Organization', name: 'russle' },
    publisher: { '@type': 'Organization', name: 'russle' },
    mainEntityOfPage: `${SITE_URL}/journal/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JournalArticle post={post} />
    </>
  );
}
