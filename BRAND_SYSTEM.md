# CARL — Precision Brand System (v1.0)

**Brand:** Carl Luis B. Alfarero
**Creative thesis:** Precision in the details. Momentum in the experience.
**Visual identity:** The exact **CA** monogram and **CARL** wordmark supplied by the portfolio owner. They are not traced, redrawn, skewed, recolored, or replaced.

## 1. Brand personality

- **Sleek, not sterile.** Confident, engineered typography with room to breathe.
- **Technical, not generic.** Emphasize systems, reliable craft, design, and networks.
- **Directional, not decorative.** Long horizontal rules, slight angled terminations, purposeful transitions.
- **Minimal, not empty.** Show real projects fast; every word and interaction must earn its place.
- **Honest, not inflated.** Never invent performance improvements or testimonials.

## 2. Color tokens

| Token | Dark | Light | Intended use |
|---|---|---|---|
| Obsidian / canvas | `#0A0C10` | `#F4F5F7` | Main background |
| Carbon / surface | `#141922` | `#E8ECF0` | Secondary surfaces, cards |
| Off-white / text | `#F4F5F7` | `#0A0C10` | Headlines, UI labels |
| Silver / subdued | `#A9B1BC` | `#53606F` | Body copy and metadata |
| Electric mint / action | `#86F7C2` | `#86F7C2` | CTA fills, rules, focus rings |
| Deep green / light-surface text | `#126548` | `#126548` | Colored text over off-white |
| Separator | `rgba(169,177,188,.22)` | `rgba(20,25,34,.18)` | Hairlines and outlines |

**Rule:** Mint is an *action signal*, not a second body-text color. Use deep green for accent text on light backgrounds to preserve legibility.

### Copy-paste CSS tokens

```css
:root {
  --bg: #0A0C10;
  --fg: #F4F5F7;
  --muted: #A9B1BC;
  --panel: #141922;
  --line: rgba(169, 177, 188, .22);
  --accent: #86F7C2;
  --ease: cubic-bezier(.22, 1, .36, 1);
}
html[data-theme="light"] {
  --bg: #F4F5F7;
  --fg: #0A0C10;
  --muted: #53606F;
  --panel: #E8ECF0;
  --line: rgba(20, 25, 34, .18);
}
```

The live site scopes these tokens to `html[data-brand="precision"]`, so fictional sample profiles can retain independent palettes.

## 3. Typography

**Headlines:** Space Grotesk, weight 700, tracking around `-0.066em`.
**Body and controls:** Inter, weights 400–700, body line-height 1.55–1.75.
**Labels:** Inter 10–12px, weight 700, uppercase, tracking `0.19em`.

Fluid type scales already live in `keynote.css` using `clamp()`. Do not introduce more than two font families.

## 4. Brand mark usage

Original sources, exact pixel originals:

- `public/brand/ca-logo-source.png` — CA symbol
- `public/brand/carl-wordmark-source.png` — CARL wordmark

Build-generated, transparent, trimmed display assets:

- `public/brand/ca-mark.png` — header, résumé summary
- `public/brand/carl-wordmark.png` — quiet hero watermark, contact signoff, gallery footer
- `public/brand/ca-favicon.png` — browser favicon

The original sources are never overwritten. The `scripts/prepare-brand.mjs` step only removes transparent margins and scales raster images.

**Dark backgrounds:** display white artwork directly.
**Light backgrounds:** `filter: brightness(0)` creates a legible black mark without changing its silhouette.

Keep meaningful clear space around the logo; do not stretch it, crop its artwork, apply dropshadows, add gradients, or place it over noisy imagery. A watermark should remain below 8% opacity and never overlap essential text.

## 5. Spacing & geometry

- **Base:** 4px system.
- **Common increments:** 8, 12, 16, 24, 32, 48, 64, 96px.
- **Page gutters:** `clamp(22px, 6vw, 100px)`.
- **Wide containers:** 1200–1480px maximum, centered.
- **Full-screen keynote sections:** one claim and one visual per section.
- **Gallery pages:** compact opening; project thumbnails visible as early as possible.
- **Buttons and thumbnails:** 4–6px radii; avoid overly soft bubbles.
- **Borders:** 1px hairlines with short mint segments.
- **Graphic motif:** small skewed diagonal edge; never imitate or distort the logo itself.

## 6. Component rules

### Header

The real CA monogram sits beside the `Carl.` name. A fine divider anchors the nav, with motion/theme controls and a visible hiring-manager escape hatch.

### Primary CTA

Electric mint fill, obsidian text, 6px radius, arrow indicating direction. Hover lifts 2px. Active state compresses gently. Keyboard focus uses a clear mint outline.

### Secondary controls

Transparent fill, 1px silver border, 6px radius. Only hover/focus changes border color.

### Gallery cards

Real project artwork first; consistent aspect ratio, `object-fit: contain`, subtle surface, title and category label below. The original artwork is never obscured by interface chrome. A small angled mint segment mirrors the brand's forward-motion idea.

### Sections

Large neo-grotesque headings, quiet descriptive body, one active concept per section. Alternate obsidian/carbon surfaces and intentional off-white moments, rather than using decorative gradients.

### Lightbox

Obsidian background, unobstructed image, small mint controls, keyboard navigation; Escape closes.

## 7. Motion

Use one shared family: `cubic-bezier(.22, 1, .36, 1)` / GSAP `power3.out` for reveals, and linear easing for scroll scrubbing.

- 180–280ms: hover and press confirmation.
- 450–850ms: card or interface reveal.
- 850–1350ms: one meaningful headline or hero reveal.
- Animate **transform** and **opacity** only.
- No infinite decorative loops.
- Respect reduced motion; keep content visible.
- Motion must guide the viewer to headline → proof → next action.

## 8. Responsive behavior

- Desktop: full-size keynote and 3-column overview galleries.
- Tablet: two-column galleries and condensed header.
- Mobile: single-column galleries when space is too tight, fluid type, minimum comfortable tap targets, clear image captions.
- No image should be cropped merely to fill a grid.
- Test keyboard focus, contrast, light/dark preferences, and real images at every size.

## 9. Implementation map

- `portfolio.config.ts` → single source of identity, accent, projects, optional brand asset mapping.
- `src/components/Portfolio.astro` → header logo, watermark, contact signoff, summary.
- `src/components/WorkGallery.astro` → gallery branding and category collection structure.
- `src/styles/keynote.css` → precision brand tokens and responsive components.
- `scripts/prepare-brand.mjs` → transparent cropped logos.
- `src/scripts/keynote.ts`, `src/scripts/gallery.ts` → persistent theme and motion behavior.

**Do not change the school projects, project claims, Formspree endpoint, résumé PDF behavior, or hiring-manager summary as part of a visual refresh.**
