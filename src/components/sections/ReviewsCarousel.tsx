'use client';

import { useEffect, useRef, useState, Children } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * Horizontal scroll-snap carousel for review cards. Receives the
 * server-rendered cards as children; only the scroll chrome is client-side.
 * Cards show ~1 per view on mobile, 2 on md, 3 on lg. Arrows hide entirely
 * when everything fits without scrolling.
 */
export function ReviewsCarousel({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      const overflow = track.scrollWidth > track.clientWidth + 4;
      setCanScroll(overflow);
      setAtStart(track.scrollLeft <= 4);
      setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 4);
    };

    update();
    track.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(track);
    return () => {
      track.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('[data-carousel-card]');
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: 'smooth' });
  };

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-label="Client reviews"
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child) => (
          <div
            data-carousel-card
            className="w-[85%] flex-none snap-start sm:w-[70%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            {child}
          </div>
        ))}
      </div>

      {canScroll && (
        <div className="mt-8 flex justify-end gap-3">
          <CarouselArrow
            label="Previous reviews"
            disabled={atStart}
            onClick={() => scrollByCard(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </CarouselArrow>
          <CarouselArrow
            label="Next reviews"
            disabled={atEnd}
            onClick={() => scrollByCard(1)}
          >
            <ArrowRight className="h-5 w-5" />
          </CarouselArrow>
        </div>
      )}
    </div>
  );
}

function CarouselArrow({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-line-2)] text-[var(--color-text)] transition-colors duration-200 hover:bg-[var(--color-surface)] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
