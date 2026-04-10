import { NextResponse } from 'next/server';
import { z } from 'zod';
import { resend, EMAIL_FROM, EMAIL_TO, isResendConfigured } from '@/lib/resend';
import { rateLimit, getClientIp } from '@/lib/rateLimit';
import { renderIntakeEmail, renderIntakeConfirmation } from '@/lib/email-templates';

export const runtime = 'nodejs';

/**
 * Project intake handler. Accepts the full questionnaire from /start (field
 * IDs identical to the Guest Digital intake), validates the two required
 * client fields, then renders the brief as both HTML and plain text via the
 * email template module.
 */
const schema = z
  .object({
    client_name: z.string().trim().min(1).max(120),
    client_email: z.string().trim().email().max(200),
  })
  .passthrough();

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = rateLimit(`intake:${ip}`, { capacity: 3, intervalMs: 60_000 });
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
      { error: 'Name and a valid email are required.' },
      { status: 400 },
    );
  }

  const data = parsed.data as Record<string, string>;
  const { subject, html, text } = renderIntakeEmail(data);

  if (!isResendConfigured() || !resend) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[intake] RESEND_API_KEY missing in production. Brief rejected.\n', text);
      return NextResponse.json(
        { error: 'The intake form is temporarily unavailable. Please email hello@russle.co.uk directly.' },
        { status: 503 },
      );
    }
    console.log('[intake] Resend not configured (dev mode). Brief:\n', text);
    return NextResponse.json({ ok: true, dev: true });
  }

  // 1. Studio notification (critical — return 502 on failure).
  try {
    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: data.client_email,
      subject,
      html,
      text,
    });
    if (result.error) {
      console.error('[intake] Resend rejected the studio notification:', result.error);
      return NextResponse.json(
        { error: `Email failed to send: ${result.error.message}` },
        { status: 502 },
      );
    }
    console.log('[intake] notification sent:', result.data?.id);
  } catch (err) {
    console.error('[intake] Resend threw on studio notification:', err);
    return NextResponse.json({ error: 'Email failed to send.' }, { status: 502 });
  }

  // 2. Submitter confirmation (best-effort — never fails the request).
  try {
    const confirmation = renderIntakeConfirmation(data);
    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to: data.client_email,
      replyTo: EMAIL_TO,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
    if (result.error) {
      console.error('[intake] Confirmation failed (non-fatal):', result.error);
    } else {
      console.log('[intake] confirmation sent:', result.data?.id);
    }
  } catch (err) {
    console.error('[intake] Confirmation threw (non-fatal):', err);
  }

  return NextResponse.json({ ok: true });
}
