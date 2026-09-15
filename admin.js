/**
 * PowerX Protein Hub - Admin Dashboard & Management System
 * Core State Engine & Business Logic
 */

// Storage Keys
const STORAGE_KEYS = {
  PRODUCTS: 'POWERX_PRODUCTS_STORAGE',
  CATEGORIES: 'POWERX_CATEGORIES_STORAGE',
  BANNERS: 'POWERX_BANNERS_STORAGE',
  ORDERS: 'POWERX_ORDERS_STORAGE',
  COUPONS: 'POWERX_COUPONS_STORAGE',
  SETTINGS: 'POWERX_SETTINGS_STORAGE',
  CUSTOMERS: 'POWERX_CUSTOMERS_STORAGE',
  COMBOS: 'POWERX_COMBOS_STORAGE'
};

// Default Banners Seed Data
const DEFAULT_BANNERS = {
  desktopBanner: 'assets/laptop banner.png',
  mobileBanner: 'assets/banner image.png'
};

// Default Categories Seed Data
const DEFAULT_CATEGORIES = {
  performance: [
    { name: 'Pea & Plant Protein', filter: 'proteins', img: 'assets/brands/nutrabay_plant_protein_tub.png' },
    { name: 'Whey Protein', filter: 'proteins', img: 'assets/brands/variant-28977-featured_image-Nakpro_Gold_100_Whey_Protein_Concentrate_Supplement_Powder__1kg_double_rich_chocolate_clean.png' },
    { name: 'Yeast Protein', filter: 'proteins', img: 'assets/brands/thumbnail_image-NB-SYU-1002-01-1500x1500_clean.png' },
    { name: 'Creatine', filter: 'creatine', img: 'assets/brands/thumbnail_image-NB-BGM-1067-02-1500x1500_clean.png' },
    { name: 'Pre Workout', filter: 'pre-workout', img: 'assets/brands/variant-30190-featured_image-Redcon1_Total_War_PreWorkout__Blueberry_Lemonade_60_Servings_clean.png' },
    { name: 'Mass & Weight Gainer', filter: 'gainers', img: 'assets/nutrabay/variant-421-featured_image-Kevin_Levrone_Anabolic_Mass_Gainer__698_Kg_154_Lb_Chocolate_transparent.png' },
    { name: 'L Carnitine', filter: 'l-carnitine', img: 'assets/brands/thumbnail_image-NB-FUP-1033-02-1785407425-200x200_clean.png' },
    { name: 'BCAA', filter: 'aminos', img: 'assets/brands/MuscleTech-1766991505_clean.png' }
  ],
  vitamins: [
    { name: 'Fish Oil', filter: 'fish-oil', img: 'assets/brands/variant-30462-featured_image-Optimum_Nutrition_ON_Fish_Oil__60_Softgels_clean.png' },
    { name: 'Multivitamins', filter: 'multivitamins', img: 'assets/brands/variant-29687-featured_image-Optimum_Nutrition_ON_Multivitamin_for_Men__60_Tabs_clean.png' },
    { name: 'Magnesium Glycinate', filter: 'magnesium', img: 'assets/nutrabay/variant-29035-featured_image-HealthAid_Magnesium_Glycinate_with_Zinc__60_Tabs_transparent.png' },
    { name: 'Single Vitamins', filter: 'multivitamins', img: 'assets/brands/Single-Vitamins-1767085085.webp' },
    { name: 'Shilajit', filter: 'shilajit', img: 'assets/nutrabay/variant-22971-featured_image-Upakarma_Ayurveda_Pure_Shilajit_Resin_Form_with_Ashwagandha__20_gm_004_Lb_transparent.png' },
    { name: 'Collagen', filter: 'multivitamins', img: 'assets/brands/Supplements-for-Skin-&-Hair-1767085085.webp' },
    { name: 'Ashwagandha', filter: 'ashwagandha', img: 'assets/brands/variant-30428-featured_image-Kapiva_Ashwagandha_Gold__60_Caps_clean.png' },
    { name: 'Pre & Probiotics', filter: 'multivitamins', img: 'assets/brands/Pre-&-Probiotic-1-1779255946.webp' }
  ],
  healthFood: [
    { name: 'Protein Oats', filter: 'oats', img: 'assets/brands/mb_high_protein_oats.png' },
    { name: 'Peanut Butter', filter: 'peanut-butter', img: 'assets/brands/variant-6717-featured_image-MyFitness_Chocolate_Peanut_Butter_Crunchy__25_Kg_55_Lb_clean.png' },
    { name: 'Apple Cider Vinegar', filter: 'oats', img: 'assets/nutrabay/Apple-Cidar-Vinegar-1767085203_transparent.png' },
    { name: 'Protein Bars', filter: 'bars', img: 'assets/brands/variant-6276-featured_image-CaliBar_10g_Protein_Bar__Berry_Almond_Choco_Blueberry__Roasted_Coffee_Bean_6_Bars_clean.png' }
  ]
};

// Default Products Seed Data
const DEFAULT_PRODUCTS = [
  {
    id: 'on-gold-standard-whey',
    title: 'Optimum Nutrition (ON) Gold Standard 100% Whey Protein',
    category: 'proteins',
    rating: 4.8,
    reviewsCount: 14280,
    isVeg: true,
    badgeText: '15% OFF',
    isBestseller: true,
    stock: 45,
    image: 'assets/brands/variant-28977-featured_image-Nakpro_Gold_100_Whey_Protein_Concentrate_Supplement_Powder__1kg_double_rich_chocolate_clean.png',
    variants: [
      { weight: '2 lb (907 g), Double Rich Chocolate', price: 3499, mrp: 3999, unitPrice: '₹385 / 100 g' },
      { weight: '5 lb (2.27 kg), Double Rich Chocolate', price: 7499, mrp: 8699, unitPrice: '₹330 / 100 g' },
      { weight: '5 lb (2.27 kg), Vanilla Ice Cream', price: 7499, mrp: 8699, unitPrice: '₹330 / 100 g' }
    ],
    nutrition: { protein: '24g', bcaa: '5.5g', eaa: '11.7g', carbs: '3g', scoops: '29 Servings' },
    description: "The world's #1 selling whey protein isolate powder. Fast-absorbing whey peptides and microfiltered whey protein isolate for lean muscle synthesis."
  },
  {
    id: 'mb-biozyme-whey',
    title: 'MuscleBlaze Biozyme Performance Whey (Patented EAF Formula)',
    category: 'proteins',
    rating: 4.7,
    reviewsCount: 8940,
    isVeg: true,
    badgeText: '18% OFF',
    isBestseller: true,
    stock: 32,
    image: 'assets/nutrabay/featured_image-NB-MBZ-1073-02-1782465007_transparent.png',
    variants: [
      { weight: '1 kg (2.2 lb), Rich Chocolate', price: 2899, mrp: 3499, unitPrice: '₹290 / 100 g' },
      { weight: '2 kg (4.4 lb), Rich Chocolate', price: 5499, mrp: 6699, unitPrice: '₹275 / 100 g' },
      { weight: '2 kg (4.4 lb), Magical Mango', price: 5499, mrp: 6699, unitPrice: '₹275 / 100 g' }
    ],
    nutrition: { protein: '25g', bcaa: '5.5g', eaa: '11.7g', carbs: '2g', scoops: '33 Servings' },
    description: 'Winner of NutraIngredients-USA Award. Clinically tested Enhanced Absorption Formula (EAF®) delivers 50% higher protein absorption.'
  },
  {
    id: 'nakpro-platinum-whey',
    title: 'Nakpro Platinum 100% Whey Protein Isolate (Zero Carb)',
    category: 'proteins',
    rating: 4.6,
    reviewsCount: 3950,
    isVeg: true,
    badgeText: '25% OFF',
    isBestseller: false,
    stock: 18,
    image: 'assets/brands/thumbnail_image-NB-NAK-1006-39-1753302464-600x600_clean.png',
    variants: [
      { weight: '1 kg (2.2 lb), Chocolate Malai', price: 2199, mrp: 2899, unitPrice: '₹220 / 100 g' },
      { weight: '1 kg (2.2 lb), Unflavored Raw', price: 1999, mrp: 2699, unitPrice: '₹200 / 100 g' },
      { weight: '2 kg (4.4 lb), Chocolate Malai', price: 4199, mrp: 5499, unitPrice: '₹210 / 100 g' }
    ],
    nutrition: { protein: '28g', bcaa: '6.4g', eaa: '13.2g', carbs: '0.5g', scoops: '33 Servings' },
    description: 'Ultra-pure cross-flow cold-microfiltered whey isolate from the USA. Low lactose, instantized for clump-free mixing.'
  },
  {
    id: 'muscletech-nitrotech',
    title: 'MuscleTech Nitro-Tech Performance Series 100% Whey Gold',
    category: 'proteins',
    rating: 4.7,
    reviewsCount: 5210,
    isVeg: true,
    badgeText: '20% OFF',
    isBestseller: false,
    stock: 24,
    image: 'assets/brands/MuscleTech-1766991505_clean.png',
    variants: [
      { weight: '4.4 lb (2 kg), Milk Chocolate', price: 5899, mrp: 7299, unitPrice: '₹295 / 100 g' },
      { weight: '2.2 lb (1 kg), Double Chocolate', price: 3199, mrp: 3899, unitPrice: '₹320 / 100 g' }
    ],
    nutrition: { protein: '30g', bcaa: '6.8g', creatine: '3g', carbs: '3g', scoops: '44 Servings' },
    description: 'Scientifically engineered whey + isolate formula enhanced with 3g of creatine monohydrate for superior strength and lean muscle growth.'
  },
  {
    id: 'mb-creatine-creamp',
    title: 'MuscleBlaze Creatine Monohydrate (CreAMP™ Micronized 200 Mesh)',
    category: 'creatine',
    rating: 4.8,
    reviewsCount: 9420,
    isVeg: true,
    badgeText: '30% OFF',
    isBestseller: true,
    stock: 50,
    image: 'assets/brands/thumbnail_image-NB-BGM-1067-02-1500x1500_clean.png',
    variants: [
      { weight: '250 g, Unflavored (83 Servings)', price: 749, mrp: 1099, unitPrice: '₹300 / 100 g' },
      { weight: '100 g, Unflavored (33 Servings)', price: 399, mrp: 549, unitPrice: '₹399 / 100 g' }
    ],
    nutrition: { creatine: '3000mg', meshSize: '200 Mesh Ultra-Fine', calories: '0 kcal' },
    description: 'Micro-refined pharmaceutical grade creatine for explosive power, accelerated ATP recovery, and increased intracellular volume.'
  },
  {
    id: 'pintola-high-protein-pb',
    title: 'Pintola All-Natural High Protein Peanut Butter (Dark Chocolate Crisp)',
    category: 'health_food',
    rating: 4.8,
    reviewsCount: 11200,
    isVeg: true,
    badgeText: '18% OFF',
    isBestseller: true,
    stock: 65,
    image: 'assets/brands/Pintola-1766991505_clean.png',
    variants: [
      { weight: '1 kg, Crunchy Dark Chocolate', price: 449, mrp: 549, unitPrice: '₹45 / 100 g' },
      { weight: '510 g, Crunchy Dark Chocolate', price: 279, mrp: 349, unitPrice: '₹55 / 100 g' }
    ],
    nutrition: { protein: '30g', dietaryFiber: '6g', healthyFats: '48g', scoops: '31 Servings' },
    description: 'Premium roasted Gujarat peanuts infused with Belgian dark chocolate and whey protein isolate. 0 Added Sugar.'
  }
];

// Default Realistic Seed Orders
const DEFAULT_ORDERS = [
  {
    id: 'PX-849201',
    customer: {
      name: 'Vikramjit Singh',
      phone: '+91 98201 44521',
      email: 'vikram.fit@gmail.com',
      address: 'Flat 402, Royal Palms, Boisar West, Palghar 401501'
    },
    items: [
      {
        id: 'on-gold-standard-whey',
        title: 'Optimum Nutrition (ON) Gold Standard 100% Whey Protein',
        variant: '5 lb (2.27 kg), Double Rich Chocolate',
        price: 7499,
        qty: 1,
        image: 'assets/brands/Optimum_1-1767086019_clean.png'
      },
      {
        id: 'mb-creatine-creamp',
        title: 'MuscleBlaze Creatine Monohydrate',
        variant: '250 g, Unflavored',
        price: 749,
        qty: 1,
        image: 'assets/brands/thumbnail_image-NB-BGM-1067-02-1500x1500_clean.png'
      }
    ],
    subtotal: 8248,
    discount: 412,
    coupon: 'POWERX5',
    total: 7836,
    paymentMethod: 'UPI (GPay)',
    paymentStatus: 'Paid',
    status: 'Shipped',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'PX-772190',
    customer: {
      name: 'Rohan Sharma',
      phone: '+91 98112 33499',
      email: 'rohan.sharma99@outlook.com',
      address: 'Tower B, Lodha Park, Worli, Mumbai 400018'
    },
    items: [
      {
        id: 'mb-biozyme-whey',
        title: 'MuscleBlaze Biozyme Performance Whey',
        variant: '2 kg (4.4 lb), Rich Chocolate',
        price: 5499,
        qty: 1,
        image: 'assets/nutrabay/featured_image-NB-MBZ-1073-02-1782465007_transparent.png'
      }
    ],
    subtotal: 5499,
    discount: 0,
    coupon: '',
    total: 5499,
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Pending',
    status: 'Processing',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'PX-654812',
    customer: {
      name: 'Pooja Verma',
      phone: '+91 97654 88120',
      email: 'pooja.verma@gmail.com',
      address: 'B-12, Sector 15, Vashi, Navi Mumbai 400703'
    },
    items: [
      {
        id: 'pintola-high-protein-pb',
        title: 'Pintola All-Natural High Protein Peanut Butter',
        variant: '1 kg, Crunchy Dark Chocolate',
        price: 449,
        qty: 2,
        image: 'assets/brands/Pintola-1766991505_clean.png'
      }
    ],
    subtotal: 898,
    discount: 45,
    coupon: 'POWERX5',
    total: 853,
    paymentMethod: 'Credit Card (Visa)',
    paymentStatus: 'Paid',
    status: 'Delivered',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: 'PX-519024',
    customer: {
      name: 'Aditya Deshmukh',
      phone: '+91 99234 11092',
      email: 'aditya.desh@gymfreak.in',
      address: 'Plot 88, Kothrud, Pune 411038'
    },
    items: [
      {
        id: 'muscletech-nitrotech',
        title: 'MuscleTech Nitro-Tech Performance Series 100% Whey Gold',
        variant: '4.4 lb (2 kg), Milk Chocolate',
        price: 5899,
        qty: 1,
        image: 'assets/brands/MuscleTech-1766991505_clean.png'
      }
    ],
    subtotal: 5899,
    discount: 500,
    coupon: 'BULK500',
    total: 5399,
    paymentMethod: 'UPI (PhonePe)',
    paymentStatus: 'Paid',
    status: 'Delivered',
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString()
  }
];

// Default Coupons Seed Data
const DEFAULT_COUPONS = [
  { code: 'POWERX5', type: 'percent', value: 5, minOrder: 500, description: 'Flat 5% OFF on all orders', active: true, usageCount: 42 },
  { code: 'BEAST10', type: 'percent', value: 10, minOrder: 2000, description: 'Flat 10% OFF above ₹2,000', active: true, usageCount: 28 },
  { code: 'BULK500', type: 'flat', value: 500, minOrder: 5000, description: 'Flat ₹500 OFF on premium stacks above ₹5,000', active: true, usageCount: 15 },
  { code: 'BOISARFREE', type: 'flat', value: 100, minOrder: 0, description: 'Free Express Shipping in Boisar', active: true, usageCount: 65 }
];

// Default Settings
const DEFAULT_SETTINGS = {
  storeName: 'PowerX Protein Hub',
  storeTagline: "India's Most Authentic Sports Nutrition & Health Supplements",
  announcementText: 'VOLCANIC NUTRITION SALE IS LIVE!',
  promoDiscountHeadline: 'Flat 60% OFF + Extra 5% with code',
  promoCouponCode: 'POWERX5',
  contactPhone: '+91 98765 43210',
  contactEmail: 'support@powerxprotein.com',
  freeShippingThreshold: 999,
  gstNumber: '27AABCP1234F1Z8',
  storeAddress: 'Shop 14, PowerX Fitness Hub, Station Road, Boisar, Maharashtra 401501'
};

// Admin State
const AdminState = {
  products: [],
  categories: {},
  banners: {},
  orders: [],
  coupons: [],
  settings: {},
  currentTab: 'dashboard',
  selectedOrder: null,
  editingProductId: null,
  orderFilterStatus: 'all',
  productFilterCategory: 'all',
  categoryGroupFilter: 'all',
  searchQuery: '',
  currentProductImage: '',
  currentCatImage: ''
};

// ==========================================================================
// CRYPTOGRAPHIC ZERO-PLAINTEXT SECURITY (SHA-256 Protected)
// ==========================================================================
// Password is NEVER stored in plaintext. Only the irreversible SHA-256 hash is verified.
const ADMIN_MASTER_HASH = '71b504a5f14481ec272cab3c3db288652089ca9712ca4744f905c3c348752f73';

async function computeSHA256(text) {
  const enc = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function checkAdminAuth() {
  const isAuth = sessionStorage.getItem('POWERX_ADMIN_AUTHENTICATED') === 'true';
  const lockScreen = document.getElementById('adminLockScreen');
  const layout = document.querySelector('.admin-layout');

  if (isAuth) {
    if (lockScreen) {
      lockScreen.style.display = 'none';
      lockScreen.classList.remove('active');
    }
    if (layout) layout.style.filter = 'none';
  } else {
    if (lockScreen) {
      lockScreen.style.display = 'flex';
      lockScreen.classList.add('active');
      const passInput = document.getElementById('adminPasscode');
      if (passInput) {
        passInput.value = '';
        setTimeout(() => passInput.focus(), 150);
      }
    }
    if (layout) layout.style.filter = 'blur(10px)';
  }
}

async function handleAdminLoginSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('adminPasscode');
  const errorMsg = document.getElementById('lockErrorMsg');
  const btn = document.getElementById('btnUnlockAdmin');
  const entered = input ? input.value : '';

  if (!entered) return;

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Verifying...</span>`;
  }

  try {
    const enteredHash = await computeSHA256(entered);
    if (enteredHash === ADMIN_MASTER_HASH) {
      sessionStorage.setItem('POWERX_ADMIN_AUTHENTICATED', 'true');
      if (errorMsg) errorMsg.style.display = 'none';

      const lockScreen = document.getElementById('adminLockScreen');
      const layout = document.querySelector('.admin-layout');
      if (lockScreen) {
        lockScreen.classList.add('unlocking');
        setTimeout(() => {
          lockScreen.style.display = 'none';
          lockScreen.classList.remove('active', 'unlocking');
        }, 350);
      }
      if (layout) layout.style.filter = 'none';
      showToast('Admin Hub Unlocked. Welcome, Master Admin!');
    } else {
      if (errorMsg) errorMsg.style.display = 'flex';
      if (input) {
        input.classList.add('input-shake');
        setTimeout(() => input.classList.remove('input-shake'), 400);
        input.select();
      }
    }
  } catch (err) {
    console.error('Crypto error:', err);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fa-solid fa-lock-open"></i> <span>Unlock Admin Hub</span>`;
    }
  }
}

function handleAdminLogout() {
  sessionStorage.removeItem('POWERX_ADMIN_AUTHENTICATED');
  checkAdminAuth();
}

function toggleAdminPassVisibility() {
  const input = document.getElementById('adminPasscode');
  const eye = document.getElementById('adminPassEye');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (eye) {
      eye.classList.remove('fa-eye');
      eye.classList.add('fa-eye-slash');
    }
  } else {
    input.type = 'password';
    if (eye) {
      eye.classList.remove('fa-eye-slash');
      eye.classList.add('fa-eye');
    }
  }
}

// ==========================================================================
// LIVE SYNC ENGINE (A to Z Real-Time Across All Tabs & Storefront)
// ==========================================================================
const liveSyncChannel = window.BroadcastChannel ? new BroadcastChannel('powerx_live_sync') : null;

function broadcastLiveSync(action, payload = {}) {
  try {
    if (liveSyncChannel) {
      liveSyncChannel.postMessage({ action, payload, timestamp: Date.now() });
    }
  } catch (e) {}
}

if (liveSyncChannel) {
  liveSyncChannel.onmessage = (event) => {
    const data = event.data;
    if (!data) return;

    if (data.action === 'ORDERS_UPDATED') {
      initStorage();
      updateTopbarMetrics();
      if (AdminState.currentTab === 'orders' || AdminState.currentTab === 'dashboard') {
        renderCurrentTab();
      }
      showToast('⚡ New Order received from Storefront!');
    }
  };
}

// Window Storage Event Listener (Cross-window fallback)
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEYS.ORDERS) {
    initStorage();
    updateTopbarMetrics();
    if (AdminState.currentTab === 'orders' || AdminState.currentTab === 'dashboard') {
      renderCurrentTab();
    }
  }
});

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  checkAdminAuth();
  initStorage();
  setupNavigation();
  setupSearchAndFilters();
  setupImageDropzone();
  setupCatImageDropzone();
  renderCurrentTab();
  updateTopbarMetrics();
});

function initStorage() {
  // Products
  const localProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (localProducts) {
    try {
      AdminState.products = JSON.parse(localProducts);
    } catch(e) {
      AdminState.products = DEFAULT_PRODUCTS;
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    }
  } else {
    AdminState.products = DEFAULT_PRODUCTS;
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
  }

  // Categories
  const localCats = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  if (localCats) {
    try {
      const parsed = JSON.parse(localCats);
      if (parsed && parsed.performance && parsed.vitamins && parsed.healthFood) {
        AdminState.categories = parsed;
      } else {
        AdminState.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
      }
    } catch(e) {
      AdminState.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    }
  } else {
    AdminState.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
  }

  // Homepage Banners
  const localBanners = localStorage.getItem(STORAGE_KEYS.BANNERS);
  if (localBanners) {
    try {
      AdminState.banners = JSON.parse(localBanners);
    } catch(e) {
      AdminState.banners = JSON.parse(JSON.stringify(DEFAULT_BANNERS));
      localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(DEFAULT_BANNERS));
    }
  } else {
    AdminState.banners = JSON.parse(JSON.stringify(DEFAULT_BANNERS));
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(DEFAULT_BANNERS));
  }

  // Orders
  const localOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
  if (localOrders) {
    try {
      AdminState.orders = JSON.parse(localOrders);
    } catch(e) {
      AdminState.orders = DEFAULT_ORDERS;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
    }
  } else {
    AdminState.orders = DEFAULT_ORDERS;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
  }

  // Coupons
  const localCoupons = localStorage.getItem(STORAGE_KEYS.COUPONS);
  if (localCoupons) {
    try {
      AdminState.coupons = JSON.parse(localCoupons);
    } catch(e) {
      AdminState.coupons = DEFAULT_COUPONS;
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(DEFAULT_COUPONS));
    }
  } else {
    AdminState.coupons = DEFAULT_COUPONS;
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(DEFAULT_COUPONS));
  }

  // Settings
  const localSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  if (localSettings) {
    try {
      AdminState.settings = JSON.parse(localSettings);
      if (!AdminState.settings.promoCouponCode) AdminState.settings.promoCouponCode = 'POWERX5';
      if (!AdminState.settings.promoDiscountHeadline) AdminState.settings.promoDiscountHeadline = 'Flat 60% OFF + Extra 5% with code';
      if (!AdminState.settings.announcementText || AdminState.settings.announcementText.includes('Flat')) {
        AdminState.settings.announcementText = 'VOLCANIC NUTRITION SALE IS LIVE!';
      }
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(AdminState.settings));
    } catch(e) {
      AdminState.settings = DEFAULT_SETTINGS;
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }
  } else {
    AdminState.settings = DEFAULT_SETTINGS;
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  }
}

function saveProductsToStorage() {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(AdminState.products));
  broadcastLiveSync('PRODUCTS_UPDATED', AdminState.products);
}

function saveCategoriesToStorage() {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(AdminState.categories));
  broadcastLiveSync('CATEGORIES_UPDATED', AdminState.categories);
}

function saveBannersToStorage() {
  localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(AdminState.banners));
  broadcastLiveSync('BANNERS_UPDATED', AdminState.banners);
}

function saveOrdersToStorage() {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(AdminState.orders));
  broadcastLiveSync('ORDERS_UPDATED', AdminState.orders);
}

function saveCouponsToStorage() {
  localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(AdminState.coupons));
  broadcastLiveSync('COUPONS_UPDATED', AdminState.coupons);
}

function saveSettingsToStorage() {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(AdminState.settings));
  broadcastLiveSync('SETTINGS_UPDATED', AdminState.settings);
}

// ==========================================================================
// NAVIGATION & TABS
// ==========================================================================
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item[data-tab]');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = item.getAttribute('data-tab');
      switchTab(targetTab);
      
      // Auto close mobile sidebar
      closeSidebar();
    });
  });
}

function switchTab(tabId) {
  AdminState.currentTab = tabId;
  
  // Update sidebar active classes
  document.querySelectorAll('.nav-item[data-tab]').forEach(item => {
    if (item.getAttribute('data-tab') === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update tab panes
  document.querySelectorAll('.admin-tab-pane').forEach(pane => {
    if (pane.id === `tab-${tabId}`) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });

  // Update breadcrumb title
  const titles = {
    dashboard: 'Executive Dashboard',
    orders: 'Orders Management',
    products: 'Product Catalog & Inventory',
    categories: 'Category Visuals & Cover Icons',
    banners: 'Homepage Hero & Ad Banners',
    combos: 'Value Combos & Stacks',
    coupons: 'Promotions & Coupons',
    customers: 'Customer Directory',
    settings: 'Store Configuration'
  };
  const pageTitleEl = document.getElementById('currentPageTitle');
  if (pageTitleEl) pageTitleEl.innerText = titles[tabId] || 'Admin Portal';

  renderCurrentTab();
}

function renderCurrentTab() {
  switch (AdminState.currentTab) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'orders':
      renderOrders();
      break;
    case 'products':
      renderProducts();
      break;
    case 'categories':
      renderCategoryManager();
      break;
    case 'banners':
      renderBannerManager();
      break;
    case 'combos':
      renderCombosAdmin();
      break;
    case 'coupons':
      renderCoupons();
      break;
    case 'customers':
      renderCustomers();
      break;
    case 'settings':
      renderSettings();
      break;
  }
  updatePendingOrdersBadge();
}

function updateTopbarMetrics() {
  updatePendingOrdersBadge();
}

function updatePendingOrdersBadge() {
  const pendingCount = AdminState.orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
  const badge = document.getElementById('navOrdersBadge');
  if (badge) {
    badge.innerText = pendingCount;
    badge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

function closeSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  if (sidebar) sidebar.classList.remove('open');
}

// ==========================================================================
// 1. DASHBOARD MODULE
// ==========================================================================
function renderDashboard() {
  // Compute Stats
  const totalRevenue = AdminState.orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
  const totalOrders = AdminState.orders.length;
  const pendingShipments = AdminState.orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
  const totalProducts = AdminState.products.length;
  const lowStockCount = AdminState.products.filter(p => (p.stock !== undefined ? p.stock : 25) < 20).length;
  const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  // Update Stat Elements
  const revenueEl = document.getElementById('dashTotalRevenue');
  const ordersEl = document.getElementById('dashTotalOrders');
  const aovEl = document.getElementById('dashAOV');
  const productsEl = document.getElementById('dashTotalProducts');
  const pendingEl = document.getElementById('dashPendingShipments');
  const lowStockEl = document.getElementById('dashLowStock');

  if (revenueEl) revenueEl.innerText = `₹${totalRevenue.toLocaleString()}`;
  if (ordersEl) ordersEl.innerText = totalOrders.toLocaleString();
  if (aovEl) aovEl.innerText = `₹${aov.toLocaleString()}`;
  if (productsEl) productsEl.innerText = totalProducts.toLocaleString();
  if (pendingEl) pendingEl.innerText = pendingShipments.toLocaleString();
  if (lowStockEl) lowStockEl.innerText = lowStockCount.toLocaleString();

  // Render Sales Trend Visual
  renderSalesChart();

  // Render Category Breakdown
  renderCategoryBreakdown();

  // Render Recent Orders List
  renderDashboardRecentOrders();
}

function renderSalesChart() {
  const chartEl = document.getElementById('dashSalesChart');
  if (!chartEl) return;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [14200, 18500, 24000, 19800, 32000, 48500, 39200];
  const max = Math.max(...data);

  chartEl.innerHTML = days.map((day, idx) => {
    const val = data[idx];
    const pct = Math.round((val / max) * 100);
    return `
      <div class="bar-col">
        <div class="bar-fill" style="height: ${pct}%;" data-tooltip="₹${val.toLocaleString()}"></div>
        <span class="bar-label">${day}</span>
      </div>
    `;
  }).join('');
}

function renderCategoryBreakdown() {
  const catListEl = document.getElementById('dashCategoryProgressList');
  if (!catListEl) return;

  const cats = [
    { name: 'Performance Whey & Proteins', pct: 54, sales: '₹1,42,800', color: 'var(--admin-primary)' },
    { name: 'Creatine & Pre-Workouts', pct: 24, sales: '₹63,200', color: 'var(--admin-accent-blue)' },
    { name: 'Health Foods & Peanut Butter', pct: 14, sales: '₹36,900', color: 'var(--admin-accent-green)' },
    { name: 'Vitamins & Daily Wellness', pct: 8, sales: '₹21,100', color: 'var(--admin-accent-amber)' }
  ];

  catListEl.innerHTML = cats.map(c => `
    <div class="cat-progress-item">
      <div class="cat-progress-header">
        <span>${c.name}</span>
        <span>${c.sales} (${c.pct}%)</span>
      </div>
      <div class="cat-progress-bar-bg">
        <div class="cat-progress-bar-fill" style="width: ${c.pct}%; background: ${c.color};"></div>
      </div>
    </div>
  `).join('');
}

function renderDashboardRecentOrders() {
  const tbody = document.getElementById('dashRecentOrdersTbody');
  if (!tbody) return;

  const recent = [...AdminState.orders].reverse().slice(0, 5);
  if (recent.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px; color:var(--text-dim);">No orders recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = recent.map(o => `
    <tr>
      <td><strong style="color:var(--admin-accent-blue); cursor:pointer;" onclick="openOrderDetails('${o.id}')">${o.id}</strong></td>
      <td>
        <div style="font-weight:700; color:#fff;">${escapeHtml(o.customer.name)}</div>
        <div style="font-size:0.72rem; color:var(--text-dim);">${escapeHtml(o.customer.phone)}</div>
      </td>
      <td>₹${o.total.toLocaleString()}</td>
      <td><span class="status-pill ${o.status.toLowerCase()}">${o.status}</span></td>
      <td>
        <button class="btn-table-action" title="View Order" onclick="openOrderDetails('${o.id}')">
          <i class="fa-solid fa-eye"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// ==========================================================================
// 2. ORDERS MODULE
// ==========================================================================
function renderOrders() {
  const tbody = document.getElementById('ordersTableTbody');
  if (!tbody) return;

  let filtered = [...AdminState.orders];

  // Filter by Status
  if (AdminState.orderFilterStatus !== 'all') {
    filtered = filtered.filter(o => o.status.toLowerCase() === AdminState.orderFilterStatus.toLowerCase());
  }

  // Filter by Search Query
  const q = AdminState.searchQuery.trim().toLowerCase();
  if (q) {
    filtered = filtered.filter(o => 
      o.id.toLowerCase().includes(q) ||
      o.customer.name.toLowerCase().includes(q) ||
      o.customer.phone.toLowerCase().includes(q) ||
      (o.customer.address && o.customer.address.toLowerCase().includes(q))
    );
  }

  // Sort descending by creation date
  filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding: 32px; color:var(--text-dim);">
          <i class="fa-solid fa-box-open" style="font-size:2rem; margin-bottom:8px; display:block;"></i>
          No orders match the current filter or search criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(o => {
    const formattedDate = o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent';
    const itemsSummary = o.items.map(i => `${i.qty}x ${i.title}`).join(', ');

    return `
      <tr>
        <td>
          <strong style="color:var(--admin-accent-blue); cursor:pointer;" onclick="openOrderDetails('${o.id}')">${o.id}</strong>
          <div style="font-size:0.7rem; color:var(--text-dim);">${formattedDate}</div>
        </td>
        <td>
          <div style="font-weight:700; color:#fff;">${escapeHtml(o.customer.name)}</div>
          <div style="font-size:0.72rem; color:var(--text-dim);">${escapeHtml(o.customer.phone)}</div>
        </td>
        <td>
          <div style="max-width:240px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:0.8rem;" title="${escapeHtml(itemsSummary)}">
            ${escapeHtml(itemsSummary)}
          </div>
          <div style="font-size:0.7rem; color:var(--text-dim);">${o.items.length} item(s)</div>
        </td>
        <td>
          <strong style="color:#fff;">₹${o.total.toLocaleString()}</strong>
          <div style="font-size:0.7rem; color:${o.paymentStatus === 'Paid' ? 'var(--admin-accent-green)' : 'var(--admin-accent-amber)'};">${o.paymentMethod || 'Online'} (${o.paymentStatus || 'Pending'})</div>
        </td>
        <td>
          <select class="select-filter" style="font-size:0.75rem; padding:4px 8px;" onchange="updateOrderStatus('${o.id}', this.value)">
            <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
            <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td>
          <div class="action-btn-group">
            <button class="btn-table-action" title="View Details" onclick="openOrderDetails('${o.id}')">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button class="btn-table-action" title="Print Invoice" onclick="printOrderInvoice('${o.id}')">
              <i class="fa-solid fa-print"></i>
            </button>
            <button class="btn-table-action delete" title="Delete Order" onclick="deleteOrder('${o.id}')">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function updateOrderStatus(orderId, newStatus) {
  const order = AdminState.orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = newStatus;
  if (newStatus === 'Delivered') {
    order.paymentStatus = 'Paid';
  }
  saveOrdersToStorage();
  updateTopbarMetrics();
  showAdminToast(`Order ${orderId} updated to ${newStatus}`);
  
  if (AdminState.currentTab === 'orders') renderOrders();
  if (AdminState.currentTab === 'dashboard') renderDashboard();
}

function openOrderDetails(orderId) {
  const order = AdminState.orders.find(o => o.id === orderId);
  if (!order) return;

  AdminState.selectedOrder = order;
  const modal = document.getElementById('orderDetailsModal');
  const body = document.getElementById('orderDetailsModalBody');
  if (!modal || !body) return;

  const formattedDate = order.createdAt ? new Date(order.createdAt).toLocaleString('en-IN') : 'Recent';

  body.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--admin-border);">
      <div>
        <h3 style="font-size:1.25rem; font-weight:800; color:#fff;">Order ${order.id}</h3>
        <p style="font-size:0.78rem; color:var(--text-dim); margin-top:2px;">Placed on ${formattedDate}</p>
      </div>
      <div style="text-align:right;">
        <span class="status-pill ${order.status.toLowerCase()}" style="font-size:0.85rem; padding:6px 14px;">${order.status}</span>
      </div>
    </div>

    <div class="form-grid-2" style="margin-bottom: 20px;">
      <div style="background:var(--admin-surface-card); padding:14px; border-radius:var(--radius-md); border:1px solid var(--admin-border);">
        <h4 style="font-size:0.82rem; font-weight:700; color:var(--text-muted); margin-bottom:8px; text-transform:uppercase;">Customer Details</h4>
        <div style="font-weight:700; color:#fff; font-size:0.95rem;">${escapeHtml(order.customer.name)}</div>
        <div style="font-size:0.82rem; color:var(--text-muted); margin-top:4px;"><i class="fa-solid fa-phone" style="width:16px;"></i> ${escapeHtml(order.customer.phone)}</div>
        ${order.customer.email ? `<div style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;"><i class="fa-solid fa-envelope" style="width:16px;"></i> ${escapeHtml(order.customer.email)}</div>` : ''}
      </div>

      <div style="background:var(--admin-surface-card); padding:14px; border-radius:var(--radius-md); border:1px solid var(--admin-border);">
        <h4 style="font-size:0.82rem; font-weight:700; color:var(--text-muted); margin-bottom:8px; text-transform:uppercase;">Delivery Address</h4>
        <p style="font-size:0.85rem; color:#fff; line-height:1.4;">${escapeHtml(order.customer.address || 'Standard Address')}</p>
        <div style="margin-top:8px; font-size:0.75rem; color:var(--admin-accent-green); font-weight:700;"><i class="fa-solid fa-truck-fast"></i> PowerX Express Dispatch</div>
      </div>
    </div>

    <h4 style="font-size:0.85rem; font-weight:800; color:#fff; margin-bottom:12px; text-transform:uppercase;">Ordered Items (${order.items.length})</h4>
    <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
      ${order.items.map(item => `
        <div style="display:flex; align-items:center; justify-content:space-between; background:var(--admin-surface-card); padding:10px 14px; border-radius:var(--radius-md); border:1px solid var(--admin-border);">
          <div style="display:flex; align-items:center; gap:12px;">
            <img src="${item.image || 'assets/brands/Optimum_1-1767086019_clean.png'}" alt="" style="width:40px; height:40px; object-fit:contain; background:#fff; border-radius:4px; padding:2px;">
            <div>
              <div style="font-weight:700; color:#fff; font-size:0.85rem;">${escapeHtml(item.title)}</div>
              <div style="font-size:0.72rem; color:var(--text-dim);">${escapeHtml(item.variant || 'Standard Pack')} &times; ${item.qty}</div>
            </div>
          </div>
          <div style="font-weight:800; color:#fff; font-size:0.9rem;">
            ₹${((item.price || 0) * (item.qty || 1)).toLocaleString()}
          </div>
        </div>
      `).join('')}
    </div>

    <div style="background:var(--admin-surface-card); padding:16px; border-radius:var(--radius-md); border:1px solid var(--admin-border);">
      <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-muted); margin-bottom:6px;">
        <span>Subtotal:</span>
        <span>₹${(order.subtotal || order.total).toLocaleString()}</span>
      </div>
      ${order.discount ? `
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--admin-primary); margin-bottom:6px;">
          <span>Coupon Discount (${order.coupon}):</span>
          <span>- ₹${order.discount.toLocaleString()}</span>
        </div>
      ` : ''}
      <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-muted); margin-bottom:8px;">
        <span>Shipping:</span>
        <span style="color:var(--admin-accent-green); font-weight:700;">FREE</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:1.1rem; font-weight:800; color:#fff; padding-top:8px; border-top:1px solid var(--admin-border);">
        <span>Total Amount:</span>
        <span style="color:var(--admin-primary);">₹${order.total.toLocaleString()}</span>
      </div>
    </div>
  `;

  modal.classList.add('show');
}

function closeOrderDetailsModal() {
  const modal = document.getElementById('orderDetailsModal');
  if (modal) modal.classList.remove('show');
}

function deleteOrder(orderId) {
  if (!confirm(`Are you sure you want to delete order ${orderId}? This cannot be undone.`)) return;

  AdminState.orders = AdminState.orders.filter(o => o.id !== orderId);
  saveOrdersToStorage();
  updateTopbarMetrics();
  showAdminToast(`Order ${orderId} deleted.`);
  renderOrders();
  renderDashboard();
}

// Invoice Generator
function printOrderInvoice(orderId) {
  const order = AdminState.orders.find(o => o.id === orderId);
  if (!order) return;

  const invoiceModal = document.getElementById('invoiceModal');
  const invoiceContainer = document.getElementById('invoiceContainer');
  if (!invoiceModal || !invoiceContainer) return;

  const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '01 September 2026';

  invoiceContainer.innerHTML = `
    <div class="invoice-header">
      <div>
        <div class="invoice-brand-title">POWERX PROTEIN HUB</div>
        <div style="font-size:0.8rem; color:#4b5563; margin-top:3px;">100% Blind-Tested Sports Nutrition & Supplements</div>
        <div style="font-size:0.75rem; color:#6b7280; margin-top:2px;">GSTIN: ${AdminState.settings.gstNumber || '27AABCP1234F1Z8'} | Auth Code: PX-IN-${order.id}</div>
      </div>
      <div style="text-align:right;">
        <h2 style="font-size:1.3rem; font-weight:900; color:#111827;">TAX INVOICE</h2>
        <div style="font-size:0.82rem; font-weight:700; color:#E11D48;"># ${order.id}</div>
        <div style="font-size:0.75rem; color:#6b7280;">Date: ${dateStr}</div>
      </div>
    </div>

    <div style="display:flex; justify-content:space-between; margin-bottom:24px; font-size:0.82rem;">
      <div>
        <strong style="color:#111827; text-transform:uppercase;">Billed & Shipped To:</strong>
        <div style="font-weight:700; font-size:0.95rem; margin-top:4px;">${escapeHtml(order.customer.name)}</div>
        <div style="color:#4b5563; max-width:280px; margin-top:2px;">${escapeHtml(order.customer.address || 'Standard Address')}</div>
        <div style="color:#4b5563; margin-top:2px;">Phone: ${escapeHtml(order.customer.phone)}</div>
      </div>
      <div style="text-align:right;">
        <strong style="color:#111827; text-transform:uppercase;">Dispatched From:</strong>
        <div style="color:#4b5563; max-width:260px; margin-top:4px;">${AdminState.settings.storeAddress || 'PowerX Hub, Station Road, Boisar, MH 401501'}</div>
        <div style="color:#4b5563; margin-top:2px;">Payment: <strong>${order.paymentMethod || 'Prepaid'}</strong></div>
      </div>
    </div>

    <table class="invoice-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Item Description</th>
          <th>Variant / Pack</th>
          <th>Qty</th>
          <th>Unit Price</th>
          <th style="text-align:right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${order.items.map((item, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td><strong>${escapeHtml(item.title)}</strong></td>
            <td>${escapeHtml(item.variant || 'Standard')}</td>
            <td>${item.qty}</td>
            <td>₹${item.price.toLocaleString()}</td>
            <td style="text-align:right; font-weight:700;">₹${((item.price || 0) * (item.qty || 1)).toLocaleString()}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div style="display:flex; justify-content:flex-end; margin-top:16px;">
      <div style="width:280px; font-size:0.85rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:#4b5563;">
          <span>Subtotal:</span>
          <span>₹${(order.subtotal || order.total).toLocaleString()}</span>
        </div>
        ${order.discount ? `
          <div style="display:flex; justify-content:space-between; margin-bottom:4px; color:#E11D48;">
            <span>Discount (${order.coupon}):</span>
            <span>- ₹${order.discount.toLocaleString()}</span>
          </div>
        ` : ''}
        <div style="display:flex; justify-content:space-between; margin-bottom:6px; color:#4b5563;">
          <span>GST (18% Included):</span>
          <span>₹${Math.round(order.total * 0.18 / 1.18).toLocaleString()}</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding-top:8px; border-top:2px solid #111827; font-size:1.1rem; font-weight:900; color:#111827;">
          <span>Grand Total:</span>
          <span>₹${order.total.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <div style="margin-top:36px; padding-top:16px; border-top:1px dashed #cbd5e1; text-align:center; font-size:0.75rem; color:#6b7280;">
      Thank you for powering your fitness journey with PowerX Protein Hub! | 100% Genuine Certified
    </div>
  `;

  invoiceModal.classList.add('show');
}

function triggerPrint() {
  window.print();
}

function closeInvoiceModal() {
  const modal = document.getElementById('invoiceModal');
  if (modal) modal.classList.remove('show');
}

// ==========================================================================
// 3. PRODUCT MANAGEMENT MODULE (CRUD)
// ==========================================================================
function renderProducts() {
  const tbody = document.getElementById('productsTableTbody');
  if (!tbody) return;

  let filtered = [...AdminState.products];

  // Category filter
  if (AdminState.productFilterCategory !== 'all') {
    filtered = filtered.filter(p => p.category === AdminState.productFilterCategory);
  }

  // Search query
  const q = AdminState.searchQuery.trim().toLowerCase();
  if (q) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding:32px; color:var(--text-dim);">
          <i class="fa-solid fa-bottle-droplet" style="font-size:2rem; margin-bottom:8px; display:block;"></i>
          No products found. Click "+ Add Product" to add a new supplement to the catalog.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const mainVariant = (p.variants && p.variants[0]) ? p.variants[0] : { price: 0, mrp: 0, weight: 'Standard' };
    const stockQty = p.stock !== undefined ? p.stock : 25;
    const stockClass = stockQty > 20 ? 'in-stock' : (stockQty > 0 ? 'low-stock' : 'out-of-stock');
    const stockLabel = stockQty > 0 ? `${stockQty} in stock` : 'Out of Stock';

    return `
      <tr>
        <td>
          <div class="product-cell">
            <img src="${p.image || 'assets/brands/Optimum_1-1767086019_clean.png'}" alt="" class="product-thumb">
            <div>
              <div class="product-cell-title" title="${escapeHtml(p.title)}">${escapeHtml(p.title)}</div>
              <div class="product-cell-sub">ID: ${p.id} &bull; ${p.variants ? p.variants.length : 1} Variant(s)</div>
            </div>
          </div>
        </td>
        <td>
          <span style="text-transform:capitalize; font-weight:600; color:var(--text-muted);">${p.category}</span>
        </td>
        <td>
          <div style="font-weight:800; color:#fff;">₹${mainVariant.price.toLocaleString()}</div>
          <div style="font-size:0.72rem; color:var(--text-dim); text-decoration:line-through;">₹${mainVariant.mrp.toLocaleString()}</div>
        </td>
        <td>
          <span class="stock-pill ${stockClass}">${stockLabel}</span>
        </td>
        <td>
          <div style="display:flex; align-items:center; gap:4px; font-weight:700; color:#fbbf24;">
            <i class="fa-solid fa-star"></i>
            <span>${p.rating || '4.8'}</span>
            <span style="font-size:0.7rem; color:var(--text-dim);">(${p.reviewsCount || 100})</span>
          </div>
        </td>
        <td>
          ${p.isBestseller ? '<span class="status-pill delivered" style="font-size:0.7rem;"><i class="fa-solid fa-fire"></i> Hot</span>' : '<span style="color:var(--text-dim); font-size:0.75rem;">Standard</span>'}
        </td>
        <td>
          <div class="action-btn-group">
            <button class="btn-table-action" title="Edit Product" onclick="openEditProductModal('${p.id}')">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-table-action delete" title="Delete Product" onclick="deleteProduct('${p.id}')">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ==========================================================================
// DIRECT IMAGE UPLOAD ENGINE
// ==========================================================================
function setupImageDropzone() {
  const dropzone = document.getElementById('imageDropzone');
  if (!dropzone) return;

  ['dragenter', 'dragover'].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('drag-over');
    }, false);
  });

  ['dragleave', 'drop'].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('drag-over');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      processProductImageFile(dt.files[0]);
    }
  }, false);
}

function handleProductImageUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  processProductImageFile(file);
}

function processProductImageFile(file) {
  if (!file.type || !file.type.startsWith('image/')) {
    alert('Please select an image file (PNG, JPG, WEBP).');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const rawDataUrl = e.target.result;
    
    // Auto-compress & scale image to max 800x800 for optimal local storage
    const img = new Image();
    img.onload = () => {
      const maxDim = 800;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // If PNG keep transparent PNG, otherwise WebP
      const isPng = file.type.includes('png');
      const optimizedDataUrl = isPng ? canvas.toDataURL('image/png') : canvas.toDataURL('image/webp', 0.88);

      const sizeKb = Math.round(optimizedDataUrl.length * 0.75 / 1024);
      setProductImagePreview(optimizedDataUrl, file.name, `${width}x${height} px • ${sizeKb} KB (Direct Image)`);
    };
    img.src = rawDataUrl;
  };
  reader.readAsDataURL(file);
}

function setProductImagePreview(imgSrc, name = 'product-image.png', info = 'Direct image loaded') {
  AdminState.currentProductImage = imgSrc;
  const prodImageInput = document.getElementById('prodImage');
  if (prodImageInput) prodImageInput.value = imgSrc.startsWith('data:') ? '' : imgSrc;

  const dropzone = document.getElementById('imageDropzone');
  const previewCard = document.getElementById('imagePreviewCard');
  const previewImg = document.getElementById('imagePreviewImg');
  const previewTitle = document.getElementById('imagePreviewName');
  const previewInfo = document.getElementById('imagePreviewInfo');

  if (previewImg) previewImg.src = imgSrc;
  if (previewTitle) previewTitle.innerText = name;
  if (previewInfo) previewInfo.innerText = info;

  if (dropzone) dropzone.style.display = 'none';
  if (previewCard) previewCard.style.display = 'flex';
}

function removeProductImage() {
  AdminState.currentProductImage = '';
  const fileInput = document.getElementById('prodImageFileInput');
  if (fileInput) fileInput.value = '';
  const prodImageInput = document.getElementById('prodImage');
  if (prodImageInput) prodImageInput.value = '';

  const dropzone = document.getElementById('imageDropzone');
  const previewCard = document.getElementById('imagePreviewCard');
  if (dropzone) dropzone.style.display = 'flex';
  if (previewCard) previewCard.style.display = 'none';
}

function toggleManualUrlInput() {
  const wrapper = document.getElementById('manualUrlWrapper');
  const btn = document.getElementById('toggleUrlBtn');
  if (!wrapper) return;
  const isHidden = wrapper.style.display === 'none';
  wrapper.style.display = isHidden ? 'block' : 'none';
  if (btn) btn.innerText = isHidden ? 'Hide manual path / URL input' : 'Or enter image path / URL manually';
}

function handleManualUrlChange(val) {
  if (val && val.trim()) {
    setProductImagePreview(val.trim(), val.trim().split('/').pop() || 'image.png', 'Path / URL entered');
  }
}

// Add / Edit Product Modal Logic
function openAddProductModal() {
  AdminState.editingProductId = null;
  const modal = document.getElementById('productFormModal');
  const title = document.getElementById('productModalTitle');
  if (title) title.innerText = 'Add New Product to Catalog';

  // Clear Form
  document.getElementById('prodId').value = 'prod-' + Date.now();
  document.getElementById('prodTitle').value = '';
  document.getElementById('prodCategory').value = 'proteins';
  document.getElementById('prodRating').value = '4.8';
  document.getElementById('prodReviews').value = '250';
  document.getElementById('prodBadge').value = '15% OFF';
  document.getElementById('prodStock').value = '35';
  document.getElementById('prodDescription').value = '';
  document.getElementById('prodIsVeg').checked = true;
  document.getElementById('prodIsBestseller').checked = false;

  removeProductImage();

  // Clear Variants container with 1 default variant row
  renderVariantInputs([
    { weight: '1 kg (2.2 lb), Chocolate', price: 2499, mrp: 2999, unitPrice: '₹250 / 100 g' }
  ]);

  modal.classList.add('show');
}

function openEditProductModal(productId) {
  const p = AdminState.products.find(item => item.id === productId);
  if (!p) return;

  AdminState.editingProductId = productId;
  const modal = document.getElementById('productFormModal');
  const title = document.getElementById('productModalTitle');
  if (title) title.innerText = `Edit: ${p.title}`;

  document.getElementById('prodId').value = p.id;
  document.getElementById('prodTitle').value = p.title;
  document.getElementById('prodCategory').value = p.category;
  document.getElementById('prodRating').value = p.rating || 4.8;
  document.getElementById('prodReviews').value = p.reviewsCount || 150;
  document.getElementById('prodBadge').value = p.badgeText || '';
  document.getElementById('prodStock').value = p.stock !== undefined ? p.stock : 25;
  document.getElementById('prodDescription').value = p.description || '';
  document.getElementById('prodIsVeg').checked = p.isVeg !== false;
  document.getElementById('prodIsBestseller').checked = !!p.isBestseller;

  if (p.image) {
    setProductImagePreview(p.image, p.title || 'Product Photo', 'Current product image');
  } else {
    removeProductImage();
  }

  renderVariantInputs(p.variants || [{ weight: 'Standard Pack', price: 999, mrp: 1299, unitPrice: '' }]);

  modal.classList.add('show');
}

function renderVariantInputs(variants) {
  const container = document.getElementById('variantRowsContainer');
  if (!container) return;

  container.innerHTML = variants.map((v, idx) => `
    <div class="variant-row" id="vRow-${idx}">
      <input type="text" class="form-control var-weight" placeholder="Variant (e.g. 2 kg Chocolate)" value="${escapeHtml(v.weight || '')}">
      <input type="number" class="form-control var-price" placeholder="Price (₹)" value="${v.price || ''}">
      <input type="number" class="form-control var-mrp" placeholder="MRP (₹)" value="${v.mrp || ''}">
      <button type="button" class="btn-table-action delete" onclick="removeVariantRow(${idx})" title="Remove Variant">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');
}

function addVariantRow() {
  const container = document.getElementById('variantRowsContainer');
  if (!container) return;
  const idx = container.children.length;
  const div = document.createElement('div');
  div.className = 'variant-row';
  div.id = `vRow-${idx}`;
  div.innerHTML = `
    <input type="text" class="form-control var-weight" placeholder="Variant (e.g. 1 kg Vanilla)">
    <input type="number" class="form-control var-price" placeholder="Price (₹)">
    <input type="number" class="form-control var-mrp" placeholder="MRP (₹)">
    <button type="button" class="btn-table-action delete" onclick="this.parentElement.remove()" title="Remove Variant">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;
  container.appendChild(div);
}

function removeVariantRow(idx) {
  const row = document.getElementById(`vRow-${idx}`);
  if (row) row.remove();
}

function saveProductForm() {
  const id = document.getElementById('prodId').value.trim();
  const title = document.getElementById('prodTitle').value.trim();
  const category = document.getElementById('prodCategory').value;
  const rating = parseFloat(document.getElementById('prodRating').value) || 4.8;
  const reviewsCount = parseInt(document.getElementById('prodReviews').value) || 100;
  const badgeText = document.getElementById('prodBadge').value.trim();
  const stock = parseInt(document.getElementById('prodStock').value) || 20;
  const image = AdminState.currentProductImage || document.getElementById('prodImage').value.trim() || 'assets/brands/variant-28977-featured_image-Nakpro_Gold_100_Whey_Protein_Concentrate_Supplement_Powder__1kg_double_rich_chocolate_clean.png';
  const description = document.getElementById('prodDescription').value.trim();
  const isVeg = document.getElementById('prodIsVeg').checked;
  const isBestseller = document.getElementById('prodIsBestseller').checked;

  if (!title) {
    alert('Please enter a product title.');
    return;
  }

  // Collect Variants
  const variantRows = document.querySelectorAll('#variantRowsContainer .variant-row');
  const variants = [];
  variantRows.forEach(row => {
    const weight = row.querySelector('.var-weight').value.trim();
    const price = parseInt(row.querySelector('.var-price').value) || 0;
    const mrp = parseInt(row.querySelector('.var-mrp').value) || price;
    if (weight && price > 0) {
      variants.push({ weight, price, mrp, unitPrice: `₹${price}` });
    }
  });

  if (variants.length === 0) {
    variants.push({ weight: '1 kg Standard', price: 1999, mrp: 2499, unitPrice: '₹1999' });
  }

  const productObj = {
    id: id || ('prod-' + Date.now()),
    title,
    category,
    rating,
    reviewsCount,
    badgeText,
    stock,
    image,
    description: description || 'Premium certified authentic nutritional supplement.',
    isVeg,
    isBestseller,
    variants,
    nutrition: { protein: '25g', bcaa: '5.5g', scoops: '30 Servings' }
  };

  if (AdminState.editingProductId) {
    const idx = AdminState.products.findIndex(p => p.id === AdminState.editingProductId);
    if (idx !== -1) {
      AdminState.products[idx] = productObj;
    }
    showAdminToast(`Product "${title}" updated successfully!`);
  } else {
    AdminState.products.unshift(productObj);
    showAdminToast(`New product "${title}" added to store!`);
  }

  saveProductsToStorage();
  closeProductFormModal();
  renderProducts();
  renderDashboard();
}

function closeProductFormModal() {
  const modal = document.getElementById('productFormModal');
  if (modal) modal.classList.remove('show');
}

function deleteProduct(productId) {
  const p = AdminState.products.find(item => item.id === productId);
  if (!confirm(`Are you sure you want to delete "${p ? p.title : productId}" from the catalog?`)) return;

  AdminState.products = AdminState.products.filter(item => item.id !== productId);
  saveProductsToStorage();
  showAdminToast('Product deleted from catalog.');
  renderProducts();
  renderDashboard();
}

// ==========================================================================
// 3.5. CATEGORY ICONS & COVER IMAGES MODULE (DIRECT IMAGE UPLOAD)
// ==========================================================================
function setupCatImageDropzone() {
  const dropzone = document.getElementById('catImageDropzone');
  if (!dropzone) return;

  ['dragenter', 'dragover'].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('drag-over');
    }, false);
  });

  ['dragleave', 'drop'].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('drag-over');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      processCatImageFile(dt.files[0]);
    }
  }, false);
}

function renderCategoryManager() {
  const container = document.getElementById('categoryManagerGrid');
  if (!container) return;

  const groups = [
    { key: 'performance', label: 'Performance Nutrition', color: 'var(--admin-primary)', items: AdminState.categories.performance || [] },
    { key: 'vitamins', label: 'Vitamins & Minerals', color: 'var(--admin-accent-blue)', items: AdminState.categories.vitamins || [] },
    { key: 'healthFood', label: 'Health Food', color: 'var(--admin-accent-green)', items: AdminState.categories.healthFood || [] }
  ];

  let html = '';
  groups.forEach(g => {
    if (AdminState.categoryGroupFilter !== 'all' && AdminState.categoryGroupFilter !== g.key) {
      return;
    }

    g.items.forEach((cat, idx) => {
      html += `
        <div class="category-admin-card">
          <div class="cat-admin-thumb-wrap">
            <img src="${cat.img}" alt="${escapeHtml(cat.name)}">
          </div>
          <div class="cat-admin-details">
            <div class="cat-admin-group-tag" style="color:${g.color};">${g.label}</div>
            <div class="cat-admin-name" title="${escapeHtml(cat.name)}">${escapeHtml(cat.name)}</div>
            <button type="button" class="btn-edit-cat-icon" onclick="openEditCategoryModal('${g.key}', ${idx})">
              <i class="fa-solid fa-camera-rotate"></i> Change Icon
            </button>
          </div>
        </div>
      `;
    });
  });

  container.innerHTML = html;
}

function filterCategoryGroup(groupKey) {
  AdminState.categoryGroupFilter = groupKey;
  renderCategoryManager();
}

function openEditCategoryModal(groupKey, index) {
  const group = AdminState.categories[groupKey];
  if (!group || !group[index]) return;

  const cat = group[index];
  document.getElementById('catEditGroup').value = groupKey;
  document.getElementById('catEditIndex').value = index;
  document.getElementById('catEditName').value = cat.name;

  const modalTitle = document.getElementById('categoryModalTitle');
  if (modalTitle) modalTitle.innerText = `Update Icon: ${cat.name}`;

  if (cat.img) {
    setCatImagePreview(cat.img, cat.name, 'Current category icon');
  } else {
    removeCatImage();
  }

  const modal = document.getElementById('categoryFormModal');
  if (modal) modal.classList.add('show');
}

function closeCategoryFormModal() {
  const modal = document.getElementById('categoryFormModal');
  if (modal) modal.classList.remove('show');
}

function handleCatImageUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  processCatImageFile(file);
}

function processCatImageFile(file) {
  if (!file.type || !file.type.startsWith('image/')) {
    alert('Please select an image file (PNG, JPG, WEBP).');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const rawDataUrl = e.target.result;
    
    // Auto-compress & scale icon to max 600x600 for transparent cutout
    const img = new Image();
    img.onload = () => {
      const maxDim = 600;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const isPng = file.type.includes('png');
      const optimizedDataUrl = isPng ? canvas.toDataURL('image/png') : canvas.toDataURL('image/webp', 0.9);

      const sizeKb = Math.round(optimizedDataUrl.length * 0.75 / 1024);
      setCatImagePreview(optimizedDataUrl, file.name, `${width}x${height} px • ${sizeKb} KB (Direct Image)`);
    };
    img.src = rawDataUrl;
  };
  reader.readAsDataURL(file);
}

function setCatImagePreview(imgSrc, name = 'category-icon.png', info = 'Direct image loaded') {
  AdminState.currentCatImage = imgSrc;
  const editUrlInput = document.getElementById('catEditImageUrl');
  if (editUrlInput) editUrlInput.value = imgSrc.startsWith('data:') ? '' : imgSrc;

  const dropzone = document.getElementById('catImageDropzone');
  const previewCard = document.getElementById('catImagePreviewCard');
  const previewImg = document.getElementById('catImagePreviewImg');
  const previewTitle = document.getElementById('catImagePreviewName');
  const previewInfo = document.getElementById('catImagePreviewInfo');

  if (previewImg) previewImg.src = imgSrc;
  if (previewTitle) previewTitle.innerText = name;
  if (previewInfo) previewInfo.innerText = info;

  if (dropzone) dropzone.style.display = 'none';
  if (previewCard) previewCard.style.display = 'flex';
}

function removeCatImage() {
  AdminState.currentCatImage = '';
  const fileInput = document.getElementById('catImageFileInput');
  if (fileInput) fileInput.value = '';
  const urlInput = document.getElementById('catEditImageUrl');
  if (urlInput) urlInput.value = '';

  const dropzone = document.getElementById('catImageDropzone');
  const previewCard = document.getElementById('catImagePreviewCard');
  if (dropzone) dropzone.style.display = 'flex';
  if (previewCard) previewCard.style.display = 'none';
}

function toggleCatManualUrl() {
  const wrapper = document.getElementById('catManualUrlWrapper');
  const btn = document.getElementById('toggleCatUrlBtn');
  if (!wrapper) return;
  const isHidden = wrapper.style.display === 'none';
  wrapper.style.display = isHidden ? 'block' : 'none';
  if (btn) btn.innerText = isHidden ? 'Hide manual path / URL input' : 'Or enter image path / URL manually';
}

function handleCatManualUrlChange(val) {
  if (val && val.trim()) {
    setCatImagePreview(val.trim(), val.trim().split('/').pop() || 'icon.png', 'Path / URL entered');
  }
}

function saveCategoryIconForm() {
  const groupKey = document.getElementById('catEditGroup').value;
  const idx = parseInt(document.getElementById('catEditIndex').value);
  const newName = document.getElementById('catEditName').value.trim();
  const newImg = AdminState.currentCatImage || document.getElementById('catEditImageUrl').value.trim();

  if (!AdminState.categories[groupKey] || !AdminState.categories[groupKey][idx]) {
    closeCategoryFormModal();
    return;
  }

  if (newName) {
    AdminState.categories[groupKey][idx].name = newName;
  }
  if (newImg) {
    AdminState.categories[groupKey][idx].img = newImg;
  }

  saveCategoriesToStorage();
  closeCategoryFormModal();
  renderCategoryManager();
  showAdminToast(`Category "${newName}" icon updated successfully!`);
}

function resetCategoriesToDefault() {
  if (!confirm('Are you sure you want to restore all category cover icons to original defaults?')) return;

  AdminState.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
  saveCategoriesToStorage();
  renderCategoryManager();
  showAdminToast('All category icons restored to original packshots!');
}

// ==========================================================================
// 3.8. HOMEPAGE HERO & AD BANNERS MODULE (LIVE DIRECT UPLOAD)
// ==========================================================================
function renderBannerManager() {
  const desktopImg = document.getElementById('adminDesktopBannerPreview');
  const mobileImg = document.getElementById('adminMobileBannerPreview');

  if (desktopImg) {
    desktopImg.src = (AdminState.banners && AdminState.banners.desktopBanner) ? AdminState.banners.desktopBanner : 'assets/laptop banner.png';
  }
  if (mobileImg) {
    mobileImg.src = (AdminState.banners && AdminState.banners.mobileBanner) ? AdminState.banners.mobileBanner : 'assets/banner image.png';
  }
}

function handleBannerUpload(event, type) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (!file.type || !file.type.startsWith('image/')) {
    alert('Please select an image file (PNG, JPG, WEBP).');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const rawDataUrl = e.target.result;
    
    // Auto-compress & scale banner for instant loading & storage efficiency
    const img = new Image();
    img.onload = () => {
      const maxDim = type === 'desktop' ? 1400 : 900;
      let width = img.width;
      let height = img.height;

      if (width > maxDim) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // High quality WebP
      const optimizedDataUrl = canvas.toDataURL('image/webp', 0.85);

      if (!AdminState.banners) AdminState.banners = {};
      if (type === 'desktop') {
        AdminState.banners.desktopBanner = optimizedDataUrl;
      } else {
        AdminState.banners.mobileBanner = optimizedDataUrl;
      }

      saveBannersToStorage();
      renderBannerManager();
      showAdminToast(`${type === 'desktop' ? 'Desktop' : 'Mobile'} ad banner updated live!`);
    };
    img.src = rawDataUrl;
  };
  reader.readAsDataURL(file);
}

function resetBannersToDefault() {
  if (!confirm('Are you sure you want to restore homepage hero ad banners to original defaults?')) return;

  AdminState.banners = JSON.parse(JSON.stringify(DEFAULT_BANNERS));
  saveBannersToStorage();
  renderBannerManager();
  showAdminToast('Homepage banners restored to original defaults!');
}

// ==========================================================================
// 4. COUPONS MODULE
// ==========================================================================
function renderCoupons() {
  const tbody = document.getElementById('couponsTableTbody');
  if (!tbody) return;

  if (AdminState.coupons.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:24px; color:var(--text-dim);">No active promo coupons. Click "+ Add Coupon" to create one.</td></tr>`;
    return;
  }

  tbody.innerHTML = AdminState.coupons.map((c, idx) => `
    <tr>
      <td>
        <span class="promo-code-badge" style="background:rgba(225,29,72,0.15); color:var(--admin-primary); padding:4px 10px; border-radius:6px; font-weight:800; font-family:'Outfit', sans-serif; letter-spacing:0.05em; border:1px dashed var(--admin-primary);">
          ${c.code}
        </span>
      </td>
      <td>
        <strong>${c.type === 'percent' ? `${c.value}% OFF` : `₹${c.value} FLAT OFF`}</strong>
        <div style="font-size:0.72rem; color:var(--text-dim);">${c.description || 'Applicable across store'}</div>
      </td>
      <td>₹${c.minOrder || 0}</td>
      <td>${c.usageCount || 0} times</td>
      <td>
        <label class="switch-toggle" style="position:relative; display:inline-block; width:38px; height:20px;">
          <input type="checkbox" ${c.active ? 'checked' : ''} onchange="toggleCouponStatus(${idx})">
          <span class="slider round" style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background:${c.active ? 'var(--admin-accent-green)' : 'var(--admin-border-light)'}; border-radius:20px; transition:0.2s;"></span>
        </label>
      </td>
      <td>
        <button class="btn-table-action delete" title="Delete Coupon" onclick="deleteCoupon(${idx})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function openAddCouponModal() {
  const modal = document.getElementById('couponFormModal');
  document.getElementById('couponCode').value = '';
  document.getElementById('couponType').value = 'percent';
  document.getElementById('couponValue').value = '10';
  document.getElementById('couponMinOrder').value = '1000';
  document.getElementById('couponDesc').value = '';
  if (modal) modal.classList.add('show');
}

function saveCouponForm() {
  const code = document.getElementById('couponCode').value.trim().toUpperCase();
  const type = document.getElementById('couponType').value;
  const value = parseInt(document.getElementById('couponValue').value) || 5;
  const minOrder = parseInt(document.getElementById('couponMinOrder').value) || 0;
  const desc = document.getElementById('couponDesc').value.trim();

  if (!code) {
    alert('Please enter a coupon code.');
    return;
  }

  AdminState.coupons.push({
    code,
    type,
    value,
    minOrder,
    description: desc || (type === 'percent' ? `${value}% OFF` : `₹${value} OFF`),
    active: true,
    usageCount: 0
  });

  saveCouponsToStorage();
  closeCouponFormModal();
  showAdminToast(`Coupon code ${code} created successfully!`);
  renderCoupons();
}

function closeCouponFormModal() {
  const modal = document.getElementById('couponFormModal');
  if (modal) modal.classList.remove('show');
}

function toggleCouponStatus(idx) {
  if (!AdminState.coupons[idx]) return;
  AdminState.coupons[idx].active = !AdminState.coupons[idx].active;
  saveCouponsToStorage();
  showAdminToast(`Coupon ${AdminState.coupons[idx].code} is now ${AdminState.coupons[idx].active ? 'Active' : 'Inactive'}`);
  renderCoupons();
}

function deleteCoupon(idx) {
  const c = AdminState.coupons[idx];
  if (!confirm(`Delete coupon ${c ? c.code : ''}?`)) return;
  AdminState.coupons.splice(idx, 1);
  saveCouponsToStorage();
  showAdminToast('Coupon removed.');
  renderCoupons();
}

// ==========================================================================
// 4.5. VALUE COMBOS & BUNDLES MANAGEMENT
// ==========================================================================
function getAdminCombos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMBOS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch(e) {}
  return [];
}

function renderCombosAdmin() {
  const tbody = document.getElementById('combosTableTbody');
  if (!tbody) return;

  const combos = getAdminCombos();
  if (combos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:24px; color:var(--text-dim);">No combos created yet. Click "+ Create New Combo" to add one!</td></tr>`;
    return;
  }

  tbody.innerHTML = combos.map((c, idx) => {
    const savings = (c.mrp || 0) - (c.price || 0);
    return `
      <tr>
        <td>
          <div style="font-weight:700; color:var(--text-main);">${escapeHtml(c.title)}</div>
          <div style="font-size:0.75rem; color:var(--text-dim); margin-top:2px;">${escapeHtml(c.subtitle || '')}</div>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
            ${(c.items || []).map(item => `&bull; ${escapeHtml(item.name || item)}`).join(' ')}
          </div>
        </td>
        <td><strong style="color:var(--admin-primary); font-size:0.95rem;">₹${(c.price || 0).toLocaleString()}</strong></td>
        <td><span style="text-decoration:line-through; color:var(--text-dim);">₹${(c.mrp || 0).toLocaleString()}</span></td>
        <td><span class="status-pill delivered">${escapeHtml(c.badgeText || `Save ₹${savings.toLocaleString()}`)}</span></td>
        <td>
          <button class="btn-table-action delete" title="Delete Combo" onclick="deleteComboAdmin(${idx})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function openAddComboModal() {
  document.getElementById('comboTitle').value = '';
  document.getElementById('comboSubtitle').value = '';
  document.getElementById('comboPrice').value = '';
  document.getElementById('comboMrp').value = '';
  document.getElementById('comboBadge').value = '';
  document.getElementById('comboItemsText').value = '';
  const modal = document.getElementById('comboFormModal');
  if (modal) modal.classList.add('show');
}

function closeComboFormModal() {
  const modal = document.getElementById('comboFormModal');
  if (modal) modal.classList.remove('show');
}

function saveComboForm() {
  const title = document.getElementById('comboTitle').value.trim();
  const subtitle = document.getElementById('comboSubtitle').value.trim();
  const price = parseInt(document.getElementById('comboPrice').value) || 0;
  const mrp = parseInt(document.getElementById('comboMrp').value) || 0;
  const badge = document.getElementById('comboBadge').value.trim();
  const itemsText = document.getElementById('comboItemsText').value.trim();

  if (!title || price <= 0) {
    alert('Please enter a valid combo title and bundle price.');
    return;
  }

  const items = itemsText.split('\n').filter(l => l.trim().length > 0).map(line => {
    const cleanName = line.trim().replace(/^[•\-\*]\s*/, '');
    let itemImg = 'assets/brands/thumbnail_image-NB-PNT-1000-03-1785879623_clean.png';
    if (cleanName.toLowerCase().includes('fish') || cleanName.toLowerCase().includes('oil') || cleanName.toLowerCase().includes('omega')) {
      itemImg = 'assets/brands/thumbnail_image-NB-DRP-1052-01-1772523317-600x600_clean.png';
    } else if (cleanName.toLowerCase().includes('creatine')) {
      itemImg = 'assets/brands/thumbnail_image-NB-BGM-1067-02-1500x1500_clean.png';
    } else if (cleanName.toLowerCase().includes('whey') || cleanName.toLowerCase().includes('protein')) {
      itemImg = 'assets/brands/variant-28977-featured_image-Nakpro_Gold_100_Whey_Protein_Concentrate_Supplement_Powder__1kg_double_rich_chocolate_clean.png';
    }
    return { name: cleanName, image: itemImg };
  });

  const newCombo = {
    id: 'combo-' + Date.now(),
    title,
    subtitle: subtitle || 'Curated PowerX Bundle',
    price,
    mrp: mrp > price ? mrp : Math.round(price * 1.4),
    badgeText: badge || `SAVE ₹${((mrp || Math.round(price * 1.4)) - price).toLocaleString()}`,
    items: items.length > 0 ? items : [{ name: title, image: 'assets/brands/thumbnail_image-NB-PNT-1000-03-1785879623_clean.png' }]
  };

  const combos = getAdminCombos();
  combos.push(newCombo);
  localStorage.setItem(STORAGE_KEYS.COMBOS, JSON.stringify(combos));
  broadcastLiveSync('COMBOS_UPDATED', combos);

  closeComboFormModal();
  renderCombosAdmin();
  showAdminToast(`Combo "${title}" published live!`);
}

function deleteComboAdmin(idx) {
  const combos = getAdminCombos();
  if (!combos[idx]) return;
  if (!confirm(`Delete combo "${combos[idx].title}"?`)) return;

  combos.splice(idx, 1);
  localStorage.setItem(STORAGE_KEYS.COMBOS, JSON.stringify(combos));
  broadcastLiveSync('COMBOS_UPDATED', combos);
  renderCombosAdmin();
  showAdminToast('Combo removed.');
}

// ==========================================
// 5. CUSTOMERS DIRECTORY MODULE (MERGES REGISTERED USERS & ORDERS)
// ==========================================
function renderCustomers() {
  const tbody = document.getElementById('customersTableTbody');
  if (!tbody) return;

  const customerMap = {};

  // 1. Load all registered user accounts from storefront sign-ups
  try {
    const rawCust = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    if (rawCust) {
      const storedCustomers = JSON.parse(rawCust);
      if (Array.isArray(storedCustomers)) {
        storedCustomers.forEach(c => {
          const key = (c.email || c.phone || c.name).trim().toLowerCase();
          customerMap[key] = {
            name: c.name || 'Member Athlete',
            phone: c.phone || 'N/A',
            email: c.email || 'N/A',
            address: c.address || 'Registered Member (Boisar)',
            totalOrders: c.totalOrders || 0,
            totalSpend: c.totalSpend || 0,
            lastOrderDate: c.createdAt || new Date().toISOString(),
            isAccount: true
          };
        });
      }
    }
  } catch (e) { console.error(e); }

  // 2. Aggregate orders placed by customers
  AdminState.orders.forEach(o => {
    if (!o.customer) return;
    const key = (o.customer.email || o.customer.phone || o.customer.name).trim().toLowerCase();
    if (!customerMap[key]) {
      customerMap[key] = {
        name: o.customer.name || 'Customer',
        phone: o.customer.phone || 'N/A',
        email: o.customer.email || 'N/A',
        address: o.customer.address || 'Standard Delivery Address',
        totalOrders: 0,
        totalSpend: 0,
        lastOrderDate: o.createdAt || new Date().toISOString(),
        isAccount: false
      };
    }
    customerMap[key].totalOrders += 1;
    customerMap[key].totalSpend += (o.total || 0);
    if (o.customer.address) customerMap[key].address = o.customer.address;
    if (o.customer.phone && customerMap[key].phone === 'N/A') customerMap[key].phone = o.customer.phone;
  });

  const customersList = Object.values(customerMap);

  if (customersList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:24px; color:var(--text-dim);">No registered users or order history yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = customersList.map(c => `
    <tr>
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg, #dc2626, #b91c1c); display:flex; align-items:center; justify-content:center; font-weight:800; color:#fff; font-size:0.82rem;">
            ${escapeHtml(c.name.charAt(0).toUpperCase())}
          </div>
          <div>
            <div style="font-weight:700; color:var(--text-main); display:flex; align-items:center; gap:6px;">
              ${escapeHtml(c.name)}
              ${c.isAccount ? '<span style="font-size:0.65rem; background:#fee2e2; color:#dc2626; padding:1px 6px; border-radius:4px; font-weight:700;">Account</span>' : ''}
            </div>
            <div style="font-size:0.75rem; color:var(--text-dim);">${escapeHtml(c.email)}</div>
          </div>
        </div>
      </td>
      <td><strong>${escapeHtml(c.phone)}</strong></td>
      <td><div style="max-width:240px; font-size:0.8rem; color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(c.address)}</div></td>
      <td><span class="status-pill delivered" style="font-size:0.75rem;">${c.totalOrders} order(s)</span></td>
      <td><strong style="color:var(--admin-accent-green);">₹${c.totalSpend.toLocaleString()}</strong></td>
      <td>
        ${c.phone && c.phone !== 'N/A' ? `
          <button class="btn-table-action" title="Send WhatsApp Offer" onclick="window.open('https://api.whatsapp.com/send?phone=${encodeURIComponent(c.phone.replace(/[^0-9]/g, ''))}&text=Hi%20${encodeURIComponent(c.name)},%20PowerX%20Protein%20Hub%20has%20an%20exclusive%20discount%20for%20you!')">
            <i class="fa-brands fa-whatsapp" style="color:#22c55e;"></i>
          </button>
        ` : '<span style="font-size:0.75rem; color:var(--text-dim);">-</span>'}
      </td>
    </tr>
  `).join('');
}

// ==========================================================================
// 6. SETTINGS & DATA TOOLS
// ==========================================================================
function renderSettings() {
  document.getElementById('settStoreName').value = AdminState.settings.storeName || 'PowerX Protein Hub';
  document.getElementById('settTagline').value = AdminState.settings.storeTagline || '';
  document.getElementById('settAnnouncement').value = AdminState.settings.announcementText || 'VOLCANIC NUTRITION SALE IS LIVE!';
  document.getElementById('settPromoDiscount').value = AdminState.settings.promoDiscountHeadline || 'Flat 60% OFF + Extra 5% with code';
  document.getElementById('settCouponCode').value = AdminState.settings.promoCouponCode || 'POWERX5';
  document.getElementById('settPhone').value = AdminState.settings.contactPhone || '+91 98765 43210';
  document.getElementById('settEmail').value = AdminState.settings.contactEmail || 'support@powerxprotein.com';
  document.getElementById('settThreshold').value = AdminState.settings.freeShippingThreshold || 999;
  document.getElementById('settGst').value = AdminState.settings.gstNumber || '27AABCP1234F1Z8';
  document.getElementById('settAddress').value = AdminState.settings.storeAddress || 'Shop 14, PowerX Fitness Hub, Station Road, Boisar, Maharashtra 401501';
}

function saveStoreSettings() {
  AdminState.settings.storeName = document.getElementById('settStoreName').value.trim();
  AdminState.settings.storeTagline = document.getElementById('settTagline').value.trim();
  AdminState.settings.announcementText = document.getElementById('settAnnouncement').value.trim();
  AdminState.settings.promoDiscountHeadline = document.getElementById('settPromoDiscount').value.trim();
  AdminState.settings.promoCouponCode = document.getElementById('settCouponCode').value.trim().toUpperCase();
  AdminState.settings.contactPhone = document.getElementById('settPhone').value.trim();
  AdminState.settings.contactEmail = document.getElementById('settEmail').value.trim();
  AdminState.settings.freeShippingThreshold = parseInt(document.getElementById('settThreshold').value) || 999;
  AdminState.settings.gstNumber = document.getElementById('settGst').value.trim();
  AdminState.settings.storeAddress = document.getElementById('settAddress').value.trim();

  saveSettingsToStorage();
  showAdminToast('Store configuration & top announcement saved live!');
}

function exportStoreBackup() {
  const fullBackup = {
    products: AdminState.products,
    orders: AdminState.orders,
    coupons: AdminState.coupons,
    settings: AdminState.settings,
    exportedAt: new Date().toISOString()
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `powerx_store_backup_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showAdminToast('Backup JSON downloaded.');
}

function resetToDefaultData() {
  if (!confirm('Are you sure you want to reset all products, orders, and coupons to initial factory defaults? This will erase all your custom entries.')) return;

  localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
  localStorage.removeItem(STORAGE_KEYS.ORDERS);
  localStorage.removeItem(STORAGE_KEYS.COUPONS);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);

  initStorage();
  renderCurrentTab();
  showAdminToast('Store reset to factory demo state.');
}

// ==========================================================================
// SEARCH & FILTER LISTENERS
// ==========================================================================
function setupSearchAndFilters() {
  // Global search input
  const globalSearch = document.getElementById('globalAdminSearch');
  if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
      AdminState.searchQuery = e.target.value;
      if (AdminState.currentTab === 'orders') renderOrders();
      if (AdminState.currentTab === 'products') renderProducts();
    });
  }

  // Order status filter
  const orderStatusFilter = document.getElementById('orderStatusFilter');
  if (orderStatusFilter) {
    orderStatusFilter.addEventListener('change', (e) => {
      AdminState.orderFilterStatus = e.target.value;
      renderOrders();
    });
  }

  // Product category filter
  const productCatFilter = document.getElementById('productCategoryFilter');
  if (productCatFilter) {
    productCatFilter.addEventListener('change', (e) => {
      AdminState.productFilterCategory = e.target.value;
      renderProducts();
    });
  }
}

// Toast Alert
function showAdminToast(msg) {
  const toast = document.getElementById('adminToast');
  const msgEl = document.getElementById('adminToastMsg');
  if (!toast || !msgEl) return;

  msgEl.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
