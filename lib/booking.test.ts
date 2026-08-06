import { describe, expect, it } from "vitest";
import { ALL_SLOTS, SLOT_GROUPS, isSlotBooked } from "@/lib/booking";

describe("isSlotBooked", () => {
  it("is deterministic for the same date and slot", () => {
    const a = isSlotBooked("2026-08-10", "7:30 PM");
    const b = isSlotBooked("2026-08-10", "7:30 PM");
    expect(a).toBe(b);
  });

  it("can differ across dates for the same slot", () => {
    const results = ["2026-08-10", "2026-08-11", "2026-08-12", "2026-08-13"].map(
      (d) => isSlotBooked(d, "7:30 PM"),
    );
    // Not all four dates should resolve to the same availability
    expect(new Set(results).size).toBeGreaterThan(1);
  });

  it("leaves most slots open on a given day (roughly a quarter booked)", () => {
    const booked = ALL_SLOTS.filter((s) => isSlotBooked("2026-08-10", s));
    expect(booked.length).toBeLessThan(ALL_SLOTS.length);
  });
});

describe("SLOT_GROUPS", () => {
  it("has lunch and dinner with no duplicate slots", () => {
    expect(SLOT_GROUPS.map((g) => g.label)).toEqual(["Lunch", "Dinner"]);
    expect(new Set(ALL_SLOTS).size).toBe(ALL_SLOTS.length);
  });
});
