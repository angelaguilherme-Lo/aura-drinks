"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "./aura-data";
import { X } from "lucide-react";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export function ProductDrawer({ product, onClose }: Props) {
  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 z-[80] h-screen w-full max-w-[520px] border-l border-white/10 bg-[var(--bg)] p-5 shadow-2xl"
          >
            <div className="premium-card flex h-full flex-col rounded-[28px] p-6">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-[var(--text-soft)]">
                    {product.collection} Collection
                  </div>
                  <h3 className="display-font mt-3 text-4xl">{product.name}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full border border-[var(--surface-line)] p-2 text-[var(--text-muted)] transition hover:text-[var(--text)]"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mb-5 rounded-[24px] bg-gradient-to-br from-white/60 to-white/10 p-6">
                <div className="h-56 rounded-[20px] border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.7),rgba(255,255,255,0.2))]" />
              </div>

              <div className="mb-4">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${product.accent}`}>
                  {product.tone}
                </span>
              </div>

              <p className="text-lg font-medium">{product.flavor}</p>
              <p className="mt-3 leading-7 text-[var(--text-muted)]">
                {product.description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[var(--surface-line)] p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Format
                  </div>
                  <div className="mt-2 text-sm">330 ml glass bottle</div>
                </div>
                <div className="rounded-2xl border border-[var(--surface-line)] p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Positioning
                  </div>
                  <div className="mt-2 text-sm">Premium wellness soda</div>
                </div>
                <div className="rounded-2xl border border-[var(--surface-line)] p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Best for
                  </div>
                  <div className="mt-2 text-sm">Daily elevated refreshment</div>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--text-inverse)] transition hover:opacity-90">
                    Add to bundle
                  </button>
                  <button className="rounded-full border border-[var(--surface-line)] px-6 py-3 text-sm font-medium text-[var(--text)] transition hover:bg-white/30">
                    Save flavor
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}