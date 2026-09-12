"use client";

import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import {
  MediaController,
  MediaControlBar,
  MediaFullscreenButton,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import {
  AnimatePresence,
  m,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useEffect } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { VideoItem } from "@/lib/content";

interface VideoModalProps {
  videos: VideoItem[];
  openIndex: number | null;
  onClose: () => void;
  onChange: (next: number) => void;
}

const circleButton =
  "pointer-events-auto rounded-full border-hairline-strong bg-panel p-2 text-bone/75 backdrop-blur-lg transition-colors duration-200 hover:bg-elevated hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver-400";

const chevronButton =
  "pointer-events-auto absolute top-[calc(50%-16px)] rounded-full border-hairline-strong bg-panel p-3 text-bone/75 backdrop-blur-lg transition-colors duration-200 hover:bg-elevated hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver-400";

export const VideoModal = ({
  videos,
  openIndex,
  onClose,
  onChange,
}: VideoModalProps) => {
  const index = openIndex ?? 0;
  const reduceMotion = useReducedMotion() ?? false;
  const video = videos.at(index);

  /* ←/→ switch clips (image-lightbox parity). The player's own hotkeys are
     disabled (noHotkeys) so the arrows are not double-handled as seeks. */
  useEffect(() => {
    if (openIndex === null) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        onChange(index - 1);
      }
      if (event.key === "ArrowRight" && index + 1 < videos.length) {
        event.preventDefault();
        onChange(index + 1);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [openIndex, index, videos.length, onChange]);

  if (openIndex === null || !video) {
    return null;
  }

  return (
    <Dialog
      open={openIndex !== null}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="gallery-lightbox flex h-dvh w-full max-w-none items-center justify-center gap-0 rounded-none bg-transparent p-0 ring-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">{video.title}</DialogTitle>
        <MotionConfig
          transition={{
            opacity: { duration: reduceMotion ? 0 : 0.2 },
            x: reduceMotion
              ? { duration: 0 }
              : { damping: 30, stiffness: 300, type: "spring" },
          }}
        >
          <div className="relative z-50 flex h-dvh w-full items-center justify-center">
            {/* key={src} remounts the player per clip — the cleanest reset of
                playback state across clips (media-chrome guidance). */}
            <MediaController
              key={video.src}
              noHotkeys
              className="mx-auto max-h-[76dvh] w-auto max-w-[min(100%,80rem)]"
            >
              <video
                slot="media"
                src={video.src}
                poster={video.poster}
                autoPlay
                playsInline
                preload="auto"
                className="block max-h-[76dvh] w-auto max-w-full object-contain"
              >
                {/* biome-ignore lint/a11y/useMediaCaption: user-supplied event clips ship without caption assets */}
                <track kind="captions" />
              </video>
              <MediaControlBar>
                <MediaPlayButton />
                <MediaSeekBackwardButton seekOffset={10} />
                <MediaSeekForwardButton seekOffset={10} />
                <MediaTimeRange />
                <MediaTimeDisplay showDuration />
                <MediaMuteButton />
                <MediaVolumeRange />
                <MediaFullscreenButton />
              </MediaControlBar>
            </MediaController>

            {/* Controls pinned to the viewport corners — fixed positions
                across every clip, always above the player. */}
            <div className="pointer-events-none absolute inset-0">
              {index > 0 ? (
                <button
                  type="button"
                  className={`${chevronButton} left-3`}
                  onClick={() => onChange(index - 1)}
                  aria-label="Previous video"
                >
                  <ChevronLeftIcon className="size-6" />
                </button>
              ) : null}
              {index + 1 < videos.length ? (
                <button
                  type="button"
                  className={`${chevronButton} right-3`}
                  onClick={() => onChange(index + 1)}
                  aria-label="Next video"
                >
                  <ChevronRightIcon className="size-6" />
                </button>
              ) : null}

              <div className="pointer-events-auto absolute top-0 right-0 flex items-center gap-2 p-3">
                <DialogClose
                  render={
                    <button
                      type="button"
                      className={circleButton}
                      aria-label="Close video player"
                    />
                  }
                >
                  <XIcon className="size-5" />
                </DialogClose>
              </div>
            </div>

            {/* Filmstrip — same sliding-window mechanism as the image
                lightbox, fed by the real poster frames; lives INSIDE the
                stage's z-50 stacking context so it paints above the player. */}
            <div className="to-stage/80 fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-linear-to-b from-transparent">
              <m.div
                initial={false}
                className="mx-auto mt-6 mb-6 flex aspect-3/2 h-14"
              >
                <AnimatePresence initial={false}>
                  {videos.map((thumb, id) => (
                    <m.button
                      key={thumb.id}
                      type="button"
                      initial={{ width: "0%", x: `${index * -100}%` }}
                      animate={{
                        scale: id === index ? 1.25 : 1,
                        width: "100%",
                        x: `${index * -100}%`,
                      }}
                      exit={{ width: "0%" }}
                      onClick={() => onChange(id)}
                      aria-label={`Play video ${id + 1} of ${videos.length}: ${thumb.title}`}
                      aria-current={id === index}
                      className={`${id === index ? "z-20 rounded-md shadow-lg shadow-black/50" : "z-10"} ${
                        id === 0 ? "rounded-l-md" : ""
                      } ${
                        id === videos.length - 1 ? "rounded-r-md" : ""
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
                        src={thumb.poster}
                      />
                    </m.button>
                  ))}
                </AnimatePresence>
              </m.div>
            </div>
          </div>
        </MotionConfig>
      </DialogContent>
    </Dialog>
  );
};
