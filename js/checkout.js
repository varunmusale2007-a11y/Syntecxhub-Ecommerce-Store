/**
 * ShopSphere - Checkout Processing & Order Creation Module
 */

const Checkout = {
  selectedPaymentMethod: "card",

  init() {
    // Check if cart is empty
    const cart = Storage.getCart();
    if (!cart || cart.length === 0) {
      if (typeof Toast !== "undefined") {
        Toast.show("Your cart is empty. Add products before checking out.", "warning");
      }
      setTimeout(() => {
        window.location.href = "shop.html";
      }, 1200);
      return;
    }

    this.prefillUserInfo();
    this.renderOrderSummary();
    this.setupPaymentTabs();
    this.setupFormSubmit();
  },

  // Auto-populate form if user is logged in
  prefillUserInfo() {
    const user = Storage.getCurrentUser();
    if (!user) return;

    const nameInput = document.getElementById("checkout-name");
    const emailInput = document.getElementById("checkout-email");
    const phoneInput = document.getElementById("checkout-phone");
    const streetInput = document.getElementById("checkout-street");
    const cityInput = document.getElementById("checkout-city");
    const stateInput = document.getElementById("checkout-state");
    const zipInput = document.getElementById("checkout-zip");

    if (nameInput && user.name) nameInput.value = user.name;
    if (emailInput && user.email) emailInput.value = user.email;
    if (phoneInput && user.phone) phoneInput.value = user.phone;
    if (user.address) {
      if (streetInput && user.address.street) streetInput.value = user.address.street;
      if (cityInput && user.address.city) cityInput.value = user.address.city;
      if (stateInput && user.address.state) stateInput.value = user.address.state;
      if (zipInput && user.address.zip) zipInput.value = user.address.zip;
    }
  },

  // Render order review on checkout page
  renderOrderSummary() {
    const summaryContainer = document.getElementById("checkout-items-list");
    const totalsContainer = document.getElementById("checkout-totals");
    if (!summaryContainer || !totalsContainer) return;

    const cart = Storage.getCart();
    const totals = Storage.getCartTotals();

    summaryContainer.innerHTML = cart.map(item => `
      <div class="checkout-item-row">
        <div class="checkout-item-img">
          <img src="${item.image}" alt="${item.name}" onerror="this.src=getPlaceholderImage('${item.category}', '${item.name.replace(/'/g, "\\'")}');">
          <span class="checkout-item-badge">${item.quantity}</span>
        </div>
        <div class="checkout-item-desc">
          <span class="checkout-item-title">${item.name}</span>
          <span class="checkout-item-cat">${item.category || ""}</span>
        </div>
        <span class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join("");

    totalsContainer.innerHTML = `
      <div class="checkout-sum-row">
        <span>Subtotal (${totals.itemCount} items)</span>
        <span>$${totals.subtotal.toFixed(2)}</span>
      </div>
      
      ${totals.discount > 0 ? `
      <div class="checkout-sum-row discount">
        <span>Discount (${totals.appliedCoupon ? totals.appliedCoupon.code : 'Coupon'})</span>
        <span>-$${totals.discount.toFixed(2)}</span>
      </div>
      ` : ""}
      
      <div class="checkout-sum-row">
        <span>Shipping</span>
        <span>${totals.shipping === 0 ? '<strong class="text-success">FREE</strong>' : '$' + totals.shipping.toFixed(2)}</span>
      </div>

      <div class="checkout-divider"></div>

      <div class="checkout-sum-row total">
        <span>Total Due</span>
        <span class="final-total">$${totals.total.toFixed(2)}</span>
      </div>
    `;
  },

  // Payment method switcher
  setupPaymentTabs() {
    const paymentOptions = document.querySelectorAll(".payment-method-card");
    const paymentForms = document.querySelectorAll(".payment-subform");

    paymentOptions.forEach(opt => {
      opt.addEventListener("click", () => {
        paymentOptions.forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");
        const method = opt.getAttribute("data-method");
        this.selectedPaymentMethod = method;

        paymentForms.forEach(form => {
          if (form.getAttribute("data-method") === method) {
            form.style.display = "block";
          } else {
            form.style.display = "none";
          }
        });
      });
    });
  },

  // Setup form submission with validation
  setupFormSubmit() {
    const form = document.getElementById("checkout-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.processOrder();
    });
  },

  // Process order with simulated delay
  processOrder() {
    const name = document.getElementById("checkout-name").value.trim();
    const email = document.getElementById("checkout-email").value.trim();
    const phone = document.getElementById("checkout-phone").value.trim();
    const street = document.getElementById("checkout-street").value.trim();
    const city = document.getElementById("checkout-city").value.trim();
    const state = document.getElementById("checkout-state").value.trim();
    const zip = document.getElementById("checkout-zip").value.trim();

    // Validation
    if (!name || !email || !street || !city || !state || !zip) {
      if (typeof Toast !== "undefined") {
        Toast.show("Please fill out all required shipping and contact fields.", "error");
      }
      return;
    }

    if (!Auth.isValidEmail(email)) {
      if (typeof Toast !== "undefined") {
        Toast.show("Please enter a valid email address.", "error");
      }
      return;
    }

    const submitBtn = document.getElementById("btn-place-order");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing Demo Order...`;
    }

    // Method description
    let paymentMethodLabel = "Credit/Debit Card (Simulated)";
    if (this.selectedPaymentMethod === "paypal") {
      paymentMethodLabel = "PayPal (Simulated)";
    } else if (this.selectedPaymentMethod === "cod") {
      paymentMethodLabel = "Cash on Delivery";
    }

    const cart = Storage.getCart();
    const totals = Storage.getCartTotals();
    const currentUser = Storage.getCurrentUser();

    // Prepare order data
    const orderData = {
      userId: currentUser ? currentUser.id : "guest-" + Date.now(),
      customerName: name,
      customerEmail: email,
      customerPhone: phone || "Not provided",
      items: cart,
      subtotal: totals.subtotal,
      discountAmount: totals.discount,
      shippingCost: totals.shipping,
      couponCode: totals.appliedCoupon ? totals.appliedCoupon.code : "",
      total: totals.total,
      status: "Processing",
      paymentMethod: paymentMethodLabel,
      shippingAddress: {
        fullName: name,
        street,
        city,
        state,
        zip,
        country: "United States"
      }
    };

    // Simulate realistic transaction processing latency (1 second)
    setTimeout(() => {
      const createdOrder = Storage.createOrder(orderData);
      
      // Store current created order ID in sessionStorage for confirmation page
      sessionStorage.setItem("last_order_id", createdOrder.id);
      
      if (typeof Toast !== "undefined") {
        Toast.show("Order placed successfully!", "success");
      }

      window.location.href = `confirmation.html?orderId=${createdOrder.id}`;
    }, 1000);
  }
};

if (typeof window !== "undefined") {
  window.Checkout = Checkout;
}
if (typeof global !== "undefined") {
  global.Checkout = Checkout;
}

