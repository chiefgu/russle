import { revalidatePath } from 'next/cache';
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload';

/**
 * `revalidatePath` only works inside a Next.js request/render scope. Mutations
 * made from the admin UI run within that scope, but mutations from standalone
 * scripts or Payload jobs do not — there it throws "static generation store
 * missing". Guard so those non-request mutations no-op instead of crashing.
 */
function safeRevalidate(path: string): void {
  try {
    revalidatePath(path);
  } catch {
    // Outside a Next request context (seed script, job runner) — skip.
  }
}

export const revalidatePost: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  safeRevalidate('/journal');
  if (doc?.slug) safeRevalidate(`/journal/${doc.slug}`);
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    safeRevalidate(`/journal/${previousDoc.slug}`);
  }
  return doc;
};

export const revalidatePostDelete: CollectionAfterDeleteHook = ({ doc }) => {
  safeRevalidate('/journal');
  if (doc?.slug) safeRevalidate(`/journal/${doc.slug}`);
  return doc;
};
