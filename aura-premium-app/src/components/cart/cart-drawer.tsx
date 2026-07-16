"use client";

import { useCart } from "./cart-provider";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--surface-line)] px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text)]">Your cart</h2>
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
              <p className="text-sm text-[var(--text-muted)]">Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.slug}
                  className="rounded-[24px] border border-[var(--surface-line)] bg-[var(--surface)] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text)]">
                        {item.product.name}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        €{item.product.price.toFixed(2)} each
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
                      €{(item.product.price * item.quantity).toFixed(2)}
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
              €{subtotal.toFixed(2)}
            </span>
          </div>

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
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-[#476f57] px-4 text-sm font-medium text-white transition hover:bg-[#3e624d]"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}