import Script from 'next/script';
import { Section } from '@/components/layout/Section';

/**
 * Trustpilot micro review-count strip (official TrustBox embed). Renders
 * nothing until NEXT_PUBLIC_TRUSTPILOT_BUSINESSUNIT_ID is set, so the site
 * stays clean until the profile has reviews worth showing. Find the id in
 * Trustpilot Business under Integrations > TrustBox.
 */
export function TrustpilotStrip() {
  const businessUnitId = process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESSUNIT_ID;
  if (!businessUnitId) return null;

  return (
    <Section tone="surface" spacing="s">
      <Script
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="lazyOnload"
      />
      <div
        className="trustpilot-widget"
        data-locale="en-GB"
        data-template-id="5419b6a8b0d04a076446a9ad"
        data-businessunit-id={businessUnitId}
        data-style-height="24px"
        data-style-width="100%"
        data-theme="light"
      >
        <a
          href="https://uk.trustpilot.com/review/russle.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-body text-[var(--color-text-mute)] underline-offset-4 hover:underline"
        >
          Read our reviews on Trustpilot
        </a>
      </div>
    </Section>
  );
}
