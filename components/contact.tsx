import { ContactForm } from "@/components/contact-form";
import { ParticleNetwork } from "@/components/particle-network";
import { SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/content";

export const Contact = () => (
  <section
    aria-labelledby="contact-title"
    className="border-hairline section-glow section-glow-contact border-t"
    id="contact"
  >
    {/* Quiet counterweight to the About strip: a subtle particle field
        fading upward from the section's bottom edge (DESIGN.md §5). */}
    <div
      aria-hidden="true"
      className="section-fx mask-fade-t pointer-events-none absolute inset-x-0 bottom-0 h-64 md:h-80"
    >
      <ParticleNetwork intensity={0.65} />
    </div>
    {/* Stage light pooled at the section's bottom edge — the footer band's
        radial treatment, moved up as an overlay so it plays over the
        particle field instead of the footer carrying it (DESIGN.md §5). */}
    <div
      aria-hidden="true"
      className="section-fx pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(35%_128px_at_50%_100%,rgba(247,248,252,0.08),transparent)]"
    />
    <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-20 sm:px-6 md:pt-20 md:pb-28">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div>
            <SectionHeading
              accent="Our Expertise."
              compact
              id="contact-title"
              kicker="Tell Us What You Have in Mind"
              lead="One unforgettable experience. Whether it’s a celebration, brand experience or special collaboration, let’s turn your idea into something people will remember."
              title="Your Idea."
            />

            {/*<a
              className="text-ash hover:text-crest-300 group inline-flex items-center gap-2 text-sm transition-colors duration-200"
              href="#contact-form"
            >
              <span
                aria-hidden="true"
                className="text-crest-400 transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
              Fill in the form with all the necessary information
            </a>*/}

            <dl className="mt-12 space-y-8">
              <div>
                <dt className="text-crest-400 text-[13px] tracking-wider uppercase">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    className="text-bone hover:text-crest-300 transition-colors duration-200"
                    href={`mailto:${site.email}`}
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-crest-400 text-[13px] tracking-wider uppercase">
                  Call
                </dt>
                <dd className="mt-1">
                  <a
                    className="text-bone hover:text-crest-300 transition-colors duration-200"
                    href={`tel:${site.phone.replaceAll(" ", "")}`}
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  </section>
);
