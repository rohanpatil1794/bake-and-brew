import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Your Cart" };

export default function CartPage() {
  return (
    <ComingSoon
      icon={ShoppingBag}
      title="Your Cart"
      description="Everything you've picked — cakes, custom creations, and cafe food — reviewed in one place before checkout."
    />
  );
}
