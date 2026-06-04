# ADR-0011: Verified end-to-end LIVE API integration

**Date:** 2026-06-04
**Status:** Accepted (verified)
**Author:** Skill agent

## Context

After ADR-0010 corrected the API base URL from the fabricated `api.xavvi.com`
to the real `https://shop.xavvi.com/api`, we needed to verify that the
integration actually works end-to-end with `store-id=11111`.

## Verification performed

Headless Chromium run against the running dev server, capturing all
`xavvi.com` network calls and their responses.

### Results

| Endpoint | Method | Status | Response |
|---|---|---|---|
| `/cart/list` | POST | 200 | `{"code":403,"text":"User not logged in!"}` (expected without auth) |
| `/product/list` | POST | 200 | `{"code":200,"data":{"list":[],"total":0,...}}` (store has no products yet) |
| `/category/list` | POST | 200 | `{"code":200,"data":{"list":[Home Supplies, Kitchenware, ... 20 cats]}}` |
| `/store/info` | POST | 404 | `Not Found` (this endpoint is broken on server, fallback works) |
| CORS preflight (OPTIONS) | — | 200 | Server correctly allows cross-origin |

### Console output

```
[Xavvi API] Mode: LIVE (base=https://shop.xavvi.com/api, store=set)
```

### Page render

- `rootLen`: 32,465 chars (full content)
- Page errors: 1 (the 404 from `/store/info`, already handled by fallback)
- All hero / nav / footer / shop sections render correctly

## What this proves

1. The Vite env vars (`.env.local`) are correctly read at startup
2. The dispatcher (`src/lib/api.ts`) correctly switches MOCK → LIVE
3. The HTTP layer in `src/lib/api.live.ts` correctly:
   - Uses POST for all endpoints
   - Sets `X-Xavvi-Store-Id: 11111` header
   - Parses `{code, text, data}` envelope
4. The CORS preflight works (no browser-side blocking)
5. Field transformers (`toProduct`, `toCategory`, etc.) handle empty list cases
6. The graceful fallback for `store/info` (404) works — page still renders

## What this does NOT prove

- Real product data (store 11111 has 0 products yet — backend setup needed)
- Auth flow (login/register/checkout) — these need a real user token
- The cart persistence UUID lifecycle

## Next steps for the user

1. Visit Xavvi creator dashboard, ensure store 11111 has at least one product
2. Refresh the page — `/product/list` will return real data
3. To test checkout flow, need a real user account / token in `localStorage`
