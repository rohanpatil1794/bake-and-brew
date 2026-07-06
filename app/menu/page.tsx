import type { Metadata } from "next";
import { Soup } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Cafe Menu" };

export default function MenuPage() {
  return (
    <ComingSoon
      icon={Soup}
      title="Cafe Menu & Delivery"
      description="The full Bake and Brew menu — breakfast, sandwiches, pastries, coffee, and dessert — delivered to your door."
    />
  );
}
