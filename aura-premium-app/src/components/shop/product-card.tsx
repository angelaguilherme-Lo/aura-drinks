"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "../aura-data";
import { useCart } from "../cart/cart-provider";

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
    <article className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-[var(--surface-line)] bg-white/92 shadow-[0_16px_40px_rgba(30,20,10,0.05)] backdrop-blur-sm transition duration-300 hover:-translate-y-1">
      <Link
        href={`/flavors/${product.slug}`}
        className="block"
        aria-label={`View details for ${product.name}`}
      >
        <div className="relative h-[320px] overflow-hidden bg-white">
          <div className="absolute inset-x-3 bottom-0 top-3">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain object-bottom transition duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${badgeClass(product.collection)}`}
          >
            {product.collection}
          </span>

          <span className="pt-1 text-sm font-medium text-[var(--text-soft)]">
            €{product.price.toFixed(2)}
          </span>
        </div>

        <div className="mt-4 min-h-[88px]">
          <Link
            href={`/flavors/${product.slug}`}
            className="block"
            aria-label={`Open ${product.name}`}
          >
            <h3 className="text-[22px] leading-[1.08] tracking-[-0.03em] text-[var(--text)]">
              {product.name}
            </h3>
          </Link>

          <p className="mt-3 text-sm font-medium text-[var(--text)]">
            {product.flavor}
          </p>
        </div>

        <div className="mt-4 min-h-[96px]">
          <p className="text-sm leading-7 text-[var(--text-muted)]">
            {product.description}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-3 pt-6">
          <Link
            href={`/flavors/${product.slug}`}
            className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--surface-line)] bg-white px-5 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
          >
            View details
          </Link>

          <button
            type="button"
            onClick={() => addItem(product, 1)}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#476f57] px-5 text-sm font-medium text-white transition hover:bg-[#3e624d]"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}