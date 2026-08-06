import { describe, expect, it } from "vitest";
import {
  DELIVERY_FEE,
  FREE_DELIVERY_ABOVE,
  computeDeliveryFee,
} from "@/lib/store/cart";

describe("computeDeliveryFee", () => {
  it("is free for an empty cart", () => {
    expect(computeDeliveryFee(0)).toBe(0);
  });

  it("charges the flat fee below the free-delivery threshold", () => {
    expect(computeDeliveryFee(1)).toBe(DELIVERY_FEE);
    expect(computeDeliveryFee(FREE_DELIVERY_ABOVE - 1)).toBe(DELIVERY_FEE);
  });

  it("is free at or above the threshold", () => {
    expect(computeDeliveryFee(FREE_DELIVERY_ABOVE)).toBe(0);
    expect(computeDeliveryFee(FREE_DELIVERY_ABOVE + 500)).toBe(0);
  });
});
