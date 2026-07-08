import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import type { Post, Category } from '@/payload-types';

function categoryLabel(category: Post['category']): string | null {
  if (!category || typeof category === 'number') return null;
  return (category as Category).title ?? null;
}

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <Section tone="bg" spacing="l" container="narrow">
      <Tag>Keep reading</Tag>
      <ul className="mt-8 flex flex-col divide-y divide-[var(--color-line)]">
        {posts.map((post) => {
          const label = categoryLabel(post.category);
          return (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-start justify-between gap-6 py-6 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  {label && (
                    <span className="label text-[var(--color-text-soft)]">{label}</span>
                  )}
                  <h3 className="h5 mt-2 max-w-2xl text-balance transition-colors group-hover:text-[var(--color-accent)]">
                    {post.title}
                  </h3>
                </div>
                <span
                  aria-hidden
                  className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-line-2)] transition-all group-hover:border-transparent group-hover:bg-[var(--color-text)] group-hover:text-[var(--color-bg)]"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
