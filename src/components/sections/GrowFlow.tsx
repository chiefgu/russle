'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { Search, Mail, MapPin, Send, Star, ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/cn';

type GrowFlowProps = {
  className?: string;
};

export function GrowFlow({ className }: GrowFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const localRef = useRef<HTMLDivElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="How Grow works: a new visitor finds the brand through search, email or the local profile, and the studio runs all three to produce bookings, walk-ins and repeat business."
      className={cn(
        // mx-auto + max-w caps the diagram on tablet widths where the section
        // is single-column; at lg+ the parent column is narrower than this cap
        // so it has no effect there.
        'relative mx-auto aspect-[4/5] w-full max-w-[640px] md:aspect-[5/6]',
        className,
      )}
    >
      <Node
        innerRef={triggerRef}
        widthClass="w-[60%] md:w-[50%]"
        className="left-1/2 top-[2%] -translate-x-1/2 md:top-[8%]"
        kind="trigger"
        title="New visitor finds the brand"
        meta="search · referral · social"
      />

      <Node
        innerRef={searchRef}
        widthClass="w-[31%]"
        className="left-[1%] top-[40%]"
        kind="engine"
        icon={<Search className="h-4 w-4" />}
        title="Search"
        meta="“cakes manchester”"
        body={
          <div className="hidden rounded-[var(--radius-s)] border border-[var(--color-line)] bg-[var(--color-bg)] p-2 text-[11px] leading-tight md:block">
            <div className="truncate text-[var(--color-accent)]">bethbakescakes.com</div>
            <div className="font-medium">Bespoke cakes</div>
            <div className="text-[var(--color-text-mute)]">★ 4.9 · 240+</div>
          </div>
        }
      />

      <Node
        innerRef={emailRef}
        widthClass="w-[31%]"
        className="left-1/2 top-[40%] -translate-x-1/2"
        kind="engine"
        icon={<Mail className="h-4 w-4" />}
        title="Email"
        meta="welcome · nurture · winback"
        body={
          <div className="hidden rounded-[var(--radius-s)] border border-[var(--color-line)] bg-[var(--color-bg)] p-2 text-[11px] leading-tight md:block">
            <div className="font-medium">Tasting box ready</div>
            <div className="text-[var(--color-text-mute)]">Open · Click · Reply</div>
          </div>
        }
      />

      <Node
        innerRef={localRef}
        widthClass="w-[31%]"
        className="right-[1%] top-[40%]"
        kind="engine"
        icon={<MapPin className="h-4 w-4" />}
        title="Local"
        meta="Google Business"
        body={
          <div className="hidden rounded-[var(--radius-s)] border border-[var(--color-line)] bg-[var(--color-bg)] p-2 text-[11px] leading-tight md:block">
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />
              <Star className="h-3 w-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />
              <Star className="h-3 w-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />
              <Star className="h-3 w-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />
              <Star className="h-3 w-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />
              <span className="ml-1 text-[var(--color-text-mute)]">4.9</span>
            </div>
            <div className="font-medium">2.4 km away</div>
          </div>
        }
      />

      <Node
        innerRef={outcomeRef}
        widthClass="w-[60%] md:w-[55%]"
        className="left-1/2 top-[80%] -translate-x-1/2"
        kind="result"
        icon={<Send className="h-4 w-4" />}
        title="Bookings, walk-ins, repeats"
        meta="measured monthly"
      />

      {/* Connectors - drawn dynamically from real card rects so the paths
          always meet the card edges, regardless of viewport or content height. */}
      <Connector containerRef={containerRef} fromRef={triggerRef} toRef={searchRef} dashed />
      <Connector containerRef={containerRef} fromRef={triggerRef} toRef={emailRef} dashed />
      <Connector containerRef={containerRef} fromRef={triggerRef} toRef={localRef} dashed />
      <Connector containerRef={containerRef} fromRef={searchRef} toRef={outcomeRef} accent />
      <Connector containerRef={containerRef} fromRef={emailRef} toRef={outcomeRef} accent />
      <Connector containerRef={containerRef} fromRef={localRef} toRef={outcomeRef} accent />
    </div>
  );
}

type ConnectorProps = {
  containerRef: RefObject<HTMLDivElement | null>;
  fromRef: RefObject<HTMLDivElement | null>;
  toRef: RefObject<HTMLDivElement | null>;
  dashed?: boolean;
  accent?: boolean;
};

function Connector({ containerRef, fromRef, toRef, dashed, accent }: ConnectorProps) {
  const [path, setPath] = useState('');
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => {
      const c = containerRef.current;
      const a = fromRef.current;
      const b = toRef.current;
      if (!c || !a || !b) return;

      const cr = c.getBoundingClientRect();
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();

      const fromX = ar.left - cr.left + ar.width / 2;
      const fromY = ar.bottom - cr.top;
      const toX = br.left - cr.left + br.width / 2;
      const toY = br.top - cr.top;

      // S-curve: control points at the midpoint y. Gives a clean fan-out/in.
      const midY = (fromY + toY) / 2;
      setPath(`M ${fromX} ${fromY} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${toY}`);
      setDims({ w: cr.width, h: cr.height });
    };

    update();

    const obs = new ResizeObserver(update);
    if (containerRef.current) obs.observe(containerRef.current);
    if (fromRef.current) obs.observe(fromRef.current);
    if (toRef.current) obs.observe(toRef.current);

    window.addEventListener('resize', update);
    return () => {
      obs.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [containerRef, fromRef, toRef]);

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0"
      width={dims.w}
      height={dims.h}
      viewBox={`0 0 ${dims.w || 1} ${dims.h || 1}`}
      fill="none"
      aria-hidden
    >
      <path
        d={path}
        stroke={accent ? 'var(--color-accent)' : 'var(--color-line-2)'}
        strokeWidth="1.5"
        strokeDasharray={dashed ? '4 4' : undefined}
        strokeLinecap="round"
      />
    </svg>
  );
}

type NodeKind = 'trigger' | 'engine' | 'result';

type NodeProps = {
  innerRef: RefObject<HTMLDivElement | null>;
  kind: NodeKind;
  title: string;
  meta?: string;
  icon?: React.ReactNode;
  body?: React.ReactNode;
  className?: string;
  widthClass?: string;
};

const nodeStyles: Record<NodeKind, string> = {
  trigger: 'bg-[var(--color-surface-2)] text-[var(--color-text)]',
  engine: 'bg-[var(--color-surface)] text-[var(--color-text)]',
  result: 'bg-[var(--color-accent)] text-[var(--color-on-accent)]',
};

const labelStyles: Record<NodeKind, string> = {
  trigger: 'text-[var(--color-text-mute)]',
  engine: 'text-[var(--color-text-mute)]',
  result: 'text-[rgba(255,255,255,0.8)]',
};

const labelText: Record<NodeKind, string> = {
  trigger: 'trigger',
  engine: 'engine',
  result: 'outcome',
};

function Node({ innerRef, kind, title, meta, icon, body, className, widthClass = 'w-[44%]' }: NodeProps) {
  return (
    <div
      ref={innerRef}
      className={cn(
        'absolute rounded-[var(--radius-m)] border border-[var(--color-line-2)] p-3 shadow-sm',
        nodeStyles[kind],
        widthClass,
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em]',
          labelStyles[kind],
        )}
      >
        {icon}
        <span>{labelText[kind]}</span>
      </div>
      <div className="mt-2 text-sm font-medium leading-tight tracking-[-0.01em]">
        {title}
      </div>
      {meta ? (
        <div
          className={cn(
            'mt-0.5 text-xs',
            kind === 'result' ? 'text-[rgba(255,255,255,0.8)]' : 'text-[var(--color-text-mute)]',
          )}
        >
          {meta}
        </div>
      ) : null}
      {body ? <div className="mt-3">{body}</div> : null}
      {kind === 'engine' ? (
        <ArrowUpRight className="absolute right-2 top-2 h-3.5 w-3.5 text-[var(--color-text-mute)]" />
      ) : null}
    </div>
  );
}
