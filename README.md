# Keynote — a portfolio presented like a product launch

An Astro/TypeScript portfolio built around one principle: make each screen mean something. The experience moves from an introduction through conviction, selected work, measurable scope, craft, a personal reveal, and an invitation.

**The content lives in one file:** `portfolio.config.ts`.

## Use it

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
npm run build
npm run preview
```

## Customize your portfolio

In `portfolio.config.ts`, choose `activeProfession`:
- `developer` — Carl's IT and web development portfolio.
- `healthcare` — a fictional healthcare professional.
- `designer` — a fictional editorial designer.

The same file controls name, positioning, problem statement, projects, outcomes, metrics, media, experience, credentials, skills, testimonials, hero visual, palette accent, personal reveal, and contact options. The layout adapts without changing components. All samples are clearly labeled and should not be presented as real-world client outcomes.

**Project evidence:** The default developer profile uses actual student-project scope. It does not claim percentage improvements without measurement. Add verified project screenshots to `projects[].media` (with `kind: "image"`, `url`, and `alt`). Until then, the site uses intentional, responsive interface mockups, explicitly labeled as representations.

**Testimonials:** Empty by default. The testimonial stage appears only if you add authentic quotes to `testimonials`. There are no invented endorsements.

**Summary mode:** Choose **Skip to summary**, or open `/#summary` (after the GitHub Pages repository prefix). This gives hiring managers the same facts in a scannable view: an intro, top three case studies, experience, skills, credentials, résumé PDF, and contact. It works without JavaScript through `:target` CSS. **Experience the story** returns to the keynote.

**Contact:** The developer portfolio is already connected to `https://formspree.io/f/xyezrrre`. Test a message on the published domain to confirm Formspree's recipient verification. Setting a public email also makes a direct mailto action available. Without an endpoint or email, the site shows no inert send button.

**Accessibility:** Native landmarks, keyboard-visible focus, semantic links and buttons, CSS-only summary fallback, color theme preference, motion reduction, image alt text, and progressive enhancement are built in. ScrollTrigger effects are disabled for users requesting reduced motion. Animated values use transforms and opacity for the scene; counters update readable text once activated.

## Files

```text
portfolio.config.ts               Single source of content; 3 profession profiles
src/components/Portfolio.astro    Complete keynote + recruiter summary
src/styles/keynote.css            Design system, themes, mobile, reduced motion
src/scripts/keynote.ts            GSAP ScrollTrigger, views, contact form
src/lib/resume.ts                 PDF builder driven by the same configuration
src/pages/index.astro             Active profile
src/pages/[profession]/           Demo profile routes and their résumés
.github/workflows/pages.yml       Static GitHub Pages deployment
.github/workflows/audit.yml       Lighthouse mobile quality audit
```

The previous desk-themed files/assets may remain in the repository for history, but the active site uses the keynote styles and script.

## Deploy to GitHub Pages

In repository settings, choose **Pages → Build and deployment → GitHub Actions**. The workflow runs on pushes to `main`, builds the static site with the correct origin and repository base path, and publishes `dist`.

Expected live URL: `https://carllinton.github.io/alfarero_portfolio/`.

Deployment and Lighthouse checks should both be green in **Actions** before publishing the URL to employers. Refresh the published URL with `Ctrl+Shift+R` after deployment.

## Quality checklist

1. Test home and `/#summary` on desktop and phone.
2. Tab through controls. Confirm summary mode and return navigation work.
3. Inspect the three profession previews and their résumé links.
4. Turn on reduced motion and check that content remains readable.
5. Toggle light/dark mode, reload, and confirm the selection persists.
6. Send a test Formspree message from the published site.
7. Replace visual mockups with real screenshots when available.
8. Add authentic testimonials only after receiving permission.


## Work categories and galleries

**The Work** on the homepage now introduces **categories**, not individual projects.
Each chapter links to a separate gallery page:

- `/works/web-systems/` — 7 web-system projects, including Meljune POS, BAR College, Flories, House of Origami, Autobiography, iPhone UI, and SortIt.
- `/works/graphic-design/` — 3 collections featuring actual Respresso advertisements, CTT branding, and personal/multimedia artwork.
- `/works/networking/` — 5 documented networking collections, including MISV, DHCP relay, static routing, physical workspace, and VLSM.

Sample profession pages are also generated, e.g. `/designer/works/editorial/`.

### Where the gallery content lives

In **`portfolio.config.ts`**, each profile has `workCategories`. Each category controls its
name, slug, one-line statement, visual treatment, introductory text, and `entries`. An entry
supports `title`, `label`, `description`, an array of `images` with `url`, `alt` and
`caption`, optional external `links`, and an optional `projectTitle` matching a case
study from `projects`.

For example, to add an original artwork:

```ts
{
  title: "New poster series",
  label: "GRAPHIC DESIGN · POSTERS",
  description: "A short description of the project.",
  images: [
    {
      url: "works/my-new-poster.webp",
      alt: "Blue poster with bold geometric typography",
      caption: "Poster 01"
    }
  ]
}
```

For local media, place optimized artwork at `public/works/my-new-poster.webp`. The site
automatically resolves relative URLs under the correct GitHub Pages base path.

**Source material:** The developer's gallery currently references actual published images in
the separate public repository
[Carllinton/Portfolio](https://github.com/Carllinton/Portfolio). The artwork is not
invented or represented as brand-new deliverables. These original asset URLs remain dependent
on that repository staying publicly available. Large originals, including high-resolution
poster images, are loaded lazily. For completely independent hosting or faster image transfer,
replace their URLs in the config with locally optimized versions under `public/works/`.

**Artwork viewer:** JavaScript upgrades image links into a native dialog with keyboard
left/right navigation and Escape to close. Without JavaScript, the links still open the
original images. Category links are normal anchor elements so back/forward navigation,
direct links, and search indexing work.

The recruiter summary continues to show the three strongest **individual case studies**;
it remains intentionally different from the category-driven presentation.
