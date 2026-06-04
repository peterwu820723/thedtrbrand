# Architecture Decision Records (ADR)

> 关键架构决策记录。每个决策一个文件,本文为索引。

---

## ADR 索引

| ID | 标题 | 状态 |
|---|---|---|
| [ADR-0001](./0001-frontend-framework.md) | 选 React + Vite + TypeScript | ✅ Accepted |
| [ADR-0002](./0002-state-management.md) | 状态管理: Zustand(客户端) + TanStack Query(服务端) | ✅ Accepted |
| [ADR-0003](./0003-styling-approach.md) | Tailwind CSS + CSS Variables(双层) | ✅ Accepted |
| [ADR-0004](./0004-deployment-platform.md) | Cloudflare Pages | ✅ Accepted |
| [ADR-0005](./0005-mock-data-strategy.md) | Mock-first 策略(契约一致,远端可切换) | ✅ Accepted |
| [ADR-0006](./0006-i18n-scope.md) | v1 仅 en-US,架构预留 i18n | ✅ Accepted |
| [ADR-0007](./0007-payment-future.md) | 支付预留 Stripe 接入,本期 mock | ✅ Accepted |
| [ADR-0008](./0008-content-cms.md) | CMS 内容硬编码 + 远端 /content/pages 兜底 | ✅ Accepted |

---

## 决策摘要

### 渲染策略
- **SSG**(Shopify-like):构建期生成静态 HTML,部署到 CDN
- **客户端 hydration**:React 接管交互(购物车、过滤、checkout)
- **首屏关键 CSS 内联**(减少 CLS)

### 路由策略
- **文件路由**(Vite plugin)or **React Router 配置式** → 选**配置式**(更灵活)
- 路由懒加载(`React.lazy`),按页面分包

### API 策略
- **远端规范 v1.0.0.0 缓存**(24h TTL)
- **Mock data 优先**,环境变量 `VITE_XAVVI_API_KEY` 控制切换
- **契约一致**:`src/lib/api.ts` 对业务侧暴露同一接口,内部 mock/远端分支

### 状态策略
- **服务端状态**(商品、订单):TanStack Query(缓存、重试、失效)
- **客户端状态**(购物车、UI):Zustand(轻量、persist)
- **表单**:React Hook Form + Zod 校验

### 性能策略
- 图片:`<img loading="lazy" decoding="async">` + `srcset` + WebP/AVIF
- 代码分包:`vendor` / `routes` / `commons` 3 段
- 字体:`font-display: swap` + preload
- LCP < 2.0s / FID < 100ms / CLS < 0.1

### 可访问性策略
- WCAG 2.1 AA(色对比已验证,见 style-tokens.md)
- 键盘可达 / focus ring 不被覆盖
- 语义化 HTML(`<main>`/`<nav>`/`<article>`)
- 屏幕阅读器友好的表单 label

### SEO 策略
- 每个页面 `react-helmet-async` 注入 title/meta/og
- Sitemap.xml 自动生成(Vite plugin)
- JSON-LD(Product, Organization, BreadcrumbList)
- 规范化链接(`<link rel="canonical">`)

### 安全策略
- CSP(Content Security Policy)— `script-src 'self' 'unsafe-inline'`(Stripe 需求)
- HSTS / X-Frame-Options / X-Content-Type-Options(Cloudflare 配置)
- 支付数据**不**经过前端(Stripe Elements 直传)
- 购物车数据**仅**在 localStorage(本期),未来切 token 化
