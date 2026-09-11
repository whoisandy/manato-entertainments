import { Gallery } from "@/components/gallery";
import { SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { photos } from "@/lib/content";

export const GallerySection = () => (
  <section
    aria-labelledby="gallery-title"
    className="border-hairline scroll-mt-24 border-t"
    id="gallery"
  >
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeading
          id="gallery-title"
          kicker="The archive"
          lead="Stills from our editions — house lights, full rooms, and the moments between songs. Tap any frame to view it."
          title="Nights we still hear."
        />
      </Reveal>
      <Reveal delay={120}>
        <Gallery images={photos} />
      </Reveal>
    </div>
  </section>
);
