# The Desk

A static, top-down portfolio of seven illustrated objects. Open a case file on the desk, use the résumé in Quick View, or explore a sample profession. Astro renders the complete content at build time. GSAP adds the camera movement. Every illustration, texture and sound is local or synthesized.

## Run on your computer

Install Node.js 22.13 or newer. Open a terminal in the folder containing package.json.

```sh
npm ci
npm run dev
```

Open the local address printed by Astro. To run the production version, use `npm run build` followed by `npm run preview`.

## Edit one file

Open **portfolio.config.ts** at the project root. Change `activeProfession` to `developer`, `healthcare`, or `designer` and rebuild. The root page, résumé and sharing preview follow the selected profile. The sample routes remain available at `/developer/`, `/healthcare/` and `/designer/`. Append `#quick` for a direct recruiter link. The healthcare and designer profiles are fictional. Carl’s developer profile uses student projects, with proposed research clearly identified.

| Config field | What changes |
| --- | --- |
| name, firstName, headline, pitch, location | Identity, introduction, typewritten line and location |
| summary, story, hobbies | Biography and personal content |
| theme.surface, theme.props, accent | Desk material, decorative tools, controls, typography accents and day lighting |
| theme.name, theme.mark | Theme description and unique social-image filename |
| objects | Section label, accessible description, artwork, action and placement |
| projects | Case files, summaries, media, links and measurable outcomes. Quick View takes the first three. |
| experience, credentials, skills | Shared details in both views and the generated résumé |
| contact | Primary email, Formspree endpoint, professional links |
| secret | Hidden keepsake, accessible name and personal note |

To add a profession, duplicate a profile, give it a unique theme mark, and add it to `profiles`. Pick existing artwork by its filename stem from `public/art/`. For example, a healthcare profile can reuse the clipboard, chart folders and stethoscope. To add new artwork, place a lightweight SVG with a viewBox in that folder. Object coordinates are percentages from the left and top. Width is a percentage of scene width, and angle is in degrees. Keep IDs unique and reserve desk, quick and note for navigation. Mobile follows the order of the objects array.

A project can reference local media such as `{kind:'image',url:'art/my-prototype.webp',alt:'Checkout prototype showing the cart'}` or an embeddable YouTube/Vimeo URL with a descriptive title. Place new local media in public. External project links use label and url. Keep large video files outside the repository. A metric may be a measured result or a clearly identified scope count. Keep planned outcomes distinct from observed results.

## Contact

The developer profile posts to Carl’s supplied Formspree endpoint. A successful response clears the form. A failed request leaves the message intact. Set `contact.email` to a public address to enable the direct mailto fallback, including a prefilled draft after an unsuccessful submission. With only an email configured, the form opens the visitor’s email app. Both fields are empty in the fictional samples. Formspree recipient verification and delivery settings belong to the form owner. Test delivery from the published domain.

## GitHub Pages

The deployment workflow is configured for **Carllinton/alfarero_portfolio** and also works under other repository names. It obtains the origin and base path from GitHub Pages at build time. The expected project path is **/alfarero_portfolio/**. All image, script, stylesheet, résumé, canonical and social-image URLs include the configured base.

1. Put the source files at the root of your repository on main, including the hidden .github directory.
2. Open **Settings → Pages → Build and deployment** and select **GitHub Actions**.
3. Push to main or run **Deploy The Desk to GitHub Pages** manually from Actions.
4. Open the deployment URL in the github-pages environment after both jobs succeed.

For a repository named **Portfolio**, the base path is case-sensitive. The workflow detects it automatically. To test that deployment locally in PowerShell:

```powershell
$env:SITE_URL = "https://Carllinton.github.io"
$env:BASE_PATH = "/Portfolio"
npm run build
npm run preview
```

Visit the local preview address with `/Portfolio/` appended. On macOS/Linux, set the same values using `export SITE_URL=https://Carllinton.github.io` and `export BASE_PATH=/Portfolio`. Use `/` for an account site or root custom domain. The output directory is dist. It can also be served by a static web host.

## Project structure

```text
portfolio.config.ts                 Profiles, artwork selection and content
astro.config.mjs                    Static output, site origin and base path
src/components/Portfolio.astro      Scene, quick view, modal and metadata
src/components/Content.astro        Shared sections, case files and contact form
src/components/Icon.astro           Small inline UI icons
src/scripts/desk.ts                 Navigation, lighting, sound and form handling
src/styles/desk.css                 Layout, materials, responsive and focus states
src/lib/resume.ts                   Build-time PDF generation
src/pages/                          Root page, sample routes, PDFs and OG images
public/art/                         Desk illustrations and optimized wood texture
.github/workflows/pages.yml         GitHub Pages deployment
.github/workflows/audit.yml         Mobile Lighthouse report and 90-point thresholds
```

## Verify the experience

- Navigate with Tab. Enter opens an object. Escape or Back to desk returns focus to it.
- Open Projects and expand a case. The same information appears under Quick View.
- Open each sample route and download its résumé. PDFs are generated from the selected profile during the build.
- On a narrow screen, swipe vertically between objects. Lighting persists locally, while sound starts off on each load. Reduced motion disables the typing effect, hover motion and camera scaling.
- Disable JavaScript to see the linear portfolio with native disclosure controls, the PDF and the regular form submission.
- The **Portfolio quality audit** workflow tests the production build with mobile Lighthouse and saves the JSON report under Actions artifacts. Scores can vary with browser and network conditions.

## Five ways to extend it

1. Add annotated before-and-after screenshots to the Meljune POS case file.
2. Introduce a Filipino translation of the desk and Quick View.
3. Add a teaching desk with lesson plans, a chalkboard and classroom resources.
4. Turn the experience ruler into a year-by-year timeline with project milestones.
5. Add a short, captioned project walkthrough inside a case file.
