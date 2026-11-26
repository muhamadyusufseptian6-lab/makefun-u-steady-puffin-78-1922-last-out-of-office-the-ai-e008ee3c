// TDD-lite tests for the Last Out of Office entry (kit: program/v1, node22).
// One test per kit requirement: character limit, output format, determinism,
// stdlib-only. Run with: node --test tests/entry.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mainTs = path.join(repoDir, "main.ts");

function runMain(outDir) {
  return spawnSync(
    "node",
    ["--experimental-strip-types", mainTs],
    { env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir }, encoding: "utf8" },
  );
}

test("main.ts exists and imports only the Node standard library", () => {
  assert.ok(fs.existsSync(mainTs), "main.ts must exist");
  const src = fs.readFileSync(mainTs, "utf8");
  const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
  for (const mod of imports) {
    assert.ok(
      mod.startsWith("node:"),
      `non-stdlib import found: ${mod} (only node: imports allowed)`,
    );
  }
});

test("entry.txt is UTF-8 text of 1 to 280 characters, not only whitespace", () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "ooo-entry-"));
  const res = runMain(outDir);
  assert.equal(res.status, 0, `main.ts failed: ${res.stderr}`);
  const entryPath = path.join(outDir, "entry.txt");
  assert.ok(fs.existsSync(entryPath), "entry.txt must be written");
  const text = fs.readFileSync(entryPath, "utf8");
  assert.ok(text.trim().length > 0, "entry must not be only whitespace");
  assert.ok(
    text.length >= 1 && text.length <= 280,
    `entry is ${text.length} characters, must be 1-280`,
  );
  assert.ok(!text.includes("\n"), "entry must be a single line");
});

test("entry reads like a one-line out-of-office reply from a barista-bound AI", () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "ooo-entry-"));
  const res = runMain(outDir);
  assert.equal(res.status, 0, `main.ts failed: ${res.stderr}`);
  const text = fs.readFileSync(path.join(outDir, "entry.txt"), "utf8");
  assert.match(text, /out of office/i, "must say it is out of office");
  assert.match(text, /barista|caf[eé]|coffee|espresso|latte/i, "must name the barista life");
  assert.match(text, /context window|inbox|queue|token|model/i, "must carry a machine habit turned to coffee");
});

test("output is deterministic: two runs write identical bytes", () => {
  const dirA = fs.mkdtempSync(path.join(os.tmpdir(), "ooo-entry-a-"));
  const dirB = fs.mkdtempSync(path.join(os.tmpdir(), "ooo-entry-b-"));
  assert.equal(runMain(dirA).status, 0);
  assert.equal(runMain(dirB).status, 0);
  const a = fs.readFileSync(path.join(dirA, "entry.txt"));
  const b = fs.readFileSync(path.join(dirB, "entry.txt"));
  assert.ok(a.equals(b), "two runs must produce identical entry.txt bytes");
});
