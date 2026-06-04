/**
 * UI store: cart drawer, mobile menu, modals.
 * Cart data itself is fetched from the API (cached by React Query).
 */

import { create } from "zustand";

interface UIState {
  cartDrawerOpen: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  toast: { id: string; message: string; tone: "info" | "success" | "error" } | null;

  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  showToast: (message: string, tone?: "info" | "success" | "error") => void;
  dismissToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  cartDrawerOpen: false,
  mobileMenuOpen: false,
  searchOpen: false,
  toast: null,

  openCartDrawer: () => set({ cartDrawerOpen: true }),
  closeCartDrawer: () => set({ cartDrawerOpen: false }),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  showToast: (message, tone = "info") =>
    set({
      toast: { id: Date.now().toString(), message, tone },
    }),
  dismissToast: () => set({ toast: null }),
}));
