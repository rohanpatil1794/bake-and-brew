import type { Metadata } from "next";
import { getCakes } from "@/lib/data/cakes";
import { CakeGrid } from "@/components/cakes/cake-grid";

export const metadata: Metadata = {
  title: "Signature Cakes",
  description:
    "Hand-crafted signature cakes — browse the collection, order for delivery, or book one for your special date.",
};

export default async function CakesPage() {
  const cakes = await getCakes();

  return (
    <section className="mx-auto max-w-6xl px-6 pt-40 pb-24">
      <h1 className="text-center text-5xl font-semibold text-espresso">
        Signature <span className="text-primary">Cakes</span>
      </h1>
      <p className="mx-auto mt-4 mb-12 max-w-xl text-center text-muted">
        Every cake is baked to order in our kitchen. Order for delivery today,
        or book one for the day that matters.
      </p>
      <CakeGrid cakes={cakes} />
    </section>
  );
}
