"use client";

import { useState } from "react";
import { CartDrawer } from "./cart-drawer";
import { CartTrigger } from "./cart-trigger";

export function CartShell() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed right-6 top-6 z-40">
        <CartTrigger onClick={() => setOpen(true)} />
      </div>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}