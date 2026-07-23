import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getPayload } from 'payload';
import config from '@payload-config';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';

const schema = z.object({
  email: z.string().trim().email('Valid email required').max(200),
  source: z.string().trim().max(200).optional(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = rateLimit(`subscribe:${ip}`, { capacity: 5, intervalMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json({ error: 'Too many requests. Try again in a minute.' }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Invalid input.' },
      { status: 400 },
    );
  }

  const cms = await getPayload({ config });
  try {
    await cms.create({
      collection: 'subscribers',
      data: { email: parsed.data.email.toLowerCase(), source: parsed.data.source },
      overrideAccess: true,
    });
  } catch (err) {
    // Unique constraint: already subscribed reads as success to the visitor.
    const message = err instanceof Error ? err.message : '';
    if (!/unique|duplicate/i.test(message)) {
      console.error('[subscribe] create failed:', err);
      return NextResponse.json({ error: 'Something went wrong. Try again later.' }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
