"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CalendarCheck,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  WheatOff,
  X,
} from "lucide-react";
import type { Cake } from "@/lib/data/cakes";
import { formatPrice } from "@/lib/format";
import { CakeArt } from "@/components/cakes/cake-art";
import { useCart } from "@/lib/store/cart";

export function CakeDetailModal({
  cake,
  onClose,
}: {
  cake: Cake;
  onClose: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const addItem = useCart((s) => s.addItem);

  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [booking, setBooking] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [booked, setBooked] = useState(false);

  const size = cake.sizes[sizeIndex];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleAdd = () => {
    addItem(
      {
        id: `${cake.slug}-${size.label}`,
        name: `${cake.name} (${size.label})`,
        price: size.price,
        kind: "cake",
      },
      quantity,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleBook = () => {
    if (!bookingDate) return;
    addItem({
      id: `${cake.slug}-${size.label}-${bookingDate}`,
      name: `${cake.name} (${size.label}, booked for ${bookingDate})`,
      price: size.price,
      kind: "cake",
    });
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setBooking(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-espresso/50 backdrop-blur-sm"
        aria-hidden
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={cake.name}
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96, y: prefersReducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96, y: prefersReducedMotion ? 0 : 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative grid max-h-[90vh] w-full max-w-3xl grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-3xl border border-border-warm bg-surface shadow-warm-lg sm:grid-cols-2 sm:grid-rows-1"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 cursor-pointer rounded-full border border-border-warm bg-surface p-2 text-espresso transition-colors duration-200 hover:border-primary hover:text-primary"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <div className="flex min-h-0 items-center justify-center bg-sand/60 p-6 sm:p-8 md:p-10">
          <motion.div layoutId={`cake-art-${cake.slug}`} className="w-full max-w-xs">
            <CakeArt art={cake.art} title={cake.name} className="h-auto w-full" />
          </motion.div>
        </div>

        <div className="min-h-0 overflow-y-auto p-6 md:p-8">
          <h2 className="pr-8 text-3xl font-semibold text-espresso">{cake.name}</h2>
          <p className="mt-1 text-sm font-medium text-secondary">{cake.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{cake.description}</p>

          <p className="mt-4 flex items-center gap-2 text-xs text-muted">
            <WheatOff className="h-4 w-4 text-secondary" aria-hidden />
            Contains: {cake.allergens.join(", ")}
          </p>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-espresso">Size</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {cake.sizes.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSizeIndex(i)}
                  aria-pressed={i === sizeIndex}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    i === sizeIndex
                      ? "border-primary bg-primary text-cream"
                      : "border-border-warm bg-surface text-muted hover:border-primary hover:text-primary"
                  }`}
                >
                  {s.label} · {s.serves}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-1 rounded-full border border-border-warm">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="cursor-pointer rounded-full p-2.5 text-espresso transition-colors duration-200 hover:text-primary"
              >
                <Minus className="h-4 w-4" aria-hidden />
              </button>
              <span className="w-8 text-center font-semibold" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="cursor-pointer rounded-full p-2.5 text-espresso transition-colors duration-200 hover:text-primary"
              >
                <Plus className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <p className="font-serif text-2xl font-semibold text-primary">
              {formatPrice(size.price * quantity)}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleAdd}
              disabled={added}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover disabled:opacity-90"
            >
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ scale: prefersReducedMotion ? 1 : 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Check className="h-5 w-5" aria-hidden /> Added to cart
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    <ShoppingBag className="h-5 w-5" aria-hidden /> Order now
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              type="button"
              onClick={() => setBooking((v) => !v)}
              aria-expanded={booking}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-primary px-6 py-3 font-semibold text-primary transition-colors duration-200 hover:bg-sand"
            >
              <CalendarCheck className="h-5 w-5" aria-hidden />
              Book for a date
            </button>

            <AnimatePresence>
              {booking && (
                <motion.div
                  key="booking"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="rounded-2xl bg-sand/70 p-4">
                    {booked ? (
                      <p className="flex items-center gap-2 py-2 text-sm font-semibold text-success">
                        <Check className="h-5 w-5" aria-hidden />
                        Booked! We&apos;ll have it ready on {bookingDate}.
                      </p>
                    ) : (
                      <>
                        <label
                          htmlFor="booking-date"
                          className="text-sm font-semibold text-espresso"
                        >
                          Pick-up / delivery date
                        </label>
                        <input
                          id="booking-date"
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="mt-2 w-full rounded-xl border border-border-warm bg-surface px-4 py-2.5 text-sm text-espresso outline-none focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={handleBook}
                          disabled={!bookingDate}
                          className="mt-3 w-full cursor-pointer rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Confirm booking
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
