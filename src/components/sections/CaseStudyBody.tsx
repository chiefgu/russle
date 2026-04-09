/**
 * Renders the markdown body of a case study MDX file as styled prose.
 * We do a simple custom parse instead of pulling next-mdx-remote at runtime,
 * because case study bodies are short and structured (h2, h3, p, ul, blockquote).
 * If bodies grow more complex later, swap this for next-mdx-remote.
 */
type CaseStudyBodyProps = {
  body: string;
};

type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'blockquote'; text: string };

function parseBody(raw: string): Block[] {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3).trim() });
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4).trim() });
      i++;
      continue;
    }

    if (line.startsWith('> ')) {
      const text: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        text.push(lines[i].slice(2).trim());
        i++;
      }
      blocks.push({ type: 'blockquote', text: text.join(' ') });
      continue;
    }

    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2).trim());
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    // Paragraph: collect non-empty lines until blank
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith('## ') &&
      !lines[i].startsWith('### ') &&
      !lines[i].startsWith('- ') &&
      !lines[i].startsWith('> ')
    ) {
      para.push(lines[i].trim());
      i++;
    }
    if (para.length) blocks.push({ type: 'p', text: para.join(' ') });
  }

  return blocks;
}

/**
 * Inline-link rendering for **bold** and [text](url). Returns React nodes.
 */
function renderInline(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  // Combined regex: bold or link
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      out.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      out.push(
        <strong key={key++} className="font-medium text-[var(--color-text)]">
          {match[1]}
        </strong>,
      );
    } else if (match[2] !== undefined && match[3] !== undefined) {
      const isExternal = /^https?:\/\//.test(match[3]);
      out.push(
        <a
          key={key++}
          href={match[3]}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="link"
        >
          {match[2]}
        </a>,
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    out.push(text.slice(lastIndex));
  }
  return out;
}

export function CaseStudyBody({ body }: CaseStudyBodyProps) {
  const blocks = parseBody(body);

  return (
    <article className="prose-links flex max-w-2xl flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={i} className="h3 mt-8 first:mt-0">
                {renderInline(block.text)}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="h5 mt-6 first:mt-0">
                {renderInline(block.text)}
              </h3>
            );
          case 'p':
            return (
              <p key={i} className="text-big text-[var(--color-text-mute)]">
                {renderInline(block.text)}
              </p>
            );
          case 'ul':
            return (
              <ul key={i} className="text-big flex flex-col gap-3 pl-6 text-[var(--color-text-mute)]">
                {block.items.map((item, j) => (
                  <li key={j} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-5 top-[0.7em] h-1 w-1 rounded-full bg-[var(--color-text-soft)]"
                    />
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );
          case 'blockquote':
            return (
              <blockquote
                key={i}
                className="my-4 border-l-2 border-[var(--color-accent)] py-2 pl-6"
              >
                <p className="h6 italic text-[var(--color-text)]">
                  {renderInline(block.text)}
                </p>
              </blockquote>
            );
        }
      })}
    </article>
  );
}
