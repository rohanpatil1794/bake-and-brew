import { describe, expect, it } from "vitest";
import { cakeCategories, getCakes } from "@/lib/data/cakes";

describe("cake catalog", () => {
  it("has unique slugs", async () => {
    const cakes = await getCakes();
    const slugs = cakes.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gives every cake at least one size with a positive price", async () => {
    const cakes = await getCakes();
    for (const cake of cakes) {
      expect(cake.sizes.length).toBeGreaterThan(0);
      expect(cake.sizes.every((s) => s.price > 0)).toBe(true);
    }
  });

  it("only uses categories that exist in the filter list", async () => {
    const cakes = await getCakes();
    const known = new Set(cakeCategories.map((c) => c.value));
    for (const cake of cakes) {
      for (const category of cake.categories) {
        expect(known.has(category)).toBe(true);
      }
    }
  });

  it("gives every cake a name and a tagline", async () => {
    const cakes = await getCakes();
    for (const cake of cakes) {
      expect(cake.name.length).toBeGreaterThan(0);
      expect(cake.tagline.length).toBeGreaterThan(0);
    }
  });
});
