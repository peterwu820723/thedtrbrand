/**
 * API layer — single contract for the UI.
 * In MOCK mode (default), reads from src/lib/api.mock.ts.
 * In LIVE mode (when VITE_XAVVI_API_STORE_ID is set), calls the Xavvi API.
 *
 * To swap implementations, see ./api.live.ts and ./api.mock.ts.
 * This file just dispatches.
 */

import * as mock from "./api.mock";
import * as live from "./api.live";
import type {
  Cart,
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

// Multi-tenant stores are identified by the X-Xavvi-Store-Id header, not
// a bearer token. If that env is set, we attempt LIVE; otherwise MOCK.
const USE_MOCK = !import.meta.env.VITE_XAVVI_API_STORE_ID;
const impl = USE_MOCK ? mock : live;

if (typeof window !== "undefined") {
  // eslint-disable-next-line no-console
  console.info(
    `[Xavvi API] Mode: ${USE_MOCK ? "MOCK" : "LIVE"} (base=${import.meta.env.VITE_XAVVI_API_BASE ?? "default"}, store=${import.meta.env.VITE_XAVVI_API_STORE_ID ? "set" : "unset"})`,
  );
}

// ================================================================
// Catalog
// ================================================================

export const getStoreInfo = (): Promise<StoreInfo> => impl.getStoreInfo();

export const getCategories = (): Promise<Category[]> => impl.getCategories();

export const getCategoryBySlug = (slug: string): Promise<Category | null> =>
  impl.getCategoryBySlug(slug);

export const getProducts = (params?: {
  categoryId?: string;
  categorySlug?: string;
  featured?: boolean;
  isNew?: boolean;
  limit?: number;
  sort?: "newest" | "price-asc" | "price-desc" | "featured";
}): Promise<Product[]> => impl.getProducts(params);

export const getProductBySlug = (slug: string): Promise<Product | null> =>
  impl.getProductBySlug(slug);

export const getProductById = (id: ProductId): Promise<Product | null> =>
  impl.getProductById(id);

export const getRelatedProducts = (
  productId: ProductId,
  limit?: number,
): Promise<Product[]> => impl.getRelatedProducts(productId, limit);

// ================================================================
// Cart
// ================================================================

export const getCart = (): Promise<Cart> => impl.getCart();

export const addCartItem = (input: {
  productId: ProductId;
  variantId: string;
  quantity: number;
}): Promise<Cart> => impl.addCartItem(input);

export const updateCartItem = (
  itemId: string,
  quantity: number,
): Promise<Cart> => impl.updateCartItem(itemId, quantity);

export const removeCartItem = (itemId: string): Promise<Cart> =>
  impl.removeCartItem(itemId);

export const clearCart = (): Promise<Cart> => impl.clearCart();

// ================================================================
// Checkout
// ================================================================

export const getShippingOptions = (country?: string): Promise<ShippingOption[]> =>
  impl.getShippingOptions(country);

export const createOrder = (input: {
  contact: ContactInfo;
  shippingAddress: ShippingAddress;
  shippingOptionId: string;
}): Promise<Order> => impl.createOrder(input);

// ================================================================
// Content
// ================================================================

export const getContentPage = (slug: string): Promise<ContentPage | null> =>
  impl.getContentPage(slug);

// ================================================================
// Mode introspection (for the dev playground)
// ================================================================

export const API_MODE: "MOCK" | "LIVE" = USE_MOCK ? "MOCK" : "LIVE";
export const API_BASE = import.meta.env.VITE_XAVVI_API_BASE as
  | string
  | undefined;
export const API_STORE_ID = import.meta.env.VITE_XAVVI_API_STORE_ID as
  | string
  | undefined;

/**
 * React hook returning the current API mode. Useful for the dev playground
 * and any UI that needs to render different things in MOCK vs LIVE.
 */
export const useApiMode = (): "MOCK" | "LIVE" => API_MODE;

/**
 * Low-level raw call to the Xavvi API. Returns the parsed response data.
 * Throws on transport / non-2xx errors. Works in both MOCK and LIVE modes,
 * but in MOCK mode the live call is forwarded to live.call anyway (so the
 * playground always hits the real server).
 */
export const apiCall = async <T = unknown>(
  endpoint: string,
  body: Record<string, unknown> = {},
): Promise<T> => live.call<T>(endpoint, body);
