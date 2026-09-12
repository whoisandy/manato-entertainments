"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * LazyMotion provider: components use the lightweight `m` entry point
 * (~30KB smaller than the full `motion` import) with the domAnimation
 * feature set — enough for opacity/transform animation, variants, exit,
 * and in-view triggers used across the site.
 */
export const LazyMotionProvider = ({ children }: { children: ReactNode }) => (
  <LazyMotion features={domAnimation} strict>
    {children}
  </LazyMotion>
);
