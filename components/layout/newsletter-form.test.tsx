import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsletterForm } from "@/components/layout/newsletter-form";

describe("NewsletterForm", () => {
  it("shows a validation error for an invalid email", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/valid email/i);
  });

  it("confirms subscription for a valid email", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByLabelText(/email/i), "hello@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(await screen.findByText(/on the list/i)).toBeInTheDocument();
  });
});
