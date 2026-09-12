"use client";

import { Gallery } from "@/components/gallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Photo, VideoItem } from "@/lib/content";

interface GalleryTabsProps {
  images: Photo[];
  videos: VideoItem[];
}

const PlayGlyph = () => (
  <svg
    aria-hidden="true"
    className="text-crest-400 size-10"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 48 48"
  >
    <circle cx="24" cy="24" r="22" />
    <path d="M20 16l12 8-12 8V16z" fill="currentColor" stroke="none" />
  </svg>
);

const VideoPlaceholderCard = ({ video }: { video: VideoItem }) => (
  <div
    aria-label="Video placeholder"
    role="img"
    className="border-hairline bg-panel flex flex-col items-center justify-center border transition-colors duration-200"
  >
    <div className="flex aspect-[3/2] w-full flex-col items-center justify-center gap-3">
      <PlayGlyph />
      <p className="text-ash px-4 text-center text-sm">{video.title}</p>
    </div>
  </div>
);

export const GalleryTabs = ({ images, videos }: GalleryTabsProps) => (
  <Tabs defaultValue="photos">
    <TabsList
      className="mb-8 inline-flex w-full items-center gap-2 bg-transparent p-0 group-data-horizontal/tabs:h-auto sm:w-fit"
      variant="line"
    >
      <TabsTrigger
        className="data-active:bg-bone! data-active:text-stage! text-ash hover:text-bone h-9 flex-1 rounded-full px-6 text-sm font-medium transition-colors duration-200 after:hidden sm:flex-none"
        value="photos"
      >
        Photos
      </TabsTrigger>
      <TabsTrigger
        className="data-active:bg-bone! data-active:text-stage! text-ash hover:text-bone h-9 flex-1 rounded-full px-6 text-sm font-medium transition-colors duration-200 after:hidden sm:flex-none"
        value="videos"
      >
        Videos
      </TabsTrigger>
    </TabsList>

    <TabsContent value="photos">
      <p className="text-dust mb-6 text-sm">Select an image to view it.</p>
      <Gallery images={images} />
    </TabsContent>

    <TabsContent value="videos">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {videos.map((video) => (
          <li key={video.id}>
            <VideoPlaceholderCard video={video} />
          </li>
        ))}
      </ul>
    </TabsContent>
  </Tabs>
);
