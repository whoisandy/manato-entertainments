# MANATO Entertainments Design System

> **v2 Retheme (2026-09-12):** the brand moved from black/gold to **navy blue + white** with new logo assets (`public/assets/manato-navy-no-sparkle.png` — navy bg #01102A, white mark, gold crest #E0B658). All `gold-*` tokens are renamed: `silver-*` = white/silver interactive accent, `crest-*` = crest gold (numerals/decoration only). Section 0 is the historical v1 research log; where prose below says "gold stage light" or "black velvet", read it as "silver on navy" per the Section 2 palette.
>
> **v2 Logos:** header uses the crown mark (`public/manato-crown.webp`, h-12/56px), footer uses the full-colour lockup (`public/manato-lockup.webp`, h-24/128px). Both are extracted from the stakeholder's opaque checkerboard PNGs (`public/assets/manato-crown.png`, `manato-full-color-no-sparkle.png`) by `bun run extract-logo` (border flood-fill + checker-tone keying + global chroma key); re-run it only if the source assets change. The grey-ground variants (`manato-black-white-no-sparkle.png`, `manato-full-color-no-sparkle.png` raw) are not usable on navy; the navy square (`manato-navy-no-sparkle.png`) remains the OG image. The v1 sprite webps and `scripts/split-logo.ts` were removed.

## 0. Research Log (greenfield)

- Embedded refs: shortlisted `minimalist-skill.md` + `soft-skill.md` (Layer A), user-supplied Framer templates (Layer B) → picked **minimalist-skill (Layer A)** + **Vervee (Layer B, primary aesthetic) + Vibe (Layer B, structural)** because the user said "minimalistic yet artistic" and supplied both template URLs as the visual contract.
- Live token extraction (Playwright, computed styles): **Vervee** — pure black `rgb(0,0,0)` canvas, Gambetta serif 72px w400 lh1.1 ls-0.02em, bone text `rgb(245,240,232)`, secondary `white/65`, hairlines `white/10`–`white/25`, gold `rgb(196,154,37)` (#C49A25, 119 uses), 0px border-radius everywhere, section rhythm 64–100px, nav 88px transparent. **Vibe** — near-black `rgb(8,8,7)`, Clash Display 58px w600, warm sand accent `rgb(251,210,149)`, secondary `white/75`, 160px big-block rhythm. Full-page screenshots: `.playwright-mcp/vervee-full.png`, `.playwright-mcp/vibe-full.png`.
- Brand asset: `assets/manato-logo-sprite.png` 1296×832, transparent — split by `scripts/split-logo.ts` into `public/manato-logo.webp` (left half, vivid gold vertical lockup: crown + rising sun, serif wordmark, handshake, tagline) and `public/manato-logo-footer.webp` (right half, dimmed variant). 399×512 each, ~30KB.
- Skipped lanes: lazyweb (reason: user supplied two concrete references), imagen drafts (reason: code-first build with an extracted token contract; hero atmosphere is now the brand photo backdrop (user-supplied photos), not CSS glow material).

## 1. Atmosphere & Identity

A concert-house programme booklet printed on navy velvet. Quiet, editorial, cool — navy whisper, then white light. The signature is **silver as stage light**: white serif headlines at light weight over a deep-navy stage, crest-gold numbered numerals and hairlines reading like programme metadata, sharp 0-radius edges (never rounded cards), and one hero moment — an oversized serif line over a slowly cross-fading cycle of brand photographs, dimmed to stage light by a navy scrim. Motion is invisible-but-present: content fades up 12px as it enters, like house lights coming up before a set.

## 2. Color

Dark-only site. No light mode.

### Palette

| Role | Token | Value | Usage |
| --- | --- | --- | --- |
| Surface/stage | --color-stage | #010F29 | Page background (navy canvas, extracted from logo bg #01102A, lifted to beat the darkest photo pixel) |
| Surface/panel | --color-panel | #0A1A38 | Cards, setlist rows, form, lightbox chrome |
| Surface/elevated | --color-elevated | #122447 | Hover panels, active accordion, chips |
| Text/primary | --color-bone | #F7F8FC | Headlines, body (cool white; pure #FFFFFF reserved to the logo mark) |
| Text/secondary | --color-ash | #B3BDD4 | Secondary copy (white/72 on navy) |
| Text/tertiary | --color-dust | #8D99B8 | Meta, footnotes (≥4.5:1 on stage — AA-passing) |
| Border/default | --color-hairline | rgba(247,248,252,0.12) | Dividers, card borders |
| Border/strong | --color-hairline-strong | rgba(247,248,252,0.28) | Emphasised dividers |
| Accent/silver-light | --color-silver-300 | #EEF1F8 | Hover text, highlights, active states |
| Accent/silver | --color-silver-400 | #D9DFEF | Focus ring, interactive accents |
| Accent/silver | --color-silver-500 | #B6C0D8 | Secondary interactive accent |
| Accent/silver-deep | --color-silver-600 | #7E8CAB | Silver on elevated surfaces, pressed states |
| Accent/silver-wash | --color-silver-wash | rgba(247,248,252,0.14) | Chip backgrounds, focus glows, radial washes |
| Accent/crest-light | --color-crest-300 | #F6D996 | Crest-gold hover text, italic flourishes |
| Accent/crest | --color-crest-400 | #ECC777 | Kicker labels, numerals, mono meta |
| Accent/crest | --color-crest-500 | #E0B658 | Crest gold (extracted from logo crest) — kicker dashes, pull-quote border, chips |
| Accent/crest-deep | --color-crest-600 | #B58E3F | Crest on elevated surfaces, pressed states |
| Accent/crest-wash | --color-crest-wash | rgba(224,182,88,0.16) | Chip backgrounds |

### Rules

- White/silver is the identity accent for interaction (focus, hover, buttons). Crest gold is decoration: numerals, kickers, the pull-quote rule — it never floods large surfaces (matches the logo, where gold is the crest only).
- Never introduce a color not in this table. Pure #FFFFFF text is reserved to the logo mark; UI text uses bone #F7F8FC. Status colors omitted: this static site has no error/success states (form is mailto).

## 3. Typography

### Scale

| Level | Size | Weight | Line height | Tracking | Usage |
| --- | --- | --- | --- | --- | --- |
| Display | clamp(2.75rem, 6vw, 4.5rem) | Fraunces 400 | 1.08 | -0.02em | Hero headline (Vervee: 72px/400/-1.44px) |
| H1 | clamp(2rem, 4vw, 3rem) | Fraunces 400 | 1.12 | -0.015em, uppercase | Section headings (Vervee sets display headings uppercase) |
| H2 | 1.375rem (22px) | Fraunces 500 | 1.3 | 0 | Card/event titles |
| H3 | 1.125rem (18px) | Fraunces 500 | 1.4 | 0 | Small headings |
| Body-lg | 1.125rem (18px) | Geist 400 | 1.65 | 0 | Lead paragraphs |
| Body | 1rem (16px) | Geist 400 | 1.65 | 0 | Default text |
| Body-sm | 0.875rem (14px) | Geist 400 | 1.55 | 0 | Secondary info |
| Caption | 0.75rem (12px) | Geist 500 | 1.4 | 0.02em | Meta, form hints |
| Overline | 0.6875rem (11px) | Geist 600 | 1.3 | 0.22em uppercase | Kicker labels, crest |

### Font stack

- Display serif: **Fraunces** (next/font/google, self-hosted; wght 400/500; opsz auto) — stands in for Vervee's Gambetta with warmer, more characterful light-weight old-style forms.
- Primary sans: **Geist** (scaffold default; minimalist-skill-approved). **Mono removed (2026-09-12, stakeholder request):** all numerals/meta/kicker labels now use the Geist sans baseline for uniform consistency; Geist Mono is no longer loaded.

### Rules

- Serif = voice (headlines, quotes); Sans = UI/body; Mono = numbers and metadata. Headlines always weight 400–500, never bold (Vervee signature).
- Body never below 14px. Display uses clamp() — never fixed 72px that breaks mobile. Documented exception (2026-09-12, stakeholder request): the footer's closing band stacks to copyright-only on mobile at ~10px, left-aligned and compact; footer columns keep desktop sizes at every breakpoint. Contrast still passes AA at any size.
- **Hero strapline (2026-09-12, stakeholder request):** the strapline is a glass pill — `rounded-full` wrapper carrying a washed-out bone gradient (`135deg`, bone α0.22 → α0.07) over `backdrop-blur-lg` with a `hairline-strong` border; the silver shimmer text (ash → silver-300 → ash, reduced-motion fallback ash) rides inside as a nested span (its `background-clip: text` needs its own layer, separate from the wrapper's gradient fill). Second documented exception to the site-wide 0-radius rule (after the gallery tab pills).

## 4. Spacing & Layout

### Base Unit — 4px. Tailwind default scale (all multiples of 4).

| Intent | Token | Value |
| --- | --- | --- |
| Section rhythm | py-20 / md:py-28 | 80px / 112px (Vervee's 64–100 range) |
| Hero rhythm | pt-36 pb-24 / md:pt-44 md:pb-32 | clears fixed nav |
| Card padding | p-6 / p-8 | 24 / 32px |
| Stack gaps | gap-4 → gap-12 | 16–48px |

### Grid

- Max content width: 72rem (1152px, max-w-6xl), prose measures max-w-2xl/3xl.
- Gallery: 2 cols mobile → 3 sm → 4 lg, gap-3/gap-4.
- Breakpoints: Tailwind defaults (sm 640 / md 768 / lg 1024 / xl 1280).

### Rules

- Asymmetric section padding is intentional: sections breathe tighter at the top (pt-16/20) than the bottom (pb-24/28) so headings sit closer to their content — Vervee's 100/80 rhythm.
- Browser mechanics (clamp(), min-h-[100dvh], aspect-ratio) stay raw.

## 5. Components

**Primitive layer: shadcn/ui on Base UI.** Interactive primitives are vendored in `components/ui/*` (managed by `bunx shadcn@latest add`; excluded from lint/format as vendored code). The shadcn variable contract is mapped onto this system's palette in `app/globals.css :root` — `--primary` = bone, `--ring` = silver-400, `--radius` = 0rem (sharp), `--border` = hairline. Our internal components (`components/primitives.tsx`, site-header, faq, gallery) compose these: Button (primary = bone bg → crest hover; ghost = hairline-strong outline), Accordion (FAQ, plus-icon rotate), Dialog (lightbox scrim/portal/focus management), Sheet (mobile menu, side top).

### Button

- **Structure**: `<a>`/`<button>` inline-flex, px-7 py-3.5, radius 0 (sharp — Vervee), text-sm font-medium tracking-wide.
- **Variants**: `primary` — bone bg, navy text, hover crest-400 bg; `ghost` — 1px hairline-strong border, bone text, hover crest border+text; `quiet` — text link, bone → crest-300, 40px min height.
- **Icons**: main action CTAs carry a leading lucide glyph (`size-4`, `currentColor`, inherits the button's text color) — calendar family for planning actions, `ArrowRight` for forward/secondary actions. Icons are decorative (`aria-hidden` via lucide default) — the label alone is read.
- **States**: default/hover (200ms)/active scale(0.98)/focus-visible 2px crest-400 outline offset-3.
- **Accessibility**: real `<a href>`/`<button>`; min 44px touch height.
- **Motion**: background-color+transform 200ms.

### Kicker

- **Structure**: overline row — 11px Geist 600 uppercase 0.22em crest-400, preceded by 24px crest-500 hairline dash; optional mono index (01…).
- **States**: static (non-interactive, no motion).
- **Accessibility**: h2 follows; kicker is `<span>` inside `<p>` — not a heading.

### SectionHeading (kicker + h1 + optional lead)

- **Structure**: Kicker, then H1 Fraunces, then optional lead (body-lg ash, max-w-2xl).
- **Spacing**: kicker mb-4, h1 mb-6, lead mb-12/16.

### StatBlock

- **Structure**: bordered grid (hairline dividers, Vervee 01–04 strip): crest index ("01"), big Fraunces value, body-sm ash label.
- **States**: static. **Layout**: 2×2 mobile grid → 4-col md, hairline-only separation.

### EventRow / SetlistRow

- **Structure**: hairline-topped row: crest meta (index/date/venue) | title (H2 Fraunces) | meta (body-sm ash / chips). Setlist: song title + singer (+ "with X" duet, ash; "ft." not used — "with").
- **States**: hover on rows raises bg to panel (event list); setlist rows static.
- **Layout**: grid stacks to single column at 375px.

### GalleryCard

- **Structure**: `<button>` wrapping image, radius 0, 1px hairline border; caption (body-sm ash) below or overlaid.
- **States**: hover — border crest-wash→crest-500/40, image scale 1.02 (transform only); focus-visible crest outline; active scale 0.99.
- **Accessibility**: aria-label "Open photo N: {caption}"; images always have alt.
- **Motion**: 200ms transform/border-color.

### GalleryTabs / TabPills

- **Structure**: shadcn/Base UI Tabs (`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`) inside the gallery section. Two tabs: "Photos" (default) and "Videos". The tab list is a single hairline-bordered container (`border-hairline`, `bg-transparent` or `bg-panel`) holding two pill-shaped triggers.
- **Tokens**: active pill uses `--color-bone` background with `--color-stage` text (primary button signature); inactive pill is transparent with `--color-ash` text, hover → `--color-bone` text; focus-visible = 2px `--color-silver-400` outline, 3px offset per the focus contract. Container border uses `--color-hairline`.
- **States**: default/hover (200ms ease-in-out)/active (`scale(0.98)`)/focus-visible. Tab switch is instant (no cross-fade on content — Base UI handles roving tabindex and arrow-key navigation).
- **Accessibility**: Base UI Tabs provides roving `tabindex`, ←/→ arrow-key switching, and `aria-selected` out of the box. Each `TabsTrigger` has `aria-controls` pointing to its `TabsContent` panel. Photos tab content is the existing photo grid + lightbox (keyboard ←/→/Esc, focus trap, focus return unchanged). Videos tab content is decorative placeholder cards marked with `aria-label="Video placeholder"`.
- **Motion**: background-color + color transitions 200ms ease-in-out on pills. No animation on tab content swap.
- **Accepted deviation**: The stakeholder explicitly requested pill-shaped tabs, so `TabsTrigger` uses `rounded-full` as a documented exception to the site-wide 0-radius sharp-edge rule. This is the only rounded element on the page.

### Lightbox (client)

- **Structure**: fixed inset-0 scrim (black/92 + blur), centered figure (image max-h-[82dvh] w-auto), caption + mono counter "3 / 10" bottom, chevron IconBtns mid-sides (≥48px), close top-right, all radius 0, panel borders hairline.
- **States**: open/close 250ms opacity + image scale 0.98→1; hover states on buttons.
- **Accessibility**: role="dialog" aria-modal="true" aria-label="{caption}"; ←/→ navigate, Esc closes; focus moves to close button on open, returns to trigger on close; body scroll locked.
- **Motion**: scrim opacity 250ms, image transform/opacity only.

### AccordionItem (FAQ)

- **Structure**: `<h3><button aria-expanded>` + answer div; hairline border-b only (minimalist-skill: strip boxes); plus/minus toggle (SVG, rotates +→− via transform).
- **States**: hover title → crest-300; open: button aria-expanded=true, answer fades (opacity 200ms — no height animation), bg stays stage.
- **Accessibility**: full keyboard; answer region tied via aria-controls.
- **Motion**: toggle icon transform 200ms; answer opacity 200ms (GPU-only rule respected).

### FormField

- **Structure**: label (body-sm bone) + input/textarea: bg panel, 1px hairline border, radius 0, px-4 py-3, text bone; focus — border crest-500 + 3px crest-wash ring.
- **States**: default/focus/placeholder dust; required attrs native.
- **Accessibility**: every input labelled; autocomplete attrs; form submit builds mailto (no backend).

### IconBtn (chevrons, close, hamburger)

- **Structure**: 48×48 button, inline SVG stroke 1.5 consistent 24px grid, bone stroke, hairline border.
- **States**: hover — border-strong + crest-300 stroke; focus-visible crest outline; active scale 0.98.
- **Accessibility**: aria-label mandatory.

### ParticleNetwork (Contact bottom field)

- **Structure**: native zero-dependency `<canvas>` strip (mechanism extracted from the particles.js pattern; no CDN script, no `@ts-ignore`). Anchors the Contact section's bottom edge — `absolute inset-x-0 bottom-0 h-64 md:h-80`, class `section-fx mask-fade-t` (fades upward to transparent at ~94%), `intensity={0.65}` alpha multiplier for the quieter field. `.section-fx` exempts it from the `.section-glow > *` relative/z-1 flow rule.
- **Rendering**: drifting motes (silver-300 / crest-300, radius 1–2.6, alpha 0.30–0.65 × intensity) joined by 1px hairline proximity links (silver-500, alpha ≤0.32 × intensity, distance 120px); pointer "grab" draws crest-400 threads to motes within 170px. Count = clamp(area/9000, 20, 90); DPR capped at 2; bounce at edges.
- **States**: static single frame under prefers-reduced-motion (no loop, no pointer listening); rAF pauses via IntersectionObserver (rootMargin 80px) + `visibilitychange`; ResizeObserver reseeds; full teardown on unmount.
- **Interaction**: `pointer-events: none` on the canvas — pointermove is listened on the section passively and only feeds the grab lines, so text selection/clicks/hover are untouched. The demo's click-to-push mode is omitted (it would require intercepting clicks).
- **Accessibility**: canvas + wrapper `aria-hidden`; purely decorative.
- **Motion budget**: quiet counterweight under the Contact form; the `section-glow-contact` CSS wash remains as ambience beneath it. Off-screen pause keeps it off the compositor everywhere else. (Was the About strip until 2026-09-12, when the About signature moved to `LightBeams`.)

### DottedGlowCorner (featured-event card corners)

- **Structure**: vendored aceternity `DottedGlowBackground` (`components/ui/dotted-glow-background.tsx`, installed via `bunx shadcn@latest add @aceternity/dotted-glow-background-demo`; demo scaffold removed) wrapped by `components/dotted-glow.tsx`. Two patches mounted as the featured-event card's first children with `section-fx` — `.border-beam > .section-fx` keeps them absolute at the card's z-2 level (`.border-beam > *` pins children there), first in DOM so card content paints above.
- **Placement (2026-09-12)**: both corners at every breakpoint — top-left (`top-0 left-0 h-40 w-56 md:h-64 md:w-[24rem]`) and bottom-right (`bottom-0 right-0`, same size).
- **Mask**: `mask-radial-at-top-left` / `mask-radial-at-bottom-right`, both `mask-radial-to-75%` — each dot field dissolves toward the card interior from its anchored corner.
- **Tokens**: silver-500-based dot `rgba(182,192,216,0.6)` pulsing with a crest-400 glow `rgba(236,199,119,0.85)`; layer `opacity 0.5`, `gap 14`, `radius 1.3`, speeds 0.3–1.2 rad/s × 0.9 (slower than the demo). No cyan/blue demo colors.
- **States**: the vendored canvas has no reduced-motion path, so the wrapper renders nothing under prefers-reduced-motion (decorative layer — losing it is acceptable; animating it is not). The vendored IO gate skips drawing off-screen.
- **Accessibility**: wrappers `aria-hidden`; `pointer-events-none` on both wrappers and canvases; no interactivity is intercepted.

### LightBeams (gallery + About signature atmosphere)

- **Structure**: vendored aceternity `BackgroundBeams` (`components/ui/background-beams.tsx`, installed via `bunx shadcn@latest add @aceternity/background-beams-demo`; demo scaffold removed) wrapped by `components/light-beams.tsx` (renamed from `gallery-beams.tsx`, 2026-09-12). Mounted twice as `section-fx mask-fade-b` strips at the top of a section — gallery `h-72 md:h-[26rem]`; About `h-72 md:h-[28rem]` — fading to transparent at ~94% height. About additionally pairs this with the shared `SectionFloorLight` at its bottom edge (2026-09-12: extracted to `components/section-floor-light.tsx` and mounted on every nav section).
- **Beam geometry**: 51 light threads flowing from the top edge down and left-to-right (the vendored path field), filling the strip full-bleed (`preserveAspectRatio="none"` on the svg so the field stretches edge-to-edge). About pairs it with the section's top-edge light pool (`.section-glow-about`, the footer band's radial treatment scaled up).
- **Surgical vendored edits (documented)**: (1) `import { motion }` → `import { m as motion }` — the site's `LazyMotionProvider` is strict and throws on the full `motion` entry; (2) gradient stops re-themed — beam `#18CCFC/#6344F5/#AE48FF` → silver-300 `#EEF1F8` / crest-400 `#ECC777` / crest-500 `#E0B658`, static mesh `#d4d4d4` → silver-500 `#B6C0D8`; (3) `preserveAspectRatio="none"`. No other vendored behavior changed.
- **States**: the 50 SVG gradients animate on a shared rAF loop with no visibility gate, so the wrapper unmounts the field when the strip leaves the viewport (IntersectionObserver, 160px hysteresis band) and remounts it on return; renders nothing under prefers-reduced-motion (decorative layer). `pointer-events: none` throughout.
- **Accessibility**: strip + host `aria-hidden`; purely decorative; section interactivity untouched.

### SectionFloorLight (nav-section seam)

- **Structure**: pure-CSS server component (`components/section-floor-light.tsx`) — `section-fx absolute inset-x-0 bottom-0 h-32` with `radial-gradient(35% 128px at 50% 100%, rgba(247,248,252,0.08), transparent)`: a silver floor light pooled at a section's bottom edge, reading as a soft seam into the next section. Same footprint as the footer band's original treatment.
- **Usage**: About, Events, Gallery, FAQ — every nav section carries one at its own bottom edge (2026-09-12, stakeholder correction round: the pools use the quiet footer-band footprint — 35% × 128px, α0.08 — so a seam reads as a soft edge light, not the wide plate the earlier 45%-wide draft produced). Contact carries the same treatment as a dedicated overlay at its bottom edge — moved out of the footer's top edge (2026-09-12) so it layers over the particle field and the contact→footer seam keeps exactly one light at the bottom.
- **Accessibility**: `aria-hidden`, purely decorative; no interaction impact.

### NavItem

- **Structure**: body-sm ash, hover bone + crest-400 2px underline offset; active section not tracked (static site).
- **States**: hover/focus-visible.

## 6. Motion & Interaction

### Timing

| Type | Duration | Easing | Usage |
| --- | --- | --- | --- |
| Micro | 150ms | ease-out | Active press scale(0.98) |
| Standard | 200ms | ease-in-out | Hovers, accordion fade, menu |
| Emphasis | 250–600ms | cubic-bezier(0.16, 1, 0.3, 1) | Lightbox open (250ms), scroll reveals (600ms) |
| Ambient | 1.2s cross-fade / 6s cycle / 7.2s zoom-out | easeInOut | Hero photo backdrop (motion AnimatePresence) |

### Rules

- **Animation engine: `motion`** (npm, the framer-motion successor — battle-tested). All reveal and cross-fade animation goes through it; scroll reveals via `whileInView` (`viewport.once`), reduced motion via `useReducedMotion`.

- Animate transform + opacity ONLY (height animation banned — accordion answers fade, not slide).
- Scroll reveals: `Reveal` client component, IntersectionObserver (no scroll listeners), translateY(12px)→0 + opacity, 600ms, threshold 0.15, once. Applied to section headers and major blocks, not every list row.
- Every interactive element: hover + active + focus-visible.
- `prefers-reduced-motion: reduce` — reveals render immediately (no translate), ambient drift off, lightbox opens without scale.

## 7. Depth & Surface

**Strategy: borders-only.** Zero box-shadows on the page (Vervee uses none; minimalist-skill bans heavy shadows).

- Default: 1px solid var(--color-hairline) — cards, rows, form, nav bottom.
- Subtle: var(--color-hairline-strong) — emphasized dividers (stats grid internal lines, ghost button border).
- Depth via tonal steps only: stage #010F29 → panel #0A1A38 → elevated #122447.
- Hero atmosphere: the brand photo backdrop, Vervee-style — a photo panel hugging the right on md+ (full-bleed on mobile), cycling via `motion` AnimatePresence (1.2s cross-fade every 6s) with a slow Ken Burns zoom-out (1.2 → 1.05 over 7.2s per layer — the 5% end buffer hides the 2px blur edge bleed), 2px blur, blended into the stage by a left-edge dark gradient (`from-stage via-stage/55 to-transparent`) plus top/bottom blends; mobile keeps a flat `stage/55` scrim under stacked text. Grain overlay stays.
- Section ambience: per-section radial gradient washes (pure CSS, server-safe) inside each content section — absolutely positioned pseudo-elements or child divs with `pointer-events-none`, `aria-hidden`, low-alpha radial gradients bleeding to transparent. Each section gets a distinct placement/combination so the navy canvas shifts subtly as the user scrolls.
  - **Tokens**: reuse existing `--color-silver-wash` (rgba(247,248,252,0.14)) and `--color-crest-wash` (rgba(224,182,88,0.16)) at reduced alpha (≤0.08–0.10 effective) so text contrast stays WCAG AA (bone/ash on stage remains ≥4.5:1 over the wash). No new colors.
  - **Placement**: About — silver light pooled at the section's top edge (footer-band radial treatment: `ellipse 45% 16% at 50% 8%`, α0.12; radii are per-section vars `--glow-rx/--glow-ry`); Events — faint crest wash upper-right; Gallery — silver lower-right; FAQ — crest upper-left; Contact — silver right. Total per-section wash alpha ≤ 0.10–0.12.
  - **Motion**: at most ONE slow drifting layer per section, CSS `@keyframes` animating `transform` (`translate` / `scale`) only, 20–30s `ease-in-out` `alternate infinite`. Disabled under `prefers-reduced-motion: reduce` (static gradient paint). NO `background-position` animation (repaints every frame — forbidden after performance fix).
  - **Performance**: compositor-only (`transform`/`opacity`); static gradient paint otherwise; no `backdrop-filter` on these layers; no new JS/client components. Drift layers carry no permanent `will-change` — the running transform animation promotes the layer on its own, and a pinned `will-change` held five full-section textures in GPU memory at every scroll position (measured jank fix, 2026-09-12).
  - **Fixed header**: glassy when scrolled — `bg-stage/85` + `backdrop-blur-sm`. `blur-sm` (8px in Tailwind v4) instead of a larger radius: the backdrop re-filters every frame during scroll, so the blur is kept to the cheapest radius that still reads as glass on the 85%-opaque navy.
  - **Structure**: each section wrapper adds `overflow-hidden` (safe — inner `max-w-6xl` container already constrains content); wash layers are `absolute inset-0` or positioned with negative offsets to bleed past edges.
- Lightbox scrim (black/92 + backdrop-blur) is an overlay, not a shadow.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- WCAG 2.2 AA. Contrast: bone #F7F8FC on #010F29 ≈ 18:1; ash #B3BDD4 ≈ 10.1:1; dust #8D99B8 ≈ 6.7:1; crest-400 #ECC777 ≈ 11.8:1 (kicker/numerals); crest-500 #E0B658 ≈ 10:1; crest-600 #B58E3F only on elevated surfaces (5:1). All pass 4.5:1 body / 3:1 large.
- Visible focus (2px crest-400 outline, 3px offset) on every interactive element; full keyboard reachability: nav, mobile menu (Esc closes), lightbox (←/→/Esc + focus trap-in/out), accordion, form.
- Semantic landmarks: header/nav/main/section[aria-labelledby]/footer; one h1 (hero); kicker spans never headings; images always alt'd; inputs always labelled.
- prefers-reduced-motion respected (Section 6).

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
| --- | --- | --- | --- |
| Contact form is mailto-only, no backend | components/contact-form.tsx | Launch scope is explicitly static — no dynamic functionality | User wires a form service post-launch |
| Hero/gallery photos are user-supplied JPGs (≤1600px) served as-is to next/image | public/photos/*.jpg | Fine for 2× displays at current sizes; sharp optimizes to AVIF/WebP at runtime | Convert hero set to pre-sized AVIF if LCP budget slips |
| Primitive Showcase Gate via the page itself, not a separate showcase route | app/page.tsx | User constraint: single page only; the page exercises every primitive + state at 375/768/1280 during visual QA | — |
| react-scan wired via manual dev-gated snippet (CLI prompt failed) | app/layout.tsx | Canonical manual install from react-dev-tooling-skill; verified dev-gated | — |
| Fraunces/Geist fetched at build time via next/font | app/layout.tsx | Self-hosted output; build needs network once | — |
