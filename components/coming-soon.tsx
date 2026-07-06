import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";

/** Placeholder page body used while a feature milestone is under construction. */
export function ComingSoon({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-6 pt-48 pb-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-sand text-primary">
        <Icon className="h-8 w-8" aria-hidden />
      </span>
      <h1 className="mt-6 text-4xl font-semibold text-espresso">{title}</h1>
      <p className="mt-4 leading-relaxed text-muted">{description}</p>
      <p className="mt-2 text-sm font-medium text-secondary">
        Fresh out of the oven soon — this page is being built right now.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-cream"
      >
        <ArrowLeft className="h-5 w-5" aria-hidden />
        Back home
      </Link>
    </section>
  );
}
