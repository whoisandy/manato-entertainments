"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

import { Stagger, StaggerItem } from "@/components/reveal";
import { VideoModal } from "@/components/video-modal";
import type { VideoItem } from "@/lib/content";

const PlayGlyph = () => (
  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <svg
      aria-hidden="true"
      className="text-crest-400 size-10 opacity-90 transition-opacity duration-200 group-hover:opacity-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 48 48"
    >
      <circle cx="24" cy="24" r="22" />
      <path d="M20 16l12 8-12 8V16z" fill="currentColor" stroke="none" />
    </svg>
  </span>
);

interface VideoGalleryProps {
  videos: VideoItem[];
}

export const VideoGallery = ({ videos }: VideoGalleryProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openByIndex = (event: MouseEvent<HTMLButtonElement>) => {
    lastTriggerRef.current = event.currentTarget;
    setOpenIndex(Number(event.currentTarget.dataset.index ?? 0));
  };

  useEffect(() => {
    if (openIndex !== null) {
      return;
    }
    lastTriggerRef.current?.focus();
    lastTriggerRef.current = null;
  }, [openIndex]);

  return (
    <>
      <Stagger
        as="ul"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
      >
        {videos.map((video, index) => (
          <StaggerItem as="li" index={index} key={video.id}>
            <button
              type="button"
              data-index={index}
              onClick={openByIndex}
              aria-label={`Play video ${index + 1} of ${videos.length}: ${video.title}`}
              className="group border-hairline hover:border-crest-500/40 relative block w-full overflow-hidden border transition-colors duration-200"
            >
              <span className="bg-panel relative block aspect-3/2 w-full">
                <Image
                  src={video.poster}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
                {/* Subtle scrim so the play glyph pops off busy posters. */}
                <span
                  aria-hidden="true"
                  className="bg-stage/40 absolute inset-0"
                />
                <PlayGlyph />
              </span>
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <VideoModal
        videos={videos}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={(next) => setOpenIndex(next)}
      />
    </>
  );
};
