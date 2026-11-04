/**
 * ShopSphere - LocalStorage Management Module
 * Robust storage handler for products, users, cart, wishlist, orders and preferences
 */

const STORAGE_KEYS = {
  PRODUCTS: "shopsphere_products",
  CATEGORIES: "shopsphere_categories",
  USERS: "shopsphere_users",
  CURRENT_USER: "shopsphere_current_user",
  CART: "shopsphere_cart",
  WISHLIST: "shopsphere_wishlist",
  ORDERS: "shopsphere_orders",
  THEME: "shopsphere_theme",
  APPLIED_COUPON: "shopsphere_applied_coupon"
};

const Storage = {
  // Safe getItem helper
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      if (data === null || data === undefined) return defaultValue;
      return JSON.parse(data);
    } catch (e) {
      console.error(`Error parsing LocalStorage key: ${key}`, e);
      return defaultValue;
    }
  },

  // Safe setItem helper
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error saving to LocalStorage key: ${key}`, e);
      return false;
    }
  },

  // Remove key
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing LocalStorage key: ${key}`, e);
    }
  },

  // Initialize storage seeds if absent
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      this.set(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      this.set(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.set(STORAGE_KEYS.USERS, INITIAL_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      this.set(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CART)) {
      this.set(STORAGE_KEYS.CART, []);
    }
    if (!localStorage.getItem(STORAGE_KEYS.WISHLIST)) {
      this.set(STORAGE_KEYS.WISHLIST, []);
    }
  },

  // ==================== PRODUCTS ====================
  getProducts() {
    const list = this.get(STORAGE_KEYS.PRODUCTS, []);
    return Array.isArray(list) ? list : INITIAL_PRODUCTS;
  },

  saveProducts(products) {
    return this.set(STORAGE_KEYS.PRODUCTS, products);
  },

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => String(p.id) === String(id)) || null;
  },

  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      ...product,
      id: "prod-" + Date.now(),
      rating: parseFloat(product.rating) || 5.0,
      reviewsCount: parseInt(product.reviewsCount) || 1,
      stock: parseInt(product.stock) || 10,
      price: parseFloat(product.price) || 0,
      originalPrice: parseFloat(product.originalPrice) || parseFloat(product.price) || 0,
      discount: product.discount ? parseInt(product.discount) : 0,
      createdAt: new Date().toISOString().split("T")[0]
    };
    products.unshift(newProduct);
    this.saveProducts(products);
    return newProduct;
  },

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex(p => String(p.id) === String(id));
    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...updatedFields,
      price: parseFloat(updatedFields.price !== undefined ? updatedFields.price : products[index].price),
      originalPrice: parseFloat(updatedFields.originalPrice !== undefined ? updatedFields.originalPrice : products[index].originalPrice),
      stock: parseInt(updatedFields.stock !== undefined ? updatedFields.stock : products[index].stock)
    };
    this.saveProducts(products);
    return products[index];
  },

  deleteProduct(id) {
    const products = this.getProducts();
    const filtered = products.filter(p => String(p.id) !== String(id));
    this.saveProducts(filtered);
    return filtered.length !== products.length;
  },

  // ==================== CATEGORIES ====================
  getCategories() {
    const categories = this.get(STORAGE_KEYS.CATEGORIES, []);
    return Array.isArray(categories) ? categories : INITIAL_CATEGORIES;
  },

  addCategory(categoryName) {
    const categories = this.getCategories();
    const exists = categories.some(c => c.name.toLowerCase() === categoryName.trim().toLowerCase());
    if (exists) return false;

    const newCat = {
      id: categoryName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name: categoryName.trim(),
      icon: "fa-tags",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80",
      description: "Curated collection",
      itemCount: 0
    };
    categories.push(newCat);
    this.set(STORAGE_KEYS.CATEGORIES, categories);
    return newCat;
  },

  // ==================== CART ====================
  getCart() {
    return this.get(STORAGE_KEYS.CART, []);
  },

  saveCart(cart) {
    return this.set(STORAGE_KEYS.CART, cart);
  },

  addToCart(productId, quantity = 1) {
    const cart = this.getCart();
    const product = this.getProductById(productId);
    if (!product) return { success: false, message: "Product not found" };

    const qtyToAdd = Math.max(1, parseInt(quantity) || 1);
    const existingIndex = cart.findIndex(item => String(item.productId) === String(productId));

    if (existingIndex > -1) {
      const currentQty = cart[existingIndex].quantity;
      if (currentQty + qtyToAdd > product.stock) {
        return { success: false, message: `Only ${product.stock} units available in stock.` };
      }
      cart[existingIndex].quantity += qtyToAdd;
    } else {
      if (qtyToAdd > product.stock) {
        return { success: false, message: `Only ${product.stock} units available in stock.` };
      }
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: qtyToAdd,
        stock: product.stock
      });
    }

    this.saveCart(cart);
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: { cart } }));
    return { success: true, message: `"${product.name}" added to cart!` };
  },

  updateCartQty(productId, quantity) {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(item => String(item.productId) === String(productId));
    if (itemIndex === -1) return false;

    const targetQty = parseInt(quantity);
    if (targetQty <= 0) {
      return this.removeFromCart(productId);
    }

    const product = this.getProductById(productId);
    if (product && targetQty > product.stock) {
      cart[itemIndex].quantity = product.stock;
      this.saveCart(cart);
      window.dispatchEvent(new CustomEvent("cart-updated", { detail: { cart } }));
      return { limited: true, max: product.stock };
    }

    cart[itemIndex].quantity = targetQty;
    this.saveCart(cart);
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: { cart } }));
    return { success: true };
  },

  removeFromCart(productId) {
    const cart = this.getCart();
    const filtered = cart.filter(item => String(item.productId) !== String(productId));
    this.saveCart(filtered);
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: { cart: filtered } }));
    return true;
  },

  clearCart() {
    this.set(STORAGE_KEYS.CART, []);
    this.remove(STORAGE_KEYS.APPLIED_COUPON);
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: { cart: [] } }));
  },

  getAppliedCoupon() {
    return this.get(STORAGE_KEYS.APPLIED_COUPON, null);
  },

  applyCoupon(code) {
    if (!code) return { success: false, message: "Please enter a promo coupon code." };
    const cleanCode = code.trim().toUpperCase();
    const coupon = VALID_COUPONS[cleanCode];
    if (!coupon) {
      return { success: false, message: "Invalid or expired promo code." };
    }
    this.set(STORAGE_KEYS.APPLIED_COUPON, { code: cleanCode, ...coupon });
    return { success: true, coupon, message: `Coupon "${cleanCode}" applied: ${coupon.description}` };
  },

  removeCoupon() {
    this.remove(STORAGE_KEYS.APPLIED_COUPON);
  },

  getCartTotals() {
    const cart = this.getCart();
    const coupon = this.getAppliedCoupon();
    
    let subtotal = 0;
    let itemCount = 0;

    cart.forEach(item => {
      subtotal += (item.price * item.quantity);
      itemCount += item.quantity;
    });

    let discount = 0;
    let shipping = 0;

    if (subtotal > 0) {
      // Standard shipping rule: Free if subtotal >= 50, else $10
      shipping = subtotal >= 50 ? 0 : 10.00;

      if (coupon) {
        if (coupon.freeShipping) {
          shipping = 0;
        }
        if (coupon.discountPercent) {
          discount = (subtotal * coupon.discountPercent) / 100;
        }
      }
    }

    const total = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(discount.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      itemCount,
      appliedCoupon: coupon
    };
  },

  // ==================== WISHLIST ====================
  getWishlist() {
    return this.get(STORAGE_KEYS.WISHLIST, []);
  },

  saveWishlist(list) {
    return this.set(STORAGE_KEYS.WISHLIST, list);
  },

  toggleWishlist(productId) {
    let list = this.getWishlist();
    const stringId = String(productId);
    const index = list.indexOf(stringId);
    let isAdded = false;

    if (index > -1) {
      list.splice(index, 1);
      isAdded = false;
    } else {
      list.push(stringId);
      isAdded = true;
    }

    this.saveWishlist(list);
    window.dispatchEvent(new CustomEvent("wishlist-updated", { detail: { wishlist: list, productId: stringId, isAdded } }));
    return isAdded;
  },

  isInWishlist(productId) {
    const list = this.getWishlist();
    return list.includes(String(productId));
  },

  // ==================== USERS & AUTH ====================
  getUsers() {
    return this.get(STORAGE_KEYS.USERS, INITIAL_USERS);
  },

  saveUsers(users) {
    return this.set(STORAGE_KEYS.USERS, users);
  },

  getCurrentUser() {
    return this.get(STORAGE_KEYS.CURRENT_USER, null);
  },

  setCurrentUser(user) {
    return this.set(STORAGE_KEYS.CURRENT_USER, user);
  },

  logoutUser() {
    this.remove(STORAGE_KEYS.CURRENT_USER);
    window.dispatchEvent(new CustomEvent("auth-changed", { detail: { user: null } }));
  },

  // ==================== ORDERS ====================
  getOrders() {
    return this.get(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  },

  saveOrders(orders) {
    return this.set(STORAGE_KEYS.ORDERS, orders);
  },

  getOrderById(orderId) {
    const orders = this.getOrders();
    return orders.find(o => String(o.id) === String(orderId)) || null;
  },

  getUserOrders(email) {
    const orders = this.getOrders();
    if (!email) return [];
    return orders.filter(o => o.customerEmail && o.customerEmail.toLowerCase() === email.toLowerCase());
  },

  createOrder(orderData) {
    const orders = this.getOrders();
    const orderId = "ORD-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
    
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      status: "Processing",
      ...orderData
    };

    orders.unshift(newOrder);
    this.saveOrders(orders);
    this.clearCart();
    return newOrder;
  },

  updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const index = orders.findIndex(o => String(o.id) === String(orderId));
    if (index === -1) return false;

    orders[index].status = status;
    this.saveOrders(orders);
    return orders[index];
  },

  // ==================== THEME ====================
  getTheme() {
    return this.get(STORAGE_KEYS.THEME, "light");
  },

  setTheme(theme) {
    this.set(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute("data-theme", theme);
  },

  // ==================== RESET ====================
  resetAllData() {
    this.set(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    this.set(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    this.set(STORAGE_KEYS.USERS, INITIAL_USERS);
    this.set(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    this.set(STORAGE_KEYS.CART, []);
    this.set(STORAGE_KEYS.WISHLIST, []);
    this.remove(STORAGE_KEYS.APPLIED_COUPON);
    window.location.reload();
  }
};

// Auto-run init
Storage.init();

if (typeof window !== "undefined") {
  window.Storage = Storage;
  window.STORAGE_KEYS = STORAGE_KEYS;
}
if (typeof global !== "undefined") {
  global.Storage = Storage;
  global.STORAGE_KEYS = STORAGE_KEYS;
}

