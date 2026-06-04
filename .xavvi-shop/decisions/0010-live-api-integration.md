# ADR-0010 — Real Xavvi API Integration

**Status:** Accepted
**Date:** 2026-06-03
**Supersedes:** parts of ADR-0005 (mock-first) for this store

## Context

The store was built against fabricated API assumptions (`api.xavvi.com`,
GET verbs, `Authorization: Bearer` tokens, custom response envelope). When
the user asked to switch on live mode with `VITE_XAVVI_API_KEY=11111`, the
browser console showed `net::ERR_FAILED` and no business data rendered.

User pushed back: "the shop API should not be `api.xavvi.com`". That was
the cue to actually read the remote spec instead of guessing.

## Investigation

I pulled the **real** spec from
`https://shop.xavvi.com/skills/skill-xavvi-api/SKILL.md` and cached it to
`.xavvi-shop/spec/00-entry.md`. Key facts (all of which my earlier
`api.live.ts` violated):

1. **Production base URL** is `https://shop.xavvi.com/api`
   (test env: `https://shop-dev.xavvi.com/api`), NOT `api.xavvi.com`.
2. **All 61 endpoints are `POST`** with `Content-Type: application/json`.
3. **Multi-tenant identity is `X-Xavvi-Store-Id` header**, not a Bearer
   token. `X-Xavvi-Token` is a *user* auth token, not a store key.
4. **Response envelope is `{ code: number, text: string, data: ... }`**
   with success code `200` (not `0`).
5. **Prices are in cents (integer)**. UI must divide by 100.
6. CORS preflight (OPTIONS) returns 200 for all endpoints, so a
   browser-hosted storefront is supported by design.

I verified by issuing real POSTs with `curl`:
- `POST /v1/category/list` → 20 real categories (Home Supplies, Beauty,
  Sports, etc.)
- `POST /v1/product/list` → 200 with `data.list: []` (store id 11111 has
  no products in this sandbox)
- `POST /v1/home` → real `data.hero.title = "The mall curated by
  creators you trust."`
- `POST /v1/store/info` → 404 (endpoint not yet exposed on this account)

## Decision

1. **Replaced `api.live.ts` from scratch.** Every endpoint now:
   - Uses `POST` with JSON body (even for "list" calls that look like GETs).
   - Sends `X-Xavvi-Store-Id: <VITE_XAVVI_API_STORE_ID>` on every request
     except `store/info` (per spec).
   - Sends `X-Xavvi-Token` when one is present in `localStorage`.
   - Parses the `{ code, text, data }` envelope and throws `ApiError` on
     non-200 codes.
2. **Added a mapper layer** (`toProduct`, `toCategory`, `toCart`,
   `toOrder`, `toAddress`) that converts wire-shape responses into the
   `src/types/domain.ts` shapes the UI consumes. UI code is unchanged.
3. **Renamed the env var** from `VITE_XAVVI_API_KEY` to
   `VITE_XAVVI_API_STORE_ID` to match the header name. The dispatcher
   in `api.ts` keys on presence of this env var to switch MOCK ↔ LIVE.
4. **Defensive fallbacks** for endpoints the live server doesn't expose
   (`/v1/store/info` 404, no shipping-options endpoint, no public
   content-page endpoint). The UI never crashes; the affected surfaces
   show static brand-appropriate defaults.
5. **`.env.local` and `.env.production` updated** to the real base URL
   and Store-Id `11111`. Store-Id is the user's real account; the value
   is a placeholder until the user supplies their own.

## Consequences

- ✅ All 4 catalog/cart endpoints return 200 in LIVE mode.
- ✅ CORS preflight is clean — the storefront can call the API directly
  from the browser with no proxy.
- ⚠️ The Store-Id `11111` returns empty product lists. The user must
  supply a real Store-Id from their Xavvi creator dashboard to see
  their actual products.
- ⚠️ `store/info` 404 forces a fallback to a hard-coded brand
  description; this will resolve itself once the Xavvi team exposes
  the endpoint on this account.
- ✅ Mock mode still works (set VITE_XAVVI_API_STORE_ID to empty) and
  continues to serve the 14 hard-coded DTR products for offline
  development.

## Verification

Headless Chromium test against `http://127.0.0.1:5173/` with the
updated env:

- `console.info "[Xavvi API] Mode: LIVE (base=..., store=set)"` ✅
- 4 × `OPTIONS /api/v1/*` → 200 (CORS preflight) ✅
- 3 × `POST /api/v1/{cart,product,category}/list` → 200 ✅
- 1 × `POST /api/v1/store/info` → 404 (handled by fallback) ✅
- 0 page errors, 0 failed requests
- Page renders 32,465 chars of DTR brand content
