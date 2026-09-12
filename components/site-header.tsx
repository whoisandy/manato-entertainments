"use client";

import { CalendarPlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { ComponentProps } from "react";

import { ScrollProgress } from "@/components/scroll-progress";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/content";

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
        scrolled || open
          ? "border-hairline bg-stage/85 border-b backdrop-blur-sm"
          : "border-b border-transparent"
      }`}
    >
      <ScrollProgress />
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 md:h-[88px]">
        <a
          href="#top"
          aria-label="MANATO Entertainments — back to top"
          className="shrink-0"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority
            sizes="(min-width: 768px) 84px, 72px"
            className="h-12 w-auto md:h-14"
          />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ash hover:text-bone text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
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
                className="text-bone hover:text-crest-300 flex h-12 w-12 items-center justify-center transition-colors duration-200 md:hidden"
              />
            }
          >
            {open ? (
              <XIcon className="size-6" />
            ) : (
              <MenuGlyph className="size-6" />
            )}
          </SheetTrigger>
          <SheetContent
            side="top"
            showCloseButton={false}
            className="border-hairline bg-stage/95 border-b backdrop-blur-md"
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
