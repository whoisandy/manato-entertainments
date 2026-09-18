"use client";

import { CalendarPlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { ComponentProps, MouseEvent as ReactMouseEvent } from "react";

import { ScrollProgress } from "@/components/scroll-progress";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/content";
import { isSmoothScrollActive, smoothScrollToY } from "@/lib/smooth-scroll";

/** Section ids tracked by the scroll-spy, derived from the nav hrefs. */
const SECTION_IDS = navLinks.map((link) => link.href.slice(1));

/** Logo → top: smooth-scroll with the site's custom easing, without an
 *  anchor jump or a #top hash in the URL (the global scroll-behavior
 *  handles anchors, but a hash jump also pollutes the address bar — this
 *  keeps it clean). */
const backToTop = (event: ReactMouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search
  );
  smoothScrollToY(0);
};

/**
 * Custom staggered menu glyph — three rounded bars with a deliberate
 * offset rhythm (short, full, right-shifted), per the stakeholder's
 * reference mark. Stroke/bone color follow the IconBtn contract.
 */
const MenuGlyph = (props: ComponentProps<"svg">) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeWidth="2.4"
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M5 7.25h7" />
    <path d="M4.5 12h15" />
    <path d="M11 16.75h8.5" />
  </svg>
);

/** Header logo options: the crown mark (default) or the full-colour lockup. */
const HEADER_LOGOS = {
  crown: {
    alt: "MANATO Entertainments",
    height: 707,
    src: "/manato-crown.webp",
    width: 992,
  },
  lockup: {
    alt: "MANATO Entertainments — Where Entertainment Meets Experience",
    height: 844,
    src: "/manato-lockup.webp",
    width: 802,
  },
} as const;

export type HeaderLogoVariant = keyof typeof HEADER_LOGOS;

export const SiteHeader = ({
  logoVariant = "crown",
}: {
  /** Swap the header mark without touching the layout slot. */
  logoVariant?: HeaderLogoVariant;
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /** Active nav tab (stakeholder items 7 + follow-up): a clicked link is
   *  highlighted immediately, then the highlight tracks scroll position —
   *  except while a programmatic smooth scroll is in flight
   *  (isSmoothScrollActive), so the flight never flashes the sections it
   *  passes through. At the hero, no section owns the middle band and the
   *  highlight clears. */
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const logo = HEADER_LOGOS[logoVariant];

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Scroll-spy (desktop nav): the highlight follows the section currently
  // crossing the viewport's middle band and clears once no section is in
  // the band (e.g. back at the hero). Computed from scroll position in a
  // rAF-throttled listener — deterministic, unlike observer callbacks,
  // which can be missed while a programmatic flight is in progress.
  useEffect(() => {
    const sections = SECTION_IDS.flatMap((id) => {
      const section = document.querySelector<HTMLElement>(`#${id}`);
      return section ? [section] : [];
    });
    if (sections.length === 0) {
      return;
    }
    let frame = 0;
    const compute = () => {
      frame = 0;
      if (isSmoothScrollActive()) {
        return;
      }
      const bandY = window.innerHeight * 0.5;
      let current: string | null = null;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= bandY && rect.bottom > bandY) {
          current = `#${section.id}`;
          break;
        }
      }
      setActiveHref(current);
    };
    const onScroll = () => {
      if (frame === 0) {
        frame = requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-60 transition-colors duration-200 ${
        scrolled || open
          ? "border-hairline bg-stage/85 border-b backdrop-blur-sm"
          : "border-b border-transparent"
      }`}
    >
      <ScrollProgress />
      {/* Full-bleed header: the bar spans the viewport edge to edge
          (stakeholder request 2026-09-18) so the logo sits hard-left —
          no max-w container inside the bar. */}
      <div className="flex h-20 w-full items-center justify-between px-4 sm:px-6 md:h-22 md:px-8">
        <button
          type="button"
          aria-label="MANATO Entertainments — back to top"
          onClick={backToTop}
          className="shrink-0 cursor-pointer"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 768px) 64px, 56px"
            className="h-14 w-auto md:h-16"
          />
        </button>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                aria-current={active ? "true" : undefined}
                className={`text-sm transition-colors duration-200 ${
                  active
                    ? "text-bone decoration-crest-400 underline decoration-2 underline-offset-[6px]"
                    : "text-ash hover:text-bone"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            className="border-hairline-strong bg-silver-wash text-bone hover:border-crest-400 hover:text-crest-300 inline-flex items-center gap-2 border px-5 py-2.5 text-sm font-medium transition-[border-color,color] duration-200"
          >
            <CalendarPlusIcon aria-hidden="true" className="size-4" />
            Plan an Event
          </a>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label={open ? "Close navigation" : "Open navigation"}
            render={
              <button
                type="button"
                className="text-bone hover:text-crest-300 relative z-70 flex h-12 w-12 items-center justify-center transition-colors duration-200 md:hidden"
              />
            }
          >
            {/* Burger ⇄ close morph: crossfade + counter-rotation, 200ms. */}
            <span aria-hidden="true" className="relative block size-7">
              <MenuGlyph
                className={`absolute inset-0 size-7 transition-[opacity,transform] duration-200 ${
                  open
                    ? "scale-75 -rotate-45 opacity-0"
                    : "scale-100 rotate-0 opacity-100"
                }`}
              />
              <XIcon
                className={`absolute inset-0 size-7 transition-[opacity,transform] duration-200 ${
                  open
                    ? "scale-100 rotate-0 opacity-100"
                    : "scale-75 rotate-45 opacity-0"
                }`}
              />
            </span>
          </SheetTrigger>
          <SheetContent
            side="top"
            showCloseButton={false}
            className="border-hairline bg-stage/95 border-b pt-20 backdrop-blur-md"
          >
            <SheetTitle className="sr-only">
              MANATO Entertainments menu
            </SheetTitle>
            <nav aria-label="Primary mobile" className="px-4 pb-5 sm:px-6">
              <ul>
                {navLinks.map((link) => (
                  <li
                    key={link.href}
                    className="border-hairline border-b last:border-b-0"
                  >
                    <SheetClose
                      nativeButton={false}
                      render={
                        <a
                          className="text-bone hover:text-crest-300 block py-4 text-base transition-colors duration-200"
                          href={link.href}
                        >
                          {link.label}
                        </a>
                      }
                    />
                  </li>
                ))}
              </ul>
              <SheetClose
                nativeButton={false}
                render={
                  <a
                    className="bg-primary text-primary-foreground hover:bg-crest-400 mt-4 flex h-11 items-center justify-center gap-2 px-7 text-sm font-medium tracking-wide transition-colors duration-200"
                    href="#contact"
                  >
                    <CalendarPlusIcon aria-hidden="true" className="size-4" />
                    Plan an Event
                  </a>
                }
              />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
