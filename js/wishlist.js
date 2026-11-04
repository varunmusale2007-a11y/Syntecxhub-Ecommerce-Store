/**
 * ShopSphere - Wishlist Management Module
 */

const Wishlist = {
  // Toggle product in wishlist
  handleToggle(productId, buttonElement = null, event = null) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const isAdded = Storage.toggleWishlist(productId);
    const product = Storage.getProductById(productId);
    const name = product ? product.name : "Product";

    // Update UI on clicked button and any identical product cards
    this.syncButtonStates(productId, isAdded);
    this.updateNavbarCount();

    if (typeof Toast !== "undefined") {
      if (isAdded) {
        Toast.show(`"${name}" added to your wishlist.`, "success", "fa-heart");
      } else {
        Toast.show(`"${name}" removed from wishlist.`, "info", "fa-heart-crack");
      }
    }

    return isAdded;
  },

  // Update button visual state across the entire page
  syncButtonStates(productId, isAdded) {
    if (typeof document === "undefined") return;
    const buttons = document.querySelectorAll(`button[onclick*="Wishlist.handleToggle('${productId}'"]`);
    buttons.forEach(btn => {
      const icon = btn.querySelector("i");
      if (isAdded) {
        btn.classList.add("active");
        btn.setAttribute("title", "Remove from wishlist");
        if (icon) {
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
        }
      } else {
        btn.classList.remove("active");
        btn.setAttribute("title", "Add to wishlist");
        if (icon) {
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");
        }
      }
    });
  },

  // Update navbar wishlist count badge
  updateNavbarCount() {
    if (typeof document === "undefined") return;
    const wishlist = Storage.getWishlist();
    const count = wishlist.length;
    const badges = document.querySelectorAll(".wishlist-count-badge");
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "none";
    });
  }

};

if (typeof window !== "undefined") {
  window.Wishlist = Wishlist;
}
if (typeof global !== "undefined") {
  global.Wishlist = Wishlist;
}

