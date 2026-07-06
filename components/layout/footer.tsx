import Link from "next/link";
import { Clock, Croissant, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-espresso text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 font-serif text-2xl font-semibold">
            <Croissant className="h-6 w-6 text-caramel" aria-hidden />
            {site.name}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/70">
            {site.tagline}. Artisan cakes, honest coffee, and a warm corner
            table with your name on it.
          </p>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="h-5 w-5 text-caramel" aria-hidden /> Hours
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-cream/80">
            {site.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <MapPin className="h-5 w-5 text-caramel" aria-hidden /> Visit
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-cream/80">
            {site.address}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-cream/80">
            <Phone className="h-4 w-4 text-caramel" aria-hidden />
            {site.phone}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream/80 transition-colors duration-200 hover:text-caramel"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} {site.name}. Baked fresh daily.
      </div>
    </footer>
  );
}
