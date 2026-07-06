import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/checkout-flow";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Delivery details for your Bake and Brew order.",
};

export default function CheckoutPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-40 pb-24">
      <CheckoutFlow />
    </section>
  );
}
