import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  kind: "cake" | "food" | "custom-cake" | "photo-cake";
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "bake-and-brew-cart" },
  ),
);

export const useCartCount = () =>
  useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

export const useCartTotal = () =>
  useCart((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));

/** Drawer visibility — session-only UI state, deliberately not persisted. */
type CartDrawerState = {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

export const useCartDrawer = create<CartDrawerState>()((set) => ({
  open: false,
  openDrawer: () => set({ open: true }),
  closeDrawer: () => set({ open: false }),
}));

export const DELIVERY_FEE = 49;
export const FREE_DELIVERY_ABOVE = 999;
