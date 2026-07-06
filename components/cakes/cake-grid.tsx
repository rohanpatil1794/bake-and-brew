"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cakeCategories, type Cake, type CakeCategory } from "@/lib/data/cakes";
import { CakeCard } from "@/components/cakes/cake-card";
import { CakeDetailModal } from "@/components/cakes/cake-detail-modal";

export function CakeGrid({ cakes }: { cakes: Cake[] }) {
  const [category, setCategory] = useState<CakeCategory | "all">("all");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      category === "all"
        ? cakes
        : cakes.filter((c) => c.categories.includes(category)),
    [cakes, category],
  );

  const selected = cakes.find((c) => c.slug === selectedSlug) ?? null;

  return (
    <>
      <div
        role="group"
        aria-label="Filter cakes by category"
        className="flex flex-wrap justify-center gap-2"
      >
        {cakeCategories.map((cat) => {
          const active = cat.value === category;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategory(cat.value)}
              aria-pressed={active}
              className={`relative cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                active ? "text-cream" : "text-muted hover:text-primary"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="cake-filter-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{cat.label}</span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((cake) => (
            <motion.li
              key={cake.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <CakeCard cake={cake} onSelect={setSelectedSlug} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {selected && (
          <CakeDetailModal
            key={selected.slug}
            cake={selected}
            onClose={() => setSelectedSlug(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
