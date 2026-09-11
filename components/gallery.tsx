"use client";

import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Photo } from "@/lib/content";

interface GalleryProps {
  images: Photo[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openByIndex = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    lastTriggerRef.current = event.currentTarget;
    setOpenIndex(Number(event.currentTarget.dataset.index ?? 0));
  }, []);

  const navigate = useCallback(
    (direction: 1 | -1) => {
      setOpenIndex((current) =>
        current === null
          ? current
          : (current + direction + images.length) % images.length
      );
    },
    [images.length]
  );

  useEffect(() => {
    if (openIndex !== null) {
      return;
    }
    lastTriggerRef.current?.focus();
    lastTriggerRef.current = null;
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        navigate(-1);
      }
      if (event.key === "ArrowRight") {
        navigate(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, navigate]);

  const image = openIndex === null ? undefined : images.at(openIndex);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {images.map((photo, index) => (
          <li key={photo.src}>
            <button
              type="button"
              data-index={index}
              onClick={openByIndex}
              aria-label={`Open photo ${index + 1}: ${photo.alt}`}
              className="group border-hairline hover:border-gold-500/40 block w-full overflow-hidden border transition-colors duration-200"
            >
              <span className="relative block aspect-[3/2] w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog
        open={image !== undefined}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setOpenIndex(null);
          }
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="w-full max-w-[calc(100%-1.5rem)] gap-0 bg-transparent p-0 ring-0 sm:max-w-5xl"
        >
          {image ? (
            <>
              <DialogTitle className="sr-only">{image.alt}</DialogTitle>
              <figure className="mx-auto flex w-full max-w-5xl flex-col items-center px-14 sm:px-20">
                <div className="relative flex max-h-[76dvh] items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={image.src}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 640px) 80vw, 90vw"
                        className="border-hairline h-auto max-h-[76dvh] w-auto max-w-full border object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <figcaption className="mt-5 flex w-full flex-col items-center gap-1 text-center">
                  <p className="text-ash text-sm">{image.alt}</p>
                  <p className="text-gold-400 font-mono text-[13px] tracking-[0.05em]">
                    {(openIndex ?? 0) + 1} / {images.length}
                  </p>
                </figcaption>
              </figure>
              <DialogClose
                render={
                  <Button
                    variant="outline"
                    className="bg-panel/80 absolute top-4 right-4 size-12"
                    aria-label="Close photo viewer"
                  />
                }
              >
                <XIcon />
              </DialogClose>
              <Button
                variant="outline"
                className="bg-panel/80 absolute top-1/2 left-2 size-12 -translate-y-1/2"
                onClick={() => navigate(-1)}
                aria-label="Previous photo"
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="bg-panel/80 absolute top-1/2 right-2 size-12 -translate-y-1/2"
                onClick={() => navigate(1)}
                aria-label="Next photo"
              >
                <ChevronRightIcon />
              </Button>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};
