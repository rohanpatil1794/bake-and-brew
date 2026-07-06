export type DietaryTag = "veg" | "vegan" | "nuts" | "spicy" | "bestseller";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: DietaryTag[];
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

const menu: MenuCategory[] = [
  {
    id: "breakfast",
    label: "Breakfast",
    items: [
      {
        id: "masala-omelette-toast",
        name: "Masala Omelette on Sourdough",
        description:
          "Three-egg omelette with green chilli, coriander, and onion on our house sourdough.",
        price: 249,
        tags: ["spicy", "bestseller"],
      },
      {
        id: "cinnamon-french-toast",
        name: "Cinnamon French Toast",
        description:
          "Brioche soaked in vanilla custard, griddled and dusted with cinnamon sugar, maple on the side.",
        price: 289,
        tags: ["veg"],
      },
      {
        id: "avocado-chilli-toast",
        name: "Avocado & Chilli Toast",
        description:
          "Smashed avocado, pickled onion, and chilli oil on toasted multigrain.",
        price: 319,
        tags: ["vegan", "spicy"],
      },
      {
        id: "granola-bowl",
        name: "House Granola Bowl",
        description:
          "Oat-and-almond granola with Greek yogurt, seasonal fruit, and wildflower honey.",
        price: 269,
        tags: ["veg", "nuts"],
      },
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches",
    items: [
      {
        id: "bombay-grill",
        name: "Bombay Grill Sandwich",
        description:
          "Spiced potato, beetroot, cucumber, and mint chutney, triple-decked and grilled with butter.",
        price: 279,
        tags: ["veg", "spicy", "bestseller"],
      },
      {
        id: "pesto-mozzarella-ciabatta",
        name: "Pesto Mozzarella Ciabatta",
        description:
          "Basil-cashew pesto, fresh mozzarella, and roasted tomato on toasted ciabatta.",
        price: 349,
        tags: ["veg", "nuts"],
      },
      {
        id: "smoked-chicken-club",
        name: "Smoked Chicken Club",
        description:
          "House-smoked chicken, fried egg, lettuce, and chipotle mayo on country loaf.",
        price: 389,
        tags: [],
      },
      {
        id: "falafel-pita-pocket",
        name: "Falafel Pita Pocket",
        description:
          "Crisp falafel, hummus, pickles, and tahini in a warm house-baked pita.",
        price: 329,
        tags: ["vegan"],
      },
    ],
  },
  {
    id: "pastries",
    label: "Pastries & Bakes",
    items: [
      {
        id: "butter-croissant",
        name: "Butter Croissant",
        description: "Laminated over three days. Shattering crust, honeycomb crumb.",
        price: 149,
        tags: ["veg", "bestseller"],
      },
      {
        id: "almond-croissant",
        name: "Almond Croissant",
        description:
          "Twice-baked with frangipane and toasted flaked almonds.",
        price: 199,
        tags: ["veg", "nuts"],
      },
      {
        id: "pain-au-chocolat",
        name: "Pain au Chocolat",
        description: "Dark couverture batons in our croissant dough.",
        price: 179,
        tags: ["veg"],
      },
      {
        id: "banana-walnut-loaf",
        name: "Banana Walnut Loaf",
        description: "Brown-butter banana loaf with toasted walnuts, by the slice.",
        price: 159,
        tags: ["veg", "nuts"],
      },
      {
        id: "gobi-danish",
        name: "Spiced Gobi Danish",
        description:
          "Our croissant dough wrapped around masala-roasted cauliflower. Trust us.",
        price: 189,
        tags: ["veg", "spicy"],
      },
    ],
  },
  {
    id: "coffee",
    label: "Coffee & Brews",
    items: [
      {
        id: "flat-white",
        name: "Flat White",
        description: "Double ristretto with velvet-textured milk. Chikmagalur single estate.",
        price: 189,
        tags: ["veg", "bestseller"],
      },
      {
        id: "filter-kaapi",
        name: "South Indian Filter Kaapi",
        description: "Brass-filter brewed, frothed the traditional way.",
        price: 129,
        tags: ["veg"],
      },
      {
        id: "iced-oat-latte",
        name: "Iced Oat Latte",
        description: "Cold espresso over oat milk with a whisper of jaggery syrup.",
        price: 229,
        tags: ["vegan"],
      },
      {
        id: "masala-chai",
        name: "House Masala Chai",
        description: "Slow-simmered with crushed ginger, cardamom, and black pepper.",
        price: 119,
        tags: ["veg", "spicy"],
      },
      {
        id: "hot-chocolate",
        name: "Single-Origin Hot Chocolate",
        description: "70% dark drinking chocolate with soft whipped cream.",
        price: 249,
        tags: ["veg"],
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      {
        id: "tiramisu-jar",
        name: "Tiramisu Jar",
        description: "Espresso-soaked savoiardi and mascarpone cream, layered in a jar.",
        price: 299,
        tags: ["veg", "bestseller"],
      },
      {
        id: "gulab-jamun-cheesecake",
        name: "Gulab Jamun Cheesecake",
        description: "Baked cheesecake with a gulab jamun heart and saffron glaze.",
        price: 329,
        tags: ["veg"],
      },
      {
        id: "chocolate-fudge-slice",
        name: "Midnight Fudge Slice",
        description: "A slice of our Midnight Truffle cake, plated with salted caramel.",
        price: 279,
        tags: ["veg"],
      },
      {
        id: "vegan-brownie",
        name: "Olive Oil Brownie",
        description: "Fudgy cocoa brownie made with olive oil — fully plant-based.",
        price: 229,
        tags: ["vegan"],
      },
    ],
  },
];

/** Mock data layer — mirrors the future API surface. */
export async function getMenu(): Promise<MenuCategory[]> {
  return menu;
}
