import type { Metadata } from "next";
import Link from "next/link";
import { Clock, HandHeart, MapPin, Sprout, Wheat } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Bake and Brew came to be — a neighbourhood bakery and cafe baking everything fresh, from scratch, every day.",
};

const values = [
  {
    icon: Wheat,
    title: "Baked from scratch",
    body: "No mixes, no shortcuts. Doughs are made, proved, and baked in-house every single morning.",
  },
  {
    icon: Sprout,
    title: "Sourced with care",
    body: "Seasonal fruit, single-estate coffee, and honest dairy — chosen from local suppliers we trust.",
  },
  {
    icon: HandHeart,
    title: "Made to be shared",
    body: "Every cake and cup is built for a moment — a birthday, a first date, or just a slow Sunday.",
  },
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-28 pb-24 sm:px-6 sm:pt-40">
      <Reveal>
        <p className="text-center text-sm font-medium text-secondary">
          Our story
        </p>
        <h1 className="mt-3 text-center text-4xl font-semibold text-espresso sm:text-5xl">
          A little corner of <span className="text-primary">warmth</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted">
          Bake and Brew started with a home oven, a hand-me-down cake tin, and a
          simple belief: that something made by hand tastes better. What began as
          weekend orders for friends grew into the neighbourhood bakery and cafe
          you know today — still small enough to know your usual, still baking
          everything fresh before the sun&apos;s properly up.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {values.map((value, i) => (
          <Reveal key={value.title} delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-2xl border border-border-warm bg-surface p-7 shadow-warm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-primary">
                <value.icon className="h-6 w-6" aria-hidden />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-espresso">
                {value.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {value.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-16 grid gap-6 rounded-3xl border border-border-warm bg-sand/50 p-8 sm:grid-cols-2 sm:p-10">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-espresso">
              <MapPin className="h-5 w-5 text-primary" aria-hidden /> Find us
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{site.address}</p>
            <p className="mt-1 text-muted">{site.phone}</p>
          </div>
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-espresso">
              <Clock className="h-5 w-5 text-primary" aria-hidden /> Opening hours
            </h2>
            <ul className="mt-3 space-y-1.5 text-muted">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-14 text-center">
          <Link
            href="/book-a-table"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover"
          >
            Come say hello — book a table
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
