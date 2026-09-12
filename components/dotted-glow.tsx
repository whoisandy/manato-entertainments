"use client";

import { useReducedMotion } from "motion/react";

import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

/** Shared themed-canvas props — silver-500 dots pulsing with a crest-400 glow. */
const GLOW_PROPS = {
  backgroundOpacity: 0,
  color: "rgba(182,192,216,0.6)",
  gap: 14,
  glowColor: "rgba(236,199,119,0.85)",
  opacity: 0.5,
  radius: 1.3,
  speedMax: 1.2,
  speedMin: 0.3,
  speedScale: 0.9,
} as const;

/**
 * Dual-corner dotted glow for the featured-event card, themed to the navy
 * palette: silver dots that pulse with a crest glow, masked radially from
 * each anchored corner so the fields dissolve toward the content. Both
 * corners render at every breakpoint (top-left + bottom-right). The
 * vendored canvas animates unconditionally, so this wrapper renders
 * nothing at all under prefers-reduced-motion (decorative layer).
 */
export const DottedGlowCorner = () => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return null;
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="section-fx pointer-events-none absolute top-0 left-0 h-40 w-56 md:h-64 md:w-[24rem]"
      >
        <DottedGlowBackground
          {...GLOW_PROPS}
          className="pointer-events-none mask-radial-to-75% mask-radial-at-top-left"
        />
      </div>
      <div
        aria-hidden="true"
        className="section-fx pointer-events-none absolute right-0 bottom-0 h-40 w-56 md:h-64 md:w-[24rem]"
      >
        <DottedGlowBackground
          {...GLOW_PROPS}
          className="pointer-events-none mask-radial-to-75% mask-radial-at-bottom-right"
        />
      </div>
    </>
  );
};
