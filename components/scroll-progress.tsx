"use client";

import { m, useScroll, useSpring } from "motion/react";

/**
 * A 2px crest-to-silver line pinned to the viewport top — the page's
 * programme marker. Scroll-linked (not ambient), so it stays live under
 * prefers-reduced-motion; the spring only smooths the tracking.
 */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 30,
    mass: 0.4,
    stiffness: 120,
  });

  return (
    <m.div
      aria-hidden="true"
      className="from-crest-500 to-silver-300 fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r"
      style={{ scaleX }}
    />
  );
};
