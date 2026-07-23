'use client';

import { useCart } from './cart-provider';

type CartTriggerProps = {
  onClick?: () => void;
};

export function CartTrigger({ onClick }: CartTriggerProps) {
  const { totalItems } = useCart();

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative inline-flex h-11 items-center justify-center rounded-full border border-[var(--surface-line)] bg-white px-5 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
      aria-label={`Open cart with ${totalItems} items`}
    >
      Cart
      {totalItems > 0 && (
        <span className="ml-3 inline-flex min-w-[24px] items-center justify-center rounded-full bg-[#476f57] px-2 py-0.5 text-xs font-semibold text-white">
          {totalItems}
        </span>
      )}
    </button>
  );
}
