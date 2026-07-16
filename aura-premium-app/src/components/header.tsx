import { ThemeToggle } from "./theme-toggle";
import { AuraLogo } from "./aura-logo";
import { CartTrigger } from "./cart/cart-trigger";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="container-shell pt-4">
        <div className="glass-panel flex items-center justify-between rounded-[24px] px-4 py-3 md:px-6">
          <Link href="/">
            <AuraLogo />
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-[var(--text-muted)] md:flex">
            <Link href="/" className="transition hover:text-[var(--text)]">
              Home
            </Link>
            <Link href="/shop" className="transition hover:text-[var(--text)]">
              Shop
            </Link>
            <a href="/#collections" className="transition hover:text-[var(--text)]">
              Collections
            </a>
            <a href="/#benefits" className="transition hover:text-[var(--text)]">
              Benefits
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="hidden rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-[var(--text-inverse)] transition hover:opacity-90 md:inline-flex"
            >
              Shop flavors
            </Link>
            <CartTrigger />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}