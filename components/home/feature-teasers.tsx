"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Cake,
  CalendarCheck,
  ImagePlus,
  Layers,
  Soup,
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/components/motion/reveal";

const features = [
  {
    href: "/cakes",
    icon: Cake,
    title: "Signature Cakes",
    description:
      "Browse our hand-crafted collection — order for delivery or book one for the big day.",
  },
  {
    href: "/photo-cake",
    icon: ImagePlus,
    title: "Photo Print Cakes",
    description:
      "Upload a favourite photo and we print it in edible ink on a cake worth framing.",
  },
  {
    href: "/menu",
    icon: Soup,
    title: "Cafe Menu & Delivery",
    description:
      "Breakfast to late dessert — order the full cafe menu straight to your door.",
  },
  {
    href: "/book-a-table",
    icon: CalendarCheck,
    title: "Table Booking",
    description:
      "Pick a date, a time, and how many friends. We'll keep the corner table warm.",
  },
  {
    href: "/cake-studio",
    icon: Layers,
    title: "Cake Studio",
    description:
      "Design your own cake layer by layer — size, flavour, frosting, and finish — with a live preview.",
  },
] as const;

export function FeatureTeasers() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24" aria-labelledby="features-heading">
      <h2
        id="features-heading"
        className="text-center text-4xl font-semibold text-espresso"
      >
        What&apos;s baking at <span className="text-primary">Bake and Brew</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center text-muted">
        Five ways to treat yourself — whether it&apos;s delivered to your door
        or served at our table.
      </p>

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.li key={feature.href} variants={staggerItem}>
            <Link
              href={feature.href}
              className="group flex h-full cursor-pointer flex-col rounded-2xl border border-border-warm bg-surface p-7 shadow-warm transition-[border-color,box-shadow] duration-200 hover:border-caramel hover:shadow-warm-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-cream">
                <feature.icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-espresso">
                {feature.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Explore
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
