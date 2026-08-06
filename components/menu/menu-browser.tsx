"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Leaf, Sprout, Star } from "lucide-react";
import {
  filterCategoriesByTag,
  type DietaryTag,
  type MenuCategory,
} from "@/lib/data/menu";
import { MenuItemRow } from "@/components/menu/menu-item-row";
import { staggerContainer, staggerItem } from "@/components/motion/reveal";

const dietaryFilters: { value: DietaryTag; label: string; icon: typeof Leaf }[] = [
  { value: "veg", label: "Veg", icon: Leaf },
  { value: "vegan", label: "Vegan", icon: Sprout },
  { value: "bestseller", label: "Bestsellers", icon: Star },
];

export function MenuBrowser({ categories }: { categories: MenuCategory[] }) {
  const [filter, setFilter] = useState<DietaryTag | null>(null);
  const visibleCategories = useMemo(
    () => filterCategoriesByTag(categories, filter),
    [categories, filter],
  );

  const [active, setActive] = useState(categories[0]?.id);
  const observerLock = useRef(false);

  // Scrollspy: highlight the category whose section occupies mid-viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (observerLock.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    for (const cat of visibleCategories) {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [visibleCategories]);

  const scrollToCategory = (id: string) => {
    setActive(id);
    // Suppress the observer while smooth-scrolling so the pill doesn't hop
    observerLock.current = true;
    setTimeout(() => (observerLock.current = false), 800);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setFilter(null)}
          aria-pressed={filter === null}
          className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            filter === null
              ? "border-primary bg-primary text-cream"
              : "border-border-warm bg-surface text-muted hover:border-primary hover:text-primary"
          }`}
        >
          Everything
        </button>
        {dietaryFilters.map((f) => {
          const isOn = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(isOn ? null : f.value)}
              aria-pressed={isOn}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                isOn
                  ? "border-primary bg-primary text-cream"
                  : "border-border-warm bg-surface text-muted hover:border-primary hover:text-primary"
              }`}
            >
              <f.icon className="h-4 w-4" aria-hidden />
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="sticky top-24 z-30 -mx-2 mb-10">
        <nav
          aria-label="Menu categories"
          className="mx-auto flex max-w-fit gap-1 overflow-x-auto rounded-full border border-border-warm bg-surface/95 p-1.5 shadow-warm backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visibleCategories.map((cat) => {
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToCategory(cat.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  isActive ? "text-cream" : "text-muted hover:text-primary"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="menu-category-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{cat.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-16">
        {visibleCategories.map((cat) => (
          <section
            key={cat.id}
            id={cat.id}
            aria-labelledby={`${cat.id}-heading`}
            className="scroll-mt-44"
          >
            <h2
              id={`${cat.id}-heading`}
              className="text-3xl font-semibold text-espresso"
            >
              {cat.label}
            </h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              className="mt-6 grid gap-4 lg:grid-cols-2"
            >
              {cat.items.map((item) => (
                <motion.div key={item.id} variants={staggerItem}>
                  <MenuItemRow item={item} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}
      </div>
    </>
  );
}
