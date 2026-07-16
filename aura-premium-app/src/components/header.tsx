"use client";

import Link from "next/link";
import { CartTrigger } from "./cart/cart-trigger";
import { useCartUi } from "./cart/cart-shell";
import { AuraLogo } from "./aura-logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#collections", label: "Collections" },
  { href: "/#benefits", label: "Benefits" },
];

export function Header() {
  const { openCart } = useCartUi();

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between rounded-full border border-white/60 bg-white/78 px-4 py-3 shadow-[0_18px_50px_rgba(42,32,20,0.10)] backdrop-blur-xl sm:px-6">
        <Link href="/" className="shrink-0" aria-label="Aura home">
          <AuraLogo className="h-10 w-auto text-[var(--text)]" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#476f57] px-5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(71,111,87,0.28)] transition hover:bg-[#3d5f4a]"
          >
            Shop flavors
          </Link>

          <CartTrigger onClick={openCart} />
        </div>
      </div>
    </header>
  );
}