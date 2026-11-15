// Gallery page enhancement. All image links still open originals without JS.
import gsap from "gsap";

const $ = <T extends Element = HTMLElement>(selector: string) => document.querySelector<T>(selector);
const $$ = <T extends Element = HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector));
const root = document.documentElement;

function store(key: string, value?: string): string | null {
  try {
    if (value !== undefined) { localStorage.setItem("keynote:" + key, value); return value; }
    return localStorage.getItem("keynote:" + key);
  } catch { return null; }
}
const themeBtn = $<HTMLButtonElement>(".theme-button");
function setTheme(next: "dark" | "light") {
  root.dataset.theme = next;
  if (themeBtn) {
    themeBtn.setAttribute("aria-pressed", String(next === "light"));
    themeBtn.setAttribute("aria-label", "Switch to " + (next === "light" ? "dark" : "light") + " theme");
    const word = themeBtn.querySelector(".theme-word");
    if (word) word.textContent = next === "light" ? "Dark" : "Light";
  }
  const meta = $<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = next === "light" ? "#f4f2ed" : "#101112";
}
setTheme(store("theme") === "light" || (!store("theme") && matchMedia("(prefers-color-scheme: light)").matches) ? "light" : "dark");
themeBtn?.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  setTheme(next);
  store("theme", next);
});

const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const motion = store("motion");
const animate = motion === "on" || (motion !== "off" && !reduce.matches);
root.dataset.motion = animate ? "on" : "off";

if (animate) {
  gsap.fromTo(".gallery-hero-inner > *",
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, stagger: .10, duration: .9, ease: "power3.out", delay: .06 }
  );
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target as HTMLElement;
      observer.unobserve(element);
      gsap.fromTo(element, { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: .72, ease: "power3.out" });
    });
  }, { threshold: .06 });
  $$(".gallery-collection-head,.art-tile,.gallery-case-panel").forEach(el => observer.observe(el));
}

const dialog = $<HTMLDialogElement>(".gallery-lightbox");
const image = $<HTMLImageElement>(".lightbox-image");
const caption = $<HTMLElement>(".lightbox-caption strong");
const project = $<HTMLElement>(".lightbox-caption span");
const counter = $<HTMLElement>(".lightbox-count");
const original = $<HTMLAnchorElement>(".lightbox-full");
const closeBtn = $<HTMLButtonElement>(".lightbox-close");
const previousBtn = $<HTMLButtonElement>(".lightbox-prev");
const nextBtn = $<HTMLButtonElement>(".lightbox-next");
const tiles = $$<HTMLAnchorElement>(".art-tile[data-lightbox]");
let index = 0;
let opener: HTMLAnchorElement | null = null;

function present(next: number) {
  if (!tiles.length || !image || !dialog) return;
  index = ((next % tiles.length) + tiles.length) % tiles.length;
  const tile = tiles[index];
  const thumbnail = tile.querySelector("img");
  const title = tile.querySelector(".art-tile-meta span");
  const collection = tile.closest(".gallery-collection")?.querySelector("h2");
  const src = tile.href;
  image.src = src;
  image.alt = thumbnail?.alt || title?.textContent?.trim() || "Work sample";
  if (caption) caption.textContent = title?.textContent?.trim() || image.alt;
  if (project) project.textContent = collection?.textContent?.trim() || "";
  if (counter) counter.textContent = String(index+1).padStart(2,"0") + " / " + String(tiles.length).padStart(2,"0");
  if (original) original.href = src;
}
function open(indexToShow: number, source: HTMLAnchorElement) {
  if (!dialog) return;
  opener = source;
  present(indexToShow);
  dialog.showModal();
  closeBtn?.focus();
}
function close() {
  dialog?.close();
  opener?.focus({ preventScroll: true });
}
tiles.forEach((tile, tileIndex) => tile.addEventListener("click", event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
  if (!dialog?.showModal) return;
  event.preventDefault();
  open(tileIndex, tile);
}));
closeBtn?.addEventListener("click", close);
previousBtn?.addEventListener("click", () => present(index-1));
nextBtn?.addEventListener("click", () => present(index+1));
dialog?.addEventListener("click", event => {
  if (event.target === dialog) close();
});
dialog?.addEventListener("close", () => { if (image) image.removeAttribute("src"); });
document.addEventListener("keydown", event => {
  if (!dialog?.open) return;
  if (event.key === "ArrowRight") { event.preventDefault(); present(index+1); }
  if (event.key === "ArrowLeft") { event.preventDefault(); present(index-1); }
});
