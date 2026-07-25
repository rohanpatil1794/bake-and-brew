export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-28 pb-24 sm:px-6 sm:pt-40">
      <div className="mx-auto h-12 w-48 animate-pulse rounded-2xl bg-sand" />
      <div className="mx-auto mt-4 mb-10 h-5 w-80 max-w-full animate-pulse rounded-full bg-sand/70" />

      <div className="mx-auto mb-10 flex max-w-fit gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-sand" />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-start justify-between gap-4 rounded-2xl border border-border-warm bg-surface p-5 shadow-warm"
          >
            <div className="flex-1 space-y-3">
              <div className="h-5 w-1/2 animate-pulse rounded-full bg-sand" />
              <div className="h-4 w-full animate-pulse rounded-full bg-sand/60" />
              <div className="h-6 w-16 animate-pulse rounded-full bg-sand" />
            </div>
            <div className="h-10 w-20 animate-pulse rounded-full bg-sand" />
          </div>
        ))}
      </div>
    </section>
  );
}
