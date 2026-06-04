// Shared module for API config. Both api.ts and api.live.ts read from
// here at module load. api.ts may overwrite at startup with env-var
// values if they were set at build time.
//
// Hardcoded defaults match the Vercel demo environment so the storefront
// always shows products. Switch FALLBACK_BASE to shop.xavvi.com once
// the production store 11111 is populated.
export const env = {
  base: "https://shop-dev.xavvi.com/api",
  storeId: "11111",
};

