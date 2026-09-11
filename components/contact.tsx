import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/content";

export const Contact = () => (
  <section
    aria-labelledby="contact-title"
    className="border-hairline scroll-mt-24 border-t"
    id="contact"
  >
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeading
          id="contact-title"
          kicker="Get in touch"
          lead="Private celebrations, corporate nights, singer auditions, or a question about the next edition — write to us."
          title="Plan an evening with us."
        />
      </Reveal>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <dl className="space-y-8">
            <div>
              <dt className="text-gold-400 font-mono text-[13px] tracking-[0.05em] uppercase">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  className="text-bone hover:text-gold-300 transition-colors duration-200"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-gold-400 font-mono text-[13px] tracking-[0.05em] uppercase">
                Phone
              </dt>
              <dd className="mt-1">
                <a
                  className="text-bone hover:text-gold-300 transition-colors duration-200"
                  href={`tel:${site.phoneHref}`}
                >
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-gold-400 font-mono text-[13px] tracking-[0.05em] uppercase">
                Studio
              </dt>
              <dd className="text-bone mt-1">{site.address}</dd>
            </div>
            <div>
              <dt className="text-gold-400 font-mono text-[13px] tracking-[0.05em] uppercase">
                Follow
              </dt>
              <dd className="mt-1 flex gap-6">
                {site.socials.map((social) => (
                  <a
                    className="text-bone hover:text-gold-300 transition-colors duration-200"
                    href={social.href}
                    key={social.label}
                  >
                    {social.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  </section>
);
