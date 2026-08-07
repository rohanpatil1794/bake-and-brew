import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { useCart, useCartDrawer } from "@/lib/store/cart";

describe("CartDrawer", () => {
  beforeEach(() => {
    useCart.getState().clear();
    useCartDrawer.setState({ open: true });
  });

  it("shows an empty state with a menu link when the cart is empty", () => {
    render(<CartDrawer />);
    expect(screen.getByText(/nothing in here yet/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /browse the menu/i }),
    ).toHaveAttribute("href", "/menu");
  });

  it("lists items and shows a total with the delivery fee", () => {
    useCart.getState().addItem({
      id: "flat-white",
      name: "Flat White",
      price: 189,
      kind: "food",
    });
    render(<CartDrawer />);

    expect(screen.getByText("Flat White")).toBeInTheDocument();
    // 189 subtotal is below the free-delivery threshold, so ₹49 is added
    expect(screen.getByText("₹238")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /checkout/i }),
    ).toHaveAttribute("href", "/checkout");
  });

  it("waives delivery once the cart clears the free-delivery threshold", () => {
    useCart.getState().addItem({
      id: "ivory-promise",
      name: "Ivory Promise",
      price: 4999,
      kind: "cake",
    });
    render(<CartDrawer />);
    expect(screen.getByText("Free")).toBeInTheDocument();
  });
});
