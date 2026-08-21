"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Decorative concentric orbit rings with a small traveling node — used as a
 * quiet accent behind headings on the free-access, about, and auth pages.
 */
export function OrbitRings({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 400 400" fill="none" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <g stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="2 6" strokeLinecap="round">
        <circle cx="200" cy="200" r="80" />
        <circle cx="200" cy="200" r="130" opacity="0.7" />
        <circle cx="200" cy="200" r="180" opacity="0.4" />
      </g>
      <circle cx="200" cy="200" r="5" fill="var(--accent)" />
      {!reduceMotion && (
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        >
          <circle cx="200" cy="20" r="4.5" fill="var(--accent)" />
        </motion.g>
      )}
      {!reduceMotion && (
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        >
          <circle cx="380" cy="200" r="3.5" fill="var(--text-tertiary)" />
        </motion.g>
      )}
    </svg>
  );
}
