"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MAX_DAYS_AHEAD = 60;

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function Calendar({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (dateKey: string) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + MAX_DAYS_AHEAD);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [direction, setDirection] = useState(1);

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const monthLabel = firstOfMonth.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());
  const canGoNext =
    new Date(viewYear, viewMonth + 1, 1) <= maxDate;

  const navigate = (delta: number) => {
    setDirection(delta);
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startWeekday = firstOfMonth.getDay();
  const cells: (Date | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(viewYear, viewMonth, i + 1),
    ),
  ];

  return (
    <div className="w-full max-w-sm rounded-3xl border border-border-warm bg-surface p-5 shadow-warm">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="cursor-pointer rounded-full border border-border-warm p-2 text-espresso transition-colors duration-200 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={monthLabel}
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: prefersReducedMotion ? 0 : direction * -24 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="font-serif text-lg font-semibold text-espresso"
            aria-live="polite"
          >
            {monthLabel}
          </motion.p>
        </AnimatePresence>
        <button
          type="button"
          onClick={() => navigate(1)}
          disabled={!canGoNext}
          aria-label="Next month"
          className="cursor-pointer rounded-full border border-border-warm p-2 text-espresso transition-colors duration-200 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 text-center text-xs font-semibold text-muted">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${viewYear}-${viewMonth}`}
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : direction * 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: prefersReducedMotion ? 0 : direction * -32 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mt-1 grid grid-cols-7 gap-1"
        >
          {cells.map((date, i) => {
            if (!date) return <span key={`pad-${i}`} />;
            const key = toDateKey(date);
            const disabled = date < today || date > maxDate;
            const isToday = key === toDateKey(today);
            const isSelected = key === selected;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelect(key)}
                disabled={disabled}
                aria-pressed={isSelected}
                aria-label={date.toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
                className={`aspect-square cursor-pointer rounded-xl text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-30 ${
                  isSelected
                    ? "bg-primary text-cream"
                    : isToday
                      ? "border-2 border-primary text-primary hover:bg-sand"
                      : "text-espresso hover:bg-sand"
                }`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
