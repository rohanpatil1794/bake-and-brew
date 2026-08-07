import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CakeArt } from "@/components/cakes/cake-art";
import type { CakeArtConfig } from "@/lib/data/cakes";

const art: CakeArtConfig = {
  sponge: "#4a2c17",
  frosting: "#3d2314",
  drip: "#2a170c",
  accent: "#c67b5c",
  tiers: 3,
  topping: "cherries",
};

describe("CakeArt", () => {
  it("renders an accessible labelled image", () => {
    render(<CakeArt art={art} title="Midnight Truffle" />);
    expect(
      screen.getByRole("img", { name: /Midnight Truffle/i }),
    ).toBeInTheDocument();
  });

  it("passes through a className", () => {
    const { container } = render(
      <CakeArt art={art} title="Test" className="h-auto w-full" />,
    );
    expect(container.querySelector("svg")).toHaveClass("h-auto", "w-full");
  });
});
