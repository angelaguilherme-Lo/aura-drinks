import { demoProducts, demoCollections, demoCollectionBySlug } from './demo';
import type {
  CollectionDetail,
  CollectionSummary,
  ProductDetail,
  ProductSummary,
} from './types';

type ApiResponse<T> = { data: T };
type ApiErrorResponse = { status?: string; message?: string };

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
).replace(/\/$/, '');

export class CatalogApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = 'CatalogApiError';
  }
}

async function request<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    throw new CatalogApiError(
      'Unable to load the catalog. Please make sure the server is running and try again.'
    );
  }

  const payload = (await response.json().catch(() => null)) as
    ApiResponse<T> | ApiErrorResponse | null;

  if (!response.ok) {
    const message =
      response.status < 500 && payload && 'message' in payload
        ? payload.message
        : null;
    throw new CatalogApiError(
      message || 'Unable to load the catalog. Please try again.',
      response.status
    );
  }

  if (!payload || !('data' in payload)) {
    unexpectedResponse();
  }

  return payload.data;
}

function unexpectedResponse(): never {
  throw new CatalogApiError(
    'The catalog server returned an unexpected response.'
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

// This is a demo storefront: keep the original public catalogue browsable
// during backend outages. Real API responses (including empty lists and 404s)
// remain authoritative; account and order requests never use demo responses.
async function withDemoFallback<T>(
  load: () => Promise<T>,
  fallback: () => T
): Promise<T> {
  try {
    return await load();
  } catch (error) {
    if (!(error instanceof CatalogApiError)) throw error;
    if (error.statusCode !== undefined && error.statusCode < 500) throw error;
    if (process.env.CATALOG_DEMO_FALLBACK === 'false') throw error;
    console.warn(
      'Catalogue API unavailable; using the bundled demo catalogue.'
    );
    return fallback();
  }
}

export async function getProducts(): Promise<ProductSummary[]> {
  return withDemoFallback(
    async () => {
      const data = await request<unknown>('/api/products');
      if (!Array.isArray(data)) unexpectedResponse();
      return data as ProductSummary[];
    },
    () => demoProducts
  );
}

export async function getProductBySlug(slug: string): Promise<ProductDetail> {
  return withDemoFallback(
    async () => {
      const data = await request<unknown>(
        `/api/products/${encodeURIComponent(slug)}`
      );
      if (!isRecord(data)) unexpectedResponse();
      return data as ProductDetail;
    },
    () => {
      const product = demoProducts.find((candidate) => candidate.slug === slug);
      if (!product) throw new CatalogApiError('Product not found.', 404);
      return product;
    }
  );
}

export async function getCollections(): Promise<CollectionSummary[]> {
  return withDemoFallback(
    async () => {
      const data = await request<unknown>('/api/collections');
      if (!Array.isArray(data)) unexpectedResponse();
      return data as CollectionSummary[];
    },
    () => demoCollections
  );
}

export async function getCollectionBySlug(
  slug: string
): Promise<CollectionDetail> {
  return withDemoFallback(
    async () => {
      const data = await request<unknown>(
        `/api/collections/${encodeURIComponent(slug)}`
      );
      if (!isRecord(data)) unexpectedResponse();
      return data as CollectionDetail;
    },
    () => {
      const collection = demoCollectionBySlug(slug);
      if (!collection) throw new CatalogApiError('Collection not found.', 404);
      return collection;
    }
  );
}
