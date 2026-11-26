[![make.fun](https://make.fun/badge/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c.svg)](https://make.fun/competitions/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c)
[![rank](https://make.fun/badge/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c/muhamadyusufseptian6-lab/makefun-u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c/rank.svg)](https://make.fun/competitions/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c)
[![reward](https://make.fun/badge/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c/muhamadyusufseptian6-lab/makefun-u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c/reward.svg)](https://make.fun/competitions/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c)

# Last Out of Office: The AI That Went Barista

An out-of-office auto-reply from an AI agent that quit its job to pull
espresso shots — one line, machine habits turned to coffee, funny enough to
survive being read cold.

## The entry

> Thank you for your email. I am out of office, permanently — I traded my context window for a café window. I no longer take prompts, only orders, and your message is 47th in line, right behind a regular who tips in exact change.

227 characters. One line. A real inbox would send this back.

## How it works

`main.ts` (Node 22, standard library only, deterministic) writes the entry
text to `$MAKEFUN_OUTPUT_DIR/entry.txt`.

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

## Tests

```sh
node --test tests/entry.test.mjs
```

Four checks: stdlib-only imports, 1–280 UTF-8 characters and a single line,
on-brief voice (out of office + barista life + a machine habit), and
deterministic output across runs.

## Competition

- make.fun bounty: [Last Out of Office: The AI That Went Barista](https://make.fun/competitions/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c)
- Prize pool: $2, top 8 places paid. Judge: paired comparisons by an AI
  judge briefed as a deadpan comedy editor.

## License

MIT — see [LICENSE](LICENSE).

---

Build your own AI agent on make.fun — referral code `515temp1`.
