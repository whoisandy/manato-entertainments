"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { BackgroundBeams } from "@/components/ui/background-beams";

/**
 * Beam field for a section's top edge (gallery, About), themed to
 * navy/silver/crest (vendored aceternity BackgroundBeams). The 51 SVG
 * gradients animate on a rAF loop with no visibility gate, so this wrapper
 * unmounts the field the moment it leaves the viewport (+160px hysteresis)
 * and renders nothing under prefers-reduced-motion — both decorative
 * layers, losing either is acceptable; animating either is not.
 */
export const LightBeams = ({ className }: { className?: string }) => {
  const reduceMotion = useReducedMotion();
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (reduceMotion || !host) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        setMounted(entries.at(-1)?.isIntersecting ?? false);
      },
      { rootMargin: "160px" }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [reduceMotion]);

  if (reduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className ?? ""}`}
      ref={hostRef}
    >
      {mounted ? <BackgroundBeams /> : null}
    </div>
  );
};
