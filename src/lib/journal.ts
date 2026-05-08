import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type JournalType =
  | 'guide'
  | 'comparison'
  | 'local-appreciation'
  | 'positioning';

export type JournalMeta = {
  slug: string;
  title: string;
  date: string;
  type: JournalType;
  summary: string;
  metaDescription: string;
  tags?: string[];
};

export type JournalEntry = JournalMeta & {
  body: string;
};

const DIR = path.join(process.cwd(), 'src/content/journal');

export function getAllJournal(): JournalMeta[] {
  if (!fs.existsSync(DIR)) return [];
  const items = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
      const { data } = matter(raw);
      return { slug, ...(data as Omit<JournalMeta, 'slug'>) };
    });
  return items.sort((a, b) => b.date.localeCompare(a.date));
}

export function getJournalBySlug(slug: string): JournalEntry | null {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return { slug, body: content, ...(data as Omit<JournalMeta, 'slug'>) };
}

export function getJournalSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}
