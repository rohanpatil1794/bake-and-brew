"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import { staggerContainer, staggerItem } from "@/components/motion/reveal";

const testimonials = [
  {
    quote:
      "The photo-print cake for my mum's 60th was flawless — the image was crisp and it tasted even better than it looked.",
    name: "Ananya R.",
    detail: "Birthday cake",
  },
  {
    quote:
      "We booked a table for our anniversary and they'd set aside the corner spot with a little treat. Proper hospitality.",
    name: "Karan & Meera",
    detail: "Table booking",
  },
  {
    quote:
      "The Cake Studio is genuinely fun — my daughter designed her own unicorn cake and we ordered it in five minutes.",
    name: "Priya S.",
    detail: "Custom cake",
  },
];

export function Testimonials() {
  return (
    <section
      className="mx-auto max-w-6xl px-5 py-24 sm:px-6"
      aria-labelledby="testimonials-heading"
    >
      <h2
        id="testimonials-heading"
        className="text-center text-4xl font-semibold text-espresso"
      >
        Loved by our <span className="text-primary">regulars</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center text-muted">
        A few kind words from the people we bake for.
      </p>

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {testimonials.map((t) => (
          <motion.li
            key={t.name}
            variants={staggerItem}
            className="flex h-full flex-col rounded-2xl border border-border-warm bg-surface p-7 shadow-warm"
          >
            <div className="flex gap-0.5" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-secondary text-secondary"
                  aria-hidden
                />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 leading-relaxed text-espresso">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <footer className="mt-5">
              <p className="font-semibold text-espresso">{t.name}</p>
              <p className="text-sm text-muted">{t.detail}</p>
            </footer>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
