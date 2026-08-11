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
    response = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
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

export async function getProducts() {
  const data = await request<unknown>('/api/products');
  if (!Array.isArray(data)) unexpectedResponse();
  return data as ProductSummary[];
}

export async function getProductBySlug(slug: string) {
  const data = await request<unknown>(
    `/api/products/${encodeURIComponent(slug)}`
  );
  if (!isRecord(data)) unexpectedResponse();
  return data as ProductDetail;
}

export async function getCollections() {
  const data = await request<unknown>('/api/collections');
  if (!Array.isArray(data)) unexpectedResponse();
  return data as CollectionSummary[];
}

export async function getCollectionBySlug(slug: string) {
  const data = await request<unknown>(
    `/api/collections/${encodeURIComponent(slug)}`
  );
  if (!isRecord(data)) unexpectedResponse();
  return data as CollectionDetail;
}
