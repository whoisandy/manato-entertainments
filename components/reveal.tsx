"use client";

import { m, useReducedMotion } from "motion/react";
import { createContext, useContext, useRef } from "react";
import type { ReactNode, RefObject } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Scroll reveal on motion (framer-motion successor, battle-tested).
 * GPU-composited transform + opacity only; honors prefers-reduced-motion.
 */
export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.15, margin: "0px 0px -8% 0px", once: true }}
      transition={{
        delay: delay / 1000,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </m.div>
  );
};

interface StaggerProps {
  /** Element to render — keeps list semantics for grid/list usage. */
  as?: "div" | "ul" | "ol";
  children: ReactNode;
  className?: string;
  /** ms before the first item, after the container enters the viewport. */
  delay?: number;
}

const staggerTags = { div: m.div, ol: m.ol, ul: m.ul };

/** Shared entry clock: records when the container entered the viewport so
 *  each StaggerItem can compute its remaining cascade delay. Items that
 *  arrive while scrolling long after the container stay delay-free, so the
 *  effect always travels with the user's scroll. */
const StaggerClock = createContext<{
  start: RefObject<number>;
} | null>(null);

/**
 * Group scroll reveal, scroll-following flavour: instead of one container
 * timeline (which finishes before tall groups scroll into view), every
 * StaggerItem observes its own viewport entry and cascades only against
 * the time since the container entered. Static under reduced motion.
 */
export const Stagger = ({
  as = "div",
  children,
  className,
  delay = 0,
}: StaggerProps) => {
  const reduceMotion = useReducedMotion();
  const start = useRef(0);
  const Tag = staggerTags[as];

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <StaggerClock.Provider value={{ start }}>
      <Tag
        className={className}
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        onViewportEnter={() => {
          start.current = performance.now() + delay;
        }}
        viewport={{ amount: 0.05, once: true }}
      >
        {children}
      </Tag>
    </StaggerClock.Provider>
  );
};

interface StaggerItemProps {
  /** Element to render — "li" when the parent Stagger renders ul/ol. */
  as?: "div" | "li";
  children: ReactNode;
  className?: string;
  /** Position within the stagger group (pass the map index). */
  index?: number;
  /** ms between siblings when several enter the viewport together. */
  step?: number;
}

const staggerItemTags = { div: m.div, li: m.li };

export const StaggerItem = ({
  as = "div",
  children,
  className,
  index = 0,
  step = 55,
}: StaggerItemProps) => {
  const reduceMotion = useReducedMotion();
  const clock = useContext(StaggerClock);
  const Tag = staggerItemTags[as];

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      custom={clock ? () => performance.now() - clock.start.current : null}
      initial="hidden"
      whileInView="show"
      viewport={{
        amount: 0.2,
        // The +1200px top margin keeps the observation root extended upward:
        // rows an instant scroll jumped PAST (never intersecting) still
        // count as in view and reveal instead of staying hidden forever.
        margin: "1200px 0px -8% 0px",
        once: true,
      }}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: (getElapsed) => {
          const elapsed = getElapsed ? getElapsed() : Number.POSITIVE_INFINITY;
          return {
            opacity: 1,
            transition: {
              delay: Math.max(0, (index * step - elapsed) / 1000),
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            },
            y: 0,
          };
        },
      }}
    >
      {children}
    </Tag>
  );
};
