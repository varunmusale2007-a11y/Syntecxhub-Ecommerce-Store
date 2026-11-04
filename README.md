# ShopSphere – E-Commerce Store Web Application

> **Tagline:** Shop Smart. Shop Easy.  
> **Engineering Track:** Syntecxhub Internship Project 1  
> **Architecture:** Pure Frontend SPA-like Architecture (HTML5, CSS3, Vanilla JavaScript, LocalStorage)

---

## 1. Project Introduction

**ShopSphere** is a modern, responsive, commercial-grade E-Commerce Store Web Application built exclusively using standard web standards: **HTML5**, **CSS3**, and **Vanilla JavaScript** (ES6+). 

Designed to demonstrate production-level UI/UX patterns, state management, and full shopping workflows without reliance on heavy frontend frameworks, third-party build tools, or complex backends. All application state—including 25 curated products, active cart items, wishlist selections, user accounts, order histories, and admin modifications—is persisted locally using browser `LocalStorage`.

---

## 2. Core Features & Capabilities

### 🛍️ Customer Experience
- **Hero & Curated Collections:** Showcase banner, spring promo announcements, category carousels, and live countdown deal timer.
- **Product Catalog (25+ Items):** Spans 5 diverse categories (*Electronics, Fashion, Home & Kitchen, Accessories, Books*) with high-resolution imagery and fallback SVGs.
- **Dynamic Search & Filtering:** Real-time keyword search, category filtering, interactive price range slider ($0 – $300), and "In Stock Only" toggle.
- **Multi-criteria Sorting:** Sort by Featured, Price (Low to High, High to Low), Star Rating, Biggest Discount, and Newest Arrivals.
- **Rich Product Details Page:** Large image display, rating breakdowns, stock availability indicators, quantity pickers, specifications tables, warranty policies, and related product recommendations.
- **Full Shopping Cart:** Real-time quantity adjustments, item removals, dynamic subtotal calculations, and free shipping progress tracker ($50 threshold).
- **Voucher & Coupon System:** Supports valid promotional codes:
  - `SHOPSPHERE10` (10% discount)
  - `SAVE20` (20% discount)
  - `FREESHIP` (Free express delivery)
- **Wishlist Management:** Persistent heart toggle across all product cards and detail views with navbar badge counter.
- **Simulated Multi-Step Checkout:** Customer contact inputs, shipping address validation, and payment method selector (*Card, PayPal, Cash on Delivery*).
- **Order Confirmation & Invoicing:** Immediate order number generation (`ORD-2026-XXXX`), itemized receipt, delivery estimates, and print invoice button.
- **Customer Order Tracking:** View order histories, review line items, and observe simulated delivery lifecycle timelines (*Placed ➔ Processing ➔ Shipped ➔ Delivered*).

### 🛠️ Administrative Dashboard
- **Executive Metric Cards:** Real-time computation of Total Catalog Products, Total Customer Orders, Registered Demo Users, and Gross Revenue.
- **Product Management (CRUD):** Add new products, update existing pricing/stock/details, and delete catalog items with instant reflection across the store.
- **Order Fulfillment Control:** Filter orders by status and update order delivery states live via dropdowns (*Pending, Processing, Shipped, Delivered, Cancelled*).
- **Category Manager:** View collection distribution and dynamically register new store categories.
- **User Directory:** Audit all customer and staff accounts created in the system.
- **Factory Reset Utility:** One-click restoration of initial catalog and demo records.

---

## 3. Technologies Used

- **HTML5:** Semantic markup (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`, `<nav>`), accessible forms, ARIA attributes.
- **CSS3:** Custom CSS variables (Design Tokens), Flexbox, CSS Grid layouts, glassmorphism, responsive media queries, and smooth animations.
- **Vanilla JavaScript (ES6+):** Pure object-oriented modular architecture, event dispatchers (`CustomEvent`), array transformations, and error-handled storage parsing.
- **Browser LocalStorage API:** Client-side persistence simulating database and session layers.
- **Fonts & Typography:** Google Fonts (*Inter* for body and *Plus Jakarta Sans* for headings).
- **Icons:** Font Awesome 6 CDN with vector SVG fallbacks.

---

## 4. Project Folder Structure

```
ShopSphere/
│
├── index.html              # Home page with hero, categories, featured & bestsellers
├── shop.html               # Shop catalog with filters, price slider & sorting
├── product.html            # Product detail view, specifications tabs & related items
├── login.html              # Customer authentication login screen with demo quick-fill
├── register.html           # Customer registration form with client-side validation
├── cart.html               # Shopping cart with coupon vouchers and shipping meter
├── checkout.html           # Simulated checkout with customer & payment details
├── confirmation.html       # Order confirmation receipt and printable invoice
├── orders.html             # Customer order history and visual tracking timeline
├── admin-login.html        # Separate administrative access portal
├── admin.html              # Admin dashboard (CRUD products, orders, categories, stats)
│
├── css/
│   ├── style.css           # Global tokens, typography, navbar, footer, buttons & toasts
│   ├── home.css            # Hero section, feature pills, promo banner & testimonials
│   ├── shop.css            # Shop layout, sidebar filters, catalog toolbar & grid
│   ├── product.css         # Gallery, stock indicators, specs table & tabs
│   ├── auth.css            # Authentication cards, form groups & credentials pills
│   ├── cart.css            # Cart table, quantity pickers & order summary sidebar
│   ├── checkout.css        # Multi-step checkout, payment tabs & order tracking modal
│   ├── admin.css           # Admin sidebar, metric cards, data tables & CRUD modals
│   └── responsive.css      # Universal mobile, tablet & desktop media queries
│
├── js/
│   ├── data.js             # Initial 25 products, categories, demo users, orders & coupons
│   ├── storage.js          # Centralized LocalStorage wrapper & reactive state handlers
│   ├── auth.js             # Client session management & permission guards
│   ├── products.js         # Product card renderer, filtering & sorting routines
│   ├── cart.js             # Shopping cart logic, coupon discounts & subtotal formulas
│   ├── wishlist.js         # Wishlist toggles and badge synchronizers
│   ├── checkout.js         # Checkout input validation & simulated transaction latency
│   ├── orders.js           # Order history renderers & modal timeline visualizer
│   ├── admin.js            # Admin analytics calculations & catalog CRUD controllers
│   └── main.js             # Global navbar sync, toast notifications, search & mobile drawer
│
├── assets/
│   ├── images/             # Product and promotional image assets
│   └── icons/              # SVG brand icons & favicon.svg
│
└── README.md               # Complete engineering documentation
```

---

## 5. How to Run the Project Locally

No `npm install`, Node.js server, build scripts, or external dependencies are required.

### Method 1: Direct Browser Launch (Simplest)
1. Download or clone this repository to your computer.
2. Double-click `index.html` (or right-click ➔ **Open with** ➔ Chrome / Firefox / Edge / Safari).
3. The store will load immediately with all sample products and functional features.

### Method 2: Using VS Code Live Server
1. Open the project folder in Visual Studio Code.
2. Right-click `index.html` and click **"Open with Live Server"**.
3. The browser will open `http://127.0.0.1:5500/index.html`.

### Method 3: Using Python Static Server (Optional)
Open a terminal in the project directory and run:
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 6. How to Deploy on GitHub Pages

This project is 100% compatible with GitHub Pages because it uses relative URLs, root-level `index.html`, and zero build dependencies:

1. **Create a Git Repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Complete ShopSphere E-Commerce Application"
   ```
2. **Push to GitHub:**
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/shopsphere.git
   git push -u origin main
   ```
3. **Enable GitHub Pages:**
   - In your GitHub repository, navigate to **Settings** ➔ **Pages** (under Code and automation).
   - Under **Build and deployment** ➔ **Source**, select **"Deploy from a branch"**.
   - Under **Branch**, select `main` and folder `/ (root)`.
   - Click **Save**.
4. **Access Live URL:**
   - Within 1–2 minutes, your live site will be accessible at:  
     `https://<your-username>.github.io/shopsphere/`

---

## 7. Demo Accounts & Testing Credentials

For quick evaluation, one-click quick-fill buttons are provided on both login pages.

### 👤 Customer Account
- **Email:** `john@example.com`
- **Password:** `password123`
- **Role:** Customer (Pre-loaded with sample delivery orders and purchase receipts)

### 🛡️ Administrator Account
- **Portal URL:** `admin-login.html` (or through the Admin button in footer)
- **Email:** `admin@shopsphere.com`
- **Password:** `admin123`
- **Role:** Administrator (Full privileges to add/edit/delete products and update order states)

### 🎟️ Promotional Voucher Codes
| Voucher Code | Discount Description | Minimum Order |
|---|---|---|
| `SHOPSPHERE10` | 10% Off Entire Order | None |
| `SAVE20` | 20% Off Spring Savings Event | None |
| `FREESHIP` | 100% Free Express Delivery | None |

---

## 8. LocalStorage Data Schema & Lifecycle

When `index.html` (or any page) loads for the first time, `Storage.init()` verifies whether data exists. If empty, it seeds initial records into the following keys:

- `shopsphere_products`: Array of product objects (`id`, `name`, `category`, `price`, `originalPrice`, `discount`, `stock`, `rating`, `reviewsCount`, `image`, `specs`, `featured`, `bestSeller`).
- `shopsphere_categories`: Array of active categories and metadata.
- `shopsphere_users`: Registered accounts array.
- `shopsphere_current_user`: Currently authenticated session object (`null` if guest).
- `shopsphere_cart`: Active cart items array (`productId`, `quantity`, `price`, `name`, `image`).
- `shopsphere_wishlist`: Array of saved product IDs.
- `shopsphere_orders`: Completed orders collection (`id`, `items`, `subtotal`, `shipping`, `discount`, `total`, `status`, `shippingAddress`, `paymentMethod`).
- `shopsphere_applied_coupon`: Currently active voucher discount.

> **Resetting Data:** If you modify or delete products in the admin panel and wish to return to factory seed data, click **"Reset Seed Data"** in the Admin sidebar or call `Storage.resetAllData()` from the browser console.

---

## 9. Security Notice & Educational Scope

This application implements **frontend demonstration authentication**:
- User sessions and roles are tracked client-side via `LocalStorage`.
- Passwords are not salted/hashed on a remote server.
- Payment inputs are simulated; no sensitive cardholder or financial data is ever transmitted or collected.

**Why this structure is optimal for an internship project:**
The codebase explicitly separates business logic, state storage, and view rendering. In a commercial production stack, replacing the `Storage` module's methods with `fetch()` calls to a Node.js/Go backend requires changing only the data retrieval layer without rewriting the UI or component structure.

---

## 10. Future Backend Integration Roadmap

When evolving ShopSphere into a full-stack commercial production platform:
1. **RESTful API / GraphQL:** Replace `Storage.getProducts()` with `GET /api/v1/products`.
2. **Secure Authentication:** Implement JSON Web Tokens (JWT) stored in HTTP-only, secure, `SameSite` cookies with bcrypt password hashing.
3. **Database Integration:** Connect to PostgreSQL or MongoDB via Prisma / Mongoose for relational order management.
4. **Payment Gateway:** Integrate Stripe Elements or PayPal SDK for real webhooks and PCI-compliant transaction processing.
5. **Image Hosting:** Integrate AWS S3 or Cloudinary for direct product image uploads.

---

## 11. Final Quality Verification Checklist

- [x] All 11 HTML pages exist and load cleanly without 404s.
- [x] All relative CSS and JavaScript paths resolve correctly.
- [x] Cross-page navigation and active navbar state verified.
- [x] Registration validates passwords and blocks duplicate emails.
- [x] Customer login and role-guarded admin login function seamlessly.
- [x] Product search, category filters, and price range sliders function live.
- [x] Add to cart, quantity updates, coupon calculation, and removals work.
- [x] Simulated checkout creates verified order records and empties cart.
- [x] Order history renders tracking status and detailed receipt modal.
- [x] Admin dashboard creates, updates, and deletes products in real-time.
- [x] Mobile hamburger navigation and full responsive layouts tested.
- [x] Zero JavaScript console errors.

---
*Built with craftsmanship for the Syntecxhub Internship Program.*

