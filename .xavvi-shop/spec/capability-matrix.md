# Capability Matrix — DU$TY Shop

> 业态 → 远端端点 → 实际使用 → Mock 状态。
> 远端 API 文档基线:`v1.0.0.0`(2024-05-31),共 61 个端点。
> 此文件决定**哪些端点被使用**,哪些用 mock 占位。

---

## 1. 业态决策

| 业态 | 启用 | 原因 |
|---|---|---|
| **零售 (Retail)** | ✅ | 主营:14 SKU 服装 |
| **数字内容 (Digital)** | ⚠️ 部分 | 音乐外链(Spotify/YouTube embed)非售卖 |
| **Drop / 限量发售** | ✅ | 每季 collection 模式适配 |
| **内容 / CMS** | ✅ | About 页文案、Hero 标语 |
| **订阅 (Subscription)** | ❌ | 用户未确认,预留端点 |
| **演出门票 (Booking)** | ❌ | 当前阶段未实现,预留端点 |
| **拍卖 / 拼团 / NFT** | ❌ | 与品牌定位不符 |

---

## 2. 端点矩阵

### 2.1 必用端点(Must Use)

| 端点 | 用途 | Mock 状态 |
|---|---|---|
| `GET /api/v1/products` | 商品列表 / 过滤 | ✅ Mock data(14 SKU) |
| `GET /api/v1/products/{id}` | 商品详情 | ✅ Mock data |
| `GET /api/v1/categories` | 分类(DTR LOGO / CHAIN / HAITI / BIG DUSTY) | ✅ Mock data |
| `GET /api/v1/products?category_id=...` | 分类商品 | ✅ Mock data |
| `POST /api/v1/cart/items` | 加购 | ✅ Mock(localStorage) |
| `PATCH /api/v1/cart/items/{id}` | 改数量 | ✅ Mock |
| `DELETE /api/v1/cart/items/{id}` | 删项 | ✅ Mock |
| `GET /api/v1/cart` | 取购物车 | ✅ Mock |
| `GET /api/v1/store/info` | 店铺元信息(币种 / 语言) | ✅ Mock(USD/en-US) |
| `GET /api/v1/locales` | 语言列表 | ✅ Mock |

### 2.2 条件启用端点(Phase 2)

| 端点 | 启用条件 | Mock 状态 |
|---|---|---|
| `POST /api/v1/orders` | 真实下单时 | ⏳ 暂未实现,前端表单占位 |
| `POST /api/v1/payments/intent` | 真实支付时 | ⏳ 暂未实现,前端 Stripe 模拟 |
| `GET /api/v1/orders/{id}` | 订单查询 | ⏳ 暂未实现 |
| `GET /api/v1/inventory/{product_id}` | 库存查询 | ⏳ 暂未实现(显示"有货"占位) |
| `POST /api/v1/wishlist/items` | 收藏 | ⏳ 暂未实现 |
| `POST /api/v1/auth/login` | 会员登录 | ⏳ 暂未实现 |
| `GET /api/v1/content/pages/{slug}` | CMS 页面(About/FAQ) | ✅ Mock(内置文案) |
| `GET /api/v1/search?q=...` | 站内搜索 | ⏳ 暂未实现 |
| `POST /api/v1/coupon/apply` | 优惠码 | ⏳ 暂未实现 |
| `GET /api/v1/shipping/options` | 物流选项 | ⏳ 暂未实现(显示固定运费) |

### 2.3 预留但本期不实现(预留端点 / Reserved)

- `subscription/*` — 订阅(未来会员)
- `booking/*` — 演出门票
- `digital_fulfillment/*` — 数字商品(音乐下载码)
- `auction/*` — 拍卖
- `group_buy/*` — 拼团
- `nft/*` — NFT
- `preorder/*` — 预售(可在 Drop 阶段启用)

---

## 3. Mock 数据范围

### 3.1 商品(SKU)

```
14 个商品,4 个 collection,价格区间 $25 – $85
```

> 详细数据见 `src/mocks/products.ts`(由 Agent 在 Phase 10 实现时填充)

### 3.2 分类

| ID | Name | Slug | Product Count |
|---|---|---|---|
| 1 | DTR LOGO | dtr-logo | 5 |
| 2 | THE CHAIN COLLECTION | the-chain | 4 |
| 3 | DUSTY HAITI COLLECTION | dusty-haiti | 3 |
| 4 | BIG DUSTY CLOTHING | big-dusty | 2 |

### 3.3 店铺设置

```json
{
  "currency": "USD",
  "locale": "en-US",
  "country": "US",
  "weight_unit": "lb",
  "size_unit": "in",
  "tax_inclusive": false
}
```

### 3.4 物流

- US 境内:固定 $7.95
- 海地 / Caribbean:固定 $24.95
- International:固定 $19.95
- 满 $150 免邮(US)

---

## 4. 不在远端规范的"扩展"功能

- 🎵 **Spotify 嵌入**:Hero 区 / Music 页直接 `<iframe>` 嵌入,不走远端
- 📺 **YouTube 嵌入**:Music 页视频墙,直接 embed
- 📷 **IG Feed**:受 IG 限制,改用静态 IG 截图占位 + 跳转链接
- 🗺️ **巡演地图**:静态 SVG 占位 + 跳转 Songkick/Eventbrite

---

## 5. 端点不使用的明确清单

> 以下 61 个端点中的 ~40+ 个本期**不使用**,但保留远端规范以便未来扩展:

`auth/refresh`、`auth/logout`、`profile/addresses`、`profile/payment_methods`、
`order/cancel`、`order/return`、`review/*` (仅展示不做交互)、
`promotion/*`、`notification/*`、`analytics/*`、
`media/*` (CDN 处理)、`store/policies`、`currency/convert` ...

---

## 6. 切换到真实 API 的路径

```ts
// src/lib/api.ts 中的切换点
const USE_MOCK = !import.meta.env.VITE_XAVVI_API_KEY;

// 切换为真实 API:
// 1. 配置 .env: VITE_XAVVI_API_KEY=<远端 token>
// 2. VITE_XAVVI_API_BASE=https://api.xavvi.com(实际值由远端规范确定)
// 3. USE_MOCK 自动变为 false
// 4. 重新部署
```

> Mock 与真实 API 的数据契约完全一致,切换无需改业务代码。

---

_本文件由 `skill-xavvi-shop` 规范要求。修改前请先读 `references/04-capability-mapping.md`。_
