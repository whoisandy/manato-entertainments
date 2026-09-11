import { SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { buildSteps } from "@/lib/content";

export const About = () => (
  <section
    aria-labelledby="about-title"
    className="border-hairline scroll-mt-24 border-t"
    id="about"
  >
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeading
          id="about-title"
          kicker="Who we are"
          lead="Manato Entertainments is a live music house. We don't book acts and hope for the best — we build each evening around a single theme, and hand it to singers who carry it from first song to encore."
          title="Evenings built like concerts, not playlists."
        />
      </Reveal>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="text-ash space-y-6 text-base leading-relaxed">
            <p>
              Every Manato night honours one body of music. It might be the film
              songs of a single composer, a golden era of two studios, or two
              maestros — Ilaiyaraaja and A. R. Rahman — sharing one stage for a
              night.
            </p>
            <p>
              Twenty to thirty songs per theme. Every song sung live by our
              hand-picked singers, and every song that was born a duet is sung
              as a duet, with a co-singer on stage. Nothing is playback. Nothing
              is filler.
            </p>
            <p className="border-gold-500 font-display text-bone border-l-2 pl-5 text-lg italic">
              &ldquo;We don&apos;t stage playlists. We stage the songs people
              ask for on their way home.&rdquo;
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <h3 className="text-gold-400 font-mono text-[13px] tracking-[0.05em] uppercase">
              How a Manato night is built
            </h3>
            <ul className="mt-6">
              {buildSteps.map((step) => (
                <li
                  className="border-hairline grid grid-cols-[3rem_1fr] gap-x-4 border-t py-6 first:border-t-0 first:pt-0"
                  key={step.index}
                >
                  <span className="text-gold-400 font-mono text-[13px] tracking-[0.05em]">
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
