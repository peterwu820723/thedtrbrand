// Shared module for API config. api.ts writes here; api.live.ts reads from here.
// This indirection lets us inject hardcoded fallbacks without changing
// api.live.ts to depend on import.meta.env (which only works at build time).
export const env = {
  base: "",
  storeId: "",
};
