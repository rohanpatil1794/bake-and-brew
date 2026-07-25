"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Send } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only: real submission is wired when the backend lands
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(true);
      return;
    }
    setError(false);
    setSubscribed(true);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Sweet things, inbox-fresh</h3>
      <p className="mt-2 text-sm text-cream/70">
        New bakes, seasonal specials, and the occasional treat. No spam.
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {subscribed ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 text-sm font-medium text-caramel"
          >
            <Check className="h-5 w-5" aria-hidden />
            You&apos;re on the list — welcome!
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4"
          >
            <div className="flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="you@example.com"
                className={`min-w-0 flex-1 rounded-full border bg-cream/10 px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 outline-none transition-colors duration-200 focus:border-caramel ${
                  error ? "border-error" : "border-cream/20"
                }`}
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-caramel px-4 py-2.5 font-semibold text-espresso transition-colors duration-200 hover:bg-cream"
              >
                <Send className="h-4 w-4" aria-hidden />
              </button>
            </div>
            {error && (
              <p role="alert" className="mt-1.5 text-xs font-medium text-error">
                Please enter a valid email address.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
