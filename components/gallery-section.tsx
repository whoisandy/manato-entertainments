import { GalleryTabs } from "@/components/gallery-tabs";
import { SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { photos, videos } from "@/lib/content";

export const GallerySection = () => (
  <section
    aria-labelledby="gallery-title"
    className="border-hairline section-glow section-glow-gallery scroll-mt-20 border-t md:scroll-mt-[88px]"
    id="gallery"
  >
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeading
          id="gallery-title"
          kicker="The MANATO Gallery"
          lead="A glimpse into the people, connections and shared moments behind Manato. Explore the gallery for a closer look at our journey."
          title="Moments"
          accent="That Bring Us Together"
        />
      </Reveal>
      <Reveal delay={120}>
        <GalleryTabs images={photos} videos={videos} />
      </Reveal>
    </div>
  </section>
);
