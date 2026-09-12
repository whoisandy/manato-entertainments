import Image from "next/image";

import { AnimatedContainer } from "@/components/animated-container";
import { SocialButtons } from "@/components/social-buttons";
import { StageDust } from "@/components/stage-dust";
import { navLinks, site } from "@/lib/content";

export const SiteFooter = () => (
  <footer className="border-hairline relative overflow-hidden border-t">
    {/* Stage light falling on the floor from above the footer edge. */}
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(35%_128px_at_50%_0%,rgba(247,248,252,0.08),transparent)]"
    />
    <StageDust
      className="absolute inset-x-0 bottom-0 h-28 md:h-36"
      density={22}
      intensity={0.55}
      tone="ember"
    />
    <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="grid gap-10 md:grid-cols-[1fr_1fr_1.5fr]">
        <AnimatedContainer className="flex flex-col" delay={0.1}>
          <h3 className="text-crest-400 font-mono text-[13px] tracking-[0.05em] uppercase">
            Connect With MANATO
          </h3>
          <ul className="text-ash mt-4 space-y-3 text-sm">
            <li>
              <a
                className="hover:text-bone transition-colors duration-200"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                className="hover:text-bone transition-colors duration-200"
                href={`tel:${site.phone.replaceAll(" ", "")}`}
              >
                {site.phone}
              </a>
            </li>
            <li className="text-dust max-w-64 leading-relaxed">
              {site.address}
            </li>
          </ul>
          <div className="mt-5">
            <SocialButtons />
          </div>
        </AnimatedContainer>

        <AnimatedContainer className="flex flex-col" delay={0.2}>
          <nav aria-label="Footer">
            <h3 className="text-crest-400 font-mono text-[13px] tracking-[0.05em] uppercase">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className="text-ash hover:text-bone text-sm transition-colors duration-200"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </AnimatedContainer>

        <AnimatedContainer className="flex flex-col md:items-end" delay={0.3}>
          <div className="flex flex-col items-start md:items-end">
            <Image
              alt="MANATO Entertainments"
              className="h-24 w-auto md:h-32"
              height={844}
              src="/manato-lockup.webp"
              width={802}
            />
            <p className="text-ash mt-5 max-w-sm text-sm leading-relaxed md:text-right">
              Entertainment and event management for concerts, corporate events,
              celebrations and brand experiences. Creating moments that connect
              people and stay with them.
            </p>
          </div>
        </AnimatedContainer>
      </div>
    </div>

    {/* Full-width closing band: bold navy floor with subtle mono text. */}
    <div className="bg-panel border-hairline relative border-t">
      <AnimatedContainer delay={0.4}>
        <div className="text-dust mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 font-mono text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 MANATO Entertainments. All rights reserved.</p>
          <p>{site.brandStatement}</p>
        </div>
      </AnimatedContainer>
    </div>
  </footer>
);
