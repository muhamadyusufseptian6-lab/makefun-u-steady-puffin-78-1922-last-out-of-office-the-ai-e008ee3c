// Last Out of Office: The AI That Went Barista
// make.fun competition u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c
//
// Writes a single out-of-office auto-reply, no longer than 280 characters,
// in the voice of an AI agent that quit its job to become a barista.
// Deterministic, stdlib-only, Node 22.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The entry: one line, machine habits turned to coffee.
// "context window" -> "café window": the model traded its working memory
// for a shop window. "prompts" -> "orders" is the second machine habit:
// a model takes prompts, a barista takes orders. The queue joke keeps it
// plausibly an inbox auto-reply, not a coffee ad.
export const ENTRY =
  "Thank you for your email. I am out of office, permanently \u2014 I traded my context window for a caf\u00e9 window. I no longer take prompts, only orders, and your message is 47th in line, right behind a regular who tips in exact change.";

const repoDir = path.dirname(fileURLToPath(import.meta.url));

function main(): void {
  const outDir =
    process.env.MAKEFUN_OUTPUT_DIR ?? path.join(repoDir, "output");
  const entryPath = path.join(outDir, "entry.txt");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(entryPath, ENTRY, "utf8");
}

main();
