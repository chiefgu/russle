'use client';

import { useEffect } from 'react';
import { Section } from '@/components/layout/Section';
import { Tag } from '@/components/ui/Tag';
import { Reveal } from '@/components/animations/Reveal';

export function CalEmbed() {
  useEffect(() => {
    // Cal.com inline embed bootstrap (EU instance, russle/30min).
    // Mirrors the snippet at https://cal.com/embed-snippets and is
    // idempotent: the loader script only attaches once per page.
    (function (C: Window, A: string, L: string) {
      const w = C as unknown as { Cal: CalGlobal; document: Document };
      const p = function (a: { q: unknown[] }, ar: unknown) {
        a.q.push(ar);
      };
      const d = w.document;
      w.Cal =
        w.Cal ||
        function (...args: unknown[]) {
          const cal = w.Cal;
          const ar = args;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const s = d.createElement('script');
            s.src = A;
            d.head.appendChild(s);
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function (...inner: unknown[]) {
              p(api as unknown as { q: unknown[] }, inner);
            };
            const namespace = ar[1] as string | undefined;
            (api as unknown as { q: unknown[] }).q = [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal as unknown as { q: unknown[] }, ['initNamespace', namespace]);
            } else {
              p(cal as unknown as { q: unknown[] }, ar);
            }
            return;
          }
          p(cal as unknown as { q: unknown[] }, ar);
        };
    })(window, 'https://app.cal.eu/embed/embed.js', 'init');

    const Cal = (window as unknown as { Cal: CalGlobal }).Cal;
    Cal('init', '30min', { origin: 'https://app.cal.eu' });
    Cal.ns['30min']('inline', {
      elementOrSelector: '#my-cal-inline-30min',
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink: 'russle/30min',
    });
    Cal.ns['30min']('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
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
                id="my-cal-inline-30min"
                className="h-[700px] w-full overflow-scroll rounded-[var(--radius-m)]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

type CalApi = {
  (...args: unknown[]): void;
  q: unknown[];
};

type CalGlobal = {
  (...args: unknown[]): void;
  loaded?: boolean;
  ns: Record<string, CalApi>;
  q: unknown[];
};
