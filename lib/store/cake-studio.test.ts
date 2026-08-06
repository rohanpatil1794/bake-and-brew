import { describe, expect, it } from "vitest";
import {
  EXTRA_TIER_PRICE,
  GANACHE_PRICE,
  STUDIO_SIZES,
  TOPPER_PRICE,
  studioPrice,
  studioSummary,
  type StudioFlavor,
} from "@/lib/store/cake-studio";

const base = {
  sizeIndex: 1,
  shape: "round" as const,
  tiers: ["Vanilla"] as StudioFlavor[],
  frosting: "buttercream" as const,
  topper: "None" as const,
};

describe("studioPrice", () => {
  it("is just the size price for a single plain tier", () => {
    expect(studioPrice(base)).toBe(STUDIO_SIZES[1].price);
  });

  it("adds per extra tier", () => {
    const three = { ...base, tiers: ["Vanilla", "Chocolate", "Red Velvet"] as StudioFlavor[] };
    expect(studioPrice(three)).toBe(STUDIO_SIZES[1].price + 2 * EXTRA_TIER_PRICE);
  });

  it("adds ganache and topper surcharges", () => {
    const loaded = {
      ...base,
      frosting: "ganache" as const,
      topper: "Fresh berries" as const,
    };
    expect(studioPrice(loaded)).toBe(
      STUDIO_SIZES[1].price + GANACHE_PRICE + TOPPER_PRICE,
    );
  });

  it("sums size, tiers, frosting, and topper together", () => {
    const full = {
      sizeIndex: 2,
      shape: "square" as const,
      tiers: ["Chocolate", "Butterscotch", "Red Velvet"] as StudioFlavor[],
      frosting: "ganache" as const,
      topper: "Candles" as const,
    };
    expect(studioPrice(full)).toBe(
      STUDIO_SIZES[2].price + 2 * EXTRA_TIER_PRICE + GANACHE_PRICE + TOPPER_PRICE,
    );
  });
});

describe("studioSummary", () => {
  it("describes size, layers, flavours, and frosting", () => {
    expect(studioSummary(base)).toBe('8" round · 1 layer · Vanilla · buttercream');
  });

  it("pluralises layers and lists each flavour", () => {
    const two = { ...base, tiers: ["Vanilla", "Chocolate"] as StudioFlavor[] };
    expect(studioSummary(two)).toBe(
      '8" round · 2 layers · Vanilla · Chocolate · buttercream',
    );
  });

  it("appends a non-None topper", () => {
    const withTopper = { ...base, topper: "Fresh berries" as const };
    expect(studioSummary(withTopper)).toContain("fresh berries");
  });
});
