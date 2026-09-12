"use client";

import { m, useReducedMotion } from "motion/react";

const wordVariants = {
  hidden: { filter: "blur(8px)", opacity: 0, y: 10 },
  show: {
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    y: 0,
  },
} as const;

/**
 * Per-word blur-fade for display headings — "house lights coming up".
 * Words settle from a soft blur to sharp; runs once when the heading
 * enters the viewport, and renders as plain text under reduced motion.
 */
export const WordReveal = ({
  text,
  className,
  delayChildren = 0.1,
}: {
  text: string;
  className?: string;
  delayChildren?: number;
}) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <m.span
      aria-label={text}
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        show: {
          transition: { delayChildren, staggerChildren: 0.045 },
        },
      }}
      viewport={{ amount: 0.6, once: true }}
      whileInView="show"
    >
      {words.map((item, index) => (
        <m.span
          aria-hidden="true"
          className="inline-block"
          key={`${item}+${index * 2}+${words.length}`}
          variants={wordVariants}
        >
          {index < words.length - 1 ? `${item}\u00A0` : item}
        </m.span>
      ))}
    </m.span>
  );
};
