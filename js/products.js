/**
 * ShopSphere - Products Rendering & Catalog Logic
 */

const Products = {
  // Render a standard product card HTML string
  createCardHTML(product) {
    const inWishlist = Storage.isInWishlist(product.id);
    const discountBadge = product.discount > 0 
      ? `<span class="badge badge-discount">-${product.discount}%</span>` 
      : "";
    const bestSellerBadge = product.bestSeller 
      ? `<span class="badge badge-bestseller">Best Seller</span>` 
      : "";
    const featuredBadge = product.featured && !product.bestSeller 
      ? `<span class="badge badge-featured">Featured</span>` 
      : "";

    // Generate stars HTML
    const fullStars = Math.floor(product.rating);
    const hasHalf = product.rating % 1 >= 0.4;
    let starsHtml = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsHtml += `<i class="fa-solid fa-star"></i>`;
      } else if (i === fullStars + 1 && hasHalf) {
        starsHtml += `<i class="fa-solid fa-star-half-stroke"></i>`;
      } else {
        starsHtml += `<i class="fa-regular fa-star"></i>`;
      }
    }

    const originalPriceHtml = (product.originalPrice && product.originalPrice > product.price)
      ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`
      : "";

    const isOutOfStock = product.stock <= 0;

    return `
      <div class="product-card" data-product-id="${product.id}" data-category="${product.category}">
        <div class="card-image-wrap">
          <div class="card-badges">
            ${discountBadge}
            ${bestSellerBadge}
            ${featuredBadge}
          </div>
          <button class="wishlist-btn ${inWishlist ? "active" : ""}" 
                  onclick="Wishlist.handleToggle('${product.id}', this, event)" 
                  title="${inWishlist ? "Remove from wishlist" : "Add to wishlist"}"
                  aria-label="Wishlist">
            <i class="${inWishlist ? "fa-solid" : "fa-regular"} fa-heart"></i>
          </button>
          <a href="product.html?id=${product.id}" class="image-link">
            <img src="${product.image}" 
                 alt="${product.name}" 
                 loading="lazy" 
                 onerror="this.onerror=null; this.src=getPlaceholderImage('${product.category}', '${product.name.replace(/'/g, "\\'")}');">
          </a>
        </div>
        
        <div class="card-content">
          <span class="card-category">${product.category}</span>
          <h3 class="card-title">
            <a href="product.html?id=${product.id}" title="${product.name}">${product.name}</a>
          </h3>
          
          <div class="card-rating">
            <div class="stars" title="${product.rating} out of 5 stars">${starsHtml}</div>
            <span class="rating-val">${product.rating.toFixed(1)}</span>
            <span class="rating-count">(${product.reviewsCount})</span>
          </div>
          
          <div class="card-footer-row">
            <div class="price-wrap">
              <span class="current-price">$${product.price.toFixed(2)}</span>
              ${originalPriceHtml}
            </div>
            
            <button class="btn btn-add-cart ${isOutOfStock ? "disabled" : ""}" 
                    onclick="Cart.handleAddToCart('${product.id}', 1, event)"
                    ${isOutOfStock ? "disabled" : ""}>
              <i class="fa-solid fa-cart-shopping"></i>
              <span>${isOutOfStock ? "Sold Out" : "Add"}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // Render a list of products to a target container
  renderGrid(products, containerElement, emptyMessage = "No products found matching your criteria.") {
    if (!containerElement) return;

    if (!products || products.length === 0) {
      containerElement.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-box-open"></i></div>
          <h3>No Products Found</h3>
          <p>${emptyMessage}</p>
          <button class="btn btn-primary" onclick="ShopPage.resetFilters()">Clear All Filters</button>
        </div>
      `;
      return;
    }

    containerElement.innerHTML = products.map(p => this.createCardHTML(p)).join("");
  },

  // Filter products by criteria
  filterProducts(products, { category = "all", minPrice = 0, maxPrice = Infinity, search = "", inStockOnly = false }) {
    return products.filter(p => {
      // Category match
      if (category && category !== "all" && p.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }

      // Price match
      if (p.price < minPrice || p.price > maxPrice) {
        return false;
      }

      // Stock match
      if (inStockOnly && p.stock <= 0) {
        return false;
      }

      // Search match
      if (search && search.trim() !== "") {
        const query = search.trim().toLowerCase();
        const inName = p.name.toLowerCase().includes(query);
        const inCat = p.category.toLowerCase().includes(query);
        const inDesc = p.description.toLowerCase().includes(query);
        if (!inName && !inCat && !inDesc) {
          return false;
        }
      }

      return true;
    });
  },

  // Sort products
  sortProducts(products, sortBy = "featured") {
    const list = [...products];

    switch (sortBy) {
      case "price-asc":
      case "price-low":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
      case "price-high":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
      case "popularity":
        return list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
      case "newest":
        return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      case "discount":
        return list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      case "name-az":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "name-za":
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case "featured":
      default:
        return list.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.bestSeller && !b.bestSeller) return -1;
          if (!a.bestSeller && b.bestSeller) return 1;
          return 0;
        });
    }
  }
};

if (typeof window !== "undefined") {
  window.Products = Products;
}
if (typeof global !== "undefined") {
  global.Products = Products;
}

