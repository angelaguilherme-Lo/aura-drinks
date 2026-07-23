'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { CartDrawer } from './cart-drawer';

type CartUiContextValue = {
  openCart: () => void;
  closeCart: () => void;
};

const CartUiContext = createContext<CartUiContextValue | undefined>(undefined);

export function CartShell({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
    }),
    []
  );

  return (
    <CartUiContext.Provider value={value}>
      {children}
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </CartUiContext.Provider>
  );
}

export function useCartUi() {
  const context = useContext(CartUiContext);

  if (!context) {
    throw new Error('useCartUi must be used within a CartShell');
  }

  return context;
}
