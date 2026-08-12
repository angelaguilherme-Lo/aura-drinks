'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '../../components/auth/auth-guard';
import { useAuth } from '../../components/auth/auth-provider';
import { useCart } from '../../components/cart/cart-provider';
import { Header } from '../../components/header';
import { formatPrice } from '../../lib/catalog/price';
import { createOrder, OrderApiError, type Order } from '../../lib/orders-api';

function CheckoutContent() {
  const router = useRouter();
  const { user, token, signOut } = useAuth();
  const { items, subtotalCents, currency, clearCart } = useCart();
  const [created, setCreated] = useState<Order | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function placeOrder() {
    if (!items.length || pending) return;
    if (!token) {
      signOut();
      router.push('/login?redirect=%2Fcheckout');
      return;
    }
    setPending(true);
    setError(null);
    try {
      const order = await createOrder(
        token,
        items.map(({ product, quantity }) => ({
          productId: product.id,
          quantity,
        }))
      );
      setCreated(order);
      clearCart();
    } catch (caught) {
      if (caught instanceof OrderApiError && caught.status === 401) {
        signOut();
        router.push('/login?redirect=%2Fcheckout');
        return;
      }
      setError(
        caught instanceof Error
          ? caught.message
          : 'Unable to create your order. Please try again.'
      );
    } finally {
      setPending(false);
    }
  }
  if (created)
    return (
      <main className="px-4 pb-16 pt-10 sm:px-6">
        <section className="mx-auto max-w-[760px] rounded-[32px] border border-[var(--surface-line)] bg-white/92 p-8 shadow-[0_24px_64px_rgba(30,20,10,0.08)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[#476f57]">
            Order received
          </p>
          <h1 className="display-font mt-4 text-4xl text-[var(--text)]">
            Thank you, {user?.firstName}
          </h1>
          <p className="mt-3 text-[var(--text-muted)]">
            Your order has been created. No payment was collected.
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-[var(--surface)] p-5">
              <dt className="text-xs text-[var(--text-soft)]">ORDER ID</dt>
              <dd className="mt-2 break-all text-sm">{created.id}</dd>
            </div>
            <div className="rounded-3xl bg-[var(--surface)] p-5">
              <dt className="text-xs text-[var(--text-soft)]">STATUS</dt>
              <dd className="mt-2 font-semibold">{created.status}</dd>
            </div>
            <div className="rounded-3xl bg-[var(--surface)] p-5">
              <dt className="text-xs text-[var(--text-soft)]">SERVER TOTAL</dt>
              <dd className="mt-2 font-semibold">
                {formatPrice(created.totalCents, created.currency)}
              </dd>
            </div>
          </dl>
          <div className="mt-7 space-y-3">
            {created.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-[var(--surface-line)] pb-3 text-sm"
              >
                <span>
                  {item.productName} × {item.quantity}
                </span>
                <span>
                  {formatPrice(
                    item.unitPriceCents * item.quantity,
                    created.currency
                  )}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-full bg-[#476f57] px-6 py-3 text-sm text-white"
          >
            Continue shopping
          </Link>
        </section>
      </main>
    );
  if (!items.length)
    return (
      <main className="px-4 pb-16 pt-10 sm:px-6">
        <section className="mx-auto max-w-[640px] rounded-[32px] border border-[var(--surface-line)] bg-white/92 p-10 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
            Checkout
          </p>
          <h1 className="display-font mt-4 text-4xl">Your cart is empty</h1>
          <p className="mt-4 text-[var(--text-muted)]">
            Add an Aura drink before placing an order.
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-flex rounded-full bg-[#476f57] px-6 py-3 text-sm text-white"
          >
            Return to shop
          </Link>
        </section>
      </main>
    );
  return (
    <main className="px-4 pb-16 pt-10 sm:px-6">
      <div className="mx-auto max-w-[960px]">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
          Checkout
        </p>
        <h1 className="display-font mt-4 text-4xl">Review your order</h1>
        <p className="mt-3 text-[var(--text-muted)]">
          Ordering as {user?.email}. No payment will be collected.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <section className="space-y-4">
            {items.map(({ product, quantity }) => (
              <article
                key={product.id}
                className="rounded-[28px] border border-[var(--surface-line)] bg-white/92 p-6"
              >
                <div className="flex justify-between gap-5">
                  <div>
                    <h2 className="font-semibold">{product.name}</h2>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      {product.size} · Quantity {quantity}
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      {formatPrice(product.priceCents, product.currency)} each
                    </p>
                  </div>
                  <strong>
                    {formatPrice(
                      product.priceCents * quantity,
                      product.currency
                    )}
                  </strong>
                </div>
              </article>
            ))}
          </section>
          <aside className="h-fit rounded-[32px] border border-[var(--surface-line)] bg-white/92 p-7">
            <h2 className="text-xl">Order summary</h2>
            <div className="mt-6 flex justify-between border-b pb-5">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotalCents, currency)}</strong>
            </div>
            <p className="mt-4 text-xs text-[var(--text-soft)]">
              Final prices and totals are calculated by Aura.
            </p>
            {error && (
              <p
                role="alert"
                className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={placeOrder}
              disabled={pending}
              className="mt-6 h-12 w-full rounded-full bg-[#476f57] text-sm text-white disabled:opacity-60"
            >
              {pending ? 'Placing order...' : 'Place order'}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
export default function CheckoutPage() {
  return (
    <>
      <Header />
      <AuthGuard>
        <CheckoutContent />
      </AuthGuard>
    </>
  );
}
