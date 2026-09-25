import seed from './demo-catalog.json';
import type {
  CollectionDetail,
  CollectionSummary,
  ProductDetail,
} from './types';

// Original catalogue recovered from aura-backend/src/db/seedData.json.
// These IDs deliberately cannot be mistaken for database product IDs.
export const demoProducts: ProductDetail[] = seed.products.map((product) => {
  const collection = seed.collections.find(
    (candidate) => candidate.slug === product.collectionSlug
  )!;
  return {
    ...product,
    id: `demo:${product.slug}`,
    active: true,
    collection: {
      id: `demo:${collection.slug}`,
      slug: collection.slug,
      name: collection.name,
    },
    createdAt: '2026-08-17T00:00:00.000Z',
    updatedAt: '2026-08-17T00:00:00.000Z',
    galleryImages: product.galleryImages.map((url, index) => ({
      url,
      altText: `${product.name} image ${index + 1}`,
    })),
  };
});

export const demoCollections: CollectionSummary[] = seed.collections.map(
  (collection) => ({
    ...collection,
    id: `demo:${collection.slug}`,
    productCount: demoProducts.filter(
      (product) => product.collection.slug === collection.slug
    ).length,
  })
);

export function demoCollectionBySlug(
  slug: string
): CollectionDetail | undefined {
  const collection = demoCollections.find(
    (candidate) => candidate.slug === slug
  );
  if (!collection) return undefined;
  return {
    ...collection,
    products: demoProducts.filter(
      (product) => product.collection.slug === slug
    ),
  };
}
