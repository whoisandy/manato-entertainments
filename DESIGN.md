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
| Mono-meta | 0.8125rem (13px) | Geist Mono 400 | 1.4 | 0.05em | Numerals, counters, setlist numbers, chips |

### Font stack

- Display serif: **Fraunces** (next/font/google, self-hosted; wght 400/500; opsz auto) — stands in for Vervee's Gambetta with warmer, more characterful light-weight old-style forms.
- Primary sans: **Geist** (scaffold default; minimalist-skill-approved).
- Mono: **Geist Mono** — programme numerals/meta (minimalist-skill mono signature).

### Rules

- Serif = voice (headlines, quotes); Sans = UI/body; Mono = numbers and metadata. Headlines always weight 400–500, never bold (Vervee signature).
- Body never below 14px. Display uses clamp() — never fixed 72px that breaks mobile.

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

- **Structure**: bordered grid (hairline dividers, Vervee 01–04 strip): mono-meta crest index ("01"), big Fraunces value, body-sm ash label.
- **States**: static. **Layout**: 2×2 mobile grid → 4-col md, hairline-only separation.

### EventRow / SetlistRow

- **Structure**: hairline-topped row: mono-meta crest (index/date/venue) | title (H2 Fraunces) | meta (body-sm ash / chips). Setlist: song title + singer (+ "with X" duet, ash; "ft." not used — "with").
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
| Ambient | 1.2s cross-fade / 6s cycle | easeInOut | Hero photo backdrop (motion AnimatePresence) |

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
- Hero atmosphere: the brand photo backdrop, Vervee-style — a photo panel hugging the right on md+ (full-bleed on mobile), cycling via `motion` AnimatePresence (1.2s cross-fade every 6s), 2px blur + 105% scale, blended into the stage by a left-edge dark gradient (`from-stage via-stage/55 to-transparent`) plus top/bottom blends; mobile keeps a flat `stage/55` scrim under stacked text. Grain overlay stays.
- Section ambience: per-section radial gradient washes (pure CSS, server-safe) inside each content section — absolutely positioned pseudo-elements or child divs with `pointer-events-none`, `aria-hidden`, low-alpha radial gradients bleeding to transparent. Each section gets a distinct placement/combination so the navy canvas shifts subtly as the user scrolls.
  - **Tokens**: reuse existing `--color-silver-wash` (rgba(247,248,252,0.14)) and `--color-crest-wash` (rgba(224,182,88,0.16)) at reduced alpha (≤0.08–0.10 effective) so text contrast stays WCAG AA (bone/ash on stage remains ≥4.5:1 over the wash). No new colors.
  - **Placement**: About — silver wash upper-left; Events — faint crest wash upper-right; Gallery — silver lower-right; FAQ — crest upper-left; Contact — silver right. Total per-section wash alpha ≤ 0.10.
  - **Motion**: at most ONE slow drifting layer per section, CSS `@keyframes` animating `transform` (`translate` / `scale`) only, 20–30s `ease-in-out` `alternate infinite`. Disabled under `prefers-reduced-motion: reduce` (static gradient paint). NO `background-position` animation (repaints every frame — forbidden after performance fix).
  - **Performance**: compositor-only (`transform`/`opacity`); static gradient paint otherwise; no `backdrop-filter` on these layers; no new JS/client components.
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
