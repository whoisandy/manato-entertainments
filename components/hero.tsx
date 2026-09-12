import { HeroBackdrop } from "@/components/hero-backdrop";
import { Kicker } from "@/components/primitives";
import { StageDust } from "@/components/stage-dust";
import { buttonClass } from "@/lib/button";
import { highlights } from "@/lib/content";

// Hero content renders statically — above-the-fold elements must never be
// gated behind a JS-driven reveal (it delays LCP paint until hydration).
// The photo cross-fade provides the section's entrance.
export const Hero = () => (
  <section
    aria-labelledby="hero-title"
    className="grain relative overflow-hidden"
    id="top"
  >
    <HeroBackdrop />
    <StageDust className="absolute inset-x-0 bottom-0 h-56 md:h-80" />

    <div className="relative mx-auto w-full max-w-6xl px-4 pt-36 pb-20 sm:px-6 md:pt-44 md:pb-28">
      <Kicker>Entertainment &amp; Event Management</Kicker>

      <h1
        className="font-display text-bone mt-6 max-w-4xl text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.08] tracking-[-0.02em]"
        id="hero-title"
      >
        Where Entertainment{" "}
        <em className="text-crest-300 italic">Meets Experience</em>
      </h1>

      <p className="text-shimmer mt-4 font-mono text-sm tracking-[0.05em] uppercase">
        Creating Moments. Connecting People. Building a Legacy.
      </p>

      <p className="text-ash mt-8 max-w-2xl text-lg leading-relaxed">
        From intimate celebrations to live concerts, corporate events and brand
        activations, Manato brings creative thinking, thoughtful planning and
        strong execution together to create experiences people remember and
        brands value.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <a
          href="#contact"
          className={`${buttonClass("primary")} w-full justify-center sm:w-auto`}
        >
          Plan an Event
        </a>
        <a
          href="#events"
          className={`${buttonClass("ghost")} w-full justify-center sm:w-auto`}
        >
          Explore Our Experiences
        </a>
      </div>

      <div className="border-hairline bg-hairline mt-16 grid grid-cols-2 gap-px border md:mt-20 md:grid-cols-4">
        {highlights.map((highlight) => (
          <div className="bg-panel p-6 md:p-8" key={highlight.label}>
            <p className="font-display text-bone text-3xl leading-tight md:text-4xl">
              {highlight.value}
            </p>
            <p className="text-ash mt-2 text-sm">{highlight.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
