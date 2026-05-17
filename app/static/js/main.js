// ── Theme ──
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const iconSun  = document.getElementById("iconSun");
const iconMoon = document.getElementById("iconMoon");

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (theme === "dark") {
    iconSun.style.display  = "none";
    iconMoon.style.display = "";
  } else {
    iconSun.style.display  = "";
    iconMoon.style.display = "none";
  }
}

// Load saved or system preference
const savedTheme = localStorage.getItem("theme")
  || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
applyTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
  applyTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// ── Mobile sidebar ──
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");

menuBtn?.addEventListener("click", () => sidebar.classList.toggle("open"));

// Close sidebar on outside click
document.addEventListener("click", (e) => {
  if (sidebar?.classList.contains("open")
    && !sidebar.contains(e.target)
    && e.target !== menuBtn
    && !menuBtn?.contains(e.target)) {
    sidebar.classList.remove("open");
  }
});
