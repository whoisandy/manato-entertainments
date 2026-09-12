import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { SocialButtons } from "@/components/social-buttons";
import { site } from "@/lib/content";

export const Contact = () => (
  <section
    aria-labelledby="contact-title"
    className="border-hairline section-glow section-glow-contact scroll-mt-20 border-t md:scroll-mt-[88px]"
    id="contact"
  >
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div>
            <SectionHeading
              accent="Our Expertise."
              compact
              id="contact-title"
              kicker="Tell Us What You Have in Mind"
              lead="One unforgettable experience. What are you imagining? A celebration? A brand experience? A special collaboration? Whatever the idea, let’s build something people will remember."
              title="Your Idea."
            />

            <a
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
            </a>

            <dl className="mt-12 space-y-8">
              <div>
                <dt className="text-crest-400 font-mono text-[13px] tracking-[0.05em] uppercase">
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
                <dt className="text-crest-400 font-mono text-[13px] tracking-[0.05em] uppercase">
                  Follow MANATO
                </dt>
                <dd className="mt-2">
                  <SocialButtons />
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
