import { SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { differenceSteps } from "@/lib/content";

export const About = () => (
  <section
    aria-labelledby="about-title"
    className="border-hairline scroll-mt-20 border-t md:scroll-mt-[88px]"
    id="about"
  >
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeading
          id="about-title"
          kicker="Get to Know Us"
          lead="Manato Entertainments began with four people and one shared belief: a great event creates an experience that stays with people."
          title="Built on a Dream."
          accent="Driven by a Team."
        />
      </Reveal>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="text-ash space-y-6 text-base leading-relaxed">
            <p>
              Bringing different strengths and perspectives together, our
              founders set out to build something they could grow with purpose.
            </p>
            <p>
              Our journey started with small events. Each one taught us more
              about audiences, artists, production, partnerships and the details
              that bring an experience to life. Those early experiences became
              the foundation of a passionate, growing team.
            </p>
            <p>
              Today, we bring that foundation to concerts, corporate events,
              celebrity meet &amp; greets, celebrations and brand experiences.
              We are building Manato for the long term, with the ambition to
              take on bigger ideas, reach new audiences and earn trust through
              every experience we create.
            </p>
            <p className="border-crest-500 font-display text-bone border-l-2 pl-5 text-lg italic">
              &ldquo;Our journey is still young. Our vision is not.&rdquo;
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <h3 className="text-crest-400 font-mono text-[13px] tracking-[0.05em] uppercase">
              The Manato Difference
            </h3>
            <ul className="mt-6">
              {differenceSteps.map((step) => (
                <li
                  className="border-hairline grid grid-cols-[3rem_1fr] gap-x-4 border-t py-6 first:border-t-0 first:pt-0"
                  key={step.index}
                >
                  <span className="text-crest-400 font-mono text-[13px] tracking-[0.05em]">
                    {step.index}
                  </span>
                  <div>
                    <h4 className="font-display text-bone text-lg">
                      {step.title}
                    </h4>
                    <p className="text-ash mt-2 text-sm leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
