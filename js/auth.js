/**
 * ShopSphere - Authentication & Session Module (Frontend Demo)
 * Note: LocalStorage authentication is for demonstration only and prepares
 * frontends for real REST / JWT API integrations.
 */

const Auth = {
  // Validate email format
  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  },

  // Register new demo user
  register(name, email, password, confirmPassword) {
    const errors = {};

    if (!name || name.trim().length < 2) {
      errors.name = "Full name must be at least 2 characters.";
    }

    if (!email || !this.isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const users = Storage.getUsers();
    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    const duplicate = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (duplicate) {
      return {
        success: false,
        errors: { email: "An account with this email address already exists." }
      };
    }

    const newUser = {
      id: "user-" + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password: password, // In production, never handle or store plain-text passwords
      role: "customer",
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    Storage.saveUsers(users);

    // Auto log in after registration
    Storage.setCurrentUser(newUser);
    window.dispatchEvent(new CustomEvent("auth-changed", { detail: { user: newUser } }));

    return {
      success: true,
      user: newUser,
      message: "Account created successfully! Welcome to ShopSphere."
    };
  },

  // Log in user (customer or admin)
  login(email, password, requiredRole = null) {
    if (!email || !password) {
      return { success: false, message: "Please fill in all required fields." };
    }

    const users = Storage.getUsers();
    const cleanEmail = email.trim().toLowerCase();

    const user = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);

    if (!user) {
      return { success: false, message: "Invalid email or password. Please try again." };
    }

    if (requiredRole && user.role !== requiredRole) {
      return {
        success: false,
        message: `Access denied. This portal requires an account with "${requiredRole}" privileges.`
      };
    }

    Storage.setCurrentUser(user);
    window.dispatchEvent(new CustomEvent("auth-changed", { detail: { user } }));

    return {
      success: true,
      user,
      message: `Welcome back, ${user.name}!`
    };
  },

  // Log out current user
  logout() {
    Storage.logoutUser();
    window.location.href = "index.html";
  },

  // Get current user
  getUser() {
    return Storage.getCurrentUser();
  },

  // Check if authenticated
  isAuthenticated() {
    return Storage.getCurrentUser() !== null;
  },

  // Check if current user is an admin
  isAdmin() {
    const user = Storage.getCurrentUser();
    return user !== null && user.role === "admin";
  },

  // Route protection helper for user pages
  requireAuth(redirectUrl = "login.html") {
    if (!this.isAuthenticated()) {
      sessionStorage.setItem("shopsphere_redirect", window.location.href);
      window.location.href = redirectUrl;
      return false;
    }
    return true;
  },

  // Route protection helper for admin dashboard
  requireAdmin(redirectUrl = "admin-login.html") {
    if (!this.isAdmin()) {
      window.location.href = redirectUrl;
      return false;
    }
    return true;
  }
};

if (typeof window !== "undefined") {
  window.Auth = Auth;
}
if (typeof global !== "undefined") {
  global.Auth = Auth;
}

