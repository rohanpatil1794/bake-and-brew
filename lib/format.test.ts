import { describe, expect, it } from "vitest";
import { formatPrice } from "@/lib/format";

describe("formatPrice", () => {
  it("formats with a rupee symbol", () => {
    expect(formatPrice(249)).toBe("₹249");
  });

  it("groups thousands with the Indian numbering system", () => {
    expect(formatPrice(1499)).toBe("₹1,499");
    expect(formatPrice(100000)).toBe("₹1,00,000");
  });

  it("handles zero", () => {
    expect(formatPrice(0)).toBe("₹0");
  });
});
