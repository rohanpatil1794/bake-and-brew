import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { FeatureTeasers } from "@/components/home/feature-teasers";
import { Reveal } from "@/components/motion/reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-sand/50">
        <FeatureTeasers />
      </div>
      <CtaBand />
    </>
  );
}

function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="grain relative overflow-hidden rounded-3xl bg-espresso px-8 py-16 text-center text-cream sm:px-16">
          <h2 className="text-4xl font-semibold">
            Got a celebration coming up?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-cream/75">
            Design a custom cake in our interactive Cake Studio — pick the
            layers, flavours, and finish, and watch it come together live.
          </p>
          <Link
            href="/cake-studio"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-caramel px-7 py-3.5 font-semibold text-espresso transition-colors duration-200 hover:bg-cream"
          >
            Open the Cake Studio
            <ArrowRight
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
