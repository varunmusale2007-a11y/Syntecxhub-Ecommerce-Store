/**
 * ShopSphere - Shopping Cart Logic & UI Renderer
 */

const Cart = {
  // Handle Add to Cart action from any button
  handleAddToCart(productId, quantity = 1, event = null) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const result = Storage.addToCart(productId, quantity);

    if (result.success) {
      if (typeof Toast !== "undefined") {
        Toast.show(result.message, "success", "fa-circle-check");
      }
      this.updateNavbarCount();
    } else {
      if (typeof Toast !== "undefined") {
        Toast.show(result.message, "warning", "fa-triangle-exclamation");
      }
    }

    return result;
  },

  // Update navbar cart badge counter
  updateNavbarCount() {
    if (typeof document === "undefined") return;
    const cart = Storage.getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? "inline-flex" : "none";
    });
  },


  // Increase or decrease quantity
  changeQuantity(productId, delta) {
    const cart = Storage.getCart();
    const item = cart.find(i => String(i.productId) === String(productId));
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      this.handleRemoveItem(productId);
      return;
    }

    const res = Storage.updateCartQty(productId, newQty);
    if (res && res.limited) {
      if (typeof Toast !== "undefined") {
        Toast.show(`Maximum stock available is ${res.max}`, "info");
      }
    }
    this.renderCartPage();
    this.updateNavbarCount();
  },

  // Direct quantity input change
  setQuantity(productId, newQty) {
    const qty = parseInt(newQty);
    if (isNaN(qty) || qty <= 0) {
      this.handleRemoveItem(productId);
      return;
    }
    Storage.updateCartQty(productId, qty);
    this.renderCartPage();
    this.updateNavbarCount();
  },

  // Remove single item from cart
  handleRemoveItem(productId) {
    const product = Storage.getProductById(productId);
    Storage.removeFromCart(productId);
    if (typeof Toast !== "undefined") {
      Toast.show(product ? `Removed "${product.name}" from cart.` : "Item removed from cart.", "info");
    }
    this.renderCartPage();
    this.updateNavbarCount();
  },

  // Clear all items
  clearAll() {
    if (confirm("Are you sure you want to empty your shopping cart?")) {
      Storage.clearCart();
      if (typeof Toast !== "undefined") {
        Toast.show("Cart cleared successfully.", "info");
      }
      this.renderCartPage();
      this.updateNavbarCount();
    }
  },

  // Apply promo coupon
  applyCouponCode(code) {
    const res = Storage.applyCoupon(code);
    if (res.success) {
      if (typeof Toast !== "undefined") {
        Toast.show(res.message, "success", "fa-tag");
      }
    } else {
      if (typeof Toast !== "undefined") {
        Toast.show(res.message, "error", "fa-circle-xmark");
      }
    }
    this.renderCartPage();
  },

  // Remove applied coupon
  removeCouponCode() {
    Storage.removeCoupon();
    if (typeof Toast !== "undefined") {
      Toast.show("Promo code removed.", "info");
    }
    this.renderCartPage();
  },

  // Render the entire Cart page (cart.html)
  renderCartPage() {
    const cartContainer = document.getElementById("cart-items-container");
    const summaryContainer = document.getElementById("cart-summary-container");
    const cartLayout = document.getElementById("cart-layout");

    if (!cartContainer || !summaryContainer) return;

    const cart = Storage.getCart();
    const totals = Storage.getCartTotals();

    if (cart.length === 0) {
      if (cartLayout) cartLayout.classList.add("empty");
      cartContainer.innerHTML = `
        <div class="empty-state cart-empty-state">
          <div class="empty-icon"><i class="fa-solid fa-cart-shopping"></i></div>
          <h2>Your Shopping Cart is Empty</h2>
          <p>Looks like you haven't added any products to your cart yet. Discover something extraordinary today!</p>
          <a href="shop.html" class="btn btn-primary btn-lg">
            <i class="fa-solid fa-bag-shopping"></i> Start Shopping
          </a>
        </div>
      `;
      summaryContainer.innerHTML = "";
      summaryContainer.style.display = "none";
      return;
    }

    if (cartLayout) cartLayout.classList.remove("empty");
    summaryContainer.style.display = "block";

    // Items list table/cards
    const itemsHtml = cart.map(item => {
      const lineTotal = (item.price * item.quantity).toFixed(2);
      return `
        <div class="cart-item" data-id="${item.productId}">
          <div class="cart-item-image">
            <a href="product.html?id=${item.productId}">
              <img src="${item.image}" alt="${item.name}" onerror="this.src=getPlaceholderImage('${item.category}', '${item.name.replace(/'/g, "\\'")}');">
            </a>
          </div>
          
          <div class="cart-item-info">
            <span class="cart-item-cat">${item.category || ""}</span>
            <h4 class="cart-item-name">
              <a href="product.html?id=${item.productId}">${item.name}</a>
            </h4>
            <div class="cart-item-price-mobile">$${item.price.toFixed(2)} each</div>
          </div>
          
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          
          <div class="cart-item-quantity">
            <div class="quantity-picker">
              <button class="qty-btn" onclick="Cart.changeQuantity('${item.productId}', -1)" aria-label="Decrease quantity">
                <i class="fa-solid fa-minus"></i>
              </button>
              <input type="number" 
                     class="qty-input" 
                     value="${item.quantity}" 
                     min="1" 
                     max="${item.stock || 99}" 
                     onchange="Cart.setQuantity('${item.productId}', this.value)"
                     aria-label="Quantity">
              <button class="qty-btn" onclick="Cart.changeQuantity('${item.productId}', 1)" aria-label="Increase quantity">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          
          <div class="cart-item-total">$${lineTotal}</div>
          
          <div class="cart-item-action">
            <button class="remove-btn" onclick="Cart.handleRemoveItem('${item.productId}')" title="Remove item" aria-label="Remove item">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      `;
    }).join("");

    cartContainer.innerHTML = `
      <div class="cart-header-row">
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Subtotal</span>
        <span>Action</span>
      </div>
      <div class="cart-items-list">
        ${itemsHtml}
      </div>
      <div class="cart-actions-bar">
        <a href="shop.html" class="btn btn-outline">
          <i class="fa-solid fa-arrow-left"></i> Continue Shopping
        </a>
        <button class="btn btn-danger-outline" onclick="Cart.clearAll()">
          <i class="fa-regular fa-trash-can"></i> Clear Cart
        </button>
      </div>
    `;

    // Free shipping threshold indicator ($50)
    const freeShippingThreshold = 50.00;
    const diff = freeShippingThreshold - totals.subtotal;
    let shippingMessage = "";
    if (diff > 0) {
      const pct = Math.min(100, Math.round((totals.subtotal / freeShippingThreshold) * 100));
      shippingMessage = `
        <div class="shipping-progress-box">
          <p class="shipping-hint"><i class="fa-solid fa-truck-fast"></i> Add <strong>$${diff.toFixed(2)}</strong> more to get <strong>FREE Shipping</strong>!</p>
          <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${pct}%"></div></div>
        </div>
      `;
    } else {
      shippingMessage = `
        <div class="shipping-progress-box free-shipping-qualified">
          <p class="shipping-hint"><i class="fa-solid fa-circle-check"></i> Congratulations! You've unlocked <strong>FREE Shipping</strong>!</p>
        </div>
      `;
    }

    // Coupon markup
    const coupon = totals.appliedCoupon;
    const couponHtml = coupon ? `
      <div class="applied-coupon-pill">
        <div>
          <i class="fa-solid fa-tag"></i>
          <strong>${coupon.code}</strong> (${coupon.description})
        </div>
        <button onclick="Cart.removeCouponCode()" title="Remove coupon" class="btn-remove-coupon">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    ` : `
      <form class="coupon-form" onsubmit="event.preventDefault(); Cart.applyCouponCode(document.getElementById('coupon-input').value);">
        <input type="text" id="coupon-input" placeholder="Promo code (e.g. SHOPSPHERE10, SAVE20)" class="form-input">
        <button type="submit" class="btn btn-secondary">Apply</button>
      </form>
      <div class="coupon-suggestions">
        <small>Try: <code>SHOPSPHERE10</code>, <code>SAVE20</code>, <code>FREESHIP</code></small>
      </div>
    `;

    // Summary panel
    summaryContainer.innerHTML = `
      <div class="summary-card">
        <h3 class="summary-title">Order Summary</h3>
        ${shippingMessage}
        
        <div class="summary-rows">
          <div class="summary-row">
            <span>Items (${totals.itemCount}):</span>
            <span>$${totals.subtotal.toFixed(2)}</span>
          </div>
          
          ${totals.discount > 0 ? `
          <div class="summary-row discount-row">
            <span>Discount:</span>
            <span class="discount-amount">-$${totals.discount.toFixed(2)}</span>
          </div>
          ` : ""}
          
          <div class="summary-row">
            <span>Estimated Shipping:</span>
            <span>${totals.shipping === 0 ? '<span class="text-success">FREE</span>' : '$' + totals.shipping.toFixed(2)}</span>
          </div>
          
          <div class="summary-divider"></div>
          
          <div class="summary-row total-row">
            <span>Estimated Total:</span>
            <span class="total-price">$${totals.total.toFixed(2)}</span>
          </div>
        </div>

        <div class="summary-coupon-section">
          <label>Have a Promotional Voucher?</label>
          ${couponHtml}
        </div>

        <div class="summary-actions">
          <a href="checkout.html" class="btn btn-primary btn-block btn-lg">
            Proceed to Checkout <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        <div class="secure-checkout-badge">
          <i class="fa-solid fa-shield-halved"></i>
          <span>Guaranteed Safe & Secure Checkout Demo</span>
        </div>
      </div>
    `;
  }
};

if (typeof window !== "undefined") {
  window.Cart = Cart;
}
if (typeof global !== "undefined") {
  global.Cart = Cart;
}

