/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand
        "bg-primary": "var(--color-bg-primary)",
        "bg-secondary": "var(--color-bg-secondary)",
        "bg-elevated": "var(--color-bg-elevated)",
        "fg-primary": "var(--color-fg-primary)",
        "fg-secondary": "var(--color-fg-secondary)",
        "fg-tertiary": "var(--color-fg-tertiary)",
        "border-default": "var(--color-border-default)",
        "border-subtle": "var(--color-border-subtle)",
        "accent": {
          DEFAULT: "var(--color-accent-primary)",
          hover: "var(--color-accent-hover)",
          pressed: "var(--color-accent-pressed)",
          muted: "var(--color-accent-muted)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
      },
      fontFamily: {
        display: ["Bebas Neue", "Anton", "Oswald", "Impact", "sans-serif"],
        body: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      fontSize: {
        "3xs": "var(--text-3xs)",
        "2xs": "var(--text-2xs)",
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
        "5xl": "var(--text-5xl)",
        "6xl": "var(--text-6xl)",
      },
      fontWeight: {
        regular: "var(--weight-regular)",
        medium: "var(--weight-medium)",
        semibold: "var(--weight-semibold)",
        bold: "var(--weight-bold)",
        black: "var(--weight-black)",
      },
      letterSpacing: {
        tightest: "var(--tracking-tighter)",
        tighter: "var(--tracking-tight)",
        wide: "var(--tracking-wide)",
        widest: "var(--tracking-widest)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      maxWidth: {
        container: "var(--container-max)",
        narrow: "var(--container-narrow)",
        prose: "var(--container-prose)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
      },
      transitionDuration: {
        instant: "var(--duration-instant)",
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
        deliberate: "var(--duration-deliberate)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s var(--ease-out) forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "scale-in": "scale-in 0.3s var(--ease-out) forwards",
        "slide-in-right": "slide-in-right 0.3s var(--ease-out) forwards",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
