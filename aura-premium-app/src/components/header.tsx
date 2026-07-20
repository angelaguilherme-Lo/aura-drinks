"use client";

import Link from "next/link";
import { CartTrigger } from "./cart/cart-trigger";
import { useCartUi } from "./cart/cart-shell";
import { AuraLogo } from "./aura-logo";
import { AccountMenu } from "./auth/account-menu";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#collections", label: "Collections" },
  { href: "/#benefits", label: "Benefits" },
  { href: "/favorites", label: "Favorites" },
];

export function Header() {
  const { openCart } = useCartUi();

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 rounded-full border border-white/60 bg-white/78 px-4 py-3 shadow-[0_18px_50px_rgba(42,32,20,0.10)] backdrop-blur-xl sm:px-6">
        <Link href="/" className="shrink-0" aria-label="Aura home">
          <AuraLogo className="h-10 w-auto text-[var(--text)]" />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <CartTrigger onClick={openCart} />
          <AccountMenu />
        </div>
      </div>

      <div className="mx-auto mt-3 lg:hidden">
        <nav className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/60 bg-white/78 px-4 py-3 shadow-[0_12px_28px_rgba(42,32,20,0.08)] backdrop-blur-xl">
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
      </div>
    </header>
  );
}