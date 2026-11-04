/**
 * ShopSphere - Initial Mock Data
 * Product catalog, categories, demo users, orders and promotions
 */

const INITIAL_CATEGORIES = [
  {
    id: "electronics",
    name: "Electronics",
    icon: "fa-laptop",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Cutting-edge gadgets, audio & computing gear",
    itemCount: 5
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "fa-shirt",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80",
    description: "Modern apparel, streetwear & premium garments",
    itemCount: 5
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    icon: "fa-kitchen-set",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    description: "Cookware, home aesthetics & smart living",
    itemCount: 5
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: "fa-watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "Luxury watches, sunglasses, leather bags & more",
    itemCount: 5
  },
  {
    id: "books",
    name: "Books",
    icon: "fa-book-open",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",
    description: "Bestsellers in tech, design, productivity & fiction",
    itemCount: 5
  }
];

const INITIAL_PRODUCTS = [
  // --- Electronics (5 items) ---
  {
    id: "prod-101",
    name: "AuraSound Pro Wireless ANC Headphones",
    category: "Electronics",
    description: "Premium over-ear noise-cancelling headphones featuring 40mm beryllium drivers, spatial audio, 45-hour battery life, and ultra-plush memory foam cushions for all-day listening comfort.",
    price: 199.99,
    originalPrice: 279.99,
    discount: 28,
    rating: 4.8,
    reviewsCount: 342,
    stock: 24,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    featured: true,
    bestSeller: true,
    createdAt: "2026-01-10",
    specs: {
      "Battery Life": "45 Hours (ANC On)",
      "Connectivity": "Bluetooth 5.3 & 3.5mm Aux",
      "Noise Cancellation": "Active Hybrid ANC (-38dB)",
      "Weight": "250g"
    }
  },
  {
    id: "prod-102",
    name: "Chronos Apex Smartwatch Ultra",
    category: "Electronics",
    description: "Rugged aerospace-grade titanium smartwatch with 1.9-inch AMOLED always-on display, multi-band GPS, comprehensive heart & oxygen monitoring, and 100m water resistance.",
    price: 249.50,
    originalPrice: 329.00,
    discount: 24,
    rating: 4.7,
    reviewsCount: 215,
    stock: 18,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    featured: true,
    bestSeller: false,
    createdAt: "2026-01-15",
    specs: {
      "Display": "1.9\" AMOLED, 1000 nits",
      "Water Resistance": "10 ATM (100m)",
      "Battery": "Up to 14 days normal use",
      "Compatibility": "iOS & Android"
    }
  },
  {
    id: "prod-103",
    name: "Vortex Mech Mechanical Keyboard (RGB)",
    category: "Electronics",
    description: "Hot-swappable 75% wireless mechanical keyboard with lubricated linear yellow switches, sound-dampening silicone gaskets, per-key RGB backlighting, and CNC aluminum frame.",
    price: 129.99,
    originalPrice: 159.99,
    discount: 18,
    rating: 4.9,
    reviewsCount: 189,
    stock: 30,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: true,
    createdAt: "2026-02-01",
    specs: {
      "Layout": "75% Compact (82 Keys)",
      "Switches": "Pre-lubed Gateron Yellow",
      "Connection": "Tri-Mode (Bluetooth, 2.4G, Type-C)",
      "Keycaps": "Double-shot PBT Cherry Profile"
    }
  },
  {
    id: "prod-104",
    name: "Lumix SoundSphere 360 Portable Speaker",
    category: "Electronics",
    description: "Compact IPX7 waterproof Bluetooth speaker delivering room-filling 360-degree omnidirectional sound with deep punchy bass, 20 hours playtime, and customizable ambient LED ring.",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.6,
    reviewsCount: 128,
    stock: 45,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: false,
    createdAt: "2026-02-10",
    specs: {
      "Power Output": "30W Peak Stereo",
      "Battery Life": "20 Hours",
      "Waterproof Rating": "IPX7 Submersible",
      "Features": "PartySync pair up to 50 speakers"
    }
  },
  {
    id: "prod-105",
    name: "OmniView 4K Ultra HD Action Camera",
    category: "Electronics",
    description: "Action camera capturing cinematic 4K video at 60fps, dual color touchscreens, advanced 6-axis electronic image stabilization, voice control, and underwater capability up to 30 meters.",
    price: 169.00,
    originalPrice: 219.00,
    discount: 22,
    rating: 4.5,
    reviewsCount: 94,
    stock: 12,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: false,
    createdAt: "2026-01-20",
    specs: {
      "Video Resolution": "4K @ 60fps / 1080p @ 240fps",
      "Sensor": "20MP Sony Exmor Sensor",
      "Stabilization": "HyperSmooth EIS 4.0",
      "Included": "Mounting kit & 2 Rechargeable Batteries"
    }
  },

  // --- Fashion (5 items) ---
  {
    id: "prod-201",
    name: "Classic Tailored Heritage Wool Blazer",
    category: "Fashion",
    description: "Sophisticated modern tailored blazer crafted from breathable Italian merino wool blend. Features soft structured shoulders, horn buttons, dual vents, and silk-lined inner pockets.",
    price: 189.00,
    originalPrice: 250.00,
    discount: 24,
    rating: 4.9,
    reviewsCount: 147,
    stock: 22,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
    featured: true,
    bestSeller: true,
    createdAt: "2026-01-12",
    specs: {
      "Material": "80% Merino Wool, 20% Silk Blend",
      "Fit": "Modern Slim Fit",
      "Care": "Dry Clean Only",
      "Closure": "Two-Button Single Breasted"
    }
  },
  {
    id: "prod-202",
    name: "Urban Minimalist Denim Jacket",
    category: "Fashion",
    description: "Vintage washed organic denim jacket with contemporary relaxed silhouette, antique brass hardware, welt pockets, and reinforced stitching engineered for lasting durability.",
    price: 89.95,
    originalPrice: 119.95,
    discount: 25,
    rating: 4.7,
    reviewsCount: 184,
    stock: 35,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: false,
    createdAt: "2026-02-05",
    specs: {
      "Material": "100% Organic Cotton Denim (13.5 oz)",
      "Wash": "Stonewash Medium Indigo",
      "Fit": "Relaxed Regular Fit",
      "Origin": "Ethically Crafted in Portugal"
    }
  },
  {
    id: "prod-203",
    name: "EverSoft Organic Pima Cotton Crewneck",
    category: "Fashion",
    description: "Ultra-luxurious heavyweight tee spun from 100% Peruvian long-staple pima cotton. Resistant to pilling, shrinkage, and fading, ensuring a flawless drape wear after wear.",
    price: 34.50,
    originalPrice: 45.00,
    discount: 23,
    rating: 4.8,
    reviewsCount: 420,
    stock: 80,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: true,
    createdAt: "2026-01-08",
    specs: {
      "Fabric": "100% Peruvian Pima Cotton (220 GSM)",
      "Collar": "Ribbed bound crew neckline",
      "Pre-shrunk": "Yes",
      "Care": "Machine wash cold"
    }
  },
  {
    id: "prod-204",
    name: "AeroGlide Minimalist Leather Sneakers",
    category: "Fashion",
    description: "Clean aesthetic low-top sneakers constructed with full-grain calfskin leather, cushioned Ortholite insoles, and lightweight vulcanized rubber soles for effortless elegance.",
    price: 119.00,
    originalPrice: 159.00,
    discount: 25,
    rating: 4.8,
    reviewsCount: 265,
    stock: 28,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80",
    featured: true,
    bestSeller: false,
    createdAt: "2026-01-25",
    specs: {
      "Upper": "Full-grain Italian Nappa Leather",
      "Lining": "Soft Calf Leather",
      "Sole": "Recycled Margom Rubber Outsole",
      "Insole": "Ergonomic Memory Arch Support"
    }
  },
  {
    id: "prod-205",
    name: "BreezeLuxe Linen Button-Down Shirt",
    category: "Fashion",
    description: "Featherlight breathable 100% French flax linen shirt. Pre-washed for exceptional softness, tailored with a relaxed collar and pearl buttons for effortless casual or resort styling.",
    price: 64.00,
    originalPrice: 85.00,
    discount: 24,
    rating: 4.6,
    reviewsCount: 112,
    stock: 40,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: false,
    createdAt: "2026-02-14",
    specs: {
      "Material": "100% Certified French Flax Linen",
      "Pattern": "Solid Sage Green / Pure White",
      "Fit": "Tailored Casual Fit",
      "Buttons": "Natural Mother of Pearl"
    }
  },

  // --- Home & Kitchen (5 items) ---
  {
    id: "prod-301",
    name: "Artisan Barista Gooseneck Pour-Over Kettle",
    category: "Home & Kitchen",
    description: "Precision temperature electric pour-over kettle with counterbalanced handle, angled spout for flawless flow control, built-in brew stopwatch, and sleek LCD base.",
    price: 98.00,
    originalPrice: 130.00,
    discount: 24,
    rating: 4.9,
    reviewsCount: 310,
    stock: 26,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80",
    featured: true,
    bestSeller: true,
    createdAt: "2026-01-18",
    specs: {
      "Capacity": "0.9 Liters (30 oz)",
      "Power": "1200W Rapid Heating",
      "Material": "304 Food-Grade Stainless Steel",
      "Temp Control": "104°F to 212°F with 1-degree precision"
    }
  },
  {
    id: "prod-302",
    name: "CastIron Reserve 5.5-Qt Dutch Oven",
    category: "Home & Kitchen",
    description: "Heirloom-grade enameled cast iron Dutch oven with self-basting lid condensation rings, superior heat retention, and glossy stain-resistant porcelain enamel finish for stovetop to oven cooking.",
    price: 139.99,
    originalPrice: 189.99,
    discount: 26,
    rating: 4.9,
    reviewsCount: 198,
    stock: 15,
    image: "https://images.unsplash.com/photo-1584990347449-3a36db59a35e?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: true,
    createdAt: "2026-01-22",
    specs: {
      "Capacity": "5.5 Quarts",
      "Heat Tolerance": "Oven safe up to 500°F (260°C)",
      "Compatibility": "Gas, Induction, Electric, Ceramic",
      "Weight": "11.8 lbs"
    }
  },
  {
    id: "prod-303",
    name: "PureAura Smart HEPA H13 Air Purifier",
    category: "Home & Kitchen",
    description: "Whisper-quiet air purifier filtering 99.97% of dust, smoke, pet dander, and odors in rooms up to 500 sq ft. Equipped with real-time air quality laser sensors and app connectivity.",
    price: 149.00,
    originalPrice: 199.00,
    discount: 25,
    rating: 4.7,
    reviewsCount: 176,
    stock: 20,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: false,
    createdAt: "2026-02-08",
    specs: {
      "Coverage": "500 sq. ft. in 30 mins",
      "Filter Type": "3-Stage True HEPA H13 + Carbon",
      "Noise Level": "Low as 22dB in Sleep Mode",
      "Smart Controls": "Touchscreen, WiFi & Voice Assistant"
    }
  },
  {
    id: "prod-304",
    name: "Nordic Ceramic Matte Dinnerware 16-Pc Set",
    category: "Home & Kitchen",
    description: "Modern Scandinavian stoneware set featuring handcrafted organic contours, scratch-resistant matte glaze, microwave and dishwasher-safe construction for four complete place settings.",
    price: 119.50,
    originalPrice: 155.00,
    discount: 22,
    rating: 4.8,
    reviewsCount: 142,
    stock: 19,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: false,
    createdAt: "2026-01-30",
    specs: {
      "Pieces": "4 Dinner Plates, 4 Salad Plates, 4 Bowls, 4 Mugs",
      "Material": "High-fired Ceramic Stoneware",
      "Finish": "Matte Charcoal & Warm Cream",
      "Safety": "Lead-Free, Microwave & Dishwasher Safe"
    }
  },
  {
    id: "prod-305",
    name: "Lumina Touch Dimmable Minimalist Desk Lamp",
    category: "Home & Kitchen",
    description: "Sleek architectural desk lamp with aluminum arm, 5 color temperature modes, stepless touch dimming, 10W wireless charging pad on the base, and eye-caring flicker-free illumination.",
    price: 54.99,
    originalPrice: 75.00,
    discount: 26,
    rating: 4.7,
    reviewsCount: 220,
    stock: 38,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: false,
    createdAt: "2026-02-18",
    specs: {
      "Brightness": "800 Lumens Max",
      "Color Temp": "2700K Warm - 6500K Cool White",
      "Charging": "10W Qi Wireless Fast Pad + USB-A port",
      "Adjustability": "180° Folding Arm & Swivel Head"
    }
  },

  // --- Accessories (5 items) ---
  {
    id: "prod-401",
    name: "Vanguard Full-Grain Leather Weekender Duffle",
    category: "Accessories",
    description: "Handcrafted from vegetable-tanned full-grain leather with antique brass hardware, water-resistant canvas lining, dedicated shoe compartment, and padded detachable shoulder strap.",
    price: 219.00,
    originalPrice: 295.00,
    discount: 25,
    rating: 4.9,
    reviewsCount: 204,
    stock: 14,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    featured: true,
    bestSeller: true,
    createdAt: "2026-01-05",
    specs: {
      "Dimensions": "20.5\" L x 11.5\" W x 12\" H (Carry-on Compliant)",
      "Material": "100% Full-grain Colombian Leather",
      "Hardware": "YKK Brass Zippers",
      "Warranty": "Lifetime Craftsmanship Guarantee"
    }
  },
  {
    id: "prod-402",
    name: "Aviator Classic Polarized Titanium Sunglasses",
    category: "Accessories",
    description: "Ultra-lightweight titanium frame sunglasses with scratch-proof polarized nylon lenses delivering 100% UV400 protection, anti-reflective interior coating, and comfortable silicone nose pads.",
    price: 89.00,
    originalPrice: 120.00,
    discount: 25,
    rating: 4.8,
    reviewsCount: 165,
    stock: 40,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: false,
    createdAt: "2026-02-02",
    specs: {
      "Lens": "Polarized Category 3 UV400",
      "Frame": "Aero-Grade Beta Titanium (18g)",
      "Case": "Includes hard leather magnetic case & cloth",
      "Style": "Timeless Teardrop Aviator"
    }
  },
  {
    id: "prod-403",
    name: "Heritage Slim Bifold RFID-Blocking Wallet",
    category: "Accessories",
    description: "Engineered ultra-slim bifold wallet made from soft Italian calfskin leather. Fits up to 10 cards and cash without bulk while safeguarding sensitive data with RFID shielding technology.",
    price: 45.00,
    originalPrice: 60.00,
    discount: 25,
    rating: 4.7,
    reviewsCount: 388,
    stock: 65,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: true,
    createdAt: "2026-01-14",
    specs: {
      "Capacity": "8-10 Cards + Flat Currency Pocket",
      "Security": "RFID Blocking 13.56 MHz Frequency",
      "Dimensions": "4.2\" x 3.1\" x 0.35\"",
      "Leather": "Vegetable-Tanned Italian Vachetta"
    }
  },
  {
    id: "prod-404",
    name: "Nomad Water-Resistant Commuter Backpack",
    category: "Accessories",
    description: "Modern minimalist 22L everyday backpack crafted from recycled Cordura ballistic fabric with padded 16\" laptop sleeve, hidden passport pocket, luggage pass-through, and waterproof zippers.",
    price: 110.00,
    originalPrice: 145.00,
    discount: 24,
    rating: 4.8,
    reviewsCount: 231,
    stock: 32,
    image: "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: false,
    createdAt: "2026-02-12",
    specs: {
      "Volume": "22 Liters",
      "Laptop Fit": "Dedicated fleece sleeve fits up to 16\" MacBook Pro",
      "Fabric": "Weatherproof 1680D Ballistic Nylon",
      "Weight": "2.1 lbs"
    }
  },
  {
    id: "prod-405",
    name: "Elysian Rose Gold Minimalist Chronograph",
    category: "Accessories",
    description: "Understated elegance featuring a 40mm brushed rose gold casing, sapphire crystal glass, genuine leather strap, subtle dual sub-dials, and reliable Japanese Miyota quartz movement.",
    price: 135.00,
    originalPrice: 180.00,
    discount: 25,
    rating: 4.9,
    reviewsCount: 154,
    stock: 16,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
    featured: true,
    bestSeller: false,
    createdAt: "2026-01-28",
    specs: {
      "Case Diameter": "40mm (7.8mm Thickness)",
      "Crystal": "Scratch-Resistant Sapphire Glass",
      "Movement": "Japanese Miyota 3-Hand Chronograph",
      "Water Resistance": "5 ATM (50m Splash Resistant)"
    }
  },

  // --- Books (5 items) ---
  {
    id: "prod-501",
    name: "The Pragmatic Programmer: 20th Anniversary Edition",
    category: "Books",
    description: "The world-renowned guide to software craftsmanship by David Thomas and Andrew Hunt. Essential reading for every aspiring and senior developer striving for code excellence and career longevity.",
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    rating: 5.0,
    reviewsCount: 512,
    stock: 45,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    featured: true,
    bestSeller: true,
    createdAt: "2026-01-02",
    specs: {
      "Authors": "David Thomas, Andrew Hunt",
      "Publisher": "Addison-Wesley Professional",
      "Format": "Hardcover & Acid-Free Paper",
      "Pages": "352 Pages"
    }
  },
  {
    id: "prod-502",
    name: "Clean Code: Handbook of Agile Software Craftsmanship",
    category: "Books",
    description: "Robert C. Martin's landmark book detailing the principles, patterns, and practices of writing clean, maintainable, readable code through hands-on case studies and refactoring examples.",
    price: 42.50,
    originalPrice: 55.00,
    discount: 22,
    rating: 4.9,
    reviewsCount: 467,
    stock: 50,
    image: "https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: true,
    createdAt: "2026-01-06",
    specs: {
      "Author": "Robert C. Martin (Uncle Bob)",
      "Publisher": "Prentice Hall",
      "Format": "Paperback / Quality Print",
      "Pages": "464 Pages"
    }
  },
  {
    id: "prod-503",
    name: "Atomic Habits by James Clear",
    category: "Books",
    description: "The definitive masterclass on building good habits, breaking bad ones, and mastering tiny behaviors that lead to remarkable personal and professional transformations.",
    price: 21.99,
    originalPrice: 28.00,
    discount: 21,
    rating: 4.9,
    reviewsCount: 890,
    stock: 75,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: true,
    createdAt: "2026-01-11",
    specs: {
      "Author": "James Clear",
      "Publisher": "Avery / Penguin Random House",
      "Format": "Collector's Hardcover Edition",
      "Pages": "320 Pages"
    }
  },
  {
    id: "prod-504",
    name: "The Design of Everyday Things by Don Norman",
    category: "Books",
    description: "Even the smartest among us can feel inept trying to open a door or operate a device. Cognitive scientist Don Norman reveals fundamental principles of intuitive human-centered design.",
    price: 24.50,
    originalPrice: 32.00,
    discount: 23,
    rating: 4.8,
    reviewsCount: 312,
    stock: 36,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    featured: false,
    bestSeller: false,
    createdAt: "2026-01-19",
    specs: {
      "Author": "Don Norman",
      "Publisher": "Basic Books (Revised & Expanded)",
      "Format": "Paperback",
      "Pages": "368 Pages"
    }
  },
  {
    id: "prod-505",
    name: "Designing Data-Intensive Applications",
    category: "Books",
    description: "Martin Kleppmann examines the fundamental architectures behind reliable, scalable, and maintainable systems: storage engines, distributed consensus, stream processing, and replication.",
    price: 48.00,
    originalPrice: 62.00,
    discount: 22,
    rating: 5.0,
    reviewsCount: 418,
    stock: 25,
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80",
    featured: true,
    bestSeller: false,
    createdAt: "2026-02-04",
    specs: {
      "Author": "Martin Kleppmann",
      "Publisher": "O'Reilly Media",
      "Format": "Paperback / Illustrated",
      "Pages": "616 Pages"
    }
  }
];

const INITIAL_USERS = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "customer",
    phone: "+1 (555) 234-5678",
    address: {
      street: "742 Evergreen Terrace",
      city: "Springfield",
      state: "Oregon",
      zip: "97477",
      country: "United States"
    },
    createdAt: "2026-01-01"
  },
  {
    id: "user-admin",
    name: "Store Administrator",
    email: "admin@shopsphere.com",
    password: "admin123",
    role: "admin",
    phone: "+1 (555) 999-0000",
    address: {
      street: "100 Innovation Way, Suite 400",
      city: "San Francisco",
      state: "California",
      zip: "94105",
      country: "United States"
    },
    createdAt: "2026-01-01"
  }
];

const INITIAL_ORDERS = [
  {
    id: "ORD-2026-8941",
    userId: "user-1",
    customerEmail: "john@example.com",
    customerName: "John Doe",
    date: "2026-02-15T14:32:00.000Z",
    items: [
      {
        id: "prod-101",
        name: "AuraSound Pro Wireless ANC Headphones",
        price: 199.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "prod-501",
        name: "The Pragmatic Programmer: 20th Anniversary Edition",
        price: 44.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
      }
    ],
    subtotal: 244.98,
    discountAmount: 24.50,
    shippingCost: 0,
    couponCode: "SHOPSPHERE10",
    total: 220.48,
    status: "Delivered",
    paymentMethod: "Credit Card (Simulated)",
    shippingAddress: {
      fullName: "John Doe",
      street: "742 Evergreen Terrace",
      city: "Springfield",
      state: "Oregon",
      zip: "97477",
      country: "United States"
    }
  },
  {
    id: "ORD-2026-7822",
    userId: "user-1",
    customerEmail: "john@example.com",
    customerName: "John Doe",
    date: "2026-02-28T09:15:00.000Z",
    items: [
      {
        id: "prod-403",
        name: "Heritage Slim Bifold RFID-Blocking Wallet",
        price: 45.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80"
      }
    ],
    subtotal: 45.00,
    discountAmount: 0,
    shippingCost: 10.00,
    couponCode: "",
    total: 55.00,
    status: "Shipped",
    paymentMethod: "PayPal (Simulated)",
    shippingAddress: {
      fullName: "John Doe",
      street: "742 Evergreen Terrace",
      city: "Springfield",
      state: "Oregon",
      zip: "97477",
      country: "United States"
    }
  }
];

const VALID_COUPONS = {
  "SHOPSPHERE10": { discountPercent: 10, description: "10% Off Entire Order" },
  "SAVE20": { discountPercent: 20, description: "20% Off Spring Savings" },
  "FREESHIP": { freeShipping: true, description: "Complimentary Express Shipping" }
};

// SVG image fallback helper in case any external image fails
function getPlaceholderImage(category, name) {
  const safeName = encodeURIComponent(name || "ShopSphere Product");
  const bgColors = {
    "Electronics": "1e3a8a",
    "Fashion": "3b82f6",
    "Home & Kitchen": "0f766e",
    "Accessories": "7c3aed",
    "Books": "b45309"
  };
  const color = bgColors[category] || "2563eb";
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23${color}"/><circle cx="300" cy="250" r="80" fill="white" opacity="0.2"/><text x="300" y="380" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="white" text-anchor="middle">${safeName}</text><text x="300" y="420" font-family="system-ui, sans-serif" font-size="20" fill="white" opacity="0.8" text-anchor="middle">ShopSphere Premium Catalog</text></svg>`;
}

// Global scope export for cross-script compatibility
if (typeof window !== "undefined") {
  window.INITIAL_CATEGORIES = INITIAL_CATEGORIES;
  window.INITIAL_PRODUCTS = INITIAL_PRODUCTS;
  window.INITIAL_USERS = INITIAL_USERS;
  window.INITIAL_ORDERS = INITIAL_ORDERS;
  window.VALID_COUPONS = VALID_COUPONS;
  window.getPlaceholderImage = getPlaceholderImage;
}
if (typeof global !== "undefined") {
  global.INITIAL_CATEGORIES = INITIAL_CATEGORIES;
  global.INITIAL_PRODUCTS = INITIAL_PRODUCTS;
  global.INITIAL_USERS = INITIAL_USERS;
  global.INITIAL_ORDERS = INITIAL_ORDERS;
  global.VALID_COUPONS = VALID_COUPONS;
  global.getPlaceholderImage = getPlaceholderImage;
}

