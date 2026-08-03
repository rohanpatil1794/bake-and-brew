"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data/faq";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="mx-auto max-w-3xl px-5 py-24 sm:px-6"
      aria-labelledby="faq-heading"
    >
      <h2
        id="faq-heading"
        className="text-center text-4xl font-semibold text-espresso"
      >
        Questions, <span className="text-primary">answered</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center text-muted">
        Everything you might want to know before you order.
      </p>

      <ul className="mt-12 space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <li
              key={faq.q}
              className="overflow-hidden rounded-2xl border border-border-warm bg-surface shadow-warm"
            >
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-espresso"
                >
                  {faq.q}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: prefersReducedMotion ? "auto" : 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: prefersReducedMotion ? "auto" : 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 leading-relaxed text-muted">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
