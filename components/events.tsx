import { CalendarPlusIcon } from "lucide-react";

import { DottedGlowCorner } from "@/components/dotted-glow";
import { SectionHeading } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionFloorLight } from "@/components/section-floor-light";
import { buttonClass } from "@/lib/button";
import { audiences, eventFormats, featuredEvent } from "@/lib/content";

export const Events = () => (
  <section
    aria-labelledby="events-title"
    className="border-hairline section-glow section-glow-events border-t"
    id="events"
  >
    <SectionFloorLight />
    <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-20 sm:px-6 md:pt-20 md:pb-28">
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
          {/* Dotted glow corners: top-left + bottom-right at every
              breakpoint (DESIGN.md §5). First child so card content paints
              above both fields. */}
          <DottedGlowCorner />
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
            <Stagger as="ul" className="mt-8 flex flex-wrap gap-3" delay={200}>
              {featuredEvent.meta.map((chip, chipIndex) => (
                <StaggerItem
                  as="li"
                  index={chipIndex}
                  className="border-hairline bg-crest-wash text-crest-300 border px-3 py-1.5 text-[13px] tracking-wider"
                  key={chip.label}
                >
                  {chip.label}
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className={buttonClass("primary")}>
                <CalendarPlusIcon aria-hidden="true" className="size-4" />
                Plan a Live Event
              </a>
            </div>
            <p className="text-dust mt-6 text-sm">{featuredEvent.note}</p>
          </div>

          <div>
            <h4 className="text-crest-400 text-[13px] tracking-wider uppercase">
              Who We Create For
            </h4>
            <Stagger as="ol" className="mt-4">
              {audiences.map((entry, index) => (
                <StaggerItem
                  as="li"
                  index={index}
                  className="border-hairline grid grid-cols-[3rem_1fr] items-baseline gap-x-4 border-t py-4 first:border-t-0 first:pt-2"
                  key={entry.title}
                >
                  <span className="text-crest-400 text-[13px] tracking-wider">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-bone text-lg">
                      {entry.title}
                    </p>
                    <p className="text-ash mt-1 text-sm">{entry.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="text-dust mt-6 text-sm">
              An event begins with an idea. It comes alive through people.
            </p>
          </div>
        </article>
      </Reveal>

      <Stagger as="div" className="mt-16 md:mt-20" delay={120}>
        <StaggerItem index={0}>
          <h3 className="text-crest-400 text-[13px] tracking-wider uppercase">
            More Ways to Create an Experience
          </h3>
        </StaggerItem>
        <ul className="mt-6">
          {eventFormats.map((format, index) => (
            <StaggerItem
              as="li"
              index={index + 1}
              className="border-hairline hover:bg-panel -mx-2 grid grid-cols-1 items-baseline gap-x-4 gap-y-2 border-t px-2 py-5 transition-colors duration-200 md:grid-cols-[12rem_1fr]"
              key={format.title}
            >
              <h4 className="font-display text-bone text-xl">{format.title}</h4>
              <p className="text-dust text-sm md:col-start-2">{format.body}</p>
            </StaggerItem>
          ))}
        </ul>
        <StaggerItem index={eventFormats.length + 1}>
          <p className="text-crest-300 font-display mt-10 text-lg italic">
            Think Bigger. Plan Smarter. Execute Better.
          </p>
        </StaggerItem>
      </Stagger>
    </div>
  </section>
);
