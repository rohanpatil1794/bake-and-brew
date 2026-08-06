import { beforeEach, describe, expect, it } from "vitest";
import { useCart, type CartItem } from "@/lib/store/cart";

const cake: Omit<CartItem, "quantity"> = {
  id: "midnight-truffle-8",
  name: "Midnight Truffle (8\")",
  price: 1499,
  kind: "cake",
};

const total = () =>
  useCart.getState().items.reduce((sum, i) => sum + i.price * i.quantity, 0);

describe("cart store", () => {
  beforeEach(() => useCart.getState().clear());

  it("adds a new item with default quantity 1", () => {
    useCart.getState().addItem(cake);
    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].quantity).toBe(1);
  });

  it("merges quantity when the same id is added again", () => {
    useCart.getState().addItem(cake);
    useCart.getState().addItem(cake, 2);
    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].quantity).toBe(3);
    expect(total()).toBe(1499 * 3);
  });

  it("keeps distinct items separate", () => {
    useCart.getState().addItem(cake);
    useCart.getState().addItem({ ...cake, id: "flat-white", price: 189 });
    expect(useCart.getState().items).toHaveLength(2);
    expect(total()).toBe(1499 + 189);
  });

  it("setQuantity updates the quantity", () => {
    useCart.getState().addItem(cake);
    useCart.getState().setQuantity(cake.id, 4);
    expect(useCart.getState().items[0].quantity).toBe(4);
  });

  it("setQuantity to 0 or below removes the item", () => {
    useCart.getState().addItem(cake);
    useCart.getState().setQuantity(cake.id, 0);
    expect(useCart.getState().items).toHaveLength(0);
  });

  it("removeItem drops the matching item", () => {
    useCart.getState().addItem(cake);
    useCart.getState().addItem({ ...cake, id: "other" });
    useCart.getState().removeItem(cake.id);
    expect(useCart.getState().items.map((i) => i.id)).toEqual(["other"]);
  });

  it("clear empties the cart", () => {
    useCart.getState().addItem(cake);
    useCart.getState().clear();
    expect(useCart.getState().items).toHaveLength(0);
  });
});
