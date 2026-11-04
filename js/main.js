/**
 * ShopSphere - Global Application Controller
 * Handles Navigation, Auth UI sync, Toast alerts, Mobile menu, Theme and Global Events
 */

// Global Toast Notification Manager
const Toast = {
  container: null,

  init() {
    if (!this.container) {
      let el = document.getElementById("toast-container");
      if (!el) {
        el = document.createElement("div");
        el.id = "toast-container";
        el.className = "toast-container";
        document.body.appendChild(el);
      }
      this.container = el;
    }
  },

  show(message, type = "info", iconClass = null, duration = 3500) {
    this.init();

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;

    let defaultIcon = "fa-circle-info";
    if (type === "success") defaultIcon = "fa-circle-check";
    if (type === "error") defaultIcon = "fa-circle-exclamation";
    if (type === "warning") defaultIcon = "fa-triangle-exclamation";

    const icon = iconClass || defaultIcon;

    toast.innerHTML = `
      <div class="toast-icon"><i class="fa-solid ${icon}"></i></div>
      <div class="toast-body">${message}</div>
      <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close notification">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    this.container.appendChild(toast);

    // Trigger enter animation
    setTimeout(() => toast.classList.add("show"), 10);

    // Auto dismiss
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// Global App Initialization
const App = {
  init() {
    this.setupTheme();
    this.renderNavbarAuth();
    this.setupMobileMenu();
    this.setupSearchBars();
    this.setupNewsletterForm();
    this.updateBadges();
    this.highlightActiveNavLink();

    // Listen to reactive events
    window.addEventListener("cart-updated", () => this.updateBadges());
    window.addEventListener("wishlist-updated", () => this.updateBadges());
    window.addEventListener("auth-changed", () => this.renderNavbarAuth());
  },

  // Sync cart and wishlist count badges
  updateBadges() {
    if (typeof Cart !== "undefined") Cart.updateNavbarCount();
    if (typeof Wishlist !== "undefined") Wishlist.updateNavbarCount();
  },

  // Dynamic user auth state in navbar
  renderNavbarAuth() {
    const authContainers = document.querySelectorAll(".nav-auth-container");
    const user = Storage.getCurrentUser();

    authContainers.forEach(container => {
      if (user) {
        container.innerHTML = `
          <div class="user-menu-dropdown">
            <button class="user-dropdown-btn" id="userDropdownTrigger" aria-label="User Account">
              <div class="user-avatar-circle">
                <i class="fa-solid fa-user"></i>
              </div>
              <span class="user-display-name">${user.name.split(" ")[0]}</span>
              <i class="fa-solid fa-chevron-down dropdown-arrow"></i>
            </button>
            <div class="dropdown-popover" id="userDropdownPopover">
              <div class="dropdown-header">
                <strong>${user.name}</strong>
                <small>${user.email}</small>
                <span class="user-role-tag">${user.role.toUpperCase()}</span>
              </div>
              <div class="dropdown-divider"></div>
              <a href="orders.html" class="dropdown-link">
                <i class="fa-solid fa-box"></i> My Orders
              </a>
              ${user.role === "admin" ? `
              <a href="admin.html" class="dropdown-link text-primary font-bold">
                <i class="fa-solid fa-shield-halved"></i> Admin Dashboard
              </a>
              ` : ""}
              <div class="dropdown-divider"></div>
              <button onclick="Auth.logout()" class="dropdown-link logout-btn">
                <i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
              </button>
            </div>
          </div>
        `;

        // Toggle user dropdown
        const trigger = container.querySelector(".user-dropdown-btn");
        const popover = container.querySelector(".dropdown-popover");
        if (trigger && popover) {
          trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            popover.classList.toggle("open");
          });
        }
      } else {
        container.innerHTML = `
          <div class="auth-guest-links">
            <a href="login.html" class="btn btn-outline btn-sm">Sign In</a>
            <a href="register.html" class="btn btn-primary btn-sm">Register</a>
          </div>
        `;
      }
    });

    // Close dropdown on outside click
    document.addEventListener("click", () => {
      document.querySelectorAll(".dropdown-popover.open").forEach(p => p.classList.remove("open"));
    });
  },

  // Mobile drawer navigation toggle
  setupMobileMenu() {
    const hamburger = document.getElementById("mobileMenuBtn");
    const mobileNav = document.getElementById("mobileNavDrawer");
    const backdrop = document.getElementById("mobileNavBackdrop");
    const closeBtn = document.getElementById("closeMobileNavBtn");

    if (!hamburger || !mobileNav) return;

    const openMenu = () => {
      mobileNav.classList.add("open");
      if (backdrop) backdrop.classList.add("open");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      mobileNav.classList.remove("open");
      if (backdrop) backdrop.classList.remove("open");
      document.body.style.overflow = "";
    };

    hamburger.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (backdrop) backdrop.addEventListener("click", closeMenu);
  },

  // Setup header live search forms
  setupSearchBars() {
    const searchForms = document.querySelectorAll(".nav-search-form");
    searchForms.forEach(form => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector("input[name='search']");
        if (input && input.value.trim()) {
          const query = encodeURIComponent(input.value.trim());
          window.location.href = `shop.html?search=${query}`;
        }
      });
    });
  },

  // Newsletter subscription handler
  setupNewsletterForm() {
    const form = document.getElementById("newsletter-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input && input.value.trim()) {
        Toast.show("Thank you for subscribing! Your 15% welcome voucher code is 'WELCOME15'.", "success", "fa-gift");
        input.value = "";
      }
    });
  },

  // Highlight current active navigation item
  highlightActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll(".nav-link");
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (href && (href === currentPath || (currentPath === "" && href === "index.html"))) {
        link.classList.add("active");
      }
    });
  },

  // Dark/Light theme toggle
  setupTheme() {
    const savedTheme = Storage.getTheme();
    document.documentElement.setAttribute("data-theme", savedTheme);

    const toggles = document.querySelectorAll(".theme-toggle-btn");
    toggles.forEach(btn => {
      btn.addEventListener("click", () => {
        const current = Storage.getTheme();
        const next = current === "dark" ? "light" : "dark";
        Storage.setTheme(next);
        Toast.show(`Switched to ${next} theme`, "info");
      });
    });
  }
};

// Auto-run on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

if (typeof window !== "undefined") {
  window.Toast = Toast;
  window.App = App;
}
if (typeof global !== "undefined") {
  global.Toast = Toast;
  global.App = App;
}

