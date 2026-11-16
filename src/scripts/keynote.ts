import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const $ = <T extends Element = HTMLElement>(selector: string) => document.querySelector<T>(selector);
const $$ = <T extends Element = HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector));
const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
let motionPreference: "on" | "off" | null = null;
const isReduced = () => motionPreference === "off" || (motionPreference !== "on" && reduce.matches);
const ease = "power3.out";

function preference(key: string): string | null {
  try { return localStorage.getItem("keynote:" + key); } catch { return null; }
}
function save(key: string, value: string) {
  try { localStorage.setItem("keynote:" + key, value); } catch {}
}
function setTheme(theme: "dark" | "light") {
  root.dataset.theme = theme;
  const button = $<HTMLButtonElement>(".theme-button");
  if (!button) return;
  button.setAttribute("aria-pressed", String(theme === "light"));
  button.setAttribute("aria-label", "Switch to " + (theme === "light" ? "dark" : "light") + " theme");
  const word = button.querySelector(".theme-word");
  if (word) word.textContent = theme === "light" ? "Dark" : "Light";
  const meta = $<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = root.dataset.brand === "precision" ? (theme === "light" ? "#F4F5F7" : "#0A0C10") : (theme === "light" ? "#f4f2ed" : "#101112");
}
const storedTheme = preference("theme");
setTheme(storedTheme === "light" || storedTheme === "dark"
  ? storedTheme
  : (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
$<HTMLButtonElement>(".theme-button")?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(next);
  save("theme", next);
});
function updateMotionControl() {
  const active = !isReduced();
  root.dataset.motion = active ? "on" : "off";
  const toggle = $<HTMLButtonElement>(".motion-button");
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(active));
    toggle.setAttribute("aria-label", active ? "Turn animations off" : "Turn animations on");
    toggle.title = active ? "Turn animations off" : "Turn animations on";
    const word = toggle.querySelector<HTMLElement>(".motion-word");
    if (word) word.textContent = active ? "Motion on" : "Motion off";
  }
}
const savedMotion = preference("motion");
motionPreference = savedMotion === "on" || savedMotion === "off" ? savedMotion : null;
updateMotionControl();
$<HTMLButtonElement>(".motion-button")?.addEventListener("click", () => {
  motionPreference = isReduced() ? "on" : "off";
  save("motion", motionPreference);
  updateMotionControl();
  createAnimations();
});


function syncView() {
  const hash = location.hash;
  const summary = hash === "#summary" || hash === "#summary-contact";
  document.body.classList.toggle("summary-mode", summary);
  if (summary) {
    if (hash === "#summary") window.scrollTo({ top: 0, behavior: "instant" });
    else requestAnimationFrame(() => $("#summary-contact")?.scrollIntoView({ block: "start", behavior: "instant" }));
  }
  requestAnimationFrame(() => ScrollTrigger.refresh());
}
window.addEventListener("hashchange", syncView);
syncView();

// Stage the message first, the proof second, and the supporting detail last.
// Headings stay as ordinary readable HTML until JavaScript enhances them.
function prepareHeadline(element: HTMLElement): HTMLElement[] {
  if (element.dataset.wordsReady === "true") {
    return Array.from(element.querySelectorAll<HTMLElement>(".word-ink"));
  }
  const content = element.textContent?.trim() || "";
  if (!content) return [];
  element.setAttribute("aria-label", content);
  const fragment = document.createDocumentFragment();
  const words: HTMLElement[] = [];
  content.split(/\s+/).forEach((word, index) => {
    if (index) fragment.append(document.createTextNode(" "));
    const outer = document.createElement("span");
    outer.className = "headline-word";
    outer.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = "word-ink";
    inner.textContent = word;
    outer.append(inner);
    fragment.append(outer);
    words.push(inner);
  });
  element.replaceChildren(fragment);
  element.dataset.wordsReady = "true";
  return words;
}

const chapters = $$<HTMLElement>(".story .scene, .story .project-chapter");
const currentObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    entry.target.classList.toggle("is-current", entry.isIntersecting);
  }
}, { rootMargin: "-20% 0px -20% 0px", threshold: 0 });
chapters.forEach(chapter => currentObserver.observe(chapter));

// All GSAP effects belong to a context and can be cleanly reverted when a
// visitor changes the operating system's reduced-motion setting.
let animations: gsap.Context | undefined;
function createAnimations() {
  animations?.revert();
  root.classList.remove("motion-ready");
  if (isReduced()) {
    gsap.set(".name-ink,.reveal,.reveal-line,.word-ink,.render-device,.project-copy,.project-image", { clearProps: "all" });
    $$(".metric-value").forEach(el => {
      el.textContent = (el.dataset.count || "0") + (el.dataset.suffix || "");
    });
    return;
  }

  // Split headlines before the timeline exists. Each word carries its own
  // accessible hidden visual span, while the heading keeps its accessible name.
  const wordsByHeadline = $$(".reveal-line").map(element => ({
    element, words: prepareHeadline(element),
  }));

  root.classList.add("motion-ready");
  animations = gsap.context(() => {
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro.fromTo(".scene-intro .eyebrow",
      { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .74 })
      .fromTo(".hello", { opacity: 0, y: 38 },
        { opacity: 1, y: 0, duration: .8 }, "-=.22")
      .fromTo(".name-ink",
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 1.35, ease: "power2.inOut" }, "+=.55")
      .fromTo(".intro-role", { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: .85 }, "-=.24")
      .fromTo(".scroll-cue", { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: .65 }, "-=.12");

    // Unlike the initial reveal, this movement is continuously tied to scroll.
    // It makes the entire introduction recede as the next idea takes focus.
    const introScene = $<HTMLElement>(".scene-intro");
    const introContent = $<HTMLElement>(".intro-inner");
    if (introScene && introContent) {
      gsap.fromTo(introContent,
        { scale: 1, y: 0 },
        { scale: .84, y: -65, ease: "none",
          scrollTrigger: {
            trigger: introScene, start: "top top", end: "bottom top",
            scrub: .55, invalidateOnRefresh: true,
          },
        });
    }


    wordsByHeadline.forEach(({ element, words }) => {
      if (!words.length) return;
      gsap.fromTo(words,
        { yPercent: 112, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: .92, ease: "power3.out",
          stagger: .078, scrollTrigger: {
            trigger: element.closest(".scene") || element,
            start: "top 76%", once: true,
          },
        });
    });

    // A smaller preface is revealed before its headline, and the supporting
    // sentence appears only after the eye has arrived at the main statement.
    $$(".scene:not(.scene-intro)").forEach(scene => {
      const introText = Array.from(scene.querySelectorAll<HTMLElement>(".reveal:not(.reveal-line)"));
      if (!introText.length) return;
      gsap.fromTo(introText,
        { y: 23, opacity: 0 },
        { y: 0, opacity: 1, duration: .8, stagger: .22,
          ease: "power3.out",
          scrollTrigger: { trigger: scene, start: "top 74%", once: true },
        });
    });

    $$(".project-chapter").forEach(chapter => {
      const copy = chapter.querySelector<HTMLElement>(".project-copy");
      const device = chapter.querySelector<HTMLElement>(".render-device,.project-image");
      const progress = chapter.querySelector<HTMLElement>(".project-progress span");
      if (!copy || !device) return;

      // Scene A: reveal the outcome before the visual. Scene B: the product
      // moves forward. Scene C: supporting copy retreats as proof holds focus.
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: chapter, start: "top top", end: "bottom bottom",
          scrub: .65, invalidateOnRefresh: true,
        },
      });
      timeline
        .fromTo(copy, { opacity: .22, y: 58 },
          { opacity: 1, y: 0, duration: .3 }, 0)
        .fromTo(device, { opacity: .22, yPercent: 18, scale: .84, rotation: -5 },
          { opacity: 1, yPercent: 0, scale: 1, rotation: 0, duration: .5 }, .17)
        .to(device, { yPercent: -6, scale: 1.045, duration: .3 }, .7)
        .to(copy, { opacity: .78, y: -18, duration: .25 }, .75);
      if (progress) {
        gsap.fromTo(progress, { scaleX: 0 },
          { scaleX: 1, ease: "none",
            scrollTrigger: { trigger: chapter,
              start: "top top", end: "bottom bottom", scrub: true },
          });
      }
    });

    // The top indicator tracks reading progress, but never blocks controls.
    const reading = $<HTMLElement>(".reading-progress");
    const story = $<HTMLElement>(".story");
    if (reading && story) {
      gsap.fromTo(reading, { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: {
          trigger: story, start: "top top", end: "bottom bottom",
          scrub: .3, invalidateOnRefresh: true,
        } });
    }

    $$(".craft-cell").forEach((cell, index) => {
      gsap.fromTo(cell, { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: .85, ease: "power3.out",
          delay: (index % 2) * .09,
          scrollTrigger: { trigger: cell, start: "top 91%", once: true },
        });
    });

    $$(".metric-value").forEach(element => {
      const value = Number(element.dataset.count || "0");
      const suffix = element.dataset.suffix || "";
      if (!Number.isFinite(value)) return;
      const state = { value: 0 };
      gsap.to(state, { value, duration: 1.8, ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 88%", once: true },
        onUpdate: () => {
          element.textContent = String(Math.round(state.value)) + suffix;
        },
        onComplete: () => { element.textContent = String(value) + suffix; },
      });
    });
  });
  ScrollTrigger.refresh();
}
createAnimations();
// Tiny magnetism, only when pointer precision and motion preference allow it.
// Reset the transform on exit: buttons remain perfectly clickable without JS.
if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
  $$(".primary-action,.summary-download,.form-submit").forEach(button => {
    button.addEventListener("pointermove", event => {
      if (isReduced()) return;
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * .08;
      const y = (event.clientY - rect.top - rect.height / 2) * .12;
      gsap.to(button, { x, y, duration: .42, ease, overwrite: true });
    });
    button.addEventListener("pointerleave", () => {
      gsap.to(button, { x: 0, y: 0, duration: .55, ease, overwrite: true });
    });
  });
}

document.addEventListener("submit", async event => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.matches("[data-contact]")) return;
  if (form.action.startsWith("mailto:")) return;
  event.preventDefault();
  const status = form.querySelector<HTMLElement>('[role="status"]');
  const button = form.querySelector<HTMLButtonElement>('[type="submit"]');
  if (!button || !status || button.disabled) return;
  button.disabled = true;
  status.textContent = "Sending your message…";
  try {
    const response = await fetch(form.action, {
      method: "POST", body: new FormData(form),
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(16000)
    });
    if (!response.ok) throw new Error("Could not confirm delivery");
    status.textContent = "Message sent. Thank you for reaching out.";
    form.reset();
  } catch {
    status.textContent = "Your message was not confirmed. Nothing has been cleared — please try again.";
  } finally { button.disabled = false; }
});

reduce.addEventListener("change", () => {
  updateMotionControl();
  createAnimations();
});
