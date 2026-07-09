import type { Metadata } from "next";
import { Dancing_Script, Lora, Raleway } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CartDrawer } from "@/components/cart/cart-drawer";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["600"],
});

const siteUrl = "https://bake-and-brew-jade.vercel.app";
const description =
  "Artisan cakes, custom photo-print cakes, fresh cafe food delivered, and a cozy table waiting for you. Baked with love, brewed with care.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bake and Brew — Artisan Bakery & Cafe",
    template: "%s · Bake and Brew",
  },
  description,
  keywords: [
    "bakery",
    "cafe",
    "custom cakes",
    "photo print cake",
    "cake delivery",
    "table booking",
    "Pune",
  ],
  openGraph: {
    type: "website",
    siteName: "Bake and Brew",
    title: "Bake and Brew — Artisan Bakery & Cafe",
    description,
    url: siteUrl,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bake and Brew — Artisan Bakery & Cafe",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${raleway.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
