import { gsap } from "gsap";
const $ = <T extends HTMLElement>(s: string) => document.querySelector<T>(s)!;
const body = document.body,
  stage = $(".stage"),
  layout = $(".layout"),
  dialog = $<HTMLDialogElement>("dialog");
const quick = $<HTMLAnchorElement>(".quick-button"),
  lamp = $<HTMLButtonElement>("#light"),
  sound = $<HTMLButtonElement>("#audio");
const systemMotion = matchMedia("(prefers-reduced-motion: reduce)");
const pref = (key: string) => {
  try {
    return localStorage.getItem("desk:" + key);
  } catch {
    return null;
  }
};
function save(key: string, val: string) {
  try {
    localStorage.setItem("desk:" + key, val);
  } catch {}
}
const motion = $<HTMLButtonElement>("#motion");
let motionPreference = pref("motion");
let reduceMotion = false;
function applyMotion() {
  reduceMotion = motionPreference === "reduced" ||
    (motionPreference !== "full" && systemMotion.matches);
  body.classList.toggle("full-motion", !reduceMotion);
  motion.textContent = reduceMotion ? "Motion off" : "Motion on";
  motion.setAttribute("aria-pressed", String(!reduceMotion));
  motion.hidden = false;
}
applyMotion();
systemMotion.addEventListener("change", applyMotion);
motion.onclick = () => {
  motionPreference = reduceMotion ? "full" : "reduced";
  save("motion", motionPreference);
  applyMotion();
};
let enabled = false,
  ctx: AudioContext | undefined,
  opener: HTMLElement | null = null;
function play(paper = false) {
  if (!enabled) return;
  try {
    ctx ??= new AudioContext();
    void ctx.resume().catch(() => {});
    const duration = paper ? 0.105 : 0.038,
      buffer = ctx.createBuffer(
        1,
        Math.ceil(ctx.sampleRate * duration),
        ctx.sampleRate,
      );
    const wave = buffer.getChannelData(0);
    for (let i = 0; i < wave.length; i++)
      wave[i] =
        (Math.random() * 2 - 1) *
        Math.exp(-i / (wave.length * 0.22)) *
        (paper ? 0.1 : 0.055);
    const source = ctx.createBufferSource(),
      filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = paper ? 2200 : 860;
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(ctx.destination);
    source.start();
  } catch {}
}
function lighting(night: boolean) {
  body.classList.toggle("night", night);
  lamp.setAttribute("aria-pressed", String(night));
  lamp.querySelector("span")!.textContent = night ? "Night" : "Day";
  lamp.setAttribute(
    "aria-label",
    night ? "Night lighting, switch to day" : "Day lighting, switch to night",
  );
}
lighting(pref("light") === "night");
lamp.onclick = () => {
  play();
  const next = !body.classList.contains("night");
  lighting(next);
  save("light", next ? "night" : "day");
};
sound.onclick = () => {
  enabled = !enabled;
  sound.setAttribute("aria-pressed", String(enabled));
  sound.querySelector("span")!.textContent = enabled ? "Sound on" : "Sound off";
  sound
    .querySelector("path")!
    .setAttribute(
      "d",
      enabled
        ? "M3 9h4l5-4v14l-5-4H3zm13 0q4 3 0 6m3-9q7 6 0 12"
        : "M3 9h4l5-4v14l-5-4H3zm13 0 6 6m0-6-6 6",
    );
  play();
};
const ambient = $<HTMLButtonElement>("#ambient");
function updateAmbient(on: boolean) {
  body.classList.toggle("still", !on);
  ambient.setAttribute("aria-pressed", String(on));
  ambient.textContent = on ? "Ambient motion on" : "Ambient motion off";
}
updateAmbient(pref("ambient") !== "off");
ambient.onclick = () => {
  const on = body.classList.contains("still");
  updateAmbient(on);
  save("ambient", on ? "on" : "off");
};
let tilted: HTMLElement | null = null;
function resetTilt() {
  tilted?.style.removeProperty("--tilt-x");
  tilted?.style.removeProperty("--tilt-y");
  tilted = null;
}
stage.addEventListener("pointerleave", () => {
  cancelAnimationFrame(frame);
  resetTilt();
});
let frame = 0;
stage.addEventListener("pointermove", (e) => {
  if (e.pointerType !== "mouse" || reduceMotion) return;
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const object = (e.target as Element).closest<HTMLElement>(".object");
    if (object !== tilted) resetTilt();
    if (object) {
      tilted = object;
      const bounds = object.getBoundingClientRect();
      object.style.setProperty("--tilt-x", (0.5 - (e.clientY - bounds.top) / bounds.height) * 12 + "deg");
      object.style.setProperty("--tilt-y", ((e.clientX - bounds.left) / bounds.width - 0.5) * 14 + "deg");
    }
    const r = stage.getBoundingClientRect();
    stage.style.setProperty("--mx", e.clientX - r.x + "px");
    stage.style.setProperty("--my", e.clientY - r.y + "px");
  });
});
let sheetOffset = { x: 0, y: 0, rotation: 0 };
function route() {
  const id = location.hash.slice(1),
    isQuick = id === "quick",
    tpl = document.getElementById("tpl-" + id) as HTMLTemplateElement | null;
  gsap.killTweensOf([layout, dialog]);
  if (dialog.open && !tpl && !reduceMotion) {
    gsap.to(layout, {
      scale: 1,
      duration: 0.24,
      ease: "power2.out",
      clearProps: "transform,transformOrigin",
    });
  } else {
    gsap.set(layout, { clearProps: "transform,transformOrigin" });
  }
  if (dialog.open && !tpl && !isQuick) {
    gsap.to(dialog, {
      ...(reduceMotion ? {} : sheetOffset),
      scale: reduceMotion ? 1 : 0.94, opacity: 0, duration: reduceMotion ? 0.08 : 0.19,
      ease: "power2.in", onComplete: () => {
        dialog.close();
        opener?.focus({ preventScroll: true });
      },
    });
    return;
  }
  if (dialog.open) {
    dialog.close();
    opener?.focus({ preventScroll: true });
  }
  body.classList.toggle("quick-mode", isQuick);
  quick.href = isQuick ? "#desk" : "#quick";
  quick.querySelector("span")!.textContent = isQuick
    ? "Back to desk"
    : "Quick View";
  if (isQuick) {
    $(".quick").focus({ preventScroll: true });
    window.scrollTo(0, 0);
    return;
  }
  if (!tpl) {
    return;
  }
  opener =
    Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".object,.secret"),
    ).find((a) => a.hash === location.hash) || null;
  const target = $("#sheet-content");
  target.replaceChildren(tpl.content.cloneNode(true));
  sheetOffset = { x: 0, y: 12, rotation: 0 };
  if (opener && !reduceMotion) {
    const obj = opener.getBoundingClientRect(),
      r = layout.getBoundingClientRect();
    sheetOffset = {
      x: Math.max(-84, Math.min(84, (obj.x + obj.width / 2 - innerWidth / 2) * 0.24)),
      y: Math.max(-44, Math.min(44, (obj.y + obj.height / 2 - innerHeight / 2) * 0.2)),
      rotation: obj.x + obj.width / 2 < innerWidth / 2 ? -2 : 2,
    };
    gsap.to(layout, {
      transformOrigin: `${obj.x - r.x + obj.width / 2}px ${obj.y - r.y + obj.height / 2}px`,
      scale: innerWidth > 800 ? 1.13 : 1.035,
      duration: 0.36,
      ease: "power2.out",
    });
  }
  dialog.showModal();
  dialog.scrollTop = 0;
  gsap.fromTo(
    dialog,
    { opacity: 0, ...(reduceMotion ? { x: 0, y: 0, rotation: 0 } : sheetOffset), scale: reduceMotion ? 1 : 0.91 },
    { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: reduceMotion ? 0.1 : 0.42, ease: "power3.out" },
  );
  $(".back").focus();
}
function close() {
  play();
  location.hash = "desk";
}
$(".back").onclick = close;
$(".close").onclick = close;
dialog.addEventListener("cancel", (e) => {
  e.preventDefault();
  close();
});
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      close();
  }
});
document.addEventListener("click", (e) => {
  const el = (e.target as Element).closest("a,summary");
  if (el) play(el.matches(".object,summary,.secret"));
});
window.addEventListener("hashchange", route);
route();
const pitch = $(".pitch"),
  line = pitch.dataset.pitch || "";
if (!reduceMotion && !pref("typed") && !location.hash) {
  const transcript = document.createElement("span");
  transcript.className = "screen-reader-only";
  transcript.textContent = line;
  const ink = document.createElement("span");
  ink.setAttribute("aria-hidden", "true");
  pitch.replaceChildren(transcript, ink);
  let i = 0;
  const timer = setInterval(() => {
    ink.textContent = line.slice(0, ++i);
    if (i >= line.length) {
      clearInterval(timer);
      save("typed", "1");
    }
  }, 24);
}

// Native POST remains available without JavaScript. Keep the draft after errors.
document.addEventListener("submit", async (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !form.hasAttribute("data-contact"))
    return;
  event.preventDefault();
  const data = new FormData(form),
    address = form.dataset.address || "";
  const draft =
    "mailto:" +
    address +
    "?subject=" +
    encodeURIComponent("Portfolio inquiry") +
    "&body=" +
    encodeURIComponent(
      String(data.get("message")) +
        "\n\nReply to: " +
        String(data.get("email")),
    );
  if (form.action.startsWith("mailto:")) {
    window.location.href = draft;
    return;
  }
  const status = form.querySelector<HTMLElement>('[role="status"]')!,
    submit = form.querySelector<HTMLButtonElement>("button")!;
  const fallback = form.querySelector<HTMLAnchorElement>(".fallback");
  if (fallback) fallback.href = draft;
  if (submit.disabled) return;
  submit.disabled = true;
  status.textContent = "Sending…";
  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error("Delivery failed");
    form.reset();
    status.textContent = "Message sent. Thank you for reaching out.";
  } catch {
    status.textContent = address
      ? "Couldn’t confirm delivery. Your draft is here. Try again or use your email app."
      : "Couldn’t confirm delivery. Your draft is here. Try again in a moment.";
  } finally {
    submit.disabled = false;
  }
});
