/**
 * Make gallery delivery a build invariant. An Astro build must not pass if a
 * category page or its optimized local artwork is missing.
 */
import { readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { transform } from "esbuild";

const root = resolve(".");
const ts = await readFile(join(root, "portfolio.config.ts"), "utf8");
const { code } = await transform(ts, { loader: "ts", format: "esm" });
const { profiles, activeProfession } = await import(
  "data:text/javascript;base64," + Buffer.from(code).toString("base64")
);

let checkedImages = 0;
let checkedGalleries = 0;
for (const [profession, profile] of Object.entries(profiles)) {
  for (const category of profile.workCategories) {
    const page = profession === activeProfession
      ? join(root, "dist", "works", category.slug, "index.html")
      : join(root, "dist", profession, "works", category.slug, "index.html");
    const html = await readFile(page, "utf8");
    if (!html.includes("gallery-overview-grid") || !html.includes("gallery-overview-card")) {
      throw new Error("Missing project previews on " + page);
    }
    // Detect Astro HTML serialization regressions that used to strip the
    // <body> tag and leak "'s Work" outside the document head.
    if (!html.includes('<body class="gallery-page">') || !html.includes('</body>')) {
      throw new Error("Malformed gallery document: missing body tag in " + page);
    }
    const navClose = html.indexOf("</nav>");
    const previewStart = html.indexOf('<section class="gallery-overview"');
    if (navClose < 0 || previewStart < 0 || navClose >= previewStart) {
      throw new Error("Gallery navigation is wrapping projects: " + page);
    }
    if (html.includes("</head>'s Work")) {
      throw new Error("Page-title text escaped into body markup: " + page);
    }
    checkedGalleries++;
    for (const entry of category.entries) {
      for (const image of entry.images) {
        if (!image.url.startsWith("works/")) continue;
        const local = join(root, "dist", image.url);
        const file = await stat(local);
        if (file.size < 200) throw new Error("Gallery image empty: " + local);
        checkedImages++;
      }
    }
  }
}
console.log("[gallery] Verified " + checkedGalleries + " published category pages and " + checkedImages + " local artwork references.");
