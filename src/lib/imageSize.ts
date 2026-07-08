import { readFileSync } from 'node:fs';
import path from 'node:path';
import { imageSize } from 'image-size';

export type ImageDimensions = { width: number; height: number };

const cache = new Map<string, ImageDimensions>();

/**
 * Reads the intrinsic pixel dimensions of a local image in `public/`, given a
 * root-relative URL like `/work/berry-boys/home.jpg`. Server/build-time only
 * (reads from disk). Results are cached per path. Returns a 3:2 fallback if the
 * file is missing or unreadable, so a bad path degrades to a rendered image
 * rather than a build crash.
 */
export function getPublicImageSize(src: string): ImageDimensions {
  const cached = cache.get(src);
  if (cached) return cached;

  let dims: ImageDimensions;
  try {
    const filePath = path.join(process.cwd(), 'public', src.replace(/^\//, ''));
    const { width, height } = imageSize(readFileSync(filePath));
    dims = width && height ? { width, height } : { width: 1200, height: 800 };
  } catch {
    dims = { width: 1200, height: 800 };
  }

  cache.set(src, dims);
  return dims;
}
