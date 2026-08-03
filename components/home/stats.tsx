"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

const stats = [
  { value: 12, suffix: "k+", label: "Cakes baked" },
  { value: 4.9, suffix: "★", label: "Average rating", decimals: 1 },
  { value: 60, suffix: "+", label: "Menu items" },
  { value: 8, suffix: " yrs", label: "Serving Pune" },
];

function Counter({
  value,
  suffix,
  decimals = 0,
  play,
}: {
  value: number;
  suffix: string;
  decimals?: number;
  play: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(decimals));
  const [display, setDisplay] = useState(prefersReducedMotion ? value.toFixed(decimals) : "0");

  useEffect(() => {
    if (!play) return;
    if (prefersReducedMotion) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    const unsub = rounded.on("change", (v) => setDisplay(v));
    const controls = animate(count, value, { duration: 1.4, ease: "easeOut" });
    return () => {
      controls.stop();
      unsub();
    };
  }, [play, value, decimals, count, rounded, prefersReducedMotion]);

  return (
    <span className="font-serif text-4xl font-semibold text-primary sm:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="bg-sand/50" aria-label="Bake and Brew by the numbers">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-16 sm:px-6 lg:grid-cols-4"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <Counter
              value={s.value}
              suffix={s.suffix}
              decimals={s.decimals}
              play={inView}
            />
            <p className="mt-2 text-sm font-medium text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
