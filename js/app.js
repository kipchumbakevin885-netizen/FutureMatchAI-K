/* ============================================================
   FutureMatch AI — app.js
   Shared behaviour used across every page: loading screen,
   navbar, dark mode, scroll reveal, counters, back-to-top,
   dropdowns, and a localStorage-based mock auth system.
   ============================================================ */

/* ---------- Mock Auth Store (localStorage) ---------- */
const FMAuth = {
  KEY: "futurematch_user",

  saveUser(user) {
    localStorage.setItem(this.KEY, JSON.stringify(user));
  },
  getUser() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY));
    } catch (e) {
      return null;
    }
  },
  updateUser(patch) {
    const current = this.getUser() || {};
    const updated = { ...current, ...patch };
    this.saveUser(updated);
    return updated;
  },
  logout() {
    localStorage.removeItem(this.KEY);
  },
  isLoggedIn() {
    return !!this.getUser();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initLoadingScreen();
  initNavbarScroll();
  initThemeToggle();
  initScrollReveal();
  initCounters();
  initBackToTop();
  initDropdowns();
  initMobileSidebar();
  initLogoutButtons();
});

/* ---------- Loading Screen ---------- */
function initLoadingScreen() {
  const loader = document.getElementById("loading-screen");
  if (!loader) return;
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 350);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader.classList.add("hidden"), 1800);
}

/* ---------- Navbar shrink-on-scroll ---------- */
function initNavbarScroll() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  });
}

/* ---------- Dark / Light Mode ---------- */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
  const saved = localStorage.getItem("futurematch_theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcons(saved);

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("futurematch_theme", next);
      updateThemeIcons(next);
    });
  });
}
function updateThemeIcons(theme) {
  document.querySelectorAll(".theme-toggle-btn i").forEach(icon => {
    icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  });
}

/* ---------- Scroll Reveal Animations ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(item => observer.observe(item));
}

/* ---------- Animated Counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute("data-counter"), 10);
      const duration = 1500;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => observer.observe(c));
}

/* ---------- Back to Top ---------- */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 500);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- Generic dropdown toggles (notifications / profile) ---------- */
function initDropdowns() {
  document.querySelectorAll("[data-dropdown-toggle]").forEach(trigger => {
    const panelId = trigger.getAttribute("data-dropdown-toggle");
    const panel = document.getElementById(panelId);
    if (!panel) return;
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".dropdown-panel").forEach(p => {
        if (p !== panel) p.style.display = "none";
      });
      panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
  });
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".dropdown-panel").forEach(panel => {
      if (!panel.contains(e.target)) panel.style.display = "none";
    });
  });
}

/* ---------- Mobile sidebar (app pages) ---------- */
function initMobileSidebar() {
  const toggle = document.querySelector(".mobile-sidebar-toggle");
  const sidebar = document.querySelector(".app-sidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  if (!toggle || !sidebar) return;
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    if (overlay) overlay.classList.toggle("open");
  });
  if (overlay) {
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("open");
    });
  }
}

/* ---------- Logout buttons ---------- */
function initLogoutButtons() {
  document.querySelectorAll("[data-logout]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      FMAuth.logout();
      window.location.href = "login.html";
    });
  });
}

/* ---------- Contact form (landing page) ---------- */
function handleContactForm(event) {
  event.preventDefault();
  const form = event.target;
  const alertBox = document.getElementById("contact-alert");
  if (alertBox) {
    alertBox.classList.remove("d-none");
    alertBox.textContent = "Thanks for reaching out! Our team will get back to you within 24 hours.";
  }
  form.reset();
  return false;
}

/* ---------- Chip select helper (used in registration / assessment filters) ---------- */
function initChipGroup(containerSelector) {
  document.querySelectorAll(containerSelector).forEach(container => {
    container.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => chip.classList.toggle("active"));
    });
  });
}
function getActiveChips(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return [];
  return Array.from(container.querySelectorAll(".chip.active")).map(c => c.dataset.value);
}

/* ---------- Guard: redirect to login if not authenticated ---------- */
function requireAuth() {
  if (!FMAuth.isLoggedIn()) {
    window.location.href = "login.html";
  }
}
