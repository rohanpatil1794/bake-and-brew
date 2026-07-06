"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Flame, Leaf, Minus, Nut, Plus, Sprout, Star } from "lucide-react";
import type { DietaryTag, MenuItem } from "@/lib/data/menu";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/store/cart";

const tagConfig: Record<
  DietaryTag,
  { icon: typeof Leaf; label: string; className: string }
> = {
  veg: { icon: Leaf, label: "Vegetarian", className: "text-success" },
  vegan: { icon: Sprout, label: "Vegan", className: "text-success" },
  nuts: { icon: Nut, label: "Contains nuts", className: "text-secondary" },
  spicy: { icon: Flame, label: "Spicy", className: "text-error" },
  bestseller: { icon: Star, label: "Bestseller", className: "text-secondary" },
};

export function MenuItemRow({ item }: { item: MenuItem }) {
  const quantity = useCart(
    (s) => s.items.find((i) => i.id === item.id)?.quantity ?? 0,
  );
  const addItem = useCart((s) => s.addItem);
  const setQuantity = useCart((s) => s.setQuantity);
  const prefersReducedMotion = useReducedMotion();

  const handleAdd = () =>
    addItem({ id: item.id, name: item.name, price: item.price, kind: "food" });

  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-border-warm bg-surface p-5 shadow-warm transition-[border-color] duration-200 hover:border-caramel">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-serif text-lg font-semibold text-espresso">
            {item.name}
          </h3>
          {item.tags.map((tag) => {
            const { icon: Icon, label, className } = tagConfig[tag];
            return (
              <span key={tag} title={label} className={className}>
                <Icon className="h-4 w-4" aria-hidden />
                <span className="sr-only">{label}</span>
              </span>
            );
          })}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {item.description}
        </p>
        <p className="mt-2 font-serif text-lg font-semibold text-primary">
          {formatPrice(item.price)}
        </p>
      </div>

      <div className="shrink-0 pt-1">
        <AnimatePresence mode="wait" initial={false}>
          {quantity === 0 ? (
            <motion.button
              key="add"
              type="button"
              onClick={handleAdd}
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.85 }}
              transition={{ duration: 0.15 }}
              aria-label={`Add ${item.name} to cart`}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Add
            </motion.button>
          ) : (
            <motion.div
              key="stepper"
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.85 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1 rounded-full border border-primary bg-surface"
            >
              <button
                type="button"
                onClick={() => setQuantity(item.id, quantity - 1)}
                aria-label={`Decrease ${item.name} quantity`}
                className="cursor-pointer rounded-full p-2 text-primary transition-colors duration-200 hover:bg-sand"
              >
                <Minus className="h-4 w-4" aria-hidden />
              </button>
              <span
                className="w-6 text-center text-sm font-semibold text-espresso"
                aria-live="polite"
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(item.id, quantity + 1)}
                aria-label={`Increase ${item.name} quantity`}
                className="cursor-pointer rounded-full p-2 text-primary transition-colors duration-200 hover:bg-sand"
              >
                <Plus className="h-4 w-4" aria-hidden />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
