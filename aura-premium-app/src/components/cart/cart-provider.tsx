'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartProduct, ProductSummary } from '../../lib/catalog/types';

export type CartItem = {
  product: CartProduct;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  subtotalCents: number;
  currency: string;
  addItem: (product: ProductSummary, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: ProductSummary, quantity = 1) => {
    setItems((current) => {
      const existing = current.find(
        (item) => item.product.slug === product.slug
      );

      if (existing) {
        return current.map((item) =>
          item.product.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...current,
        {
          product: {
            id: product.id,
            slug: product.slug,
            name: product.name,
            priceCents: product.priceCents,
            currency: product.currency,
            image: product.image,
            size: product.size,
          },
          quantity,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.product.slug !== slug));
  }, []);

  const updateQuantity = useCallback(
    (slug: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(slug);
        return;
      }

      setItems((current) =>
        current.map((item) =>
          item.product.slug === slug ? { ...item, quantity } : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotalCents = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.product.priceCents * item.quantity,
        0
      ),
    [items]
  );

  const currency = items[0]?.product.currency ?? 'EUR';

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems,
      subtotalCents,
      currency,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      totalItems,
      subtotalCents,
      currency,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
