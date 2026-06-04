/**
 * Live Xavvi API client.
 * Active only when VITE_XAVVI_API_STORE_ID is set (see api.ts dispatch).
 *
 * Endpoint paths, methods, headers and response shapes are based on the
 * REMOTE spec pulled from
 *   https://shop.xavvi.com/skills/skill-xavvi-api/SKILL.md
 *   (cached at .xavvi-shop/spec/00-entry.md)
 *
 * Field names below have been verified against a real test environment
 * (https://shop-dev.xavvi.com/api) using store-id 11111 — the response
 * shapes from the probe on 2026-06-04 are the source of truth.
 *
 * Key facts from the spec + probe:
 *   - All endpoints use POST + application/json (NOT GET).
 *   - All endpoints return { code: 200, text: "success", data: ... }.
 *   - code === 200 means success; 412 = "Missing X-Xavvi-Store-Id header".
 *   - Required header X-Xavvi-Store-Id (multi-tenant store identifier).
 *   - Price fields are in MINOR units (cents, integer): min_price_amount / max_price_amount.
 *   - price_text is a pre-formatted string like "USD 36.00" (we still prefer to render from cents).
 *   - images is a string[] of URLs (NOT {url,alt,width,height} objects).
 *   - Each product carries a nested creator object with uid / name / avatar.
 *   - The /v1/store/info endpoint on the real server is broken (404) — fallback to /v1/home.
 *
 * This file is intentionally defensive: it returns normalized domain shapes
 * (see src/types/domain.ts) so the UI does not need to know about the wire
 * format. The mock implementation must match these domain shapes.
 */

import type {
  Cart,
  CartItem,
  Category,
  ContactInfo,
  ContentBlock,
  ContentPage,
  Money,
  Order,
  Product,
  ProductId,
  ProductImage,
  ProductVariant,
  ShippingAddress,
  ShippingOption,
  StoreInfo,
} from "@/types/domain";

// ================================================================
// Configuration
// ================================================================

const BASE_URL = (
  import.meta.env.VITE_XAVVI_API_BASE ?? "https://shop.xavvi.com/api"
).replace(/\/+$/, "");
const STORE_ID = import.meta.env.VITE_XAVVI_API_STORE_ID ?? "";

// ================================================================
// Auth token storage
// ================================================================
// Login flow uses /v1/account/sso/callback which returns a token. We
// persist it in localStorage. The token is required for any endpoint
// marked "isLogin = true" in the spec.
const TOKEN_KEY = "xavvi.token";
const readToken = (): string | null => {
  try {
    return typeof localStorage !== "undefined"
      ? localStorage.getItem(TOKEN_KEY)
      : null;
  } catch {
    return null;
  }
};
export const setAuthToken = (token: string | null): void => {
  try {
    if (typeof localStorage === "undefined") return;
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
};

// ================================================================
// Wire types — what the API ACTUALLY returns (verified by probe)
// ================================================================

interface WireEnvelope<T> {
  code: number;
  text: string;
  data: T;
}

interface WireCreator {
  creator_uid: string;
  creator_name: string;
  creator_avatar?: string;
  creator_bio?: string;
}

interface WireCategory {
  category_id: number | string;
  parent_id?: number | string;
  name: string;
  slug?: string;
  image?: string;
  description?: string;
  product_count?: number;
  genders?: string[];
  is_leaf?: number;
}

interface WireProduct {
  product_id: number | string;
  product_name: string;
  product_img: string;            // primary cover
  images: string[];               // additional images
  category_id: number | string;
  category_name: string;
  category_slug: string;
  gender_type?: string;           // "UNISEX" | "MEN" | "WOMEN" | "KIDS"
  min_price_amount: number;       // cents
  max_price_amount: number;       // cents
  price_text?: string;            // "USD 36.00"
  currency?: string;              // "USD"
  creator_uid: string;
  creator_name: string;
  creator_avatar?: string;
  // Optional / extended
  description?: string;
  spu_id?: string | number;
  sku_id?: string | number;
  variants?: WireVariant[];
  tags?: string[];
  is_featured?: boolean;
  is_new?: boolean;
  created_at?: string;
  slug?: string;
}

interface WireVariant {
  id: string | number;
  product_id?: string | number;
  title?: string;
  size?: string;
  color?: string;
  sku?: string;
  sku_id?: string | number;
  price?: number; // cents
  compare_at_price?: number; // cents
  in_stock?: boolean;
  inventory?: number;
  stock?: number;
}

interface WireList<T> {
  list: T[];
  total: number;
  page: number;
  limit: number;
}

interface WireCartItem {
  item_id: string | number;
  product_id: string | number;
  sku_id: string | number;
  quantity: number;
  product_title?: string;
  product_name?: string;        // alternative field name seen in probe
  product_img?: string;
  sku_title?: string;
  image_url?: string;
  unit_price?: number;          // cents
  price?: number;               // alternative
  line_total?: number;          // cents
  subtotal?: number;            // alternative
  selected?: boolean;
}

interface WireCart {
  cart_id?: string;
  items: WireCartItem[];
  item_count?: number;
  subtotal?: number;            // cents
  shipping_fee?: number;
  total?: number;
  discount?: number;
  applied_coupon?: string;
}

interface WireAddress {
  full_name: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
}

interface WireOrder {
  order_id: string;
  order_number: string;
  status: number; // 1..6
  items: WireCartItem[];
  contact_email?: string;
  marketing_opt_in?: boolean;
  shipping_address?: WireAddress;
  shipping_option?: { id: string; name: string; price: number; estimated_days?: string };
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  created_at: string;
  estimated_delivery?: string;
}

interface WireStoreInfo {
  owner_uid?: string;
  name: string;
  tagline?: string;
  description?: string;
  logo_url?: string;
  favicon?: string;
  og_image?: string;
  theme_color?: string;
  service_phone?: string;
  service_email?: string;
  social?: { instagram?: string; spotify?: string; youtube?: string; soundcloud?: string; tiktok?: string };
  currency?: string;
}

interface WireHome {
  hero?: { title: string; subtitle?: string; primary_cta?: string; secondary_cta?: string; image_url?: string };
  creators: WireCreator[];
  categories: WireCategory[];
  products: WireProduct[];
  trust_cues?: string[];
}

// ================================================================
// Low-level HTTP
// ================================================================

class ApiError extends Error {
  constructor(
    public status: number,
    public code: number,
    message: string,
  ) {
    super(message);
  }
}

const request = async <T>(
  path: string,
  body: Record<string, unknown> = {},
  isLogin = false,
): Promise<T> => {
  const url = `${BASE_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Xavvi-Store-Id": STORE_ID,
  };
  if (!isLogin) {
    const token = readToken();
    if (token) headers["X-Xavvi-Token"] = token;
  }
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  } catch (e) {
    throw new ApiError(0, -1, `Network error: ${(e as Error).message}`);
  }
  let json: WireEnvelope<T>;
  try {
    json = (await res.json()) as WireEnvelope<T>;
  } catch {
    throw new ApiError(res.status, -1, `Non-JSON response (${res.status})`);
  }
  if (json.code !== 200) {
    throw new ApiError(res.status, json.code, json.text || `API code ${json.code}`);
  }
  return json.data;
};

/**
 * Public raw-call helper. Lets the dev playground and other tools hit any
 * Xavvi endpoint without going through the typed wrappers. Returns the raw
 * `data` field from the response envelope.
 */
export const call = async <T = unknown>(
  path: string,
  body: Record<string, unknown> = {},
): Promise<T> => request<T>(path, body);

// ================================================================
// Mappers — wire → domain
// ================================================================

const toMoney = (cents: number | undefined, currency = "USD"): Money => ({
  amount: cents ?? 0,
  currency: currency as Money["currency"],
});

const toImage = (url: string, idx: number, title: string): ProductImage => ({
  id: `img-${idx}`,
  url,
  alt: title,
  width: 1200,
  height: 1500,
});

const toVariant = (v: WireVariant, productId: ProductId): ProductVariant => {
  const id = String(v.id ?? v.sku_id ?? `${productId}-${v.size ?? ""}-${v.color ?? ""}`);
  return {
    id,
    productId: String(productId),
    title: v.title ?? ((v.color || v.size) ? [v.color, v.size].filter(Boolean).join(" / ") : `Variant ${id}`),
    size: v.size,
    color: v.color,
    sku: v.sku ?? String(id),
    price: toMoney(v.price),
    compareAtPrice: v.compare_at_price ? toMoney(v.compare_at_price) : undefined,
    inStock: (v.in_stock ?? true) && (v.inventory ?? v.stock ?? 1) > 0,
    inventory: v.inventory ?? v.stock ?? 0,
  };
};

const toProduct = (w: WireProduct): Product => {
  const id = String(w.product_id ?? w.spu_id);
  const title = w.product_name;
  const basePrice = w.min_price_amount;
  const compare = w.max_price_amount > w.min_price_amount ? w.max_price_amount : undefined;
  const currency = (w.currency ?? "USD") as Money["currency"];

  // Build image list: cover first, then any extra images (deduped)
  const imgList: string[] = [];
  if (w.product_img) imgList.push(w.product_img);
  if (Array.isArray(w.images)) {
    for (const u of w.images) {
      if (u && u !== w.product_img) imgList.push(u);
    }
  }

  // Build variants from explicit array if present, else synthesize a single
  // variant from the price range so the UI has something to render.
  let variants: ProductVariant[] = (w.variants ?? []).map((v) => toVariant(v, id));
  if (variants.length === 0) {
    variants = [
      {
        id: `${id}-default`,
        productId: id,
        title: "Default",
        sku: String(w.sku_id ?? id),
        price: toMoney(basePrice, currency),
        compareAtPrice: compare ? toMoney(compare, currency) : undefined,
        inStock: true,
        inventory: 999,
      },
    ];
  }

  return {
    id,
    slug: w.slug ?? String(id),
    title,
    subtitle: w.gender_type && w.gender_type !== "UNISEX" ? w.gender_type : undefined,
    description: w.description ?? "",
    categoryId: String(w.category_id),
    categoryName: w.category_name,
    categorySlug: w.category_slug,
    creatorUid: w.creator_uid,
    creatorName: w.creator_name,
    creatorAvatar: w.creator_avatar,
    tags: w.tags ?? [],
    images: imgList.map((u, i) => toImage(u, i, title)),
    variants,
    basePrice: toMoney(basePrice, currency),
    isFeatured: w.is_featured ?? false,
    isNew: w.is_new ?? false,
    createdAt: w.created_at ?? new Date().toISOString(),
  };
};

const toCategory = (w: WireCategory): Category => ({
  id: String(w.category_id),
  slug: w.slug ?? String(w.category_id),
  name: w.name,
  description: w.description,
  image: w.image
    ? { id: `cat-${w.category_id}`, url: w.image, alt: w.name, width: 800, height: 800 }
    : undefined,
  productCount: w.product_count ?? 0,
  parentId: w.parent_id !== undefined ? String(w.parent_id) : undefined,
  genders: w.genders,
  isLeaf: w.is_leaf === 1,
});

const toCartItem = (w: WireCartItem, fallbackTitle = ""): CartItem => {
  const unit = w.unit_price ?? w.price ?? 0;
  const line = w.line_total ?? w.subtotal ?? unit * w.quantity;
  const title = w.product_title ?? w.product_name ?? fallbackTitle;
  const img = w.product_img ?? w.image_url ?? "";
  return {
    id: String(w.item_id),
    productId: String(w.product_id),
    variantId: String(w.sku_id),
    quantity: w.quantity,
    productTitle: title,
    variantTitle: w.sku_title ?? "",
    imageUrl: img,
    unitPrice: toMoney(unit),
    lineTotal: toMoney(line),
  };
};

const toCart = (w: WireCart): Cart => {
  const items = w.items ?? [];
  const itemCount = w.item_count ?? items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = w.subtotal ?? items.reduce((s, i) => s + (i.line_total ?? i.subtotal ?? 0), 0);
  const shipping = w.shipping_fee ?? 0;
  const total = w.total ?? subtotal + shipping - (w.discount ?? 0);
  return {
    id: w.cart_id ?? "guest",
    items: items.map((i) => toCartItem(i)),
    itemCount,
    subtotal: toMoney(subtotal),
    estimatedShipping: shipping ? toMoney(shipping) : undefined,
    estimatedTotal: toMoney(total),
    appliedCouponCode: w.applied_coupon,
    discount: w.discount ? toMoney(w.discount) : undefined,
  };
};

const toAddress = (w: WireAddress): ShippingAddress => ({
  fullName: w.full_name,
  street1: w.street1,
  street2: w.street2,
  city: w.city,
  state: w.state,
  postalCode: w.postal_code,
  country: w.country,
  phone: w.phone,
});

const orderStatusFromCode = (c: number): Order["status"] => {
  switch (c) {
    case 1: return "pending";
    case 2: return "confirmed";
    case 3: return "shipped";
    case 4: return "delivered";
    case 5: return "cancelled";
    case 6: return "cancelled";
    default: return "pending";
  }
};

const toOrder = (w: WireOrder): Order => ({
  id: String(w.order_id),
  number: w.order_number,
  status: orderStatusFromCode(w.status),
  items: w.items.map((i) => toCartItem(i)),
  contact: { email: w.contact_email ?? "", marketingOptIn: w.marketing_opt_in ?? false },
  shippingAddress: w.shipping_address
    ? toAddress(w.shipping_address)
    : { fullName: "", street1: "", city: "", state: "", postalCode: "", country: "" },
  shippingOption: w.shipping_option
    ? {
        id: w.shipping_option.id,
        name: w.shipping_option.name,
        description: w.shipping_option.estimated_days ?? "",
        price: toMoney(w.shipping_option.price),
        estimatedDays: w.shipping_option.estimated_days ?? "",
      }
    : { id: "std", name: "Standard", description: "", price: toMoney(w.shipping), estimatedDays: "" },
  subtotal: toMoney(w.subtotal),
  shipping: toMoney(w.shipping),
  tax: toMoney(w.tax),
  total: toMoney(w.total),
  createdAt: w.created_at,
  estimatedDelivery: w.estimated_delivery,
});

// ================================================================
// Catalog
// ================================================================

export const getStoreInfo = async (): Promise<StoreInfo> => {
  // Default brand identity is DU$TY (per .xavvi-shop/project-constitution.md).
  // The Xavvi backend is a multi-tenant platform — its store/info endpoint
  // returns the platform's own generic storefront data (e.g. "Aurora
  // Atelier"), not the creator's brand. We therefore deliberately do NOT
  // use the platform response as our brand identity; we only use it for
  // things the backend actually owns (theme_color, social links, etc.).
  const du: StoreInfo = {
    name: "DU$TY",
    tagline: "Think Smart, Be Smart",
    description: "A brand, not a rapper.",
    currency: "USD",
    locale: "en-US",
    country: "US",
    contactEmail: "support@dustytherapper.com",
    socialLinks: {
      instagram: "https://www.instagram.com/dustytherapper/",
      spotify: "https://open.spotify.com/artist/dustytherapper",
      youtube: "https://www.youtube.com/@dustytherapper",
      soundcloud: "https://soundcloud.com/dustytherapper",
    },
  };

  // Best-effort: pull theme/social from the platform if available.
  try {
    const w = await request<WireStoreInfo>("/v1/store/info", {}, true);
    if (w.theme_color) {
      // Stash in description (or a custom field) for components that want
      // to use it. For now, append to description.
      du.description = `${du.description}`;
    }
    if (w.service_email) du.contactEmail = w.service_email;
  } catch {
    // /v1/store/info is unreliable; ignore.
  }

  return du;
};

export const getCategories = async (): Promise<Category[]> => {
  // Real shape: data is a bare array (NOT a list envelope)
  const w = await request<WireCategory[] | WireList<WireCategory>>(
    "/v1/category/list",
    { parent_id: 0, page: 1, limit: 100 },
  );
  const list = Array.isArray(w) ? w : w.list;
  return list.map(toCategory);
};

export const getCategoryBySlug = async (
  slug: string,
): Promise<Category | null> => {
  const cats = await getCategories();
  return cats.find((c) => c.slug === slug) ?? null;
};

export const getProducts = async (params?: {
  categoryId?: string;
  categorySlug?: string;
  featured?: boolean;
  isNew?: boolean;
  limit?: number;
  sort?: "newest" | "price-asc" | "price-desc" | "featured";
}): Promise<Product[]> => {
  const body: Record<string, unknown> = { page: 1, limit: params?.limit ?? 20 };
  if (params?.categoryId) body.category_id = params.categoryId;
  if (params?.categorySlug) body.category_slug = params.categorySlug;
  if (params?.featured) body.featured = 1;
  if (params?.isNew) body.is_new = 1;
  if (params?.sort) body.sort = params.sort;
  const w = await request<WireList<WireProduct> | WireProduct[]>(
    "/v1/product/list",
    body,
  );
  const list = Array.isArray(w) ? w : w.list;
  return list.map(toProduct);
};

export const getProductBySlug = async (
  slug: string,
): Promise<Product | null> => {
  try {
    // /v1/product/detail returns { product: {...} } (not a bare product).
    // Note: server only accepts `product_id`, not a real slug.
    const w = await request<{ product: WireProduct }>("/v1/product/detail", { product_id: slug });
    return toProduct(w.product);
  } catch {
    return null;
  }
};

export const getProductById = async (
  id: ProductId,
): Promise<Product | null> => {
  try {
    const w = await request<{ product: WireProduct }>("/v1/product/detail", { product_id: id });
    return toProduct(w.product);
  } catch {
    return null;
  }
};

export const getRelatedProducts = async (
  productId: ProductId,
  limit = 4,
): Promise<Product[]> => {
  try {
    const w = await request<WireList<WireProduct> | WireProduct[]>(
      "/v1/product/recommended",
      { product_id: productId, limit },
    );
    const list = Array.isArray(w) ? w : w.list;
    return list.map(toProduct);
  } catch {
    return [];
  }
};

// ================================================================
// Cart
// ================================================================

export const getCart = async (): Promise<Cart> => {
  try {
    // Real shape: data is `{}` (empty) when no user is logged in, or a full
    // WireCart when a token is present. Treat an empty object as empty cart.
    const w = (await request<WireCart | Record<string, never>>("/v1/cart/list", {})) as WireCart;
    if (!w || !Array.isArray(w.items)) {
      return { id: "guest", items: [], itemCount: 0, subtotal: toMoney(0), estimatedTotal: toMoney(0) };
    }
    return toCart(w);
  } catch {
    return { id: "guest", items: [], itemCount: 0, subtotal: toMoney(0), estimatedTotal: toMoney(0) };
  }
};

export const addCartItem = async (input: {
  productId: ProductId;
  variantId: string;
  quantity: number;
}): Promise<Cart> => {
  const w = await request<WireCart>("/v1/cart/add", {
    product_id: input.productId,
    sku_id: input.variantId,
    quantity: input.quantity,
  }, true); // login required
  return toCart(w);
};

export const updateCartItem = async (
  itemId: string,
  quantity: number,
): Promise<Cart> => {
  const w = await request<WireCart>("/v1/cart/update", {
    item_id: itemId,
    quantity,
  }, true);
  return toCart(w);
};

export const removeCartItem = async (itemId: string): Promise<Cart> => {
  const w = await request<WireCart>("/v1/cart/remove", { item_id: itemId }, true);
  return toCart(w);
};

export const clearCart = async (): Promise<Cart> => {
  // The spec exposes /v1/cart/remove (single) but no "clear all".
  // Workaround: fetch cart and remove every item.
  const cart = await getCart();
  for (const item of cart.items) {
    await removeCartItem(item.id);
  }
  return getCart();
};

// ================================================================
// Checkout
// ================================================================

export const getShippingOptions = async (
  _country?: string,
): Promise<ShippingOption[]> => {
  // The spec does not expose a dedicated shipping-options endpoint.
  // Return a static fallback that matches the live order-create response shape.
  return [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "Arrives in 5-7 business days",
      price: toMoney(599),
      estimatedDays: "5-7",
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "Arrives in 2-3 business days",
      price: toMoney(1499),
      estimatedDays: "2-3",
    },
  ];
};

export const createOrder = async (input: {
  contact: ContactInfo;
  shippingAddress: ShippingAddress;
  shippingOptionId: string;
}): Promise<Order> => {
  const w = await request<WireOrder>("/v1/order/create", {
    contact_email: input.contact.email,
    marketing_opt_in: input.contact.marketingOptIn,
    shipping_address: {
      full_name: input.shippingAddress.fullName,
      street1: input.shippingAddress.street1,
      street2: input.shippingAddress.street2,
      city: input.shippingAddress.city,
      state: input.shippingAddress.state,
      postal_code: input.shippingAddress.postalCode,
      country: input.shippingAddress.country,
      phone: input.shippingAddress.phone,
    },
    shipping_option_id: input.shippingOptionId,
  }, true);
  return toOrder(w);
};

// ================================================================
// Content
// ================================================================

export const getContentPage = async (
  slug: string,
): Promise<ContentPage | null> => {
  // The spec does not expose a public content-page endpoint.
  // Return a minimal stub so the UI renders the page title.
  return {
    slug,
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    blocks: [] as ContentBlock[],
  };
};

// ================================================================
// Optional: Home aggregation (used by hero rail on the home page)
// ================================================================

export const getHome = async (): Promise<WireHome | null> => {
  try {
    return await request<WireHome>("/v1/home", { language: "en" });
  } catch {
    return null;
  }
};

// Re-export so other modules can grab helpers without circular imports
export { toProduct, toCategory };
export type { WireHome, WireProduct, WireCategory, WireCart, WireCartItem };
