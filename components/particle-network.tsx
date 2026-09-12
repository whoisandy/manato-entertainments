"use client";

import { useEffect, useRef } from "react";

// Particle + link palette — DESIGN.md §2 tokens as rgb triplets.
// silver-300 / crest-300 nodes, silver-500 links, crest-400 cursor threads.
const NODE_COLORS = ["238,241,248", "246,217,150"] as const;
const LINK_COLOR = "182,192,216";
const CURSOR_COLOR = "236,199,119";

interface Particle {
  x: number;
  y: number;
  /** Velocity in px/s. */
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

/**
 * Particle network strip — the About section's signature atmosphere.
 * Native zero-dependency canvas (mechanism extracted from the particles.js
 * pattern, no CDN script): drifting motes joined by hairline proximity
 * links, with a cursor "grab" that ties nearby motes to the pointer via a
 * crest line. Pointer work is passive and never intercepts input; the
 * layer itself is pointer-events-none. Renders one static frame under
 * prefers-reduced-motion, pauses off-screen and on hidden tabs, and is
 * masked to transparent at its lower edge by the caller.
 */
export const ParticleNetwork = ({
  className,
  linkDistance = 120,
  cursorDistance = 170,
  intensity = 1,
}: {
  className?: string;
  /** Proximity at which two motes gain a link line (px). */
  linkDistance?: number;
  /** Radius of the pointer "grab" (px). */
  cursorDistance?: number;
  /** Alpha multiplier — dial the field down for quiet corners. */
  intensity?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let frame = 0;
    let particles: Particle[] = [];
    let pointer: { x: number; y: number } | null = null;
    let visible = true;

    const spawn = (): Particle => ({
      alpha: (0.3 + Math.random() * 0.35) * intensity,
      color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
      radius: 1 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 44,
      vy: (Math.random() - 0.5) * 44,
      x: Math.random() * width,
      y: Math.random() * height,
    });

    const seed = () => {
      const count = Math.min(
        90,
        Math.max(20, Math.round((width * height) / 9000))
      );
      particles = Array.from({ length: count }, spawn);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Link lines first so motes sit above the mesh.
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist >= linkDistance) {
            continue;
          }
          ctx.strokeStyle = `rgba(${LINK_COLOR},${(1 - dist / linkDistance) * 0.32 * intensity})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      // Pointer grab: crest threads from the cursor to nearby motes.
      if (pointer && !reduceMotion) {
        ctx.lineWidth = 1;
        for (const particle of particles) {
          const dist = Math.hypot(
            particle.x - pointer.x,
            particle.y - pointer.y
          );
          if (dist >= cursorDistance) {
            continue;
          }
          ctx.strokeStyle = `rgba(${CURSOR_COLOR},${(1 - dist / cursorDistance) * 0.55})`;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
        }
      }
      for (const particle of particles) {
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = `rgb(${particle.color})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      ({ width, height } = rect);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduceMotion) {
        draw();
      }
    };

    let last = performance.now();

    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      for (const particle of particles) {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
          particle.x = Math.min(Math.max(particle.x, 0), width);
        }
        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
          particle.y = Math.min(Math.max(particle.y, 0), height);
        }
      }
      draw();
      // Self-schedule unconditionally; sync() cancels the pending frame
      // the moment the canvas leaves the viewport or the tab hides.
      frame = requestAnimationFrame(tick);
    };

    /** Starts the rAF loop only if nothing already has it running. */
    const start = () => {
      if (frame === 0 && !reduceMotion) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

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
      { rootMargin: "80px" }
    );
    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", sync);

    const section = canvas.closest("section");
    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onLeave = () => {
      pointer = null;
    };
    if (!reduceMotion && section) {
      section.addEventListener("pointermove", onMove, { passive: true });
      section.addEventListener("pointerleave", onLeave);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    return () => {
      stop();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (section) {
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerleave", onLeave);
      }
    };
  }, [linkDistance, cursorDistance, intensity]);

  return (
    <canvas
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className ?? ""}`}
      ref={canvasRef}
    />
  );
};
