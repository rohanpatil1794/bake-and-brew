import type { Metadata } from "next";
import { Layers } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Cake Studio" };

export default function CakeStudioPage() {
  return (
    <ComingSoon
      icon={Layers}
      title="Cake Studio"
      description="Design your own cake layer by layer — size, shape, flavour, frosting, and a custom finish — with a live preview as you build."
    />
  );
}
