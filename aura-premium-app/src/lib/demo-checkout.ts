import type { CartProduct } from './catalog/types';

export type DemoCartItem = { product: CartProduct; quantity: number };
export type DemoOrder = {
  id: string;
  createdAt: string;
  status: 'SIMULATED';
  items: DemoCartItem[];
  currency: string;
  subtotalCents: number;
  discountPercent: number;
  discountCents: number;
  shippingCents: number;
  totalCents: number;
};

export function isDemoCart(value: unknown): value is DemoCartItem[] {
  return (
    Array.isArray(value) &&
    value.length <= 100 &&
    value.every((item) => {
      if (!item || typeof item !== 'object') return false;
      const { product: p, quantity } = item;
      return (
        p &&
        typeof p === 'object' &&
        ['id', 'slug', 'name', 'currency', 'image', 'size'].every(
          (key) => typeof p[key] === 'string'
        ) &&
        /^[A-Z]{3}$/.test(p.currency) &&
        Number.isSafeInteger(p.priceCents) &&
        p.priceCents >= 0 &&
        p.priceCents <= 1000000 &&
        Number.isSafeInteger(quantity) &&
        quantity >= 1 &&
        quantity <= 99
      );
    })
  );
}

export function demoTotals(items: DemoCartItem[]) {
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalCents = items.reduce(
    (sum, item) => sum + item.product.priceCents * item.quantity,
    0
  );
  const discountPercent = count >= 6 ? 10 : count >= 3 ? 5 : 0;
  const discountCents = Math.round((subtotalCents * discountPercent) / 100);
  return {
    subtotalCents,
    discountPercent,
    discountCents,
    shippingCents: 0,
    totalCents: subtotalCents - discountCents,
  };
}

// Deliberately local: never sends an order or payment request to a server.
export function createDemoOrder(
  items: DemoCartItem[],
  outcome: 'approved' | 'declined'
): DemoOrder {
  if (!isDemoCart(items) || !items.length)
    throw new Error('Add a product before completing your demo order.');
  if (items.some((item) => item.product.currency !== items[0].product.currency))
    throw new Error('Choose products in the same currency.');
  if (outcome === 'declined')
    throw new Error(
      'Demo payment declined. Choose “Approve payment” to try again. Your cart is unchanged.'
    );
  return {
    id: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: 'SIMULATED',
    items: structuredClone(items),
    currency: items[0].product.currency,
    ...demoTotals(items),
  };
}

export function isDemoOrder(value: unknown): value is DemoOrder | null {
  if (value === null) return true;
  if (!value || typeof value !== 'object') return false;
  const order = value as DemoOrder;
  if (
    typeof order.id !== 'string' ||
    !order.id.startsWith('DEMO-') ||
    order.status !== 'SIMULATED' ||
    typeof order.createdAt !== 'string' ||
    !Number.isFinite(Date.parse(order.createdAt)) ||
    !isDemoCart(order.items) ||
    !order.items.length ||
    order.currency !== order.items[0].product.currency
  )
    return false;
  const totals = demoTotals(order.items);
  return (Object.keys(totals) as (keyof typeof totals)[]).every(
    (key) => order[key] === totals[key]
  );
}
