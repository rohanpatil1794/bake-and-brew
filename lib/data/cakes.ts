export type CakeCategory =
  | "birthday"
  | "wedding"
  | "chocolate"
  | "fruity"
  | "cheesecake"
  | "vegan";

export type CakeSize = { label: string; serves: string; price: number };

/** Palette + decor config consumed by the CakeArt SVG illustration. */
export type CakeArtConfig = {
  sponge: string;
  frosting: string;
  drip: string;
  accent: string;
  tiers: 1 | 2 | 3;
  topping: "cherries" | "strawberries" | "chocolate" | "flowers" | "candles";
};

export type Cake = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  categories: CakeCategory[];
  sizes: CakeSize[];
  allergens: string[];
  art: CakeArtConfig;
};

export const cakeCategories: { value: CakeCategory | "all"; label: string }[] = [
  { value: "all", label: "All Cakes" },
  { value: "birthday", label: "Birthday" },
  { value: "wedding", label: "Wedding" },
  { value: "chocolate", label: "Chocolate" },
  { value: "fruity", label: "Fruity" },
  { value: "cheesecake", label: "Cheesecake" },
  { value: "vegan", label: "Vegan" },
];

const sizes = (small: number, medium: number, large: number): CakeSize[] => [
  { label: '6" round', serves: "serves 6–8", price: small },
  { label: '8" round', serves: "serves 12–16", price: medium },
  { label: '10" round', serves: "serves 20–24", price: large },
];

const cakes: Cake[] = [
  {
    slug: "midnight-truffle",
    name: "Midnight Truffle",
    tagline: "Dark chocolate, darker intentions",
    description:
      "Three layers of moist dark-chocolate sponge with a silky 70% truffle ganache, finished with a glossy drip and hand-rolled truffles.",
    categories: ["chocolate", "birthday"],
    sizes: sizes(899, 1499, 2199),
    allergens: ["gluten", "dairy", "eggs", "soy"],
    art: {
      sponge: "#4a2c17",
      frosting: "#3d2314",
      drip: "#2a170c",
      accent: "#c67b5c",
      tiers: 2,
      topping: "chocolate",
    },
  },
  {
    slug: "strawberry-cloud",
    name: "Strawberry Cloud",
    tagline: "Summer on a cake stand",
    description:
      "Airy vanilla chiffon layered with fresh strawberry compote and whipped mascarpone cream, crowned with macerated berries.",
    categories: ["fruity", "birthday"],
    sizes: sizes(849, 1399, 2099),
    allergens: ["gluten", "dairy", "eggs"],
    art: {
      sponge: "#fdf6ec",
      frosting: "#f3c5c9",
      drip: "#e8a0a6",
      accent: "#b3402a",
      tiers: 2,
      topping: "strawberries",
    },
  },
  {
    slug: "ivory-promise",
    name: "Ivory Promise",
    tagline: "Our signature wedding tier",
    description:
      "Elegant three-tier almond sponge with white-chocolate Swiss meringue buttercream and delicate piped florals. Made to order for your day.",
    categories: ["wedding"],
    sizes: [
      { label: "2 tiers", serves: "serves 30–40", price: 4999 },
      { label: "3 tiers", serves: "serves 60–75", price: 7999 },
      { label: "4 tiers", serves: "serves 100+", price: 11999 },
    ],
    allergens: ["gluten", "dairy", "eggs", "nuts"],
    art: {
      sponge: "#fffbf5",
      frosting: "#fdf6ec",
      drip: "#f0e2ce",
      accent: "#c67b5c",
      tiers: 3,
      topping: "flowers",
    },
  },
  {
    slug: "burnt-basque-cheesecake",
    name: "Burnt Basque Cheesecake",
    tagline: "Caramelised outside, molten inside",
    description:
      "San Sebastián-style cheesecake baked hot and fast for that signature burnt top and an impossibly creamy centre.",
    categories: ["cheesecake"],
    sizes: sizes(999, 1599, 2399),
    allergens: ["dairy", "eggs"],
    art: {
      sponge: "#e8c088",
      frosting: "#b45309",
      drip: "#92400e",
      accent: "#fdf6ec",
      tiers: 1,
      topping: "cherries",
    },
  },
  {
    slug: "salted-caramel-crunch",
    name: "Salted Caramel Crunch",
    tagline: "Sweet, salty, gone in minutes",
    description:
      "Brown-butter sponge with salted caramel buttercream, a molten caramel core, and a praline crunch shell.",
    categories: ["birthday", "chocolate"],
    sizes: sizes(899, 1449, 2149),
    allergens: ["gluten", "dairy", "eggs", "nuts"],
    art: {
      sponge: "#c67b5c",
      frosting: "#d9995f",
      drip: "#92400e",
      accent: "#fdf6ec",
      tiers: 2,
      topping: "candles",
    },
  },
  {
    slug: "red-velvet-royale",
    name: "Red Velvet Royale",
    tagline: "The classic, done properly",
    description:
      "Crimson cocoa sponge with tangy cream-cheese frosting, layered high and finished with velvet crumbs.",
    categories: ["birthday"],
    sizes: sizes(879, 1429, 2129),
    allergens: ["gluten", "dairy", "eggs"],
    art: {
      sponge: "#a33a3a",
      frosting: "#fffbf5",
      drip: "#f0e2ce",
      accent: "#a33a3a",
      tiers: 2,
      topping: "cherries",
    },
  },
  {
    slug: "mango-monsoon",
    name: "Mango Monsoon",
    tagline: "Alphonso season, preserved",
    description:
      "Saffron-kissed sponge soaked in Alphonso purée with mango mousse layers — our monsoon-season bestseller.",
    categories: ["fruity"],
    sizes: sizes(929, 1529, 2299),
    allergens: ["gluten", "dairy", "eggs"],
    art: {
      sponge: "#f5c66d",
      frosting: "#f0a840",
      drip: "#e08e2b",
      accent: "#b3402a",
      tiers: 2,
      topping: "flowers",
    },
  },
  {
    slug: "garden-oat-celebration",
    name: "Garden Oat Celebration",
    tagline: "Fully plant-based, fully festive",
    description:
      "Oat-and-almond sponge with coconut whip and seasonal fruit — no dairy, no eggs, no compromises.",
    categories: ["vegan", "fruity", "birthday"],
    sizes: sizes(949, 1549, 2349),
    allergens: ["gluten", "nuts"],
    art: {
      sponge: "#d9c9a3",
      frosting: "#eae0c8",
      drip: "#c8b183",
      accent: "#4d7c4a",
      tiers: 2,
      topping: "strawberries",
    },
  },
];

/**
 * Mock data layer — same async surface the future backend API will expose,
 * so swapping in real fetches is a one-file change.
 */
export async function getCakes(): Promise<Cake[]> {
  return cakes;
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}
