/**
 * Custom anchor scrolling. The global `scroll-behavior: smooth` is
 * browser-tuned (slow ease-in-out whose timing can't be changed), so same-page
 * anchors are intercepted (components/smooth-anchors.tsx) and scrolled by this
 * module instead: a distance-scaled easeOutExpo animation — very fast start,
 * long gentle settle, no overshoot ("snappy, not jumpy").
 *
 * While an animation runs, the header's scroll-spy must not update (it would
 * flash the sections the flight passes through); `isSmoothScrollActive()`
 * exposes that state, and the animation dispatches a `scroll` event when it
 * settles so the spy recomputes the landed section. User input (wheel, touch,
 * keyboard) cancels the animation immediately — the page never fights the
 * user.
 */

let cancelCurrent: (() => void) | null = null;

export const isSmoothScrollActive = () => cancelCurrent !== null;

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Anchor landings must respect the fixed header — read the site's
 *  scroll-padding-top so the offset stays in sync with globals.css. The
 *  computed value is "88px": the px suffix is stripped first because
 *  Number("88px") is NaN (the whole 88px offset would silently become 0). */
const headerOffset = () => {
  const padding = getComputedStyle(document.documentElement).scrollPaddingTop;
  const value = Number(padding.replaceAll("px", ""));
  return Number.isNaN(value) ? 0 : value;
};

export const smoothScrollToY = (endY: number) => {
  cancelCurrent?.();

  const startY = window.scrollY;
  const distance = Math.max(0, endY) - startY;
  if (prefersReducedMotion()) {
    window.scrollTo({ behavior: "instant", top: Math.max(0, endY) });
    return;
  }
  if (Math.abs(distance) < 2) {
    return;
  }

  // Snappy: fast over short hops, never sluggish over long ones.
  const duration = Math.min(850, Math.max(450, Math.abs(distance) * 0.4));
  const start = performance.now();
  let cancelled = false;

  const cancel = () => {
    if (cancelled) {
      return;
    }
    cancelled = true;
    cancelCurrent = null;
  };
  cancelCurrent = cancel;

  // Any deliberate user input stops the animation where it is.
  for (const event of ["wheel", "touchstart", "keydown"] as const) {
    window.addEventListener(event, cancel, { once: true, passive: true });
  }

  const step = (now: number) => {
    if (cancelled) {
      return;
    }
    const progress = Math.min((now - start) / duration, 1);
    // behavior "instant" is load-bearing: with the site's CSS
    // scroll-behavior: smooth, a plain scrollTo(x, y) (behavior auto)
    // starts ANOTHER browser smooth animation per frame — the page would
    // fight itself and land short. Instant makes each frame a hard set.
    window.scrollTo({
      behavior: "instant",
      top: startY + distance * easeOutExpo(progress),
    });
    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }
    cancelCurrent = null;
    // Recompute the scroll-spy for the section we just landed on.
    window.dispatchEvent(new Event("scroll"));
  };
  requestAnimationFrame(step);
};

export const smoothScrollTo = (target: Element) => {
  const endY = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - headerOffset()
  );
  smoothScrollToY(endY);
};
