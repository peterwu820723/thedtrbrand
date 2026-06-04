/**
 * React Query hooks — the main way components fetch data.
 * Centralizes query keys, error handling, cache invalidation.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "@/lib/api";
import { useUIStore } from "@/stores/uiStore";

// ================================================================
// Query Keys
// ================================================================

export const qk = {
  storeInfo: ["storeInfo"] as const,
  categories: ["categories"] as const,
  category: (slug: string) => ["category", slug] as const,
  products: (params?: object) => ["products", params ?? {}] as const,
  product: (slug: string) => ["product", slug] as const,
  related: (id: string) => ["related", id] as const,
  cart: ["cart"] as const,
  shipping: ["shipping"] as const,
  content: (slug: string) => ["content", slug] as const,
};

// ================================================================
// Queries
// ================================================================

export const useStoreInfo = () =>
  useQuery({ queryKey: qk.storeInfo, queryFn: api.getStoreInfo, staleTime: 5 * 60_000 });

export const useCategories = () =>
  useQuery({ queryKey: qk.categories, queryFn: api.getCategories, staleTime: 5 * 60_000 });

export const useCategory = (slug: string) =>
  useQuery({
    queryKey: qk.category(slug),
    queryFn: () => api.getCategoryBySlug(slug),
    enabled: !!slug,
  });

export const useProducts = (params?: Parameters<typeof api.getProducts>[0]) =>
  useQuery({ queryKey: qk.products(params), queryFn: () => api.getProducts(params) });

export const useProduct = (slug: string) =>
  useQuery({
    queryKey: qk.product(slug),
    queryFn: () => api.getProductBySlug(slug),
    enabled: !!slug,
  });

export const useRelatedProducts = (id: string) =>
  useQuery({
    queryKey: qk.related(id),
    queryFn: () => api.getRelatedProducts(id, 4),
    enabled: !!id,
  });

export const useCart = () =>
  useQuery({ queryKey: qk.cart, queryFn: api.getCart, staleTime: 0 });

export const useShippingOptions = () =>
  useQuery({ queryKey: qk.shipping, queryFn: () => api.getShippingOptions() });

export const useContentPage = (slug: string) =>
  useQuery({
    queryKey: qk.content(slug),
    queryFn: () => api.getContentPage(slug),
    enabled: !!slug,
  });

// ================================================================
// Mutations
// ================================================================

export const useAddToCart = () => {
  const qc = useQueryClient();
  const showToast = useUIStore((s) => s.showToast);
  return useMutation({
    mutationFn: api.addCartItem,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.cart });
      showToast("Added to bag", "success");
    },
    onError: () => showToast("Could not add to bag", "error"),
  });
};

export const useUpdateCartItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      api.updateCartItem(itemId, quantity),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.cart }),
  });
};

export const useRemoveCartItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.removeCartItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.cart }),
  });
};

export const useCreateOrder = () =>
  useMutation({ mutationFn: api.createOrder });
