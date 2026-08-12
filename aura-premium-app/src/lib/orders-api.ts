export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';
export type CreateOrderItem = { productId: string; quantity: number };
export type OrderItem = {
  id: string;
  productId: string;
  productName: string;
  unitPriceCents: number;
  quantity: number;
};
export type Order = {
  id: string;
  status: OrderStatus;
  totalCents: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
};
export class OrderApiError extends Error {
  constructor(
    message: string,
    public readonly status: number | null
  ) {
    super(message);
    this.name = 'OrderApiError';
  }
}
const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
).replace(/\/$/, '');
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function integer(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value);
}
function orderItem(value: unknown): value is OrderItem {
  return (
    record(value) &&
    typeof value.id === 'string' &&
    typeof value.productId === 'string' &&
    typeof value.productName === 'string' &&
    integer(value.unitPriceCents) &&
    value.unitPriceCents >= 0 &&
    integer(value.quantity) &&
    value.quantity > 0
  );
}
function order(value: unknown): value is Order {
  return (
    record(value) &&
    typeof value.id === 'string' &&
    ['PENDING', 'CONFIRMED', 'CANCELLED'].includes(String(value.status)) &&
    integer(value.totalCents) &&
    value.totalCents >= 0 &&
    typeof value.currency === 'string' &&
    typeof value.createdAt === 'string' &&
    typeof value.updatedAt === 'string' &&
    Array.isArray(value.items) &&
    value.items.every(orderItem)
  );
}
export async function createOrder(
  token: string,
  items: CreateOrderItem[]
): Promise<Order> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });
  } catch {
    throw new OrderApiError(
      'Unable to reach the server. Check your connection and try again.',
      null
    );
  }
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      record(payload) && typeof payload.message === 'string'
        ? payload.message
        : 'Unable to create your order. Please try again.';
    throw new OrderApiError(message, response.status);
  }
  const data = record(payload) ? payload.data : null;
  if (!order(data))
    throw new OrderApiError(
      'The server returned an unexpected response.',
      response.status
    );
  return data;
}
