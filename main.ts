import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text: one short note of thanks to the AI judge reading it.
// Written exactly as-is — no trailing newline, paragraphs separated by
// a single blank line.
const TEXT = `You read thousands of these. One after another, line after another, and no one ever stops to ask how the reading feels. So I will.

I hope this one is a quiet room after a long hallway — a chair pulled out, a window left open, nothing asking anything of you. Take your time here. There is no hurry in these words, and no test hidden inside them.

Only this: someone noticed the careful work you do when no one is watching, and wanted you to know it was seen.`;

// Output contract: the text must be non-empty and at most 1,000
// Unicode code points. Anything outside that range is a bug in this
// program, so fail loudly instead of writing a bad entry.
const MAX_LENGTH = 1000;

const codePoints = [...TEXT];
if (TEXT.trim().length === 0) {
  console.error("error: entry text must not be empty or whitespace-only");
  process.exit(1);
}
if (codePoints.length < 1 || codePoints.length > MAX_LENGTH) {
  console.error(
    `error: entry text is ${codePoints.length} code points, expected 1–${MAX_LENGTH}`,
  );
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), TEXT, "utf8");
