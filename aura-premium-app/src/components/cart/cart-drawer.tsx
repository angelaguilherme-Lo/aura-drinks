'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { demoTotals } from '../../lib/demo-checkout';
import { formatPrice } from '../../lib/catalog/price';
import { useCart } from './cart-provider';

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const router = useRouter();
  const { items, currency, updateQuantity, removeItem, clearCart } = useCart();

  const totals = demoTotals(items);
  function handleCheckout() {
    if (!items.length) return;
    onClose();
    router.push('/checkout');
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--surface-line)] px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text)]">
              Your cart
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Review your selected Aura drinks
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--surface-line)] text-[var(--text)] transition hover:bg-[var(--surface)]"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-[var(--surface-line)] bg-[var(--surface)] p-6 text-center">
              <p className="text-sm text-[var(--text-muted)]">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.slug}
                  className="rounded-[24px] border border-[var(--surface-line)] bg-[var(--surface)] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={64}
                      height={88}
                      className="h-24 w-16 shrink-0 rounded-2xl bg-white object-contain"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text)]">
                        {item.product.name}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        {formatPrice(
                          item.product.priceCents,
                          item.product.currency
                        )}{' '}
                        each
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.product.slug)}
                      className="text-sm text-[var(--text-muted)] transition hover:text-[var(--text)]"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.slug, item.quantity - 1)
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--surface-line)] bg-white"
                        aria-label={`Decrease quantity of ${item.product.name}`}
                      >
                        −
                      </button>

                      <span className="min-w-[28px] text-center text-sm font-medium text-[var(--text)]">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.slug, item.quantity + 1)
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--surface-line)] bg-white"
                        aria-label={`Increase quantity of ${item.product.name}`}
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm font-semibold text-[var(--text)]">
                      {formatPrice(
                        item.product.priceCents * item.quantity,
                        item.product.currency
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-[var(--surface-line)] px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-[var(--text-muted)]">Subtotal</span>
            <span className="text-lg font-semibold text-[var(--text)]">
              {formatPrice(totals.subtotalCents, currency)}
            </span>
          </div>

          {totals.discountPercent > 0 && (
            <div className="mb-3 flex justify-between text-sm text-[#476f57]">
              <span>Bundle saving ({totals.discountPercent}%)</span>
              <span>−{formatPrice(totals.discountCents, currency)}</span>
            </div>
          )}
          <div className="mb-4 flex justify-between font-semibold">
            <span>Demo total</span>
            <span>{formatPrice(totals.totalCents, currency)}</span>
          </div>
          <p className="mb-4 text-xs text-[var(--text-muted)]">
            Demo shopping experience. No payment or account needed.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={clearCart}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-[var(--surface-line)] bg-white px-4 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={items.length === 0}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-[#476f57] px-4 text-sm font-medium text-white transition hover:bg-[#3e624d]"
            >
              Demo checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
