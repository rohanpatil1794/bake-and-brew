import type { Metadata } from "next";
import { getMenu } from "@/lib/data/menu";
import { MenuBrowser } from "@/components/menu/menu-browser";

export const metadata: Metadata = {
  title: "Cafe Menu",
  description:
    "The full Bake and Brew menu — breakfast, sandwiches, pastries, coffee, and dessert — delivered to your door.",
};

export default async function MenuPage() {
  const categories = await getMenu();

  return (
    <section className="mx-auto max-w-6xl px-5 pt-28 sm:px-6 sm:pt-40 pb-24">
      <h1 className="text-center text-4xl font-semibold sm:text-5xl text-espresso">
        The <span className="text-primary">Menu</span>
      </h1>
      <p className="mx-auto mt-4 mb-10 max-w-xl text-center text-muted">
        Everything is baked and brewed in-house, then delivered warm. Free
        delivery on orders over ₹999.
      </p>
      <MenuBrowser categories={categories} />
    </section>
  );
}
