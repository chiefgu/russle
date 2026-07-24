'use client';

import {
  Globe, Calendar, ShoppingBag, Mail, Sparkles, BrainCircuit, Hammer, Search, LifeBuoy,
} from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const CAPABILITIES = [
  {
    icon: Hammer,
    title: 'Custom builds',
    body: 'If you need something specific that none of these cover, we build it. Almost everything we used to outsource, we now do in-house.',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce stores',
    body: 'Online shops on our own platform. Products, stock, orders, payments. Comes with a dashboard and an iOS app for managing the shop from your phone.',
  },
  {
    icon: Sparkles,
    title: 'AI integrations',
    body: 'Practical AI built into the site. Chatbots that actually answer questions, content help, smart booking, customer support, recommendations.',
  },
  {
    icon: BrainCircuit,
    title: 'AI search optimisation (GEO)',
    body: 'Showing up when people ask ChatGPT, Perplexity, or Google AI Overviews for what you do. Schema, structured content, and brand signals that AI search engines actually read.',
  },
  {
    icon: Globe,
    title: 'Brochure and service-business sites',
    body: 'A clean site that shows what you do, who you do it for, what it costs, and how to get in touch.',
  },
  {
    icon: Calendar,
    title: 'Online booking and reservations',
    body: 'Customers book appointments, classes, or tables directly from your site. Clinics, studios, venues, restaurants, professional services.',
  },
  {
    icon: Search,
    title: 'SEO and AI search',
    body: 'Ranking in Google and showing up in ChatGPT and AI Overviews. Technical SEO, content, and schema that search engines and AI actually read.',
  },
  {
    icon: Mail,
    title: 'Email marketing',
    body: 'Welcome flows, newsletters, customer follow-ups, promotions. The retention work that keeps the same customer coming back.',
  },
  {
    icon: LifeBuoy,
    title: 'Hosting and care',
    body: 'We host the site on our platform, keep it fast and secure, and fix the small things before they become problems. One bill, looked after by us.',
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const COLS = 3; // diagonal computed for the lg layout; still cascades at other breakpoints

// Cells assemble on a diagonal wave from the top-left. `custom` carries the
// per-cell delay so the whole grid plays as one unit when it scrolls in.
const cellV: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};
const iconV: Variants = {
  hidden: { scale: 0.3, opacity: 0 },
  show: (delay: number) => ({
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 320, damping: 18, delay: delay + 0.12 },
  }),
};
const sparkV: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  show: (delay: number) => ({
    scale: [0.6, 2.2],
    opacity: [0.7, 0],
    transition: { duration: 0.7, ease: 'easeOut', delay: delay + 0.14 },
  }),
};

export function CapabilitiesGrid() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="grid gap-px overflow-hidden rounded-[var(--radius-l)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3"
    >
      {CAPABILITIES.map((cap, i) => {
        const Icon = cap.icon;
        const delay = reduce ? 0 : (Math.floor(i / COLS) + (i % COLS)) * 0.09;
        return (
          <motion.div
            key={cap.title}
            custom={delay}
            variants={reduce ? undefined : cellV}
            className="group relative flex h-full flex-col bg-[var(--color-bg)] p-8 md:p-10"
          >
            <div className="relative h-10 w-10">
              {/* spark that pings out as the icon lands */}
              {!reduce && (
                <motion.span
                  aria-hidden
                  custom={delay}
                  variants={sparkV}
                  className="absolute inset-0 rounded-full bg-[var(--color-accent-tint)]"
                />
              )}
              <motion.div
                custom={delay}
                variants={reduce ? undefined : iconV}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line-2)] text-[var(--color-accent)] transition-colors duration-300 group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-on-accent)]"
              >
                <Icon className="h-5 w-5" aria-hidden />
              </motion.div>
            </div>
            <h3 className="h5 mt-6 text-balance">{cap.title}</h3>
            <p className="text-body mt-4 text-[var(--color-text-mute)]">{cap.body}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
