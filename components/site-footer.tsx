import Image from "next/image";

import { navLinks, site } from "@/lib/content";

export const SiteFooter = () => (
  <footer className="border-hairline border-t">
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Image
            alt="Manato Entertainments"
            className="h-14 w-auto md:h-16"
            height={977}
            src="/manato-logo.jpg"
            width={1600}
          />
          <p className="text-ash mt-5 max-w-sm text-sm leading-relaxed">
            Themed live music evenings — one composer, one pairing, one golden
            era at a time.
          </p>
          <p className="text-gold-400 mt-4 font-mono text-[13px] tracking-[0.05em]">
            {site.tagline}
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-gold-400 font-mono text-[13px] tracking-[0.05em] uppercase">
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
          <h3 className="text-gold-400 font-mono text-[13px] tracking-[0.05em] uppercase">
            Reach us
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
                href={`tel:${site.phoneHref}`}
              >
                {site.phone}
              </a>
            </li>
            <li>{site.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-hairline mt-12 flex flex-col gap-2 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-dust font-mono text-xs">
          © 2026 Manato Entertainments. All rights reserved.
        </p>
        <p className="text-dust font-mono text-xs">Chennai, India</p>
      </div>
    </div>
  </footer>
);
