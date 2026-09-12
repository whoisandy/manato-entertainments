import Image from "next/image";

import { SocialButtons } from "@/components/social-buttons";
import { StageDust } from "@/components/stage-dust";
import { navLinks, site } from "@/lib/content";

export const SiteFooter = () => (
  <footer className="border-hairline relative overflow-hidden border-t">
    <StageDust
      className="absolute inset-x-0 bottom-0 h-28 md:h-36"
      density={16}
      tone="ember"
    />
    <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Image
            alt="Manato Entertainments"
            className="h-24 w-auto md:h-32"
            height={844}
            src="/manato-lockup.webp"
            width={802}
          />
          <p className="text-ash mt-5 max-w-sm text-sm leading-relaxed">
            Entertainment and event management for concerts, corporate events,
            celebrations and brand experiences. Creating moments that connect
            people and stay with them.
          </p>
          <p className="text-crest-400 mt-4 font-mono text-[13px] tracking-[0.05em]">
            {site.tagline}
          </p>
        </div>

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

        <div>
          <h3 className="text-crest-400 font-mono text-[13px] tracking-[0.05em] uppercase">
            Connect With Manato
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
          </ul>
          <div className="mt-5">
            <SocialButtons />
          </div>
        </div>
      </div>

      <div className="border-hairline mt-12 flex flex-col gap-2 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-dust font-mono text-xs">
          © 2026 Manato Entertainments. All rights reserved.
        </p>
        <p className="text-dust font-mono text-xs">{site.brandStatement}</p>
      </div>
    </div>
  </footer>
);
