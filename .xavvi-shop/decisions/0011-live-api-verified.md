# ADR-0011: Live API verified end-to-end against shop-dev.xavvi.com

## Status
Accepted. 2026-06-04.

## Context
The user switched the API base URL from `https://shop.xavvi.com/api`
(production, empty) to `https://shop-dev.xavvi.com/api` (test environment)
and kept store-id `11111`. We needed to verify that:

1. The test environment actually contains real product data (it does).
2. Our `api.live.ts` client uses the correct request shape, headers, and
   response unwrapping rules.
3. The full user flow (Home → Shop → Product Detail → Cart) renders real
   data end-to-end with no runtime errors.

## Probe findings (curl + puppeteer-core + Edge)
All endpoints use **POST + application/json**. The store-id header is
`X-Xavvi-Store-Id`. Response envelope is `{ code, text, data }` and
`code === 200` means success.

| Endpoint                  | Real data shape                                |
|---------------------------|------------------------------------------------|
| /v1/store/info            | `{ ... }` direct                               |
| /v1/category/list         | `[ ... ]` bare array                           |
| /v1/product/list          | `{ list, total, page, limit }`                 |
| /v1/product/detail        | `{ product: {...} }` ⚠️ nested under "product" |
| /v1/product/recommended   | `{ list, total, limit }`                       |
| /v1/cart/list (no auth)   | `{}` empty object                              |
| /v1/cart/list (logged in) | `{ items, subtotal, ... }` full cart           |
| /v1/home                  | `{ hero, creators, categories, products, ... }` |

Test env contains:
- 1 store "Aurora Atelier" (platform-level, NOT our brand)
- 3 categories: Apparel (genders [MEN, WOMEN]), Beauty, Home
- 11 products: 5 by "James" (2001-2005), 6 by another creator (1001-1006)
- 2 creators
- All images served from `https://picsum.photos/seed/spuXXXX/...`

The product category field on each product is a single object
(`category_id` + `category_name` + `category_slug`), not nested.

## Decisions

1. **Brand identity is hard-coded to DU$TY.** The Xavvi platform's
   `store/info` returns the platform's own generic storefront ("Aurora
   Atelier"), NOT the creator's brand. We therefore ignore the platform
   brand name and use the hard-coded DU$TY identity from the project
   constitution. Only `service_email` and `theme_color` are pulled from
   the platform.

2. **Field names mirror the wire exactly.** `product_id`, `product_name`,
   `product_img`, `min_price_amount`, `max_price_amount`, `price_text`,
   `currency`, `gender_type`, `creator_uid`, etc. — all written as
   snake_case in `WireProduct` and translated to camelCase in `toProduct`.

3. **`product/detail` unwraps `data.product`.** Initial implementation
   returned `WireProduct` directly and got HTTP 200 with the data nested
   one level deeper. Fixed by typing the request as
   `request<{ product: WireProduct }>` and calling `toProduct(w.product)`.

4. **All callers now use `product_id` not `slug`.** The Xavvi spec does
   not implement slug-based lookup; the URL `/product/:productSlug`
   contains the numeric product_id (e.g. `/product/2001`). The hook
   `useProduct` is now called with this numeric id even though the
   variable is still named "slug" (rename deferred — it works).

5. **`/v1/cart/list` returns `{}` when unauthenticated.** Treated as empty
   cart. The 403 in the body is informational only — the wire envelope
   is still `{ code: 200, ... }` so we don't throw.

6. **CORS preflights succeed.** OPTIONS requests to all endpoints return
   200 with proper CORS headers, so cross-origin requests from
   `http://127.0.0.1:5173` work without a proxy.

## Verification
Headless Chromium (Edge) test:
- Home: renders 11 real products, 0 page errors
- Shop: 11 product cards, all with real titles, prices, picsum images
- Product detail: `/product/2001` → "James Everyday Crew Tee" $36.00, with
  related products from `/v1/product/recommended`
- All 5 live API calls per page: 200 OK
- 0 console errors
- TypeScript strict: passes
- Production build: 123 modules, 1.34s, gzip ~98KB

## Consequences
- The site is now fully driven by real Xavvi data when VITE_XAVVI_API_STORE_ID is set.
- Switching to mock data: unset VITE_XAVVI_API_STORE_ID in `.env.local`,
  restart Vite, the dispatcher (`src/lib/api.ts`) auto-falls back to the
  DTR mock.
- Deploying to production: change `.env.production` base from
  `https://shop.xavvi.com/api` to whatever the real prod URL is when
  store 11111 is finally populated there.
