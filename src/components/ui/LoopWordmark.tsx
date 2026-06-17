/**
 * Loop wordmark - italic "l" + upright "oop" in Instrument Serif.
 * Source: clients/loop/brand/logo/logo-loop-bloom-hybrid-transparent.svg
 *
 * The font is imported inside <defs> so it only loads on pages that
 * render this component (no global font in russle-site's root layout).
 * Color defaults to loop's primary terracotta and can be overridden.
 */
type LoopWordmarkProps = {
  className?: string;
  color?: string;
};

export function LoopWordmark({
  className,
  color = '#C2544D',
}: LoopWordmarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 320"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="loop"
      className={className}
    >
      <defs>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');`}
        </style>
      </defs>
      <text
        x="400"
        y="224"
        textAnchor="middle"
        fill={color}
        fontFamily="'Instrument Serif', Georgia, serif"
        fontWeight="400"
        fontSize="280"
        letterSpacing="-11"
      >
        <tspan fontStyle="italic" dx="0">l</tspan>
        <tspan dx="10">oop</tspan>
      </text>
    </svg>
  );
}
