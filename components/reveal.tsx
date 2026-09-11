"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Scroll reveal driven imperatively: initial hidden style in markup, revealed
 * by mutating style directly in the IntersectionObserver callback. No state,
 * no hydration mismatch, no cascading render.
 */
export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const reveal = () => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(12px)",
        transition: `opacity 600ms ${EASE_OUT_EXPO} ${delay}ms, transform 600ms ${EASE_OUT_EXPO} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
