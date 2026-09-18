"use client";

import { useEffect } from "react";

import { smoothScrollTo } from "@/lib/smooth-scroll";

/**
 * Document-wide same-page anchor scroller: intercepts clicks on in-page
 * anchors and hands them to smoothScrollTo (custom easing — see
 * lib/smooth-scroll.ts). Renders nothing; mounted once in the root layout so
 * every anchor on the page (nav, hero CTAs, cards, footer) gets the same
 * snappy motion. External links (mailto:, tel:, socials) don't match the
 * selector and are untouched.
 */
export const SmoothAnchors = () => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Ignore modified clicks — users expect those to open new contexts.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as Element).closest?.('a[href^="#"]');
      if (!anchor) {
        return;
      }
      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        return;
      }
      const target = document.querySelector(href);
      if (!target) {
        return;
      }
      event.preventDefault();
      history.pushState(null, "", href);
      smoothScrollTo(target);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
};
