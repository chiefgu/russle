import { NextResponse } from 'next/server';
import { z } from 'zod';
import { resend, EMAIL_FROM, EMAIL_TO, isResendConfigured } from '@/lib/resend';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Valid email required').max(200),
  company: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, 'Message is too short').max(5000),
});

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = rateLimit(`contact:${ip}`, { capacity: 5, intervalMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Try again in a minute.' },
      { status: 429 },
    );
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

  const { name, email, company, message } = parsed.data;

  if (!isResendConfigured() || !resend) {
    // In dev: log the submission so the form is testable without a key.
    // In prod: fail loudly so a missing RESEND_API_KEY isn't silently
    // dropping every enquiry into the void.
    if (process.env.NODE_ENV === 'production') {
      console.error('[contact] RESEND_API_KEY missing in production. Submission rejected.', parsed.data);
      return NextResponse.json(
        { error: 'The contact form is temporarily unavailable. Please email hello@russle.co.uk directly.' },
        { status: 503 },
      );
    }
    console.log('[contact] Resend not configured (dev mode). Submission:', parsed.data);
    return NextResponse.json({ ok: true, dev: true });
  }

  const subject = `New enquiry from ${name}${company ? ` (${company})` : ''}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company && `Company: ${company}`,
    '',
    'Message:',
    message,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email,
      subject,
      text,
    });
  } catch (err) {
    console.error('[contact] Resend error', err);
    return NextResponse.json({ error: 'Email failed to send.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
