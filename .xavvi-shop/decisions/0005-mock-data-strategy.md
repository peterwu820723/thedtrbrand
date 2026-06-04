# ADR-0005: Mock-First 策略

## 状态
Accepted — 2026-06-03

## 背景
远端 XavVI API 文档已拉取,但**实际 API token / 部署 URL 待定**;开发期必须能跑通流程。

## 决策
**本期 v1 全部走 mock data**;真实 API 通过环境变量 `VITE_XAVVI_API_KEY` 启用。

## 实现

```ts
// src/lib/api.ts
const USE_MOCK = !import.meta.env.VITE_XAVVI_API_KEY;

// 所有端点都包装为同名函数,内部分支:
export async function getProducts(filter) {
  return USE_MOCK
    ? mockGetProducts(filter)
    : realGetProducts(filter);
}
```

## Mock 范围(本期)
- ✅ 14 个商品、4 个分类、店铺信息
- ⏳ 购物车 / 订单 / 支付(可用 mock,数据存 localStorage)
- ⏳ 库存 / 物流(显示固定值)

## 切换路径
1. 用户拿到远端 API key + base URL
2. 配置 `.env.production`:
   ```
   VITE_XAVVI_API_KEY=<token>
   VITE_XAVVI_API_BASE=<url>
   ```
3. 重新部署,`USE_MOCK` 自动变 `false`
4. **业务代码零修改**(契约一致)

## 风险
- 远端接口字段与 mock 不一致时需对照修正
- 通过完整 TypeScript 类型约束降低此风险:`src/lib/types.ts` 是单一类型源
