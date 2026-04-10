import { NextResponse } from 'next/server';
import { z } from 'zod';
import { resend, EMAIL_FROM, EMAIL_TO, isResendConfigured } from '@/lib/resend';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { renderContactEmail, renderContactConfirmation } from '@/lib/email-templates';

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

  const { email } = parsed.data;
  const { subject, html, text } = renderContactEmail(parsed.data);

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

  // 1. Notification to the studio (the critical one — must succeed or we
  //    return 502 because we can't recover the message later).
  try {
    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email,
      subject,
      html,
      text,
    });
    // The Resend SDK returns { data, error } and does NOT throw on rejection.
    // We have to inspect the response or silent failures slip through.
    if (result.error) {
      console.error('[contact] Resend rejected the studio notification:', result.error);
      return NextResponse.json(
        { error: `Email failed to send: ${result.error.message}` },
        { status: 502 },
      );
    }
    console.log('[contact] notification sent:', result.data?.id);
  } catch (err) {
    console.error('[contact] Resend threw on studio notification:', err);
    return NextResponse.json({ error: 'Email failed to send.' }, { status: 502 });
  }

  // 2. Confirmation to the submitter (best-effort — we already have their
  //    message, so a failed confirmation doesn't justify a 502).
  try {
    const confirmation = renderContactConfirmation(parsed.data);
    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      replyTo: EMAIL_TO,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
    if (result.error) {
      console.error('[contact] Confirmation failed (non-fatal):', result.error);
    } else {
      console.log('[contact] confirmation sent:', result.data?.id);
    }
  } catch (err) {
    console.error('[contact] Confirmation threw (non-fatal):', err);
  }

  return NextResponse.json({ ok: true });
}
