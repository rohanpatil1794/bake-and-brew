import { ImageResponse } from "next/og";

export const alt = "Bake and Brew — Artisan Bakery & Cafe";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fdf6ec 0%, #f0e2ce 100%)",
          color: "#3d2314",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Layered cake mark */}
        <div style={{ display: "flex", marginBottom: 40 }}>
          <svg width="150" height="150" viewBox="0 0 32 32">
            <ellipse cx="16" cy="25" rx="11" ry="1.8" fill="#c67b5c" opacity="0.4" />
            <rect x="6" y="17" width="20" height="7" rx="2" fill="#92400e" />
            <rect x="6" y="17" width="20" height="3" rx="1.5" fill="#b45309" />
            <rect x="9" y="11" width="14" height="7" rx="2" fill="#c67b5c" />
            <rect x="9" y="11" width="14" height="3" rx="1.5" fill="#fdf6ec" />
            <circle cx="16" cy="8" r="2.6" fill="#b3402a" />
          </svg>
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -1 }}>
          Bake and Brew
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 34,
            color: "#78350f",
          }}
        >
          Baked with love, brewed with care.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            gap: 16,
            fontSize: 22,
            color: "#92400e",
          }}
        >
          Cakes · Photo Cakes · Cafe Delivery · Table Booking · Cake Studio
        </div>
      </div>
    ),
    { ...size },
  );
}
