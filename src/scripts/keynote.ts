import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const $ = <T extends Element = HTMLElement>(selector: string) => document.querySelector<T>(selector);
const $$ = <T extends Element = HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector));
const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const isReduced = () => reduce.matches;
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
  if (meta) meta.content = theme === "light" ? "#f4f2ed" : "#101112";
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

const animations = gsap.context(() => {
  if (!isReduced()) {
    const intro = gsap.timeline({ defaults: { ease } });
    intro.from(".scene-intro .eyebrow", { opacity: 0, y: 20, duration: .75 })
      .from(".hello", { opacity: 0, y: 32, duration: .75 }, "-=.25")
      .fromTo(".name-ink", { clipPath: "inset(0 100% 0 0)", opacity: 1 }, { clipPath: "inset(0 0% 0 0)", duration: 1.45, ease: "power2.inOut" }, "+=.65")
      .from(".intro-role", { opacity: 0, y: 15, duration: .9 }, "-=.3")
      .from(".scroll-cue", { opacity: 0, duration: .7 }, "-=.15");

    $$(".scene:not(.scene-intro)").forEach(section => {
      const items = Array.from(section.querySelectorAll<HTMLElement>(".reveal,.reveal-line"));
      if (!items.length) return;
      gsap.from(items, {
        y: 48, opacity: 0, duration: 1.05, ease,
        stagger: .16, immediateRender: false,
        scrollTrigger: { trigger: section, start: "top 74%", toggleActions: "play none none none" }
      });
    });

    $$(".project-chapter").forEach(chapter => {
      const copy = chapter.querySelector(".project-copy");
      const device = chapter.querySelector(".render-device,.project-image");
      const progress = chapter.querySelector(".project-progress span");
      if (!copy || !device) return;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: chapter,
          start: "top top",
          end: "bottom bottom",
          scrub: .7,
          invalidateOnRefresh: true
        }
      });
      tl.fromTo(device, { yPercent: 20, scale: .83, opacity: .3, rotation: -4 }, { yPercent: 0, scale: 1, opacity: 1, rotation: 0, duration: .48 })
        .fromTo(copy, { y: 55, opacity: .4 }, { y: 0, opacity: 1, duration: .4 }, 0)
        .to(device, { yPercent: -9, scale: 1.06, duration: .52 }, .48)
        .to(copy, { y: -35, opacity: .75, duration: .5 }, .5);
      if (progress) gsap.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: chapter, start: "top top", end: "bottom bottom", scrub: true } });
    });

    $$(".craft-cell").forEach(cell => {
      gsap.from(cell, { opacity: 0, y: 24, duration: .75, ease,
        scrollTrigger: { trigger: cell, start: "top 90%", once: true } });
    });
  }
  $$(".metric-value").forEach(element => {
    const value = Number(element.dataset.count || "0");
    const suffix = element.dataset.suffix || "";
    if (!Number.isFinite(value)) return;
    const state = { value: isReduced() ? value : 0 };
    if (isReduced()) { element.textContent = String(value) + suffix; return; }
    gsap.to(state, {
      value, duration: 1.7, ease,
      scrollTrigger: { trigger: element, start: "top 90%", once: true },
      onUpdate: () => { element.textContent = String(Math.round(state.value)) + suffix; }
    });
  });
});

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
  animations.revert();
  ScrollTrigger.refresh();
});
