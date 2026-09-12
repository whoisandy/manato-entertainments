import { LightBeams } from "@/components/light-beams";
import { SectionHeading } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionFloorLight } from "@/components/section-floor-light";
import { differenceSteps } from "@/lib/content";

export const About = () => (
  <section
    aria-labelledby="about-title"
    className="border-hairline section-glow section-glow-about border-t"
    id="about"
  >
    {/* Signature atmosphere: a beam field flowing top → bottom, left →
        right over a top-edge light pool (DESIGN.md §5/§7). */}
    <div
      aria-hidden="true"
      className="section-fx absolute inset-x-0 top-0 h-52 bg-[radial-gradient(55%_200px_at_50%_0%,rgba(247,248,252,0.14),transparent)]"
    />
    <div
      aria-hidden="true"
      className="section-fx mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-72 md:h-112"
    >
      <LightBeams />
    </div>
    {/* Floor light at the section's bottom edge — quiet separation from
        the next section, mirroring the top pool at lower alpha. */}
    <SectionFloorLight />
    <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-20 sm:px-6 md:pt-20 md:pb-28">
      <Reveal>
        <SectionHeading
          id="about-title"
          kicker="Get to Know Us"
          lead="Built for the stage. Trusted by artists. Remembered by audiences."
          title="Built on a Dream."
          accent="Driven by a Team."
        />
      </Reveal>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="text-ash space-y-6 text-base leading-relaxed">
            <p>
              MANATO Entertainments began with four people, one shared belief,
              and a simple idea — every event should become an experience that
              stays with people.
            </p>
            <p>
              From the beginning, we wanted to create more than just events. We
              wanted to build moments that bring artists and audiences closer,
              create genuine excitement, and leave a lasting impression long
              after the lights go down.
            </p>
            <p>
              We started with small events, learning the craft one experience at
              a time. Every show taught us something new — about audiences,
              artists, production, partnerships, storytelling, and the countless
              details that transform a live performance into something
              unforgettable.
            </p>
            <p>
              Those early experiences became the foundation of the team we are
              today. And we are only getting started.
            </p>
            <p>
              Today, MANATO brings that foundation to concerts, corporate
              events, celebrity appearances, meet &amp; greets, celebrations and
              brand experiences.
            </p>
            <p className="border-crest-500 font-display text-bone border-l-2 pl-5 text-lg italic">
              &ldquo;Our journey is still young. Our vision is not.&rdquo;
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <h3 className="text-crest-400 text-[13px] tracking-wider uppercase">
              The MANATO Difference
            </h3>
            <Stagger as="ul" className="mt-6">
              {differenceSteps.map((step, index) => (
                <StaggerItem
                  as="li"
                  index={index}
                  className="border-hairline grid grid-cols-[3rem_1fr] items-baseline gap-x-4 border-t py-6 first:border-t-0 first:pt-0"
                  key={step.index}
                >
                  <span className="text-crest-400 text-[13px] tracking-wider">
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
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
