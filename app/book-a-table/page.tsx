import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/booking-flow";

export const metadata: Metadata = {
  title: "Book a Table",
  description:
    "Reserve a table at Bake and Brew — pick a date, time, and party size, and we'll keep a warm corner ready.",
};

export default function BookATablePage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-28 sm:px-6 sm:pt-40 pb-24">
      <h1 className="text-center text-5xl font-semibold text-espresso">
        Book a <span className="text-primary">Table</span>
      </h1>
      <p className="mx-auto mt-4 mb-14 max-w-xl text-center text-muted">
        Four quick steps and the corner table is yours. Larger group or a
        special plan? Call us and we&apos;ll sort it out.
      </p>
      <BookingFlow />
    </section>
  );
}
