import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Events } from "@/components/events";
import { Faq } from "@/components/faq";
import { GallerySection } from "@/components/gallery-section";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Events />
        <GallerySection />
        <section
          aria-labelledby="faq-title"
          className="border-hairline scroll-mt-24 border-t"
          id="faq"
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <Reveal>
              <SectionHeading
                id="faq-title"
                kicker="Questions"
                lead="We tried to answer everything. If we missed something, the form below is open."
                title="Got a question?"
              />
            </Reveal>
            <Reveal delay={120}>
              <Faq />
            </Reveal>
          </div>
        </section>
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
