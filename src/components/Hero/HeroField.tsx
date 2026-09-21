"use client";

import { useRef } from "react";
import { gsap, useGSAP, POINTER_FINE, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const COLS = 15;
const ROWS = 11;
const STEP = 27;
const OFFSET = 12;

/** A data series, normalised 0–1, drawn as the foreground plot. */
const SERIES = [0.62, 0.46, 0.54, 0.34, 0.41, 0.26, 0.33, 0.17, 0.22, 0.08];

const WIDTH = 420;
const HEIGHT = 300;

function seriesPoints() {
  const usableW = WIDTH - 60;
  const usableH = HEIGHT - 120;
  return SERIES.map((value, index) => {
    const x = 30 + (index / (SERIES.length - 1)) * usableW;
    const y = 60 + value * usableH;
    return { x, y };
  });
}

/**
 * Abstract "data field" behind the hero headline: a lattice of points, a
 * plotted series and a single accent node. Three parallax layers drift with
 * the cursor. Purely decorative — hidden from assistive technology.
 */
export function HeroField({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const points = seriesPoints();
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const last = points[points.length - 1];

  useGSAP(
    () => {
      const root = wrapRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const plot = root.querySelector<SVGPathElement>("[data-plot]");
        if (plot) {
          gsap.fromTo(
            plot,
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", delay: 0.6 },
          );
        }
        const nodes = root.querySelectorAll<SVGCircleElement>("[data-node]");
        gsap.fromTo(
          nodes,
          { scale: 0, transformOrigin: "center" },
          { scale: 1, duration: 0.6, ease: "back.out(2)", stagger: 0.07, delay: 1.1 },
        );
      });

      mm.add(POINTER_FINE, () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", root);
        const setters = layers.map((layer) => ({
          x: gsap.quickTo(layer, "x", { duration: 1.4, ease: "power3.out" }),
          y: gsap.quickTo(layer, "y", { duration: 1.4, ease: "power3.out" }),
          depth: Number(layer.dataset.depth ?? "1"),
        }));

        const onMove = (event: PointerEvent) => {
          const rx = event.clientX / window.innerWidth - 0.5;
          const ry = event.clientY / window.innerHeight - 0.5;
          setters.forEach((setter) => {
            setter.x(rx * 46 * setter.depth);
            setter.y(ry * 34 * setter.depth);
          });
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} aria-hidden className={cn("select-none", className)}>
      <div className="relative h-full w-full">
        <span
          data-depth="0.25"
          className="display outline-type absolute right-[4%] top-[8%] text-[18vw] leading-none opacity-25"
        >
          01
        </span>

        <svg
          data-depth="0.7"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <g fill="var(--color-brand)" opacity="0.28">
            {Array.from({ length: COLS * ROWS }).map((_, index) => {
              const col = index % COLS;
              const row = Math.floor(index / COLS);
              return (
                <circle
                  key={index}
                  cx={OFFSET + col * STEP}
                  cy={OFFSET + row * STEP}
                  r={1.1}
                />
              );
            })}
          </g>
        </svg>

        <svg
          data-depth="1.5"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <line
            x1="30"
            y1={HEIGHT - 52}
            x2={WIDTH - 30}
            y2={HEIGHT - 52}
            stroke="var(--color-brand)"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <path
            data-plot
            d={path}
            pathLength={1}
            stroke="var(--color-brand)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
          {points.map((point, index) => (
            <circle
              key={index}
              data-node
              cx={point.x}
              cy={point.y}
              r={index === points.length - 1 ? 5 : 2.4}
              fill={index === points.length - 1 ? "var(--color-accent)" : "var(--color-teal)"}
              stroke={index === points.length - 1 ? "var(--color-accent-deep)" : "none"}
              strokeWidth="1"
            />
          ))}
          <rect
            x={last.x - 14}
            y={last.y - 30}
            width="28"
            height="14"
            fill="none"
            stroke="var(--color-teal)"
            strokeOpacity="0.45"
          />
        </svg>
      </div>
    </div>
  );
}
