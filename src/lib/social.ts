import sharp from "sharp";
import type { Profile } from "../../portfolio.config";

function safe(text: string): string {
  return text.replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;"
  }[c] || c));
}

/** Static, shareable social image generated from the SAME portfolio config. */
export async function socialImage(p: Profile): Promise<Response> {
  const name = safe(p.name);
  const headline = safe(p.headline);
  const statement = safe(p.positioning);
  const accent = /^#[0-9a-fA-F]{6}$/.test(p.accent) ? p.accent : "#9BE9BB";
  const nameSize = p.name.length > 24 ? 73 : p.name.length > 17 ? 89 : 112;
  const statementSize = p.positioning.length > 42 ? 35 : 43;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#101112"/>
    <path d="M72 77h1056" stroke="#363b3a" stroke-width="1"/>
    <rect x="72" y="57" width="9" height="19" fill="${accent}"/>
    <rect x="86" y="49" width="9" height="27" fill="${accent}"/>
    <rect x="100" y="61" width="9" height="15" fill="${accent}"/>
    <text x="130" y="72" font-family="Arial,Helvetica,sans-serif" font-size="19" font-weight="700" fill="#f4f2ed">THE PORTFOLIO</text>
    <text x="72" y="208" font-family="Arial,Helvetica,sans-serif" font-size="19" letter-spacing="5" fill="${accent}">${p.sample ? "ILLUSTRATIVE PROFILE" : "INTRODUCING"}</text>
    <text x="64" y="323" font-family="Arial,Helvetica,sans-serif" font-size="${nameSize}" font-weight="750" letter-spacing="-4" fill="#f4f2ed">${name}</text>
    <text x="73" y="400" font-family="Arial,Helvetica,sans-serif" font-size="${statementSize}" font-weight="650" letter-spacing="-1.4" fill="${accent}">${statement}</text>
    <path d="M72 519h1056" stroke="#363b3a" stroke-width="1"/>
    <text x="72" y="560" font-family="Arial,Helvetica,sans-serif" font-size="19" fill="#aaadaa">${headline}</text>
    <text x="1128" y="560" font-family="Arial,Helvetica,sans-serif" text-anchor="end" font-size="17" fill="#aaadaa">MADE WITH PURPOSE.</text>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png({ quality: 91, compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=3600" }
  });
}
