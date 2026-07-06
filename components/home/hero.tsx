"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarCheck } from "lucide-react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="grain relative overflow-hidden">
      {/* Warm backdrop blobs */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-sand blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-caramel/20 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-40 pb-24 lg:grid-cols-2 lg:pt-48">
        <motion.div
          variants={prefersReducedMotion ? undefined : container}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={rise}
            className="inline-block rounded-full border border-border-warm bg-surface px-4 py-1.5 text-sm font-medium text-muted"
          >
            Artisan bakery · Cozy cafe
          </motion.p>

          <motion.h1
            variants={rise}
            className="mt-6 text-5xl leading-tight font-semibold text-espresso sm:text-6xl"
          >
            Baked with <span className="text-primary">love</span>,<br />
            brewed with <span className="text-secondary">care</span>.
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-md text-lg leading-relaxed text-muted"
          >
            Hand-crafted cakes made to order, fresh cafe food at your door, and
            a warm table waiting when you&apos;d rather stay a while.
          </motion.p>

          <motion.div variants={rise} className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/cakes"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-cream shadow-warm transition-colors duration-200 hover:bg-primary-hover"
            >
              Order Cakes
              <ArrowRight
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <Link
              href="/book-a-table"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-7 py-3.5 font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-cream"
            >
              <CalendarCheck className="h-5 w-5" aria-hidden />
              Book a Table
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={
            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
          className="relative mx-auto w-full max-w-md"
        >
          <CakeIllustration animate={!prefersReducedMotion} />
        </motion.div>
      </div>
    </section>
  );
}

/** Brand-styled layered cake + coffee illustration with drifting steam. */
function CakeIllustration({ animate }: { animate: boolean }) {
  return (
    <svg
      viewBox="0 0 420 360"
      role="img"
      aria-label="Illustration of a layered cake beside a steaming cup of coffee"
      className="h-auto w-full drop-shadow-[0_12px_40px_rgba(120,53,15,0.18)]"
    >
      {/* Plate */}
      <ellipse cx="180" cy="318" rx="150" ry="20" fill="#e7d5bf" />
      <ellipse cx="180" cy="312" rx="150" ry="20" fill="#fffbf5" />

      {/* Bottom tier */}
      <rect x="70" y="230" width="220" height="80" rx="14" fill="#c67b5c" />
      <rect x="70" y="230" width="220" height="34" rx="14" fill="#92400e" />
      <path
        d="M70 258 q13 16 27 0 q14 16 27 0 q14 16 27 0 q14 16 28 0 q14 16 27 0 q14 16 27 0 q14 16 28 0 q14 16 29 0 v-28 h-220 z"
        fill="#92400e"
      />

      {/* Middle tier */}
      <rect x="100" y="160" width="160" height="70" rx="12" fill="#fdf6ec" />
      <rect x="100" y="160" width="160" height="28" rx="12" fill="#b45309" />
      <path
        d="M100 182 q11 14 22 0 q12 14 23 0 q12 14 23 0 q12 14 23 0 q12 14 23 0 q12 14 23 0 q12 14 23 0 v-22 h-160 z"
        fill="#b45309"
      />

      {/* Top tier */}
      <rect x="130" y="106" width="100" height="54" rx="10" fill="#c67b5c" />
      <rect x="130" y="106" width="100" height="20" rx="10" fill="#fdf6ec" />

      {/* Cherries */}
      <circle cx="152" cy="98" r="9" fill="#b3402a" />
      <circle cx="180" cy="92" r="9" fill="#b3402a" />
      <circle cx="208" cy="98" r="9" fill="#b3402a" />
      <path
        d="M180 92 q4 -14 12 -18"
        stroke="#4d7c4a"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Coffee cup */}
      <g>
        <ellipse cx="352" cy="316" rx="52" ry="10" fill="#e7d5bf" />
        <path
          d="M312 244 h80 l-9 66 a14 14 0 0 1 -14 12 h-34 a14 14 0 0 1 -14 -12 z"
          fill="#fffbf5"
          stroke="#e7d5bf"
          strokeWidth="3"
        />
        <ellipse cx="352" cy="246" rx="40" ry="9" fill="#3d2314" />
        <path
          d="M392 254 q26 2 24 22 q-2 20 -28 16"
          fill="none"
          stroke="#e7d5bf"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Steam */}
        {[336, 352, 368].map((x, i) => (
          <path
            key={x}
            d={`M${x} 224 q-8 -14 0 -26 q8 -12 0 -26`}
            fill="none"
            stroke="#c67b5c"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.5"
          >
            {animate && (
              <>
                <animate
                  attributeName="opacity"
                  values="0;0.55;0"
                  dur="3s"
                  begin={`${i * 0.7}s`}
                  repeatCount="indefinite"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 6; 0 -10"
                  dur="3s"
                  begin={`${i * 0.7}s`}
                  repeatCount="indefinite"
                />
              </>
            )}
          </path>
        ))}
      </g>
    </svg>
  );
}
