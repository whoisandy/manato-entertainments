"use client";

import { useEffect, useRef } from "react";

type Tone = "silver" | "ember";

/** Palette per tone — rgb triplets from the DESIGN.md §2 tokens. */
const TONE_COLORS: Record<Tone, string[]> = {
  // crest-500 / crest-300 / silver-300 — embers over the footer floor
  ember: ["224,182,88", "246,217,150", "239,241,248"],
  // silver-300 / crest-300 / crest-400 — dust caught in the stage light
  silver: ["239,241,248", "246,217,150", "236,199,119"],
};

interface Particle {
  x: number;
  y: number;
  /** Upward speed in px/s. */
  speed: number;
  /** Horizontal wobble amplitude in px. */
  drift: number;
  phase: number;
  size: number;
  alpha: number;
  color: string;
}

/**
 * Stage dust: bright motes rising through the light — a soft glow halo
 * under a sharp 1–3px core, twinkling as they climb. The canvas tracks its
 * own size with a ResizeObserver so particles always fill the full width
 * (a layout-shift at mount can otherwise collapse spawns to one edge).
 * Zero dependencies, capped particle budget, DPR-aware, and renders
 * nothing at all under prefers-reduced-motion.
 */
export const StageDust = ({
  className,
  tone = "silver",
  /** One particle per N px of width, clamped to 24–150. */
  density = 14,
  /** Alpha multiplier — dial the field down for quiet corners. */
  intensity = 1,
}: {
  className?: string;
  tone?: Tone;
  density?: number;
  intensity?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const colors = TONE_COLORS[tone];
    let width = 0;
    let height = 0;
    let frame = 0;
    let particles: Particle[] = [];
    // The loop only runs while the canvas is on screen and the tab is
    // visible — offscreen dust is invisible by definition, so drawing it
    // is pure waste (the footer field otherwise animates behind every
    // scroll position).
    let visible = true;

    const spawn = (initial: boolean): Particle => ({
      alpha: (0.3 + Math.random() * 0.5) * intensity,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: 6 + Math.random() * 14,
      phase: Math.random() * Math.PI * 2,
      size: [1, 2, 2, 3][Math.floor(Math.random() * 4)],
      speed: 10 + Math.random() * 20,
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 3,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      ({ width, height } = rect);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(150, Math.max(24, Math.round(width / density)));
      particles = Array.from({ length: count }, () => spawn(true));
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    let last = performance.now();
    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.y -= particle.speed * delta;
        particle.phase += delta * 0.9;
        const x = particle.x + Math.sin(particle.phase) * particle.drift;
        const twinkle = 0.55 + 0.45 * Math.sin(particle.phase * 2.4);
        const cx = Math.round(x);
        const cy = Math.round(particle.y);
        // Glow halo, then the bright core — keeps the mote readable even
        // over the photo backdrop's brighter areas.
        ctx.globalAlpha = particle.alpha * twinkle * 0.25;
        ctx.fillStyle = `rgb(${particle.color})`;
        ctx.fillRect(
          cx - particle.size,
          cy - particle.size,
          particle.size * 3,
          particle.size * 3
        );
        ctx.globalAlpha = particle.alpha * twinkle;
        ctx.fillRect(cx, cy, particle.size, particle.size);
        if (particle.y < -4) {
          Object.assign(particle, spawn(false));
        }
      }
      ctx.globalAlpha = 1;
      // Self-schedule unconditionally; sync() cancels the pending frame
      // the moment the canvas leaves the viewport or the tab hides, so a
      // paused loop never actually executes its next tick.
      frame = requestAnimationFrame(tick);
    };

    /** Starts the rAF loop only if nothing already has it running. */
    const start = () => {
      if (frame === 0) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    /** Stops the loop; the next visibility edge restarts it. */
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const sync = () => {
      if (visible && !document.hidden) {
        start();
      } else {
        stop();
      }
    };

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        visible = entries.at(-1)?.isIntersecting ?? true;
        sync();
      },
      // Keep a hysteresis band so border-hugging canvases don't thrash.
      { rootMargin: "80px" }
    );
    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", sync);

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [tone, density, intensity]);

  return (
    <canvas
      aria-hidden="true"
      className={`pointer-events-none w-full ${className ?? ""}`}
      ref={canvasRef}
    />
  );
};
