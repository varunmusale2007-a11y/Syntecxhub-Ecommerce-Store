/**
 * ShopSphere - Orders History & Confirmation Logic
 */

const Orders = {
  currentFilter: "all",

  // Initialize My Orders page (orders.html)
  initOrdersPage() {
    const user = Storage.getCurrentUser();
    const guestNotice = document.getElementById("orders-guest-notice");
    const ordersContainer = document.getElementById("orders-list-container");

    if (!user) {
      if (guestNotice) guestNotice.style.display = "block";
      if (ordersContainer) ordersContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-user-lock"></i></div>
          <h3>Login to View Your Orders</h3>
          <p>Please sign in with your demo account to track packages, view receipts, and manage order history.</p>
          <div style="display:flex; gap:12px; justify-content:center; margin-top:16px;">
            <a href="login.html" class="btn btn-primary">Sign In</a>
            <a href="register.html" class="btn btn-outline">Create Account</a>
          </div>
        </div>
      `;
      return;
    }

    if (guestNotice) guestNotice.style.display = "none";
    this.renderOrdersList();
    this.setupFilterTabs();
  },

  // Setup status filter buttons
  setupFilterTabs() {
    const tabs = document.querySelectorAll(".order-filter-btn");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this.currentFilter = tab.getAttribute("data-status");
        this.renderOrdersList();
      });
    });
  },

  // Render orders
  renderOrdersList() {
    const container = document.getElementById("orders-list-container");
    if (!container) return;

    const user = Storage.getCurrentUser();
    let orders = Storage.getUserOrders(user ? user.email : "");

    // Also include any orders placed as guest if matches
    if (this.currentFilter !== "all") {
      orders = orders.filter(o => o.status.toLowerCase() === this.currentFilter.toLowerCase());
    }

    if (orders.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-box-archive"></i></div>
          <h3>No Orders Found</h3>
          <p>You haven't placed any orders matching this status yet.</p>
          <a href="shop.html" class="btn btn-primary" style="margin-top:16px;">Explore Products</a>
        </div>
      `;
      return;
    }

    container.innerHTML = orders.map(order => {
      const orderDate = new Date(order.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });

      const statusClass = order.status.toLowerCase();

      const itemsPreviewHtml = order.items.map(item => `
        <div class="order-item-chip" title="${item.name} (${item.quantity}x)">
          <img src="${item.image}" alt="${item.name}" onerror="this.src=getPlaceholderImage('${item.category}', '${item.name.replace(/'/g, "\\'")}');">
          <span class="chip-count">x${item.quantity}</span>
        </div>
      `).join("");

      return `
        <div class="order-card" data-order-id="${order.id}">
          <div class="order-card-header">
            <div class="order-meta">
              <span class="order-id">#${order.id}</span>
              <span class="order-date"><i class="fa-regular fa-calendar"></i> ${orderDate}</span>
            </div>
            <div class="order-status-badge status-${statusClass}">
              <span class="status-dot"></span> ${order.status}
            </div>
          </div>

          <div class="order-card-body">
            <div class="order-items-preview">
              ${itemsPreviewHtml}
              <div class="order-items-summary-text">
                <strong>${order.items.length} item${order.items.length > 1 ? "s" : ""}</strong>
                <span>${order.items.map(i => i.name).slice(0, 2).join(", ")}${order.items.length > 2 ? "..." : ""}</span>
              </div>
            </div>

            <div class="order-total-price">
              <span class="total-label">Total Amount</span>
              <span class="total-value">$${order.total.toFixed(2)}</span>
            </div>
          </div>

          <div class="order-card-footer">
            <button class="btn btn-outline btn-sm" onclick="Orders.showOrderModal('${order.id}')">
              <i class="fa-regular fa-eye"></i> View Order Details
            </button>
            <span class="payment-tag"><i class="fa-solid fa-credit-card"></i> ${order.paymentMethod}</span>
          </div>
        </div>
      `;
    }).join("");
  },

  // Modal displaying detailed order breakdown & tracking timeline
  showOrderModal(orderId) {
    const order = Storage.getOrderById(orderId);
    if (!order) {
      if (typeof Toast !== "undefined") Toast.show("Order not found.", "error");
      return;
    }

    const modal = document.getElementById("order-details-modal");
    const modalContent = document.getElementById("order-modal-body");
    if (!modal || !modalContent) return;

    const formattedDate = new Date(order.date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short"
    });

    // Tracking timeline states
    const stages = ["Placed", "Processing", "Shipped", "Delivered"];
    let currentIdx = stages.indexOf(order.status);
    if (order.status === "Cancelled") currentIdx = -1;

    let timelineHtml = `
      <div class="tracking-timeline">
        ${stages.map((stage, idx) => {
          let stateClass = "";
          if (order.status === "Cancelled") {
            stateClass = "cancelled";
          } else if (idx <= currentIdx) {
            stateClass = "completed";
          } else {
            stateClass = "upcoming";
          }
          return `
            <div class="timeline-step ${stateClass}">
              <div class="timeline-dot">
                <i class="fa-solid ${idx <= currentIdx ? "fa-check" : "fa-circle"}"></i>
              </div>
              <span class="timeline-label">${stage}</span>
            </div>
          `;
        }).join('<div class="timeline-line"></div>')}
      </div>
    `;

    if (order.status === "Cancelled") {
      timelineHtml = `
        <div class="alert alert-danger" style="margin-bottom:20px;">
          <i class="fa-solid fa-ban"></i> This order was marked as <strong>Cancelled</strong>.
        </div>
      `;
    }

    const itemsHtml = order.items.map(item => `
      <div class="modal-order-item">
        <img src="${item.image}" alt="${item.name}" onerror="this.src=getPlaceholderImage('${item.category}', '${item.name.replace(/'/g, "\\'")}');">
        <div class="item-details">
          <h4>${item.name}</h4>
          <span class="unit-price">$${item.price.toFixed(2)} × ${item.quantity}</span>
        </div>
        <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join("");

    modalContent.innerHTML = `
      <div class="modal-order-header">
        <div>
          <h3>Order #${order.id}</h3>
          <p class="text-muted">Placed on ${formattedDate}</p>
        </div>
        <span class="order-status-badge status-${order.status.toLowerCase()}">${order.status}</span>
      </div>

      ${timelineHtml}

      <div class="modal-section">
        <h4>Items Ordered</h4>
        <div class="modal-items-list">
          ${itemsHtml}
        </div>
      </div>

      <div class="modal-grid-row">
        <div class="modal-col">
          <h4>Shipping Destination</h4>
          <p class="shipping-info">
            <strong>${order.shippingAddress.fullName}</strong><br>
            ${order.shippingAddress.street}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}<br>
            ${order.shippingAddress.country}<br>
            <i class="fa-solid fa-phone"></i> ${order.customerPhone || "N/A"}
          </p>
        </div>

        <div class="modal-col">
          <h4>Payment Summary</h4>
          <p class="payment-info">
            <strong>Method:</strong> ${order.paymentMethod}<br>
            <strong>Status:</strong> Completed (Demo Simulation)
          </p>
          <div class="cost-summary">
            <div class="cost-row"><span>Subtotal:</span><span>$${order.subtotal.toFixed(2)}</span></div>
            ${order.discountAmount > 0 ? `<div class="cost-row text-success"><span>Discount (${order.couponCode || 'Promo'}):</span><span>-$${order.discountAmount.toFixed(2)}</span></div>` : ""}
            <div class="cost-row"><span>Shipping:</span><span>${order.shippingCost === 0 ? 'FREE' : '$' + order.shippingCost.toFixed(2)}</span></div>
            <div class="cost-row total"><span>Total:</span><span>$${order.total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("open");
  },

  // Close order modal
  closeOrderModal() {
    const modal = document.getElementById("order-details-modal");
    if (modal) modal.classList.remove("open");
  },

  // Initialize Confirmation Page (confirmation.html)
  initConfirmationPage() {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId") || sessionStorage.getItem("last_order_id");
    const container = document.getElementById("confirmation-details-container");
    if (!container) return;

    if (!orderId) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <h3>No Order Reference Found</h3>
          <p>We couldn't locate a recent order record in this session.</p>
          <a href="shop.html" class="btn btn-primary" style="margin-top:16px;">Browse Store</a>
        </div>
      `;
      return;
    }

    const order = Storage.getOrderById(orderId);
    if (!order) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-box-open"></i></div>
          <h3>Order Record Expired or Missing</h3>
          <p>Order reference #${orderId} was not found in local storage.</p>
          <a href="shop.html" class="btn btn-primary" style="margin-top:16px;">Return to Shop</a>
        </div>
      `;
      return;
    }

    const orderDate = new Date(order.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const estDelivery = new Date(new Date(order.date).getTime() + (3 * 24 * 60 * 60 * 1000)).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });

    container.innerHTML = `
      <div class="confirmation-card">
        <div class="confirmation-success-badge">
          <i class="fa-solid fa-circle-check"></i>
        </div>

        <h1 class="confirmation-title">Thank You for Your Order!</h1>
        <p class="confirmation-subtitle">
          Your demo order has been placed successfully and is now being processed. A simulated confirmation receipt has been generated.
        </p>

        <div class="order-quick-info">
          <div class="info-cell">
            <span class="info-label">Order Number</span>
            <span class="info-val highlight">#${order.id}</span>
          </div>
          <div class="info-cell">
            <span class="info-label">Order Date</span>
            <span class="info-val">${orderDate}</span>
          </div>
          <div class="info-cell">
            <span class="info-label">Est. Delivery</span>
            <span class="info-val">${estDelivery}</span>
          </div>
          <div class="info-cell">
            <span class="info-label">Payment Method</span>
            <span class="info-val">${order.paymentMethod}</span>
          </div>
        </div>

        <div class="confirmation-items-box">
          <h3>Order Summary (${order.items.length} items)</h3>
          <div class="confirm-items-list">
            ${order.items.map(item => `
              <div class="confirm-item-row">
                <img src="${item.image}" alt="${item.name}" onerror="this.src=getPlaceholderImage('${item.category}', '${item.name.replace(/'/g, "\\'")}');">
                <div class="confirm-item-title">
                  <strong>${item.name}</strong>
                  <span>Qty: ${item.quantity}</span>
                </div>
                <div class="confirm-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            `).join("")}
          </div>

          <div class="confirm-financial-breakdown">
            <div class="fin-row"><span>Subtotal:</span><span>$${order.subtotal.toFixed(2)}</span></div>
            ${order.discountAmount > 0 ? `<div class="fin-row text-success"><span>Discount:</span><span>-$${order.discountAmount.toFixed(2)}</span></div>` : ""}
            <div class="fin-row"><span>Shipping:</span><span>${order.shippingCost === 0 ? 'FREE' : '$' + order.shippingCost.toFixed(2)}</span></div>
            <div class="fin-row total"><span>Total Amount Paid:</span><span>$${order.total.toFixed(2)}</span></div>
          </div>
        </div>

        <div class="confirmation-shipping-box">
          <h4><i class="fa-solid fa-location-dot"></i> Shipping to:</h4>
          <p>
            <strong>${order.shippingAddress.fullName}</strong><br>
            ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}<br>
            ${order.shippingAddress.country} | Phone: ${order.customerPhone || "N/A"}
          </p>
        </div>

        <div class="confirmation-actions">
          <button class="btn btn-outline" onclick="window.print()">
            <i class="fa-solid fa-print"></i> Print Invoice Receipt
          </button>
          <a href="orders.html" class="btn btn-secondary">
            <i class="fa-solid fa-list-check"></i> View in My Orders
          </a>
          <a href="shop.html" class="btn btn-primary">
            <i class="fa-solid fa-bag-shopping"></i> Continue Shopping
          </a>
        </div>
      </div>
    `;
  }
};

if (typeof window !== "undefined") {
  window.Orders = Orders;
}
if (typeof global !== "undefined") {
  global.Orders = Orders;
}

