'use client';

import { useFavorites } from './favorites-provider';

type FavoriteButtonProps = {
  slug: string;
  className?: string;
};

export function FavoriteButton({ slug, className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(slug);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(slug)}
      aria-pressed={active}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--surface-line)] bg-white/92 text-[var(--text)] shadow-[0_10px_24px_rgba(30,20,10,0.08)] backdrop-blur-sm transition hover:bg-white hover:shadow-[0_14px_28px_rgba(30,20,10,0.10)] ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-[18px] w-[18px] transition duration-200 ${
          active
            ? 'scale-100 text-[#476f57]'
            : 'scale-100 text-[var(--text-muted)]'
        }`}
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20.5s-6.7-4.35-9.14-8.06C1.53 10.36 2 7.5 4.18 5.88c2.03-1.5 4.88-.96 6.32 1.22C11 7.86 11.47 7.38 12 6.95c1.44-2.18 4.29-2.72 6.32-1.22 2.18 1.62 2.65 4.48 1.32 6.56C18.7 16.15 12 20.5 12 20.5Z" />
      </svg>
    </button>
  );
}
