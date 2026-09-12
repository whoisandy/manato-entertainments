"use client";

import { m, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { heroPhotos } from "@/lib/content";

const CYCLE_MS = 6000;
const CROSSFADE_MS = 1.2;

/**
 * Vervee/Vibe-style cycling photo backdrop: a photo panel hugging the right
 * on md+ (full-bleed on mobile), blended into the stage by a left-edge dark
 * gradient. All photos stay mounted as stacked layers and cross-fade via
 * opacity — no mount churn, the priority preload stays consumed, and the
 * cycle images pre-decode. Each active layer also runs a slow Ken Burns
 * zoom-out (1.2 → 1.05, the 5% buffer hides the 2px blur edge bleed), so
 * the hero keeps moving between cross-fades. The cycle pauses under
 * prefers-reduced-motion.
 */
export const HeroBackdrop = () => {
  const [index, setIndex] = useState(0);
  const [auxLayersMounted, setAuxLayersMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || heroPhotos.length < 2) {
      return;
    }
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % heroPhotos.length);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  // Keep the wire clear for the LCP image: the first photo mounts with the
  // page; the remaining layers mount a beat later, still well before the
  // 6s first crossfade so they arrive pre-decoded.
  useEffect(() => {
    const timer = setTimeout(() => setAuxLayersMounted(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (heroPhotos.length === 0) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-y-0 right-0 left-0 overflow-hidden md:left-[30%]"
    >
      {heroPhotos.map((photo, photoIndex) => {
        if (photoIndex > 0 && !auxLayersMounted) {
          return null;
        }
        const isActive = photoIndex === index;
        return (
          <m.div
            key={photo.src}
            className="absolute inset-0"
            initial={{
              opacity: photoIndex === 0 ? 1 : 0,
              scale: reduceMotion ? 1 : 1.2,
            }}
            animate={
              isActive
                ? { opacity: 1, scale: reduceMotion ? 1 : [1.2, 1.05] }
                : { opacity: 0, scale: reduceMotion ? 1 : 1.2 }
            }
            transition={
              isActive
                ? {
                    opacity: { duration: CROSSFADE_MS, ease: "easeInOut" },
                    scale: { duration: 7.2, ease: "easeInOut" },
                  }
                : { duration: CROSSFADE_MS, ease: "easeInOut" }
            }
          >
            <Image
              src={photo.src}
              alt=""
              fill
              priority={photoIndex === 0}
              sizes="(min-width: 768px) 58vw, 60vw"
              quality={75}
              className="object-cover blur-[2px]"
            />
          </m.div>
        );
      })}
      {/* Dark gradient overlay: photo blends left into the stage (md+),
          mobile keeps a full scrim under the stacked text. */}
      <div className="from-stage via-stage/55 absolute inset-0 bg-gradient-to-r to-transparent" />
      <div className="bg-stage/55 absolute inset-0 md:bg-transparent" />
      <div className="from-stage/70 absolute inset-0 bg-gradient-to-b via-transparent to-transparent" />
      <div className="from-stage via-stage/10 absolute inset-0 bg-gradient-to-t to-transparent" />
    </div>
  );
};
