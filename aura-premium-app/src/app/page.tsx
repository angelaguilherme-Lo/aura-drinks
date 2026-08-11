import { Benefits } from '../components/benefits';
import { CatalogError } from '../components/catalog-error';
import { Collections } from '../components/collections';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Hero } from '../components/hero';
import { BundleBuilder } from '../components/shop/bundle-builder';
import { Story } from '../components/story';
import { getCollections, getProducts } from '../lib/catalog/api';

export default async function HomePage() {
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
        <Hero />
        <CatalogError message={message} />
        <Benefits />
        <Story />
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <Hero />
      <Collections collections={catalog.collections} />
      <BundleBuilder products={catalog.products} />
      <Benefits />
      <Story />
      <Footer />
    </main>
  );
}
