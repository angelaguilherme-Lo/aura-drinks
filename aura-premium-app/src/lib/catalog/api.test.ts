import { afterEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  CatalogApiError,
  getCollections,
  getCollectionBySlug,
  getProductBySlug,
  getProducts,
} from './api';
import { demoProducts } from './demo';
import { collectionPresentation } from './presentation';
import { createOrder } from '../orders-api';
const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.CATALOG_DEMO_FALLBACK;
});
function outage() {
  globalThis.fetch = async () =>
    new Response('{"message":"Internal server error"}', { status: 500 });
}
test('outage restores all 16 products, 4 collections and matching details', async () => {
  outage();
  const products = await getProducts();
  const collections = await getCollections();
  assert.equal(products.length, 16);
  assert.equal(new Set(products.map((p) => p.id)).size, 16);
  assert.equal(collections.length, 4);
  for (const product of products) {
    const detail = await getProductBySlug(product.slug);
    assert.equal(detail.id, product.id);
    assert.ok(
      detail.longDescription &&
        detail.ingredients.length &&
        detail.benefits.length
    );
    assert.ok(detail.priceCents > 0);
    assert.equal(detail.currency, 'EUR');
  }
  for (const collection of collections) {
    assert.equal(collection.productCount, 4);
    const detail = await getCollectionBySlug(collection.slug);
    assert.equal(detail.products.length, 4);
    assert.ok(
      detail.products.every((p) =>
        products.some((candidate) => candidate.id === p.id)
      )
    );
  }
});
test('all restored product, gallery and seasonal images exist', () => {
  const images = demoProducts.flatMap((p) => [
    p.image,
    p.heroImage,
    ...p.galleryImages.map((i) => i.url),
  ]);
  images.push(...Object.values(collectionPresentation).map((p) => p.image));
  for (const path of new Set(images))
    assert.ok(existsSync(resolve('public', path.slice(1))), path);
});
test('network errors and invalid payloads fall back', async () => {
  globalThis.fetch = async () => {
    throw new TypeError('fetch failed');
  };
  assert.equal((await getProducts()).length, 16);
  globalThis.fetch = async () => new Response('<html>Unavailable</html>');
  assert.equal((await getCollections()).length, 4);
});
test('fetches have a bounded timeout', async () => {
  globalThis.fetch = async (_input, init) => {
    assert.ok(init?.signal instanceof AbortSignal);
    return Response.json({ data: [] });
  };
  await getProducts();
});
test('successful API data and intentionally empty catalogues remain authoritative', async () => {
  globalThis.fetch = async () => Response.json({ data: [] });
  assert.deepEqual(await getProducts(), []);
  const product = {
    ...demoProducts[0],
    id: 'real-database-id',
    priceCents: 499,
  };
  globalThis.fetch = async () => Response.json({ data: product });
  assert.deepEqual(await getProductBySlug(product.slug), product);
});
test('API 404 and authorization failures are not hidden by demo data', async () => {
  for (const status of [401, 403, 404]) {
    globalThis.fetch = async () =>
      Response.json({ message: 'Unavailable' }, { status });
    await assert.rejects(
      getProductBySlug(demoProducts[0].slug),
      (e: unknown) => e instanceof CatalogApiError && e.statusCode === status
    );
  }
});
test('unknown demo slugs retain not-found behavior', async () => {
  outage();
  for (const load of [getProductBySlug, getCollectionBySlug]) {
    await assert.rejects(
      load('does-not-exist'),
      (e: unknown) => e instanceof CatalogApiError && e.statusCode === 404
    );
  }
});
test('fallback can be disabled for a live commerce deployment', async () => {
  outage();
  process.env.CATALOG_DEMO_FALLBACK = 'false';
  await assert.rejects(
    getProducts(),
    (e: unknown) => e instanceof CatalogApiError && e.statusCode === 500
  );
});
test('demo IDs cannot be submitted as real orders', async () => {
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    throw new Error('Unexpected request');
  };
  await assert.rejects(
    createOrder('test-token', [{ productId: demoProducts[0].id, quantity: 1 }]),
    /browse only/
  );
  assert.equal(called, false);
});
