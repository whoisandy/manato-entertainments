"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/content";

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          ? "border-hairline bg-stage/85 border-b backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 md:h-[88px]">
        <a
          href="#top"
          aria-label="Manato Entertainments — back to top"
          className="shrink-0"
        >
          <Image
            src="/manato-logo.jpg"
            alt="Manato Entertainments"
            width={1600}
            height={977}
            priority
            className="h-11 w-auto md:h-12"
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
            className="border-hairline-strong text-bone hover:border-gold-400 hover:text-gold-300 border px-5 py-2.5 text-sm font-medium transition-[border-color,color] duration-200"
          >
            Get in touch
          </a>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label={open ? "Close menu" : "Open menu"}
            render={
              <button
                type="button"
                className="border-hairline text-bone hover:border-hairline-strong hover:text-gold-300 flex h-11 w-11 items-center justify-center border transition-colors duration-200 md:hidden"
              />
            }
          >
            {open ? (
              <XIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </SheetTrigger>
          <SheetContent
            side="top"
            showCloseButton={false}
            className="border-hairline bg-stage/95 border-b backdrop-blur-md"
          >
            <SheetTitle className="sr-only">
              Manato Entertainments menu
            </SheetTitle>
            <nav aria-label="Primary mobile" className="px-4 pb-5 sm:px-6">
              <ul>
                {navLinks.map((link) => (
                  <li
                    key={link.href}
                    className="border-hairline border-b last:border-b-0"
                  >
                    <SheetClose
                      render={<a href={link.href} />}
                      className="text-bone hover:text-gold-300 block py-4 text-base transition-colors duration-200"
                    >
                      {link.label}
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <SheetClose
                render={<a href="#contact" />}
                className="bg-primary text-primary-foreground hover:bg-gold-400 mt-4 flex h-11 items-center justify-center px-7 text-sm font-medium tracking-wide transition-colors duration-200"
              >
                Get in touch
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
