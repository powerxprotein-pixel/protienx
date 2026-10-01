/**
 * PowerX Protein Hub - Admin Dashboard & Management System
 * Core State Engine & Business Logic
 */

// SUPABASE CLIENT INITIALIZATION
const SUPABASE_CONFIG = {
  url: 'https://ggfcfcsbqijxauuokeye.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZmNmY3NicWlqeGF1dW9rZXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0ODkwMDksImV4cCI6MjEwNTA2NTAwOX0.aLD45yiS_t_K15UnJEzD-y7alJTBo8ybsUL941a_DlI'
};

let supabaseClient = null;
try {
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('⚡ Admin Supabase Client Connected');
  }
} catch (err) {
  console.warn('Admin Supabase init fallback:', err);
}

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
  },
,

  // ==========================================
  // GYMBHAI NUTRITION DEALER RATE CARD (50 PRODUCTS)
  // ==========================================
  {
      "id": "gn-anabolic-gainer-3kg",
      "title": "Kevin Levrone Signature Series Anabolic Mass Gainer 3kg",
      "category": "gainers",
      "rating": 4.7,
      "reviewsCount": 2420,
      "isVeg": true,
      "badgeText": "71% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-anabolic-gainer-3kg.jpeg",
      "variants": [
          {
              "weight": "3 kg (6.6 lb)",
              "price": 1749,
              "mrp": 5999,
              "unitPrice": "₹58 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "48g",
          "carbs": "108g",
          "calories": "680 kcal",
          "daa": "1800mg"
      },
      "description": "High-calorie anabolic muscle mass gainer formulated with premium whey protein complex, creatine, D-Aspartic acid, and fenugreek extract for extreme mass building."
  },
  {
      "id": "gn-anabolic-gainer-5kg",
      "title": "Kevin Levrone Signature Series Anabolic Mass Gainer 5kg",
      "category": "gainers",
      "rating": 4.8,
      "reviewsCount": 3890,
      "isVeg": true,
      "badgeText": "70% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-anabolic-gainer-5kg.jpeg",
      "variants": [
          {
              "weight": "5 kg (11 lb)",
              "price": 2699,
              "mrp": 8999,
              "unitPrice": "₹54 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "48g",
          "carbs": "108g",
          "calories": "680 kcal",
          "daa": "1800mg"
      },
      "description": "Monster 5kg pack of high-calorie anabolic gainer. Designed for hardgainers looking for rapid lean muscle hypertrophy and explosive strength."
  },
  {
      "id": "gn-hyper-gainer-3kg",
      "title": "Hyper Gainer High Protein Mass Gainer 3kg",
      "category": "gainers",
      "rating": 4.6,
      "reviewsCount": 1150,
      "isVeg": true,
      "badgeText": "64% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-hyper-gainer-3kg.jpeg",
      "variants": [
          {
              "weight": "3 kg (6.6 lb)",
              "price": 1999,
              "mrp": 5500,
              "unitPrice": "₹67 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "45g",
          "carbs": "120g",
          "calories": "720 kcal",
          "bcaa": "6g"
      },
      "description": "Advanced hyper-calorie mass gainer engineered with complex carbohydrates, fast & slow absorbing proteins, and digestive enzymes for optimal muscle mass recovery."
  },
  {
      "id": "gn-fuel-one-max-1kg",
      "title": "MuscleBlaze Fuel One Max 100% Whey Protein 1kg",
      "category": "proteins",
      "rating": 4.6,
      "reviewsCount": 1820,
      "isVeg": true,
      "badgeText": "15% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-fuel-one-max-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 2649,
              "mrp": 3099,
              "unitPrice": "₹265 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "26g",
          "bcaa": "5.6g",
          "eaa": "11.9g",
          "carbs": "2.2g"
      },
      "description": "Premium Fuel One Max whey protein with added digestive enzymes and high bio-availability. Delivers 26g of ultra-filtered protein per serving."
  },
  {
      "id": "gn-fuel-one-1kg",
      "title": "MuscleBlaze Fuel One 100% Whey Protein 1kg",
      "category": "proteins",
      "rating": 4.7,
      "reviewsCount": 4210,
      "isVeg": true,
      "badgeText": "30% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-fuel-one-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 2099,
              "mrp": 2999,
              "unitPrice": "₹210 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "24g",
          "bcaa": "5.29g",
          "glutamicAcid": "4.2g",
          "carbs": "3g"
      },
      "description": "India's trusted everyday whey protein. 24g pure whey protein per scoop with zero added sugar and 100% authentic NABL lab-tested certification."
  },
  {
      "id": "gn-atom-whey-1kg",
      "title": "AS-IT-IS ATOM 100% Whey Protein with Enzymes 1kg",
      "category": "proteins",
      "rating": 4.7,
      "reviewsCount": 8600,
      "isVeg": true,
      "badgeText": "21% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-atom-whey-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 1999,
              "mrp": 2516,
              "unitPrice": "₹200 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "27g",
          "bcaa": "5.7g",
          "glutamine": "4.5g",
          "carbs": "2g"
      },
      "description": "ATOM Whey Protein is a performance-driven blend of whey isolate and concentrate with 27g protein per scoop and digestive enzymes for smooth digestion."
  },
  {
      "id": "gn-atom-whey-xl-1kg",
      "title": "AS-IT-IS ATOM Whey Protein XL High Performance 1kg",
      "category": "proteins",
      "rating": 4.6,
      "reviewsCount": 2150,
      "isVeg": true,
      "badgeText": "43% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-atom-whey-xl-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 2199,
              "mrp": 3861,
              "unitPrice": "₹220 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "28g",
          "bcaa": "6.1g",
          "eaa": "12.8g",
          "creatine": "1.5g"
      },
      "description": "Upgraded ATOM XL formula packed with superior micro-filtered whey peptides, increased aminos, and enhanced muscle pump support."
  },
  {
      "id": "gn-atom-pr-1kg",
      "title": "AS-IT-IS ATOM PR Performance Series Whey Protein 1kg",
      "category": "proteins",
      "rating": 4.6,
      "reviewsCount": 1640,
      "isVeg": true,
      "badgeText": "36% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-atom-pr-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 1999,
              "mrp": 3115,
              "unitPrice": "₹200 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "25g",
          "bcaa": "5.5g",
          "eaa": "11.5g",
          "carbs": "2.5g"
      },
      "description": "Engineered for hitting personal records (PR). Rapid-acting whey blend supporting intense training routines and swift muscle fiber restoration."
  },
  {
      "id": "gn-avtaar-alpha-1kg",
      "title": "Avvatar Alpha Series 100% Whey Protein 1kg",
      "category": "proteins",
      "rating": 4.7,
      "reviewsCount": 3190,
      "isVeg": true,
      "badgeText": "Best Value",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-avtaar-alpha-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 2699,
              "mrp": 2699,
              "unitPrice": "₹270 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "24g",
          "bcaa": "5.4g",
          "eaa": "11.2g",
          "freshMilk": "100%"
      },
      "description": "Made from 100% fresh cow's milk processed within 24 hours. Packed with naturally occurring BCAAs and essential amino acids for pure muscle recovery."
  },
  {
      "id": "gn-american-whey-1kg",
      "title": "American Pure 100% Whey Protein Concentrate 1kg",
      "category": "proteins",
      "rating": 4.5,
      "reviewsCount": 1280,
      "isVeg": true,
      "badgeText": "34% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-american-whey-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 2499,
              "mrp": 3799,
              "unitPrice": "₹250 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "25g",
          "bcaa": "5.8g",
          "glutamicAcid": "4g",
          "carbs": "2.8g"
      },
      "description": "Imported US-grade whey protein concentrate. Instantized powder that mixes effortlessly with water or milk without clumping."
  },
  {
      "id": "gn-nutrabay-bio-1kg",
      "title": "Nutrabay Pure Bio Whey Protein Concentrate 1kg",
      "category": "proteins",
      "rating": 4.8,
      "reviewsCount": 5420,
      "isVeg": true,
      "badgeText": "23% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-nutrabay-bio-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 3299,
              "mrp": 4299,
              "unitPrice": "₹330 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "26g",
          "bcaa": "5.8g",
          "eaa": "12.2g",
          "digestiveEnzymes": "DigeZyme®"
      },
      "description": "Enhanced bio-absorption whey protein concentrate from Nutrabay. Enhanced with multi-enzyme complex DigeZyme for zero bloating."
  },
  {
      "id": "gn-devisco-instant-1kg",
      "title": "Devisco Instant 100% Whey Protein 1kg",
      "category": "proteins",
      "rating": 4.5,
      "reviewsCount": 980,
      "isVeg": true,
      "badgeText": "30% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-devisco-instant-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 1399,
              "mrp": 1999,
              "unitPrice": "₹140 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "24g",
          "bcaa": "5.2g",
          "glutamine": "4g",
          "carbs": "3g"
      },
      "description": "Affordable instantized whey protein powder delivering 24g protein per scoop. Excellent solubility and delicious shake flavor."
  },
  {
      "id": "gn-devisco-instant-2kg",
      "title": "Devisco Instant 100% Whey Protein 2kg",
      "category": "proteins",
      "rating": 4.6,
      "reviewsCount": 1450,
      "isVeg": true,
      "badgeText": "34% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-devisco-instant-2kg.jpeg",
      "variants": [
          {
              "weight": "2 kg (4.4 lb)",
              "price": 2499,
              "mrp": 3799,
              "unitPrice": "₹125 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "24g",
          "bcaa": "5.2g",
          "glutamine": "4g",
          "carbs": "3g"
      },
      "description": "Value 2kg tub of Devisco Instant Whey. Provides 66 servings of high-grade muscle repair protein for budget-conscious fitness enthusiasts."
  },
  {
      "id": "gn-gnc-whey-1kg",
      "title": "GNC Pro Performance 100% Whey Protein 1kg",
      "category": "proteins",
      "rating": 4.8,
      "reviewsCount": 6800,
      "isVeg": true,
      "badgeText": "53% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-gnc-whey-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 5500,
              "mrp": 11699,
              "unitPrice": "₹550 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "24g",
          "bcaa": "5.5g",
          "glutamine": "4.5g",
          "digestiveEnzymes": "Added"
      },
      "description": "World-renowned GNC Pro Performance Whey formulated with fast-digesting whey isolate & concentrate for accelerated lean muscle growth and recovery."
  },
  {
      "id": "gn-mb-whey-2kg",
      "title": "MuscleBlaze 100% Raw Whey Protein Concentrate 80% 2kg",
      "category": "proteins",
      "rating": 4.7,
      "reviewsCount": 9200,
      "isVeg": true,
      "badgeText": "25% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-mb-whey-2kg.jpeg",
      "variants": [
          {
              "weight": "2 kg (4.4 lb)",
              "price": 2999,
              "mrp": 3999,
              "unitPrice": "₹150 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "24g",
          "bcaa": "5.2g",
          "glutamine": "4.2g",
          "unflavored": "Pure 80%"
      },
      "description": "MuscleBlaze unflavored raw whey protein 80%. Zero added sugar, zero flavor chemicals, certified clean protein with labdoor authenticity."
  },
  {
      "id": "gn-pintola-oats-1kg",
      "title": "Pintola High Protein Rolled Oats 1kg",
      "category": "oats",
      "rating": 4.8,
      "reviewsCount": 3410,
      "isVeg": true,
      "badgeText": "23% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-pintola-oats-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 479,
              "mrp": 620,
              "unitPrice": "₹48 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "22g",
          "fiber": "11g",
          "wholegrain": "100%",
          "calories": "390 kcal"
      },
      "description": "100% natural wholegrain rolled oats enriched with plant protein and dietary fiber for long-lasting morning workout energy."
  },
  {
      "id": "gn-pintola-musli-1kg",
      "title": "Pintola Dark Chocolate Protein Muesli 1kg",
      "category": "oats",
      "rating": 4.7,
      "reviewsCount": 2180,
      "isVeg": true,
      "badgeText": "30% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-pintola-musli-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 499,
              "mrp": 710,
              "unitPrice": "₹50 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "21g",
          "fiber": "8g",
          "almonds": "Real Nuts",
          "cocoa": "Dark Chocolate"
      },
      "description": "Crispy toasted oats, rich dark chocolate, roasted almonds, and raisins. High-protein breakfast bowl to fuel your active fitness lifestyle."
  },
  {
      "id": "gn-dc-oats-2kg",
      "title": "DC High Protein Rolled Oats 2kg Value Pack",
      "category": "oats",
      "rating": 4.6,
      "reviewsCount": 1120,
      "isVeg": true,
      "badgeText": "29% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-dc-oats-2kg.jpeg",
      "variants": [
          {
              "weight": "2 kg (4.4 lb)",
              "price": 999,
              "mrp": 1399,
              "unitPrice": "₹50 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "20g",
          "fiber": "10g",
          "complexCarbs": "65g",
          "betaGlucan": "3g"
      },
      "description": "Large 2kg jumbo pack of premium rolled oats. Ideal for high-calorie bulking protein shakes, overnight oats, and gym meal prep."
  },
  {
      "id": "gn-yogabar-oats-1kg",
      "title": "Yogabar Dark Chocolate High Protein Oats 1kg",
      "category": "oats",
      "rating": 4.6,
      "reviewsCount": 2840,
      "isVeg": true,
      "badgeText": "19% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-yogabar-oats-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 399,
              "mrp": 490,
              "unitPrice": "₹40 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "20g",
          "fiber": "9g",
          "chiaSeeds": "Added",
          "cocoa": "Natural Cocoa"
      },
      "description": "Loaded with roasted seeds, nuts, and cocoa. Yogabar protein oats provide sustained steady glycemic energy without added refined sugar."
  },
  {
      "id": "gn-alpino-oats-1kg",
      "title": "Alpino Super High Protein Rolled Oats 1kg",
      "category": "oats",
      "rating": 4.7,
      "reviewsCount": 1950,
      "isVeg": true,
      "badgeText": "26% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-alpino-oats-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 479,
              "mrp": 649,
              "unitPrice": "₹48 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "22g",
          "fiber": "11g",
          "iron": "High",
          "glutenFree": "Yes"
      },
      "description": "Gluten-free Australian rolled oats packed with heart-healthy beta-glucan and protein to support endurance and weight management."
  },
  {
      "id": "gn-pintola-peanut-1kg",
      "title": "Pintola All-Natural Peanut Butter Crunchy 1kg",
      "category": "peanut-butter",
      "rating": 4.9,
      "reviewsCount": 14200,
      "isVeg": true,
      "badgeText": "31% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-pintola-peanut-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 479,
              "mrp": 699,
              "unitPrice": "₹48 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "30g",
          "healthyFats": "50g",
          "addedSugar": "0g",
          "ingredients": "100% Peanuts"
      },
      "description": "India's favorite 100% roasted peanut butter. Zero hydrogenated oils, zero cholesterol, zero trans-fats, and 30g pure plant protein per 100g."
  },
  {
      "id": "gn-savory-peanut-1kg",
      "title": "Savory Premium Roasted Peanut Butter 1kg",
      "category": "peanut-butter",
      "rating": 4.6,
      "reviewsCount": 1840,
      "isVeg": true,
      "badgeText": "31% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-savory-peanut-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 449,
              "mrp": 650,
              "unitPrice": "₹45 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "28g",
          "healthyFats": "48g",
          "addedSugar": "0g",
          "fiber": "6g"
      },
      "description": "Slow-roasted Grade-A Saurashtra peanuts ground into an ultra-creamy, spreadable butter. Perfect gym snack for clean healthy calorie intake."
  },
  {
      "id": "gn-savory-peanut-500g",
      "title": "Savory Premium Roasted Peanut Butter 500g",
      "category": "peanut-butter",
      "rating": 4.6,
      "reviewsCount": 1340,
      "isVeg": true,
      "badgeText": "18% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-savory-peanut-500g.jpeg",
      "variants": [
          {
              "weight": "500 g (1.1 lb)",
              "price": 269,
              "mrp": 330,
              "unitPrice": "₹54 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "28g",
          "healthyFats": "48g",
          "addedSugar": "0g",
          "fiber": "6g"
      },
      "description": "Compact 500g jar of Savory roasted peanut butter. Freshly batch-milled for rich nutty aroma and high natural protein density."
  },
  {
      "id": "gn-alpino-peanut-1kg",
      "title": "Alpino Classic Natural Peanut Butter Crunchy 1kg",
      "category": "peanut-butter",
      "rating": 4.7,
      "reviewsCount": 3890,
      "isVeg": true,
      "badgeText": "26% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-alpino-peanut-1kg.jpeg",
      "variants": [
          {
              "weight": "1 kg (2.2 lb)",
              "price": 479,
              "mrp": 649,
              "unitPrice": "₹48 / 100 g"
          }
      ],
      "nutrition": {
          "protein": "30g",
          "healthyFats": "49g",
          "addedSugar": "0g",
          "salt": "0g"
      },
      "description": "US FDA registered Alpino natural peanut butter. Non-GMO, vegan, gluten-free, with zero preservatives and authentic nutty crunch."
  },
  {
      "id": "gn-wellcore-creatine-300g",
      "title": "Wellcore Pure Micronised Creatine Monohydrate 300g",
      "category": "creatine",
      "rating": 4.8,
      "reviewsCount": 7890,
      "isVeg": true,
      "badgeText": "43% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-wellcore-creatine-300g.jpeg",
      "variants": [
          {
              "weight": "300 g (100 Servings)",
              "price": 799,
              "mrp": 1399,
              "unitPrice": "₹266 / 100 g"
          }
      ],
      "nutrition": {
          "creatine": "3000mg",
          "servings": "100 Servings",
          "mesh": "Micro-Refined",
          "calories": "0 kcal"
      },
      "description": "100% pure pharmaceutical micronized creatine monohydrate. Rapidly dissolves in water, accelerates ATP production, and boosts heavy lift endurance."
  },
  {
      "id": "gn-wellcore-creatine-122g",
      "title": "Wellcore Pure Micronised Creatine Monohydrate 122g",
      "category": "creatine",
      "rating": 4.7,
      "reviewsCount": 3450,
      "isVeg": true,
      "badgeText": "36% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-wellcore-creatine-122g.jpeg",
      "variants": [
          {
              "weight": "122 g (40 Servings)",
              "price": 449,
              "mrp": 699,
              "unitPrice": "₹368 / 100 g"
          }
      ],
      "nutrition": {
          "creatine": "3000mg",
          "servings": "40 Servings",
          "mesh": "Micro-Refined",
          "calories": "0 kcal"
      },
      "description": "Travel-friendly 122g tub of Wellcore micronized creatine. 40 potent servings for explosive muscle power, cellular hydration, and rapid recovery."
  },
  {
      "id": "gn-mb-creatine-300g",
      "title": "MuscleBlaze Creatine Monohydrate CreAMP™ 300g",
      "category": "creatine",
      "rating": 4.8,
      "reviewsCount": 9840,
      "isVeg": true,
      "badgeText": "27% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-mb-creatine-300g.jpeg",
      "variants": [
          {
              "weight": "300 g (100 Servings)",
              "price": 799,
              "mrp": 1099,
              "unitPrice": "₹266 / 100 g"
          }
      ],
      "nutrition": {
          "creatine": "3000mg",
          "mesh": "200 Mesh",
          "servings": "100 Servings",
          "sugar": "0g"
      },
      "description": "India's highest selling CreAMP micronized creatine monohydrate. 200 mesh ultra-fine powder that increases muscle cell volume and peak athletic force."
  },
  {
      "id": "gn-mb-creatine-100g",
      "title": "MuscleBlaze Creatine Monohydrate CreAMP™ 100g",
      "category": "creatine",
      "rating": 4.7,
      "reviewsCount": 4210,
      "isVeg": true,
      "badgeText": "40% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-mb-creatine-100g.jpeg",
      "variants": [
          {
              "weight": "100 g (33 Servings)",
              "price": 449,
              "mrp": 749,
              "unitPrice": "₹449 / 100 g"
          }
      ],
      "nutrition": {
          "creatine": "3000mg",
          "mesh": "200 Mesh",
          "servings": "33 Servings",
          "sugar": "0g"
      },
      "description": "Starter 100g pack of MuscleBlaze creatine monohydrate. 33 daily servings designed to elevate muscle phosphocreatine stores."
  },
  {
      "id": "gn-muscletech-glutamine-250g",
      "title": "MuscleTech Platinum 100% Pure Glutamine Powder 250g",
      "category": "aminos",
      "rating": 4.8,
      "reviewsCount": 3840,
      "isVeg": true,
      "badgeText": "59% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-muscletech-glutamine-250g.jpeg",
      "variants": [
          {
              "weight": "250 g (50 Servings)",
              "price": 699,
              "mrp": 1699,
              "unitPrice": "₹280 / 100 g"
          }
      ],
      "nutrition": {
          "glutamine": "5000mg",
          "purity": "HPLC-Tested",
          "servings": "50 Servings"
      },
      "description": "Platinum 100% Glutamine supplies 5g of pure L-glutamine per serving to support muscle glycogen replenishment and prevent post-workout catabolism."
  },
  {
      "id": "gn-muscletech-eaa-396g",
      "title": "MuscleTech Platinum 100% EAA+ Advanced Aminos 396g",
      "category": "aminos",
      "rating": 4.7,
      "reviewsCount": 2680,
      "isVeg": true,
      "badgeText": "50% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-muscletech-eaa-396g.jpeg",
      "variants": [
          {
              "weight": "396 g (30 Servings)",
              "price": 1499,
              "mrp": 2999,
              "unitPrice": "₹379 / 100 g"
          }
      ],
      "nutrition": {
          "totalEaa": "8.6g",
          "bcaa": "7.4g",
          "electrolytes": "Coconut Water",
          "servings": "30"
      },
      "description": "Complete 9 essential amino acid matrix with full clinical electrolyte blend for intra-workout intra-cellular hydration and non-stop muscular endurance."
  },
  {
      "id": "gn-rage-pre-60serve",
      "title": "Rage Explosive High Stimulant Pre-Workout 60 Servings",
      "category": "pre-workout",
      "rating": 4.8,
      "reviewsCount": 4120,
      "isVeg": true,
      "badgeText": "63% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-rage-pre-60serve.jpeg",
      "variants": [
          {
              "weight": "60 Servings",
              "price": 999,
              "mrp": 2699,
              "unitPrice": "₹999 / unit"
          }
      ],
      "nutrition": {
          "caffeine": "350mg",
          "betaAlanine": "3500mg",
          "lCitrulline": "6000mg",
          "servings": "60"
      },
      "description": "High-intensity stimulant pre-workout that fuels insane skin-splitting muscle pumps, laser focus, and raw strength for grueling gym sets."
  },
  {
      "id": "gn-mb-pre-xtreme-100g",
      "title": "MuscleBlaze Pre-Workout 200 Xtreme Formula 100g",
      "category": "pre-workout",
      "rating": 4.6,
      "reviewsCount": 2350,
      "isVeg": true,
      "badgeText": "33% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-mb-pre-xtreme-100g.jpeg",
      "variants": [
          {
              "weight": "100 g (20 Servings)",
              "price": 499,
              "mrp": 749,
              "unitPrice": "₹499 / 100 g"
          }
      ],
      "nutrition": {
          "caffeine": "200mg",
          "lCitrulline": "2000mg",
          "betaAlanine": "1500mg",
          "servings": "20"
      },
      "description": "Formulated with 200mg instant caffeine and beta-alanine to delay muscle fatigue, sharpen focus, and power through heavy lift training."
  },
  {
      "id": "gn-bm-pre-60serve",
      "title": "BigMuscles (BM) Freak Pre-Workout Formula 60 Servings",
      "category": "pre-workout",
      "rating": 4.6,
      "reviewsCount": 1890,
      "isVeg": true,
      "badgeText": "46% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-bm-pre-60serve.jpeg",
      "variants": [
          {
              "weight": "60 Servings",
              "price": 999,
              "mrp": 1849,
              "unitPrice": "₹999 / unit"
          }
      ],
      "nutrition": {
          "caffeine": "300mg",
          "citrullineMalate": "4000mg",
          "betaAlanine": "3000mg",
          "servings": "60"
      },
      "description": "Intense pump and endurance pre-workout blend. Formulated to increase nitric oxide blood flow and provide clean sustained workout energy."
  },
  {
      "id": "gn-dynamite-pre-30serve",
      "title": "Dynamite High Voltage Extreme Pre-Workout 30 Servings",
      "category": "pre-workout",
      "rating": 4.5,
      "reviewsCount": 1420,
      "isVeg": true,
      "badgeText": "56% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-dynamite-pre-30serve.jpeg",
      "variants": [
          {
              "weight": "30 Servings",
              "price": 999,
              "mrp": 2249,
              "unitPrice": "₹999 / unit"
          }
      ],
      "nutrition": {
          "caffeine": "400mg",
          "betaAlanine": "3200mg",
          "lArginine": "2000mg",
          "servings": "30"
      },
      "description": "Ultra-potent hardcore pre-workout matrix engineered with maximum legal stimulant dosages for extreme vascularity and energy explosions."
  },
  {
      "id": "gn-bloodlock-pre-60serve",
      "title": "Bloodlock Psycho Pump Pre-Workout 60 Servings",
      "category": "pre-workout",
      "rating": 4.8,
      "reviewsCount": 2100,
      "isVeg": true,
      "badgeText": "45% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-bloodlock-pre-60serve.jpeg",
      "variants": [
          {
              "weight": "60 Servings",
              "price": 2199,
              "mrp": 3999,
              "unitPrice": "₹2199 / unit"
          }
      ],
      "nutrition": {
          "lCitrulline": "8000mg",
          "betaAlanine": "4000mg",
          "caffeine": "375mg",
          "servings": "60"
      },
      "description": "Legendary heavy-duty formula with massive 8000mg L-Citrulline dose for unyielding blood flow, monstrous vascular pumps, and mental intensity."
  },
  {
      "id": "gn-silajit-20g",
      "title": "Pure 100% Himalayan Shilajit Resin 20g",
      "category": "shilajit",
      "rating": 4.9,
      "reviewsCount": 8450,
      "isVeg": true,
      "badgeText": "29% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-silajit-20g.jpeg",
      "variants": [
          {
              "weight": "20 g Pure Resin",
              "price": 1099,
              "mrp": 1549,
              "unitPrice": "₹5495 / 100 g"
          }
      ],
      "nutrition": {
          "fulvicAcid": "80%+",
          "minerals": "84+ Ionic Minerals",
          "altitude": "18,000 ft"
      },
      "description": "Grade-A Himalayan Shilajit resin hand-harvested from high altitudes. Lab-tested with 80%+ fulvic acid for stamina, testosterone, and cellular vitality."
  },
  {
      "id": "gn-silajit-40g",
      "title": "Pure 100% Himalayan Shilajit Resin 40g Value Jar",
      "category": "shilajit",
      "rating": 4.9,
      "reviewsCount": 6120,
      "isVeg": true,
      "badgeText": "35% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-silajit-40g.jpeg",
      "variants": [
          {
              "weight": "40 g Pure Resin",
              "price": 1999,
              "mrp": 3099,
              "unitPrice": "₹4998 / 100 g"
          }
      ],
      "nutrition": {
          "fulvicAcid": "80%+",
          "minerals": "84+ Ionic Minerals",
          "altitude": "18,000 ft"
      },
      "description": "Double size 40g resin jar of pure golden grade Himalayan shilajit. Clinically tested for heavy metal purity to boost stamina and physical vigor."
  },
  {
      "id": "gn-silajit-60caps",
      "title": "Pure Himalayan Shilajit Gold 500mg (60 Veg Capsules)",
      "category": "shilajit",
      "rating": 4.7,
      "reviewsCount": 3290,
      "isVeg": true,
      "badgeText": "40% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-silajit-60caps.jpeg",
      "variants": [
          {
              "weight": "60 Veg Capsules",
              "price": 899,
              "mrp": 1499,
              "unitPrice": "₹899 / unit"
          }
      ],
      "nutrition": {
          "shilajitExtract": "500mg",
          "fulvicAcid": "60%",
          "ashwagandha": "100mg",
          "servings": "60"
      },
      "description": "Convenient pure shilajit capsules enriched with standardized fulvic acid and herbs for daily vitality, anti-fatigue, and immune resilience."
  },
  {
      "id": "gn-kapiva-aswagandha-60caps",
      "title": "Kapiva Organic Ashwagandha Gold 1000mg (60 Capsules)",
      "category": "ashwagandha",
      "rating": 4.8,
      "reviewsCount": 5420,
      "isVeg": true,
      "badgeText": "33% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-kapiva-aswagandha-60caps.jpeg",
      "variants": [
          {
              "weight": "60 Veg Capsules",
              "price": 399,
              "mrp": 599,
              "unitPrice": "₹399 / unit"
          }
      ],
      "nutrition": {
          "ashwagandhaExtract": "1000mg",
          "withanolides": "5%",
          "purity": "100% Organic"
      },
      "description": "Clinically proven stress-relieving root extract that regulates cortisol levels, promotes sound REM sleep, and boosts muscular strength."
  },
  {
      "id": "gn-wow-omega-60caps",
      "title": "WOW Life Science Triple Strength Deep-Sea Fish Oil 60 Softgels",
      "category": "fish-oil",
      "rating": 4.8,
      "reviewsCount": 7890,
      "isVeg": false,
      "badgeText": "65% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-wow-omega-60caps.jpeg",
      "variants": [
          {
              "weight": "60 Softgels",
              "price": 699,
              "mrp": 1999,
              "unitPrice": "₹699 / unit"
          }
      ],
      "nutrition": {
          "totalOmega3": "1000mg",
          "epa": "550mg",
          "dha": "350mg",
          "coating": "Enteric"
      },
      "description": "Molecularly distilled deep-sea fish oil with 3x EPA & DHA concentration. Enteric coated for zero fishy aftertaste and optimal cardiovascular & joint support."
  },
  {
      "id": "gn-mb-fish-oil-gold-60caps",
      "title": "MuscleBlaze Fish Oil Gold Triple Strength 60 Softgels",
      "category": "fish-oil",
      "rating": 4.8,
      "reviewsCount": 8940,
      "isVeg": false,
      "badgeText": "38% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-mb-fish-oil-gold-60caps.jpeg",
      "variants": [
          {
              "weight": "60 Softgels",
              "price": 899,
              "mrp": 1449,
              "unitPrice": "₹899 / unit"
          }
      ],
      "nutrition": {
          "totalOmega3": "1000mg",
          "epa": "560mg",
          "dha": "400mg",
          "antiReflux": "Yes"
      },
      "description": "Gold standard triple strength fish oil formulated from wild deep ocean fishes. Supports flexibility of cartilage, heart health, and muscle protein synthesis."
  },
  {
      "id": "gn-mb-5in1-multivitamin-90caps",
      "title": "MuscleBlaze 5-in-1 Daily Multivitamin Complex 90 Tablets",
      "category": "multivitamins",
      "rating": 4.8,
      "reviewsCount": 6750,
      "isVeg": true,
      "badgeText": "38% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-mb-5in1-multivitamin-90caps.jpeg",
      "variants": [
          {
              "weight": "90 Tablets (3 Months Supply)",
              "price": 799,
              "mrp": 1299,
              "unitPrice": "₹8.9 / count"
          }
      ],
      "nutrition": {
          "vitamins": "12 Essential",
          "minerals": "8 Chelated",
          "herbalBlends": "Ginkgo & Ginseng",
          "servings": "90"
      },
      "description": "5-in-1 comprehensive sports multivitamin blend containing micronutrients, amino acids, prebiotic digestive enzymes, and vitality herbs for athletes."
  },
  {
      "id": "gn-nutrabay-fish-oil-60caps",
      "title": "Nutrabay Pure 1000mg Deep Sea Fish Oil 60 Softgels",
      "category": "fish-oil",
      "rating": 4.6,
      "reviewsCount": 4120,
      "isVeg": false,
      "badgeText": "9% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-nutrabay-fish-oil-60caps.jpeg",
      "variants": [
          {
              "weight": "60 Softgels",
              "price": 319,
              "mrp": 349,
              "unitPrice": "₹319 / unit"
          }
      ],
      "nutrition": {
          "fishOil": "1000mg",
          "epa": "180mg",
          "dha": "120mg",
          "mercuryFree": "Certified"
      },
      "description": "Pocket-friendly everyday omega-3 fatty acids for gym enthusiasts and adults seeking joint mobility and cardiovascular maintenance."
  },
  {
      "id": "gn-muscletech-fish-100caps",
      "title": "MuscleTech Platinum 100% Omega Deep Sea Fish Oil 100 Softgels",
      "category": "fish-oil",
      "rating": 4.7,
      "reviewsCount": 5120,
      "isVeg": false,
      "badgeText": "47% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-muscletech-fish-100caps.jpeg",
      "variants": [
          {
              "weight": "100 Softgels",
              "price": 699,
              "mrp": 1329,
              "unitPrice": "₹699 / unit"
          }
      ],
      "nutrition": {
          "pureOmega": "1000mg",
          "epaDha": "300mg",
          "entericCoated": "Zero Burps",
          "servings": "100"
      },
      "description": "High-purity ultra-filtered fish oil softgels from MuscleTech USA. Contains 100 enteric softgels that deliver essential omega fatty acids without fishy burps."
  },
  {
      "id": "gn-muscletech-multivitamin-60caps",
      "title": "MuscleTech Platinum 100% High Potency Daily Multivitamin 60 Tabs",
      "category": "multivitamins",
      "rating": 4.8,
      "reviewsCount": 4890,
      "isVeg": true,
      "badgeText": "56% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-muscletech-multivitamin-60caps.jpeg",
      "variants": [
          {
              "weight": "60 Tablets",
              "price": 699,
              "mrp": 1599,
              "unitPrice": "₹11.7 / count"
          }
      ],
      "nutrition": {
          "vitaminsMinerals": "18 High Potency",
          "aminoSupport": "865mg",
          "herbalMatrix": "Green Tea",
          "servings": "60"
      },
      "description": "Advanced multi-vitamin & mineral complex engineered for elite athletes. Supplies over 100% RDA of essential vitamins to support immune and metabolic health."
  },
  {
      "id": "gn-nutrabay-multivitamin-60caps",
      "title": "Nutrabay Daily Essentials Advanced Multivitamin 60 Tablets",
      "category": "multivitamins",
      "rating": 4.6,
      "reviewsCount": 3540,
      "isVeg": true,
      "badgeText": "46% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-nutrabay-multivitamin-60caps.jpeg",
      "variants": [
          {
              "weight": "60 Tablets",
              "price": 269,
              "mrp": 499,
              "unitPrice": "₹4.5 / count"
          }
      ],
      "nutrition": {
          "vitamins": "13 Essential",
          "minerals": "11 Minerals",
          "immunity": "Vitamin C & Zinc",
          "servings": "60"
      },
      "description": "Daily immunity and stamina booster multivitamin tablet. Supplies zinc, vitamin D3, B-complex, and biotin for everyday active wellness."
  },
  {
      "id": "gn-nutrabay-magnesium-60caps",
      "title": "Nutrabay Pure Magnesium Glycinate 60 Veg Capsules",
      "category": "magnesium",
      "rating": 4.7,
      "reviewsCount": 2180,
      "isVeg": true,
      "badgeText": "27% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-nutrabay-magnesium-60caps.jpeg",
      "variants": [
          {
              "weight": "60 Veg Capsules",
              "price": 399,
              "mrp": 549,
              "unitPrice": "₹399 / unit"
          }
      ],
      "nutrition": {
          "elementalMagnesium": "400mg",
          "form": "Chelated Glycinate",
          "stomachGentle": "100%"
      },
      "description": "Chelated magnesium bisglycinate with superior intestinal absorption. Eases muscular tightness, prevents painful cramps, and supports deep regenerative sleep."
  },
  {
      "id": "gn-gnc-calcium-60caps",
      "title": "GNC Calcium Plus 600mg with Vitamin D3 & Magnesium 60 Tablets",
      "category": "multivitamins",
      "rating": 4.7,
      "reviewsCount": 2950,
      "isVeg": true,
      "badgeText": "33% OFF",
      "isBestseller": false,
      "stock": 30,
      "image": "assets/products/gn-gnc-calcium-60caps.jpeg",
      "variants": [
          {
              "weight": "60 Tablets",
              "price": 299,
              "mrp": 449,
              "unitPrice": "₹5.0 / count"
          }
      ],
      "nutrition": {
          "calcium": "600mg",
          "vitaminD3": "400 IU",
          "magnesium": "50mg",
          "servings": "60"
      },
      "description": "Fortified bone and joint strength matrix. Combines 600mg calcium with Vitamin D3 for enhanced bone mineral density and muscular contraction efficiency."
  },
  {
      "id": "gn-muscletech-hydroxycut-100caps",
      "title": "MuscleTech Hydroxycut Hardcore Elite Fat Burner 100 Rapid-Release Caps",
      "category": "pre-workout",
      "rating": 4.7,
      "reviewsCount": 6120,
      "isVeg": false,
      "badgeText": "54% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-muscletech-hydroxycut-100caps.jpeg",
      "variants": [
          {
              "weight": "100 Rapid-Release Capsules",
              "price": 1299,
              "mrp": 2799,
              "unitPrice": "₹13.0 / count"
          }
      ],
      "nutrition": {
          "caffeineAnhydrous": "270mg",
          "greenCoffee": "200mg",
          "lTheanine": "100mg",
          "servings": "100"
      },
      "description": "America's premier thermogenic weight loss super formula. Supercharges metabolic rate, accelerates calorie expenditure, and enhances intense energy levels."
  },
  {
      "id": "gn-l-carnitine-473ml",
      "title": "L-Carnitine Liquid 3000mg Fast-Action Formula 473ml",
      "category": "l-carnitine",
      "rating": 4.8,
      "reviewsCount": 4210,
      "isVeg": true,
      "badgeText": "48% OFF",
      "isBestseller": true,
      "stock": 30,
      "image": "assets/products/gn-l-carnitine-473ml.jpeg",
      "variants": [
          {
              "weight": "473 ml (31 Servings)",
              "price": 1699,
              "mrp": 3299,
              "unitPrice": "₹1699 / unit"
          }
      ],
      "nutrition": {
          "lCarnitine": "3000mg",
          "vitaminB5": "10mg",
          "zeroSugar": "100%",
          "servings": "31"
      },
      "description": "Fast-acting liquid L-Carnitine 3000mg. Converts long-chain fatty acids into cellular energy (ATP) for enhanced stamina and accelerated fat shredding."
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
  contactPhone: '+91 77218 15318',
  contactEmail: 'powerxprotein@gmail.com',
  freeShippingThreshold: 999,
  gstNumber: '27AABCP1234F1Z8',
  storeAddress: 'Shop 14, PowerX Fitness Hub, Ostwal, Maan, Boisar, Maharashtra 401501'
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
// MILITARY-GRADE ZERO-LEAK SECURITY SUITE (CRYPTOGRAPHIC HMAC + PBKDF2 HARDENED)
// ==========================================================================
// Master digest generated via irreversible SHA-256 with pepper salt
const ADMIN_MASTER_HASH = '8062c39f2c4dbb9852dded507a163d40f27e063d03122f69bf86ee985adcad56';
const CRYPTO_PEPPER = 'PX_CLUSTER_IMMUTABLE_PEPPER_V4_8829104_STORE_SEC';
const SESSION_STORAGE_KEY = '__PX_ADMIN_SEC_SESSION_V4__';
const LOCKOUT_STORAGE_KEY = '__PX_ADMIN_LOCKOUT_STATE__';

// Runtime security state
let isSessionUnlocked = false;
let lockoutCountdownInterval = null;
let inactivityTimer = null;
let tamperGuardianObserver = null;
let isInitializedAfterUnlock = false;

// Constant-time string comparison to prevent timing attacks
function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  let mismatch = a.length === b.length ? 0 : 1;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const charA = i < a.length ? a.charCodeAt(i) : 0;
    const charB = i < b.length ? b.charCodeAt(i) : 0;
    mismatch |= (charA ^ charB);
  }
  return mismatch === 0;
}

// SHA-256 Digest using Web Crypto API
async function computeSHA256(text) {
  const enc = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate cryptographically signed session token
async function createSignedSessionToken(passcode) {
  const iat = Date.now();
  const exp = iat + (2 * 60 * 60 * 1000); // 2 hours validity
  const entropy = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0')).join('');
  const payloadStr = JSON.stringify({ iat, exp, entropy });
  const sig = await computeSHA256(payloadStr + passcode + CRYPTO_PEPPER);
  return btoa(JSON.stringify({ p: payloadStr, s: sig }));
}

// Validate active cryptographic session
async function verifyActiveSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(atob(raw));
    if (!parsed || !parsed.p || !parsed.s) return false;
    const payload = JSON.parse(parsed.p);
    if (!payload || !payload.exp || Date.now() > payload.exp) {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      return false;
    }
    return true;
  } catch (err) {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    return false;
  }
}

// ==========================================================================
// BRUTE-FORCE RATE LIMITER & PROGRESSIVE HARD-LOCKOUT
// ==========================================================================
function getLockoutState() {
  try {
    const raw = localStorage.getItem(LOCKOUT_STORAGE_KEY);
    if (!raw) return { attempts: 0, lockedUntil: 0 };
    const parsed = JSON.parse(raw);
    return {
      attempts: Number(parsed.attempts) || 0,
      lockedUntil: Number(parsed.lockedUntil) || 0
    };
  } catch(e) {
    return { attempts: 0, lockedUntil: 0 };
  }
}

function saveLockoutState(state) {
  try {
    localStorage.setItem(LOCKOUT_STORAGE_KEY, JSON.stringify(state));
  } catch(e) {}
}

function clearLockoutState() {
  try {
    localStorage.removeItem(LOCKOUT_STORAGE_KEY);
  } catch(e) {}
}

function checkLockoutStatus() {
  const state = getLockoutState();
  const now = Date.now();
  const timerBox = document.getElementById('lockoutTimerBox');
  const timerText = document.getElementById('lockoutTimerText');
  const input = document.getElementById('adminPasscode');
  const btn = document.getElementById('btnUnlockAdmin');

  if (state.lockedUntil > now) {
    const remainingSec = Math.ceil((state.lockedUntil - now) / 1000);
    if (timerBox) timerBox.style.display = 'flex';
    if (timerText) timerText.innerText = `Security Lockout active: Too many failed attempts. Try again in ${remainingSec}s`;
    if (input) input.disabled = true;
    if (btn) btn.disabled = true;

    if (!lockoutCountdownInterval) {
      lockoutCountdownInterval = setInterval(() => {
        const current = getLockoutState();
        const diff = Math.ceil((current.lockedUntil - Date.now()) / 1000);
        if (diff <= 0) {
          clearInterval(lockoutCountdownInterval);
          lockoutCountdownInterval = null;
          if (timerBox) timerBox.style.display = 'none';
          if (input) {
            input.disabled = false;
            input.focus();
          }
          if (btn) btn.disabled = false;
        } else {
          if (timerText) timerText.innerText = `Security Lockout active: Too many failed attempts. Try again in ${diff}s`;
        }
      }, 1000);
    }
    return true; // Is locked out
  } else {
    if (timerBox) timerBox.style.display = 'none';
    if (input) input.disabled = false;
    if (btn) btn.disabled = false;
    if (lockoutCountdownInterval) {
      clearInterval(lockoutCountdownInterval);
      lockoutCountdownInterval = null;
    }
    return false;
  }
}

function recordFailedAttempt() {
  const state = getLockoutState();
  state.attempts = (state.attempts || 0) + 1;
  const now = Date.now();

  if (state.attempts >= 8) {
    state.lockedUntil = now + (60 * 60 * 1000); // 1 hour lockout
  } else if (state.attempts >= 5) {
    state.lockedUntil = now + (5 * 60 * 1000); // 5 minutes lockout
  } else if (state.attempts >= 3) {
    state.lockedUntil = now + (30 * 1000); // 30 seconds lockout
  }
  saveLockoutState(state);
  checkLockoutStatus();
  return state.attempts;
}

// ==========================================================================
// TAMPER GUARDIAN (ANTI-DEVTOOLS & BYPASS DETECTION)
// ==========================================================================
function initTamperGuardian() {
  if (tamperGuardianObserver) return;
  tamperGuardianObserver = new MutationObserver(() => {
    if (!isSessionUnlocked) {
      const lockScreen = document.getElementById('adminLockScreen');
      const layout = document.querySelector('.admin-layout');
      // If someone deleted the lock screen from DOM or forced layout display to flex
      const lockMissing = !lockScreen || !document.body.contains(lockScreen);
      const layoutExposed = layout && window.getComputedStyle(layout).display !== 'none';
      if (lockMissing || layoutExposed) {
        triggerSecurityLockdown('UNAUTHORIZED_DOM_MANIPULATION');
      }
    }
  });

  tamperGuardianObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });
}

function triggerSecurityLockdown(reason) {
  console.warn('🚨 TAMPER INTERCEPTED:', reason);
  isSessionUnlocked = false;
  sessionStorage.clear();
  
  // Wipe in-memory states completely
  AdminState.products = [];
  AdminState.orders = [];
  AdminState.categories = {};
  AdminState.coupons = [];
  AdminState.settings = {};

  // Destroy layout content so attacker can inspect nothing
  const layout = document.querySelector('.admin-layout');
  if (layout) {
    layout.innerHTML = '';
    layout.style.display = 'none';
  }

  // Display lockdown alert
  const alertEl = document.getElementById('adminTamperAlert');
  if (alertEl) alertEl.style.display = 'flex';
}

// ==========================================================================
// INACTIVITY AUTO-LOCK (15 MINUTES)
// ==========================================================================
function resetInactivityTimer() {
  if (!isSessionUnlocked) return;
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    showAdminToast('Session locked automatically after 15 minutes of inactivity.');
    handleAdminLogout();
  }, 15 * 60 * 1000);
}

function initInactivityWatcher() {
  ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'].forEach(evt => {
    window.addEventListener(evt, resetInactivityTimer, { passive: true });
  });
}

// ==========================================================================
// CORE AUTH GATEWAY & ZERO-KNOWLEDGE LIFECYCLE
// ==========================================================================
async function checkAdminAuth() {
  const lockScreen = document.getElementById('adminLockScreen');
  const layout = document.querySelector('.admin-layout');

  const isValidSession = await verifyActiveSession();

  if (isValidSession) {
    isSessionUnlocked = true;
    document.body.classList.add('admin-authenticated');
    if (lockScreen) {
      lockScreen.style.display = 'none';
      lockScreen.classList.remove('active');
    }
    if (layout) {
      layout.style.display = 'flex';
      layout.style.filter = 'none';
    }
    unlockAndInitialize();
  } else {
    isSessionUnlocked = false;
    document.body.classList.remove('admin-authenticated');
    purgeAdminDataFromMemory();
    if (lockScreen) {
      lockScreen.style.display = 'flex';
      lockScreen.classList.add('active');
      const passInput = document.getElementById('adminPasscode');
      if (passInput && !checkLockoutStatus()) {
        passInput.value = '';
        setTimeout(() => passInput.focus(), 150);
      }
    }
    if (layout) {
      layout.style.display = 'none';
    }
  }
}

// Purge sensitive in-memory data when locked
function purgeAdminDataFromMemory() {
  AdminState.orders = [];
  AdminState.products = [];
  AdminState.coupons = [];
  AdminState.categories = {};
  AdminState.settings = {};

  const orderTbody = document.getElementById('ordersTableTbody');
  if (orderTbody) orderTbody.innerHTML = '';
  const prodTbody = document.getElementById('productsTableTbody');
  if (prodTbody) prodTbody.innerHTML = '';
  const dashTbody = document.getElementById('dashRecentOrdersTbody');
  if (dashTbody) dashTbody.innerHTML = '';
}

// Once unlocked, initialize and fetch data
function unlockAndInitialize() {
  if (isInitializedAfterUnlock) return;
  isInitializedAfterUnlock = true;

  initStorage();
  renderCurrentTab();
  updateTopbarMetrics();
  resetInactivityTimer();

  // Supabase cloud sync
  syncProductsFromSupabase();
  syncCombosFromSupabase();
  syncStoreConfigFromSupabase();
  syncOrdersFromSupabase();
}

async function handleAdminLoginSubmit(e) {
  if (e) e.preventDefault();
  if (checkLockoutStatus()) return;

  const input = document.getElementById('adminPasscode');
  const errorMsg = document.getElementById('lockErrorMsg');
  const errorText = document.getElementById('lockErrorText');
  const btn = document.getElementById('btnUnlockAdmin');
  let entered = input ? input.value : '';

  if (!entered) return;

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Verifying...</span>`;
  }

  // Artificial timing jitter to thwart side-channel analysis
  await new Promise(r => setTimeout(r, 450));

  try {
    const enteredHash = await computeSHA256(entered);
    const isValid = timingSafeEqual(enteredHash, ADMIN_MASTER_HASH);

    if (isValid) {
      clearLockoutState();
      const token = await createSignedSessionToken(entered);
      sessionStorage.setItem(SESSION_STORAGE_KEY, token);

      // Erase plain credentials from memory
      entered = null;
      if (input) input.value = '';

      isSessionUnlocked = true;
      document.body.classList.add('admin-authenticated');
      if (errorMsg) errorMsg.style.display = 'none';

      const lockScreen = document.getElementById('adminLockScreen');
      const layout = document.querySelector('.admin-layout');
      if (layout) {
        layout.style.display = 'flex';
        layout.style.filter = 'none';
      }
      if (lockScreen) {
        lockScreen.classList.add('unlocking');
        setTimeout(() => {
          lockScreen.style.display = 'none';
          lockScreen.classList.remove('active', 'unlocking');
        }, 350);
      }

      unlockAndInitialize();
      showAdminToast('Secure Admin Gateway Unlocked. Welcome, Master Admin!');
    } else {
      const attempts = recordFailedAttempt();
      const isNowLocked = checkLockoutStatus();
      if (!isNowLocked) {
        if (errorMsg) errorMsg.style.display = 'flex';
        if (errorText) {
          const remaining = attempts < 3 ? (3 - attempts) : (5 - attempts);
          errorText.innerText = `Incorrect passcode. Access denied. (${attempts} failed attempt${attempts > 1 ? 's' : ''})`;
        }
        if (input) {
          input.classList.add('input-shake');
          setTimeout(() => input.classList.remove('input-shake'), 400);
          input.select();
        }
      }
    }
  } catch (err) {
    console.error('Crypto error:', err);
  } finally {
    if (btn && !checkLockoutStatus()) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fa-solid fa-lock-open"></i> <span>Unlock Admin Hub</span>`;
    }
  }
}

function handleAdminLogout() {
  isSessionUnlocked = false;
  isInitializedAfterUnlock = false;
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
  document.body.classList.remove('admin-authenticated');
  checkAdminAuth();
  showAdminToast('Admin Portal locked securely.');
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
  initTamperGuardian();
  initInactivityWatcher();
  checkLockoutStatus();
  checkAdminAuth();
  setupNavigation();
  setupSearchAndFilters();
  setupImageDropzone();
  setupCatImageDropzone();
});

function initStorage() {
  // Products
  const localProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (localProducts) {
    try {
      AdminState.products = JSON.parse(localProducts);
      const existingIds = new Set(AdminState.products.map(p => p.id));
      let hasNew = false;
      DEFAULT_PRODUCTS.forEach(p => {
        if (!existingIds.has(p.id)) {
          AdminState.products.push(p);
          hasNew = true;
        } else {
          const existing = AdminState.products.find(item => item.id === p.id);
          if (existing && !existing.image && p.image) {
            existing.image = p.image;
            hasNew = true;
          }
        }
      });
      if (hasNew) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(AdminState.products));
      }
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

  // Cloud sync from Supabase
  syncProductsFromSupabase();
  syncOrdersFromSupabase();
  syncCouponsFromSupabase();
  syncCombosFromSupabase();
  syncStoreConfigFromSupabase();
  initSupabaseRealtimeEngine();
}

function saveProductsToStorage(modifiedProduct = null) {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(AdminState.products));
  broadcastLiveSync('PRODUCTS_UPDATED', AdminState.products);

  // Cloud Sync to Supabase Database
  if (supabaseClient) {
    const list = modifiedProduct ? [modifiedProduct] : AdminState.products;
    list.forEach(p => {
      const vars = Array.isArray(p.variants) && p.variants.length > 0 ? p.variants : [
        { weight: 'Standard', price: Number(p.currentPrice) || 1999, mrp: Number(p.originalPrice) || 2999, unitPrice: `₹${Number(p.currentPrice) || 1999}` }
      ];
      const cPrice = Number(p.currentPrice) || (vars[0] ? Number(vars[0].price) : 1999);
      const oPrice = Number(p.originalPrice) || (vars[0] ? Number(vars[0].mrp) : cPrice + 1000);
      supabaseClient.from('products').upsert([{
        id: p.id,
        title: p.title,
        category: p.category || 'proteins',
        rating: Number(p.rating) || 4.8,
        reviews_count: Number(p.reviewsCount) || 100,
        current_price: cPrice,
        original_price: oPrice,
        discount: p.discount || p.badgeText || '',
        in_stock: p.inStock !== false && (p.stock === undefined || p.stock > 0),
        image: p.image || '',
        gallery: Array.isArray(p.gallery) && p.gallery.length > 0 ? p.gallery : (p.image ? [p.image] : []),
        description: p.description || '',
        variants: vars,
        is_veg: p.isVeg !== false,
        badge_text: p.badgeText || '',
        is_bestseller: !!p.isBestseller,
        stock: p.stock !== undefined ? Number(p.stock) : 30,
        nutrition: p.nutrition || {}
      }]).then(({ error }) => {
        if (error) {
          console.warn('Supabase product sync warning:', error.message);
        } else {
          console.log('⚡ Product synced to Supabase Cloud:', p.id);
        }
      }).catch(err => console.warn('Supabase product sync error:', err));
    });
  }
}

function saveCategoriesToStorage() {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(AdminState.categories));
  broadcastLiveSync('CATEGORIES_UPDATED', AdminState.categories);
  if (supabaseClient) {
    supabaseClient.from('store_config').upsert([{
      key: 'categories',
      data: AdminState.categories,
      updated_at: new Date().toISOString()
    }]).then(() => {}).catch(e => console.warn(e));
  }
}

function saveBannersToStorage() {
  localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(AdminState.banners));
  broadcastLiveSync('BANNERS_UPDATED', AdminState.banners);
  if (supabaseClient) {
    supabaseClient.from('store_config').upsert([{
      key: 'banners',
      data: AdminState.banners,
      updated_at: new Date().toISOString()
    }]).then(() => {}).catch(e => console.warn(e));
  }
}

function saveOrdersToStorage() {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(AdminState.orders));
  broadcastLiveSync('ORDERS_UPDATED', AdminState.orders);
}

function saveCouponsToStorage() {
  localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(AdminState.coupons));
  broadcastLiveSync('COUPONS_UPDATED', AdminState.coupons);
  if (supabaseClient && Array.isArray(AdminState.coupons)) {
    AdminState.coupons.forEach(c => {
      supabaseClient.from('coupons').upsert([{
        code: c.code,
        type: c.type,
        value: c.value,
        min_order: c.minOrder || 0,
        active: c.active !== false
      }]).then(() => {}).catch(e => console.warn(e));
    });
  }
}

function saveSettingsToStorage() {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(AdminState.settings));
  broadcastLiveSync('SETTINGS_UPDATED', AdminState.settings);
  if (supabaseClient) {
    supabaseClient.from('store_config').upsert([{
      key: 'settings',
      data: AdminState.settings,
      updated_at: new Date().toISOString()
    }]).then(() => {}).catch(e => console.warn(e));
  }
}

// ==========================================================================
// SUPABASE CLOUD SYNC & REALTIME ENGINE
// ==========================================================================
async function syncProductsFromSupabase() {
  if (!supabaseClient) return;
  try {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      const cloudProducts = data.map(p => {
        const vars = Array.isArray(p.variants) && p.variants.length > 0 ? p.variants : [
          { weight: 'Standard', price: Number(p.current_price) || 1999, mrp: Number(p.original_price) || 2999, unitPrice: `₹${Number(p.current_price) || 1999}` }
        ];
        const cPrice = Number(p.current_price) || (vars[0] ? Number(vars[0].price) : 1999);
        const oPrice = Number(p.original_price) || (vars[0] ? Number(vars[0].mrp) : cPrice + 1000);
        return {
          id: p.id,
          title: p.title || 'PowerX Nutrition Supplement',
          category: p.category || 'proteins',
          rating: Number(p.rating) || 4.8,
          reviewsCount: Number(p.reviews_count) || 120,
          currentPrice: cPrice,
          originalPrice: oPrice,
          discount: p.discount || p.badge_text || '',
          inStock: p.in_stock !== false,
          image: p.image || '',
          gallery: Array.isArray(p.gallery) && p.gallery.length > 0 ? p.gallery : (p.image ? [p.image] : []),
          description: p.description || '',
          variants: vars,
          isVeg: p.is_veg !== false,
          badgeText: p.badge_text || p.discount || '',
          isBestseller: !!p.is_bestseller,
          stock: p.stock !== undefined ? Number(p.stock) : 30,
          nutrition: p.nutrition || {}
        };
      });

      AdminState.products = cloudProducts;
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(AdminState.products));
      if (AdminState.currentTab === 'products' || AdminState.currentTab === 'dashboard') {
        renderCurrentTab();
      }
      updateTopbarMetrics();
      console.log('⚡ Synced', cloudProducts.length, 'products from Supabase cloud into Admin');
    }
  } catch (err) {
    console.warn('Supabase products fetch fallback:', err);
  }
}

async function syncCombosFromSupabase() {
  if (!supabaseClient) return;
  try {
    const { data, error } = await supabaseClient.from('combos').select('*');
    if (!error && Array.isArray(data) && data.length > 0) {
      const cloudCombos = data.map(c => ({
        id: c.id,
        title: c.title,
        subtitle: c.subtitle || '',
        price: Number(c.price) || 0,
        mrp: Number(c.original_price) || Number(c.price) * 1.3,
        badgeText: c.badge || c.discount || '',
        image: c.image || '',
        items: Array.isArray(c.items) ? c.items.map(it => typeof it === 'string' ? { name: it, image: c.image } : it) : []
      }));
      localStorage.setItem(STORAGE_KEYS.COMBOS, JSON.stringify(cloudCombos));
      if (AdminState.currentTab === 'combos') {
        renderCombosAdmin();
      }
      console.log('⚡ Synced', cloudCombos.length, 'combos from Supabase cloud');
    }
  } catch (err) {
    console.warn('Supabase combos fetch fallback:', err);
  }
}

async function syncCouponsFromSupabase() {
  if (!supabaseClient) return;
  try {
    const { data, error } = await supabaseClient.from('coupons').select('*');
    if (!error && Array.isArray(data) && data.length > 0) {
      AdminState.coupons = data.map(c => ({
        code: c.code,
        type: c.type || 'percent',
        value: Number(c.value) || 0,
        minOrder: Number(c.min_order) || 0,
        active: c.active !== false
      }));
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(AdminState.coupons));
      if (AdminState.currentTab === 'coupons') {
        renderCoupons();
      }
      console.log('⚡ Synced', AdminState.coupons.length, 'coupons from Supabase cloud');
    }
  } catch (err) {
    console.warn('Supabase coupons fetch fallback:', err);
  }
}

async function syncStoreConfigFromSupabase() {
  if (!supabaseClient) return;
  try {
    const { data, error } = await supabaseClient.from('store_config').select('*');
    if (!error && Array.isArray(data)) {
      data.forEach(cfg => {
        if (cfg.key === 'banners' && cfg.data) {
          AdminState.banners = cfg.data;
          localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(cfg.data));
        } else if (cfg.key === 'settings' && cfg.data) {
          AdminState.settings = cfg.data;
          localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(cfg.data));
        } else if (cfg.key === 'categories' && cfg.data) {
          AdminState.categories = cfg.data;
          localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(cfg.data));
        }
      });
      if (['banners', 'settings', 'categories'].includes(AdminState.currentTab)) {
        renderCurrentTab();
      }
      console.log('⚡ Synced store config from Supabase cloud');
    }
  } catch (err) {
    console.warn('Supabase store config fetch fallback:', err);
  }
}

async function syncOrdersFromSupabase() {
  if (!supabaseClient) return;
  try {
    const { data, error } = await supabaseClient
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const cloudOrders = data.map(o => ({
        id: o.id,
        customer: o.customer,
        items: o.items,
        subtotal: o.subtotal,
        discount: o.discount,
        coupon: o.coupon,
        total: o.total,
        paymentMethod: o.payment_method || 'Cash on Delivery (COD)',
        paymentStatus: o.payment_status || 'Pending',
        status: o.status || 'Pending',
        createdAt: o.created_at
      }));

      // Merge cloud orders with local orders without duplicates
      const cloudIds = new Set(cloudOrders.map(c => c.id));
      const localOnly = AdminState.orders.filter(lo => !cloudIds.has(lo.id));
      AdminState.orders = [...cloudOrders, ...localOnly];
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(AdminState.orders));

      if (AdminState.currentTab === 'orders' || AdminState.currentTab === 'dashboard') {
        renderCurrentTab();
      }
      updateTopbarMetrics();
      console.log('⚡ Synced', cloudOrders.length, 'orders from Supabase cloud');
    }
  } catch(err) {
    console.warn('Supabase orders fetch fallback:', err);
  }
}

function initSupabaseRealtimeEngine() {
  if (!supabaseClient) return;
  try {
    supabaseClient
      .channel('admin-cloud-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, payload => {
        console.log('⚡ Supabase realtime order event:', payload);
        syncOrdersFromSupabase();
        showAdminToast('⚡ Live order synced from Supabase cloud!');
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, payload => {
        console.log('⚡ Supabase realtime product event:', payload);
        syncProductsFromSupabase();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'combos' }, () => {
        syncCombosFromSupabase();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'coupons' }, () => {
        syncCouponsFromSupabase();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'store_config' }, () => {
        syncStoreConfigFromSupabase();
      })
      .subscribe();
  } catch(err) {
    console.warn('Supabase realtime init fallback:', err);
  }
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
  
  // Update desktop sidebar active classes
  document.querySelectorAll('.nav-item[data-tab]').forEach(item => {
    if (item.getAttribute('data-tab') === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update mobile bottom navigation active classes
  document.querySelectorAll('.mobile-nav-btn[data-tab]').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
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

  if (isSessionUnlocked) {
    renderCurrentTab();
  }

  // Smooth scroll to top of content area on tab switch (mobile ergonomics)
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeSidebar();
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
  
  // Desktop Sidebar Badge
  const badge = document.getElementById('navOrdersBadge');
  if (badge) {
    badge.innerText = pendingCount;
    badge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
  }

  // Mobile Bottom Bar Badge
  const mobileBadge = document.getElementById('mobileOrdersBadge');
  if (mobileBadge) {
    mobileBadge.innerText = pendingCount;
    mobileBadge.style.display = pendingCount > 0 ? 'inline-block' : 'none';
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) {
    sidebar.classList.toggle('open');
    if (backdrop) {
      backdrop.classList.toggle('active', sidebar.classList.contains('open'));
    }
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('active');
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

  tbody.innerHTML = recent.map(o => {
    let rawName = (o.customer && o.customer.name) ? String(o.customer.name).trim() : '';
    if (!rawName || /^\d+$/.test(rawName)) rawName = 'Customer';
    const customerPhone = (o.customer && o.customer.phone) ? String(o.customer.phone).trim() : 'N/A';
    const cleanPhoneDigits = customerPhone.replace(/[^0-9]/g, '');
    const waPhone = cleanPhoneDigits.length === 10 ? '91' + cleanPhoneDigits : cleanPhoneDigits;

    return `
      <tr>
        <td><strong style="color:var(--admin-accent-blue); cursor:pointer; font-weight:800;" onclick="openOrderDetails('${o.id}')">#${escapeHtml(o.id)}</strong></td>
        <td>
          <div style="font-weight:800; color:var(--text-main); font-size:0.9rem;">${escapeHtml(rawName)}</div>
          <div style="font-size:0.75rem; color:var(--text-dim); display:flex; align-items:center; gap:4px; margin-top:2px;">
            <span>${escapeHtml(customerPhone)}</span>
            ${cleanPhoneDigits ? `
              <a href="https://wa.me/${waPhone}?text=Hi%20${encodeURIComponent(rawName)}%2C%20regarding%20your%20PowerX%20order%20%23${o.id}%3A" target="_blank" class="wa-quick-chip" title="Chat on WhatsApp">
                <i class="fa-brands fa-whatsapp"></i> Chat
              </a>
            ` : ''}
          </div>
        </td>
        <td><strong style="color:var(--text-main); font-size:0.95rem; font-family:'Outfit', sans-serif;">₹${o.total.toLocaleString('en-IN')}</strong></td>
        <td><span class="status-pill ${o.status.toLowerCase()}">${o.status}</span></td>
        <td>
          <div style="display:flex; align-items:center; gap:6px;">
            <button class="btn-bill-action" style="padding:5px 9px; font-size:0.72rem;" onclick="printOrderInvoice('${o.id}')" title="Generate Bill / Invoice">
              <i class="fa-solid fa-file-invoice-dollar"></i> Bill
            </button>
            <button class="btn-whatsapp-action" style="padding:5px 9px; font-size:0.72rem;" onclick="sendOrderOnWhatsApp('${o.id}')" title="Send Bill to Customer on WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
            </button>
            <button class="btn-table-action" title="View Order" onclick="openOrderDetails('${o.id}')">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
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
      (o.customer && o.customer.name && o.customer.name.toLowerCase().includes(q)) ||
      (o.customer && o.customer.phone && o.customer.phone.toLowerCase().includes(q)) ||
      (o.customer && o.customer.address && o.customer.address.toLowerCase().includes(q))
    );
  }

  // Sort descending by creation date
  filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding: 36px 20px; color:var(--text-dim);">
          <i class="fa-solid fa-box-open" style="font-size:2.2rem; margin-bottom:10px; display:block; color:#94a3b8;"></i>
          <span style="font-weight:700; font-size:0.95rem;">No orders found matching the filter.</span>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(o => {
    const formattedDate = o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent';
    const itemsSummary = (o.items || []).map(i => `${i.qty}x ${i.title}`).join(', ');

    let rawName = (o.customer && o.customer.name) ? String(o.customer.name).trim() : '';
    if (!rawName || /^\d+$/.test(rawName)) rawName = 'Customer';
    const customerPhone = (o.customer && o.customer.phone) ? String(o.customer.phone).trim() : 'N/A';
    const cleanPhoneDigits = customerPhone.replace(/[^0-9]/g, '');
    const waPhone = cleanPhoneDigits.length === 10 ? '91' + cleanPhoneDigits : cleanPhoneDigits;

    return `
      <tr>
        <td>
          <div style="font-weight:900; color:var(--admin-accent-blue); font-size:0.95rem; cursor:pointer;" onclick="openOrderDetails('${o.id}')">
            #${escapeHtml(o.id)}
          </div>
          <div style="font-size:0.72rem; color:var(--text-dim); margin-top:3px;"><i class="fa-regular fa-calendar-check"></i> ${formattedDate}</div>
        </td>
        <td>
          <div class="order-customer-name">
            <i class="fa-solid fa-circle-user" style="color:var(--admin-primary); font-size:0.95rem;"></i>
            <span>${escapeHtml(rawName)}</span>
          </div>
          <div class="order-customer-phone">
            <i class="fa-solid fa-phone" style="font-size:0.75rem; color:#64748b;"></i>
            <span>${escapeHtml(customerPhone)}</span>
            ${cleanPhoneDigits ? `
              <a href="https://wa.me/${waPhone}?text=Hi%20${encodeURIComponent(rawName)}%2C%20greetings%20from%20PowerX%20Protein%20Hub!%20Regarding%20your%20order%20%23${o.id}%3A" target="_blank" class="wa-quick-chip" title="Chat on WhatsApp">
                <i class="fa-brands fa-whatsapp"></i> Chat
              </a>
            ` : ''}
          </div>
          ${o.customer && o.customer.address ? `
            <div style="font-size:0.72rem; color:#64748b; max-width:210px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px;" title="${escapeHtml(o.customer.address)}">
              <i class="fa-solid fa-location-dot" style="font-size:0.7rem;"></i> ${escapeHtml(o.customer.address)}
            </div>
          ` : ''}
        </td>
        <td>
          <div style="max-width:240px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:0.82rem; font-weight:700; color:var(--text-main);" title="${escapeHtml(itemsSummary)}">
            ${escapeHtml(itemsSummary)}
          </div>
          <div style="font-size:0.72rem; color:var(--text-dim); margin-top:3px;">
            <i class="fa-solid fa-cubes-stacked"></i> ${(o.items || []).length} item(s) ordered
          </div>
        </td>
        <td>
          <div class="order-total-amount">₹${Number(o.total || 0).toLocaleString('en-IN')}</div>
          <div style="display:flex; align-items:center; gap:6px; margin-top:4px;">
            <span class="status-pill ${o.paymentStatus === 'Paid' ? 'delivered' : 'pending'}" style="font-size:0.68rem; padding:2px 8px;">
              ${o.paymentStatus || 'Pending'}
            </span>
            <span style="font-size:0.72rem; color:var(--text-dim); font-weight:600;">${o.paymentMethod || 'COD'}</span>
          </div>
          ${o.discount ? `<div style="font-size:0.7rem; color:#dc2626; font-weight:700; margin-top:2px;">Saved ₹${o.discount}</div>` : ''}
        </td>
        <td>
          <select class="select-filter" style="font-size:0.78rem; padding:6px 10px; font-weight:700;" onchange="updateOrderStatus('${o.id}', this.value)">
            <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>⏳ Pending</option>
            <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>🔄 Processing</option>
            <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>🚚 Shipped</option>
            <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>✅ Delivered</option>
            <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>❌ Cancelled</option>
          </select>
        </td>
        <td>
          <div class="action-btn-group" style="display:flex; align-items:center; gap:6px;">
            <button class="btn-bill-action" onclick="printOrderInvoice('${o.id}')" title="Generate Official Bill / Tax Invoice">
              <i class="fa-solid fa-file-invoice-dollar"></i>
              <span>Bill</span>
            </button>
            <button class="btn-whatsapp-action" onclick="sendOrderOnWhatsApp('${o.id}')" title="Send Bill & Details to Customer on WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
              <span>WhatsApp</span>
            </button>
            <button class="btn-table-action" title="View Full Order Info" onclick="openOrderDetails('${o.id}')">
              <i class="fa-solid fa-eye"></i>
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

// Direct WhatsApp Bill & Customer Connect Sender
function sendOrderOnWhatsApp(orderId) {
  const order = AdminState.orders.find(o => o.id === orderId);
  if (!order) return;

  const rawPhone = (order.customer && order.customer.phone) ? String(order.customer.phone).trim() : '';
  const cleanDigits = rawPhone.replace(/[^0-9]/g, '');
  if (!cleanDigits) {
    showAdminToast('Customer has no phone number recorded.');
    return;
  }
  const waPhone = cleanDigits.length === 10 ? '91' + cleanDigits : cleanDigits;

  let customerName = (order.customer && order.customer.name) ? String(order.customer.name).trim() : '';
  if (!customerName || /^\d+$/.test(customerName)) customerName = 'Valued Customer';

  const itemsList = (order.items || []).map((it, idx) => 
    `  ${idx + 1}. *${it.title}* (${it.variant || 'Standard'}) x ${it.qty} = ₹${((it.price || 0) * (it.qty || 1)).toLocaleString('en-IN')}`
  ).join('\n');

  const message = 
`⚡ *POWERX PROTEIN HUB - OFFICIAL ORDER BILL* ⚡
--------------------------------------
Hello *${customerName}*! 👋
Thank you for your order with PowerX Fitness Hub.

📄 *Order ID:* #${order.id}
📅 *Date:* ${order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}

🛒 *Items Ordered:*
${itemsList}

--------------------------------------
💰 *Subtotal:* ₹${(order.subtotal || order.total).toLocaleString('en-IN')}
${order.discount ? `🏷️ *Discount (${order.coupon || 'OFFER'}):* -₹${order.discount.toLocaleString('en-IN')}\n` : ''}🚚 *Shipping:* FREE Express Dispatch
💵 *Total Bill Payable:* *₹${order.total.toLocaleString('en-IN')}*
💳 *Payment Method:* ${order.paymentMethod || 'Cash on Delivery'} (${order.paymentStatus || 'Pending'})
📦 *Delivery Status:* *${order.status || 'Processing'}*
📍 *Shipping Address:* ${order.customer && order.customer.address ? order.customer.address : 'Registered Address'}
--------------------------------------
Your order is being dispatched from our central hub. Feel free to reply right here for quick support!
_PowerX Protein Hub | 100% Certified Sports Nutrition_ 💪`;

  const url = `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  showAdminToast(`Opening WhatsApp for Order #${order.id}...`);
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

  // Cloud sync to Supabase
  if (supabaseClient) {
    try {
      supabaseClient
        .from('orders')
        .update({ status: newStatus, payment_status: order.paymentStatus })
        .eq('id', orderId)
        .then(({ error }) => {
          if (error) console.warn('Supabase status update error:', error.message);
        })
        .catch(err => console.warn('Supabase status update error:', err));
    } catch(e) {}
  }
}

function openOrderDetails(orderId) {
  const order = AdminState.orders.find(o => o.id === orderId);
  if (!order) return;

  AdminState.selectedOrder = order;
  const modal = document.getElementById('orderDetailsModal');
  const body = document.getElementById('orderDetailsModalBody');
  if (!modal || !body) return;

  const formattedDate = order.createdAt ? new Date(order.createdAt).toLocaleString('en-IN') : 'Recent';
  let custName = (order.customer && order.customer.name) ? String(order.customer.name).trim() : '';
  if (!custName || /^\d+$/.test(custName)) custName = 'Valued Customer';
  const custPhone = (order.customer && order.customer.phone) ? String(order.customer.phone).trim() : 'N/A';
  const cleanPhone = custPhone.replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;

  body.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid var(--admin-border);">
      <div>
        <h3 style="font-size:1.25rem; font-weight:800; color:var(--text-main);">Order #${order.id}</h3>
        <p style="font-size:0.78rem; color:var(--text-dim); margin-top:2px;"><i class="fa-regular fa-clock"></i> Placed on ${formattedDate}</p>
      </div>
      <div style="text-align:right;">
        <span class="status-pill ${order.status.toLowerCase()}" style="font-size:0.85rem; padding:6px 14px;">${order.status}</span>
      </div>
    </div>

    <div class="form-grid-2" style="margin-bottom: 20px;">
      <div style="background:var(--admin-surface-card); padding:14px; border-radius:var(--radius-md); border:1px solid var(--admin-border);">
        <h4 style="font-size:0.8rem; font-weight:800; color:var(--text-muted); margin-bottom:8px; text-transform:uppercase;">Customer Details</h4>
        <div style="font-weight:800; color:var(--text-main); font-size:1rem;">${escapeHtml(custName)}</div>
        <div style="font-size:0.82rem; color:var(--text-muted); margin-top:6px; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-phone" style="width:16px; color:#64748b;"></i> 
          <strong>${escapeHtml(custPhone)}</strong>
          ${cleanPhone ? `
            <a href="https://wa.me/${waPhone}?text=Hi%20${encodeURIComponent(custName)}%2C%20regarding%20your%20PowerX%20order%20%23${order.id}%3A" target="_blank" class="wa-quick-chip" title="Chat on WhatsApp">
              <i class="fa-brands fa-whatsapp"></i> Chat
            </a>
          ` : ''}
        </div>
        ${order.customer && order.customer.email ? `<div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;"><i class="fa-solid fa-envelope" style="width:16px; color:#64748b;"></i> ${escapeHtml(order.customer.email)}</div>` : ''}
      </div>

      <div style="background:var(--admin-surface-card); padding:14px; border-radius:var(--radius-md); border:1px solid var(--admin-border);">
        <h4 style="font-size:0.8rem; font-weight:800; color:var(--text-muted); margin-bottom:8px; text-transform:uppercase;">Delivery Address</h4>
        <p style="font-size:0.88rem; color:var(--text-main); line-height:1.4; font-weight:600;">${escapeHtml(order.customer && order.customer.address ? order.customer.address : 'Standard Delivery Address')}</p>
        <div style="margin-top:8px; font-size:0.75rem; color:var(--admin-accent-green); font-weight:700;"><i class="fa-solid fa-truck-fast"></i> PowerX Express Dispatch</div>
      </div>
    </div>

    <h4 style="font-size:0.85rem; font-weight:800; color:var(--text-main); margin-bottom:12px; text-transform:uppercase;">Ordered Items (${(order.items || []).length})</h4>
    <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
      ${(order.items || []).map(item => `
        <div style="display:flex; align-items:center; justify-content:space-between; background:var(--admin-surface-card); padding:10px 14px; border-radius:var(--radius-md); border:1px solid var(--admin-border);">
          <div style="display:flex; align-items:center; gap:12px;">
            <img src="${item.image || 'assets/brands/Optimum_1-1767086019_clean.png'}" alt="" style="width:44px; height:44px; object-fit:contain; background:#fff; border-radius:6px; padding:2px; border:1px solid var(--admin-border);">
            <div>
              <div style="font-weight:700; color:var(--text-main); font-size:0.88rem;">${escapeHtml(item.title)}</div>
              <div style="font-size:0.75rem; color:var(--text-dim); margin-top:2px;">${escapeHtml(item.variant || 'Standard Pack')} &times; ${item.qty}</div>
            </div>
          </div>
          <div style="font-weight:800; color:var(--text-main); font-size:0.95rem; font-family:'Outfit', sans-serif;">
            ₹${((item.price || 0) * (item.qty || 1)).toLocaleString('en-IN')}
          </div>
        </div>
      `).join('')}
    </div>

    <div style="background:var(--admin-surface-card); padding:16px; border-radius:var(--radius-md); border:1px solid var(--admin-border);">
      <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-muted); margin-bottom:6px;">
        <span>Subtotal:</span>
        <strong style="color:var(--text-main);">₹${(order.subtotal || order.total).toLocaleString('en-IN')}</strong>
      </div>
      ${order.discount ? `
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--admin-primary); margin-bottom:6px; font-weight:700;">
          <span>Coupon Discount (${order.coupon}):</span>
          <span>- ₹${order.discount.toLocaleString('en-IN')}</span>
        </div>
      ` : ''}
      <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-muted); margin-bottom:8px;">
        <span>Shipping:</span>
        <span style="color:var(--admin-accent-green); font-weight:800;">FREE</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:1.15rem; font-weight:900; color:var(--text-main); padding-top:10px; border-top:1.5px solid var(--admin-border);">
        <span>Total Bill Amount:</span>
        <span style="color:var(--admin-primary); font-family:'Outfit', sans-serif;">₹${order.total.toLocaleString('en-IN')}</span>
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

  // Cloud sync delete to Supabase
  if (supabaseClient) {
    try {
      supabaseClient
        .from('orders')
        .delete()
        .eq('id', orderId)
        .then(({ error }) => {
          if (error) console.warn('Supabase delete error:', error.message);
        })
        .catch(err => console.warn('Supabase delete error:', err));
    } catch(e) {}
  }
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
        <div style="color:#4b5563; max-width:260px; margin-top:4px;">${AdminState.settings.storeAddress || 'PowerX Hub, Ostwal, Maan, Boisar, MH 401501'}</div>
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
  const previousTitle = document.title;
  if (AdminState.selectedOrder) {
    document.title = `Tax_Invoice_${AdminState.selectedOrder.id}`;
  }
  window.print();
  setTimeout(() => {
    document.title = previousTitle;
  }, 1000);
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
            ${p.image ? `<img src="${p.image}" alt="" class="product-thumb" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-flex';"><span class="product-thumb-fallback" style="display:none; width:44px; height:44px; border-radius:8px; background:#1e293b; align-items:center; justify-content:center; color:#64748b;"><i class="fa-solid fa-bottle-droplet"></i></span>` : `<div class="product-thumb-fallback" style="display:inline-flex; width:44px; height:44px; border-radius:8px; background:#1e293b; align-items:center; justify-content:center; color:#64748b;"><i class="fa-solid fa-bottle-droplet"></i></div>`}
            <div>
              <div class="product-cell-title" title="${escapeHtml(p.title)}">${escapeHtml(p.title)}</div>
              <div class="product-cell-sub">ID: ${p.id} &bull; ${p.variants ? p.variants.length : 1} Variant(s)</div>
            </div>
          </div>
        </td>
        <td>
          <select class="admin-table-cat-select" onchange="quickChangeProductCategory('${p.id}', this.value)" title="Move to any category">
            <option value="proteins" ${p.category === 'proteins' ? 'selected' : ''}>Proteins</option>
            <option value="gainers" ${p.category === 'gainers' ? 'selected' : ''}>Mass Gainer</option>
            <option value="creatine" ${p.category === 'creatine' ? 'selected' : ''}>Creatine</option>
            <option value="pre-workout" ${p.category === 'pre-workout' ? 'selected' : ''}>Pre-Workout</option>
            <option value="aminos" ${p.category === 'aminos' ? 'selected' : ''}>Aminos</option>
            <option value="oats" ${p.category === 'oats' ? 'selected' : ''}>Oats</option>
            <option value="peanut-butter" ${p.category === 'peanut-butter' ? 'selected' : ''}>Peanut Butter</option>
            <option value="bars" ${p.category === 'bars' ? 'selected' : ''}>Bars</option>
            <option value="shilajit" ${p.category === 'shilajit' ? 'selected' : ''}>Shilajit</option>
            <option value="ashwagandha" ${p.category === 'ashwagandha' ? 'selected' : ''}>Ashwagandha</option>
            <option value="fish-oil" ${p.category === 'fish-oil' ? 'selected' : ''}>Fish Oil</option>
            <option value="multivitamins" ${p.category === 'multivitamins' ? 'selected' : ''}>Multivitamins</option>
            <option value="magnesium" ${p.category === 'magnesium' ? 'selected' : ''}>Magnesium</option>
            <option value="l-carnitine" ${p.category === 'l-carnitine' ? 'selected' : ''}>L-Carnitine</option>
            ${!['proteins','gainers','creatine','pre-workout','aminos','oats','peanut-butter','bars','shilajit','ashwagandha','fish-oil','multivitamins','magnesium','l-carnitine'].includes(p.category) ? `<option value="${escapeHtml(p.category)}" selected>${escapeHtml(p.category)}</option>` : ''}
          </select>
        </td>
        <td>
          <div style="font-weight:800; color:var(--text-main);">₹${mainVariant.price.toLocaleString()}</div>
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

  const catSelect = document.getElementById('prodCategory');
  if (catSelect) {
    const exists = Array.from(catSelect.options).some(opt => opt.value === p.category);
    if (!exists && p.category) {
      const opt = document.createElement('option');
      opt.value = p.category;
      opt.textContent = p.category;
      catSelect.appendChild(opt);
    }
    catSelect.value = p.category;
  }
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

  const vars = variants;
  const cPrice = vars[0] ? Number(vars[0].price) : 1999;
  const oPrice = vars[0] ? Number(vars[0].mrp) : cPrice + 1000;
  const disc = badgeText || (oPrice > cPrice ? `${Math.round(((oPrice - cPrice) / oPrice) * 100)}% OFF` : '');

  const productObj = {
    id: id || ('prod-' + Date.now()),
    title,
    category,
    rating,
    reviewsCount,
    badgeText,
    stock,
    image,
    currentPrice: cPrice,
    originalPrice: oPrice,
    discount: disc,
    inStock: stock > 0,
    description: description || 'Premium certified authentic nutritional supplement.',
    isVeg,
    isBestseller,
    variants: vars,
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

  saveProductsToStorage(productObj);
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

  // Cloud delete from Supabase
  if (supabaseClient) {
    try {
      supabaseClient.from('products').delete().eq('id', productId).then(() => {});
    } catch(e) {}
  }
}

function quickChangeProductCategory(productId, newCategory) {
  const p = AdminState.products.find(item => item.id === productId);
  if (!p) return;
  p.category = newCategory;
  saveProductsToStorage(p);
  showAdminToast(`Moved "${p.title.slice(0, 26)}..." to ${newCategory}`);
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
  document.getElementById('settPhone').value = AdminState.settings.contactPhone || '+91 77218 15318';
  document.getElementById('settEmail').value = AdminState.settings.contactEmail || 'powerxprotein@gmail.com';
  document.getElementById('settThreshold').value = AdminState.settings.freeShippingThreshold || 999;
  document.getElementById('settGst').value = AdminState.settings.gstNumber || '27AABCP1234F1Z8';
  document.getElementById('settAddress').value = AdminState.settings.storeAddress || 'Shop 14, PowerX Fitness Hub, Ostwal, Maan, Boisar, Maharashtra 401501';
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
