import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type LocalityFAQ = { question: string; answer: string };

export type LocalityImage = {
  src: string;
  alt: string;
};

export type LocalityMeta = {
  slug: string;
  town: string;
  routePath: string;
  county: string;
  isHub?: boolean;
  metaDescription: string;
  heroParagraph: string;
  caseStudySlugs: string[];
  faqs: LocalityFAQ[];
  heroImage?: LocalityImage;
  images?: LocalityImage[];
};

export type Locality = LocalityMeta & {
  body: string;
};

const DIR = path.join(process.cwd(), 'src/content/locality');

export function getAllLocalities(): LocalityMeta[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
      const { data } = matter(raw);
      return { slug, ...(data as Omit<LocalityMeta, 'slug'>) };
    });
}

export function getLocalityBySlug(slug: string): Locality | null {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return { slug, body: content, ...(data as Omit<LocalityMeta, 'slug'>) };
}
