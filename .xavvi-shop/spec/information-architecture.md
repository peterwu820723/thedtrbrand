# Information Architecture — DU$TY Shop

> 页面清单 + 导航 + 用户旅程。
> 决定**用户能看到哪些页面**,**页面之间的关系**。

---

## 1. 站点地图(Site Map)

```
HOME  (/)
├── HERO: 「THINK SMART, BE SMART」 + Spotify 嵌入
├── LATEST DROP: 当前季度 collection
├── FEATURED PRODUCT GRID (8 SKU)
├── MUSIC: 最新曲目(YouTube / Spotify)
├── ABOUT 简述: HOUSTON → ATLANTA
└── NEWSLETTER / FOOTER

SHOP  (/shop)
├── ALL  (默认)
├── BY COLLECTION:
│   ├── DTR LOGO      (/shop/dtr-logo)
│   ├── THE CHAIN     (/shop/the-chain)
│   ├── DUSTY HAITI   (/shop/dusty-haiti)
│   └── BIG DUSTY     (/shop/big-dusty)
├── BY CATEGORY:
│   ├── Tops          (/shop/tops)
│   ├── Hoodies       (/shop/hoodies)
│   └── Accessories   (/shop/accessories)
└── FILTERS: price / size / color

PRODUCT DETAIL  (/product/:slug)
├── Image Gallery
├── Title / Price / Size selector
├── Add to Cart
├── Description
├── Size Guide
├── Shipping Info
└── Related Products

CART  (/cart)
├── Line items (image / title / variant / qty / price)
├── Subtotal / Shipping / Total
├── Promo Code (预留)
└── [Proceed to Checkout]

CHECKOUT  (/checkout)
├── 1. Contact (email)
├── 2. Shipping Address
├── 3. Shipping Method
├── 4. Payment (Stripe / mock)
└── 5. Review & Place Order

ORDER CONFIRMATION  (/order/:id)
├── Thank you
├── Order summary
└── Estimated delivery

ABOUT  (/about)
├── Hero: DU$TY portrait
├── Bio (Houston-bred, Haitian descent, Atlanta-based)
├── Brand story: DTR = Dusty the Rapper + Down to Ride
├── Timeline
└── Press / Quotes

MUSIC  (/music)
├── Spotify embed (top)
├── YouTube / Video grid
├── Discography
└── Streaming links (Spotify / Apple / Tidal / SoundCloud)

TOUR  (/tour)
├── Upcoming shows table
├── Past shows
└── [Buy Tickets] (预留跳转)

CONTACT  (/contact)
├── Email form
├── Booking inquiries (artist)
└── Wholesale / Collab

404 / 500 错误页

LEGAL  (/legal/*)
├── Privacy (/legal/privacy)
├── Terms (/legal/terms)
├── Shipping (/legal/shipping)
└── Returns (/legal/returns)
```

---

## 2. 顶层导航(Top Nav)

| 项 | 路径 | 行为 |
|---|---|---|
| **DU$TY** (logo) | `/` | 回首页 |
| **Shop** | `/shop` | 下拉:All / DTR LOGO / THE CHAIN / DUSTY HAITI / BIG DUSTY |
| **Music** | `/music` | 直接跳转 |
| **About** | `/about` | 直接跳转 |
| **Tour** | `/tour` | 直接跳转 |
| **Contact** | `/contact` | 直接跳转 |
| 🔍 Search | `/search` | (预留) |
| 🛒 Cart | `/cart` | 显示数量角标 |
| 👤 Account | `/account` | (预留 / 跳远端登录) |

---

## 3. 页脚(Footer)

```
[ DTR Logo ]                  [Shop]            [Brand]            [Connect]
  Think Smart Be Smart         All Products      About              Instagram →
  DUSTY BOIS 🪬                DTR LOGO          Music              Spotify →
                               THE CHAIN         Tour                YouTube →
                               DUSTY HAITI       Contact            SoundCloud →
                               BIG DUSTY         Press Kit

  © 2026 DTR Brand LLC. All rights reserved.
  Privacy | Terms | Shipping | Returns
```

---

## 4. 用户旅程(User Journeys)

### Journey 1:首访 → 购买 Tee
1. 落地首页(被 Hero / 标语 / 音乐吸引)
2. 滚动到 LATEST DROP / FEATURED 网格
3. 点击某个 Tee → 跳转 Product Detail
4. 选 Size → Add to Cart
5. 顶部 Cart 角标 +1 → 点 Cart
6. Cart 页看到 line item → Proceed to Checkout
7. 填联系信息 + 收件地址 → 选物流 → 填支付 → 下单
8. Order Confirmation 页 → 收到邮件(预留)

### Journey 2:听歌者 → 探索品牌
1. Spotify 推歌 / SoundCloud 链接
2. 跳 About → 了解 Houston → Atlanta 故事
3. 跳 Music → 听更多 / 看 MV
4. 对某首 MV 里的 T-shirt 感兴趣 → 跳 Shop
5. 分类筛选 + 加购

### Journey 3:粉丝回访 → 复购
1. 直接跳 /shop
2. 选 DUSTY HAITI collection(最喜欢的)
3. 看到新品 hoodie → 加购
4. 老顾客识别(未来:会员系统)

### Journey 4:媒体 / 活动主办方
1. /contact → booking inquiry 表单
2. 提交后端 → 邮件提醒

---

## 5. 页面规格概览

| 页面 | 关键组件 | 数据来源 |
|---|---|---|
| Home | Hero(Spotify embed + 主标语)、Latest Drop、Featured Grid、Music、Newsletter | `getStoreInfo`, `getProducts(featured=1)`, Spotify embed |
| Shop | Filter Sidebar、Product Grid、Sort、Collection Pills | `getCategories`, `getProducts(category, sort, filter)` |
| Product | Gallery、Variant Selector、Add to Cart、Accordion(Desc/Ship)、Related | `getProduct(id)`, `getProducts(related)` |
| Cart | Line Item List、Summary、Promo、Checkout CTA | `getCart` |
| Checkout | 步骤指示器、表单(联系/地址/物流/支付)、下单按钮 | `getShippingOptions`, `createPaymentIntent`, `createOrder` |
| About | Hero portrait、品牌故事、Timeline、引用 | `getPage(slug=about)` 或内置文案 |
| Music | Spotify iframe、YouTube grid、Streaming Links、Discography | Spotify / YouTube embed + 内置 |
| Tour | Shows table、Buy Tickets CTA | 内置 + (未来) `getEvents` |
| Contact | 表单 + 提交反馈 | `postContactInquiry` |

---

## 6. 路由实现

```
/                              Home
/shop                          Shop (All)
/shop/:collectionSlug          Shop (filtered)
/product/:productSlug          Product Detail
/cart                          Cart
/checkout                      Checkout
/order/:orderId                Order Confirmation
/about                         About
/music                         Music
/tour                          Tour
/contact                       Contact
/legal/privacy                 Privacy
/legal/terms                   Terms
/legal/shipping                Shipping Policy
/legal/returns                 Returns Policy
/*                             404
```

---

_本文件由 `skill-xavvi-shop` 规范要求。修改前请先读 `references/05-information-architecture.md`。_
