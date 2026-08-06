import { describe, expect, it } from "vitest";
import { toDateKey } from "@/components/booking/calendar";

describe("toDateKey", () => {
  it("formats as YYYY-MM-DD", () => {
    expect(toDateKey(new Date(2026, 7, 6))).toBe("2026-08-06");
  });

  it("zero-pads single-digit months and days", () => {
    expect(toDateKey(new Date(2026, 0, 1))).toBe("2026-01-01");
    expect(toDateKey(new Date(2026, 11, 9))).toBe("2026-12-09");
  });

  it("uses local calendar fields, not UTC", () => {
    // Late-evening local time must not roll the date forward/back
    const key = toDateKey(new Date(2026, 5, 15, 23, 30));
    expect(key).toBe("2026-06-15");
  });
});
