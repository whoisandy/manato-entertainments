"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Spotlight } from "@/components/ui/spotlight-new";

/**
 * Hero spotlight — the vendored Aceternity SpotlightNew re-themed to the
 * MANATO palette (stage light = silver on navy, with a faint crest-gold
 * counter-light; every color is a token value at wash-level alpha, so text
 * contrast stays WCAG AA per DESIGN.md §7):
 *   - bone      #F7F8FC → rgba(247, 248, 252, α)
 *   - silver-300 #EEF1F8 → rgba(238, 241, 248, α)
 *   - silver-400 #D9DFEF → rgba(217, 223, 239, α)
 *   - crest-300  #F6D996 → rgba(246, 217, 150, α)
 *   - crest-500  #E0B658 → rgba(224, 182, 88, α)
 *
 * Decorative layer rules (DESIGN.md §5/§7): `aria-hidden`, no interactivity,
 * unmounted under prefers-reduced-motion, and gated by an IntersectionObserver
 * so the infinite drift animation only runs while the hero is near the
 * viewport (transform-only motion, compositor-safe while visible).
 */
export const HeroSpotlight = () => {
  const reduceMotion = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reduceMotion) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setVisible(entry.isIntersecting);
        }
      },
      { rootMargin: "160px 0px" }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [reduceMotion]);

  if (reduceMotion) {
    return null;
  }

  return (
    <div ref={hostRef} aria-hidden="true" className="absolute inset-0">
      {visible && (
        <Spotlight
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(247, 248, 252, 0.08) 0, rgba(247, 248, 252, 0.02) 50%, rgba(247, 248, 252, 0) 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, rgba(238, 241, 248, 0.06) 0, rgba(217, 223, 239, 0.02) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, rgba(246, 217, 150, 0.05) 0, rgba(224, 182, 88, 0.02) 80%, transparent 100%)"
        />
      )}
    </div>
  );
};
