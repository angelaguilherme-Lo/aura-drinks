'use client';

import { useState } from 'react';
import type { Product } from '../aura-data';
import { AddToCartButton } from '../cart/add-to-cart-button';
import { FavoriteButton } from '../favorites/favorite-button';

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const [qty, setQty] = useState<number>(3);

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${product.accent}`}
        >
          {product.collection}
        </span>

        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-[var(--text)]">
            €{product.price.toFixed(2)}
          </span>
          <FavoriteButton slug={product.slug} />
        </div>
      </div>

      <h1 className="display-font mt-5 text-4xl leading-[0.98] text-[var(--text)] md:text-5xl">
        {product.name}
      </h1>

      <p className="mt-3 text-base font-medium text-[var(--text)]">
        {product.flavor}
      </p>

      <p className="mt-6 max-w-[60ch] text-[15px] leading-8 text-[var(--text-muted)]">
        {product.longDescription}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[24px] border border-[var(--surface-line)] bg-white/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
            Benefits
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
            {product.benefits.map((benefit) => (
              <li key={benefit}>• {benefit}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-[24px] border border-[var(--surface-line)] bg-white/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
            Ingredients
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
            {product.ingredients.map((ingredient) => (
              <li key={ingredient}>• {ingredient}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center rounded-full border border-[var(--surface-line)] bg-white">
          <button
            type="button"
            onClick={() => setQty((current) => Math.max(1, current - 1))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-l-full text-[var(--text)]"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span className="min-w-[44px] text-center text-sm font-medium text-[var(--text)]">
            {qty}
          </span>

          <button
            type="button"
            onClick={() => setQty((current) => current + 1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-r-full text-[var(--text)]"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <AddToCartButton
          product={product}
          quantity={qty}
          className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--primary)] px-6 text-sm font-semibold text-[var(--text-inverse)] transition hover:opacity-90"
        >
          Add to cart
        </AddToCartButton>

        <AddToCartButton
          product={product}
          quantity={6}
          className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--surface-line)] bg-white px-6 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
        >
          Add 6-pack
        </AddToCartButton>
      </div>

      <div className="mt-8 grid gap-3 text-sm text-[var(--text-muted)] sm:grid-cols-3">
        <div className="rounded-[20px] border border-[var(--surface-line)] bg-white/60 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-soft)]">
            Size
          </p>
          <p className="mt-2 font-medium text-[var(--text)]">{product.size}</p>
        </div>

        <div className="rounded-[20px] border border-[var(--surface-line)] bg-white/60 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-soft)]">
            Collection
          </p>
          <p className="mt-2 font-medium text-[var(--text)]">
            {product.collection}
          </p>
        </div>

        <div className="rounded-[20px] border border-[var(--surface-line)] bg-white/60 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-soft)]">
            Tone
          </p>
          <p className="mt-2 font-medium text-[var(--text)]">{product.tone}</p>
        </div>
      </div>
    </div>
  );
}
