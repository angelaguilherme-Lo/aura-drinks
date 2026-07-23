'use client';

import { useMemo, useState } from 'react';
import { products, type Product } from './aura-data';
import { ProductDrawer } from './product-drawer';

const filters = ['All', 'Winter', 'Spring', 'Summer', 'Autumn'] as const;

export function ProductGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>('All');
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    if (active === 'All') return products;
    return products.filter((item) => item.collection === active);
  }, [active]);

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
                key={filter}
                onClick={() => setActive(filter)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active === filter
                    ? 'bg-[var(--primary)] text-[var(--text-inverse)]'
                    : 'border border-[var(--surface-line)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="premium-card shine rounded-[28px] p-5 transition hover:-translate-y-1"
            >
              <div className="mb-4 rounded-[22px] bg-gradient-to-br from-white/65 to-white/20 p-4">
                <div className="h-56 rounded-[18px] border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.15))]" />
              </div>

              <div className="mb-3 flex items-center justify-between gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${item.accent}`}
                >
                  {item.collection}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                  {item.tone}
                </span>
              </div>

              <h3 className="display-font text-3xl">{item.name}</h3>
              <p className="mt-2 text-sm font-medium">{item.flavor}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                {item.description}
              </p>

              <button
                onClick={() => setSelected(item)}
                className="mt-6 rounded-full border border-[var(--surface-line)] px-4 py-2 text-sm font-medium transition hover:bg-white/35"
              >
                View details
              </button>
            </article>
          ))}
        </div>
      </div>

      <ProductDrawer product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
