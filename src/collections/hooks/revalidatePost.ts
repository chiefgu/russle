import { revalidatePath } from 'next/cache';
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload';

export const revalidatePost: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  revalidatePath('/journal');
  if (doc?.slug) revalidatePath(`/journal/${doc.slug}`);
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    revalidatePath(`/journal/${previousDoc.slug}`);
  }
  return doc;
};

export const revalidatePostDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePath('/journal');
  if (doc?.slug) revalidatePath(`/journal/${doc.slug}`);
  return doc;
};
