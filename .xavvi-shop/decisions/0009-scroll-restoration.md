# ADR-0009: Custom scroll restoration (not <ScrollRestoration />)

**Status:** Accepted
**Date:** 2026-06-03
**Decider:** Implementation

## Context

Initial implementation used React Router's `<ScrollRestoration />` component inside
`Layout.tsx`. On first load the entire React tree crashed with:

```
useScrollRestoration must be used within a data router.
  See https://reactrouter.com/v6/routers/picking-a-router
```

`<ScrollRestoration />` only works with the data routers
(`createBrowserRouter`, `createMemoryRouter`, `createHashRouter`). We use the
classic `<BrowserRouter>` (intentionally — simpler mental model, no loader/action
plumbing needed for a static-ish storefront).

The error threw during initial render, so the whole tree unmounted and the
browser showed a blank page (`<div id="root">` was empty). Verified with
headless Chromium via puppeteer-core.

## Decision

Replace `<ScrollRestoration />` with a custom `useScrollRestoration()` hook
in `src/hooks/useScrollRestoration.ts` that:

1. Saves `window.scrollY` per route key in a module-level `Map` (rAF-throttled).
2. On location change, restores saved position if the user navigated back, or
   scrolls to top on a fresh push/replace.

## Consequences

- ✅ Works with classic `<BrowserRouter>`.
- ✅ Same observable behavior as the built-in component for a static store.
- ⚠️ Slightly less accurate on browser back/forward edge cases (we infer
  POP via `window.history.state.idx`); acceptable for an e-commerce use case
  where deep back-traversal through many product pages is uncommon.
- 📝 Pinned to BrowserRouter by design — migrating to a data router would
  change routing semantics and is out of scope for this project.

## Verification

After the fix, all 9 routes (`/`, `/shop`, `/about`, `/music`, `/tour`,
`/contact`, `/cart`, `/checkout`, `/legal/terms`) render successfully
(root innerHTML > 10KB each, no page errors).
