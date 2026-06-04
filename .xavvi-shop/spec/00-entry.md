# Xavvi 商城 API 接口文档 v1.0.0.0

> 更新时间：2024-05-31  
> 覆盖范围：61 个后端接口（含组合文档），按业务模块分组  
> 接口风格：全部为 POST + application/json  
> 请求头要求：`X-Xavvi-Store-Id`（除 store/info 外）、`X-Xavvi-Token`（需登录接口）、`language`（多语言接口）

## 前置条件

### 路由前缀

接入本规范时，所有接口请求需要拼接对应的路由前缀：

| 环境 | 路由前缀 |
|------|----------|
| **线上（生产）** | `https://shop.xavvi.com/api` |
| **测试环境** | `https://shop-dev.xavvi.com/api` |

> 示例：获取站点信息 → 生产环境完整地址为 `https://shop.xavvi.com/api/v1/store/info`

### 更新日志

> **通知商城生产 Agent**：后续所有更新升级内容将统一记录在 `update.md` 文件中，请关注该文件以获取最新变更。

## 前置条件

### 路由前缀

接入本规范时，所有接口请求需要拼接对应的路由前缀：

| 环境 | 路由前缀 |
|------|----------|
| **线上（生产）** | `https://shop.xavvi.com/api` |
| **测试环境** | `https://shop-dev.xavvi.com/api` |

> 示例：获取站点信息 → 生产环境完整地址为 `https://shop.xavvi.com/api/v1/store/info`

### 更新日志

> **通知商城生产 Agent**：后续所有更新升级内容将统一记录在 `update.md` 文件中，请关注该文件以获取最新变更。

## 接口概览

| 编号 | 接口 | 端点 | 需登录 | 说明 |
|------|------|------|--------|------|
| **账户** | | | | |
| 01 | [Passport SSO 回调](./01-account-passport-callback.md) | `POST /v1/account/sso/callback` | 否 | Passport 授权码→本地Token |
| 02 | [账户登出](./02-account-logout.md) | `POST /v1/account/logout` | 是 | 清除本地session + Passport |
| 03 | [账户详情](./03-account-detail.md) | `POST /v1/account/detail` | 是 | 当前登录用户基本信息 |
| **站点** | | | | |
| 04 | [站点信息](./04-store-info.md) | `POST /v1/store/info` | 否 | 店铺配置：Logo/SEO/货币/语言等 |
| 05 | [首页](./05-home-index.md) | `POST /v1/home` | 否 | 聚合Hero/创作者/分类/精选商品 |
| **创作者** | | | | |
| 18 | [创作者列表](./18-creator-list.md) | `POST /v1/creator/list` | 否 | 创作者分页列表 |
| 19 | [创作者详情](./19-creator-detail.md) | `POST /v1/creator/detail` | 否 | 创作者主页+商品列表 |
| 35 | [绑定创作者](./35-creator-owner.md) | `POST /v1/creator/owner` | 是 | 当前用户绑定的创作者信息 |
| **商品** | | | | |
| 10 | [商品列表](./10-product-list.md) | `POST /v1/product/list` | 否 | 支持分类/品牌/创作者/价格筛选 |
| 11 | [商品详情](./11-product-detail.md) | `POST /v1/product/detail` | 否 | SPU+SKU+图片+描述完整详情 |
| 12 | [商品搜索](./12-product-search.md) | `POST /v1/product/search` | 否 | 关键词全文搜索 |
| 13 | [新品商品](./13-product-new.md) | `POST /v1/product/new_arrivals` | 否 | 首页 NewArrivalsRail |
| 14 | [精选商品](./14-product-featured.md) | `POST /v1/product/curated` | 否 | 首页 CuratedPicksRail |
| 15 | [热销商品](./15-product-hot.md) | `POST /v1/product/bestsellers` | 否 | 首页 BestsellersRail |
| 16 | [推荐商品](./16-product-recommend.md) | `POST /v1/product/recommended` | 否 | 首页 RecommendedRail |
| **分类** | | | | |
| 20 | [分类列表](./20-category-list.md) | `POST /v1/category/list` | 否 | 分类列表 |
| 21 | [分类搜索](./21-category-search.md) | `POST /v1/category/search` | 否 | 关键词模糊匹配 |
| 22 | [分类属性](./22-category-attr.md) | `POST /v1/category/attributes` | 否 | 分类的筛选属性+可选值 |
| 23 | [分类树](./23-category-tree.md) | `POST /v1/category/tree` | 否 | 完整层级分类树 |
| 24 | [分类网格](./24-category-grid.md) | `POST /v1/category/grid` | 否 | 首页 CategoryGrid |
| **品牌** | | | | |
| 25 | [品牌搜索](./25-brand-search.md) | `POST /v1/brand/search` | 否 | 品牌搜索+精选商品 |
| **购物车** | | | | |
| 26 | [加入购物车](./26-cart-add.md) | `POST /v1/cart/add` | 是 | 同SKU数量累加 |
| 27 | [更新购物车](./27-cart-update.md) | `POST /v1/cart/update` | 是 | 修改数量/勾选 |
| 28 | [删除购物车](./28-cart-delete.md) | `POST /v1/cart/remove` | 是 | 单条/批量软删除 |
| 29 | [购物车列表](./29-cart-list.md) | `POST /v1/cart/list` | 是 | 当前用户购物车完整列表 |
| **心愿单** | | | | |
| 30 | [加入收藏](./30-wishlist-add.md) | `POST /v1/wishlist/add` | 是 | 加入心愿单 |
| 31 | [取消收藏](./31-wishlist-remove.md) | `POST /v1/wishlist/remove` | 是 | 从心愿单移除 |
| 32 | [是否已收藏](./32-wishlist-check.md) | `POST /v1/wishlist/check` | 是 | 详情页爱心按钮回显 |
| 33 | [心愿单列表](./33-wishlist-list.md) | `POST /v1/wishlist/list` | 是 | 心愿单分页列表 |
| **收货地址** | | | | |
| 34 | [地址列表](./34-address-list.md) | `POST /v1/address/list` | 是 | 当前用户地址列表 |
| 36 | [新增/编辑地址](./36-address-save.md) | `POST /v1/address/save` | 是 | address_id=0新增，>0更新 |
| 37 | [删除地址](./37-address-remove.md) | `POST /v1/address/remove` | 是 | 软删除，自动fallback默认 |
| 38 | [设置默认地址](./38-address-set-default.md) | `POST /v1/address/set_default` | 是 | 唯一默认地址 |
| **订单** | | | | |
| 39 | [订单预览](./39-order-preview.md) | `POST /v1/order/preview` | 是 | 下单前金额预览 |
| 40 | [订单创建](./40-order-create.md) | `POST /v1/order/create` | 是 | 扣库存生成订单 |
| 41 | [订单列表](./41-order-list.md) | `POST /v1/order/list` | 是 | 按状态筛选分页 |
| 42 | [订单详情](./42-order-detail.md) | `POST /v1/order/detail` | 是 | 含商品/地址/物流/支付完整信息 |
| 43 | [取消订单](./43-order-cancel.md) | `POST /v1/order/cancel` | 是 | 仅待支付状态可取消 |
| 44 | [确认收货](./44-order-confirm.md) | `POST /v1/order/confirm` | 是 | 已发货→已完成 |
| 45 | [物流追踪](./45-order-logistics.md) | `POST /v1/order/logistics` | 是 | 物流轨迹时间线 |
| **支付** | | | | |
| 46-48 | [支付（3合1）](./46-48-payment.md) | `POST /v1/payment/create`<br>`POST /v1/payment/notify`<br>`POST /v1/payment/status` | 是* | 创建支付/三方回调/轮询状态 |
| **评价** | | | | |
| 49-52 | [评价（4合1）](./49-52-review.md) | `POST /v1/review/submit`<br>`POST /v1/review/list`<br>`POST /v1/review/summary`<br>`POST /v1/review/store_summary` | 是* | 提交评价/评价列表/五星分布/店铺聚合 |
| **Banner** | | | | |
| 53 | [Banner列表](./53-banner-list.md) | `POST /v1/banner/list` | 否 | 按展位筛选在线Banner |
| **促销** | | | | |
| 54 | [促销活动](./54-promotion-list.md) | `POST /v1/promotion/list` | 否 | 当前有效促销列表 |
| **优惠券** | | | | |
| 55-58 | [优惠券（4合1）](./55-58-coupon.md) | `POST /v1/coupon/list`<br>`POST /v1/coupon/claim`<br>`POST /v1/coupon/my_list`<br>`POST /v1/coupon/wall` | 是* | 可领取/领取/我的/首页墙 |
| **订阅** | | | | |
| 59 | [邮箱订阅](./59-subscribe-email.md) | `POST /v1/audience/subscribe` | 否 | 首页 NewsletterSignup |
| **Drop** | | | | |
| 60 | [Drop活动](./60-drop-list.md) | `POST /v1/drop/list` | 否 | 首页 DropsSection |
| **搜索** | | | | |
| 61-63 | [搜索（3合1）](./61-63-search.md) | `POST /v1/search/history/list`<br>`POST /v1/search/history/clear`<br>`POST /v1/search/hot` | 是* | 搜索历史/清空历史/热搜词 |
| **消息** | | | | |
| 64-66 | [消息（3合1）](./64-66-message.md) | `POST /v1/message/list`<br>`POST /v1/message/read`<br>`POST /v1/message/unread_count` | 是 | 消息列表/标记已读/未读数 |

> **注意**：标记 `是*` 的接口部分子接口可能不需登录（如支付回调 notify 不需用户 Token），详见各文档说明。

## 通用规范

### 请求格式

- **Method**：全部为 `POST`
- **Content-Type**：`application/json`
- **所有接口统一返回格式**：

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

### 通用请求头

| Header | 是否必须 | 说明 |
|--------|----------|------|
| `X-Xavvi-Store-Id` | 是（除 store/info 外） | 多租户店铺ID，缺失返回 412 |
| `X-Xavvi-Token` | 需登录接口 | 用户登录态 Token |
| `language` | 多语言接口 | 语言偏好，如 `"en"` / `"zh"` |

### 价格单位

所有涉及价格的字段单位为**分**（`int` 类型），前端展示时除以 100。例如：后端返回 `8900` → 前端展示 `$89.00`。

### 时间格式

统一为 `YYYY-MM-DD HH:mm:ss` 或 `YYYY-MM-DD` 格式。

### 错误码参考

| code | 说明 | 含义 |
|------|------|------|
| 0 | success | 请求成功 |
| 10001 | 未登录 | Token 缺失或无效 |
| 10002 | Token 过期 | 需要重新登录 |
| 20003 | 参数错误 | 请求参数类型/必填校验失败 |
| 412 | 缺少StoreId | 未传 X-Xavvi-Store-Id 请求头 |
| 50001 | 数据不存在 | 如商品已下架、订单不存在等 |

### 订单状态码

| 状态码 | 含义 | 展示文案 |
|--------|------|----------|
| 1 | 待支付 | Pending Payment |
| 2 | 已支付 | Paid |
| 3 | 已发货 | Shipped |
| 4 | 已完成 | Completed |
| 5 | 已取消 | Cancelled |
| 6 | 已退款 | Refunded |