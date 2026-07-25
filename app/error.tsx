"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, TriangleAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces in the browser console and Vercel logs for debugging
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 pt-32 pb-24 text-center sm:px-6 sm:pt-48">
      <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-sand text-error">
        <TriangleAlert className="h-8 w-8" aria-hidden />
      </span>
      <h1 className="mt-6 text-4xl font-semibold text-espresso">
        Something didn&apos;t rise
      </h1>
      <p className="mt-4 leading-relaxed text-muted">
        A little went wrong in the kitchen. Try again, or head back home while we
        clean up.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover"
        >
          <RotateCcw className="h-5 w-5" aria-hidden />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-cream"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
          Back home
        </Link>
      </div>
    </section>
  );
}
