"use client";

import { useI18n } from "@/lib/i18n";
import { useDrawOnScroll } from "@/animations/useDrawOnScroll";

const JOURNEY_Y = 392;
const JOURNEY_LEFT = 88;
const JOURNEY_RIGHT = 712;

/** Generated e-commerce graphic: campaign tiles, a product tile and the journey. */
export function CommerceVisual() {
  const { t } = useI18n();
  const ref = useDrawOnScroll<HTMLDivElement>();
  const copy = t.projects.commerce;
  const steps = copy.journey;

  return (
    <div ref={ref} className="h-full w-full">
      <svg
        viewBox="0 0 800 500"
        className="h-full w-full"
        role="img"
        aria-label={`${t.projects.items[3].title} — ${copy.journeyLabel}`}
      >
        <rect x="0" y="0" width="800" height="500" fill="var(--color-paper-2)" />

        {/* Campaign tiles */}
        <text x="56" y="62" fontSize="13" letterSpacing="2" fill="var(--color-ink-faint)">
          {copy.campaignLabel.toUpperCase()}
        </text>

        {copy.channels.map((channel, index) => {
          const x = 56 + index * 168;
          return (
            <g key={channel}>
              <rect
                x={x}
                y="84"
                width="148"
                height="148"
                fill="var(--color-paper)"
                stroke="var(--color-line)"
              />
              <rect
                x={x + 18}
                y="102"
                width="112"
                height="76"
                fill="var(--color-ink)"
                opacity={index === 0 ? 0.12 : 0.08}
              />
              {index === 0 ? (
                <rect x={x + 18} y="102" width="34" height="34" fill="var(--color-accent)" />
              ) : null}
              <rect x={x + 18} y="192" width="86" height="7" fill="var(--color-ink)" opacity="0.2" />
              <rect x={x + 18} y="206" width="54" height="7" fill="var(--color-ink)" opacity="0.12" />
              <text
                x={x}
                y="254"
                fontSize="12"
                letterSpacing="2"
                fill="var(--color-ink-faint)"
              >
                {channel.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Product tile */}
        <rect
          x="452"
          y="84"
          width="292"
          height="148"
          fill="var(--color-paper)"
          stroke="var(--color-line)"
        />
        <rect x="472" y="104" width="108" height="108" fill="var(--color-ink)" opacity="0.1" />
        <rect x="600" y="112" width="124" height="9" fill="var(--color-ink)" opacity="0.22" />
        <rect x="600" y="132" width="86" height="9" fill="var(--color-ink)" opacity="0.14" />
        <rect x="600" y="176" width="88" height="30" fill="var(--color-accent)" />
        <line x1="452" y1="232" x2="744" y2="232" stroke="var(--color-line)" />

        {/* Customer journey */}
        <text x="56" y="322" fontSize="13" letterSpacing="2" fill="var(--color-ink-faint)">
          {copy.journeyLabel.toUpperCase()}
        </text>

        <path
          data-draw
          d={`M${JOURNEY_LEFT} ${JOURNEY_Y} L${JOURNEY_RIGHT} ${JOURNEY_Y}`}
          pathLength={1}
          stroke="var(--color-ink)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          fill="none"
          style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
        />

        {steps.map((step, index) => {
          const x =
            JOURNEY_LEFT + (index / (steps.length - 1)) * (JOURNEY_RIGHT - JOURNEY_LEFT);
          const isLast = index === steps.length - 1;
          return (
            <g key={step}>
              <circle
                cx={x}
                cy={JOURNEY_Y}
                r={isLast ? 9 : 6}
                fill={isLast ? "var(--color-accent)" : "var(--color-paper-2)"}
                stroke="var(--color-ink)"
                strokeWidth="1.5"
              />
              <text
                x={x}
                y={JOURNEY_Y - 26}
                textAnchor="middle"
                className="font-display"
                fontSize="14"
                fill="var(--color-ink-faint)"
              >
                {String(index + 1).padStart(2, "0")}
              </text>
              <text
                x={x}
                y={JOURNEY_Y + 34}
                textAnchor="middle"
                fontSize="13"
                fill="var(--color-ink)"
              >
                {step}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
