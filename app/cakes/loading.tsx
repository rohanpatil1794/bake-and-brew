export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-28 pb-24 sm:px-6 sm:pt-40">
      <div className="mx-auto h-12 w-64 animate-pulse rounded-2xl bg-sand" />
      <div className="mx-auto mt-4 mb-12 h-5 w-80 max-w-full animate-pulse rounded-full bg-sand/70" />

      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-sand" />
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-border-warm bg-surface shadow-warm"
          >
            <div className="aspect-[4/3] animate-pulse bg-sand/70" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-3/4 animate-pulse rounded-full bg-sand" />
              <div className="h-4 w-full animate-pulse rounded-full bg-sand/60" />
              <div className="h-9 w-full animate-pulse rounded-full bg-sand/60" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
