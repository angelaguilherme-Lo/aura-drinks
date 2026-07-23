import { notFound } from 'next/navigation';
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from '../../../components/aura-data';
import { Header } from '../../../components/header';
import { Footer } from '../../../components/footer';
import { ProductGallery } from '../../../components/shop/product-gallery';
import { ProductInfo } from '../../../components/shop/product-info';
import { RelatedProducts } from '../../../components/shop/related-products';

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function FlavorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.collection, product.slug);

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

      <RelatedProducts products={related} />
      <Footer />
    </main>
  );
}
