"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { heroPhotos } from "@/lib/content";

const CYCLE_MS = 6000;
const CROSSFADE_MS = 1.2;

/**
 * Full-bleed cycling photo backdrop (Vervee-style): brand photos cross-fade
 * under a stage-colored scrim that keeps the headline legible. First photo
 * is priority-preloaded; the cycle pauses under prefers-reduced-motion.
 */
export const HeroBackdrop = () => {
  const [index, setIndex] = useState(0);
  const [hasCycled, setHasCycled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || heroPhotos.length < 2) {
      return;
    }
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % heroPhotos.length);
      setHasCycled(true);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const photo = heroPhotos[index] ?? heroPhotos[0];
  if (!photo) {
    return null;
  }

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={photo.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: CROSSFADE_MS, ease: "easeInOut" }}
        >
          <Image
            src={photo.src}
            alt=""
            fill
            priority={index === 0 && !hasCycled}
            sizes="100vw"
            className="scale-105 object-cover blur-[2px]"
          />
        </motion.div>
      </AnimatePresence>
      {/* Scrim: flat wash for global legibility + top/bottom blends into the stage */}
      <div className="bg-stage/60 absolute inset-0" />
      <div className="from-stage/70 absolute inset-0 bg-gradient-to-b via-transparent to-transparent" />
      <div className="from-stage via-stage/10 absolute inset-0 bg-gradient-to-t to-transparent" />
    </div>
  );
};
