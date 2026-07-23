import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { ProductGrid } from '../../components/shop/product-grid';
import { BundleBuilder } from '../../components/shop/bundle-builder';

export default function ShopPage() {
  return (
    <main>
      <Header />

      <section className="section-space pb-10">
        <div className="container-shell pt-12">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-soft)]">
            Shop
          </p>
          <h1 className="display-font mt-3 text-6xl leading-none md:text-7xl">
            Seasonal flavors, curated for premium refreshment
          </h1>
          <p className="mt-5 max-w-[58ch] leading-7 text-[var(--text-muted)]">
            Explore the full Aura range, mix seasonal expressions, and build a
            premium hydration bundle with floral spring notes, crisp summer
            citrus, winter berry depth, and autumn warmth.
          </p>
        </div>
      </section>

      <ProductGrid />
      <BundleBuilder />
      <Footer />
    </main>
  );
}
