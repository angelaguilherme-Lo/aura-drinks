import { CatalogError } from '../../components/catalog-error';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { BundleBuilder } from '../../components/shop/bundle-builder';
import { ProductGrid } from '../../components/shop/product-grid';
import { getCollections, getProducts } from '../../lib/catalog/api';

type ShopPageProps = {
  searchParams: Promise<{ collection?: string | string[] }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { collection } = await searchParams;
  const requestedCollection =
    typeof collection === 'string' ? collection : undefined;

  let catalog;
  try {
    const [products, collections] = await Promise.all([
      getProducts(),
      getCollections(),
    ]);
    catalog = { products, collections };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to load the catalog.';

    return (
      <main>
        <Header />
        <ShopIntro />
        <CatalogError message={message} />
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <ShopIntro />
      <ProductGrid
        key={requestedCollection ?? 'all'}
        products={catalog.products}
        collections={catalog.collections}
        initialCollectionSlug={requestedCollection}
      />
      <BundleBuilder products={catalog.products} />
      <Footer />
    </main>
  );
}

function ShopIntro() {
  return (
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
  );
}
