import { notFound } from 'next/navigation';
import { CatalogError } from '../../../components/catalog-error';
import { Footer } from '../../../components/footer';
import { Header } from '../../../components/header';
import { ProductGallery } from '../../../components/shop/product-gallery';
import { ProductInfo } from '../../../components/shop/product-info';
import { RelatedProducts } from '../../../components/shop/related-products';
import {
  CatalogApiError,
  getProductBySlug,
  getProducts,
} from '../../../lib/catalog/api';
import type { ProductSummary } from '../../../lib/catalog/types';

export default async function FlavorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    if (error instanceof CatalogApiError && error.statusCode === 404) {
      notFound();
    }

    const message =
      error instanceof Error ? error.message : 'Unable to load this product.';

    return (
      <main>
        <Header />
        <CatalogError message={message} />
        <Footer />
      </main>
    );
  }

  let related: ProductSummary[] = [];
  let relatedError: string | undefined;

  try {
    related = (await getProducts())
      .filter(
        (candidate) =>
          candidate.collection.slug === product.collection.slug &&
          candidate.slug !== product.slug
      )
      .slice(0, 3);
  } catch {
    relatedError = 'Related flavors are temporarily unavailable.';
  }

  return (
    <main>
      <Header />

      <section className="section-space pb-8">
        <div className="container-shell pt-12">
          <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <ProductGallery product={product} />
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      <RelatedProducts products={related} errorMessage={relatedError} />
      <Footer />
    </main>
  );
}
