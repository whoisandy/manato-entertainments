import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { SocialButtons } from "@/components/social-buttons";
import { site } from "@/lib/content";

export const Contact = () => (
  <section
    aria-labelledby="contact-title"
    className="border-hairline scroll-mt-20 border-t md:scroll-mt-[88px]"
    id="contact"
  >
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div>
            <SectionHeading
              accent="What You Have in Mind"
              compact
              id="contact-title"
              kicker="Let’s Create Something Memorable"
              lead="Planning a celebration, bringing a brand experience to life, exploring a partnership or looking to collaborate? Start a conversation with Manato."
              title="Tell Us"
            />

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
                  Follow Manato
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
