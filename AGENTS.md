<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MANATO Entertainments — project rules

## Toolchain

- Package manager: **bun only** (`bun add`, `bunx`, `bun run`). Never npm/yarn/pnpm.
- Lint/format: **oxlint + oxfmt** via ultracite — `bun run check` lints, `bun run fix` formats+autofixes. Vendored code (`components/ui/**`, `hooks/**`) and agent artifacts (`.playwright-mcp/**`) are excluded from both — do not restyle them by hand.
- Build: `bun run build` (Next.js 16, Turbopack default for dev and build). Dev: `bun run dev`.
- Tailwind CSS v4 — theme tokens live in `app/globals.css` via `@theme`; there is no `tailwind.config.js`.
- UI primitives are **shadcn/ui on Base UI** (`components/ui/*`, managed by `bunx shadcn@latest add`). The shadcn variable contract is mapped onto the MANATO palette in `app/globals.css` `:root`. Do not restyle vendored primitives ad hoc — extend them in our own components (`components/primitives.tsx`, etc.).

## Design system

- `DESIGN.md` is the implementation contract (black/grey/gold theme, color ramp, type scale, primitives, motion, a11y constraints, accepted debt). Read it before any UI work; add new tokens to `DESIGN.md` before using them.
- It is registered in `opencode.json` `instructions` so every session loads it.

## Assets

- `public/photos/01.jpg`–`13.jpg` are the brand event photos (deterministic names; 11–13 are the newest set and lead the gallery grid); the hero uses the landscape subset (`heroPhotos` in `lib/content.ts`, selected by file name) — the auto-cycle is OFF by default (`heroCycleEnabled` in `lib/content.ts`, flip to `true` to restore).
- `public/manato-logo.webp` (header) and `public/manato-logo-footer.webp` (footer) are generated from `assets/manato-logo-sprite.png` by `bun scripts/split-logo.ts` — left half is the vivid gold lockup, right half the dimmed variant.

## Constraints

- Single page only (`app/page.tsx`). No booking, backend, API routes, or auth — the launch site is static; the contact form submits via `mailto:`.
- Skills live in `.opencode/skills/<name>/SKILL.md` (opencode convention).
