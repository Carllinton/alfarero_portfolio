import { profiles, type Profile } from "../../../portfolio.config";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
export function getStaticPaths() {
  return Object.values(profiles).map((p) => ({
    params: { mark: p.theme.mark },
    props: { p },
  }));
}
const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
export async function GET({ props }: { props: { p: Profile } }) {
  const { p } = props;
  const text = Buffer.from(
    `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="${p.theme.surface}"/><text x="60" y="100" font-family="sans-serif" font-size="18" letter-spacing="4" fill="${p.accent}">INTERACTIVE PORTFOLIO</text><text x="55" y="235" font-family="Georgia,serif" font-size="112" fill="#242920">The Desk.</text><text x="63" y="300" font-family="Georgia,serif" font-size="32" font-style="italic" fill="${p.accent}">of ${esc(p.name)}</text><text x="63" y="355" font-family="sans-serif" font-size="23" fill="#30342c">${esc(p.headline)}</text></svg>`,
  );
  const placements = [
    [630, 45, 235],
    [890, 120, 265],
    [555, 395, 240],
    [855, 495, 270],
  ];
  const layers = await Promise.all(
    placements.map(async ([left, top, width], i) => ({
      input: await sharp(
        await readFile("public/art/" + p.objects[i].illustration + ".svg"),
      )
        .resize({ width })
        .png()
        .toBuffer(),
      left,
      top,
    })),
  );
  return new Response(
    Uint8Array.from(await sharp(text).composite(layers).png().toBuffer()),
    { headers: { "Content-Type": "image/png" } },
  );
}
