"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Abstract "prompt network" illustration for the hero — nodes connected by
 * thin lines, with a handful of accent-lit nodes representing prompts
 * surfacing out of the wider library. Pure inline SVG, no external assets,
 * themeable via currentColor / CSS variables so it adapts across themes.
 */

const nodes = [
  { id: "n1", x: 90, y: 120, r: 4, accent: false },
  { id: "n2", x: 170, y: 70, r: 3, accent: false },
  { id: "n3", x: 230, y: 150, r: 7, accent: true },
  { id: "n4", x: 320, y: 90, r: 4, accent: false },
  { id: "n5", x: 300, y: 200, r: 3, accent: false },
  { id: "n6", x: 400, y: 60, r: 5, accent: true },
  { id: "n7", x: 430, y: 170, r: 4, accent: false },
  { id: "n8", x: 500, y: 110, r: 3, accent: false },
  { id: "n9", x: 540, y: 210, r: 6, accent: true },
  { id: "n10", x: 130, y: 220, r: 3, accent: false },
  { id: "n11", x: 260, y: 260, r: 4, accent: false },
  { id: "n12", x: 390, y: 250, r: 3, accent: false },
  { id: "n13", x: 470, y: 40, r: 3, accent: false },
  { id: "n14", x: 60, y: 190, r: 3, accent: false },
];

const edges: [string, string][] = [
  ["n1", "n2"],
  ["n2", "n3"],
  ["n3", "n4"],
  ["n3", "n5"],
  ["n4", "n6"],
  ["n4", "n8"],
  ["n6", "n7"],
  ["n6", "n13"],
  ["n7", "n8"],
  ["n7", "n9"],
  ["n8", "n9"],
  ["n1", "n10"],
  ["n10", "n11"],
  ["n5", "n11"],
  ["n11", "n12"],
  ["n5", "n12"],
  ["n1", "n14"],
  ["n10", "n14"],
];

function findNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function ConstellationIllustration({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 600 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Abstract illustration of connected prompt nodes"
    >
      <defs>
        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* edges */}
      <g stroke="var(--border-strong)" strokeWidth="1">
        {edges.map(([a, b], i) => {
          const na = findNode(a);
          const nb = findNode(b);
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              initial={reduceMotion ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={reduceMotion ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}
      </g>

      {/* glow behind accent nodes */}
      {nodes
        .filter((n) => n.accent)
        .map((n) => (
          <circle key={`glow-${n.id}`} cx={n.x} cy={n.y} r={26} fill="url(#node-glow)" />
        ))}

      {/* nodes */}
      {nodes.map((n, i) => (
        <motion.circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.accent ? "var(--accent)" : "var(--text-tertiary)"}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* gentle pulse on the largest accent node */}
      {!reduceMotion && (
        <motion.circle
          cx={540}
          cy={210}
          r={6}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: [0.5, 0, 0.5], scale: [1, 2.4, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
        />
      )}
    </svg>
  );
}
