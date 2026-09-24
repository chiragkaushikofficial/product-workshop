"use strict";

const chapters = [...document.querySelectorAll(".journey-chapter")];
const chapterLinks = [...document.querySelectorAll(".chapter-nav a")];
const layers = [...document.querySelectorAll("[data-layer]")];
const canvas = document.querySelector(".system-canvas");
const counter = document.querySelector("#canvas-counter");
const phase = document.querySelector("#canvas-phase");
const caption = document.querySelector("#canvas-caption");
const compactLayout = window.matchMedia("(max-width: 850px)");
const overview = { counter: counter.textContent, phase: phase.textContent, caption: caption.textContent };
let activeChapter = -1;
let framePending = false;

function updateJourney() {
  framePending = false;
  const readingLine = window.innerHeight * 0.5;
  let next = 0;
  chapters.forEach((chapter, index) => {
    if (chapter.getBoundingClientRect().top <= readingLine) next = index;
  });
  if (next === activeChapter) return;
  activeChapter = next;
  const chapter = chapters[next];
  counter.textContent = compactLayout.matches ? overview.counter : `0${next + 1} / 05`;
  phase.textContent = compactLayout.matches ? overview.phase : `0${next + 1} / ${chapter.dataset.phase}`;
  caption.textContent = compactLayout.matches ? overview.caption : chapter.dataset.caption;
  layers.forEach(layer => {
    const level = Number(layer.dataset.layer);
    layer.classList.toggle("is-built", compactLayout.matches || level <= next);
    layer.classList.toggle("is-current", !compactLayout.matches && level === next);
  });
  chapters.forEach((item, index) => item.classList.toggle("is-active", index === next));
  chapterLinks.forEach((link, index) => {
    if (index === next) link.setAttribute("aria-current", "step");
    else link.removeAttribute("aria-current");
  });
}

function scheduleJourneyUpdate() {
  if (framePending) return;
  framePending = true;
  window.requestAnimationFrame(updateJourney);
}

updateJourney();
canvas.classList.add("is-enhanced");
window.addEventListener("scroll", scheduleJourneyUpdate, { passive: true });
window.addEventListener("resize", scheduleJourneyUpdate);
window.addEventListener("pageshow", scheduleJourneyUpdate);
compactLayout.addEventListener("change", () => {
  activeChapter = -1;
  scheduleJourneyUpdate();
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
document.documentElement.classList.add("has-js");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia("(min-width: 701px)").addEventListener("change", closeMenu);

// Preserve shared links from the previous portfolio without bringing back its demos.
function resolveLegacyHash() {
  const id = window.location.hash.slice(1);
  if (id !== "echo" && id !== "lumo") return;
  const story = document.getElementById(`${id}-story`);
  story.querySelector("details").open = true;
  window.location.replace(`#${id}-story`);
}
window.addEventListener("hashchange", resolveLegacyHash);
resolveLegacyHash();

document.querySelectorAll(".evidence-link").forEach(link => {
  link.addEventListener("click", () => {
    const story = document.querySelector(link.getAttribute("href"));
    story.querySelector("details").open = true;
  });
});

document.querySelector("#copy-email").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  if (!navigator.clipboard || !window.isSecureContext) {
    status.textContent = "Clipboard access isn't available here. Select the email address below the buttons to copy it, or use Start a conversation.";
    return;
  }
  try {
    await navigator.clipboard.writeText("chiragkaushikt02@gmail.com");
    status.textContent = "Email copied. Let's build something useful.";
  } catch (error) {
    console.warn("Clipboard write failed:", error);
    status.textContent = "The browser blocked copying. Select the email address below the buttons to copy it, or use Start a conversation.";
  }
});
