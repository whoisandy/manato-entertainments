# Manato Entertainments Design System

## 0. Research Log (greenfield)

- Embedded refs: shortlisted `minimalist-skill.md` + `soft-skill.md` (Layer A), user-supplied Framer templates (Layer B) → picked **minimalist-skill (Layer A)** + **Vervee (Layer B, primary aesthetic) + Vibe (Layer B, structural)** because the user said "minimalistic yet artistic" and supplied both template URLs as the visual contract.
- Live token extraction (Playwright, computed styles): **Vervee** — pure black `rgb(0,0,0)` canvas, Gambetta serif 72px w400 lh1.1 ls-0.02em, bone text `rgb(245,240,232)`, secondary `white/65`, hairlines `white/10`–`white/25`, gold `rgb(196,154,37)` (#C49A25, 119 uses), 0px border-radius everywhere, section rhythm 64–100px, nav 88px transparent. **Vibe** — near-black `rgb(8,8,7)`, Clash Display 58px w600, warm sand accent `rgb(251,210,149)`, secondary `white/75`, 160px big-block rhythm. Full-page screenshots: `.playwright-mcp/vervee-full.png`, `.playwright-mcp/vibe-full.png`.
- Brand asset: `public/manato-logo.jpg` 1600×977, **black background, all-gold design** (crown + rising sun, gold serif wordmark, handshake, tagline "Grand Stages | Golden Memories"). Blends seamlessly on black canvas; no frame treatment needed.
- Skipped lanes: lazyweb (reason: user supplied two concrete references), imagen drafts (reason: code-first build with an extracted token contract; hero atmosphere is CSS gold-glow material from the logo's sunburst, not a bitmap focal object).

## 1. Atmosphere & Identity

A concert-house programme booklet printed on black velvet. Quiet, editorial, warm — grey whisper, then gold light. The signature is **gold as stage light**: antique-gold serif headlines at light weight over a pure-black stage, gold numbered numerals and hairlines reading like programme metadata, sharp 0-radius edges (never rounded cards), and one hero moment — an oversized serif line lit by a low gold sunburst glow that echoes the Manato logo. Motion is invisible-but-present: content fades up 12px as it enters, like house lights coming up before a set.

## 2. Color

Dark-only site. No light mode.

### Palette

| Role | Token | Value | Usage |
| --- | --- | --- | --- |
| Surface/stage | --color-stage | #050505 | Page background (pure-black canvas like Vervee, lifted 5 so panels can step) |
| Surface/panel | --color-panel | #0C0C0B | Cards, setlist rows, form, lightbox chrome |
| Surface/elevated | --color-elevated | #141412 | Hover panels, active accordion, chips |
| Text/primary | --color-bone | #F2EDE3 | Headlines, body (warm bone, from Vervee's 245,240,232) |
| Text/secondary | --color-ash | #A8A296 | Secondary copy (solid equivalent of Vervee white/65 on black) |
| Text/tertiary | --color-dust | #6E6A62 | Meta, disabled, footnotes |
| Border/default | --color-hairline | rgba(255,255,255,0.10) | Dividers, card borders (Vervee white/10) |
| Border/strong | --color-hairline-strong | rgba(255,255,255,0.25) | Emphasised dividers (Vervee white/25) |
| Accent/gold-light | --color-gold-300 | #EAD28A | Hover text, highlights, active states |
| Accent/gold | --color-gold-400 | #DBB85C | Kicker labels, numerals, links |
| Accent/gold-base | --color-gold-500 | #C79B32 | Primary gold (bridges logo amber ↔ Vervee #C49A25) |
| Accent/gold-deep | --color-gold-600 | #9C7A22 | Gold on elevated surfaces (contrast), pressed states |
| Accent/gold-wash | --color-gold-wash | rgba(199,155,50,0.14) | Chip backgrounds, focus glows, radial washes |
| Accent/glow-core | --color-glow-core | rgba(199,155,50,0.08) | Hero ambient glow core (≤8% alpha rule, §7) |
| Accent/glow-wide | --color-glow-wide | rgba(199,155,50,0.05) | Hero ambient glow halo |

### Rules

- Gold is the identity accent: kickers, numerals, interactive states, hero glow. Bone (not gold) is the primary button color — gold never floods large surfaces.
- Never introduce a color not in this table. No pure white (#FFFFFF) text — bone only. Status colors omitted: this static site has no error/success states (form is mailto).

## 3. Typography

### Scale

| Level | Size | Weight | Line height | Tracking | Usage |
| --- | --- | --- | --- | --- | --- |
| Display | clamp(2.75rem, 6vw, 4.5rem) | Fraunces 400 | 1.08 | -0.02em | Hero headline (Vervee: 72px/400/-1.44px) |
| H1 | clamp(2rem, 4vw, 3rem) | Fraunces 400 | 1.12 | -0.015em | Section headings |
| H2 | 1.375rem (22px) | Fraunces 500 | 1.3 | 0 | Card/event titles |
| H3 | 1.125rem (18px) | Fraunces 500 | 1.4 | 0 | Small headings |
| Body-lg | 1.125rem (18px) | Geist 400 | 1.65 | 0 | Lead paragraphs |
| Body | 1rem (16px) | Geist 400 | 1.65 | 0 | Default text |
| Body-sm | 0.875rem (14px) | Geist 400 | 1.55 | 0 | Secondary info |
| Caption | 0.75rem (12px) | Geist 500 | 1.4 | 0.02em | Meta, form hints |
| Overline | 0.6875rem (11px) | Geist 600 | 1.3 | 0.22em uppercase | Kicker labels, gold |
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

**Primitive layer: shadcn/ui on Base UI.** Interactive primitives are vendored in
`components/ui/*` (managed by `bunx shadcn@latest add`; excluded from lint/format as
vendored code). The shadcn variable contract is mapped onto this system's palette in
`app/globals.css :root` — `--primary` = bone, `--ring` = gold-400, `--radius` = 0rem
(sharp), `--border` = hairline. Our internal components (`components/primitives.tsx`,
site-header, faq, gallery) compose these: Button (primary = bone bg → gold hover;
ghost = gold hairline outline), Accordion (FAQ, plus-icon rotate), Dialog (lightbox
scrim/portal/focus management), Sheet (mobile menu, side top).

### Button

- **Structure**: `<a>`/`<button>` inline-flex, px-7 py-3.5, radius 0 (sharp — Vervee), text-sm font-medium tracking-wide.
- **Variants**: `primary` — bone bg, black text, hover gold-400 bg; `ghost` — 1px hairline-strong border, bone text, hover gold border+text; `quiet` — text link, bone → gold-300, 40px min height.
- **States**: default/hover (200ms)/active scale(0.98)/focus-visible 2px gold-400 outline offset-3.
- **Accessibility**: real `<a href>`/`<button>`; min 44px touch height.
- **Motion**: background-color+transform 200ms.

### Kicker

- **Structure**: overline row — 11px Geist 600 uppercase 0.22em gold-400, preceded by 24px gold-500 hairline dash; optional mono index (01…).
- **States**: static (non-interactive, no motion).
- **Accessibility**: h2 follows; kicker is `<span>` inside `<p>` — not a heading.

### SectionHeading (kicker + h1 + optional lead)

- **Structure**: Kicker, then H1 Fraunces, then optional lead (body-lg ash, max-w-2xl).
- **Spacing**: kicker mb-4, h1 mb-6, lead mb-12/16.

### StatBlock

- **Structure**: bordered grid (hairline dividers, Vervee 01–04 strip): mono-meta gold index ("01"), big Fraunces value, body-sm ash label.
- **States**: static. **Layout**: 2×2 mobile grid → 4-col md, hairline-only separation.

### EventRow / SetlistRow

- **Structure**: hairline-topped row: mono-meta gold (index/date/venue) | title (H2 Fraunces) | meta (body-sm ash / chips). Setlist: song title + singer (+ "with X" duet, ash; "ft." not used — "with").
- **States**: hover on rows raises bg to panel (event list); setlist rows static.
- **Layout**: grid stacks to single column at 375px.

### GalleryCard

- **Structure**: `<button>` wrapping image, radius 0, 1px hairline border; caption (body-sm ash) below or overlaid.
- **States**: hover — border gold-wash→gold-500/40, image scale 1.02 (transform only); focus-visible gold outline; active scale 0.99.
- **Accessibility**: aria-label "Open photo N: {caption}"; images always have alt.
- **Motion**: 200ms transform/border-color.

### Lightbox (client)

- **Structure**: fixed inset-0 scrim (black/92 + blur), centered figure (image max-h-[82dvh] w-auto), caption + mono counter "3 / 10" bottom, chevron IconBtns mid-sides (≥48px), close top-right, all radius 0, panel borders hairline.
- **States**: open/close 250ms opacity + image scale 0.98→1; hover states on buttons.
- **Accessibility**: role="dialog" aria-modal="true" aria-label="{caption}"; ←/→ navigate, Esc closes; focus moves to close button on open, returns to trigger on close; body scroll locked.
- **Motion**: scrim opacity 250ms, image transform/opacity only.

### AccordionItem (FAQ)

- **Structure**: `<h3><button aria-expanded>` + answer div; hairline border-b only (minimalist-skill: strip boxes); plus/minus toggle (SVG, rotates +→− via transform).
- **States**: hover title → gold-300; open: button aria-expanded=true, answer fades (opacity 200ms — no height animation), bg stays stage.
- **Accessibility**: full keyboard; answer region tied via aria-controls.
- **Motion**: toggle icon transform 200ms; answer opacity 200ms (GPU-only rule respected).

### FormField

- **Structure**: label (body-sm bone) + input/textarea: bg panel, 1px hairline border, radius 0, px-4 py-3, text bone; focus — border gold-500 + 3px gold-wash ring.
- **States**: default/focus/placeholder dust; required attrs native.
- **Accessibility**: every input labelled; autocomplete attrs; form submit builds mailto (no backend).

### IconBtn (chevrons, close, hamburger)

- **Structure**: 48×48 button, inline SVG stroke 1.5 consistent 24px grid, bone stroke, hairline border.
- **States**: hover — border-strong + gold-300 stroke; focus-visible gold outline; active scale 0.98.
- **Accessibility**: aria-label mandatory.

### NavItem

- **Structure**: body-sm ash, hover bone + gold-400 2px underline offset; active section not tracked (static site).
- **States**: hover/focus-visible.

## 6. Motion & Interaction

### Timing

| Type | Duration | Easing | Usage |
| --- | --- | --- | --- |
| Micro | 150ms | ease-out | Active press scale(0.98) |
| Standard | 200ms | ease-in-out | Hovers, accordion fade, menu |
| Emphasis | 250–600ms | cubic-bezier(0.16, 1, 0.3, 1) | Lightbox open (250ms), scroll reveals (600ms) |
| Ambient | 26s loop | linear infinite | Hero glow slow drift (opacity/transform only) |

### Rules

- Animate transform + opacity ONLY (height animation banned — accordion answers fade, not slide).
- Scroll reveals: `Reveal` client component, IntersectionObserver (no scroll listeners), translateY(12px)→0 + opacity, 600ms, threshold 0.15, once. Applied to section headers and major blocks, not every list row.
- Every interactive element: hover + active + focus-visible.
- `prefers-reduced-motion: reduce` — reveals render immediately (no translate), ambient drift off, lightbox opens without scale.

## 7. Depth & Surface

**Strategy: borders-only.** Zero box-shadows on the page (Vervee uses none; minimalist-skill bans heavy shadows).

- Default: 1px solid var(--color-hairline) — cards, rows, form, nav bottom.
- Subtle: var(--color-hairline-strong) — emphasized dividers (stats grid internal lines, ghost button border).
- Depth via tonal steps only: stage #050505 → panel #0C0C0B → elevated #141412.
- The ONE allowed glow: hero atmosphere — a fixed, pointer-events-none radial gold wash (gold-500 at ≤8% alpha, drifting 26s) + the logo's own sunburst echo. It is atmosphere from the brand's sunburst logo, not a shadow.
- Lightbox scrim (black/92 + backdrop-blur) is an overlay, not a shadow.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- WCAG 2.2 AA. Contrast: bone #F2EDE3 on #050505 ≈ 16:1; ash #A8A296 ≈ 7.8:1; gold-400 #DBB85C ≈ 9.5:1; gold-500 #C79B32 on stage ≈ 7.2:1 (kicker/numerals); gold-600 only on elevated surfaces. All pass 4.5:1 body / 3:1 large.
- Visible focus (2px gold-400 outline, 3px offset) on every interactive element; full keyboard reachability: nav, mobile menu (Esc closes), lightbox (←/→/Esc + focus trap-in/out), accordion, form.
- Semantic landmarks: header/nav/main/section[aria-labelledby]/footer; one h1 (hero); kicker spans never headings; images always alt'd; inputs always labelled.
- prefers-reduced-motion respected (Section 6).

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
| --- | --- | --- | --- |
| Contact form is mailto-only, no backend | components/contact-form.tsx | Launch scope is explicitly static — no dynamic functionality | User wires a form service post-launch |
| Gallery images are generated SVG placeholders | public/gallery/*.svg | No real event photos exist yet; site must work offline, no external CDNs | User replaces files, captions in lib/content.ts |
| Primitive Showcase Gate via the page itself, not a separate showcase route | app/page.tsx | User constraint: single page only; the page exercises every primitive + state at 375/768/1280 during visual QA | — |
| react-scan wired via manual dev-gated snippet (CLI prompt failed) | app/layout.tsx | Canonical manual install from react-dev-tooling-skill; verified dev-gated | — |
| Fraunces/Geist fetched at build time via next/font | app/layout.tsx | Self-hosted output; build needs network once | — |
| Logo is a 1600×977 JPG (127KB) served as-is | public/manato-logo.jpg | Fine for 2× displays; pre-launch optimization unnecessary | Convert to AVIF/WebP with transparent cutout if size ever matters |
