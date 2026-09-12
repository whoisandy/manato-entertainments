"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

import { Stagger, StaggerItem } from "@/components/reveal";
import { SharedModal } from "@/components/shared-modal";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Photo } from "@/lib/content";

interface GalleryProps {
  images: Photo[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const openIndexRef = useRef<number | null>(null);
  openIndexRef.current = openIndex;

  const openByIndex = (event: MouseEvent<HTMLButtonElement>) => {
    lastTriggerRef.current = event.currentTarget;
    setDirection(1);
    setOpenIndex(Number(event.currentTarget.dataset.index ?? 0));
  };

  const changePhoto = (next: number) => {
    const { current } = openIndexRef;
    if (current !== null && next !== current) {
      setDirection(next > current ? 1 : -1);
    }
    setOpenIndex(next);
  };

  const navigate = useCallback(
    (step: 1 | -1) => {
      setDirection(step);
      setOpenIndex((current) => {
        if (current === null) {
          return current;
        }
        const next = current + step;
        return next < 0 || next >= images.length ? current : next;
      });
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
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
      }
      navigate(event.key === "ArrowLeft" ? -1 : 1);
    };
    // Capture phase: the Base UI dialog swallows keydown during bubbling,
    // so bubble-phase window listeners never see ←/→.
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [openIndex, navigate]);

  const image = openIndex === null ? undefined : images.at(openIndex);

  return (
    <>
      <Stagger
        as="ul"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
      >
        {images.map((photo, index) => (
          <StaggerItem as="li" index={index} key={photo.src}>
            <button
              type="button"
              data-index={index}
              onClick={openByIndex}
              aria-label={`View photo ${index + 1} of ${images.length}: ${photo.alt}`}
              className="group border-hairline hover:border-crest-500/40 block w-full overflow-hidden border transition-colors duration-200"
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
          </StaggerItem>
        ))}
      </Stagger>

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
          className="gallery-lightbox flex h-dvh w-full max-w-none items-center justify-center gap-0 rounded-none bg-transparent p-0 ring-0 sm:max-w-none"
        >
          <DialogTitle className="sr-only">
            {image ? image.alt : "Photo viewer"}
          </DialogTitle>
          {image && openIndex !== null ? (
            <SharedModal
              index={openIndex}
              photos={images}
              direction={direction}
              onChange={changePhoto}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};
