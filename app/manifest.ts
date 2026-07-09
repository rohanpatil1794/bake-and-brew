import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bake and Brew — Artisan Bakery & Cafe",
    short_name: "Bake & Brew",
    description:
      "Artisan cakes, custom photo-print cakes, cafe food delivery, table booking, and an interactive cake studio.",
    start_url: "/",
    display: "standalone",
    background_color: "#fdf6ec",
    theme_color: "#92400e",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
