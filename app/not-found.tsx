import Link from "next/link";
import { ArrowLeft, Croissant } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-6 pt-48 pb-24 text-center">
      <p className="font-serif text-8xl font-semibold text-primary">404</p>
      <span className="mt-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-sand text-primary">
        <Croissant className="h-8 w-8" aria-hidden />
      </span>
      <h1 className="mt-6 text-4xl font-semibold text-espresso">
        This one&apos;s out of the oven
      </h1>
      <p className="mt-4 leading-relaxed text-muted">
        We couldn&apos;t find the page you were looking for — it may have been
        moved, or perhaps someone already ate it.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
          Back home
        </Link>
        <Link
          href="/cakes"
          className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-cream"
        >
          Browse cakes
        </Link>
      </div>
    </section>
  );
}
