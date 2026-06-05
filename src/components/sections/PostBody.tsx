import {
  RichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    if (node.tag === 'h2') return <h2 className="h3 mt-8 first:mt-0">{children}</h2>;
    if (node.tag === 'h3') return <h3 className="h5 mt-6 first:mt-0">{children}</h3>;
    return <h4 className="h6 mt-6 first:mt-0">{children}</h4>;
  },
  paragraph: ({ node, nodesToJSX }) => (
    <p className="text-big text-[var(--color-text-mute)]">
      {nodesToJSX({ nodes: node.children })}
    </p>
  ),
  quote: ({ node, nodesToJSX }) => (
    <blockquote className="my-4 border-l-2 border-[var(--color-accent)] py-2 pl-6">
      <p className="h6 italic text-[var(--color-text)]">
        {nodesToJSX({ nodes: node.children })}
      </p>
    </blockquote>
  ),
});

export function PostBody({ content }: { content: SerializedEditorState }) {
  return (
    <article className="prose-links flex max-w-2xl flex-col gap-6">
      <RichText data={content} converters={converters} />
    </article>
  );
}
