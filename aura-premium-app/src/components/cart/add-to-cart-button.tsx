'use client';

import type { ReactNode } from 'react';
import type { ProductSummary } from '../../lib/catalog/types';
import { useCart } from './cart-provider';

type AddToCartButtonProps = {
  product: ProductSummary;
  quantity?: number;
  className?: string;
  children?: ReactNode;
};

export function AddToCartButton({
  product,
  quantity = 1,
  className,
  children,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem(product, quantity)}
      className={
        className ??
        'inline-flex h-11 items-center justify-center rounded-full bg-[#476f57] px-5 text-sm font-medium text-white transition hover:bg-[#3e624d]'
      }
      aria-label={`Add ${product.name} to cart`}
    >
      {children ?? 'Add to cart'}
    </button>
  );
}
