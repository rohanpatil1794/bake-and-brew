import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";
import { site } from "@/lib/site";

describe("About page", () => {
  it("renders the story heading", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /corner of/i }),
    ).toBeInTheDocument();
  });

  it("lists the three values", () => {
    render(<AboutPage />);
    expect(screen.getByText(/Baked from scratch/i)).toBeInTheDocument();
    expect(screen.getByText(/Sourced with care/i)).toBeInTheDocument();
    expect(screen.getByText(/Made to be shared/i)).toBeInTheDocument();
  });

  it("shows the address and opening hours from site config", () => {
    render(<AboutPage />);
    expect(screen.getByText(site.address)).toBeInTheDocument();
    for (const { time } of site.hours) {
      expect(screen.getByText(time)).toBeInTheDocument();
    }
  });
});
