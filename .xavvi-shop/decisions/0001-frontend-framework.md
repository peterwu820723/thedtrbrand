# ADR-0001: 选 React + Vite + TypeScript

## 状态
Accepted — 2026-06-03

## 背景
需要一个独立前端,对接远端 Xavvi API(无自建后端),构建电商前端。

## 候选

| 候选 | 优点 | 缺点 |
|---|---|---|
| **Next.js** | 生态最大、SSG/ISR 内建 | 重量级、对纯前端商城过度 |
| **Vite + React** | 极快冷启动、配置轻、SSG 简单 | SEO 需手动配(但有 vite-plugin-ssr) |
| **Astro** | 极致性能、内容站优 | 交互商城需 React island,折中 |
| **Remix** | 嵌套路由、数据加载优雅 | 学习曲线、与远端 API 模式不完全契合 |

## 决策
**Vite + React 18 + TypeScript**

## 原因
1. **极快冷启动**(< 1s)与构建(< 5s) — 适合迭代快的独立厂牌
2. **SSG** 通过 `vite-plugin-ssr` 或手写 `prerender` 解决,生态完全够用
3. **无 vendor lock-in**,可平滑迁 Next.js
4. **TypeScript** 端到端类型安全,提升代码质量

## 影响
- 路由:React Router 6(配置式)
- 数据:TanStack Query
- 样式:Tailwind CSS
- 状态:Zustand
- 部署:Cloudflare Pages(原生支持 Vite)
