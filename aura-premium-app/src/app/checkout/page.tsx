'use client';

import { useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowLeft, CreditCard, Package, Truck } from 'lucide-react';
import { Header } from '../../components/header';
import { useCart } from '../../components/cart/cart-provider';
import { formatPrice } from '../../lib/catalog/price';
import { createBrowserStore } from '../../lib/browser-store';
import {
  createDemoOrder,
  demoTotals,
  isDemoOrder,
  type DemoOrder,
  type DemoCartItem,
} from '../../lib/demo-checkout';

const receiptStore = createBrowserStore<DemoOrder | null>(
  'aura-demo-receipt-v1',
  null,
  isDemoOrder
);
const primary =
  'inline-flex min-h-12 items-center justify-center rounded-full bg-[#476f57] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#365842] disabled:opacity-50';
const panel =
  'rounded-[28px] border border-[var(--surface-line)] bg-white/90 p-6 shadow-[0_16px_50px_rgba(30,50,20,0.05)] sm:p-8';
const sampleDelivery = {
  name: 'Alex Morgan',
  address: '12 Botanical Lane',
  city: 'Berlin',
  postcode: '10115',
};

function OrderItems({
  items,
  currency,
}: {
  items: DemoCartItem[];
  currency: string;
}) {
  return (
    <div className="divide-y divide-[var(--surface-line)]">
      {items.map(({ product, quantity }) => (
        <div key={product.slug} className="flex items-center gap-4 py-4">
          <Image
            src={product.image}
            alt={product.name}
            width={56}
            height={80}
            className="h-20 w-14 shrink-0 rounded-xl bg-white object-contain"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{product.name}</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              {product.size} · Qty {quantity}
            </p>
          </div>
          <span className="text-sm font-medium">
            {formatPrice(product.priceCents * quantity, currency)}
          </span>
        </div>
      ))}
    </div>
  );
}
function Totals({
  totals,
  currency,
}: {
  totals: ReturnType<typeof demoTotals>;
  currency: string;
}) {
  return (
    <dl className="space-y-3 border-t border-[var(--surface-line)] pt-5 text-sm">
      <div className="flex justify-between">
        <dt>Subtotal</dt>
        <dd>{formatPrice(totals.subtotalCents, currency)}</dd>
      </div>
      {totals.discountPercent > 0 && (
        <div className="flex justify-between text-[#476f57]">
          <dt>Bundle saving ({totals.discountPercent}%)</dt>
          <dd>−{formatPrice(totals.discountCents, currency)}</dd>
        </div>
      )}
      <div className="flex justify-between">
        <dt>Demo delivery</dt>
        <dd>Complimentary</dd>
      </div>
      <div className="flex justify-between border-t border-[var(--surface-line)] pt-4 text-lg font-semibold">
        <dt>Demo total</dt>
        <dd>{formatPrice(totals.totalCents, currency)}</dd>
      </div>
      <div className="flex justify-between text-[#476f57]">
        <dt>Actual amount charged</dt>
        <dd>{formatPrice(0, currency)}</dd>
      </div>
    </dl>
  );
}

export default function CheckoutPage() {
  const { items, currency, clearCart } = useCart();
  const receipt = useSyncExternalStore(
    receiptStore.subscribe,
    receiptStore.getSnapshot,
    receiptStore.getServerSnapshot
  );
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState(sampleDelivery);
  const [outcome, setOutcome] = useState<'approved' | 'declined'>('approved');
  const [error, setError] = useState('');
  const submitting = useRef(false);
  const totals = demoTotals(items);
  const bottleCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  function goToStep(next: number) {
    setError('');
    setStep(next);
    requestAnimationFrame(() => {
      headingRef.current?.focus();
    });
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 2) {
      goToStep(step + 1);
      return;
    }
    if (submitting.current) return;
    submitting.current = true;
    try {
      const order = createDemoOrder(items, outcome);
      receiptStore.set(order);
      clearCart();
      requestAnimationFrame(() => {
        headingRef.current?.focus();
      });
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'Please try the demo again.'
      );
      submitting.current = false;
    }
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1160px] px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#476f57]/20 bg-white/65 px-5 py-3 text-sm text-[#365842]">
          <span className="font-semibold">AURA DEMO SANDBOX</span>
          <span>No real payments, orders or deliveries.</span>
        </div>
        {!items.length && receipt ? (
          <section className="mx-auto max-w-[760px]">
            <div className={panel}>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#e5efdc] text-[#476f57]">
                <Check aria-hidden="true" size={28} />
              </div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#476f57]">
                Purchase simulation complete
              </p>
              <h1
                ref={headingRef}
                tabIndex={-1}
                className="display-font mt-3 text-4xl sm:text-5xl"
              >
                A little Aura, on its way.
              </h1>
              <p className="mt-4 leading-7 text-[var(--text-muted)]">
                Your demo order was successful. Nothing was charged and no
                parcel will be shipped.
              </p>
              <div className="mt-6 flex flex-wrap gap-5 rounded-2xl bg-[var(--surface)] p-5 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--text-soft)]">
                    Demo order
                  </p>
                  <p className="mt-1 font-semibold">{receipt.id}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--text-soft)]">
                    Payment
                  </p>
                  <p className="mt-1 font-semibold">Simulated approval</p>
                </div>
              </div>
              <OrderItems items={receipt.items} currency={receipt.currency} />
              <Totals totals={receipt} currency={receipt.currency} />
              <ol className="my-7 grid gap-3 text-sm sm:grid-cols-3">
                {[
                  { icon: Check, label: 'Order confirmed' },
                  { icon: Package, label: 'Preparing your box' },
                  { icon: Truck, label: 'Demo delivery: 2–4 days' },
                ].map(({ icon: Icon, label }, index) => (
                  <li
                    key={label}
                    className="rounded-2xl bg-[var(--surface)] p-4"
                  >
                    <Icon
                      aria-hidden="true"
                      size={20}
                      className="mb-3 text-[#476f57]"
                    />
                    <span className="text-xs text-[var(--text-soft)]">
                      SIMULATED STEP {index + 1}
                    </span>
                    <p className="mt-1">{label}</p>
                  </li>
                ))}
              </ol>
              <Link
                href="/shop"
                onClick={() => receiptStore.set(null)}
                className={primary}
              >
                Start another demo purchase
              </Link>
              <p className="mt-4 text-xs text-[var(--text-soft)]">
                This receipt is saved only in this browser. No confirmation
                email is sent.
              </p>
            </div>
          </section>
        ) : !items.length ? (
          <section className={`${panel} mx-auto max-w-[640px] text-center`}>
            <h1 className="display-font text-4xl">
              Your next ritual starts here.
            </h1>
            <p className="my-5 text-[var(--text-muted)]">
              Choose your seasonal favorites to try the complete shopping demo.
            </p>
            <Link href="/shop" className={primary}>
              Explore the Shop
            </Link>
          </section>
        ) : (
          <>
            <Link
              href="/shop"
              className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--text-muted)]"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              Continue shopping
            </Link>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="display-font text-4xl sm:text-6xl"
            >
              {
                [
                  'Your seasonal ritual awaits.',
                  'A simple, simulated payment.',
                  'One last look.',
                ][step]
              }
            </h1>
            <p className="mt-4 text-[var(--text-muted)]">
              Guest checkout · Use the sample details provided · No account
              needed
            </p>
            <ol
              aria-label="Checkout progress"
              className="my-8 flex flex-wrap gap-5 text-sm"
            >
              {['Delivery', 'Payment', 'Review'].map((label, index) => (
                <li
                  key={label}
                  aria-current={step === index ? 'step' : undefined}
                  className={`flex items-center gap-2 ${index <= step ? 'text-[#365842]' : 'text-[var(--text-soft)]'}`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${index <= step ? 'bg-[#476f57] text-white' : 'bg-white'}`}
                  >
                    {index < step ? (
                      <Check aria-hidden="true" size={16} />
                    ) : (
                      index + 1
                    )}
                  </span>
                  {label}
                </li>
              ))}
            </ol>
            <div className="grid items-start gap-6 lg:grid-cols-[1fr_400px]">
              <form onSubmit={submit} className={panel}>
                {step === 0 && (
                  <>
                    <h2 className="text-xl font-semibold">Delivery details</h2>
                    <p className="mb-6 mt-2 text-sm text-[var(--text-muted)]">
                      Fictional details are filled in for your presentation.
                      Please don’t enter personal information.
                    </p>
                    <div className="grid gap-5 sm:grid-cols-2">
                      {(
                        [
                          { key: 'name', label: 'Full name' },
                          { key: 'address', label: 'Street address' },
                          { key: 'city', label: 'City' },
                          { key: 'postcode', label: 'Postal code' },
                        ] as const
                      ).map(({ key, label }) => (
                        <label
                          key={key}
                          className={`block text-sm ${key === 'name' || key === 'address' ? 'sm:col-span-2' : ''}`}
                        >
                          {label}
                          <input
                            required
                            maxLength={120}
                            autoComplete="off"
                            value={delivery[key]}
                            onChange={(e) =>
                              setDelivery({
                                ...delivery,
                                [key]: e.target.value,
                              })
                            }
                            className="mt-2 h-12 w-full rounded-xl border border-[var(--surface-line)] bg-white px-4 outline-offset-4 focus:outline-[#476f57]"
                          />
                        </label>
                      ))}
                    </div>
                    <div className="mt-6 rounded-2xl bg-[var(--surface)] p-5 text-sm">
                      <p className="font-semibold">
                        Complimentary demo delivery
                      </p>
                      <p className="mt-1 text-[var(--text-muted)]">
                        Germany · Simulated arrival in 2–4 business days
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDelivery(sampleDelivery)}
                      className="mt-5 text-sm text-[#476f57] underline underline-offset-4"
                    >
                      Reset to sample details
                    </button>
                  </>
                )}
                {step === 1 && (
                  <>
                    <h2 className="text-xl font-semibold">Demo payment card</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      A pretend card is ready to use. There are no card fields
                      and no payment provider connected.
                    </p>
                    <div className="my-6 rounded-3xl bg-[#365842] p-7 text-white">
                      <div className="flex items-center justify-between">
                        <span className="tracking-[0.2em]">
                          AURA / TEST CARD
                        </span>
                        <CreditCard aria-hidden="true" />
                      </div>
                      <p className="my-7 font-mono text-xl tracking-[0.12em]">
                        4242 •••• •••• 4242
                      </p>
                      <p className="text-xs tracking-widest text-white/75">
                        FOR DEMONSTRATION ONLY
                      </p>
                    </div>
                    <label className="block text-sm font-medium">
                      Payment scenario
                      <select
                        value={outcome}
                        onChange={(e) =>
                          setOutcome(e.target.value as 'approved' | 'declined')
                        }
                        className="mt-2 h-12 w-full rounded-xl border border-[var(--surface-line)] bg-white px-4"
                      >
                        <option value="approved">Approve payment</option>
                        <option value="declined">
                          Decline payment — test retry
                        </option>
                      </select>
                    </label>
                  </>
                )}
                {step === 2 && (
                  <>
                    <h2 className="text-xl font-semibold">
                      Ready to complete your demo?
                    </h2>
                    <div className="my-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-[var(--surface)] p-5 text-sm">
                        <p className="mb-2 font-semibold">Demo delivery</p>
                        <p>{delivery.name}</p>
                        <p>{delivery.address}</p>
                        <p>
                          {delivery.postcode} {delivery.city}
                        </p>
                        <p>Germany</p>
                        <button
                          type="button"
                          onClick={() => goToStep(0)}
                          className="mt-3 text-[#476f57] underline"
                        >
                          Edit delivery
                        </button>
                      </div>
                      <div className="rounded-2xl bg-[var(--surface)] p-5 text-sm">
                        <p className="mb-2 font-semibold">Demo payment</p>
                        <p>Test card ending 4242</p>
                        <p>
                          {outcome === 'approved'
                            ? 'Simulated approval'
                            : 'Simulated decline'}
                        </p>
                        <button
                          type="button"
                          onClick={() => goToStep(1)}
                          className="mt-3 text-[#476f57] underline"
                        >
                          Change payment scenario
                        </button>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-[var(--text-muted)]">
                      Completing this step creates a local demo receipt. No
                      money moves, no real order is submitted, and the delivery
                      details aren’t saved.
                    </p>
                  </>
                )}
                {error && (
                  <p
                    role="alert"
                    className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-800"
                  >
                    {error}
                  </p>
                )}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => goToStep(step - 1)}
                      className="min-h-12 rounded-full border border-[var(--surface-line)] px-6 text-sm"
                    >
                      Back
                    </button>
                  )}
                  <button type="submit" className={primary}>
                    {step === 0
                      ? 'Continue to payment'
                      : step === 1
                        ? 'Review demo order'
                        : 'Complete demo purchase'}
                  </button>
                </div>
              </form>
              <aside className={panel}>
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold">Your selection</h2>
                  <span className="text-sm text-[var(--text-soft)]">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}{' '}
                    bottles
                  </span>
                </div>
                <OrderItems items={items} currency={currency} />
                <Totals totals={totals} currency={currency} />
                <p className="mt-5 text-xs leading-5 text-[var(--text-soft)]">
                  Mix 3+ bottles for 5% off or 6+ for 10% off. All prices and
                  savings are part of the demo.
                </p>
              </aside>
            </div>
          </>
        )}
      </main>
    </>
  );
}
