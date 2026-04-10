'use client';

import { useEffect } from 'react';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || 'russle/discovery';

export function CalEmbed() {
  useEffect(() => {
    // Lazy-load Cal.com embed script. The script self-bootstraps an iframe
    // into the [data-cal-link] anchor below.
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Section tone="surface" spacing="xl" id="call">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <Tag>Or book direct</Tag>
            <h2 className="h2 mt-6 text-balance">Book a 30-min discovery call.</h2>
            <p className="text-big mt-6 max-w-md text-[var(--color-text-mute)]">
              Rather talk than type? Grab a slot.
            </p>
            <p className="text-small mt-6 text-[var(--color-text-soft)]">
              If the embed doesn&apos;t load,{' '}
              <a href="mailto:hello@russle.co.uk" className="link">
                email me
              </a>
              .
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-bg)] p-2">
              <div
                className="aspect-[4/3] w-full"
                data-cal-link={CAL_LINK}
                data-cal-config='{"theme":"light"}'
              >
                <iframe
                  src={`https://cal.com/${CAL_LINK}`}
                  title="Book a discovery call"
                  className="h-full w-full rounded-[var(--radius-m)]"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
