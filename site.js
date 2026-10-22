/* Registry: which class and chapter number each chapter belongs to. Add new chapters here and in data.js. */
window.REGISTRY = [
  { id: "photosynthesis", cls: 11, ch: 13, unit: "Plant Physiology" },
  { id: "respiration",    cls: 11, ch: 14, unit: "Plant Physiology" },
  { id: "growth",         cls: 11, ch: 15, unit: "Plant Physiology" },
  { id: "sexualrepro",    cls: 12, ch: 1,  unit: "Reproduction" }
];
(function () {
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
  window.isLight = () => root.dataset.theme ? root.dataset.theme === "light" : matchMedia("(prefers-color-scheme: light)").matches;
  window.toggleTheme = () => {
    const n = isLight() ? "dark" : "light";
    root.dataset.theme = n;
    try { localStorage.setItem("theme", n); } catch (e) {}
    document.querySelectorAll("[data-theme-btn]").forEach(b => b.textContent = n === "light" ? "☾ Dark" : "☀ Light");
    document.querySelectorAll("iframe.viewer").forEach(f => f.style.background = n === "light" ? "#f2f6f1" : "#0f1612");
  };
  window.addEventListener("DOMContentLoaded", () => document.querySelectorAll("[data-theme-btn]").forEach(b => { b.textContent = isLight() ? "☾ Dark" : "☀ Light"; b.onclick = toggleTheme; }));
  window.getScore = id => { try { return JSON.parse(localStorage.getItem("score:" + id)); } catch (e) { return null; } };
  window.setScore = (id, v) => { try { localStorage.setItem("score:" + id, JSON.stringify(v)); } catch (e) {} };
  window.chapterOf = id => ({ ...window.CHAPTERS[id], ...window.REGISTRY.find(r => r.id === id), id });
})();
