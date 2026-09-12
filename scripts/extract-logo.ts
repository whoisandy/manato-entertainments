/**
 * Extracts usable (alpha-keyed) marks from the stakeholder-supplied
 * checkerboard PNGs. The supplied "transparent" assets are opaque RGB with a
 * fake grey checkerboard + marble texture baked in (content handoff §12), so
 * this script derives real transparency. The marks are gold/blue (chromatic)
 * and near-white (wordmark, gem highlights); everything neutral is fake-
 * transparency noise, so keying is a two-class decision:
 *
 * 1. Key every neutral pixel (chroma < 25) below the background noise
 *    ceiling (~219 measured) — checker cells, the marble/wrinkle texture,
 *    halo, and the soft frame shadow all fall here.
 * 2. Keep neutral pixels at/above the noise ceiling: thin bright strokes
 *    (the lockup's tagline) live in the 222-255 band, well above noise.
 * 3. Regrow: two dilation passes re-attach each letter's anti-aliased edge
 *    pixels (which sit at checker brightness) to its bright core.
 * 4. Despeckle: any small connected island of neutral pixels (bright specks,
 *    dark flecks) is keyed too; real shading lives in large regions
 *    connected to the chromatic mark.
 *
 * Outputs (replacing the v1 split-logo webps):
 *   public/manato-crown.webp  — crown mark only (header)
 *   public/manato-lockup.webp — full colour lockup (footer)
 *
 * Run: bun scripts/extract-logo.ts
 */
import { mkdirSync } from "node:fs";

import sharp from "sharp";

const JOBS = [
  {
    input: "public/assets/manato-crown.png",
    output: "public/manato-crown.webp",
    quality: 92,
  },
  {
    input: "public/assets/manato-full-color-no-sparkle.png",
    output: "public/manato-lockup.webp",
    quality: 92,
  },
] as const;

const NEUTRAL_CHROMA = 25;
/** Background texture noise tops out at ~219 (measured); strokes live above. */
const BRIGHT_NEUTRAL_KEEP = 222;
const REGROW_PASSES = 2;
const SPECK_MAX_PIXELS = 60;

/** Small neutral islands (< SPECK_MAX_PIXELS) are texture specks, not mark. */
const despeckle = (
  data: Buffer,
  width: number,
  height: number,
  channels: number,
  isNeutral: (p: number) => boolean,
  background: Uint8Array
): void => {
  const pixels = width * height;
  const component = new Int32Array(pixels).fill(-1);
  const queue: number[] = [];
  let label = 0;
  for (let start = 0; start < pixels; start += 1) {
    if (component[start] >= 0 || background[start] === 1 || !isNeutral(start)) {
      continue;
    }
    queue.length = 0;
    queue.push(start);
    component[start] = label;
    const members: number[] = [];
    while (queue.length > 0) {
      const p = queue.pop();
      if (p === undefined) {
        continue;
      }
      members.push(p);
      const x = p % width;
      for (const next of [p - 1, p + 1, p - width, p + width]) {
        if (
          next < 0 ||
          next >= pixels ||
          component[next] >= 0 ||
          background[next] === 1 ||
          !isNeutral(next) ||
          (next !== p - width &&
            next !== p + width &&
            Math.abs((next % width) - x) > 1)
        ) {
          continue;
        }
        component[next] = label;
        queue.push(next);
      }
    }
    if (members.length < SPECK_MAX_PIXELS) {
      for (const p of members) {
        background[p] = 1;
      }
    }
    label += 1;
  }
};

/** Re-attach bright strokes' anti-aliased edges to their cores. */
const keepBrightStrokes = (
  data: Buffer,
  width: number,
  height: number,
  channels: number,
  isNeutral: (p: number) => boolean,
  valueAt: (p: number) => number,
  background: Uint8Array
): void => {
  const pixels = width * height;
  for (let p = 0; p < pixels; p += 1) {
    if (isNeutral(p) && valueAt(p) >= BRIGHT_NEUTRAL_KEEP) {
      background[p] = 0;
    }
  }
  for (let pass = 0; pass < REGROW_PASSES; pass += 1) {
    const regrown: number[] = [];
    for (let p = 0; p < pixels; p += 1) {
      if (background[p] === 0 || !isNeutral(p)) {
        continue;
      }
      const x = p % width;
      const touchesKept =
        (x > 0 && background[p - 1] === 0) ||
        (x < width - 1 && background[p + 1] === 0) ||
        (p >= width && background[p - width] === 0) ||
        (p < pixels - width && background[p + width] === 0);
      if (touchesKept) {
        regrown.push(p);
      }
    }
    for (const p of regrown) {
      background[p] = 0;
    }
  }
};

const extract = async (
  input: string,
  output: string,
  quality: number
): Promise<void> => {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const pixels = width * height;

  const chromaAt = (p: number): number => {
    const i = p * channels;
    return (
      Math.max(data[i], data[i + 1], data[i + 2]) -
      Math.min(data[i], data[i + 1], data[i + 2])
    );
  };
  const valueAt = (p: number): number => {
    const i = p * channels;
    return (data[i] + data[i + 1] + data[i + 2]) / 3;
  };
  const isNeutral = (p: number): boolean => chromaAt(p) < NEUTRAL_CHROMA;

  const background = new Uint8Array(pixels);
  // Key every neutral pixel below the noise ceiling (checker, texture, halo).
  for (let p = 0; p < pixels; p += 1) {
    if (isNeutral(p) && valueAt(p) < BRIGHT_NEUTRAL_KEEP) {
      background[p] = 1;
    }
  }
  keepBrightStrokes(
    data,
    width,
    height,
    channels,
    isNeutral,
    valueAt,
    background
  );

  despeckle(data, width, height, channels, isNeutral, background);

  for (let p = 0; p < pixels; p += 1) {
    if (background[p] === 1) {
      data[p * channels + 3] = 0;
    }
  }

  let transparent = 0;
  for (let p = 0; p < pixels; p += 1) {
    if (data[p * channels + 3] === 0) {
      transparent += 1;
    }
  }

  mkdirSync("public", { recursive: true });
  const pipeline = sharp(data, {
    raw: { channels: 4 as const, height, width },
  }).trim();
  const trimmed = await pipeline.toBuffer({ resolveWithObject: true });
  await sharp(trimmed.data, {
    raw: {
      channels: 4 as const,
      height: trimmed.info.height,
      width: trimmed.info.width,
    },
  })
    .webp({ alphaQuality: 90, quality })
    .toFile(output);

  console.log(
    `${input} -> ${output}: ${trimmed.info.width}x${trimmed.info.height}, ` +
      `${((transparent / pixels) * 100).toFixed(1)}% keyed`
  );
};

await Promise.all(
  JOBS.map((job) => extract(job.input, job.output, job.quality))
);
