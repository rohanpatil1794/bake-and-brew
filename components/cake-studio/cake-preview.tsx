"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  STUDIO_FLAVORS,
  STUDIO_SIZES,
  type StudioFlavor,
  type StudioFrosting,
  type StudioShape,
  type StudioTopper,
} from "@/lib/store/cake-studio";

const CENTER = 160;
const BASE_Y = 252;
const TIER_H = 52;
const TIER_WIDTHS = [200, 152, 110];

const FROSTING: Record<
  StudioFrosting,
  { top: string; drip: string; shine: string; depth: number }
> = {
  buttercream: {
    top: "#fffbf5",
    drip: "#f0e2ce",
    shine: "rgba(255,251,245,0.55)",
    depth: 9,
  },
  ganache: {
    top: "#4a2c17",
    drip: "#2a170c",
    shine: "rgba(214,123,92,0.5)",
    depth: 18,
  },
};

function spongeColor(flavor: StudioFlavor): string {
  return STUDIO_FLAVORS.find((f) => f.name === flavor)?.sponge ?? "#f5e8c8";
}

function isDark(hex: string): boolean {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
}

/** Frosting coat with a drippy lower edge for one tier. */
function dripPath(
  x: number,
  topY: number,
  w: number,
  frosting: StudioFrosting,
): string {
  const bandBase = topY + 7;
  const depth = FROSTING[frosting].depth;
  const scallops = Math.max(5, Math.round(w / 26));
  const step = w / scallops;
  let d = `M ${x} ${topY} L ${x} ${bandBase}`;
  for (let i = 0; i < scallops; i++) {
    const midX = x + step * (i + 0.5);
    const endX = x + step * (i + 1);
    const drop =
      frosting === "ganache" ? (i % 2 === 0 ? depth : depth * 0.55) : depth;
    d += ` Q ${midX} ${bandBase + drop} ${endX} ${bandBase}`;
  }
  d += ` L ${x + w} ${topY} Z`;
  return d;
}

export function CakePreview({
  sizeIndex,
  shape,
  tiers,
  frosting,
  topper,
  message,
}: {
  sizeIndex: number;
  shape: StudioShape;
  tiers: StudioFlavor[];
  frosting: StudioFrosting;
  topper: StudioTopper;
  message: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const scale = STUDIO_SIZES[sizeIndex].scale;
  const topRy = shape === "round" ? 13 : 7;
  const corner = shape === "round" ? 12 : 3;
  const coat = FROSTING[frosting];

  const topTierTopY = BASE_Y - tiers.length * TIER_H;
  const bottomBodyMidY = BASE_Y - TIER_H / 2 + 6;
  const messageOnDark = isDark(spongeColor(tiers[0]));

  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      aria-label={`Preview of a ${STUDIO_SIZES[sizeIndex].label} ${shape} cake with ${tiers.length} ${tiers.length === 1 ? "layer" : "layers"}, ${frosting} frosting`}
      className="h-auto w-full max-w-md drop-shadow-[0_14px_44px_rgba(120,53,15,0.18)]"
    >
      {/* Studio backdrop + board */}
      <defs>
        <radialGradient id="studio-bg" cx="50%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#fffbf5" />
          <stop offset="100%" stopColor="#f0e2ce" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="320" rx="24" fill="url(#studio-bg)" />
      <ellipse cx={CENTER} cy={BASE_Y + 18} rx="132" ry="15" fill="#e7d5bf" opacity="0.7" />
      <ellipse cx={CENTER} cy={BASE_Y + 12} rx="132" ry="15" fill="#fffbf5" />

      <motion.g
        animate={{ scale }}
        initial={false}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        style={{ transformOrigin: `${CENTER}px ${BASE_Y}px`, transformBox: "fill-box" }}
      >
        <AnimatePresence>
          {tiers.map((flavor, i) => {
            const w = TIER_WIDTHS[i];
            const x = CENTER - w / 2;
            const topY = BASE_Y - (i + 1) * TIER_H;

            return (
              <motion.g
                key={i}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -44, scaleY: 0.55 }
                }
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -24, scaleY: 0.6 }
                }
                transition={{ type: "spring", stiffness: 380, damping: 20 }}
                style={{ transformOrigin: `${CENTER}px ${topY}px`, transformBox: "fill-box" }}
              >
                {/* Sponge body */}
                <motion.rect
                  x={x}
                  y={topY}
                  width={w}
                  height={TIER_H}
                  rx={corner}
                  animate={{ fill: spongeColor(flavor) }}
                  transition={{ duration: 0.35 }}
                />
                {/* sheen */}
                <rect
                  x={x + 10}
                  y={topY + 14}
                  width="7"
                  height={TIER_H - 22}
                  rx="3.5"
                  fill="#ffffff"
                  opacity="0.14"
                />
                {/* Frosting drip — replays its pour when frosting changes */}
                <AnimatePresence mode="wait">
                  <motion.path
                    key={frosting}
                    d={dripPath(x, topY, w, frosting)}
                    fill={coat.drip}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -7 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  />
                </AnimatePresence>
                {/* Top surface */}
                <motion.ellipse
                  cx={CENTER}
                  cy={topY}
                  rx={w / 2}
                  ry={topRy}
                  animate={{ fill: coat.top }}
                  transition={{ duration: 0.35 }}
                />
                <ellipse
                  cx={CENTER - w * 0.16}
                  cy={topY - topRy * 0.3}
                  rx={w * 0.22}
                  ry={topRy * 0.4}
                  fill={coat.shine}
                />
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* Message piped on the bottom tier */}
        {message && (
          <text
            x={CENTER}
            y={bottomBodyMidY}
            textAnchor="middle"
            style={{ fontFamily: "var(--font-script)", fontSize: "19px" }}
            fill={messageOnDark ? "#fffbf5" : "#3d2314"}
          >
            {message}
          </text>
        )}

        {/* Topper on the top tier */}
        <Topper topper={topper} y={topTierTopY} reduced={!!prefersReducedMotion} />
      </motion.g>
    </svg>
  );
}

function Topper({
  topper,
  y,
  reduced,
}: {
  topper: StudioTopper;
  y: number;
  reduced: boolean;
}) {
  const enter = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: -18, scale: 0.5 },
        animate: { opacity: 1, y: 0, scale: 1 },
      };

  return (
    <AnimatePresence mode="wait">
      <motion.g
        key={topper}
        initial={enter.initial}
        animate={enter.animate}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 18 }}
        style={{ transformOrigin: `${CENTER}px ${y}px`, transformBox: "fill-box" }}
      >
        {topper === "Fresh berries" &&
          [-20, 0, 20].map((dx, i) => (
            <g key={dx}>
              <circle cx={CENTER + dx} cy={y - 9 - (i === 1 ? 3 : 0)} r="8" fill="#b3402a" />
              <circle cx={CENTER + dx - 2} cy={y - 12 - (i === 1 ? 3 : 0)} r="2.4" fill="#e8a0a6" />
            </g>
          ))}

        {topper === "Chocolate curls" &&
          [-18, 2, 18].map((dx, i) => (
            <path
              key={dx}
              d={`M ${CENTER + dx} ${y - 4} q -9 -12 2 -20 q 8 -5 5 4 q -3 8 -7 16`}
              fill="none"
              stroke={i === 1 ? "#4a2c17" : "#6b4423"}
              strokeWidth="5"
              strokeLinecap="round"
            />
          ))}

        {topper === "Piped flowers" &&
          [-20, 0, 20].map((dx, i) => (
            <g key={dx}>
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse
                  key={a}
                  cx={CENTER + dx}
                  cy={y - 9 - (i === 1 ? 3 : 0)}
                  rx="4"
                  ry="7.5"
                  transform={`rotate(${a} ${CENTER + dx} ${y - 9 - (i === 1 ? 3 : 0)})`}
                  fill="#e8b4b8"
                />
              ))}
              <circle cx={CENTER + dx} cy={y - 9 - (i === 1 ? 3 : 0)} r="3.5" fill="#f0a840" />
            </g>
          ))}

        {topper === "Candles" &&
          [-18, 0, 18].map((dx) => (
            <g key={dx}>
              <rect x={CENTER + dx - 2.5} y={y - 26} width="5" height="24" rx="2.5" fill="#c67b5c" />
              <ellipse cx={CENTER + dx} cy={y - 30} rx="3.5" ry="5.5" fill="#f0a840" />
              <ellipse cx={CENTER + dx} cy={y - 29} rx="1.6" ry="3" fill="#fffbf5" />
            </g>
          ))}
      </motion.g>
    </AnimatePresence>
  );
}
