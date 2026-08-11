'use client';

import { useMemo, useState } from 'react';
import { getCollectionLabel } from '../../lib/catalog/presentation';
import type {
  CollectionSummary,
  ProductSummary,
} from '../../lib/catalog/types';
import { ProductCard } from './product-card';

type ProductGridProps = {
  products: ProductSummary[];
  collections: CollectionSummary[];
  initialCollectionSlug?: string;
};

export function ProductGrid({
  products,
  collections,
  initialCollectionSlug,
}: ProductGridProps) {
  const validInitialSlug = collections.some(
    (collection) => collection.slug === initialCollectionSlug
  )
    ? initialCollectionSlug
    : 'all';
  const [active, setActive] = useState(validInitialSlug);

  const filtered = useMemo(() => {
    if (active === 'all') return products;
    return products.filter((item) => item.collection.slug === active);
  }, [active, products]);

  const filters = [
    { slug: 'all', label: 'All' },
    ...collections.map((collection) => ({
      slug: collection.slug,
      label: getCollectionLabel(collection.name),
    })),
  ];

  return (
    <section id="products" className="section-space">
      <div className="container-shell">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-soft)]">
              Flavor catalog
            </p>
            <h2 className="display-font mt-3 text-5xl leading-none md:text-6xl">
              Explore the Aura range
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.slug}
                onClick={() => setActive(filter.slug)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active === filter.slug
                    ? 'bg-[var(--primary)] text-[var(--text-inverse)]'
                    : 'border border-[var(--surface-line)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-[var(--surface-line)] bg-white/80 p-10 text-center text-[var(--text-muted)]">
            No active products are available in this collection.
          </div>
        )}
      </div>
    </section>
  );
}
