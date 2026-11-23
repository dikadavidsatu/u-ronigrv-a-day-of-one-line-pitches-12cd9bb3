// A Day of One-Line Pitches — entry for u-ronigrv-a-day-of-one-line-pitches-12cd9bb3
// SPDX-License-Identifier: MIT
//
// The program writes one sentence (at most 240 characters) to
// <outputDir>/entry.txt. The sentence is the whole entry: a pitch that
// would convince a friend who has never coded to let an AI agent build
// their first app idea on make.fun.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The pitch: speak to the friend directly, in plain words. The hook is
// the idea they already carry around; the promise is watching it become
// something real, with no code and nothing to install. "Tell it" keeps
// the agent as the listener, so handing the idea over feels like a chat,
// not a handover.
const PITCH =
  "Tell it the app idea you've been carrying around in your head, in your own words, and watch an AI agent build a working version of it — no code, no setup, just your idea becoming something you can tap.";

const MAX_CHARS = 240;

/** Collapse any run of whitespace to a single space and trim the ends. */
function normalize(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

/** A valid pitch is one sentence, non-empty, and at most 240 characters. */
function validate(text: string): void {
  if (text.length === 0) {
    throw new Error("Invalid pitch: entry is empty.");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `Invalid pitch: ${text.length} characters exceeds the ${MAX_CHARS}-character limit ` +
        `by ${text.length - MAX_CHARS}. Shorten the pitch to fit.`,
    );
  }
  if (/\s{2,}/.test(text)) {
    throw new Error("Invalid pitch: contains a run of multiple spaces.");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("Invalid pitch: contains a line break; the entry must be a single line.");
  }
  // One sentence: exactly one sentence-ending full stop, at the very end.
  const stops = (text.match(/\./g) ?? []).length;
  if (stops !== 1 || !text.endsWith(".")) {
    throw new Error(
      `Invalid pitch: expected exactly one sentence (one full stop, at the end) but found ${stops} full stop(s).`,
    );
  }
}

/** Write the validated pitch to <outputDir>/entry.txt. */
function writeEntry(outputDir: string): void {
  const pitch = normalize(PITCH);
  validate(pitch);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), pitch, "utf8");
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
writeEntry(outputDir);
const pitch = normalize(PITCH);
console.log(`Wrote one-line pitch (${pitch.length} chars) to ${join(outputDir, "entry.txt")}`);
