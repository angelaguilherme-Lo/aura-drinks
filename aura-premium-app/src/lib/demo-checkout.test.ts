import { test } from 'node:test';
import assert from 'node:assert/strict';
import { demoProducts } from './catalog/demo';
import {
  createDemoOrder,
  demoTotals,
  isDemoCart,
  isDemoOrder,
} from './demo-checkout';
import { createBrowserStore } from './browser-store';

const cart = (quantity: number) => [{ product: demoProducts[0], quantity }];

test('bundle savings use integer cents at the advertised thresholds', () => {
  assert.equal(demoTotals(cart(2)).discountCents, 0);
  assert.deepEqual(demoTotals(cart(3)), {
    subtotalCents: 1140,
    discountPercent: 5,
    discountCents: 57,
    shippingCents: 0,
    totalCents: 1083,
  });
  assert.deepEqual(demoTotals(cart(6)), {
    subtotalCents: 2280,
    discountPercent: 10,
    discountCents: 228,
    shippingCents: 0,
    totalCents: 2052,
  });
  assert.equal(
    demoTotals([
      { product: { ...demoProducts[0], priceCents: 395 }, quantity: 3 },
    ]).discountCents,
    59
  );
});

test('approval creates an independent simulated receipt without network requests', () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => {
    throw new Error('Demo must not call a payment or order service');
  };
  try {
    const items = cart(6);
    const order = createDemoOrder(items, 'approved');
    assert.equal(order.status, 'SIMULATED');
    assert.match(order.id, /^DEMO-/);
    assert.equal(order.totalCents, 2052);
    assert.equal(isDemoOrder(order), true);
    items[0].quantity = 1;
    assert.equal(order.items[0].quantity, 6);
    assert.notEqual(createDemoOrder(cart(1), 'approved').id, order.id);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('decline preserves the cart for a successful retry', () => {
  const items = cart(3);
  assert.throws(
    () => createDemoOrder(items, 'declined'),
    /Demo payment declined/
  );
  assert.equal(items[0].quantity, 3);
  assert.equal(createDemoOrder(items, 'approved').totalCents, 1083);
});

test('invalid cart contents and mixed currencies cannot produce receipts', () => {
  for (const quantity of [0, -1, 1.5, 100, NaN]) {
    assert.equal(isDemoCart(cart(quantity)), false);
    assert.throws(() => createDemoOrder(cart(quantity), 'approved'));
  }
  assert.throws(() => createDemoOrder([], 'approved'));
  assert.throws(
    () =>
      createDemoOrder(
        [
          ...cart(1),
          { product: { ...demoProducts[1], currency: 'USD' }, quantity: 1 },
        ],
        'approved'
      ),
    /same currency/
  );
  assert.equal(isDemoCart([{ product: {}, quantity: 1 }]), false);
  assert.equal(
    isDemoOrder({ ...createDemoOrder(cart(1), 'approved'), totalCents: -1 }),
    false
  );
});

test('browser store survives reloads, ignores corruption and supports unavailable storage', () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const data = new Map<string, string>();
  const listeners = new Set<(event: { key: string | null }) => void>();
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      localStorage: {
        getItem: (key: string) => data.get(key) ?? null,
        setItem: (key: string, value: string) => data.set(key, value),
      },
      addEventListener: (
        _: string,
        cb: (event: { key: string | null }) => void
      ) => listeners.add(cb),
      removeEventListener: (
        _: string,
        cb: (event: { key: string | null }) => void
      ) => listeners.delete(cb),
    },
  });
  try {
    const store = createBrowserStore('test-cart', [], isDemoCart);
    let changes = 0;
    const unsubscribe = store.subscribe(() => changes++);
    store.set(cart(3));
    assert.equal(changes, 1);
    const restored = createBrowserStore('test-cart', [], isDemoCart);
    assert.equal(restored.getSnapshot()[0].quantity, 3);
    assert.equal(restored.getSnapshot(), restored.getSnapshot());
    data.set('test-cart', 'broken json');
    assert.deepEqual(restored.getSnapshot(), []);
    data.set('test-cart', JSON.stringify(cart(-2)));
    assert.deepEqual(restored.getSnapshot(), []);
    unsubscribe();
    assert.equal(listeners.size, 0);
    window.localStorage.setItem = () => {
      throw new Error('Storage disabled');
    };
    store.set(cart(6));
    assert.equal(store.getSnapshot()[0].quantity, 6);
    store.set([]);
    assert.deepEqual(store.getSnapshot(), []);
  } finally {
    if (originalWindow)
      Object.defineProperty(globalThis, 'window', originalWindow);
    else Reflect.deleteProperty(globalThis, 'window');
  }
});
