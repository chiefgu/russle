import { NextResponse } from 'next/server';
import { z } from 'zod';
import { resend, EMAIL_FROM, EMAIL_TO, isResendConfigured } from '@/lib/resend';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';

/**
 * Project intake handler. Accepts the full questionnaire from /start
 * (field IDs identical to the Guest Digital intake), validates the two
 * required client fields, then formats the rest as a Markdown brief in
 * the email body.
 */
const schema = z
  .object({
    client_name: z.string().trim().min(1).max(120),
    client_email: z.string().trim().email().max(200),
  })
  .passthrough();

const FIELD_ORDER: Array<{ section: string; fields: Array<{ id: string; label: string }> }> = [
  {
    section: 'Business Goals',
    fields: [
      { id: 'primary_goal', label: 'Primary business goal' },
      { id: 'target_audience', label: 'Target audience' },
      { id: 'visitor_action', label: 'Desired visitor action' },
    ],
  },
  {
    section: 'Scope of Work',
    fields: [
      { id: 'page_count', label: 'Page count' },
      { id: 'ecommerce', label: 'E-commerce' },
      { id: 'user_accounts', label: 'User accounts' },
      { id: 'custom_features', label: 'Custom features' },
      { id: 'cms_needs', label: 'CMS needs' },
    ],
  },
  {
    section: 'Content & Assets',
    fields: [
      { id: 'content_provided', label: 'Content provided' },
      { id: 'stock_images', label: 'Stock or custom imagery' },
    ],
  },
  {
    section: 'Design & Branding',
    fields: [
      { id: 'existing_branding', label: 'Existing branding' },
      { id: 'design_approach', label: 'Design approach' },
      { id: 'mobile_accessibility', label: 'Mobile / accessibility' },
    ],
  },
  {
    section: 'Technical Requirements',
    fields: [
      { id: 'hosting_domain', label: 'Hosting / domain' },
      { id: 'multi_language', label: 'Multi-language' },
      { id: 'integrations', label: 'Integrations' },
    ],
  },
  {
    section: 'Maintenance & Support',
    fields: [
      { id: 'maintenance_owner', label: 'Maintenance owner' },
      { id: 'content_update_frequency', label: 'Update frequency' },
      { id: 'training_needed', label: 'Training needed' },
    ],
  },
  {
    section: 'Value & ROI',
    fields: [
      { id: 'revenue_contribution', label: 'Revenue contribution' },
      { id: 'lead_value', label: 'Average lead value' },
      { id: 'reduce_costs', label: 'Cost reduction goals' },
      { id: 'growth_targets', label: 'Growth targets' },
    ],
  },
  {
    section: 'Client Details',
    fields: [
      { id: 'client_name', label: 'Name' },
      { id: 'client_email', label: 'Email' },
      { id: 'client_company', label: 'Company' },
      { id: 'client_phone', label: 'Phone' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'budget_range', label: 'Budget range' },
      { id: 'anything_else', label: 'Anything else' },
    ],
  },
];

function formatBrief(data: Record<string, string>): string {
  const lines: string[] = [];
  for (const section of FIELD_ORDER) {
    const filled = section.fields.filter((f) => (data[f.id] ?? '').trim());
    if (filled.length === 0) continue;
    lines.push(`## ${section.section}`);
    for (const field of filled) {
      lines.push(`**${field.label}**`);
      lines.push(data[field.id]);
      lines.push('');
    }
  }
  return lines.join('\n');
}

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
  const brief = formatBrief(data);
  const subject = `New project brief from ${data.client_name}${
    data.client_company ? ` (${data.client_company})` : ''
  }`;

  if (!isResendConfigured() || !resend) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[intake] RESEND_API_KEY missing in production. Brief rejected.\n', brief);
      return NextResponse.json(
        { error: 'The intake form is temporarily unavailable. Please email hello@russle.co.uk directly.' },
        { status: 503 },
      );
    }
    console.log('[intake] Resend not configured (dev mode). Brief:\n', brief);
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: data.client_email,
      subject,
      text: brief,
    });
    if (result.error) {
      console.error('[intake] Resend rejected the send:', result.error);
      return NextResponse.json(
        { error: `Email failed to send: ${result.error.message}` },
        { status: 502 },
      );
    }
    console.log('[intake] sent:', result.data?.id);
  } catch (err) {
    console.error('[intake] Resend threw:', err);
    return NextResponse.json({ error: 'Email failed to send.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
