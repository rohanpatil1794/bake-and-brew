"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Croissant, Menu, ShoppingBag, X } from "lucide-react";
import { site } from "@/lib/site";
import { useCartCount, useCartDrawer } from "@/lib/store/cart";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const openDrawer = useCartDrawer((s) => s.openDrawer);

  // Cart count is read after mount to avoid hydration mismatch with persisted state
  const count = useCartCount();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed top-4 left-4 right-4 z-40">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border border-border-warm bg-surface/90 px-4 py-3 shadow-warm backdrop-blur sm:px-5"
      >
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2 font-serif text-lg font-semibold whitespace-nowrap text-espresso sm:text-xl"
        >
          <Croissant className="h-6 w-6 shrink-0 text-primary" aria-hidden />
          <span className="truncate">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    active ? "text-cream" : "text-muted hover:text-primary"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open cart, ${mounted ? count : 0} items`}
            className="relative cursor-pointer rounded-full border border-border-warm bg-surface p-2.5 text-espresso transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            <AnimatePresence>
              {mounted && count > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: prefersReducedMotion ? 1 : 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-xs font-semibold text-cream"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="cursor-pointer rounded-full border border-border-warm bg-surface p-2.5 text-espresso transition-colors duration-200 hover:border-primary hover:text-primary lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-border-warm bg-surface p-3 shadow-warm-lg lg:hidden"
          >
            <ul className="flex flex-col">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-2xl px-4 py-3 font-medium transition-colors duration-200 ${
                      pathname.startsWith(item.href)
                        ? "bg-sand text-primary"
                        : "text-espresso hover:bg-sand/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
