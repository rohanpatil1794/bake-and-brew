import { site } from "@/lib/site";

const siteUrl = "https://bake-and-brew-jade.vercel.app";

/** Schema.org Bakery/LocalBusiness JSON-LD for rich search results. */
export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: site.name,
    description:
      "Artisan cakes, custom photo-print cakes, cafe food delivery, table booking, and an interactive cake studio.",
    url: siteUrl,
    telephone: site.phone,
    image: `${siteUrl}/opengraph-image`,
    priceRange: "₹₹",
    servesCuisine: ["Bakery", "Cafe", "Desserts"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "42 Cinnamon Lane",
      addressLocality: "Pune",
      addressRegion: "MH",
      postalCode: "411001",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:00",
        closes: "22:00",
      },
    ],
    sameAs: site.socials.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      // Server-rendered constant; no user input flows into this string
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
