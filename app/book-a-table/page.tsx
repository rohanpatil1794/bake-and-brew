import type { Metadata } from "next";
import { CalendarCheck } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Book a Table" };

export default function BookATablePage() {
  return (
    <ComingSoon
      icon={CalendarCheck}
      title="Book a Table"
      description="Pick a date, time, and party size — we'll keep a warm corner table ready for you."
    />
  );
}
