import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { PostBody } from '@/components/sections/PostBody';
import { AUTHOR } from '@/lib/author';
import type { Post, Category } from '@/payload-types';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

type Faq = { question: string; answer: string };

function formatDate(iso?: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function categoryLabel(category: Post['category']): string {
  if (!category || typeof category === 'number') return 'Blog';
  return (category as Category).title ?? 'Blog';
}

export function JournalArticle({ post, faq = [] }: { post: Post; faq?: Faq[] }) {
  return (
    <>
      <Section tone="bg" spacing="heroTopTight" container="narrow">
        <div className="flex items-center gap-3">
          <Tag>{categoryLabel(post.category)}</Tag>
          <span className="label text-[var(--color-text-soft)]">
            {formatDate(post.publishedAt)}
          </span>
        </div>
        <h1 className="h1 mt-6 text-balance">{post.title}</h1>
        <p className="text-big mt-8 max-w-2xl text-[var(--color-text-mute)]">
          {post.excerpt}
        </p>
        <p className="text-small mt-6 text-[var(--color-text-soft)]">
          By{' '}
          <Link href={AUTHOR.url} className="link text-[var(--color-text-mute)]">
            {AUTHOR.name}
          </Link>
          , {AUTHOR.role.toLowerCase()}
        </p>
      </Section>

      <Section tone="bg" spacing="s" container="narrow">
        {post.content && (
          <PostBody content={post.content as SerializedEditorState} />
        )}
      </Section>

      {faq.length > 0 && (
        <Section tone="bg" spacing="s" container="narrow">
          <h2 className="h3">Frequently asked questions</h2>
          <div className="mt-8 max-w-2xl border-t border-[var(--color-line)]">
            {faq.map((item, i) => (
              <details key={i} className="group border-b border-[var(--color-line)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="h6 text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
                    {item.question}
                  </span>
                  <span className="faq-chevron flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-line-2)] text-[var(--color-text-soft)]">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </summary>
                <p className="text-body max-w-prose pb-6 pr-12 text-[var(--color-text-mute)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Section>
      )}

      <Section tone="bg" spacing="s" container="narrow">
        <div className="flex max-w-2xl flex-col gap-2 border-t border-[var(--color-line)] pt-8">
          <p className="label text-[var(--color-text-soft)]">Written by</p>
          <p className="h6 text-[var(--color-text)]">
            {AUTHOR.name}, {AUTHOR.role.toLowerCase()}
          </p>
          <p className="text-body text-[var(--color-text-mute)]">{AUTHOR.bio}</p>
          <Link href={AUTHOR.url} className="link mt-1 w-fit text-[var(--color-text-mute)]">
            More about russle
          </Link>
        </div>
      </Section>

      <Section tone="bg" spacing="l" container="narrow">
        <h2 className="h2">Have a project in mind?</h2>
        <p className="text-big mt-6 max-w-2xl text-[var(--color-text-mute)]">
          Tell us about it in eight short steps. We come back inside 24 hours.
        </p>
        <div className="mt-10">
          <ButtonLink href="/start" variant="primary" size="lg" withArrow>
            Start a project
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
