/**
 * Mock data for DU$TY Shop.
 * Derived from thedtrbrand.com sitemap (14 products across 4 collections).
 * Replace with live Xavvi API calls when VITE_XAVVI_API_KEY is configured.
 */

import type { Category, Product, ProductImage, StoreInfo, ShippingOption } from "@/types/domain";

// ================================================================
// Helper
// ================================================================

const img = (id: string, alt: string, w = 1200, h = 1500): ProductImage => ({
  id,
  url: `https://placehold.co/${w}x${h}/1F2128/FF6B1A?text=${encodeURIComponent(alt)}&font=oswald`,
  alt,
  width: w,
  height: h,
});

// ================================================================
// Categories
// ================================================================

export const mockCategories: Category[] = [
  {
    id: "cat_dtr_logo",
    slug: "dtr-logo",
    name: "DTR LOGO",
    description: "The signature. The all-seeing-eye. Wear the brand.",
    productCount: 5,
  },
  {
    id: "cat_chain",
    slug: "the-chain",
    name: "THE CHAIN COLLECTION",
    description: "Heavy metal, heavy statements.",
    productCount: 4,
  },
  {
    id: "cat_haiti",
    slug: "dusty-haiti",
    name: "DUSTY HAITI COLLECTION",
    description: "Where I come from. The blood. The pride.",
    productCount: 3,
  },
  {
    id: "cat_big_dusty",
    slug: "big-dusty",
    name: "BIG DUSTY CLOTHING",
    description: "Big name. Big energy.",
    productCount: 2,
  },
];

// ================================================================
// Products
// ================================================================

const standardSizes = ["S", "M", "L", "XL", "2XL"];
const apparelSizes = ["S", "M", "L", "XL", "2XL", "3XL"];

const makeVariants = (
  productId: string,
  basePrice: number,
  sizes: string[] = standardSizes,
  colors: { name: string; hex: string }[] = [{ name: "Black", hex: "#000000" }],
) =>
  sizes.flatMap((size, sIdx) =>
    colors.map((color, cIdx) => ({
      id: `var_${productId}_${size}_${color.name}`.toLowerCase(),
      productId,
      title: `${color.name} / ${size}`,
      size,
      color: color.name,
      sku: `DTR-${productId.toUpperCase()}-${size}-${color.name.slice(0, 2).toUpperCase()}`,
      price: { amount: basePrice, currency: "USD" as const },
      inStock: !(sIdx === sizes.length - 1 && cIdx === 0), // last size of first color OOS
      inventory: sIdx === sizes.length - 1 && cIdx === 0 ? 0 : 20 + sIdx * 3,
    })),
  );

export const mockProducts: Product[] = [
  // ============= DTR LOGO COLLECTION =============
  {
    id: "p_001",
    slug: "dtr-logo-classic-tee",
    title: "DTR Logo Classic Tee",
    subtitle: "The original.",
    description:
      "The DTR Logo tee. Our signature. Heavyweight 220gsm cotton, oversized fit, all-seeing-eye front-and-center. The brand, on your chest. Think Smart, Be Smart.",
    categoryId: "cat_dtr_logo",
    tags: ["tee", "logo", "core", "bestseller"],
    images: [
      img("p_001_1", "DTR LOGO TEE FRONT"),
      img("p_001_2", "DTR LOGO TEE BACK"),
      img("p_001_3", "DTR LOGO TEE DETAIL"),
    ],
    variants: makeVariants("p001", 3500, apparelSizes, [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Charcoal", hex: "#2A2D36" },
    ]),
    basePrice: { amount: 3500, currency: "USD" },
    isFeatured: true,
    isNew: false,
    createdAt: "2024-08-15T00:00:00Z",
  },
  {
    id: "p_002",
    slug: "dtr-logo-hoodie",
    title: "DTR Logo Hoodie",
    subtitle: "Heavy weight, heavy mind.",
    description:
      "The DTR Logo Hoodie. 400gsm French terry. Embroidered eye, screen-printed back. Built for the cold, made for the statement.",
    categoryId: "cat_dtr_logo",
    tags: ["hoodie", "logo", "core"],
    images: [
      img("p_002_1", "DTR LOGO HOODIE FRONT"),
      img("p_002_2", "DTR LOGO HOODIE BACK"),
    ],
    variants: makeVariants("p002", 7500, apparelSizes, [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Charcoal", hex: "#2A2D36" },
    ]),
    basePrice: { amount: 7500, currency: "USD" },
    isFeatured: true,
    isNew: false,
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "p_003",
    slug: "dtr-logo-balaclava",
    title: "DTR Logo Balaclava",
    subtitle: "Face the cold. Cover your tracks.",
    description:
      "The DTR Balaclava. Skimasks meet streetwear. Brushed fleece interior, embroidered logo at the cheek. Built for the burrr.",
    categoryId: "cat_dtr_logo",
    tags: ["balaclava", "accessory", "logo"],
    images: [img("p_003_1", "DTR BALACLAVA"), img("p_003_2", "DTR BALACLAVA SIDE")],
    variants: [
      {
        id: "var_p003_one",
        productId: "p003",
        title: "One Size",
        sku: "DTR-P003-OS-BLACK",
        price: { amount: 3500, currency: "USD" },
        inStock: true,
        inventory: 30,
      },
    ],
    basePrice: { amount: 3500, currency: "USD" },
    isFeatured: false,
    isNew: true,
    createdAt: "2025-11-20T00:00:00Z",
  },
  {
    id: "p_004",
    slug: "dtr-logo-beanie",
    title: "DTR Logo Beanie",
    subtitle: "Crown up.",
    description:
      "The DTR Beanie. Cuffed, ribbed, embroidered. For the cold mornings and the late nights.",
    categoryId: "cat_dtr_logo",
    tags: ["beanie", "accessory", "logo"],
    images: [img("p_004_1", "DTR BEANIE")],
    variants: [
      {
        id: "var_p004_black",
        productId: "p004",
        title: "Black",
        color: "Black",
        sku: "DTR-P004-BLACK",
        price: { amount: 2800, currency: "USD" },
        inStock: true,
        inventory: 50,
      },
      {
        id: "var_p004_orange",
        productId: "p004",
        title: "DTR Orange",
        color: "DTR Orange",
        sku: "DTR-P004-ORANGE",
        price: { amount: 2800, currency: "USD" },
        inStock: true,
        inventory: 25,
      },
    ],
    basePrice: { amount: 2800, currency: "USD" },
    isFeatured: true,
    isNew: true,
    createdAt: "2025-12-01T00:00:00Z",
  },
  {
    id: "p_005",
    slug: "dtr-logo-oversized-tee",
    title: "DTR Logo Oversized Tee",
    subtitle: "Cut larger. Drape heavier.",
    description: "Oversized fit tee, dropped shoulders, extended length. The streetwear cut, branded.",
    categoryId: "cat_dtr_logo",
    tags: ["tee", "logo", "oversized"],
    images: [img("p_005_1", "DTR OVERSIZED TEE")],
    variants: makeVariants("p005", 4200, ["M", "L", "XL", "2XL", "3XL"], [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Bone", hex: "#E8E2D5" },
    ]),
    basePrice: { amount: 4200, currency: "USD" },
    isFeatured: true,
    isNew: true,
    createdAt: "2025-12-10T00:00:00Z",
  },

  // ============= THE CHAIN COLLECTION =============
  {
    id: "p_006",
    slug: "the-chain-tee",
    title: "The Chain Tee",
    subtitle: "Wear the weight.",
    description: "The Chain Collection. Heavy Cuban link print across the chest. The weight of what you've earned.",
    categoryId: "cat_chain",
    tags: ["tee", "chain", "graphic"],
    images: [img("p_006_1", "THE CHAIN TEE")],
    variants: makeVariants("p006", 3800, apparelSizes, [
      { name: "Black", hex: "#0A0A0A" },
    ]),
    basePrice: { amount: 3800, currency: "USD" },
    isFeatured: true,
    isNew: false,
    createdAt: "2024-10-20T00:00:00Z",
  },
  {
    id: "p_007",
    slug: "the-chain-hoodie",
    title: "The Chain Hoodie",
    subtitle: "Cuban link, front and center.",
    description: "Heavyweight hoodie with the iconic Cuban link graphic. The Chain, reimagined.",
    categoryId: "cat_chain",
    tags: ["hoodie", "chain", "graphic"],
    images: [img("p_007_1", "THE CHAIN HOODIE")],
    variants: makeVariants("p007", 7900, apparelSizes, [
      { name: "Black", hex: "#0A0A0A" },
    ]),
    basePrice: { amount: 7900, currency: "USD" },
    isFeatured: true,
    isNew: true,
    createdAt: "2025-10-15T00:00:00Z",
  },
  {
    id: "p_008",
    slug: "the-chain-distressed-hoodie",
    title: "The Chain Distressed Hoodie",
    subtitle: "Vintage feel. Modern statement.",
    description: "Pre-distressed finish, raw edges, Chain graphic. Worn-in from day one.",
    categoryId: "cat_chain",
    tags: ["hoodie", "chain", "distressed"],
    images: [img("p_008_1", "THE CHAIN DISTRESSED HOODIE")],
    variants: makeVariants("p008", 8500, ["S", "M", "L", "XL"], [
      { name: "Vintage Black", hex: "#1A1A1A" },
    ]),
    basePrice: { amount: 8500, currency: "USD" },
    isFeatured: false,
    isNew: true,
    createdAt: "2025-11-05T00:00:00Z",
  },
  {
    id: "p_009",
    slug: "the-chain-graphic-hoodie",
    title: "The Chain Graphic Hoodie",
    subtitle: "Larger print. Louder statement.",
    description: "Full back graphic of the Cuban link Chain. Heavyweight 450gsm.",
    categoryId: "cat_chain",
    tags: ["hoodie", "chain", "graphic"],
    images: [img("p_009_1", "THE CHAIN GRAPHIC HOODIE")],
    variants: makeVariants("p009", 8200, apparelSizes, [
      { name: "Black", hex: "#0A0A0A" },
    ]),
    basePrice: { amount: 8200, currency: "USD" },
    isFeatured: true,
    isNew: true,
    createdAt: "2025-11-25T00:00:00Z",
  },

  // ============= DUSTY HAITI COLLECTION =============
  {
    id: "p_010",
    slug: "dusty-haiti-flag-tee",
    title: "Dusty Haiti Flag Tee",
    subtitle: "The blood. The pride.",
    description:
      "Haiti in the chest. Flag crest, embroidered, on a heavyweight tee. The blood runs deep.",
    categoryId: "cat_haiti",
    tags: ["tee", "haiti", "heritage", "embroidered"],
    images: [img("p_010_1", "DUSTY HAITI FLAG TEE")],
    variants: makeVariants("p010", 4000, apparelSizes, [
      { name: "Black", hex: "#0A0A0A" },
    ]),
    basePrice: { amount: 4000, currency: "USD" },
    isFeatured: true,
    isNew: true,
    createdAt: "2025-10-01T00:00:00Z",
  },
  {
    id: "p_011",
    slug: "dusty-haiti-hoodie",
    title: "Dusty Haiti Hoodie",
    subtitle: "Rep the island.",
    description: "Heritage hoodie. Haiti flag sleeve patch, DTR front. Comfort, culture, and the code.",
    categoryId: "cat_haiti",
    tags: ["hoodie", "haiti", "heritage"],
    images: [img("p_011_1", "DUSTY HAITI HOODIE")],
    variants: makeVariants("p011", 7800, apparelSizes, [
      { name: "Black", hex: "#0A0A0A" },
    ]),
    basePrice: { amount: 7800, currency: "USD" },
    isFeatured: false,
    isNew: true,
    createdAt: "2025-10-20T00:00:00Z",
  },
  {
    id: "p_012",
    slug: "dusty-haiti-crewneck",
    title: "Dusty Haiti Crewneck",
    subtitle: "Subtle. Loud. Heritage.",
    description: "Crewneck with embroidered Haiti flag on chest. The quiet flex of where you're from.",
    categoryId: "cat_haiti",
    tags: ["crewneck", "haiti", "heritage"],
    images: [img("p_012_1", "DUSTY HAITI CREWNECK")],
    variants: makeVariants("p012", 6800, ["S", "M", "L", "XL", "2XL"], [
      { name: "Black", hex: "#0A0A0A" },
    ]),
    basePrice: { amount: 6800, currency: "USD" },
    isFeatured: true,
    isNew: true,
    createdAt: "2025-11-10T00:00:00Z",
  },

  // ============= BIG DUSTY CLOTHING =============
  {
    id: "p_013",
    slug: "big-dusty-tee",
    title: "Big Dusty Tee",
    subtitle: "All caps. No apologies.",
    description: "BIG DU$TY, across the chest. The biggest flex in the collection. 100% cotton, oversized.",
    categoryId: "cat_big_dusty",
    tags: ["tee", "big-dusty", "statement"],
    images: [img("p_013_1", "BIG DUSTY TEE")],
    variants: makeVariants("p013", 3800, apparelSizes, [
      { name: "Black", hex: "#0A0A0A" },
    ]),
    basePrice: { amount: 3800, currency: "USD" },
    isFeatured: true,
    isNew: true,
    createdAt: "2025-12-01T00:00:00Z",
  },
  {
    id: "p_014",
    slug: "big-dusty-hoodie",
    title: "Big Dusty Hoodie",
    subtitle: "The flagship. Heavyweight.",
    description:
      "BIG DU$TY, big fit, big energy. Heavyweight 420gsm fleece, the brand's flagship piece.",
    categoryId: "cat_big_dusty",
    tags: ["hoodie", "big-dusty", "flagship"],
    images: [img("p_014_1", "BIG DUSTY HOODIE")],
    variants: makeVariants("p014", 8500, apparelSizes, [
      { name: "Black", hex: "#0A0A0A" },
    ]),
    basePrice: { amount: 8500, currency: "USD" },
    isFeatured: true,
    isNew: true,
    createdAt: "2025-12-15T00:00:00Z",
  },
];

// ================================================================
// Store Info
// ================================================================

export const mockStoreInfo: StoreInfo = {
  name: "DU$TY",
  tagline: "Think Smart, Be Smart",
  description:
    "Official DTR Brand. Merch from DU$TY (Dusty the Rapper) — a brand, not a rapper. Houston-bred, Atlanta-based, Haitian descent.",
  currency: "USD",
  locale: "en-US",
  country: "US",
  contactEmail: "support@dtrbrand.com",
  socialLinks: {
    instagram: "https://www.instagram.com/dustytherapper/",
    spotify: "https://open.spotify.com/artist/",
    youtube: "https://www.youtube.com/@dtrbrand",
    soundcloud: "https://soundcloud.com/ditigallaty",
    tiktok: "https://www.tiktok.com/@dustytherapper",
  },
};

// ================================================================
// Shipping
// ================================================================

export const mockShippingOptions: ShippingOption[] = [
  {
    id: "ship_us_std",
    name: "US Standard",
    description: "5-8 business days",
    price: { amount: 795, currency: "USD" },
    estimatedDays: "5-8",
  },
  {
    id: "ship_us_exp",
    name: "US Express",
    description: "2-3 business days",
    price: { amount: 1495, currency: "USD" },
    estimatedDays: "2-3",
  },
  {
    id: "ship_intl",
    name: "International",
    description: "10-20 business days",
    price: { amount: 1995, currency: "USD" },
    estimatedDays: "10-20",
  },
  {
    id: "ship_carib",
    name: "Caribbean / Haiti",
    description: "7-14 business days",
    price: { amount: 2495, currency: "USD" },
    estimatedDays: "7-14",
  },
];

// ================================================================
// Seeded delay — simulate network
// ================================================================

export const delay = (ms = 120) => new Promise((res) => setTimeout(res, ms));
