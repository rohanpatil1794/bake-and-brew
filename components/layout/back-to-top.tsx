"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: prefersReducedMotion ? "auto" : "smooth",
            })
          }
          aria-label="Back to top"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.6 }}
          whileHover={{ y: prefersReducedMotion ? 0 : -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="fixed right-4 bottom-4 z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary text-cream shadow-warm-lg transition-colors duration-200 hover:bg-primary-hover sm:right-6 sm:bottom-6"
        >
          <ArrowUp className="h-5 w-5" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
