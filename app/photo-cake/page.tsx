import type { Metadata } from "next";
import { PhotoCakeDesigner } from "@/components/photo-cake/photo-cake-designer";

export const metadata: Metadata = {
  title: "Photo Print Cakes",
  description:
    "Upload a favourite photo and preview it printed in edible ink on your cake before you order.",
};

export default function PhotoCakePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-40 pb-24">
      <h1 className="text-center text-5xl font-semibold text-espresso">
        Photo Print <span className="text-primary">Cakes</span>
      </h1>
      <p className="mx-auto mt-4 mb-14 max-w-xl text-center text-muted">
        Your favourite photo, printed in edible ink on buttercream. Upload,
        position it just right, and we&apos;ll handle the rest.
      </p>
      <PhotoCakeDesigner />
    </section>
  );
}
