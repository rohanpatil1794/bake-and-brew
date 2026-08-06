export const SLOT_GROUPS = [
  {
    label: "Lunch",
    slots: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM"],
  },
  {
    label: "Dinner",
    slots: [
      "6:00 PM",
      "6:30 PM",
      "7:00 PM",
      "7:30 PM",
      "8:00 PM",
      "8:30 PM",
      "9:00 PM",
    ],
  },
] as const;

export const ALL_SLOTS = SLOT_GROUPS.flatMap((group) => group.slots);

/**
 * Deterministic mock availability so the UI shows a stable, believable mix of
 * open and sold-out slots per date. Replaced by the reservations API later.
 */
export function isSlotBooked(dateKey: string, slot: string): boolean {
  let hash = 0;
  for (const ch of `${dateKey}|${slot}`) {
    hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  }
  return Math.abs(hash) % 4 === 0;
}
