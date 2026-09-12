/**
 * Floor light at a section's bottom edge — the exact footer-band recipe
 * (35% × 128px pool at 50%/100%, α0.08), giving every nav-target section
 * a soft seam into the next one. Pure CSS, server-safe; `section-fx`
 * keeps it an absolute z-0 overlay (exempt from the `.section-glow > *`
 * flow rule). Decorative only.
 */
export const SectionFloorLight = () => (
  <div
    aria-hidden="true"
    className="section-fx absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(35%_128px_at_50%_100%,rgba(247,248,252,0.08),transparent)]"
  />
);
