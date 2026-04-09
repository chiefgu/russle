import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Frontmatter schema for case studies. Each project carries its own brand
 * backdrop and design notes so the work index reads as a curated wall of
 * projects rendered in their own visual world.
 */
export type GalleryLayout =
  // Hero / single-image rows
  | 'hero'        // full-bleed-ish, the biggest moment
  | 'wide'        // 1200px max, centred
  | 'narrow'      // 720px max, centred
  // Multi-image rows (group consecutive items of the same kind)
  | 'half'        // 2-up
  | 'third'       // 3-up
  // Editorial split
  | 'feature-left'   // image 8/12 left + caption 4/12 right
  | 'feature-right'; // image 8/12 right + caption 4/12 left

export type GalleryItem = {
  src: string;
  alt: string;
  layout?: GalleryLayout;     // default 'wide'
  caption?: string;           // optional editorial caption
  // Aspect override — by default we let the image find its natural ratio.
  aspect?: '16:9' | '4:5' | '1:1' | '3:2' | 'auto';
  // Optional bg colour drawn behind the image (e.g. project backdrop)
  bg?: string;
};

export type PaletteSwatch = {
  name: string;
  hex: string;
};

export type FontEntry = {
  role: string;
  family: string;
};

export type WorkMeta = {
  slug: string;
  title: string;
  summary: string;
  client: string;
  sector: string;
  year: string;
  role: string;
  live?: string;
  repo?: string;
  // Backdrop colour used as case study hero background and index card colour
  backdropColor: string;
  backdropTone: 'light' | 'dark';
  accentColor?: string;
  // The case study cover image — should be the strongest brand asset, NOT
  // a website screenshot. The screenshot lives in the gallery.
  cover?: string;
  // Optional positioning hint for the cover image inside the backdrop
  coverPosition?: 'top' | 'center' | 'bottom';
  // Optional cover crop strategy
  coverFit?: 'cover' | 'contain';
  gallery?: GalleryItem[];
  tags?: string[];
  palette?: PaletteSwatch[];
  fonts?: FontEntry[];
  stack?: string[];
};

export type WorkPost = WorkMeta & {
  body: string;
};

const WORK_DIR = path.join(process.cwd(), 'src/content/work');

export function getAllWork(): WorkMeta[] {
  if (!fs.existsSync(WORK_DIR)) return [];

  const files = fs.readdirSync(WORK_DIR).filter((f) => f.endsWith('.mdx'));
  const items = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(WORK_DIR, file), 'utf8');
    const { data } = matter(raw);
    return { slug, ...(data as Omit<WorkMeta, 'slug'>) };
  });

  return items.sort((a, b) => {
    if (a.year !== b.year) return b.year.localeCompare(a.year);
    return a.slug.localeCompare(b.slug);
  });
}

export function getWorkBySlug(slug: string): WorkPost | null {
  const filePath = path.join(WORK_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    body: content,
    ...(data as Omit<WorkMeta, 'slug'>),
  };
}

export function getWorkSlugs(): string[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  return fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}
