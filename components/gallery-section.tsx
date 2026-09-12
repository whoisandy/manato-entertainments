import { Gallery } from "@/components/gallery";
import { SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { photos } from "@/lib/content";

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
          kicker="The Manato Gallery"
          lead="A glimpse into the people, connections and shared moments behind Manato. Explore the gallery for a closer look at our journey."
          title="Moments"
          accent="That Bring Us Together"
        />
      </Reveal>
      <Reveal delay={60}>
        <p className="text-dust mb-6 text-sm">Select an image to view it.</p>
      </Reveal>
      <Reveal delay={120}>
        <Gallery images={photos} />
      </Reveal>
    </div>
  </section>
);
