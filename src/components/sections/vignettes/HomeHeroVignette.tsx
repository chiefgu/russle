'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Star, TrendingUp, Mail } from 'lucide-react';
import { cn } from '@/lib/cn';
import { CHIP, CHIP_LABEL, DARK_PILL, PILL_LABEL } from './chrome';

// Homepage hero visual: a custom site (web design) that ranks on Google (SEO)
// and turns visitors into enquiries (conversion). Plays a one-time "load"
// reveal on mount, then stays in the loaded state (site content in, proof
// chips in, rank ticked to #1, stars filled).
const EASE = [0.16, 1, 0.3, 1] as const;

const scene: Variants = {
  rest: {},
  active: { transition: { staggerChildren: 0.09, delayChildren: 0.5 } },
};
const rise: Variants = {
  rest: { opacity: 0, y: 10 },
  active: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};
const fromLeft: Variants = {
  rest: { opacity: 0, x: -14, y: 6 },
  active: { opacity: 1, x: 0, y: 0, transition: { duration: 0.45, ease: EASE } },
};
const fromRight: Variants = {
  rest: { opacity: 0, x: 16 },
  active: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};
const pop: Variants = {
  rest: { opacity: 0, scale: 0.6 },
  active: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE } },
};

export function HomeHeroVignette({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [rank, setRank] = useState(reduce ? 1 : 3);

  // Rank ticks 3 -> 1 once, in step with the chip revealing.
  useEffect(() => {
    if (reduce) return;
    let n = 3;
    const start = window.setTimeout(() => {
      const id = window.setInterval(() => {
        n = Math.max(1, n - 1);
        setRank(n);
        if (n === 1) window.clearInterval(id);
      }, 260);
    }, 700);
    return () => window.clearTimeout(start);
  }, [reduce]);

  return (
    <motion.div
      initial={reduce ? 'active' : 'rest'}
      animate="active"
      variants={scene}
      role="img"
      aria-label="A custom website that ranks on Google and turns visitors into enquiries."
      className={cn('relative mx-auto w-full max-w-[520px] px-6 py-10', className)}
    >
      <div aria-hidden>
        {/* Browser card */}
        <div className="mx-auto w-[86%] overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] shadow-[0_32px_64px_-28px_rgba(26,20,16,0.3)]">
          {/* window chrome, with a load bar that fills on mount */}
          <div className="flex items-center gap-2 border-b border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-line-2)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-line-2)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-line-2)]" />
            <span className="relative ml-3 h-5 flex-1 overflow-hidden rounded-full bg-[var(--color-bg)]">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent-tint)]"
                initial={{ width: reduce ? '100%' : '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </span>
          </div>
          {/* site body, content reveals as it loads */}
          <div className="p-5">
            <div className="relative overflow-hidden rounded-[var(--radius-m)] bg-[var(--color-surface-2)]">
              <div className="aspect-[16/10]" />
              <div className="absolute inset-0 flex flex-col justify-center gap-2 p-5">
                <motion.div variants={rise} className="h-3 w-3/5 rounded-full bg-[var(--color-bg)]" />
                <motion.div variants={rise} className="h-3 w-2/5 rounded-full bg-[var(--color-bg)]/70" />
                <motion.div
                  variants={rise}
                  className="mt-2 inline-flex h-8 w-fit items-center whitespace-nowrap rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-5 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-on-accent)]"
                >
                  Get in touch
                </motion.div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <motion.div key={i} variants={rise} className="space-y-2">
                  <div className="aspect-square rounded-[var(--radius-s)] bg-[var(--color-surface)]" />
                  <div className="h-3 rounded-full bg-[var(--color-surface-2)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* SEO chip: rank ticks down to #1 */}
        <motion.div variants={fromLeft} className={cn(CHIP, '-left-1 top-6 -rotate-2')}>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent-tint)]">
            <TrendingUp className="h-3.5 w-3.5 text-[var(--color-accent)]" />
          </span>
          <span className={CHIP_LABEL}>Ranked #{rank} on Google</span>
        </motion.div>

        {/* Conversion pill: new enquiry, with a live pulse */}
        <motion.div variants={fromRight} className={cn(DARK_PILL, '-right-1 top-[34%] rotate-2')}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          </span>
          <Mail className="h-4 w-4 text-[var(--color-on-dark)]" />
          <span className={PILL_LABEL}>New enquiry · just now</span>
        </motion.div>

        {/* Review chip: stars fill in sequence */}
        <motion.div variants={fromLeft} className={cn(CHIP, '-left-2 bottom-8 rotate-1')}>
          <motion.span variants={scene} className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span key={i} variants={pop}>
                <Star className="h-3 w-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />
              </motion.span>
            ))}
          </motion.span>
          <span className={CHIP_LABEL}>5.0 from clients</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
