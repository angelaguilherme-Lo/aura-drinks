'use client';

import Link from 'next/link';
import { useAuth } from './auth-provider';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function AccountMenu() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--surface-line)] bg-white px-5 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
        >
          Sign in
        </Link>

        <Link
          href="/signup"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#476f57] px-5 text-sm font-medium text-white transition hover:bg-[#3d5f4a]"
        >
          Create account
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/favorites"
        className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--surface-line)] bg-white px-5 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
      >
        Favorites
      </Link>

      <Link
        href="/account"
        className="inline-flex h-11 items-center justify-center gap-3 rounded-full border border-[var(--surface-line)] bg-white px-4 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#476f57] text-xs font-semibold text-white">
          {getInitials(user.name)}
        </span>
        <span className="hidden sm:inline">{user.name}</span>
      </Link>

      <button
        type="button"
        onClick={signOut}
        className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--surface-line)] bg-white px-5 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface)]"
      >
        Log out
      </button>
    </div>
  );
}
