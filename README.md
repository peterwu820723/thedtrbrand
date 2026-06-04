# DU$TY (Dusty the Rapper) — Official E-Commerce Shop

> A brand, not a rapper. Houston-bred, Atlanta-based, Haitian descent.
> Built on the Xavvi Shop framework. Pure storefront front-end powered by the
> remote Xavvi API for catalog, cart, and orders.

## ✨ What's inside

- **14 SKUs** across 4 collections (DTR LOGO, THE CHAIN, DUSTY HAITI, BIG DUSTY)
- **Full e-commerce flow**: Home → Shop → Product → Cart → Checkout → Order confirmation
- **Editorial pages**: About, Music (Spotify embed), Tour, Contact
- **Legal pages**: Privacy, Terms, Shipping, Returns
- **Cart drawer + mobile menu + toast notifications**
- **Mock data + real Xavvi API fallback** (auto-switched by env)
- **WCAG AA contrast, semantic HTML, keyboard accessible**
- **Dark "all-seeing-eye" brand system** — fully tokenized

## 🏗️ Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + TypeScript |
| Build | Vite 5 |
| Routing | React Router 6 |
| Data | TanStack Query v5 |
| Client state | Zustand |
| Styling | Tailwind CSS 3 + CSS Variables |
| SEO | react-helmet-async |
| Backend | Xavvi API v1.0.0.0 (mock by default) |

## 🚀 Run locally

```bash
# 1. Install
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## 🔌 Switching to live Xavvi API

By default, the app runs in **MOCK mode** (data from `src/mocks/`).

To connect the real Xavvi API, copy `.env.example` → `.env.production` and set:

```env
VITE_XAVVI_API_BASE=https://api.xavvi.com
VITE_XAVVI_API_KEY=your_token_here
```

No code changes needed — `src/lib/api.ts` auto-dispatches to `api.live.ts`.

## 📁 Project structure

```
shops/dustytherapper/
├── .xavvi-shop/                # Project constitution, spec, ADRs
│   ├── project-constitution.md
│   ├── spec/
│   │   ├── style-tokens.md
│   │   ├── capability-matrix.md
│   │   └── information-architecture.md
│   └── decisions/              # ADRs
├── public/                     # Static assets, favicon, robots, sitemap
├── src/
│   ├── components/             # Layout, product, ui
│   ├── hooks/                  # useApi (React Query bindings)
│   ├── lib/                    # api.ts (dispatch) + api.mock.ts + api.live.ts
│   ├── mocks/                  # Mock data (products, content)
│   ├── pages/                  # All routes
│   ├── stores/                 # Zustand UI store
│   ├── styles/                 # globals.css (Tailwind + design tokens)
│   └── types/                  # Domain types (single source of truth)
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Brand system

Pulled from the official `thedtrbrand.com` Shopify CSS + IG bio:

- **Background**: `#1F2128` (deep charcoal)
- **Accent**: `#FF6B1A` (DTR orange)
- **Display font**: Bebas Neue (uppercase, tight tracking)
- **Body font**: Inter
- **Logo**: All-Seeing-Eye geometric mark
- **Wordmark**: `DU$TY` (S → $)

All design tokens are in `src/styles/globals.css` and `.xavvi-shop/spec/style-tokens.md`.

## 📋 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server (HMR) |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | TypeScript-only check |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |

## 🌐 Deployment

Built for **Cloudflare Pages** (recommended for static + edge):

1. Connect this repo to Cloudflare Pages
2. Build command: `npm run build`
3. Build output: `dist`
4. Add env vars in Cloudflare dashboard
5. Deploy

Also works on Vercel, Netlify, GitHub Pages, or any static host.

## 📜 License

© 2026 DTR Brand LLC. All rights reserved.
Built with `skill-xavvi-shop`.
