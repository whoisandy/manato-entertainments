import { SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { buttonClass } from "@/lib/button";
import { audiences, eventFormats, featuredEvent } from "@/lib/content";

export const Events = () => (
  <section
    aria-labelledby="events-title"
    className="border-hairline scroll-mt-20 border-t md:scroll-mt-[88px]"
    id="events"
  >
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeading
          id="events-title"
          kicker="What We Do"
          lead="We create and manage entertainment experiences across different formats and scales, bringing the same care to an intimate gathering as to a larger production."
          title="Experiences Designed"
          accent="to Be Remembered"
        />
      </Reveal>

      <Reveal>
        <article className="border-beam border-hairline bg-panel grid gap-10 border p-6 sm:p-8 md:grid-cols-2 md:gap-12 md:p-10">
          <div>
            <p className="text-crest-400 flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase">
              <span aria-hidden="true" className="bg-crest-500 h-px w-6" />
              {featuredEvent.kicker}
            </p>
            <h3 className="font-display text-bone mt-5 text-3xl leading-tight tracking-[-0.015em] md:text-4xl">
              {featuredEvent.title}
            </h3>
            <p className="font-display text-crest-300 mt-2 text-lg italic">
              {featuredEvent.subtitle}
            </p>
            <p className="text-ash mt-6 text-base leading-relaxed">
              {featuredEvent.description}
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {featuredEvent.meta.map((chip) => (
                <li
                  className="border-hairline bg-crest-wash text-crest-300 border px-3 py-1.5 font-mono text-[13px] tracking-[0.05em]"
                  key={chip.label}
                >
                  {chip.label}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className={buttonClass("primary")}>
                Plan a Live Event
              </a>
            </div>
            <p className="text-dust mt-6 text-sm">{featuredEvent.note}</p>
          </div>

          <div>
            <h4 className="text-crest-400 font-mono text-[13px] tracking-[0.05em] uppercase">
              Who We Create For
            </h4>
            <ol className="mt-4">
              {audiences.map((entry, index) => (
                <li
                  className="border-hairline flex items-baseline gap-4 border-t py-4 first:border-t-0 first:pt-2"
                  key={entry.title}
                >
                  <span className="text-crest-400 font-mono text-[13px] tracking-[0.05em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-bone text-lg">
                      {entry.title}
                    </p>
                    <p className="text-ash mt-1 text-sm">{entry.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-dust mt-6 text-sm">
              An event begins with an idea. It comes alive through people.
            </p>
          </div>
        </article>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-16 md:mt-20">
          <h3 className="text-crest-400 font-mono text-[13px] tracking-[0.05em] uppercase">
            More Ways to Create an Experience
          </h3>
          <ul className="mt-6">
            {eventFormats.map((format) => (
              <li
                className="border-hairline hover:bg-panel -mx-2 grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-1 border-t px-2 py-5 transition-colors duration-200 md:grid-cols-[12rem_1fr]"
                key={format.title}
              >
                <h4 className="font-display text-bone text-xl">
                  {format.title}
                </h4>
                <p className="text-dust col-start-2 text-sm md:col-start-2">
                  {format.body}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-crest-300 font-display mt-10 text-lg italic">
            Think Bigger. Plan Smarter. Execute Better.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);
