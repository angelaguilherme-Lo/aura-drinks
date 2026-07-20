"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "../aura-data";
import { useCart } from "../cart/cart-provider";
import { FavoriteButton } from "../favorites/favorite-button";

type ProductCardProps = {
  product: Product;
};

function badgeClass(collection: Product["collection"]) {
  switch (collection) {
    case "Winter":
      return "bg-rose-100 text-rose-800";
    case "Spring":
      return "bg-lime-100 text-lime-800";
    case "Summer":
      return "bg-amber-100 text-amber-800";
    case "Autumn":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-stone-100 text-stone-800";
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[var(--surface-line)] bg-white/95 p-5 shadow-[0_14px_34px_rgba(30,20,10,0.05)] backdrop-blur-sm transition duration-300 hover:-translate-y-1">
      <div className="relative">
        <div className="absolute right-0 top-0 z-10">
          <FavoriteButton slug={product.slug} />
        </div>

        <Link
          href={`/flavors/${product.slug}`}
          className="block"
          aria-label={`View details for ${product.name}`}
        >
          <div className="relative mx-auto flex h-[240px] w-full items-center justify-center overflow-hidden">
            <div className="relative h-[220px] w-full max-w-[190px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain object-center transition duration-500 group-hover:scale-[1.08]"
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 220px"
              />
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${badgeClass(product.collection)}`}
        >
          {product.collection}
        </span>

        <span className="text-sm font-medium text-[var(--text-soft)]">
          €{product.price.toFixed(2)}
        </span>
      </div>

      <div className="mt-4">
        <Link
          href={`/flavors/${product.slug}`}
          className="block"
          aria-label={`Open ${product.name}`}
        >
          <h3 className="text-[20px] leading-[1.12] tracking-[-0.03em] text-[var(--text)]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 text-sm font-medium text-[var(--text)]">
          {product.flavor}
        </p>
      </div>

      <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
        {product.description}
      </p>

      <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
        <Link
          href={`/flavors/${product.slug}`}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[var(--surface-line)] bg-white px-4 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
        >
          View details
        </Link>

        <button
          type="button"
          onClick={() => addItem(product, 1)}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#476f57] px-4 text-sm font-medium text-white transition hover:bg-[#3e624d]"
          aria-label={`Add ${product.name} to cart`}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}