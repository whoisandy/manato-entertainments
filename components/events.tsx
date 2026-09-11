import { SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { featuredEvent, pastEvents } from "@/lib/content";

export const Events = () => (
  <section
    aria-labelledby="events-title"
    className="border-hairline scroll-mt-24 border-t"
    id="events"
  >
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <Reveal>
        <SectionHeading
          id="events-title"
          kicker="The stage"
          lead="Each edition is announced when the setlist is ready — never before. Here is where we are headed, and where we have been."
          title="One composer at a time."
        />
      </Reveal>

      <Reveal>
        <article className="border-hairline bg-panel grid gap-10 border p-6 sm:p-8 md:grid-cols-2 md:gap-12 md:p-10">
          <div>
            <p className="text-gold-400 flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase">
              <span aria-hidden="true" className="bg-gold-500 h-px w-6" />
              {featuredEvent.kicker}
            </p>
            <h3 className="font-display text-bone mt-5 text-3xl leading-tight tracking-[-0.015em] md:text-4xl">
              {featuredEvent.title}
            </h3>
            <p className="font-display text-gold-300 mt-2 text-lg italic">
              {featuredEvent.subtitle}
            </p>
            <p className="text-ash mt-6 font-mono text-[13px] tracking-[0.05em]">
              {featuredEvent.date}
            </p>
            <p className="text-ash mt-6 text-base leading-relaxed">
              {featuredEvent.description}
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {featuredEvent.meta.map((chip) => (
                <li
                  className="border-hairline bg-gold-wash text-gold-300 border px-3 py-1.5 font-mono text-[13px] tracking-[0.05em]"
                  key={chip.label}
                >
                  {chip.label}
                </li>
              ))}
            </ul>
            <p className="text-dust mt-10 text-sm">{featuredEvent.note}</p>
          </div>

          <div>
            <h4 className="text-gold-400 font-mono text-[13px] tracking-[0.05em] uppercase">
              A taste of the setlist
            </h4>
            <ol className="mt-4">
              {featuredEvent.setlist.map((entry, index) => (
                <li
                  className="border-hairline flex items-baseline gap-4 border-t py-4 first:border-t-0 first:pt-2"
                  key={entry.song}
                >
                  <span className="text-gold-400 font-mono text-[13px] tracking-[0.05em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-bone text-lg">
                      {entry.song}
                    </p>
                    <p className="text-ash mt-1 text-sm">
                      {entry.singer}
                      {entry.coSinger ? (
                        <span> · with {entry.coSinger}</span>
                      ) : null}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-dust mt-6 text-sm">
              The remaining twenty-three songs are revealed on the night.
            </p>
          </div>
        </article>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-16 md:mt-20">
          <h3 className="text-gold-400 font-mono text-[13px] tracking-[0.05em] uppercase">
            The archive — past editions
          </h3>
          <ul className="mt-6">
            {pastEvents.map((event) => (
              <li
                className="border-hairline hover:bg-panel -mx-2 grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-1 border-t px-2 py-5 transition-colors duration-200 md:grid-cols-[4rem_1fr_auto]"
                key={event.title}
              >
                <span className="text-gold-400 font-mono text-[13px] tracking-[0.05em]">
                  {event.year}
                </span>
                <h4 className="font-display text-bone text-xl">
                  {event.title}
                  <span className="text-ash"> — {event.subtitle}</span>
                </h4>
                <p className="text-dust col-start-2 text-sm md:col-start-3">
                  {event.songs} · {event.singers}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  </section>
);
