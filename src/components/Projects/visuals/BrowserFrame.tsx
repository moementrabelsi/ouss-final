"use client";

/**
 * An abstract browser window used by the three web-development panels.
 * `variant` changes the wireframe inside: static page, dynamic app, CMS.
 */
export function BrowserFrame({
  variant,
  title,
  label,
}: {
  variant: 0 | 1 | 2;
  title: string;
  label: string;
}) {
  return (
    <svg viewBox="0 0 800 520" className="h-full w-full" role="img" aria-label={`${title} — ${label}`}>
      <rect x="0" y="0" width="800" height="520" fill="var(--color-paper-2)" />
      <rect
        x="32"
        y="32"
        width="736"
        height="456"
        fill="var(--color-paper)"
        stroke="var(--color-line)"
      />

      {/* Window chrome */}
      <line x1="32" y1="88" x2="768" y2="88" stroke="var(--color-line)" />
      <g fill="var(--color-ink)" opacity="0.28">
        <circle cx="58" cy="60" r="4.5" />
        <circle cx="76" cy="60" r="4.5" />
        <circle cx="94" cy="60" r="4.5" />
      </g>
      <rect x="122" y="50" width="240" height="20" fill="var(--color-ink)" opacity="0.07" />
      <rect x="122" y="50" width="6" height="20" fill="var(--color-accent)" />

      {variant === 0 ? (
        <g>
          <rect x="64" y="122" width="672" height="196" fill="var(--color-ink)" opacity="0.1" />
          <rect x="64" y="122" width="92" height="196" fill="var(--color-accent)" />
          <rect x="64" y="346" width="420" height="14" fill="var(--color-ink)" opacity="0.24" />
          <rect x="64" y="378" width="672" height="8" fill="var(--color-ink)" opacity="0.12" />
          <rect x="64" y="398" width="640" height="8" fill="var(--color-ink)" opacity="0.12" />
          <rect x="64" y="418" width="512" height="8" fill="var(--color-ink)" opacity="0.12" />
        </g>
      ) : null}

      {variant === 1 ? (
        <g>
          <rect x="64" y="122" width="320" height="40" fill="var(--color-ink)" opacity="0.08" />
          <rect x="400" y="122" width="120" height="40" fill="var(--color-accent)" />
          {[0, 1, 2, 3, 4].map((row) => (
            <g key={row}>
              <rect
                x="64"
                y={190 + row * 52}
                width="672"
                height="36"
                fill="var(--color-ink)"
                opacity={row % 2 === 0 ? 0.06 : 0.03}
              />
              <rect
                x="84"
                y={202 + row * 52}
                width={220 - row * 18}
                height="9"
                fill="var(--color-ink)"
                opacity="0.22"
              />
              <rect
                x="560"
                y={202 + row * 52}
                width="72"
                height="9"
                fill="var(--color-ink)"
                opacity="0.16"
              />
              <rect x="668" y={202 + row * 52} width="48" height="9" fill="var(--color-ink)" opacity="0.1" />
            </g>
          ))}
        </g>
      ) : null}

      {variant === 2 ? (
        <g>
          <rect x="64" y="122" width="168" height="304" fill="var(--color-ink)" opacity="0.06" />
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <rect
              key={row}
              x="84"
              y={148 + row * 34}
              width={128 - (row % 3) * 24}
              height="9"
              fill="var(--color-ink)"
              opacity="0.2"
            />
          ))}
          {[0, 1, 2, 3].map((cell) => (
            <rect
              key={cell}
              x={264 + (cell % 2) * 248}
              y={122 + Math.floor(cell / 2) * 158}
              width="220"
              height="134"
              fill={cell === 1 ? "var(--color-accent)" : "var(--color-ink)"}
              opacity={cell === 1 ? 1 : 0.09}
            />
          ))}
        </g>
      ) : null}
    </svg>
  );
}
