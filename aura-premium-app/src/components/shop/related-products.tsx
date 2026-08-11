import Link from 'next/link';
import type { ProductSummary } from '../../lib/catalog/types';

export function RelatedProducts({
  products,
  errorMessage,
}: {
  products: ProductSummary[];
  errorMessage?: string;
}) {
  if (errorMessage) {
    return (
      <section className="section-space">
        <div className="container-shell text-sm text-[var(--text-muted)]">
          {errorMessage}
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-soft)]">
            Related flavors
          </p>
          <h2 className="display-font mt-3 text-5xl leading-none md:text-6xl">
            More from the same collection
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/flavors/${product.slug}`}
              className="premium-card overflow-hidden rounded-[28px] p-0 transition hover:-translate-y-1"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-60 w-full object-cover object-center"
                loading="lazy"
              />

              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                  {product.collection.name}
                </div>
                <h3 className="display-font mt-3 text-3xl">{product.name}</h3>
                <p className="mt-2 text-sm font-medium">{product.flavor}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
