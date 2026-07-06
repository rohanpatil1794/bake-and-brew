"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { formatPrice } from "@/lib/format";
import {
  DELIVERY_FEE,
  FREE_DELIVERY_ABOVE,
  useCart,
  useCartDrawer,
  useCartTotal,
} from "@/lib/store/cart";

export function CartDrawer() {
  const { open, closeDrawer } = useCartDrawer();
  const items = useCart((s) => s.items);
  const setQuantity = useCart((s) => s.setQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCartTotal();
  const prefersReducedMotion = useReducedMotion();

  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeDrawer]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="absolute inset-0 bg-espresso/50 backdrop-blur-sm"
            aria-hidden
          />

          <motion.aside
            key="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: prefersReducedMotion ? 0 : "100%", opacity: prefersReducedMotion ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: prefersReducedMotion ? 0 : "100%", opacity: prefersReducedMotion ? 0 : 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-surface shadow-warm-lg"
          >
            <header className="flex items-center justify-between border-b border-border-warm px-6 py-5">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-espresso">
                <ShoppingBag className="h-5 w-5 text-primary" aria-hidden />
                Your cart
              </h2>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close cart"
                className="cursor-pointer rounded-full border border-border-warm p-2 text-espresso transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-sand text-primary">
                  <ShoppingBag className="h-8 w-8" aria-hidden />
                </span>
                <p className="font-serif text-xl font-semibold text-espresso">
                  Nothing in here yet
                </p>
                <p className="text-sm text-muted">
                  Warm pastries and proper coffee are a click away.
                </p>
                <Link
                  href="/menu"
                  onClick={closeDrawer}
                  className="mt-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover"
                >
                  Browse the menu
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-3 border-b border-border-warm/60 py-4 last:border-b-0"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-espresso">
                            {item.name}
                          </p>
                          <p className="mt-0.5 text-xs text-muted">
                            {formatPrice(item.price)} each
                          </p>
                        </div>

                        <div className="flex items-center gap-1 rounded-full border border-border-warm">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                            aria-label={`Decrease ${item.name} quantity`}
                            className="cursor-pointer rounded-full p-1.5 text-espresso transition-colors duration-200 hover:text-primary"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase ${item.name} quantity`}
                            className="cursor-pointer rounded-full p-1.5 text-espresso transition-colors duration-200 hover:text-primary"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden />
                          </button>
                        </div>

                        <p className="w-16 text-right text-sm font-semibold text-espresso">
                          {formatPrice(item.price * item.quantity)}
                        </p>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="cursor-pointer rounded-full p-1.5 text-muted transition-colors duration-200 hover:text-error"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <footer className="border-t border-border-warm bg-sand/40 px-6 py-5">
                  {deliveryFee > 0 && (
                    <p className="mb-3 flex items-center gap-2 rounded-xl bg-sand px-3 py-2 text-xs font-medium text-muted">
                      <Truck className="h-4 w-4 text-secondary" aria-hidden />
                      Add {formatPrice(FREE_DELIVERY_ABOVE - subtotal)} more for
                      free delivery
                    </p>
                  )}
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-muted">
                      <dt>Subtotal</dt>
                      <dd>{formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-muted">
                      <dt>Delivery</dt>
                      <dd>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-border-warm pt-2 text-base font-semibold text-espresso">
                      <dt>Total</dt>
                      <dd className="font-serif text-lg text-primary">
                        {formatPrice(subtotal + deliveryFee)}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href="/checkout"
                    onClick={closeDrawer}
                    className="mt-4 block w-full rounded-full bg-primary py-3.5 text-center font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover"
                  >
                    Checkout
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
