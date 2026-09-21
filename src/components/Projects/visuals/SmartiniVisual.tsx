"use client";

import { useI18n } from "@/lib/i18n";

const BARS = [58, 94, 46, 118, 82, 138, 70];

/**
 * Generated product visual — an abstract read of the Smartini interface.
 * Swap it for a real screenshot by setting `image` on the project in
 * `src/data/projects.ts`.
 */
export function SmartiniVisual() {
  const { t } = useI18n();
  const labels = t.projects.smartini;

  return (
    <svg
      viewBox="0 0 800 500"
      className="h-full w-full"
      role="img"
      aria-label={`${t.projects.items[0].title} — ${t.projects.items[0].subtitle}`}
    >
      <rect x="0" y="0" width="800" height="500" fill="var(--color-paper-2)" />
      <rect
        x="40"
        y="40"
        width="720"
        height="420"
        fill="var(--color-paper)"
        stroke="var(--color-line)"
      />

      {/* Application chrome */}
      <line x1="40" y1="112" x2="760" y2="112" stroke="var(--color-line)" />
      <text
        x="72"
        y="84"
        className="font-display"
        fontSize="15"
        letterSpacing="3"
        fill="var(--color-ink)"
      >
        SMARTINI
      </text>
      <g fill="var(--color-ink)" opacity="0.35">
        <rect x="694" y="72" width="10" height="10" />
        <rect x="712" y="72" width="10" height="10" />
        <rect x="730" y="72" width="10" height="10" />
      </g>

      {/* Balance + budget tracking */}
      <text x="72" y="162" fontSize="13" letterSpacing="2" fill="var(--color-ink-faint)">
        {labels.balanceLabel.toUpperCase()}
      </text>
      <text
        x="72"
        y="222"
        className="font-display"
        fontSize="52"
        letterSpacing="-2"
        fill="var(--color-ink)"
      >
        2.480,00 €
      </text>

      <text x="72" y="270" fontSize="12" letterSpacing="2" fill="var(--color-ink-faint)">
        {labels.budgetLabel.toUpperCase()}
      </text>

      <line x1="72" y1="392" x2="392" y2="392" stroke="var(--color-line)" />
      {BARS.map((height, index) => (
        <rect
          key={index}
          x={72 + index * 46}
          y={392 - height}
          width="26"
          height={height}
          fill={index === 5 ? "var(--color-accent)" : "var(--color-ink)"}
          opacity={index === 5 ? 1 : 0.14}
        />
      ))}

      {/* Divider */}
      <line x1="430" y1="150" x2="430" y2="400" stroke="var(--color-line)" />

      {/* Transactions */}
      <text x="470" y="162" fontSize="13" letterSpacing="2" fill="var(--color-ink-faint)">
        {labels.transactionsLabel.toUpperCase()}
      </text>
      {[0, 1, 2, 3].map((row) => {
        const y = 202 + row * 52;
        return (
          <g key={row}>
            <rect
              x="470"
              y={y - 9}
              width="18"
              height="18"
              fill={row === 1 ? "var(--color-accent)" : "var(--color-ink)"}
              opacity={row === 1 ? 1 : 0.12}
            />
            <rect
              x="504"
              y={y - 4}
              width={170 - row * 22}
              height="8"
              fill="var(--color-ink)"
              opacity="0.16"
            />
            <rect x="686" y={y - 4} width="42" height="8" fill="var(--color-ink)" opacity="0.28" />
            <line x1="470" y1={y + 22} x2="728" y2={y + 22} stroke="var(--color-line)" />
          </g>
        );
      })}
    </svg>
  );
}
