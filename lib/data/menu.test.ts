import { describe, expect, it } from "vitest";
import {
  filterCategoriesByTag,
  getMenu,
  type MenuCategory,
} from "@/lib/data/menu";

const sample: MenuCategory[] = [
  {
    id: "a",
    label: "A",
    items: [
      { id: "a1", name: "Veg one", description: "", price: 100, tags: ["veg"] },
      { id: "a2", name: "Meat", description: "", price: 200, tags: [] },
    ],
  },
  {
    id: "b",
    label: "B",
    items: [
      { id: "b1", name: "Meat two", description: "", price: 300, tags: [] },
    ],
  },
];

describe("filterCategoriesByTag", () => {
  it("returns categories unchanged when tag is null", () => {
    expect(filterCategoriesByTag(sample, null)).toBe(sample);
  });

  it("keeps only items with the tag", () => {
    const result = filterCategoriesByTag(sample, "veg");
    expect(result).toHaveLength(1);
    expect(result[0].items.map((i) => i.id)).toEqual(["a1"]);
  });

  it("drops categories with no matching items", () => {
    const result = filterCategoriesByTag(sample, "veg");
    expect(result.map((c) => c.id)).toEqual(["a"]);
  });

  it("does not mutate the input", () => {
    filterCategoriesByTag(sample, "veg");
    expect(sample[0].items).toHaveLength(2);
  });
});

describe("getMenu", () => {
  it("returns categories that each have items", async () => {
    const menu = await getMenu();
    expect(menu.length).toBeGreaterThan(0);
    expect(menu.every((c) => c.items.length > 0)).toBe(true);
  });

  it("has unique item ids across the whole menu", async () => {
    const menu = await getMenu();
    const ids = menu.flatMap((c) => c.items.map((i) => i.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});
