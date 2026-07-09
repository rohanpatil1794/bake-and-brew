import type { MetadataRoute } from "next";

const base = "https://bake-and-brew-jade.vercel.app";

const routes = [
  "",
  "/cakes",
  "/menu",
  "/cake-studio",
  "/photo-cake",
  "/book-a-table",
  "/checkout",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
