"use client";

import { useMemo, useState } from "react";
import { products } from "../aura-data";
import { ProductCard } from "./product-card";

const filters = ["All", "Winter", "Spring", "Summer", "Autumn"] as const;

export function ProductGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return products;
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
                    ? "bg-[var(--primary)] text-[var(--text-inverse)]"
                    : "border border-[var(--surface-line)] text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}