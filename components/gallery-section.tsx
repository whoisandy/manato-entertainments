import { GalleryTabs } from "@/components/gallery-tabs";
import { LightBeams } from "@/components/light-beams";
import { SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { SectionFloorLight } from "@/components/section-floor-light";
import { photos, videos } from "@/lib/content";

export const GallerySection = () => (
  <section
    aria-labelledby="gallery-title"
    className="border-hairline section-glow section-glow-gallery border-t"
    id="gallery"
  >
    {/* Beam field: 51 light threads flowing top → bottom, left to right,
        dissolving before the gallery content (DESIGN.md §5). */}
    <div
      aria-hidden="true"
      className="section-fx mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-72 md:h-104"
    >
      <LightBeams />
    </div>
    <SectionFloorLight />
    <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-20 sm:px-6 md:pt-20 md:pb-28">
      <Reveal>
        <SectionHeading
          id="gallery-title"
          kicker="The MANATO Gallery"
          lead="A glimpse into the people, connections and shared moments behind Manato. Explore the gallery for a closer look at our journey."
          title="Moments That"
          accent="Bring Us Together"
        />
      </Reveal>
      <GalleryTabs images={photos} videos={videos} />
    </div>
  </section>
);
