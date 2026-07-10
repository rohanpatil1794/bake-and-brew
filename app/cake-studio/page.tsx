import type { Metadata } from "next";
import { CakeStudio } from "@/components/cake-studio/cake-studio";

export const metadata: Metadata = {
  title: "Cake Studio",
  description:
    "Design your own cake layer by layer — size, shape, flavour, frosting, and a custom finish — with a live preview as you build.",
};

export default function CakeStudioPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-28 sm:px-6 sm:pt-40 pb-32">
      <h1 className="text-center text-5xl font-semibold text-espresso">
        Cake <span className="text-primary">Studio</span>
      </h1>
      <p className="mx-auto mt-4 mb-14 max-w-xl text-center text-muted">
        Build your dream cake from the ground up and watch it come together
        live. When it&apos;s just right, drop it in the cart.
      </p>
      <CakeStudio />
    </section>
  );
}
