/**
 * Mock API — backed by src/mocks/data.
 * Mirrors the Xavvi API v1.0.0.0 contract.
 * Cart state lives in localStorage to survive reloads.
 */

import {
  delay,
  mockCategories,
  mockProducts,
  mockShippingOptions,
  mockStoreInfo,
} from "@/mocks/products";
import type {
  Cart,
  CartItem,
  Category,
  ContactInfo,
  ContentPage,
  Order,
  Product,
  ProductId,
  ShippingAddress,
  ShippingOption,
  StoreInfo,
} from "@/types/domain";
import { mockContentPages } from "@/mocks/content";

// ================================================================
// Local cart store
// ================================================================

const CART_KEY = "dtr_cart_v1";
const ORDER_KEY = "dtr_orders_v1";

interface StoredCart {
  id: string;
  items: CartItem[];
}

const readCart = (): StoredCart => {
  if (typeof localStorage === "undefined")
    return { id: "cart_" + Date.now(), items: [] };
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return { id: "cart_" + Date.now(), items: [] };
    return JSON.parse(raw) as StoredCart;
  } catch {
    return { id: "cart_" + Date.now(), items: [] };
  }
};

const writeCart = (cart: StoredCart) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const computeCartTotals = (items: CartItem[]) => {
  const subtotalCents = items.reduce((sum, i) => sum + i.lineTotal.amount, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  return {
    subtotal: { amount: subtotalCents, currency: "USD" as const },
    estimatedTotal: { amount: subtotalCents, currency: "USD" as const },
    itemCount,
  };
};

const findProduct = (id: ProductId): Product | null =>
  mockProducts.find((p) => p.id === id) ?? null;

// ================================================================
// Store / Catalog
// ================================================================

export async function getStoreInfo(): Promise<StoreInfo> {
  await delay();
  return mockStoreInfo;
}

export async function getCategories(): Promise<Category[]> {
  await delay();
  return mockCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await delay();
  return mockCategories.find((c) => c.slug === slug) ?? null;
}

export async function getProducts(params?: {
  categoryId?: string;
  categorySlug?: string;
  featured?: boolean;
  isNew?: boolean;
  limit?: number;
  sort?: "newest" | "price-asc" | "price-desc" | "featured";
}): Promise<Product[]> {
  await delay();
  let result = [...mockProducts];

  if (params?.categoryId) {
    result = result.filter((p) => p.categoryId === params.categoryId);
  }
  if (params?.categorySlug) {
    const cat = mockCategories.find((c) => c.slug === params.categorySlug);
    if (cat) result = result.filter((p) => p.categoryId === cat.id);
    else result = [];
  }
  if (params?.featured) {
    result = result.filter((p) => p.isFeatured);
  }
  if (params?.isNew) {
    result = result.filter((p) => p.isNew);
  }

  switch (params?.sort) {
    case "price-asc":
      result.sort((a, b) => a.basePrice.amount - b.basePrice.amount);
      break;
    case "price-desc":
      result.sort((a, b) => b.basePrice.amount - a.basePrice.amount);
      break;
    case "newest":
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    case "featured":
    default:
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  if (params?.limit) result = result.slice(0, params.limit);
  return result;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await delay();
  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export async function getProductById(id: ProductId): Promise<Product | null> {
  await delay();
  return mockProducts.find((p) => p.id === id) ?? null;
}

export async function getRelatedProducts(
  productId: ProductId,
  limit = 4,
): Promise<Product[]> {
  await delay();
  const target = findProduct(productId);
  if (!target) return [];
  return mockProducts
    .filter((p) => p.id !== productId && p.categoryId === target.categoryId)
    .slice(0, limit);
}

// ================================================================
// Cart
// ================================================================

const enrichItem = (
  productId: ProductId,
  variantId: string,
  quantity: number,
): CartItem | null => {
  const product = findProduct(productId);
  if (!product) return null;
  const variant = product.variants.find((v) => v.id === variantId);
  if (!variant) return null;
  const lineTotalCents = variant.price.amount * quantity;
  return {
    id: `ci_${productId}_${variantId}`,
    productId,
    variantId,
    quantity,
    productTitle: product.title,
    variantTitle: variant.title,
    imageUrl: product.images[0]?.url ?? "",
    unitPrice: variant.price,
    lineTotal: { amount: lineTotalCents, currency: "USD" },
  };
};

const buildCart = (stored: StoredCart): Cart => {
  const totals = computeCartTotals(stored.items);
  return {
    id: stored.id,
    items: stored.items,
    ...totals,
  };
};

export async function getCart(): Promise<Cart> {
  await delay(40);
  return buildCart(readCart());
}

export async function addCartItem(input: {
  productId: ProductId;
  variantId: string;
  quantity: number;
}): Promise<Cart> {
  await delay(80);
  const item = enrichItem(input.productId, input.variantId, input.quantity);
  if (!item) throw new Error("Invalid product or variant");

  const cart = readCart();
  const existing = cart.items.find((i) => i.variantId === input.variantId);
  if (existing) {
    existing.quantity += input.quantity;
    existing.lineTotal = {
      amount: existing.unitPrice.amount * existing.quantity,
      currency: "USD",
    };
  } else {
    cart.items.push(item);
  }
  writeCart(cart);
  return buildCart(cart);
}

export async function updateCartItem(
  itemId: string,
  quantity: number,
): Promise<Cart> {
  await delay(60);
  const cart = readCart();
  const item = cart.items.find((i) => i.id === itemId);
  if (!item) throw new Error("Cart item not found");
  if (quantity <= 0) {
    cart.items = cart.items.filter((i) => i.id !== itemId);
  } else {
    item.quantity = quantity;
    item.lineTotal = {
      amount: item.unitPrice.amount * quantity,
      currency: "USD",
    };
  }
  writeCart(cart);
  return buildCart(cart);
}

export async function removeCartItem(itemId: string): Promise<Cart> {
  await delay(40);
  const cart = readCart();
  cart.items = cart.items.filter((i) => i.id !== itemId);
  writeCart(cart);
  return buildCart(cart);
}

export async function clearCart(): Promise<Cart> {
  await delay(40);
  const cart = readCart();
  cart.items = [];
  writeCart(cart);
  return buildCart(cart);
}

// ================================================================
// Checkout
// ================================================================

export async function getShippingOptions(
  _country?: string,
): Promise<ShippingOption[]> {
  await delay();
  return mockShippingOptions;
}

export async function createOrder(input: {
  contact: ContactInfo;
  shippingAddress: ShippingAddress;
  shippingOptionId: string;
}): Promise<Order> {
  await delay(400);
  const cart = readCart();
  if (cart.items.length === 0) throw new Error("Cart is empty");

  const shippingOption =
    mockShippingOptions.find((o) => o.id === input.shippingOptionId) ??
    mockShippingOptions[0]!;

  const totals = computeCartTotals(cart.items);
  const subtotalCents = totals.subtotal.amount;
  const shippingCents = shippingOption.price.amount;
  // Mock tax: 8% on US
  const taxCents = Math.round(subtotalCents * 0.08);
  const totalCents = subtotalCents + shippingCents + taxCents;

  const orderId = "ord_" + Date.now();
  const orderNumber = "DTR-" + Math.floor(100000 + Math.random() * 900000);

  const order: Order = {
    id: orderId,
    number: orderNumber,
    status: "confirmed",
    items: cart.items,
    contact: input.contact,
    shippingAddress: input.shippingAddress,
    shippingOption,
    subtotal: { amount: subtotalCents, currency: "USD" },
    shipping: { amount: shippingCents, currency: "USD" },
    tax: { amount: taxCents, currency: "USD" },
    total: { amount: totalCents, currency: "USD" },
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(
      Date.now() +
        (parseInt(shippingOption.estimatedDays.split("-")[0] ?? "5") || 5) *
          24 *
          60 *
          60 *
          1000,
    ).toISOString(),
  };

  // Save order to history
  try {
    const existing = JSON.parse(
      localStorage.getItem(ORDER_KEY) ?? "[]",
    ) as Order[];
    existing.push(order);
    localStorage.setItem(ORDER_KEY, JSON.stringify(existing));
  } catch {
    /* ignore */
  }

  // Empty cart
  cart.items = [];
  writeCart(cart);

  return order;
}

// ================================================================
// Content
// ================================================================

export async function getContentPage(slug: string): Promise<ContentPage | null> {
  await delay();
  return mockContentPages.find((p) => p.slug === slug) ?? null;
}
