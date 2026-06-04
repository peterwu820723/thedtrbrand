import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// Xavvi Shop build configuration
// - Base = "/" for Cloudflare Pages
// - Manual chunks for vendor / routes for optimal caching
// - Sourcemaps enabled in dev only
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2022",
    cssCodeSplit: true,
    sourcemap: mode === "development",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          data: ["@tanstack/react-query", "zustand"],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    strictPort: false,
  },
  preview: {
    port: 4173,
  },
}));
