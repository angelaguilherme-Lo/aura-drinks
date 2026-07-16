"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { products, type Product } from "../aura-data";
import { useCart } from "../cart/cart-provider";

const featuredBundleSlugs = [
  "pomegranate-spruce",
  "cranberry-evergreen",
  "spiced-pear",
  "bergamot-pine",
] as const;

function getSeasonBadge(collection: Product["collection"]) {
  return `${collection} Collection`;
}

export function BundleBuilder() {
  const { addItem } = useCart();

  const featuredProducts = useMemo<Product[]>(() => {
    return featuredBundleSlugs
      .map((slug) => products.find((product) => product.slug === slug))
      .filter((product): product is Product => product !== undefined);
  }, []);

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="premium-card rounded-[36px] px-6 py-6 shadow-[0_24px_70px_rgba(30,20,10,0.08)] md:px-8 md:py-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
            <div className="max-w-[520px]">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-soft)]">
                Build your bundle
              </p>

              <h2 className="display-font mt-3 max-w-[10ch] text-5xl leading-[0.95] md:text-6xl">
                Curate a 3-pack or 6-pack
              </h2>

              <p className="mt-6 max-w-[42ch] text-[15px] leading-8 text-[var(--text-muted)]">
                Premium seasonal selection works best when discovery and purchase are
                combined. Start with a curated bundle and mix flavors across winter berry,
                spring botanicals, summer citrus, and autumn spice.
              </p>

              <div className="mt-8 space-y-3 text-sm leading-7 text-[var(--text-muted)]">
                <p>• 3 bottles = 5% bundle discount</p>
                <p>• 6 bottles = 10% bundle discount</p>
                <p>• Designed for gifting, tasting, and repeat discovery</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {featuredProducts.map((product, index) => (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[var(--surface-line)] bg-white/85 shadow-[0_14px_34px_rgba(30,20,10,0.05)] backdrop-blur-sm"
                >
                  <Link
                    href={`/flavors/${product.slug}`}
                    aria-label={`View details for ${product.name}`}
                    className="block"
                  >
                    <div className="relative h-[260px] w-full overflow-hidden bg-[var(--surface-2)]">
                      <div className="absolute inset-x-3 bottom-0 top-3">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain object-bottom transition duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 100vw, 50vw"
                          priority={index < 2}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent" />
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex items-center rounded-full bg-[#132821] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#dbffe6]">
                        {getSeasonBadge(product.collection)}
                      </span>

                      <span className="pt-1 text-sm font-medium text-[var(--text-soft)]">
                        €{product.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="mt-4 min-h-[72px]">
                      <h3 className="text-[30px] leading-[1.02] tracking-[-0.03em] text-[var(--text)]">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-sm text-[var(--text-muted)]">
                        {product.flavor}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center gap-3 pt-5">
                      <Link
                        href={`/flavors/${product.slug}`}
                        className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--surface-line)] bg-white px-4 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
                      >
                        View details
                      </Link>

                      <button
                        type="button"
                        onClick={() => addItem(product, 1)}
                        className="inline-flex h-11 items-center justify-center rounded-full bg-[#476f57] px-4 text-sm font-medium text-white transition hover:bg-[#3e624d]"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}