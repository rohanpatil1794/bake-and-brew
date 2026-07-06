export const site = {
  name: "Bake and Brew",
  tagline: "Baked with love, brewed with care",
  nav: [
    { label: "Cakes", href: "/cakes" },
    { label: "Menu", href: "/menu" },
    { label: "Cake Studio", href: "/cake-studio" },
    { label: "Photo Cakes", href: "/photo-cake" },
    { label: "Book a Table", href: "/book-a-table" },
  ],
  hours: [
    { days: "Mon – Fri", time: "7:00 AM – 9:00 PM" },
    { days: "Sat – Sun", time: "8:00 AM – 10:00 PM" },
  ],
  address: "42 Cinnamon Lane, Pune, MH 411001",
  phone: "+91 98765 43210",
} as const;
