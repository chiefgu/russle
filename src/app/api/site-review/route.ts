import { NextResponse } from 'next/server';
import { z } from 'zod';
import { resend, EMAIL_FROM, EMAIL_TO, isResendConfigured } from '@/lib/resend';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Valid email required').max(200),
  url: z.string().trim().min(4, 'Site address is required').max(300),
  notes: z.string().trim().max(2000).optional(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = rateLimit(`site-review:${ip}`, { capacity: 5, intervalMs: 60_000 });
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

  const { name, email, url, notes } = parsed.data;
  const text = [
    'Free site review request',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Site: ${url}`,
    notes ? `Notes: ${notes}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  if (!isResendConfigured() || !resend) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[site-review] RESEND_API_KEY missing in production.', parsed.data);
      return NextResponse.json(
        { error: 'The form is temporarily unavailable. Please email hello@russle.co.uk directly.' },
        { status: 503 },
      );
    }
    console.log('[site-review] Resend not configured (dev mode). Submission:', parsed.data);
    return NextResponse.json({ ok: true, dev: true });
  }

  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    replyTo: email,
    subject: `Free site review: ${url}`,
    text,
  });

  if (error) {
    console.error('[site-review] send failed:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please email hello@russle.co.uk directly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
