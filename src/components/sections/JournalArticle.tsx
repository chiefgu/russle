import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { ButtonLink } from '@/components/ui/Button';
import { PostBody } from '@/components/sections/PostBody';
import type { Post, Category } from '@/payload-types';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

function formatDate(iso?: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function categoryLabel(category: Post['category']): string {
  if (!category || typeof category === 'number') return 'Blog';
  return (category as Category).title ?? 'Blog';
}

export function JournalArticle({ post }: { post: Post }) {
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
      </Section>

      <Section tone="bg" spacing="s" container="narrow">
        {post.content && (
          <PostBody content={post.content as SerializedEditorState} />
        )}
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
