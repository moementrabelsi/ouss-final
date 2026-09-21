"use client";

import { useI18n } from "@/lib/i18n";
import { useDrawOnScroll } from "@/animations/useDrawOnScroll";

const SERIES = [0.22, 0.34, 0.29, 0.48, 0.44, 0.63, 0.58, 0.78, 0.86];
const SCATTER = [
  [0.12, 0.62],
  [0.24, 0.41],
  [0.33, 0.74],
  [0.47, 0.3],
  [0.58, 0.55],
  [0.66, 0.2],
  [0.79, 0.47],
  [0.9, 0.33],
];

const LEFT = 72;
const RIGHT = 728;
const TOP = 120;
const BOTTOM = 392;

function toPoint(index: number, value: number) {
  const x = LEFT + (index / (SERIES.length - 1)) * (RIGHT - LEFT);
  const y = BOTTOM - value * (BOTTOM - TOP);
  return { x, y };
}

/** Generated analytical graphic — the line draws itself on scroll. */
export function AnalyticsVisual() {
  const { t } = useI18n();
  const ref = useDrawOnScroll<HTMLDivElement>();
  const copy = t.projects.analytics;

  const points = SERIES.map((value, index) => toPoint(index, value));
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const area = `${line} L${RIGHT} ${BOTTOM} L${LEFT} ${BOTTOM} Z`;

  return (
    <div ref={ref} className="h-full w-full">
      <svg
        viewBox="0 0 800 500"
        className="h-full w-full"
        role="img"
        aria-label={`${t.projects.items[1].title} — ${copy.caption}`}
      >
        <rect x="0" y="0" width="800" height="500" fill="var(--color-paper-2)" />

        {/* Grid */}
        <g stroke="var(--color-line)">
          {[0, 1, 2, 3, 4].map((row) => (
            <line
              key={`h-${row}`}
              x1={LEFT}
              x2={RIGHT}
              y1={TOP + (row * (BOTTOM - TOP)) / 4}
              y2={TOP + (row * (BOTTOM - TOP)) / 4}
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((col) => (
            <line
              key={`v-${col}`}
              y1={TOP}
              y2={BOTTOM}
              x1={LEFT + (col * (RIGHT - LEFT)) / 6}
              x2={LEFT + (col * (RIGHT - LEFT)) / 6}
              strokeOpacity="0.5"
            />
          ))}
        </g>

        <path d={area} fill="var(--color-accent)" opacity="0.28" />

        <path
          data-draw
          d={line}
          pathLength={1}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
        />

        <g fill="var(--color-ink)" opacity="0.5">
          {SCATTER.map(([sx, sy], index) => (
            <circle
              key={index}
              cx={LEFT + sx * (RIGHT - LEFT)}
              cy={BOTTOM - sy * (BOTTOM - TOP)}
              r="3.2"
            />
          ))}
        </g>

        {/* Highlighted final reading */}
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="7"
          fill="var(--color-accent)"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
        />

        <text
          x={LEFT}
          y="84"
          fontSize="13"
          letterSpacing="2"
          fill="var(--color-ink-faint)"
        >
          {copy.captionLabel.toUpperCase()}
        </text>
        <line x1={LEFT} y1={BOTTOM} x2={RIGHT} y2={BOTTOM} stroke="var(--color-ink)" strokeOpacity="0.5" />

        <text x={LEFT} y="432" fontSize="13" letterSpacing="2" fill="var(--color-ink-faint)">
          {copy.axis[0].toUpperCase()}
        </text>
        <text
          x={RIGHT}
          y="432"
          textAnchor="end"
          fontSize="13"
          letterSpacing="2"
          fill="var(--color-ink-faint)"
        >
          {copy.axis[1].toUpperCase()}
        </text>
        <text
          x={RIGHT}
          y="84"
          textAnchor="end"
          className="font-display"
          fontSize="20"
          letterSpacing="-0.5"
          fill="var(--color-ink)"
        >
          {copy.caption}
        </text>
      </svg>
    </div>
  );
}
