/**
 * Unified conversion tracking. Form components call trackConversion with
 * a typed Conversion shape; this helper fires the right standard event
 * on each provider.
 *
 * Per the canonical russle analytics reference: form components MUST NOT
 * fire trackEvent or trackPixel directly. Always go through trackConversion.
 */

import { gaEvent } from './analytics';
import { trackPixel } from './pixel';

export type Conversion =
  | {
      type: 'intake_submit';
      budget_range?: string;
      timeline?: string;
      how_heard?: string;
      utm_source?: string;
      eventId?: string;
    }
  | {
      type: 'contact_form';
      subject?: string;
      eventId?: string;
    };

export function trackConversion(c: Conversion): void {
  const opts = c.eventId ? { eventID: c.eventId } : undefined;

  switch (c.type) {
    case 'intake_submit':
      gaEvent('generate_lead', {
        currency: 'GBP',
        value: 2500,
        form_type: 'intake',
        budget_range: c.budget_range || 'unspecified',
        timeline: c.timeline || 'unspecified',
        how_heard: c.how_heard || 'unspecified',
        utm_source: c.utm_source || 'direct',
      });
      trackPixel(
        'Lead',
        {
          content_name: 'Project intake',
          content_category: 'Brand and web design',
          currency: 'GBP',
          value: 2500,
        },
        opts,
      );
      return;

    case 'contact_form':
      gaEvent('generate_lead', {
        form_type: 'contact',
        subject: c.subject || 'unspecified',
      });
      trackPixel(
        'Contact',
        {
          content_name: c.subject || 'Studio contact',
        },
        opts,
      );
      return;
  }
}
