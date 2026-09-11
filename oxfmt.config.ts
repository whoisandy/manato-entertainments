import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

// Vendored shadcn/ui primitives and agent tooling artifacts stay pristine
// so `shadcn add --overwrite` diffs stay clean.
const VENDORED = ["components/ui/**", "hooks/**", ".playwright-mcp/**"];

export default defineConfig({
  ...ultracite,
  ignorePatterns: VENDORED,
});
