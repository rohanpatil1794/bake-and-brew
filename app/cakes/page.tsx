import type { Metadata } from "next";
import { Cake } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Signature Cakes" };

export default function CakesPage() {
  return (
    <ComingSoon
      icon={Cake}
      title="Signature Cakes"
      description="Our hand-crafted cake collection — browse, order for delivery, or book one for your special date."
    />
  );
}
