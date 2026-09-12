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
          className="border-hairline section-glow section-glow-faq scroll-mt-20 border-t md:scroll-mt-[88px]"
          id="faq"
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <Reveal>
              <SectionHeading
                id="faq-title"
                kicker="Questions, Answered"
                lead="Planning an event, exploring a partnership or looking to get involved? Start here. For anything else, get in touch."
                title="Let’s Make Things"
                accent="Clear"
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
