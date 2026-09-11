import { HeroBackdrop } from "@/components/hero-backdrop";
import { buttonClass, Kicker } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { stats } from "@/lib/content";

export const Hero = () => (
  <section
    aria-labelledby="hero-title"
    className="grain relative overflow-hidden"
    id="top"
  >
    <HeroBackdrop />

    <div className="relative mx-auto w-full max-w-6xl px-4 pt-36 pb-20 sm:px-6 md:pt-44 md:pb-28">
      <Reveal>
        <Kicker>Chennai · Live music, curated by theme</Kicker>
      </Reveal>

      <Reveal delay={100}>
        <h1
          className="font-display text-bone mt-6 max-w-4xl text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.08] tracking-[-0.02em]"
          id="hero-title"
        >
          One theme. One night.{" "}
          <em className="text-gold-300 italic">Every song, live.</em>
        </h1>
      </Reveal>

      <Reveal delay={180}>
        <p className="text-ash mt-8 max-w-2xl text-lg leading-relaxed">
          Manato Entertainments stages tribute evenings for the songs you grew
          up on — a composer, a pairing, a golden era — twenty to thirty songs,
          sung live, one song at a time. Grand stages. Golden memories.
        </p>
      </Reveal>

      <Reveal delay={260}>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#events" className={buttonClass("primary")}>
            See our events
          </a>
          <a href="#gallery" className={buttonClass("ghost")}>
            Explore the gallery
          </a>
        </div>
      </Reveal>

      <Reveal delay={340}>
        <dl className="border-hairline bg-hairline mt-16 grid grid-cols-2 gap-px border md:mt-20 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.index} className="bg-stage p-6 md:p-8">
              <span className="text-gold-400 font-mono text-[13px] tracking-[0.05em]">
                {stat.index}
              </span>
              <p className="font-display text-bone mt-3 text-3xl md:text-4xl">
                {stat.value}
              </p>
              <p className="text-ash mt-1 text-sm">{stat.label}</p>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </section>
);
