"use client";

import { Gallery } from "@/components/gallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoGallery } from "@/components/video-gallery";
import type { Photo, VideoItem } from "@/lib/content";

interface GalleryTabsProps {
  images: Photo[];
  videos: VideoItem[];
}

/** Sharp-cornered triggers; the active one wears the strapline's glass
 *  treatment (washed bone gradient + blur + hairline-strong edge) instead
 *  of the old white pill. */
const triggerClass =
  "border-transparent data-active:border-hairline-strong! data-active:bg-[linear-gradient(135deg,rgba(247,248,252,0.22),rgba(247,248,252,0.07))]! data-active:text-bone! data-active:backdrop-blur-lg text-ash hover:text-bone h-9 flex-1 rounded-none border px-6 text-sm font-medium transition-colors duration-200 after:hidden sm:flex-none";

export const GalleryTabs = ({ images, videos }: GalleryTabsProps) => (
  <Tabs defaultValue="photos">
    <TabsList
      className="mb-8 inline-flex w-full items-center gap-2 bg-transparent p-0 group-data-horizontal/tabs:h-auto sm:w-fit"
      variant="line"
    >
      <TabsTrigger className={triggerClass} value="photos">
        Photos
      </TabsTrigger>
      <TabsTrigger className={triggerClass} value="videos">
        Videos
      </TabsTrigger>
    </TabsList>

    <TabsContent value="photos">
      <Gallery images={images} />
    </TabsContent>

    <TabsContent value="videos">
      <VideoGallery videos={videos} />
    </TabsContent>
  </Tabs>
);
