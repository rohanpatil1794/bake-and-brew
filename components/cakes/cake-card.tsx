"use client";

import { motion } from "motion/react";
import type { Cake } from "@/lib/data/cakes";
import { formatPrice } from "@/lib/format";
import { CakeArt } from "@/components/cakes/cake-art";

export function CakeCard({
  cake,
  onSelect,
}: {
  cake: Cake;
  onSelect: (slug: string) => void;
}) {
  const fromPrice = Math.min(...cake.sizes.map((s) => s.price));

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(cake.slug)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border-warm bg-surface text-left shadow-warm transition-[border-color,box-shadow] duration-200 hover:border-caramel hover:shadow-warm-lg"
    >
      <div className="relative overflow-hidden bg-sand/60 pt-6">
        <motion.div layoutId={`cake-art-${cake.slug}`} className="mx-auto w-3/4">
          <CakeArt art={cake.art} title={cake.name} className="h-auto w-full" />
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-espresso">{cake.name}</h3>
        <p className="mt-1 flex-1 text-sm text-muted">{cake.tagline}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted">
            from{" "}
            <span className="font-serif text-lg font-semibold text-primary">
              {formatPrice(fromPrice)}
            </span>
          </p>
          <span className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-cream">
            View cake
          </span>
        </div>
      </div>
    </motion.button>
  );
}
