"use client";

import Link from "next/link";
import { Header } from "../../components/header";
import { AuthGuard } from "../../components/auth/auth-guard";
import { useAuth } from "../../components/auth/auth-provider";
import { useFavorites } from "../../components/favorites/favorites-provider";
import { products } from "../../components/aura-data";
import { ProductCard } from "../../components/shop/product-card";

function FavoritesContent() {
  const { user } = useAuth();
  const { favorites, clearFavorites } = useFavorites();

  if (!user) return null;

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.slug)
  );

  return (
    <div className="mx-auto max-w-[1240px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
            Favorites
          </p>
          <h1 className="display-font mt-4 text-4xl text-[var(--text)]">
            Saved beverages
          </h1>
          <p className="mt-3 text-[15px] leading-7 text-[var(--text-muted)]">
            Keep track of the Aura flavors you want to return to.
          </p>
        </div>

        {favoriteProducts.length > 0 && (
          <button
            type="button"
            onClick={clearFavorites}
            className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--surface-line)] bg-white px-5 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
          >
            Clear favorites
          </button>
        )}
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="mt-10 rounded-[32px] border border-dashed border-[var(--surface-line)] bg-white/90 p-10 text-center shadow-[0_18px_54px_rgba(30,20,10,0.05)]">
          <h2 className="text-2xl text-[var(--text)]">No favorites yet</h2>
          <p className="mx-auto mt-3 max-w-[42ch] text-[var(--text-muted)]">
            Save your most-loved seasonal beverages and build your own curated Aura list.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#476f57] px-5 text-sm font-medium text-white transition hover:bg-[#3d5f4a]"
          >
            Explore shop
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <>
      <Header />
      <AuthGuard>
        <main className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
          <FavoritesContent />
        </main>
      </AuthGuard>
    </>
  );
}