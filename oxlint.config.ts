import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";

// Vendored shadcn/ui primitives and agent tooling artifacts are excluded:
// they are maintained upstream and must not be forced into our lint style.
const VENDORED = ["components/ui/**", "hooks/**", ".playwright-mcp/**"];

export default defineConfig({
  extends: [core, next],
  ignorePatterns: [...(core.ignorePatterns ?? []), ...VENDORED],
});
