import type { CakeArtConfig } from "@/lib/data/cakes";

/**
 * Parameterized SVG cake illustration — palette, tier count, and topping come
 * from the catalog so every cake renders a distinct, on-brand visual without
 * photography assets.
 */
export function CakeArt({
  art,
  title,
  className,
}: {
  art: CakeArtConfig;
  title: string;
  className?: string;
}) {
  const tierSpecs = [
    { width: 176, height: 62 }, // bottom
    { width: 132, height: 54 }, // middle
    { width: 92, height: 46 }, // top
  ].slice(0, art.tiers);

  const stackHeight = tierSpecs.reduce((sum, t) => sum + t.height, 0);
  const baseY = 208;
  const topY = baseY - stackHeight;

  let y = baseY;
  const tiers = tierSpecs.map((tier) => {
    y -= tier.height;
    return { ...tier, x: 120 - tier.width / 2, y };
  });

  return (
    <svg
      viewBox="0 0 240 240"
      role="img"
      aria-label={`Illustration of ${title}`}
      className={className}
    >
      {/* Cake stand */}
      <ellipse cx="120" cy="222" rx="78" ry="7" fill={art.accent} opacity="0.25" />
      <ellipse cx="120" cy="212" rx="96" ry="10" fill="#e7d5bf" />
      <ellipse cx="120" cy="208" rx="96" ry="10" fill="#fffbf5" />

      {tiers.map((tier, i) => {
        const dripDepth = Math.min(16, tier.height * 0.3);
        const scallops = 6 + i;
        const scallopW = tier.width / scallops;
        const drip = [
          `M${tier.x} ${tier.y + dripDepth}`,
          ...Array.from({ length: scallops }, (_, s) => {
            const cx = tier.x + scallopW * (s + 0.5);
            const ex = tier.x + scallopW * (s + 1);
            const dy = tier.y + dripDepth + (s % 2 === 0 ? 10 : 4);
            return `Q${cx} ${dy} ${ex} ${tier.y + dripDepth}`;
          }),
          `V${tier.y} H${tier.x} Z`,
        ].join(" ");

        return (
          <g key={i}>
            <rect
              x={tier.x}
              y={tier.y}
              width={tier.width}
              height={tier.height}
              rx="10"
              fill={art.sponge}
            />
            <rect
              x={tier.x}
              y={tier.y}
              width={tier.width}
              height={dripDepth}
              rx="8"
              fill={art.frosting}
            />
            <path d={drip} fill={art.drip} />
            {/* soft sheen */}
            <rect
              x={tier.x + 8}
              y={tier.y + dripDepth + 6}
              width="6"
              height={tier.height - dripDepth - 14}
              rx="3"
              fill="#fffbf5"
              opacity="0.18"
            />
          </g>
        );
      })}

      <Topping art={art} topY={topY} />
    </svg>
  );
}

function Topping({ art, topY }: { art: CakeArtConfig; topY: number }) {
  switch (art.topping) {
    case "cherries":
      return (
        <g>
          {[-22, 0, 22].map((dx) => (
            <circle key={dx} cx={120 + dx} cy={topY - 7} r="8" fill={art.accent} />
          ))}
          <path
            d={`M120 ${topY - 12} q4 -12 11 -16`}
            stroke="#4d7c4a"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      );
    case "strawberries":
      return (
        <g>
          {[-24, 0, 24].map((dx) => (
            <g key={dx}>
              <path
                d={`M${120 + dx} ${topY + 2} q-9 -8 -5 -16 q5 -8 5 -8 q0 0 5 8 q4 8 -5 16`}
                fill={art.accent}
              />
              <path
                d={`M${116 + dx} ${topY - 20} h8 l-4 5 z`}
                fill="#4d7c4a"
              />
            </g>
          ))}
        </g>
      );
    case "chocolate":
      return (
        <g>
          {[-20, 2, 20].map((dx, i) => (
            <rect
              key={dx}
              x={112 + dx}
              y={topY - 16 + (i % 2) * 4}
              width="13"
              height="13"
              rx="3"
              transform={`rotate(${i * 22 - 20} ${118 + dx} ${topY - 9})`}
              fill={i === 1 ? art.accent : art.drip}
            />
          ))}
        </g>
      );
    case "flowers":
      return (
        <g>
          {[-26, 0, 26].map((dx, i) => (
            <g key={dx}>
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <ellipse
                  key={angle}
                  cx={120 + dx}
                  cy={topY - 8 - (i === 1 ? 4 : 0)}
                  rx="4.5"
                  ry="8"
                  transform={`rotate(${angle} ${120 + dx} ${topY - 8 - (i === 1 ? 4 : 0)})`}
                  fill={art.accent}
                  opacity="0.85"
                />
              ))}
              <circle
                cx={120 + dx}
                cy={topY - 8 - (i === 1 ? 4 : 0)}
                r="4"
                fill="#fdf6ec"
              />
            </g>
          ))}
        </g>
      );
    case "candles":
      return (
        <g>
          {[-20, 0, 20].map((dx, i) => (
            <g key={dx}>
              <rect
                x={117 + dx}
                y={topY - 26}
                width="6"
                height="24"
                rx="3"
                fill={i === 1 ? art.accent : "#fffbf5"}
              />
              <ellipse cx={120 + dx} cy={topY - 30} rx="4" ry="6" fill="#f0a840" />
              <ellipse cx={120 + dx} cy={topY - 29} rx="2" ry="3.5" fill="#fdf6ec" />
            </g>
          ))}
        </g>
      );
  }
}
