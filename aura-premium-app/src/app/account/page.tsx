'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { Header } from '../../components/header';
import { AuthGuard } from '../../components/auth/auth-guard';
import { useAuth } from '../../components/auth/auth-provider';
import { useFavorites } from '../../components/favorites/favorites-provider';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function AccountContent() {
  const { user } = useAuth();
  const { favorites } = useFavorites();

  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`.trim();

  return (
    <div className="mx-auto max-w-[960px]">
      <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
        Account
      </p>

      <h1 className="display-font mt-4 text-4xl text-[var(--text)]">
        Your Aura profile
      </h1>

      <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] border border-[var(--surface-line)] bg-white/92 p-8 shadow-[0_24px_64px_rgba(30,20,10,0.08)]">
          <div className="flex items-center gap-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#476f57] text-lg font-semibold text-white">
              {getInitials(fullName)}
            </div>

            <div>
              <h2 className="text-2xl text-[var(--text)]">{fullName}</h2>
              <p className="text-sm text-[var(--text-muted)]">{user.email}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-[var(--surface-line)] bg-[var(--surface)] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-soft)]">
                Role
              </p>
              <p className="mt-2 text-[var(--text)]">{user.role}</p>
            </div>

            <div className="rounded-[24px] border border-[var(--surface-line)] bg-[var(--surface)] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-soft)]">
                Favorites
              </p>
              <p className="mt-2 text-[var(--text)]">
                {favorites.length} saved
              </p>
            </div>
          </div>
        </section>

        <aside className="rounded-[32px] border border-[var(--surface-line)] bg-white/92 p-8 shadow-[0_24px_64px_rgba(30,20,10,0.08)]">
          <h3 className="text-xl text-[var(--text)]">Quick access</h3>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/favorites"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--surface-line)] bg-white px-5 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
            >
              View favorites
            </Link>

            <Link
              href="/shop"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#476f57] px-5 text-sm font-medium text-white transition hover:bg-[#3d5f4a]"
            >
              Shop beverages
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <AuthGuard>
          <main className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
            <AccountContent />
          </main>
        </AuthGuard>
      </Suspense>
    </>
  );
}