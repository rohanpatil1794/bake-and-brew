import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MenuItemRow } from "@/components/menu/menu-item-row";
import { useCart } from "@/lib/store/cart";
import type { MenuItem } from "@/lib/data/menu";

const item: MenuItem = {
  id: "flat-white",
  name: "Flat White",
  description: "Double ristretto with velvet milk.",
  price: 189,
  tags: ["veg", "bestseller"],
};

describe("MenuItemRow", () => {
  beforeEach(() => useCart.getState().clear());

  it("shows the name and formatted price", () => {
    render(<MenuItemRow item={item} />);
    expect(screen.getByText("Flat White")).toBeInTheDocument();
    expect(screen.getByText("₹189")).toBeInTheDocument();
  });

  it("adds the item to the cart when Add is clicked", async () => {
    const user = userEvent.setup();
    render(<MenuItemRow item={item} />);

    await user.click(screen.getByRole("button", { name: /add flat white/i }));

    const cart = useCart.getState().items;
    expect(cart).toHaveLength(1);
    expect(cart[0]).toMatchObject({ id: "flat-white", quantity: 1, kind: "food" });
  });

  it("replaces Add with a quantity stepper after adding", async () => {
    const user = userEvent.setup();
    render(<MenuItemRow item={item} />);

    await user.click(screen.getByRole("button", { name: /add flat white/i }));

    expect(
      await screen.findByRole("button", { name: /increase flat white/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /decrease flat white/i }),
    ).toBeInTheDocument();
  });

  it("increments quantity from the stepper", async () => {
    const user = userEvent.setup();
    render(<MenuItemRow item={item} />);

    await user.click(screen.getByRole("button", { name: /add flat white/i }));
    await user.click(
      await screen.findByRole("button", { name: /increase flat white/i }),
    );

    expect(useCart.getState().items[0].quantity).toBe(2);
  });
});
