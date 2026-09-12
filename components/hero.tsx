import { ArrowRightIcon, CalendarPlusIcon } from "lucide-react";

import { HeroBackdrop } from "@/components/hero-backdrop";
import { Kicker } from "@/components/primitives";
import { StageDust } from "@/components/stage-dust";
import { buttonClass } from "@/lib/button";

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
        Grand Stages, <br />
        <em className="text-crest-300 italic">Golden Memories</em>
      </h1>

      <p className="text-shimmer mt-4 font-mono text-sm tracking-wider uppercase">
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
          <CalendarPlusIcon aria-hidden="true" className="size-4" />
          Plan an Event
        </a>
        <a
          href="#events"
          className={`${buttonClass("ghost")} w-full justify-center sm:w-auto`}
        >
          <ArrowRightIcon aria-hidden="true" className="size-4" />
          Explore Our Experiences
        </a>
      </div>
    </div>
  </section>
);
