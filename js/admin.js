/**
 * ShopSphere - Admin Dashboard Controller
 * Full CRUD for products, order status updater, users monitor, category management
 */

const Admin = {
  currentTab: "overview",
  productSearchTerm: "",
  orderStatusFilter: "all",

  init() {
    // Demo permission check
    const user = Storage.getCurrentUser();
    if (!user || user.role !== "admin") {
      window.location.href = "admin-login.html";
      return;
    }

    // Set admin user profile badge in header
    const adminNameEl = document.getElementById("admin-display-name");
    if (adminNameEl) adminNameEl.textContent = user.name;

    this.renderStats();
    this.setupTabs();
    this.renderProductsTable();
    this.renderOrdersTable();
    this.renderUsersTable();
    this.renderCategoriesList();
    this.setupModals();
  },

  // Setup sidebar / navigation tabs
  setupTabs() {
    const navItems = document.querySelectorAll(".admin-nav-item");
    const sections = document.querySelectorAll(".admin-tab-section");

    navItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const tab = item.getAttribute("data-tab");
        if (!tab) return;

        navItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        sections.forEach(s => {
          if (s.id === `tab-${tab}`) {
            s.classList.add("active");
          } else {
            s.classList.remove("active");
          }
        });

        this.currentTab = tab;
        if (tab === "overview") this.renderStats();
      });
    });
  },

  // Compute and display dashboard metrics
  renderStats() {
    const products = Storage.getProducts();
    const orders = Storage.getOrders();
    const users = Storage.getUsers();

    // Total Revenue from valid completed/processing/shipped/delivered orders
    const totalRevenue = orders
      .filter(o => o.status !== "Cancelled")
      .reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);

    const statProductsEl = document.getElementById("stat-total-products");
    const statOrdersEl = document.getElementById("stat-total-orders");
    const statUsersEl = document.getElementById("stat-total-users");
    const statRevenueEl = document.getElementById("stat-total-revenue");

    if (statProductsEl) statProductsEl.textContent = products.length;
    if (statOrdersEl) statOrdersEl.textContent = orders.length;
    if (statUsersEl) statUsersEl.textContent = users.length;
    if (statRevenueEl) statRevenueEl.textContent = "$" + totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Recent orders preview on overview tab
    const recentOrdersContainer = document.getElementById("admin-recent-orders-tbody");
    if (recentOrdersContainer) {
      const recent = orders.slice(0, 5);
      if (recent.length === 0) {
        recentOrdersContainer.innerHTML = `<tr><td colspan="5" class="text-center">No orders recorded yet.</td></tr>`;
      } else {
        recentOrdersContainer.innerHTML = recent.map(o => `
          <tr>
            <td><strong>#${o.id}</strong></td>
            <td>${o.customerName}</td>
            <td>$${o.total.toFixed(2)}</td>
            <td><span class="order-status-badge status-${o.status.toLowerCase()}">${o.status}</span></td>
            <td>${new Date(o.date).toLocaleDateString()}</td>
          </tr>
        `).join("");
      }
    }
  },

  // ==================== PRODUCTS MANAGEMENT ====================
  renderProductsTable() {
    const tbody = document.getElementById("admin-products-tbody");
    if (!tbody) return;

    let products = Storage.getProducts();

    if (this.productSearchTerm) {
      const term = this.productSearchTerm.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
    }

    if (products.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4">No matching products found in catalog.</td></tr>`;
      return;
    }

    tbody.innerHTML = products.map(p => `
      <tr>
        <td>
          <img src="${p.image}" alt="${p.name}" class="admin-prod-thumb" onerror="this.src=getPlaceholderImage('${p.category}', '${p.name.replace(/'/g, "\\'")}');">
        </td>
        <td>
          <strong>${p.name}</strong>
          <div class="text-muted small">ID: ${p.id}</div>
        </td>
        <td><span class="badge badge-category">${p.category}</span></td>
        <td><strong>$${p.price.toFixed(2)}</strong></td>
        <td>
          <span class="stock-badge ${p.stock <= 5 ? 'stock-low' : 'stock-ok'}">
            ${p.stock} in stock
          </span>
        </td>
        <td>
          <div class="admin-rating-cell">
            <i class="fa-solid fa-star text-warning"></i> ${p.rating.toFixed(1)} (${p.reviewsCount})
          </div>
        </td>
        <td>
          <div class="action-buttons-group">
            <button class="btn btn-sm btn-outline" onclick="Admin.openEditProductModal('${p.id}')" title="Edit Product">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-sm btn-danger-outline" onclick="Admin.deleteProduct('${p.id}')" title="Delete Product">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join("");
  },

  handleProductSearch(query) {
    this.productSearchTerm = query.trim();
    this.renderProductsTable();
  },

  openAddProductModal() {
    const modal = document.getElementById("product-modal");
    const form = document.getElementById("product-form");
    const modalTitle = document.getElementById("product-modal-title");

    if (!modal || !form) return;

    form.reset();
    document.getElementById("prod-form-id").value = "";
    modalTitle.textContent = "Add New Product";
    modal.classList.add("open");
  },

  openEditProductModal(productId) {
    const product = Storage.getProductById(productId);
    if (!product) return;

    const modal = document.getElementById("product-modal");
    const modalTitle = document.getElementById("product-modal-title");
    if (!modal) return;

    modalTitle.textContent = "Edit Product: " + product.name;
    document.getElementById("prod-form-id").value = product.id;
    document.getElementById("prod-form-name").value = product.name;
    document.getElementById("prod-form-category").value = product.category;
    document.getElementById("prod-form-price").value = product.price;
    document.getElementById("prod-form-original-price").value = product.originalPrice || product.price;
    document.getElementById("prod-form-stock").value = product.stock;
    document.getElementById("prod-form-image").value = product.image;
    document.getElementById("prod-form-desc").value = product.description;
    document.getElementById("prod-form-featured").checked = !!product.featured;
    document.getElementById("prod-form-bestseller").checked = !!product.bestSeller;

    modal.classList.add("open");
  },

  saveProductForm(event) {
    event.preventDefault();
    const id = document.getElementById("prod-form-id").value;
    const name = document.getElementById("prod-form-name").value.trim();
    const category = document.getElementById("prod-form-category").value;
    const price = parseFloat(document.getElementById("prod-form-price").value);
    const originalPrice = parseFloat(document.getElementById("prod-form-original-price").value) || price;
    const stock = parseInt(document.getElementById("prod-form-stock").value) || 0;
    const image = document.getElementById("prod-form-image").value.trim() || getPlaceholderImage(category, name);
    const description = document.getElementById("prod-form-desc").value.trim();
    const featured = document.getElementById("prod-form-featured").checked;
    const bestSeller = document.getElementById("prod-form-bestseller").checked;

    if (!name || isNaN(price)) {
      if (typeof Toast !== "undefined") Toast.show("Please provide product name and valid price.", "error");
      return;
    }

    const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const productPayload = {
      name,
      category,
      price,
      originalPrice,
      discount,
      stock,
      image,
      description,
      featured,
      bestSeller
    };

    if (id) {
      Storage.updateProduct(id, productPayload);
      if (typeof Toast !== "undefined") Toast.show(`Product "${name}" updated successfully.`, "success");
    } else {
      Storage.addProduct(productPayload);
      if (typeof Toast !== "undefined") Toast.show(`New product "${name}" added to catalog.`, "success");
    }

    this.closeModal("product-modal");
    this.renderProductsTable();
    this.renderStats();
  },

  deleteProduct(productId) {
    const product = Storage.getProductById(productId);
    const name = product ? product.name : "Product";

    if (confirm(`Are you sure you want to delete "${name}" from the catalog? This cannot be undone.`)) {
      Storage.deleteProduct(productId);
      if (typeof Toast !== "undefined") Toast.show(`Product "${name}" has been removed.`, "info");
      this.renderProductsTable();
      this.renderStats();
    }
  },

  // ==================== ORDERS MANAGEMENT ====================
  renderOrdersTable() {
    const tbody = document.getElementById("admin-orders-tbody");
    if (!tbody) return;

    let orders = Storage.getOrders();

    if (this.orderStatusFilter !== "all") {
      orders = orders.filter(o => o.status.toLowerCase() === this.orderStatusFilter.toLowerCase());
    }

    if (orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4">No customer orders recorded.</td></tr>`;
      return;
    }

    tbody.innerHTML = orders.map(o => `
      <tr>
        <td><strong>#${o.id}</strong></td>
        <td>
          <strong>${o.customerName}</strong>
          <div class="text-muted small">${o.customerEmail}</div>
        </td>
        <td>${new Date(o.date).toLocaleDateString()}</td>
        <td>${o.items.length} items</td>
        <td><strong>$${o.total.toFixed(2)}</strong></td>
        <td>
          <select class="admin-status-select status-${o.status.toLowerCase()}" onchange="Admin.handleStatusChange('${o.id}', this.value)">
            <option value="Pending" ${o.status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="Processing" ${o.status === "Processing" ? "selected" : ""}>Processing</option>
            <option value="Shipped" ${o.status === "Shipped" ? "selected" : ""}>Shipped</option>
            <option value="Delivered" ${o.status === "Delivered" ? "selected" : ""}>Delivered</option>
            <option value="Cancelled" ${o.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
          </select>
        </td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="Orders.showOrderModal('${o.id}')">
            <i class="fa-solid fa-file-invoice"></i> View
          </button>
        </td>
      </tr>
    `).join("");
  },

  handleStatusChange(orderId, newStatus) {
    Storage.updateOrderStatus(orderId, newStatus);
    if (typeof Toast !== "undefined") {
      Toast.show(`Order #${orderId} status updated to ${newStatus}.`, "success");
    }
    this.renderOrdersTable();
    this.renderStats();
  },

  filterOrdersByStatus(status) {
    this.orderStatusFilter = status;
    this.renderOrdersTable();
  },

  // ==================== USERS MONITOR ====================
  renderUsersTable() {
    const tbody = document.getElementById("admin-users-tbody");
    if (!tbody) return;

    const users = Storage.getUsers();

    tbody.innerHTML = users.map(u => `
      <tr>
        <td><strong>${u.name}</strong></td>
        <td>${u.email}</td>
        <td>
          <span class="badge ${u.role === 'admin' ? 'badge-primary' : 'badge-category'}">
            ${u.role.toUpperCase()}
          </span>
        </td>
        <td>${u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
        <td><span class="text-success"><i class="fa-solid fa-circle-check"></i> Active</span></td>
      </tr>
    `).join("");
  },

  // ==================== CATEGORIES MANAGEMENT ====================
  renderCategoriesList() {
    const container = document.getElementById("admin-categories-list");
    if (!container) return;

    const categories = Storage.getCategories();
    const products = Storage.getProducts();

    container.innerHTML = categories.map(cat => {
      const count = products.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length;
      return `
        <div class="admin-category-card">
          <div class="cat-header">
            <h4><i class="fa-solid ${cat.icon || 'fa-tags'}"></i> ${cat.name}</h4>
            <span class="badge badge-category">${count} products</span>
          </div>
          <p class="text-muted small">${cat.description || "Collection catalog"}</p>
        </div>
      `;
    }).join("");
  },

  handleAddCategory(event) {
    event.preventDefault();
    const input = document.getElementById("new-category-name");
    const name = input.value.trim();

    if (!name) return;

    const res = Storage.addCategory(name);
    if (res) {
      input.value = "";
      if (typeof Toast !== "undefined") Toast.show(`Category "${name}" added successfully.`, "success");
      this.renderCategoriesList();
      
      // Update modal category select options
      const select = document.getElementById("prod-form-category");
      if (select) {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
      }
    } else {
      if (typeof Toast !== "undefined") Toast.show(`Category "${name}" already exists.`, "warning");
    }
  },

  // ==================== MODALS ====================
  setupModals() {
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        e.target.classList.remove("open");
      }
    });
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("open");
  },

  // Restore factory seed data
  resetFactoryData() {
    if (confirm("Reset all products, orders, categories, and demo users to default seed data? Custom modifications will be reset.")) {
      Storage.resetAllData();
    }
  }
};

if (typeof window !== "undefined") {
  window.Admin = Admin;
}
if (typeof global !== "undefined") {
  global.Admin = Admin;
}

