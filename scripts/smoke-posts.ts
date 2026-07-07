/**
 * Smoke test: can we query posts (incl. the faq array join) on this DATABASE_URL?
 * Run: npx payload run scripts/smoke-posts.ts
 */
import { getPayload } from 'payload';
import config from '@payload-config';

const payload = await getPayload({ config });
const res = await payload.find({ collection: 'posts', limit: 1, overrideAccess: true, draft: true });
console.log('OK posts query, total:', res.totalDocs);
process.exit(0);
