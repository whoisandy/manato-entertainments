"use client";

import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import {
  AnimatePresence,
  m,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

import { DialogClose } from "@/components/ui/dialog";
import type { Photo } from "@/lib/content";

interface SharedModalProps {
  index: number;
  photos: Photo[];
  /** 1 = entering from the right, -1 = entering from the left. */
  direction: number;
  onChange: (next: number) => void;
}

/** framer-style variants from the Vercel gallery starter's
 *  `utils/animationVariants.ts` — ±1000px directional slide. */
const slideVariants = {
  center: { opacity: 1, x: 0 },
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 1000 : -1000,
  }),
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 1000 : -1000,
  }),
};

const fadeVariants = {
  center: { opacity: 1 },
  enter: { opacity: 0 },
  exit: { opacity: 0 },
};

/** Only ±15 thumbs around the active index are mounted (starter's windowing). */
const range = (start: number, end: number) => {
  const output: number[] = [];
  for (let i = start; i < end; i += 1) {
    output.push(i);
  }
  return output;
};

const circleButton =
  "pointer-events-auto rounded-full border-hairline-strong bg-panel p-2 text-bone/75 backdrop-blur-lg transition-colors duration-200 hover:bg-elevated hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver-400";

const chevronButton =
  "pointer-events-auto absolute top-1/2 -translate-y-1/2 rounded-full border-hairline-strong bg-panel p-3 text-bone/75 backdrop-blur-lg transition-colors duration-200 hover:bg-elevated hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver-400";

export const SharedModal = ({
  index,
  photos,
  direction,
  onChange,
}: SharedModalProps) => {
  const [loaded, setLoaded] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < photos.length - 1) {
        onChange(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        onChange(index - 1);
      }
    },
    trackMouse: true,
  });

  const photo = photos.at(index);
  if (!photo) {
    return null;
  }

  const filtered = photos.filter((_, id) =>
    range(index - 15, index + 16).includes(id)
  );

  return (
    <MotionConfig
      transition={{
        opacity: { duration: reduceMotion ? 0 : 0.2 },
        x: reduceMotion
          ? { duration: 0 }
          : { damping: 30, stiffness: 300, type: "spring" },
      }}
    >
      {/* Stage fills the popup viewport as a flex column: the photo area
          (flex-1) and the filmstrip stack, so the image always centers in
          the space above the strip with no hardcoded strip height. The
          slide layer stays absolute inside the photo area because two
          slides coexist during a transition (enter + exit). */}
      <div className="relative z-50 flex h-dvh w-full flex-col" {...handlers}>
        {/* Photo area (slide-clipped) */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <m.div
              key={photo.src}
              className="absolute inset-0 flex items-center justify-center"
              custom={direction}
              variants={reduceMotion ? fadeVariants : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="eager"
                onLoad={() => setLoaded(true)}
                className="h-auto max-h-full w-auto max-w-[min(100%,80rem)] object-contain"
              />
            </m.div>
          </AnimatePresence>

          {/* Chevrons — vertically centered on the photo area: a position
              that is stable across every photo and orientation. */}
          <div className="pointer-events-none absolute inset-0">
            {loaded ? (
              <>
                {index > 0 ? (
                  <button
                    type="button"
                    className={`${chevronButton} left-3`}
                    onClick={() => onChange(index - 1)}
                    aria-label="Previous photo"
                  >
                    <ChevronLeftIcon className="size-6" />
                  </button>
                ) : null}
                {index + 1 < photos.length ? (
                  <button
                    type="button"
                    className={`${chevronButton} right-3`}
                    onClick={() => onChange(index + 1)}
                    aria-label="Next photo"
                  >
                    <ChevronRightIcon className="size-6" />
                  </button>
                ) : null}
              </>
            ) : null}
          </div>
        </div>

        {/* Close — pinned to the stage's top-right corner. */}
        <div className="pointer-events-none absolute inset-0">
          {loaded ? (
            <div className="pointer-events-auto absolute top-0 right-0 flex items-center gap-2 p-3">
              <DialogClose
                render={
                  <button
                    type="button"
                    className={circleButton}
                    aria-label="Close photo viewer"
                  />
                }
              >
                <XIcon className="size-5" />
              </DialogClose>
            </div>
          ) : null}
        </div>

        {/* Filmstrip — a flex item at the bottom of the column: it owns its
            own height, so the photo area above is exactly viewport-minus-
            strip and nothing ever hides behind it. The starter's
            sliding-window trick: every thumb translates by index * -100%
            of its own width, so the row glides the active thumb into
            view; the active one lifts via scale. */}
        <div className="to-stage/80 overflow-hidden bg-gradient-to-b from-transparent">
          <m.div
            initial={false}
            className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
          >
            <AnimatePresence initial={false}>
              {filtered.map((thumb, id) => (
                <m.button
                  key={thumb.src}
                  type="button"
                  initial={{
                    width: "0%",
                    x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                  }}
                  animate={{
                    scale: id === index ? 1.25 : 1,
                    width: "100%",
                    x: `${Math.max(index * -100, 15 * -100)}%`,
                  }}
                  exit={{ width: "0%" }}
                  onClick={() => onChange(id)}
                  aria-label={`View photo ${id + 1} of ${photos.length}`}
                  aria-current={id === index}
                  className={`${id === index ? "z-20 rounded-md shadow-lg shadow-black/50" : "z-10"} ${
                    id === 0 ? "rounded-l-md" : ""
                  } ${
                    id === photos.length - 1 ? "rounded-r-md" : ""
                  } focus-visible:outline-silver-400 relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                  <Image
                    alt=""
                    width={180}
                    height={120}
                    className={`${
                      id === index
                        ? "brightness-110"
                        : "brightness-75 contrast-125 hover:brightness-100"
                    } h-full w-full transform object-cover transition`}
                    src={thumb.src}
                  />
                </m.button>
              ))}
            </AnimatePresence>
          </m.div>
        </div>
      </div>
    </MotionConfig>
  );
};
