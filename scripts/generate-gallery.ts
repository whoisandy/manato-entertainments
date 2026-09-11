import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = fileURLToPath(new URL("../public/gallery", import.meta.url));
const COUNT = 10;
const WIDTH = 1200;
const HEIGHT = 800;

interface Placement {
  cx: number;
  cy: number;
  radius: number;
  beams: number;
  beamSpread: number;
  particles: number;
  crowdY: number;
}

const placementFor = (i: number): Placement => {
  const cx = 260 + ((i * 173) % 680);
  const cy = 190 + ((i * 97) % 240);
  const radius = 400 + ((i * 53) % 200);
  const beams = 3 + (i % 3);
  const beamSpread = 90 + ((i * 41) % 120);
  const particles = 5 + ((i * 3) % 6);
  const crowdY = 850 + ((i * 29) % 90);
  return { beamSpread, beams, crowdY, cx, cy, particles, radius };
};

const particleCircles = (p: Placement): string => {
  const circles: string[] = [];
  for (let j = 0; j < p.particles; j += 1) {
    const px = p.cx - 220 + ((j * 137 + p.cx) % 440);
    const py = p.cy - 160 + ((j * 89 + p.cy) % 320);
    const pr = 1.5 + ((j * 7) % 3);
    const opacity = 0.15 + ((j * 13) % 4) * 0.1;
    circles.push(
      `<circle cx="${px.toFixed(0)}" cy="${py.toFixed(0)}" r="${pr.toFixed(1)}" fill="#DBB85C" opacity="${opacity.toFixed(2)}"/>`
    );
  }
  return circles.join("\n  ");
};

const beamLines = (p: Placement): string => {
  const lines: string[] = [];
  const half = (p.beams - 1) / 2;
  for (let j = 0; j < p.beams; j += 1) {
    const offsetX = (j - half) * p.beamSpread;
    const x0 = (p.cx + offsetX * 0.5).toFixed(0);
    const x1 = (p.cx + offsetX).toFixed(0);
    lines.push(
      `<line x1="${x0}" y1="-40" x2="${x1}" y2="${p.cy.toFixed(0)}" stroke="url(#beam)" stroke-width="3"/>`
    );
  }
  return lines.join("\n  ");
};

const svgFor = (i: number): string => {
  const p = placementFor(i);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Concert placeholder art ${i}">
  <defs>
    <radialGradient id="glow" gradientUnits="userSpaceOnUse" cx="${p.cx}" cy="${p.cy}" r="${p.radius}">
      <stop offset="0%" stop-color="#C79B32" stop-opacity="0.5"/>
      <stop offset="35%" stop-color="#C79B32" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#C79B32" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="beam" gradientUnits="userSpaceOnUse" x1="${p.cx}" y1="0" x2="${p.cx}" y2="${p.cy}">
      <stop offset="0%" stop-color="#EAD28A" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#C79B32" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.06"/>
      </feComponentTransfer>
    </filter>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#050505"/>
  <g filter="url(#soft)" opacity="0.55">
    ${beamLines(p)}
  </g>
  <circle cx="${p.cx}" cy="${p.cy}" r="${p.radius}" fill="url(#glow)"/>
  <circle cx="${p.cx}" cy="${p.cy}" r="64" fill="#EAD28A" opacity="0.35" filter="url(#soft)"/>
  ${particleCircles(p)}
  <ellipse cx="600" cy="${p.crowdY}" rx="1050" ry="180" fill="#030303"/>
  <ellipse cx="${600 - 260 + ((i * 61) % 520)}" cy="${p.crowdY + 40}" rx="760" ry="150" fill="#020202"/>
  <rect width="${WIDTH}" height="${HEIGHT}" filter="url(#grain)"/>
</svg>
`;
};

mkdirSync(OUT_DIR, { recursive: true });
for (let i = 1; i <= COUNT; i += 1) {
  const file = path.join(OUT_DIR, `gallery-${String(i).padStart(2, "0")}.svg`);
  writeFileSync(file, svgFor(i));
  console.log(`wrote ${file}`);
}
