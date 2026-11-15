import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { Profile } from "../../portfolio.config";
export async function resume(p: Profile) {
  const doc = await PDFDocument.create(),
    serif = await doc.embedFont(StandardFonts.TimesRoman),
    sans = await doc.embedFont(StandardFonts.Helvetica);
  doc.setTitle(p.name + " | Résumé");
  doc.setAuthor(p.name);
  let page = doc.addPage([595, 842]),
    y = 792;
  const clean = (s: string) =>
    s
      .replace(/[’‘]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[–—]/g, "-")
      .replace(/[^\x20-\x7e\xa0-\xff]/g, " ");
  function line(text: string, size = 10, heading = false) {
    const font = heading ? serif : sans,
      words = clean(text).split(/\s+/);
    let row = "";
    function print() {
      if (y < 54) {
        page = doc.addPage([595, 842]);
        y = 792;
      }
      page.drawText(row, {
        x: 51,
        y,
        size,
        font,
        color: rgb(0.13, 0.18, 0.14),
      });
      y -= size * 1.43;
      row = "";
    }
    for (const word of words) {
      const next = row ? row + " " + word : word;
      if (row && font.widthOfTextAtSize(next, size) > 492) print();
      row = row ? row + " " + word : word;
    }
    if (row) print();
  }
  function section(s: string) {
    y -= 9;
    line(s, 16, true);
  }
  line(p.name, 27, true);
  line(p.headline + " | " + p.location, 11);
  if (p.sample) line("Illustrative sample profile", 9);
  y -= 6;
  line(p.summary);
  section("Selected projects");
  for (const pr of p.projects.slice(0, 3)) {
    line(pr.title + " | " + pr.role, 11, true);
    line(pr.result + " " + pr.metrics.join(" / "));
    y -= 4;
  }
  section("Experience");
  for (const e of p.experience) {
    line(e.date + " | " + e.title, 11, true);
    line(e.detail);
  }
  section("Education");
  for (const c of p.credentials)
    line(c.title + " | " + c.issuer + " | " + c.status);
  section("Skills");
  for (const s of p.skills) line(s.group + " - " + s.items.join(", "));
  if (p.contact.email || p.contact.links.length) {
    section("Contact");
    if (p.contact.email) line(p.contact.email);
    for (const l of p.contact.links) line(l.label + " " + l.url);
  }
  const bytes = await doc.save();
  return new Response(Buffer.from(bytes), {
    headers: { "Content-Type": "application/pdf" },
  });
}
