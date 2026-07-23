'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type FavoritesContextValue = {
  favorites: string[];
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isFavorite: (slug) => favorites.includes(slug),
      toggleFavorite: (slug) => {
        setFavorites((current) =>
          current.includes(slug)
            ? current.filter((item) => item !== slug)
            : [...current, slug]
        );
      },
      clearFavorites: () => setFavorites([]),
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
}
