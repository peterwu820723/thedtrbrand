# ADR-0008: CMS 内容硬编码 + 远端 /content/pages 兜底

## 状态
Accepted — 2026-06-03

## 背景
About / Music / Tour / Contact 等"内容型"页面需要文案、引用、媒体。

## 决策
**v1 内容直接硬编码在前端代码中**(`src/content/*.ts`),
但通过**统一组件 `<ContentRenderer>`** 渲染,组件设计允许未来切换为 `getPage(slug)` 远端调用。

## 实现

```ts
// src/content/about.ts
export const aboutContent = {
  hero: { title: "DU$TY", subtitle: "A Brand, Not A Rapper" },
  story: "...",
  timeline: [...],
  quotes: [...],
};
```

```tsx
// src/components/ContentRenderer.tsx
// 接收标准 ContentBlock[] 结构,渲染
// 未来切换:从 useQuery(['page', slug]) 取数据
```

## 优势
- 立即可开发(不依赖远端)
- 改文案 = PR review,质量可控
- 未来切换远端 = 改 1 个 hook,组件零改

## 劣势
- 文案更新需重新部署(可接受 v1)
- 多语言(v1.5+)硬编码不便 → 届时切远端
