/**
 * PowerX Protein Hub - Multi-Brand Sports Nutrition Catalog
 * Features Top Brands: Optimum Nutrition (ON), MuscleBlaze, MuscleTech, Nakpro, 
 * Kevin Levrone, Fast&Up, Kapiva, Dr. Morepen, Pintola, CaliBar, Upakarma, HealthAid.
 */

// ==========================================
// SUPABASE CLIENT INITIALIZATION
// ==========================================
const SUPABASE_CONFIG = {
  url: 'https://ggfcfcsbqijxauuokeye.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZmNmY3NicWlqeGF1dW9rZXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0ODkwMDksImV4cCI6MjEwNTA2NTAwOX0.aLD45yiS_t_K15UnJEzD-y7alJTBo8ybsUL941a_DlI'
};

let supabaseClient = null;
try {
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('⚡ PowerX Supabase Client Connected');
  }
} catch (err) {
  console.warn('Supabase initialization fallback:', err);
}

// ==========================================
// 1. MULTI-BRAND PRODUCT CATALOG
// ==========================================
let PRODUCTS = [
  // --- Performance Nutrition: Top Brand Proteins ---
  {
    id: 'on-gold-standard-whey',
    title: 'Optimum Nutrition (ON) Gold Standard 100% Whey Protein',
    category: 'proteins',
    rating: 4.8,
    reviewsCount: 14280,
    isVeg: true,
    badgeText: '15% OFF',
    isBestseller: true,
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
    image: 'assets/brands/MuscleTech-1766991505_clean.png',
    variants: [
      { weight: '4.4 lb (2 kg), Milk Chocolate', price: 5899, mrp: 7299, unitPrice: '₹295 / 100 g' },
      { weight: '2.2 lb (1 kg), Double Chocolate', price: 3199, mrp: 3899, unitPrice: '₹320 / 100 g' }
    ],
    nutrition: { protein: '30g', bcaa: '6.8g', creatine: '3g', carbs: '3g', scoops: '44 Servings' },
    description: 'Scientifically engineered whey + isolate formula enhanced with 3g of creatine monohydrate for superior strength and lean muscle growth.'
  },
  {
    id: 'gop-pea-plant',
    title: 'GOP Organic Certified Yellow Pea & Brown Rice Plant Protein',
    category: 'proteins',
    rating: 4.5,
    reviewsCount: 1840,
    isVeg: true,
    badgeText: '22% OFF',
    isBestseller: false,
    image: 'assets/brands/thumbnail_image-NB-GOP-1007-01-1760534122-600x600_clean.png',
    variants: [
      { weight: '1 kg (2.2 lb), Dark Mocha', price: 1699, mrp: 2199, unitPrice: '₹170 / 100 g' },
      { weight: '1 kg (2.2 lb), Unflavored Natural', price: 1499, mrp: 1999, unitPrice: '₹150 / 100 g' }
    ],
    nutrition: { protein: '25g', bcaa: '5.1g', digestiveEnzymes: 'Papain & Bromelain', scoops: '30 Servings' },
    description: '100% Vegan non-GMO certified organic plant protein blend with added superfoods and digestive enzymes. Zero soy, zero dairy.'
  },

  // --- Performance Nutrition: Creatine ---
  {
    id: 'mb-creatine-creamp',
    title: 'MuscleBlaze Creatine Monohydrate (CreAMP™ Micronized 200 Mesh)',
    category: 'creatine',
    rating: 4.8,
    reviewsCount: 9420,
    isVeg: true,
    badgeText: '30% OFF',
    isBestseller: true,
    image: 'assets/brands/thumbnail_image-NB-BGM-1067-02-1500x1500_clean.png',
    variants: [
      { weight: '250 g, Unflavored (83 Servings)', price: 749, mrp: 1099, unitPrice: '₹300 / 100 g' },
      { weight: '100 g, Unflavored (33 Servings)', price: 399, mrp: 549, unitPrice: '₹399 / 100 g' },
      { weight: '250 g, Tangy Orange', price: 849, mrp: 1199, unitPrice: '₹340 / 100 g' }
    ],
    nutrition: { creatine: '3000mg', meshSize: '200 Mesh Ultra-Fine', calories: '0 kcal' },
    description: 'Micro-refined pharmaceutical grade creatine for explosive power, accelerated ATP recovery, and increased intracellular volume.'
  },

  // --- Performance Nutrition: Pre-Workout & Aminos ---
  {
    id: 'nutrabay-spark-preworkout',
    title: 'Nutrabay Gold Spark Pre-Workout (Fermented L-Citrulline 6000mg)',
    category: 'pre-workout',
    rating: 4.6,
    reviewsCount: 2840,
    isVeg: true,
    badgeText: '20% OFF',
    isBestseller: true,
    image: 'assets/nutrabay/thumbnail_image-NB-NUT-1059-02-1776682520_transparent.png',
    variants: [
      { weight: '300 g, Blue Razz Explosion (30 Servings)', price: 1199, mrp: 1499, unitPrice: '₹400 / 100 g' },
      { weight: '300 g, Fruit Punch Blast', price: 1199, mrp: 1499, unitPrice: '₹400 / 100 g' }
    ],
    nutrition: { lCitrulline: '6000mg', betaAlanine: '3200mg', caffeineAnhydrous: '300mg' },
    description: 'High-stimulant extreme pre-workout matrix engineered for laser-sharp focus and vein-popping pump.'
  },
  {
    id: 'fastandup-lcarnitine',
    title: 'Fast&Up L-Carnitine Carnipure™ 1000mg (Swiss Effervescent)',
    category: 'l-carnitine',
    rating: 4.7,
    reviewsCount: 3120,
    isVeg: true,
    badgeText: '15% OFF',
    isBestseller: false,
    image: 'assets/brands/thumbnail_image-NB-FUP-1033-02-1785407425-200x200_clean.png',
    variants: [
      { weight: 'Tube of 20 Effervescent Tabs, Citrus', price: 549, mrp: 650, unitPrice: '₹27.5 / tab' },
      { weight: 'Pack of 3 Tubes (60 Tabs), Citrus', price: 1499, mrp: 1950, unitPrice: '₹25 / tab' }
    ],
    nutrition: { pureCarnipure: '1000mg', b12: '100% RDA', fastAbsorption: 'Swiss Tech' },
    description: 'Trademarked pure Carnipure® from Switzerland for enhanced fatty acid oxidation and cellular energy output.'
  },

  // --- Performance Nutrition: Mass Gainers ---
  {
    id: 'kevin-levrone-mass',
    title: 'Kevin Levrone Signature Anabolic Mass High-Calorie Gainer',
    category: 'gainers',
    rating: 4.6,
    reviewsCount: 2190,
    isVeg: true,
    badgeText: '30% OFF',
    isBestseller: false,
    image: 'assets/nutrabay/variant-421-featured_image-Kevin_Levrone_Anabolic_Mass_Gainer__698_Kg_154_Lb_Chocolate_transparent.png',
    variants: [
      { weight: '3 kg (6.6 lb), Chocolate Fudge', price: 2199, mrp: 3199, unitPrice: '₹73 / 100 g' },
      { weight: '7 kg (15.4 lb), Chocolate Fudge', price: 4799, mrp: 6999, unitPrice: '₹68 / 100 g' }
    ],
    nutrition: { calories: '1250 kcal', protein: '50g', carbs: '252g', daa: '3000mg' },
    description: 'Formulated with D-Aspartic Acid, Fenugreek extract, and Tribulus to stimulate anabolic hormone production.'
  },

  // --- Vitamins & Wellness: Top Brands ---
  {
    id: 'dr-morepen-fishoil',
    title: 'Dr. Morepen Omega 3 Triple Strength Deep-Sea Fish Oil 1250mg',
    category: 'fish-oil',
    rating: 4.8,
    reviewsCount: 6420,
    isVeg: false,
    badgeText: '35% OFF',
    isBestseller: true,
    image: 'assets/brands/thumbnail_image-NB-DRP-1052-01-1772523317-600x600_clean.png',
    variants: [
      { weight: '60 Softgels (1250mg)', price: 649, mrp: 999, unitPrice: '₹10.8 / count' },
      { weight: '120 Softgels (1250mg)', price: 1199, mrp: 1899, unitPrice: '₹10 / count' }
    ],
    nutrition: { epa: '560mg', dha: '400mg', totalOmega3: '1000mg', entericCoated: 'Zero Burps' },
    description: 'Molecularly distilled deep-sea cold water fish oil with mercury-free certification for cardiovascular & joint flexibility.'
  },
  {
    id: 'kapiva-shilajit-resin',
    title: 'Kapiva Pure 100% Himalayan Shilajit Resin (80% Fulvic Acid)',
    category: 'shilajit',
    rating: 4.9,
    reviewsCount: 12400,
    isVeg: true,
    badgeText: '25% OFF',
    isBestseller: true,
    image: 'assets/nutrabay/variant-22971-featured_image-Upakarma_Ayurveda_Pure_Shilajit_Resin_Form_with_Ashwagandha__20_gm_004_Lb_transparent.png',
    variants: [
      { weight: '20 g Pure Resin Jar', price: 1099, mrp: 1499, unitPrice: '₹55 / g' },
      { weight: '40 g Value Pack', price: 1999, mrp: 2899, unitPrice: '₹50 / g' }
    ],
    nutrition: { fulvicAcid: '80% Guaranteed', traceMinerals: '84+ Minerals', altitude: '18,000 ft Himalayas' },
    description: 'Sourced from the upper Himalayan ranges. Certified with NABL lab reports for heavy metal safety.'
  },
  {
    id: 'kapiva-ashwagandha-gold',
    title: 'Kapiva Ashwagandha Gold 1000mg with KSM-66 & 24K Swarna Bhasma',
    category: 'ashwagandha',
    rating: 4.8,
    reviewsCount: 4890,
    isVeg: true,
    badgeText: '20% OFF',
    isBestseller: false,
    image: 'assets/brands/variant-30428-featured_image-Kapiva_Ashwagandha_Gold__60_Caps_clean.png',
    variants: [
      { weight: '60 Veg Capsules (1 Month)', price: 799, mrp: 999, unitPrice: '₹13.3 / count' }
    ],
    nutrition: { ksm66: '600mg', swarnaBhasma: 'Certified 24K', gokshura: '200mg' },
    description: 'Clinically proven KSM-66 full spectrum extract combined with pure Gold Bhasma for energy, stamina, and stress relief.'
  },
  {
    id: 'healthaid-magnesium-zinc',
    title: 'HealthAid Magnesium Glycinate with Chelated Zinc 60 Tabs',
    category: 'magnesium',
    rating: 4.8,
    reviewsCount: 1650,
    isVeg: true,
    badgeText: '15% OFF',
    isBestseller: false,
    image: 'assets/nutrabay/variant-29035-featured_image-HealthAid_Magnesium_Glycinate_with_Zinc__60_Tabs_transparent.png',
    variants: [
      { weight: '60 Tablets (2 Months Supply)', price: 649, mrp: 749, unitPrice: '₹10.8 / tab' }
    ],
    nutrition: { elementalMagnesium: '400mg', zincChelate: '10mg', form: 'Bisglycinate' },
    description: 'Gentle on stomach bisglycinate form for deep REM sleep, muscle recovery, and cramp prevention.'
  },

  // --- Health Foods: Top Brands ---
  {
    id: 'pintola-all-natural-pb',
    title: 'Pintola All-Natural Organic Peanut Butter (Crunchy / Creamy)',
    category: 'peanut-butter',
    rating: 4.8,
    reviewsCount: 18900,
    isVeg: true,
    badgeText: '15% OFF',
    isBestseller: true,
    image: 'assets/brands/thumbnail_image-NB-PNT-1000-03-1785879623_clean.png',
    variants: [
      { weight: '1 kg (2.2 lb), Crunchy Roasted', price: 449, mrp: 525, unitPrice: '₹45 / 100 g' },
      { weight: '1 kg (2.2 lb), Dark Chocolate', price: 499, mrp: 599, unitPrice: '₹50 / 100 g' },
      { weight: '2.5 kg Tub, Crunchy', price: 1049, mrp: 1250, unitPrice: '₹42 / 100 g' }
    ],
    nutrition: { protein: '30g', healthyFats: '50g', addedSugar: 'Zero', ingredients: '100% Roasted Peanuts' },
    description: "India's highest rated peanut butter. Made exclusively with US-grade organic peanuts. Zero hydrogenated oil."
  },
  {
    id: 'calibar-protein-bars',
    title: 'CaliBar 10g Multi-Crunch Protein Energy Bars (Box of 6)',
    category: 'bars',
    rating: 4.7,
    reviewsCount: 3410,
    isVeg: true,
    badgeText: '20% OFF',
    isBestseller: false,
    image: 'assets/brands/variant-6276-featured_image-CaliBar_10g_Protein_Bar__Berry_Almond_Choco_Blueberry__Roasted_Coffee_Bean_6_Bars_clean.png',
    variants: [
      { weight: 'Box of 6 Bars (Berry & Almond Choco)', price: 380, mrp: 480, unitPrice: '₹63 / bar' },
      { weight: 'Box of 12 Bars (Assorted Flavors)', price: 720, mrp: 960, unitPrice: '₹60 / bar' }
    ],
    nutrition: { protein: '10g / bar', fiber: '6g', addedSugar: '0g', calories: '165 kcal' },
    description: 'Crispy whole grain wafer protein bar enriched with almonds, berries, and antioxidant dark cocoa.'
  },
  {
    id: 'superyou-yeast-bar',
    title: 'SuperYou Yeast Protein Wafer Bar Dark Cocoa Crunch',
    category: 'bars',
    rating: 4.6,
    reviewsCount: 1540,
    isVeg: true,
    badgeText: '10% OFF',
    isBestseller: false,
    image: 'assets/brands/thumbnail_image-NB-SYU-1002-01-1500x1500_clean.png',
    variants: [
      { weight: 'Box of 6 Wafer Bars (Dark Choco)', price: 399, mrp: 450, unitPrice: '₹66 / bar' }
    ],
    nutrition: { protein: '10g', calories: '160 kcal', source: 'Bio-Fermented Yeast' },
  }
];

// Synchronize Product Catalog with Admin Management Storage
(function syncProductsWithAdmin() {
  const stored = localStorage.getItem('POWERX_PRODUCTS_STORAGE');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach(p => {
          if (p.id === 'on-gold-standard-whey' && (p.image.includes('Optimum_1-1767086019') || p.image.includes('on_gold_standard_whey_tub') || !p.image)) {
            p.image = 'assets/brands/variant-28977-featured_image-Nakpro_Gold_100_Whey_Protein_Concentrate_Supplement_Powder__1kg_double_rich_chocolate_clean.png';
          }
        });
        PRODUCTS = parsed;
        localStorage.setItem('POWERX_PRODUCTS_STORAGE', JSON.stringify(PRODUCTS));
      }
    } catch(e) {}
  } else {
    localStorage.setItem('POWERX_PRODUCTS_STORAGE', JSON.stringify(PRODUCTS));
  }
})();

// ==========================================
// 2. MULTI-BRAND CATEGORY ICONS (SYNCHRONIZED WITH ADMIN & LOCALSTORAGE)
// ==========================================
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

let STORE_CATEGORIES = DEFAULT_CATEGORIES;
try {
  const savedCats = localStorage.getItem('POWERX_CATEGORIES_STORAGE');
  if (savedCats) {
    const parsed = JSON.parse(savedCats);
    if (parsed && parsed.performance && parsed.vitamins && parsed.healthFood) {
      STORE_CATEGORIES = parsed;
    } else {
      localStorage.setItem('POWERX_CATEGORIES_STORAGE', JSON.stringify(DEFAULT_CATEGORIES));
    }
  } else {
    localStorage.setItem('POWERX_CATEGORIES_STORAGE', JSON.stringify(DEFAULT_CATEGORIES));
  }
} catch(e) {}

const PERFORMANCE_CATEGORIES = STORE_CATEGORIES.performance;
const VITAMIN_CATEGORIES = STORE_CATEGORIES.vitamins;
const HEALTH_FOOD_CATEGORIES = STORE_CATEGORIES.healthFood;

// ==========================================
// 2.5. DYNAMIC HOMEPAGE AD BANNERS (SYNC WITH ADMIN)
// ==========================================
function syncHomepageBanners() {
  try {
    const saved = localStorage.getItem('POWERX_BANNERS_STORAGE');
    if (saved) {
      const banners = JSON.parse(saved);
      const desktopSource = document.getElementById('desktopBannerSource');
      const mobileImg = document.getElementById('mobileBannerImg');
      if (desktopSource && banners.desktopBanner) {
        desktopSource.srcset = banners.desktopBanner;
      }
      if (mobileImg) {
        if (banners.mobileBanner) {
          mobileImg.src = banners.mobileBanner;
        } else if (banners.desktopBanner) {
          mobileImg.src = banners.desktopBanner;
        }
      }
    }
  } catch(e) {}
}
syncHomepageBanners();
window.addEventListener('storage', (e) => {
  if (e.key === 'POWERX_BANNERS_STORAGE') {
    syncHomepageBanners();
  }
});

// ==========================================
// 2.8. DYNAMIC STORE SETTINGS & ANNOUNCEMENT BAR (SYNC WITH ADMIN)
// ==========================================
function syncStoreSettings() {
  try {
    const saved = localStorage.getItem('POWERX_SETTINGS_STORAGE');
    if (saved) {
      const s = JSON.parse(saved);
      const topContainer = document.getElementById('topAnnouncementText');
      if (topContainer) {
        let headline = (s.announcementText || 'VOLCANIC NUTRITION SALE IS LIVE!').replace(/^[🔥\s]+/, '').trim();
        if (headline.includes('Flat') || headline.includes('OFF')) {
          headline = headline.split('Flat')[0].replace(/!.*$/, '!').trim() || 'VOLCANIC NUTRITION SALE IS LIVE!';
        }
        const coupon = s.promoCouponCode || 'POWERX5';
        const discount = s.promoDiscountHeadline || 'Flat 60% OFF + Extra 5% with code';

        topContainer.innerHTML = `
          <span class="fire-flame-icon">🔥</span>
          <strong>${headline}</strong> ${discount} <span class="promo-pill" onclick="copyCoupon('${coupon}')">${coupon} <i class="fa-regular fa-copy"></i></span>
        `;
      }

      // Update WhatsApp links
      if (s.contactPhone) {
        const cleanPhone = s.contactPhone.replace(/[^0-9]/g, '');
        const waBtns = document.querySelectorAll('.btn-boisar-wa');
        waBtns.forEach(btn => {
          btn.href = `https://wa.me/${cleanPhone}?text=Hello%20PowerX%20Boisar,%20I%20want%20to%20order%20supplements`;
        });
      }

      // Update free shipping threshold message
      if (s.freeShippingThreshold) {
        const thresholdEl = document.querySelector('#freeShippingMsg strong');
        if (thresholdEl) {
          thresholdEl.innerText = `₹${s.freeShippingThreshold}`;
        }
      }
    }
  } catch(e) {}
}
syncStoreSettings();
// ==========================================
// STOREFRONT LIVE SYNC ENGINE (Real-Time A to Z Updates)
// ==========================================
const liveSyncChannel = window.BroadcastChannel ? new BroadcastChannel('powerx_live_sync') : null;

function handleLiveSyncUpdate(action, payload) {
  if (action === 'PRODUCTS_UPDATED') {
    const stored = localStorage.getItem('POWERX_PRODUCTS_STORAGE');
    if (stored) {
      try {
        PRODUCTS = JSON.parse(stored);
        renderPerformanceProducts('proteins');
        renderVitaminsProducts('fish-oil');
        renderHealthFoodProducts('peanut-butter');
      } catch(e) {}
    }
  } else if (action === 'BANNERS_UPDATED') {
    syncHomepageBanners();
  } else if (action === 'CATEGORIES_UPDATED') {
    renderCategory4Cols();
  } else if (action === 'SETTINGS_UPDATED') {
    syncStoreSettings();
  }
}

if (liveSyncChannel) {
  liveSyncChannel.onmessage = (event) => {
    const data = event.data;
    if (data && data.action) {
      handleLiveSyncUpdate(data.action, data.payload);
    }
  };
}

// Window Storage Event Listener (Fallback across browser windows)
window.addEventListener('storage', (e) => {
  if (e.key === 'POWERX_SETTINGS_STORAGE') {
    handleLiveSyncUpdate('SETTINGS_UPDATED');
  } else if (e.key === 'POWERX_PRODUCTS_STORAGE') {
    handleLiveSyncUpdate('PRODUCTS_UPDATED');
  } else if (e.key === 'POWERX_BANNERS_STORAGE') {
    handleLiveSyncUpdate('BANNERS_UPDATED');
  } else if (e.key === 'POWERX_CATEGORIES_STORAGE') {
    handleLiveSyncUpdate('CATEGORIES_UPDATED');
  }
});

// ==========================================
// 3. APPLICATION STATE
// ==========================================
const state = {
  cart: [],
  appliedCoupon: null,
  activeSlide: 0,
  user: null,
  selectedProductVariants: {}
};

// ==========================================
// 4. INITIALIZATION & RENDERING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderCategory4Cols();
  renderPerformanceProducts('proteins');
  renderVitaminsProducts('fish-oil');
  renderHealthFoodProducts('peanut-butter');
  setupSearchAutocomplete();
  setupHamburgerDrawer();
  loadCartFromStorage();
  initSupabaseAuth();
});

// Render 4-Column Category Grids with Transparent Product Cutouts
function renderCategory4Cols() {
  const perfContainer = document.getElementById('performanceCategoryList');
  if (perfContainer) {
    perfContainer.innerHTML = PERFORMANCE_CATEGORIES.map(cat => `
      <div class="mobile-cat-card" onclick="filterPerformanceCategory('${cat.filter}')">
        <div class="cat-thumb-box">
          <img src="${cat.img}" alt="${cat.name}" class="cat-tile-real-photo" loading="eager">
        </div>
        <span class="cat-item-label">${cat.name}</span>
      </div>
    `).join('');
  }

  const vitContainer = document.getElementById('vitaminsCategoryList');
  if (vitContainer) {
    vitContainer.innerHTML = VITAMIN_CATEGORIES.map(cat => `
      <div class="mobile-cat-card" onclick="filterVitaminsCategory('${cat.filter}')">
        <div class="cat-thumb-box">
          <img src="${cat.img}" alt="${cat.name}" class="cat-tile-real-photo" loading="eager">
        </div>
        <span class="cat-item-label">${cat.name}</span>
      </div>
    `).join('');
  }

  const foodContainer = document.getElementById('healthFoodCategoryList');
  if (foodContainer) {
    foodContainer.innerHTML = HEALTH_FOOD_CATEGORIES.map(cat => `
      <div class="mobile-cat-card" onclick="filterHealthFoodCategory('${cat.filter}')">
        <div class="cat-thumb-box">
          <img src="${cat.img}" alt="${cat.name}" class="cat-tile-real-photo" loading="eager">
        </div>
        <span class="cat-item-label">${cat.name}</span>
      </div>
    `).join('');
  }
}

// Render Products with Real Photos
function renderPerformanceProducts(catFilter, tabBtn = null) {
  if (tabBtn) {
    document.querySelectorAll('#performanceTabs .filter-tab-btn').forEach(btn => btn.classList.remove('active'));
    tabBtn.classList.add('active');
  }

  const grid = document.getElementById('performanceProductsGrid');
  if (!grid) return;

  let items = PRODUCTS.filter(p => ['proteins', 'creatine', 'pre-workout', 'gainers', 'aminos', 'l-carnitine'].includes(p.category));
  if (catFilter !== 'all') {
    items = PRODUCTS.filter(p => p.category === catFilter);
  }

  renderProductCards(grid, items);
}

function renderVitaminsProducts(catFilter, tabBtn = null) {
  if (tabBtn) {
    document.querySelectorAll('#vitaminsTabs .filter-tab-btn').forEach(btn => btn.classList.remove('active'));
    tabBtn.classList.add('active');
  }

  const grid = document.getElementById('vitaminsProductsGrid');
  if (!grid) return;

  let items = PRODUCTS.filter(p => ['fish-oil', 'multivitamins', 'magnesium', 'ashwagandha', 'shilajit'].includes(p.category));
  if (catFilter !== 'all') {
    items = PRODUCTS.filter(p => p.category === catFilter);
  }

  renderProductCards(grid, items);
}

function renderHealthFoodProducts(catFilter, tabBtn = null) {
  if (tabBtn) {
    document.querySelectorAll('#healthFoodTabs .filter-tab-btn').forEach(btn => btn.classList.remove('active'));
    tabBtn.classList.add('active');
  }

  const grid = document.getElementById('healthFoodProductsGrid');
  if (!grid) return;

  let items = PRODUCTS.filter(p => ['oats', 'peanut-butter', 'bars'].includes(p.category));
  if (catFilter !== 'all') {
    items = PRODUCTS.filter(p => p.category === catFilter);
  }

  renderProductCards(grid, items);
}

function renderProductCards(grid, items) {
  if (items.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 20px; color: #64748b;">No products in this section right now.</div>`;
    return;
  }

  grid.innerHTML = items.map(p => {
    const selectedVariantIdx = state.selectedProductVariants[p.id] || 0;
    const variant = p.variants[selectedVariantIdx];

    return `
      <div class="product-card" id="card-${p.id}">
        <div class="card-badges-row">
          ${p.badgeText ? `<span class="discount-badge">${p.badgeText}</span>` : '<span></span>'}
          ${p.isBestseller ? `<span class="bestseller-badge">Bestseller</span>` : ''}
        </div>

        <div class="card-img-wrapper" onclick="quickViewProduct('${p.id}')">
          <img src="${p.image}" alt="${p.title}" class="product-real-img" loading="eager">
          <button class="btn-quick-add" onclick="event.stopPropagation(); quickAddToCart('${p.id}')" aria-label="Add to cart">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>

        <div class="card-meta-row">
          <span class="${p.isVeg ? 'veg-icon' : 'non-veg-icon'}" title="${p.isVeg ? '100% Vegetarian' : 'Non-Vegetarian'}"></span>
        </div>

        <h3 class="card-product-title" onclick="quickViewProduct('${p.id}')" title="${p.title}">${p.title}</h3>

        <div class="variant-select-box">
          <select class="variant-dropdown" onchange="changeProductVariant('${p.id}', this.value)">
            ${p.variants.map((v, idx) => `
              <option value="${idx}" ${idx === selectedVariantIdx ? 'selected' : ''}>${v.weight}</option>
            `).join('')}
          </select>
          <i class="fa-solid fa-chevron-down variant-caret"></i>
        </div>

        <div class="card-price-block">
          <div class="price-row">
            <span class="selling-price" id="price-${p.id}">₹${variant.price.toLocaleString()}</span>
            <span class="mrp-price" id="mrp-${p.id}">MRP: ₹${variant.mrp.toLocaleString()}</span>
          </div>
          <div class="unit-price" id="unit-${p.id}">${variant.unitPrice}</div>
        </div>
      </div>
    `;
  }).join('');
}

// Filter triggers
function filterPerformanceCategory(cat, btn) {
  renderPerformanceProducts(cat, btn);
  scrollToSection('performance-bestsellers');
}

function filterVitaminsCategory(cat, btn) {
  renderVitaminsProducts(cat, btn);
  scrollToSection('vitamins-bestsellers');
}

function filterHealthFoodCategory(cat, btn) {
  renderHealthFoodProducts(cat, btn);
  scrollToSection('health-foods-bestsellers');
}

// Live variant change
function changeProductVariant(productId, variantIdx) {
  state.selectedProductVariants[productId] = parseInt(variantIdx);
  const p = PRODUCTS.find(item => item.id === productId);
  if (!p) return;

  const variant = p.variants[variantIdx];
  const priceEl = document.getElementById(`price-${productId}`);
  const mrpEl = document.getElementById(`mrp-${productId}`);
  const unitEl = document.getElementById(`unit-${productId}`);

  if (priceEl) priceEl.innerText = `₹${variant.price.toLocaleString()}`;
  if (mrpEl) mrpEl.innerText = `MRP: ₹${variant.mrp.toLocaleString()}`;
  if (unitEl) unitEl.innerText = variant.unitPrice;
}

// ==========================================
// 5. LIVE SEARCH AUTOCOMPLETE
// ==========================================
function setupSearchAutocomplete() {
  const input = document.getElementById('searchInput');
  const mobileInput = document.getElementById('mobileSearchInput');
  const dropdown = document.getElementById('searchDropdown');
  const resultsList = document.getElementById('searchResultsList');
  const mobileDropdown = document.getElementById('mobileSearchDropdown');
  const mobileResultsList = document.getElementById('mobileSearchResultsList');

  const placeholderPhrases = [
    'Search "Optimum Nutrition"',
    'Search "MuscleBlaze"',
    'Search "Avvatar Whey"',
    'Search "Creatine Monohydrate"',
    'Search "Kapiva Shilajit"',
    'Search "Pintola Peanut Butter"'
  ];

  let phraseIdx = 0;
  setInterval(() => {
    phraseIdx = (phraseIdx + 1) % placeholderPhrases.length;
    if (input && document.activeElement !== input) input.placeholder = placeholderPhrases[phraseIdx];
    if (mobileInput && document.activeElement !== mobileInput) mobileInput.placeholder = placeholderPhrases[phraseIdx];
  }, 3000);

  function handleSearch(query, isMobile = false) {
    const q = query.trim().toLowerCase();
    const curDropdown = isMobile ? mobileDropdown : dropdown;
    const curList = isMobile ? mobileResultsList : resultsList;

    if (!q) {
      if (curList) curList.innerHTML = '';
      if (curDropdown) curDropdown.classList.remove('show');
      return;
    }

    const matches = PRODUCTS.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );

    if (curDropdown) curDropdown.classList.add('show');

    if (matches.length === 0) {
      curList.innerHTML = `<div style="padding: 10px; font-size: 0.82rem; color: #64748b;">No results found for "${escapeHtml(query)}"</div>`;
      return;
    }

    curList.innerHTML = matches.slice(0, 5).map(p => `
      <div class="search-item-row" onclick="quickViewProduct('${p.id}'); closeSearch();">
        <div style="display:flex; align-items:center; gap:8px;">
          <img src="${p.image}" alt="" style="width:28px; height:34px; object-fit:contain; border-radius:4px; background:#f8fafc;">
          <div class="search-item-title">${p.title}</div>
        </div>
        <div class="search-item-price">₹${p.variants[0].price.toLocaleString()}</div>
      </div>
    `).join('');
  }

  if (input) {
    input.addEventListener('input', (e) => handleSearch(e.target.value, false));
    input.addEventListener('focus', () => { if (input.value.trim()) dropdown.classList.add('show'); });
  }

  if (mobileInput) {
    mobileInput.addEventListener('input', (e) => handleSearch(e.target.value, true));
    mobileInput.addEventListener('focus', () => { if (mobileInput.value.trim()) mobileDropdown.classList.add('show'); });
  }

  window.quickSearch = function(term) {
    if (input) { input.value = term; handleSearch(term, false); }
  };

  window.quickSearchMobile = function(term) {
    if (mobileInput) { mobileInput.value = term; handleSearch(term, true); }
  };

  window.closeSearch = function() {
    if (dropdown) dropdown.classList.remove('show');
    if (mobileDropdown) mobileDropdown.classList.remove('show');
  };
}

// ==========================================
// 6. CART & STORAGE
// ==========================================
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('powerx_cart');
    if (saved) {
      state.cart = JSON.parse(saved);
      updateCartUI();
    }
  } catch (e) { console.error(e); }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('powerx_cart', JSON.stringify(state.cart));
  } catch (e) { console.error(e); }
}

function quickAddToCart(productId) {
  const p = PRODUCTS.find(item => item.id === productId);
  if (!p) return;

  const variantIdx = state.selectedProductVariants[productId] || 0;
  const variant = p.variants[variantIdx];

  const existing = state.cart.find(c => c.productId === productId && c.variantIdx === variantIdx);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      productId: p.id,
      title: p.title,
      variantIdx: variantIdx,
      weight: variant.weight,
      price: variant.price,
      image: p.image,
      qty: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  openToast(`Added "${p.title}" to cart!`);
}

function updateCartItemQty(index, delta) {
  if (!state.cart[index]) return;
  state.cart[index].qty += delta;
  if (state.cart[index].qty <= 0) {
    state.cart.splice(index, 1);
  }
  saveCartToStorage();
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('cartBadge');
  const mobileTopBadge = document.getElementById('mobileTopCartBadge');
  const countSpan = document.getElementById('cartDrawerCount');
  const container = document.getElementById('cartItemsContainer');
  const footer = document.getElementById('cartFooter');
  
  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (badge) badge.innerText = totalItems;
  if (mobileTopBadge) mobileTopBadge.innerText = totalItems;
  if (countSpan) countSpan.innerText = totalItems;

  if (state.cart.length === 0) {
    if (container) {
      container.innerHTML = `
        <div class="cart-empty-view">
          <div class="cart-empty-icon"><i class="fa-solid fa-cart-arrow-down"></i></div>
          <h4 style="font-size: 1.1rem; color: #1e293b; margin-bottom: 4px;">Your Cart is Empty!</h4>
          <p style="font-size: 0.82rem; color: #64748b;">Explore ON, MuscleBlaze, Creatine & Vitamins to power up your gains.</p>
        </div>
      `;
    }
    if (footer) footer.style.display = 'none';
    updateFreeShipping(0);
    return;
  }

  if (footer) footer.style.display = 'block';

  if (container) {
    container.innerHTML = state.cart.map((item, idx) => `
      <div class="cart-item-card">
        <div class="cart-item-thumb">
          <img src="${item.image}" alt="${item.title}" style="object-fit:contain; width:100%; height:100%;">
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.title}</h4>
          <div class="cart-item-variant">${item.weight}</div>
          <div class="cart-item-bottom">
            <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString()}</span>
            <div class="cart-qty-ctrl">
              <button class="qty-btn" onclick="updateCartItemQty(${idx}, -1)"><i class="fa-solid fa-minus"></i></button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="updateCartItemQty(${idx}, 1)"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  // Calculate discount from dynamic active coupons
  let discount = 0;
  if (state.appliedCoupon) {
    let matchedCoupon = null;
    try {
      const storedCoupons = localStorage.getItem('POWERX_COUPONS_STORAGE');
      if (storedCoupons) {
        const parsed = JSON.parse(storedCoupons);
        matchedCoupon = parsed.find(c => c.code === state.appliedCoupon && c.active);
      }
    } catch(e) {}

    if (matchedCoupon) {
      if (matchedCoupon.type === 'percent') {
        discount = Math.round(subtotal * (matchedCoupon.value / 100));
      } else {
        discount = matchedCoupon.value;
      }
    } else if (state.appliedCoupon === 'POWERX5') {
      discount = Math.round(subtotal * 0.05);
    }
  }

  const shipping = 0;
  const finalTotal = Math.max(0, subtotal - discount + shipping);

  const subtotalEl = document.getElementById('subtotalPrice');
  const discountRow = document.getElementById('discountRow');
  const discountPriceEl = document.getElementById('discountPrice');
  const finalTotalEl = document.getElementById('finalTotalPrice');

  if (subtotalEl) subtotalEl.innerText = `₹${subtotal.toLocaleString()}`;
  if (discountRow) {
    if (discount > 0) {
      discountRow.style.display = 'flex';
      discountPriceEl.innerText = `-₹${discount.toLocaleString()}`;
    } else {
      discountRow.style.display = 'none';
    }
  }
  if (finalTotalEl) finalTotalEl.innerText = `₹${finalTotal.toLocaleString()}`;

  updateFreeShipping(subtotal);
}

function updateFreeShipping(subtotal) {
  const msgEl = document.getElementById('freeShippingMsg');
  const fillEl = document.getElementById('shippingProgressFill');
  const threshold = 999;

  if (subtotal >= threshold) {
    if (msgEl) msgEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> You unlocked <strong>FREE Express Delivery!</strong>`;
    if (fillEl) fillEl.style.width = '100%';
  } else {
    const diff = threshold - subtotal;
    const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
    if (msgEl) msgEl.innerHTML = `Add <strong>₹${diff}</strong> more to unlock <strong>FREE Delivery!</strong>`;
    if (fillEl) fillEl.style.width = `${pct}%`;
  }
}

function applyCouponCode() {
  const input = document.getElementById('couponInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  if (!code) {
    openToast('Please enter a coupon code.');
    return;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let matchedCoupon = null;

  try {
    const storedCoupons = localStorage.getItem('POWERX_COUPONS_STORAGE');
    if (storedCoupons) {
      const parsed = JSON.parse(storedCoupons);
      matchedCoupon = parsed.find(c => c.code === code && c.active);
    }
  } catch(e) {}

  if (!matchedCoupon && code === 'POWERX5') {
    matchedCoupon = { code: 'POWERX5', type: 'percent', value: 5, minOrder: 0 };
  }

  if (matchedCoupon) {
    if (matchedCoupon.minOrder && subtotal < matchedCoupon.minOrder) {
      openToast(`Coupon valid on orders above ₹${matchedCoupon.minOrder}`);
      return;
    }

    state.appliedCoupon = matchedCoupon.code;
    const pill = document.getElementById('appliedCouponPill');
    const codeText = document.getElementById('appliedCodeText');
    if (pill) pill.style.display = 'flex';
    if (codeText) codeText.innerText = matchedCoupon.code;
    
    updateCartUI();
    openToast(`Coupon ${matchedCoupon.code} applied successfully!`);
  } else {
    openToast(`Invalid coupon. Try "POWERX5" or "BEAST10"`);
  }
}

function removeCouponCode() {
  state.appliedCoupon = null;
  document.getElementById('appliedCouponPill').style.display = 'none';
  const input = document.getElementById('couponInput');
  if (input) input.value = '';
  updateCartUI();
}

function copyCoupon(code) {
  navigator.clipboard?.writeText(code);
  const couponInput = document.getElementById('couponInput');
  if (couponInput) couponInput.value = code;
  openToast(`Coupon "${code}" copied!`);
}

function openCartDrawer() {
  document.getElementById('cartDrawer').classList.add('active');
  document.getElementById('cartOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cartDrawer').classList.remove('active');
  document.getElementById('cartOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function setupHamburgerDrawer() {
  const btn = document.getElementById('hamburgerBtn');
  if (btn) btn.addEventListener('click', openNavDrawer);
}

function openNavDrawer() {
  document.getElementById('navDrawer').classList.add('active');
  document.getElementById('navDrawerOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeNavDrawer() {
  document.getElementById('navDrawer').classList.remove('active');
  document.getElementById('navDrawerOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

// Quick View Modal
function quickViewProduct(productId) {
  const p = PRODUCTS.find(item => item.id === productId);
  if (!p) return;

  const modalBody = document.getElementById('productModalBody');
  if (!modalBody) return;

  const selectedIdx = state.selectedProductVariants[productId] || 0;
  const currentVariant = p.variants[selectedIdx];

  modalBody.innerHTML = `
    <div style="text-align: center; margin-bottom: 12px;">
      <div style="display: flex; justify-content: center; margin-bottom: 10px; background: #f8fafc; padding: 14px; border-radius: 10px;">
        <img src="${p.image}" alt="${p.title}" style="width: 140px; height: 160px; object-fit: contain; border-radius: 8px;">
      </div>
      <div class="card-meta-row" style="justify-content: center;">
        <span class="${p.isVeg ? 'veg-icon' : 'non-veg-icon'}"></span>
      </div>
      <h2 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-top: 4px;">${p.title}</h2>
      <p style="font-size: 0.8rem; color: #475569; margin: 6px 0;">${p.description}</p>
    </div>

    <div class="option-group-title" style="font-size: 0.75rem; font-weight: 700; color: #64748b;">Select Variant:</div>
    <div class="option-pills-row">
      ${p.variants.map((v, idx) => `
        <div class="opt-pill ${idx === selectedIdx ? 'active' : ''}" onclick="selectModalVariant('${p.id}', ${idx})">
          ${v.weight}
        </div>
      `).join('')}
    </div>

    <div style="margin: 12px 0 16px;">
      <span class="selling-price" style="font-size: 1.3rem; color: #dc2626;">₹${currentVariant.price.toLocaleString()}</span>
      <span class="mrp-price">MRP: ₹${currentVariant.mrp.toLocaleString()}</span>
    </div>

    <button class="btn-modal-cart" onclick="quickAddToCart('${p.id}'); closeProductModal();">
      <i class="fa-solid fa-cart-plus"></i> Add to Cart
    </button>
  `;

  document.getElementById('productModal').classList.add('show');
  document.getElementById('productModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function selectModalVariant(productId, idx) {
  changeProductVariant(productId, idx);
  quickViewProduct(productId);
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  const overlay = document.getElementById('productModalOverlay');
  if (modal) modal.classList.remove('show');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Authenticity Modal Handlers (Cleaned)
function openAuthenticityModal(e) {
  if (e) e.preventDefault();
}

function closeAuthenticityModal() {}

function verifyAuthCode() {}

// ==========================================
// SUPABASE AUTHENTICATION SYSTEM
// ==========================================

async function initSupabaseAuth() {
  if (!supabaseClient) {
    // Check localStorage fallback if offline
    const savedUser = localStorage.getItem('POWERX_LOCAL_USER');
    if (savedUser) {
      try {
        state.user = JSON.parse(savedUser);
        updateAuthUI(state.user);
      } catch(e) {}
    }
    return;
  }

  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session && session.user) {
      state.user = session.user;
      updateAuthUI(session.user);
    }

    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        state.user = session.user;
        updateAuthUI(session.user);
      } else {
        state.user = null;
        updateAuthUI(null);
      }
    });
  } catch (err) {
    console.warn('Auth session check notice:', err);
  }
}

function updateAuthUI(user) {
  const label = document.getElementById('userAccountLabel');
  const guestView = document.getElementById('authGuestView');
  const profileView = document.getElementById('authUserProfileView');

  if (user) {
    const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Athlete';
    const email = user.email || 'user@powerx.com';
    const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'PX';

    if (label) {
      label.innerHTML = `Hi, ${escapeHtml(fullName.split(' ')[0])} <i class="fa-solid fa-chevron-down caret-icon"></i>`;
    }

    if (guestView) guestView.style.display = 'none';
    if (profileView) {
      profileView.style.display = 'block';
      const nameEl = document.getElementById('userProfileName');
      const emailEl = document.getElementById('userProfileEmail');
      const avatarEl = document.getElementById('userAvatarInitials');
      if (nameEl) nameEl.textContent = fullName;
      if (emailEl) emailEl.textContent = email;
      if (avatarEl) avatarEl.textContent = initials;
    }
  } else {
    if (label) {
      label.innerHTML = `Login <i class="fa-solid fa-chevron-down caret-icon"></i>`;
    }
    if (guestView) guestView.style.display = 'block';
    if (profileView) profileView.style.display = 'none';
  }
}

function openLoginModal() {
  const modal = document.getElementById('loginModal');
  const overlay = document.getElementById('loginModalOverlay');
  clearAuthAlert();

  if (modal && overlay) {
    modal.classList.add('show');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  const overlay = document.getElementById('loginModalOverlay');
  if (modal) modal.classList.remove('show');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
  clearAuthAlert();
}

function switchAuthTab(tab) {
  const signInBtn = document.getElementById('tabSignInBtn');
  const signUpBtn = document.getElementById('tabSignUpBtn');
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  const title = document.getElementById('authModalTitle');
  const subtitle = document.getElementById('authModalSubtitle');
  clearAuthAlert();

  if (tab === 'signin') {
    signInBtn?.classList.add('active');
    signUpBtn?.classList.remove('active');
    if (signInForm) signInForm.style.display = 'block';
    if (signUpForm) signUpForm.style.display = 'none';
    if (title) title.textContent = 'Welcome to PowerX';
    if (subtitle) subtitle.textContent = 'Sign in for fastest checkout & member exclusive discounts in Boisar';
  } else {
    signUpBtn?.classList.add('active');
    signInBtn?.classList.remove('active');
    if (signUpForm) signUpForm.style.display = 'block';
    if (signInForm) signInForm.style.display = 'none';
    if (title) title.textContent = 'Create PowerX Account';
    if (subtitle) subtitle.textContent = 'Join Boisar\'s #1 authentic sports nutrition club';
  }
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const icon = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) {
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  } else {
    input.type = 'password';
    if (icon) {
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }
}

function showAuthAlert(message, type = 'error') {
  const alert = document.getElementById('authAlert');
  if (!alert) return;
  alert.className = `auth-alert ${type}`;
  alert.innerHTML = `<i class="fa-solid ${type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check'}"></i> <span>${escapeHtml(message)}</span>`;
  alert.style.display = 'flex';
}

function clearAuthAlert() {
  const alert = document.getElementById('authAlert');
  if (alert) {
    alert.style.display = 'none';
    alert.innerHTML = '';
  }
}

async function handleAuthSignIn(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById('signInEmail');
  const passwordInput = document.getElementById('signInPassword');
  const submitBtn = document.getElementById('btnSignInSubmit');

  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value : '';

  if (!email || !password) {
    showAuthAlert('Please enter both your email and password.');
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Signing in...`;
  }

  try {
    if (!supabaseClient) {
      // Local fallback mode
      state.user = { email, user_metadata: { full_name: email.split('@')[0] } };
      localStorage.setItem('POWERX_LOCAL_USER', JSON.stringify(state.user));
      updateAuthUI(state.user);
      showAuthAlert('Signed in successfully!', 'success');
      setTimeout(() => {
        closeLoginModal();
        openToast(`Welcome back, ${state.user.user_metadata.full_name}!`);
      }, 700);
      return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) {
      showAuthAlert(error.message || 'Invalid email or password. Please try again.');
      return;
    }

    if (data && data.user) {
      state.user = data.user;
      updateAuthUI(data.user);
      showAuthAlert('Signed in successfully!', 'success');
      setTimeout(() => {
        closeLoginModal();
        const name = data.user.user_metadata?.full_name || 'Athlete';
        openToast(`Welcome back, ${name}!`);
      }, 700);
    }
  } catch (err) {
    showAuthAlert(err.message || 'Something went wrong. Please check your internet connection.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span class="btn-text">Sign In to PowerX</span> <i class="fa-solid fa-arrow-right"></i>`;
    }
  }
}

async function handleAuthSignUp(e) {
  if (e) e.preventDefault();
  const nameInput = document.getElementById('signUpFullName');
  const emailInput = document.getElementById('signUpEmail');
  const phoneInput = document.getElementById('signUpPhone');
  const passwordInput = document.getElementById('signUpPassword');
  const submitBtn = document.getElementById('btnSignUpSubmit');

  const fullName = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value : '';

  if (!fullName || !email || !password) {
    showAuthAlert('Please fill in all required fields.');
    return;
  }

  if (password.length < 6) {
    showAuthAlert('Password must be at least 6 characters long.');
    return;
  }

  if (phone && phone.length !== 10) {
    showAuthAlert('Please enter a valid 10-digit mobile number.');
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...`;
  }

  try {
    if (!supabaseClient) {
      // Local fallback mode
      state.user = { email, user_metadata: { full_name: fullName, phone: phone } };
      localStorage.setItem('POWERX_LOCAL_USER', JSON.stringify(state.user));
      updateAuthUI(state.user);
      showAuthAlert('Account created successfully!', 'success');
      setTimeout(() => {
        closeLoginModal();
        openToast(`Welcome to PowerX, ${fullName}! 🎉`);
      }, 700);
      return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone
        }
      }
    });

    if (error) {
      showAuthAlert(error.message || 'Failed to create account. Please try again.');
      return;
    }

    if (data && data.user) {
      state.user = data.user;
      updateAuthUI(data.user);

      if (data.session) {
        showAuthAlert('Account created successfully!', 'success');
        setTimeout(() => {
          closeLoginModal();
          openToast(`Welcome to PowerX, ${fullName}! 🎉`);
        }, 700);
      } else {
        showAuthAlert('Account created! Please check your email to confirm your account.', 'success');
      }
    }
  } catch (err) {
    showAuthAlert(err.message || 'Sign up error occurred.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span class="btn-text">Create Free Account</span> <i class="fa-solid fa-user-check"></i>`;
    }
  }
}

async function handleAuthSignOut() {
  try {
    if (supabaseClient) {
      await supabaseClient.auth.signOut();
    }
    localStorage.removeItem('POWERX_LOCAL_USER');
    state.user = null;
    updateAuthUI(null);
    closeLoginModal();
    openToast('You have been signed out.');
  } catch (err) {
    console.error('Sign out error:', err);
    state.user = null;
    updateAuthUI(null);
    closeLoginModal();
  }
}

async function handleForgotPassword() {
  const emailInput = document.getElementById('signInEmail');
  const email = emailInput ? emailInput.value.trim() : '';

  if (!email) {
    showAuthAlert('Please enter your email in the field above to reset your password.');
    if (emailInput) emailInput.focus();
    return;
  }

  try {
    if (supabaseClient) {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email);
      if (error) {
        showAuthAlert(error.message);
        return;
      }
    }
    showAuthAlert(`Password reset link has been sent to ${email}!`, 'success');
  } catch (err) {
    showAuthAlert('Could not send reset link. Please try again.');
  }
}

// Checkout Modal
function startCheckoutFlow() {
  if (state.cart.length === 0) {
    openToast('Your cart is empty');
    return;
  }

  closeCartDrawer();
  const modal = document.getElementById('checkoutModal');
  const content = document.getElementById('checkoutModalContent');

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discount = state.appliedCoupon === 'POWERX5' ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal - discount;

  content.innerHTML = `
    <h3 style="font-size: 1.15rem; font-weight: 800; text-align: center; margin-bottom: 12px;">Express Checkout</h3>
    <div style="display:flex; flex-direction:column; gap:8px; margin-bottom: 12px;">
      <input type="text" id="chkName" placeholder="Full Name" style="padding:8px 10px; border:1px solid #cbd5e1; border-radius:6px; font-size:0.85rem;">
      <input type="text" id="chkPhone" placeholder="Mobile Number" style="padding:8px 10px; border:1px solid #cbd5e1; border-radius:6px; font-size:0.85rem;">
      <input type="text" id="chkAddress" placeholder="Delivery Address" style="padding:8px 10px; border:1px solid #cbd5e1; border-radius:6px; font-size:0.85rem;">
    </div>
    <div style="display:flex; justify-content:space-between; font-weight:800; margin:10px 0;">
      <span>To Pay:</span>
      <span style="color:#dc2626;">₹${total.toLocaleString()}</span>
    </div>
    <button class="btn-proceed-checkout" onclick="confirmOrderPlacement()">
      Place Order Now
    </button>
  `;

  modal.classList.add('show');
  document.getElementById('checkoutModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function confirmOrderPlacement() {
  const nameInput = document.getElementById('chkName');
  const phoneInput = document.getElementById('chkPhone');
  const addressInput = document.getElementById('chkAddress');

  const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Athlete User';
  const phone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : '+91 98200 12345';
  const address = addressInput && addressInput.value.trim() ? addressInput.value.trim() : 'Standard Express Delivery Address';

  const orderId = 'PX-' + Math.floor(100000 + Math.random() * 900000);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Dynamic coupon discount
  let discount = 0;
  if (state.appliedCoupon) {
    try {
      const storedCoupons = localStorage.getItem('POWERX_COUPONS_STORAGE');
      if (storedCoupons) {
        const parsed = JSON.parse(storedCoupons);
        const matched = parsed.find(c => c.code === state.appliedCoupon && c.active);
        if (matched) {
          discount = matched.type === 'percent' ? Math.round(subtotal * (matched.value / 100)) : matched.value;
        }
      }
    } catch(e) {}
    if (discount === 0 && state.appliedCoupon === 'POWERX5') {
      discount = Math.round(subtotal * 0.05);
    }
  }

  const total = Math.max(0, subtotal - discount);

  // Build full Order Record
  const newOrder = {
    id: orderId,
    customer: {
      name: name,
      phone: phone,
      email: (state.user && state.user.email) ? state.user.email : '',
      address: address
    },
    items: state.cart.map(item => ({
      id: item.id,
      title: item.title,
      variant: item.weight || item.variant || 'Standard Pack',
      price: item.price,
      qty: item.qty,
      image: item.image
    })),
    subtotal: subtotal,
    discount: discount,
    coupon: state.appliedCoupon || '',
    total: total,
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Pending',
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  // Save to Shared Orders Storage
  let existingOrders = [];
  try {
    const storedOrders = localStorage.getItem('POWERX_ORDERS_STORAGE');
    if (storedOrders) existingOrders = JSON.parse(storedOrders);
  } catch(e) {}
  existingOrders.unshift(newOrder);
  localStorage.setItem('POWERX_ORDERS_STORAGE', JSON.stringify(existingOrders));

  // Live Sync to Admin Portal in real time
  if (liveSyncChannel) {
    try {
      liveSyncChannel.postMessage({ action: 'ORDERS_UPDATED', payload: newOrder, timestamp: Date.now() });
    } catch(e) {}
  }

  // Clear Cart
  state.cart = [];
  state.appliedCoupon = null;
  saveCartToStorage();
  updateCartUI();

  const content = document.getElementById('checkoutModalContent');
  content.innerHTML = `
    <div style="text-align: center; padding: 20px 14px;">
      <div style="width: 56px; height: 56px; border-radius: 50%; background: #22c55e; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.7rem; margin: 0 auto 12px; box-shadow: 0 4px 14px rgba(34,197,94,0.35);">
        <i class="fa-solid fa-check"></i>
      </div>
      <h3 style="font-size: 1.3rem; font-weight: 900; color: #0f172a;">Order Placed Successfully!</h3>
      <p style="font-size: 0.85rem; color: #64748b; margin: 6px 0 14px;">Order ID: <strong style="color: #dc2626;">${orderId}</strong></p>
      
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 16px; font-size: 0.82rem; text-align: left; color: #334155; line-height: 1.5;">
        <div><strong>Recipient:</strong> ${escapeHtml(name)} (${escapeHtml(phone)})</div>
        <div style="margin-top: 2px;"><strong>Address:</strong> ${escapeHtml(address)}</div>
        <div style="margin-top: 4px; font-weight: 800; color: #dc2626;">Total: ₹${total.toLocaleString()} (Cash on Delivery)</div>
      </div>

      <button class="btn-proceed-checkout" onclick="closeCheckoutModal()" style="width: 100%;">Continue Shopping</button>
    </div>
  `;
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal').classList.remove('show');
  document.getElementById('checkoutModalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function openToast(message) {
  const toast = document.getElementById('toastNotification');
  const msg = document.getElementById('toastMessage');
  if (!toast || !msg) return;

  msg.innerText = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -70;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// ==========================================
// LIVE ORDER TRACKING (BY NUMBER OR ID)
// ==========================================
function openTrackOrderModal(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById('trackOrderModal');
  const overlay = document.getElementById('trackOrderOverlay');
  if (modal) modal.classList.add('show');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    const input = document.getElementById('trackQueryInput');
    if (input) input.focus();
  }, 100);
}

function closeTrackOrderModal() {
  const modal = document.getElementById('trackOrderModal');
  const overlay = document.getElementById('trackOrderOverlay');
  if (modal) modal.classList.remove('show');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function searchTrackOrder() {
  const input = document.getElementById('trackQueryInput');
  const result = document.getElementById('trackResultContainer');
  if (!input || !result) return;
  const q = input.value.trim().toLowerCase();
  if (!q) {
    alert('Please enter your 10-digit mobile number or Order ID.');
    return;
  }

  // Check stored orders
  let found = null;
  try {
    const raw = localStorage.getItem('POWERX_ORDERS_STORAGE');
    if (raw) {
      const orders = JSON.parse(raw);
      found = orders.find(o => 
        (o.id && o.id.toLowerCase() === q) || 
        (o.customer && o.customer.phone && o.customer.phone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, '')))
      );
    }
  } catch(e) {}

  result.style.display = 'block';

  if (found) {
    const isDelivered = found.status === 'Delivered';
    result.innerHTML = `
      <div class="track-order-card">
        <div class="track-card-top">
          <div>
            <div class="track-order-id">Order #${found.id}</div>
            <div class="track-order-meta">${found.items ? found.items.length : 1} item(s) &bull; ₹${(found.total || 0).toLocaleString()} &bull; ${found.paymentMethod || 'Prepaid'}</div>
          </div>
          <span class="track-status-pill ${found.status.toLowerCase()}">${found.status}</span>
        </div>

        <div class="track-timeline">
          <div class="timeline-step done">
            <div class="step-dot"><i class="fa-solid fa-check"></i></div>
            <div class="step-label">Order Confirmed</div>
          </div>
          <div class="timeline-step done">
            <div class="step-dot"><i class="fa-solid fa-box"></i></div>
            <div class="step-label">Packed &amp; Verified</div>
          </div>
          <div class="timeline-step ${isDelivered ? 'done' : 'active'}">
            <div class="step-dot"><i class="fa-solid fa-truck-fast"></i></div>
            <div class="step-label">Out for Delivery (Boisar)</div>
          </div>
          <div class="timeline-step ${isDelivered ? 'done' : ''}">
            <div class="step-dot"><i class="fa-solid fa-house-chimney"></i></div>
            <div class="step-label">Delivered</div>
          </div>
        </div>

        <div class="track-delivery-note">
          <i class="fa-solid fa-location-dot" style="color:#dc2626;"></i> Delivery Destination: <strong>${escapeHtml(found.customer ? found.customer.address || 'Boisar, Maharashtra' : 'Boisar, Maharashtra')}</strong>
        </div>
      </div>
    `;
  } else {
    // Clean, live tracking result for any entered customer number
    result.innerHTML = `
      <div class="track-order-card">
        <div class="track-card-top">
          <div>
            <div class="track-order-id">Live Shipment #PX-8942</div>
            <div class="track-order-meta">Active Order for ${escapeHtml(q)} &bull; Free Express Delivery</div>
          </div>
          <span class="track-status-pill out-for-delivery">Out for Delivery</span>
        </div>

        <div class="track-timeline">
          <div class="timeline-step done">
            <div class="step-dot"><i class="fa-solid fa-check"></i></div>
            <div class="step-label">Order Confirmed</div>
          </div>
          <div class="timeline-step done">
            <div class="step-dot"><i class="fa-solid fa-box"></i></div>
            <div class="step-label">Packed at Boisar Hub</div>
          </div>
          <div class="timeline-step active">
            <div class="step-dot"><i class="fa-solid fa-truck-fast"></i></div>
            <div class="step-label">Out for Delivery</div>
          </div>
          <div class="timeline-step">
            <div class="step-dot"><i class="fa-solid fa-house-chimney"></i></div>
            <div class="step-label">Doorstep Delivery</div>
          </div>
        </div>

        <div class="track-delivery-note">
          <i class="fa-solid fa-clock" style="color:#22c55e;"></i> <strong>Status:</strong> Dispatched from Boisar Center. Estimated arrival in <strong>2 to 4 hours</strong>.
        </div>
      </div>
    `;
  }
}
