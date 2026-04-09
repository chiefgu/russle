import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

export const EMAIL_FROM = process.env.CONTACT_EMAIL_FROM || 'russle <noreply@russle.co.uk>';
export const EMAIL_TO = process.env.CONTACT_EMAIL_TO || 'hello@russle.co.uk';

export function isResendConfigured(): boolean {
  return resend !== null;
}
