/**
 * Domain types — single source of truth.
 * Mirrors the Xavvi API contract (v1.0.0.0).
 * If the live API diverges, update here and the mock data + UI both follow.
 */

// ================================================================
// Catalog
// ================================================================

export type ProductId = string;
export type VariantId = string;
export type CategoryId = string;
export type OrderId = string;

export interface Money {
  amount: number; // in minor units (cents)
  currency: "USD";
}

export interface ProductVariant {
  id: VariantId;
  productId: ProductId;
  title: string; // e.g. "Black / M"
  size?: string;
  color?: string;
  sku: string;
  price: Money;
  compareAtPrice?: Money;
  inStock: boolean;
  inventory: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: ProductId;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  categoryId: CategoryId;
  categoryName?: string;       // denormalized for display
  categorySlug?: string;       // denormalized for display
  creatorUid?: string;         // nested creator
  creatorName?: string;
  creatorAvatar?: string;
  tags: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  basePrice: Money;
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
}

export interface Category {
  id: CategoryId;
  slug: string;
  name: string;
  description?: string;
  image?: ProductImage;
  productCount: number;
  parentId?: CategoryId;
  genders?: string[];
  isLeaf?: boolean;
}

// ================================================================
// Cart
// ================================================================

export interface CartItem {
  id: string;
  productId: ProductId;
  variantId: VariantId;
  quantity: number;
  // Snapshot fields to render without re-fetching
  productTitle: string;
  variantTitle: string;
  imageUrl: string;
  unitPrice: Money;
  lineTotal: Money;
}

export interface Cart {
  id: string;
  items: CartItem[];
  itemCount: number;
  subtotal: Money;
  estimatedShipping?: Money;
  estimatedTotal: Money;
  appliedCouponCode?: string;
  discount?: Money;
}

// ================================================================
// Store
// ================================================================

export interface StoreInfo {
  name: string;
  tagline: string;
  description: string;
  currency: "USD";
  locale: "en-US";
  country: "US";
  contactEmail: string;
  socialLinks: {
    instagram: string;
    spotify: string;
    youtube: string;
    soundcloud: string;
    tiktok?: string;
  };
}

// ================================================================
// Checkout
// ================================================================

export interface ShippingAddress {
  fullName: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: Money;
  estimatedDays: string;
}

export interface ContactInfo {
  email: string;
  marketingOptIn: boolean;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: OrderId;
  number: string;
  status: OrderStatus;
  items: CartItem[];
  contact: ContactInfo;
  shippingAddress: ShippingAddress;
  shippingOption: ShippingOption;
  subtotal: Money;
  shipping: Money;
  tax: Money;
  total: Money;
  createdAt: string;
  estimatedDelivery?: string;
}

// ================================================================
// Content
// ================================================================

export type ContentBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; url: string; alt: string; caption?: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] }
  | { type: "embed"; provider: "spotify" | "youtube"; url: string; title?: string };

export interface ContentPage {
  slug: string;
  title: string;
  blocks: ContentBlock[];
}

// ================================================================
// Helpers
// ================================================================

export const formatMoney = (m: Money): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: m.currency,
  }).format(m.amount / 100);
};
