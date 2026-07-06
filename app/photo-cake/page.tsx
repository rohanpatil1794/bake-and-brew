import type { Metadata } from "next";
import { ImagePlus } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Photo Print Cakes" };

export default function PhotoCakePage() {
  return (
    <ComingSoon
      icon={ImagePlus}
      title="Photo Print Cakes"
      description="Upload a favourite photo and preview it printed in edible ink on your cake before you order."
    />
  );
}
