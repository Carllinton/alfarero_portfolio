/**
 * Materialize every configured remote gallery artwork into optimized, locally
 * served WebP files BEFORE Astro renders its static pages.
 * The portfolio configuration is the only content source.
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { transform } from "esbuild";
import sharp from "sharp";

const root = resolve(".");
const ts = await readFile(join(root, "portfolio.config.ts"), "utf8");
const { code } = await transform(ts, { loader: "ts", format: "esm" });
const loaded = await import("data:text/javascript;base64," + Buffer.from(code).toString("base64"));
const items = new Map();
for (const profile of Object.values(loaded.profiles)) {
  for (const category of profile.workCategories) {
    for (const entry of category.entries) {
      for (const image of entry.images) {
        if (image.source) {
          if (!image.url.startsWith("works/") || !image.url.endsWith(".webp") || image.url.includes("..")) {
            throw new Error("Unsafe local media path: " + image.url);
          }
          items.set(image.url, image.source);
        }
      }
    }
  }
}

async function retrieve(source, attempts = 3) {
  let lastError;
  for (let count = 1; count <= attempts; count++) {
    try {
      const response = await fetch(source, {
        signal: AbortSignal.timeout(30000),
        headers: { "User-Agent": "Keynote-Portfolio-Gallery-Builder" }
      });
      if (!response.ok) throw new Error("HTTP " + response.status);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      lastError = error;
      if (count < attempts) await new Promise(resolve => setTimeout(resolve, 1200 * count));
    }
  }
  throw new Error("Cannot fetch configured gallery image: " + source + " (" + lastError + ")");
}

const work = [...items.entries()];
let cursor = 0;
let completed = 0;
const errors = [];
async function worker() {
  while (cursor < work.length) {
    const index = cursor++;
    const [output, source] = work[index];
    try {
      const destination = join(root, "public", output);
      const original = await retrieve(source);
      // Sharp auto-rotates EXIF and avoids upscaling small screenshots.
      const optimized = await sharp(original, { limitInputPixels: 80_000_000 })
        .rotate()
        .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toBuffer();
      await mkdir(dirname(destination), { recursive: true });
      await writeFile(destination, optimized);
      completed++;
      process.stdout.write("[gallery] " + completed + "/" + work.length + " " + output + "\n");
    } catch (error) {
      errors.push(String(error));
    }
  }
}
await Promise.all(Array.from({ length: Math.min(5, work.length) }, () => worker()));
if (errors.length) {
  for (const error of errors) console.error(error);
  throw new Error(errors.length + " gallery asset(s) could not be prepared");
}
console.log("Prepared " + completed + " self-hosted gallery images.");
