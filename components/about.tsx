import { LightBeams } from "@/components/light-beams";
import { SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { differenceSteps } from "@/lib/content";

export const About = () => (
  <section
    aria-labelledby="about-title"
    className="border-hairline section-glow section-glow-about scroll-mt-20 border-t md:scroll-mt-[88px]"
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
      className="section-fx mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-72 md:h-[28rem]"
    >
      <LightBeams />
    </div>
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
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
            <h3 className="text-crest-400 font-mono text-[13px] tracking-[0.05em] uppercase">
              The MANATO Difference
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
