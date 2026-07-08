import { create } from "zustand";

export const STUDIO_SIZES = [
  { label: '6"', serves: "serves 6–8", price: 799, scale: 0.82 },
  { label: '8"', serves: "serves 12–16", price: 1299, scale: 0.92 },
  { label: '10"', serves: "serves 20–24", price: 1899, scale: 1 },
] as const;

export const STUDIO_FLAVORS = [
  { name: "Vanilla", sponge: "#f5e8c8" },
  { name: "Chocolate", sponge: "#4a2c17" },
  { name: "Red Velvet", sponge: "#a33a3a" },
  { name: "Butterscotch", sponge: "#d9995f" },
] as const;

export const STUDIO_TOPPERS = [
  "None",
  "Fresh berries",
  "Chocolate curls",
  "Piped flowers",
  "Candles",
] as const;

export type StudioShape = "round" | "square";
export type StudioFrosting = "buttercream" | "ganache";
export type StudioFlavor = (typeof STUDIO_FLAVORS)[number]["name"];
export type StudioTopper = (typeof STUDIO_TOPPERS)[number];

export const EXTRA_TIER_PRICE = 350;
export const GANACHE_PRICE = 150;
export const TOPPER_PRICE = 100;
export const MAX_TIERS = 3;

type StudioState = {
  sizeIndex: number;
  shape: StudioShape;
  /** Flavor per tier, bottom tier first. Length = tier count. */
  tiers: StudioFlavor[];
  frosting: StudioFrosting;
  topper: StudioTopper;
  message: string;

  setSizeIndex: (i: number) => void;
  setShape: (shape: StudioShape) => void;
  addTier: () => void;
  removeTier: (index: number) => void;
  setTierFlavor: (index: number, flavor: StudioFlavor) => void;
  setFrosting: (frosting: StudioFrosting) => void;
  setTopper: (topper: StudioTopper) => void;
  setMessage: (message: string) => void;
  reset: () => void;
};

const initial = {
  sizeIndex: 1,
  shape: "round" as StudioShape,
  tiers: ["Vanilla" as StudioFlavor],
  frosting: "buttercream" as StudioFrosting,
  topper: "None" as StudioTopper,
  message: "",
};

export const useCakeStudio = create<StudioState>()((set) => ({
  ...initial,
  setSizeIndex: (sizeIndex) => set({ sizeIndex }),
  setShape: (shape) => set({ shape }),
  addTier: () =>
    set((s) =>
      s.tiers.length >= MAX_TIERS
        ? s
        : { tiers: [...s.tiers, "Chocolate" as StudioFlavor] },
    ),
  removeTier: (index) =>
    set((s) =>
      s.tiers.length <= 1 ? s : { tiers: s.tiers.filter((_, i) => i !== index) },
    ),
  setTierFlavor: (index, flavor) =>
    set((s) => ({ tiers: s.tiers.map((f, i) => (i === index ? flavor : f)) })),
  setFrosting: (frosting) => set({ frosting }),
  setTopper: (topper) => set({ topper }),
  setMessage: (message) => set({ message: message.slice(0, 24) }),
  reset: () => set(initial),
}));

export function studioPrice(s: {
  sizeIndex: number;
  tiers: StudioFlavor[];
  frosting: StudioFrosting;
  topper: StudioTopper;
}): number {
  return (
    STUDIO_SIZES[s.sizeIndex].price +
    (s.tiers.length - 1) * EXTRA_TIER_PRICE +
    (s.frosting === "ganache" ? GANACHE_PRICE : 0) +
    (s.topper !== "None" ? TOPPER_PRICE : 0)
  );
}

export function studioSummary(s: {
  sizeIndex: number;
  shape: StudioShape;
  tiers: StudioFlavor[];
  frosting: StudioFrosting;
  topper: StudioTopper;
}): string {
  const parts = [
    `${STUDIO_SIZES[s.sizeIndex].label} ${s.shape}`,
    `${s.tiers.length} ${s.tiers.length === 1 ? "layer" : "layers"}`,
    s.tiers.join(" · "),
    s.frosting,
  ];
  if (s.topper !== "None") parts.push(s.topper.toLowerCase());
  return parts.join(" · ");
}
