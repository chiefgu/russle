import { Heart, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/cn';

function ShopifyMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M6.5 7.5 5 20l7 1.5L19 20 17.5 7.5l-2.6-.4-.6-1.6a2.9 2.9 0 0 0-5.6 0l-.6 1.6z" fill="#95BF47" />
      <path d="M10 5.9a2 2 0 0 1 4 0l.3.9h-4.6z" fill="#5E8E3E" />
      <path
        d="M13.9 10.6c-.5-.3-1.2-.5-1.9-.4-1.5.1-2.5 1-2.4 2.2.1 1.6 2.9 1.7 3 3.1.1.8-.7 1.2-1.5 1.2-.9 0-1.7-.4-1.7-.4l-.3 1.4s.8.5 2 .5c1.8 0 3.1-1 3-2.6-.2-1.9-2.9-2-3-3.1 0-.5.4-1 1.3-1 .7 0 1.2.3 1.2.3z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function AppleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M16.4 12.7c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.5-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2 2.5 2 1 0 1.4-.6 2.6-.6 1.2 0 1.6.6 2.6.6s1.8-1 2.4-2c.8-1.1 1.1-2.2 1.1-2.3 0 0-2.1-.8-2.1-3z" />
      <path d="M14.4 6.6c.5-.7.9-1.6.8-2.6-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.8-.4 2.3-1z" />
    </svg>
  );
}

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.5z" />
      <path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A11.5 11.5 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.6 14.7a7 7 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4z" />
      <path fill="#EA4335" d="M12 4.6c1.7 0 3.2.6 4.4 1.7L19.7 3A11.5 11.5 0 0 0 1.8 7.3l3.8 3A6.9 6.9 0 0 1 12 4.6z" />
    </svg>
  );
}

const CHIP =
  'absolute flex items-center gap-2 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 shadow-[0_16px_32px_-16px_rgba(26,20,16,0.3)]';

export function EcommerceVignette({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="A custom online store with checkout, order alerts and stock sync, built on our platform or as a Shopify storefront."
      className={cn('relative mx-auto w-full max-w-[460px] px-6 py-8', className)}
    >
      <div aria-hidden>
        {/* Storefront card */}
        <div className="mx-auto w-[78%] rounded-[var(--radius-l)] border border-[var(--color-line)] bg-[var(--color-bg)] p-5 shadow-[0_24px_48px_-24px_rgba(26,20,16,0.25)]">
          <div className="relative overflow-hidden rounded-[var(--radius-m)] bg-[var(--color-surface-2)]">
            <div className="aspect-[4/3]" />
            {/* abstract product: a packet with an accent label */}
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <div className="h-24 w-20 rounded-[10px] bg-[var(--color-bg)] shadow-sm">
                <div className="mx-auto mt-2 h-2 w-12 rounded-full bg-[var(--color-surface)]" />
                <div className="mx-auto mt-3 h-10 w-14 rounded-[6px] bg-[var(--color-accent-tint)]" />
              </div>
            </div>
            {/* wishlist heart */}
            <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-bg)] shadow-sm">
              <Heart className="h-4 w-4 text-[var(--color-accent)]" />
            </div>
          </div>

          {/* carousel dots */}
          <div className="mt-4 flex justify-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-line-2)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-line-2)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-line-2)]" />
          </div>

          {/* skeleton copy */}
          <div className="mt-4 space-y-2">
            <div className="h-3 w-2/3 rounded-full bg-[var(--color-surface-2)]" />
            <div className="h-3 w-1/2 rounded-full bg-[var(--color-surface)]" />
          </div>

          {/* CTA */}
          <div className="mt-5 inline-flex h-11 items-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--color-on-accent)]">
            Add to basket
          </div>
        </div>

        {/* Shopify chip */}
        <div className={cn(CHIP, 'float-slow -left-1 top-6 -rotate-2')}>
          <ShopifyMark className="h-5 w-5" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
            Custom Shopify builds
          </span>
        </div>

        {/* Checkout pill */}
        <div className="float-slower absolute -right-1 top-[42%] flex rotate-2 items-center gap-3 rounded-[var(--radius-pill)] bg-[var(--color-dark)] px-4 py-2.5 shadow-[0_16px_32px_-16px_rgba(26,20,16,0.4)]">
          <span className="flex items-center gap-1 text-[12px] font-semibold text-[var(--color-on-dark)]">
            <AppleMark className="h-3.5 w-3.5" />
            Pay
          </span>
          <span className="h-3 w-px bg-[rgba(248,247,245,0.25)]" />
          <span className="flex items-center gap-1 text-[12px] font-semibold text-[var(--color-on-dark)]">
            <GoogleMark className="h-3.5 w-3.5" />
            Pay
          </span>
        </div>

        {/* Order notification chip */}
        <div className={cn(CHIP, 'float-slowest -left-3 bottom-16 rotate-1')}>
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
          <span className="text-[11px] font-bold text-[var(--color-text)]">
            Order received
            <span className="ml-1.5 font-medium text-[var(--color-text-mute)]">just now</span>
          </span>
        </div>

        {/* Stock chip */}
        <div className={cn(CHIP, 'float-slow -right-2 bottom-2 -rotate-1')}>
          <PackageCheck className="h-4 w-4 text-[var(--color-accent)]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-text)]">
            Stock synced
          </span>
        </div>
      </div>
    </div>
  );
}
