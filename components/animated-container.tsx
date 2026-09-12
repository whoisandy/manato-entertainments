"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Efferd-style scroll reveal for footer columns: each block settles from a
 * soft blur a touch above its resting spot, staggered by delay. Renders
 * children plainly under prefers-reduced-motion.
 */
export const AnimatedContainer = ({
  children,
  className,
  delay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ filter: "blur(4px)", opacity: 0, translateY: -8 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
      whileInView={{ filter: "blur(0px)", opacity: 1, translateY: 0 }}
    >
      {children}
    </m.div>
  );
};
