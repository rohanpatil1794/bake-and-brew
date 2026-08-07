import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Faq } from "@/components/home/faq";
import { faqs } from "@/lib/data/faq";

describe("Faq", () => {
  it("renders every question", () => {
    render(<Faq />);
    for (const faq of faqs) {
      expect(
        screen.getByRole("button", { name: faq.q }),
      ).toBeInTheDocument();
    }
  });

  it("opens the first question by default", () => {
    render(<Faq />);
    expect(screen.getByRole("button", { name: faqs[0].q })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("expands a question when clicked", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    const second = screen.getByRole("button", { name: faqs[1].q });
    expect(second).toHaveAttribute("aria-expanded", "false");

    await user.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(await screen.findByText(faqs[1].a)).toBeInTheDocument();
  });
});
