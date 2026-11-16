/**
 * Prepare ORIGINAL uploaded brand artwork for responsive use.
 * No tracing, redrawing or logo edits: only transparent-margin removal and resize.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const dir = join(root, "public", "brand");
await mkdir(dir, { recursive: true });

const assets = [
  { source: "ca-logo-source.png", output: "ca-mark.png", width: 640 },
  { source: "carl-wordmark-source.png", output: "carl-wordmark.png", width: 1040 },
  { source: "ca-logo-source.png", output: "ca-favicon.png", width: 256, square: true },
];

for (const item of assets) {
  const input = join(dir, item.source);
  const output = join(dir, item.output);
  const cropped = await sharp(input).trim({ threshold: 3 }).png().toBuffer();
  const stream = sharp(cropped).resize({
    width: item.width,
    height: item.square ? item.width : undefined,
    fit: item.square ? "contain" : "inside",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    withoutEnlargement: false,
  });
  const info = await stream.png({ compressionLevel: 9 }).toFile(output);
  if (info.width < 40 || info.height < 40) {
    throw new Error("Unexpected brand output: " + output);
  }
  console.log("[brand] " + item.output + " (" + info.width + "×" + info.height + ")");
}
