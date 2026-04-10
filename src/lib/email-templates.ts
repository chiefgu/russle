/**
 * Email templates for transactional notifications.
 *
 * Constraints these templates work around:
 * - **No web fonts.** Outlook ignores them, Gmail mangles them. We use a
 *   system font stack — SF on Apple, Segoe UI on Outlook, sensible fallbacks
 *   elsewhere.
 * - **Tables for layout.** Outlook 2016+ still requires table-based layouts.
 *   Divs work in Apple Mail and Gmail but break in Outlook desktop.
 * - **Inline CSS only.** Most email clients strip <style> blocks. The one
 *   exception is media queries (dark mode), which we include in <head>.
 * - **All user input is HTML-escaped.** Names and free-text fields go into
 *   HTML — without escaping, a `<script>` in a name would execute in some
 *   clients. Belt and braces.
 * - **Plain-text twin.** Resend can send both. Some clients show text-only.
 *
 * The visual design follows the russle brand: cream background, warm
 * near-black text, single orange accent, generous whitespace.
 */

/* ────────────────────────────────────────────────────────────
   Brand constants
   ──────────────────────────────────────────────────────────── */
const BRAND = {
  bg: '#F8F7F5',
  surface: '#EFEDE6',
  surface2: '#E6E2D6',
  text: '#1A1410',
  textMute: 'rgba(26,20,16,0.6)',
  textSoft: 'rgba(26,20,16,0.4)',
  line: 'rgba(26,20,16,0.1)',
  accent: '#DF5613',
  // Dark-mode counterparts (used inside the prefers-color-scheme media query)
  darkBg: '#1A1410',
  darkSurface: '#26201B',
  darkText: '#F8F7F5',
  darkTextMute: 'rgba(248,247,245,0.65)',
  darkLine: 'rgba(248,247,245,0.12)',
} as const;

const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://russle.co.uk';

/* ────────────────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────────────────── */

/** HTML-escape a single string. */
function esc(value: string | undefined | null): string {
  if (value == null) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Convert plain text into HTML with paragraph breaks preserved. */
function paragraphsToHtml(text: string): string {
  const safe = esc(text).trim();
  if (!safe) return '';
  return safe
    .split(/\n{2,}/)
    .map((para) => `<p style="margin:0 0 16px 0;">${para.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

/** Today's date as a friendly string for the email footer. */
function formattedDate(): string {
  return new Date().toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

/* ────────────────────────────────────────────────────────────
   Shared chrome — header + footer
   ──────────────────────────────────────────────────────────── */

function chromeHead(title: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${esc(title)}</title>
<style>
  /* Dark-mode overrides for clients that respect prefers-color-scheme */
  @media (prefers-color-scheme: dark) {
    .bg { background:${BRAND.darkBg} !important; }
    .surface { background:${BRAND.darkSurface} !important; }
    .text { color:${BRAND.darkText} !important; }
    .text-mute { color:${BRAND.darkTextMute} !important; }
    .line { border-color:${BRAND.darkLine} !important; }
    .hr { border-top-color:${BRAND.darkLine} !important; }
  }
  /* Mobile tweaks */
  @media (max-width: 600px) {
    .card { padding: 28px !important; }
    .h1 { font-size: 28px !important; line-height: 1.1 !important; }
  }
</style>
</head>`;
}

function chromeBodyOpen(): string {
  return `<body class="bg" style="margin:0;padding:0;background:${BRAND.bg};font-family:${FONT_STACK};-webkit-font-smoothing:antialiased;color:${BRAND.text};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg" style="background:${BRAND.bg};">
  <tr>
    <td align="center" style="padding:48px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

        <!-- header — wordmark + accent dot -->
        <tr><td style="padding:0 4px 32px 4px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="vertical-align:middle;">
                <span class="text" style="font-family:${FONT_STACK};font-size:26px;font-weight:600;letter-spacing:-1.2px;color:${BRAND.text};">russle</span>
              </td>
              <td style="vertical-align:middle;padding-left:10px;padding-bottom:6px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                  <td width="9" height="9" bgcolor="${BRAND.accent}" style="background:${BRAND.accent};border-radius:9px;line-height:9px;font-size:0;">&nbsp;</td>
                </tr></table>
              </td>
            </tr>
          </table>
        </td></tr>`;
}

function chromeBodyClose(): string {
  return `
        <!-- footer -->
        <tr><td style="padding:32px 4px 0 4px;">
          <p class="text-mute" style="margin:0;font-family:${FONT_STACK};font-size:11px;line-height:1.5;color:${BRAND.textSoft};letter-spacing:0.2px;">
            Sent from the contact form on
            <a href="${SITE_URL}" style="color:${BRAND.textSoft};text-decoration:underline;">russle.co.uk</a>
            · ${esc(formattedDate())}
          </p>
        </td></tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/* ────────────────────────────────────────────────────────────
   Reusable card pieces
   ──────────────────────────────────────────────────────────── */

/** Open the main content card. Subsequent rows render inside it. */
function cardOpen(): string {
  return `<tr><td class="surface card" bgcolor="${BRAND.surface}" style="background:${BRAND.surface};border-radius:24px;padding:48px;">`;
}

function cardClose(): string {
  return `</td></tr>`;
}

/** Eyebrow label — uppercase, +1px letter-spacing, soft. */
function label(text: string): string {
  return `<p class="text-mute" style="margin:0;font-family:${FONT_STACK};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${BRAND.textMute};">${esc(text)}</p>`;
}

/** Hairline divider that respects dark-mode override via the .hr class. */
function divider(): string {
  return `<hr class="hr" style="border:none;border-top:1px solid ${BRAND.line};margin:32px 0;">`;
}

/** A label/value pair for the meta row inside a card. */
function metaCell({ label: l, value, isEmail = false }: { label: string; value: string; isEmail?: boolean }): string {
  const v = isEmail
    ? `<a href="mailto:${esc(value)}" style="color:${BRAND.accent};text-decoration:none;">${esc(value)}</a>`
    : esc(value);
  return `
    <td valign="top" style="padding:0 24px 16px 0;">
      <p class="text-mute" style="margin:0 0 4px 0;font-family:${FONT_STACK};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${BRAND.textMute};">${esc(l)}</p>
      <p class="text" style="margin:0;font-family:${FONT_STACK};font-size:15px;line-height:1.4;color:${BRAND.text};">${v}</p>
    </td>`;
}

/* ────────────────────────────────────────────────────────────
   Contact form template
   ──────────────────────────────────────────────────────────── */

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export type RenderedEmail = {
  subject: string;
  html: string;
  text: string;
};

export function renderContactEmail(p: ContactPayload): RenderedEmail {
  const subject = `New enquiry from ${p.name}${p.company ? ` (${p.company})` : ''}`;

  const html = `${chromeHead(subject)}
${chromeBodyOpen()}
        ${cardOpen()}
          ${label('New enquiry')}
          <h1 class="text h1" style="margin:18px 0 0 0;font-family:${FONT_STACK};font-size:36px;font-weight:600;line-height:1.05;letter-spacing:-1.8px;color:${BRAND.text};">
            From ${esc(p.name)}
          </h1>
          ${p.company
            ? `<p class="text-mute" style="margin:10px 0 0 0;font-family:${FONT_STACK};font-size:16px;line-height:1.4;color:${BRAND.textMute};">${esc(p.company)}</p>`
            : ''}

          ${divider()}

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              ${metaCell({ label: 'Reply to', value: p.email, isEmail: true })}
            </tr>
          </table>

          ${divider()}

          ${label('Message')}
          <div class="text" style="margin:14px 0 0 0;font-family:${FONT_STACK};font-size:16px;line-height:1.6;color:${BRAND.text};">
            ${paragraphsToHtml(p.message)}
          </div>
        ${cardClose()}
${chromeBodyClose()}`;

  const text = [
    `New enquiry — russle`,
    `=`.repeat(40),
    ``,
    `From:    ${p.name}${p.company ? ` (${p.company})` : ''}`,
    `Email:   ${p.email}`,
    ``,
    `Message:`,
    p.message,
    ``,
    `--`,
    `Sent from the contact form on ${SITE_URL}`,
    formattedDate(),
  ].join('\n');

  return { subject, html, text };
}

/* ────────────────────────────────────────────────────────────
   Contact confirmation (sent TO the submitter)
   ──────────────────────────────────────────────────────────── */

export function renderContactConfirmation(p: ContactPayload): RenderedEmail {
  const subject = `Got it — russle`;

  const html = `${chromeHead(subject)}
${chromeBodyOpen()}
        ${cardOpen()}
          ${label('Message received')}
          <h1 class="text h1" style="margin:18px 0 0 0;font-family:${FONT_STACK};font-size:36px;font-weight:600;line-height:1.05;letter-spacing:-1.8px;color:${BRAND.text};">
            Got it, ${esc(p.name.split(' ')[0])}.
          </h1>
          <p class="text-mute" style="margin:14px 0 0 0;font-family:${FONT_STACK};font-size:16px;line-height:1.55;color:${BRAND.textMute};">
            I'll reply within 24 hours.
          </p>
          <p class="text-mute" style="margin:12px 0 0 0;font-family:${FONT_STACK};font-size:16px;line-height:1.55;color:${BRAND.textMute};">
            Got more to share? The
            <a href="${SITE_URL}/start" style="color:${BRAND.accent};text-decoration:underline;">project intake</a>
            is the longer version of this form.
          </p>

          ${divider()}

          ${label('Your message')}
          <div class="text" style="margin:14px 0 0 0;padding:20px;border-radius:12px;background:${BRAND.surface2};font-family:${FONT_STACK};font-size:15px;line-height:1.6;color:${BRAND.text};">
            ${paragraphsToHtml(p.message)}
          </div>
        ${cardClose()}

        <!-- signoff outside the card — feels more like a personal note -->
        <tr><td style="padding:24px 4px 0 4px;">
          <p class="text-mute" style="margin:0;font-family:${FONT_STACK};font-size:14px;line-height:1.6;color:${BRAND.textMute};">
            <span class="text" style="color:${BRAND.text};">russle</span>
          </p>
        </td></tr>
${chromeBodyClose()}`;

  const text = [
    `Got it, ${p.name.split(' ')[0]}.`,
    ``,
    `I'll reply within 24 hours.`,
    ``,
    `Got more to share? The project intake is the longer version of this form:`,
    `${SITE_URL}/start`,
    ``,
    `Your message:`,
    `--`,
    p.message,
    `--`,
    ``,
    `russle`,
    `${SITE_URL}`,
  ].join('\n');

  return { subject, html, text };
}

/* ────────────────────────────────────────────────────────────
   Project intake template
   ──────────────────────────────────────────────────────────── */

/**
 * Field metadata shared between the intake handler (validation) and the
 * email renderer (display). Single source of truth.
 */
export const INTAKE_FIELD_GROUPS: Array<{
  section: string;
  fields: Array<{ id: string; label: string }>;
}> = [
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
];

/**
 * The "Client Details" section is rendered as a meta block at the top of
 * the email rather than mixed in with the questionnaire body.
 */
const CLIENT_DETAIL_FIELDS: Array<{ id: string; label: string; isEmail?: boolean }> = [
  { id: 'client_name', label: 'Name' },
  { id: 'client_email', label: 'Email', isEmail: true },
  { id: 'client_company', label: 'Company' },
  { id: 'client_phone', label: 'Phone' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'budget_range', label: 'Budget' },
];

export function renderIntakeEmail(data: Record<string, string>): RenderedEmail {
  const subject = `New project brief from ${data.client_name}${
    data.client_company ? ` (${data.client_company})` : ''
  }`;

  // Top: client meta block — render any provided client detail fields as
  // a 2-column grid of label/value pairs inside the card.
  const metaRows: string[] = [];
  const filledClientDetails = CLIENT_DETAIL_FIELDS.filter((f) => (data[f.id] ?? '').trim());
  for (let i = 0; i < filledClientDetails.length; i += 2) {
    const left = filledClientDetails[i];
    const right = filledClientDetails[i + 1];
    metaRows.push(
      `<tr>${metaCell({ label: left.label, value: data[left.id], isEmail: left.isEmail })}${
        right ? metaCell({ label: right.label, value: data[right.id], isEmail: right.isEmail }) : '<td></td>'
      }</tr>`,
    );
  }

  // Body: each questionnaire section becomes a labelled block, only if any
  // of its fields were filled in.
  const sectionBlocks: string[] = [];
  for (const group of INTAKE_FIELD_GROUPS) {
    const filled = group.fields.filter((f) => (data[f.id] ?? '').trim());
    if (filled.length === 0) continue;

    const fieldHtml = filled
      .map(
        (f) => `
          <div style="margin:0 0 18px 0;">
            <p class="text-mute" style="margin:0 0 6px 0;font-family:${FONT_STACK};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${BRAND.textMute};">${esc(f.label)}</p>
            <div class="text" style="margin:0;font-family:${FONT_STACK};font-size:15px;line-height:1.55;color:${BRAND.text};">
              ${paragraphsToHtml(data[f.id])}
            </div>
          </div>`,
      )
      .join('');

    sectionBlocks.push(`
      <div style="margin:0 0 36px 0;">
        <h2 class="text" style="margin:0 0 20px 0;font-family:${FONT_STACK};font-size:20px;font-weight:600;letter-spacing:-0.6px;color:${BRAND.text};">${esc(group.section)}</h2>
        ${fieldHtml}
      </div>`);
  }

  // If there's an "anything_else" — call it out at the very end as its own
  // emphasised block, since it's where the most useful colour usually lives.
  const anythingElse = data.anything_else?.trim();

  const html = `${chromeHead(subject)}
${chromeBodyOpen()}
        ${cardOpen()}
          ${label('New project brief')}
          <h1 class="text h1" style="margin:18px 0 0 0;font-family:${FONT_STACK};font-size:36px;font-weight:600;line-height:1.05;letter-spacing:-1.8px;color:${BRAND.text};">
            From ${esc(data.client_name)}
          </h1>
          ${data.client_company
            ? `<p class="text-mute" style="margin:10px 0 0 0;font-family:${FONT_STACK};font-size:16px;line-height:1.4;color:${BRAND.textMute};">${esc(data.client_company)}</p>`
            : ''}

          ${divider()}

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${metaRows.join('')}
          </table>

          ${divider()}

          ${sectionBlocks.join('')}

          ${
            anythingElse
              ? `
            <div style="margin:8px 0 0 0;padding:24px;border-radius:16px;background:${BRAND.surface2};">
              ${label('Anything else')}
              <div class="text" style="margin:12px 0 0 0;font-family:${FONT_STACK};font-size:15px;line-height:1.55;color:${BRAND.text};">
                ${paragraphsToHtml(anythingElse)}
              </div>
            </div>
          `
              : ''
          }
        ${cardClose()}
${chromeBodyClose()}`;

  // Plain-text twin
  const textLines: string[] = [];
  textLines.push(`New project brief — russle`);
  textLines.push(`=`.repeat(40));
  textLines.push(``);
  textLines.push(`From:    ${data.client_name}${data.client_company ? ` (${data.client_company})` : ''}`);
  textLines.push(`Email:   ${data.client_email}`);
  if (data.client_phone) textLines.push(`Phone:   ${data.client_phone}`);
  if (data.timeline) textLines.push(`Timeline: ${data.timeline}`);
  if (data.budget_range) textLines.push(`Budget:  ${data.budget_range}`);
  textLines.push(``);

  for (const group of INTAKE_FIELD_GROUPS) {
    const filled = group.fields.filter((f) => (data[f.id] ?? '').trim());
    if (filled.length === 0) continue;
    textLines.push(`## ${group.section}`);
    textLines.push(`-`.repeat(group.section.length + 3));
    for (const field of filled) {
      textLines.push(``);
      textLines.push(`${field.label}:`);
      textLines.push(data[field.id]);
    }
    textLines.push(``);
  }

  if (anythingElse) {
    textLines.push(`## Anything else`);
    textLines.push(`-`.repeat(15));
    textLines.push(anythingElse);
    textLines.push(``);
  }

  textLines.push(`--`);
  textLines.push(`Sent from the project intake form on ${SITE_URL}`);
  textLines.push(formattedDate());

  return { subject, html, text: textLines.join('\n') };
}

/* ────────────────────────────────────────────────────────────
   Intake confirmation (sent TO the submitter)
   ──────────────────────────────────────────────────────────── */

export function renderIntakeConfirmation(data: Record<string, string>): RenderedEmail {
  const subject = `Brief received — russle`;
  const firstName = (data.client_name || '').split(' ')[0] || 'there';

  const html = `${chromeHead(subject)}
${chromeBodyOpen()}
        ${cardOpen()}
          ${label('Brief received')}
          <h1 class="text h1" style="margin:18px 0 0 0;font-family:${FONT_STACK};font-size:36px;font-weight:600;line-height:1.05;letter-spacing:-1.8px;color:${BRAND.text};">
            Got it, ${esc(firstName)}.
          </h1>
          <p class="text-mute" style="margin:14px 0 0 0;font-family:${FONT_STACK};font-size:16px;line-height:1.55;color:${BRAND.textMute};">
            Your brief is in. I'll read it properly and come back within 24 hours.
          </p>

          ${divider()}

          ${label("What happens next")}
          <div class="text" style="margin:14px 0 0 0;font-family:${FONT_STACK};font-size:15px;line-height:1.65;color:${BRAND.text};">
            <p style="margin:0 0 14px 0;">
              <strong style="color:${BRAND.text};">Next 24 hours</strong> — questions or a call slot.
            </p>
            <p style="margin:0 0 14px 0;">
              <strong style="color:${BRAND.text};">After the call</strong> — fixed-price proposal with scope and timeline.
            </p>
            <p style="margin:0;">
              <strong style="color:${BRAND.text};">If we go ahead</strong> — kickoff within two weeks.
            </p>
          </div>
        ${cardClose()}

        <tr><td style="padding:24px 4px 0 4px;">
          <p class="text-mute" style="margin:0;font-family:${FONT_STACK};font-size:14px;line-height:1.6;color:${BRAND.textMute};">
            <span class="text" style="color:${BRAND.text};">russle</span>
          </p>
        </td></tr>
${chromeBodyClose()}`;

  const text = [
    `Got it, ${firstName}.`,
    ``,
    `Your brief is in. I'll read it properly and come back within 24 hours.`,
    ``,
    `What happens next:`,
    `--`,
    `• Next 24 hours — questions or a call slot.`,
    `• After the call — fixed-price proposal with scope and timeline.`,
    `• If we go ahead — kickoff within two weeks.`,
    ``,
    `russle`,
    `${SITE_URL}`,
  ].join('\n');

  return { subject, html, text };
}
