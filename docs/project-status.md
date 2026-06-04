# Dusty The Rapper Shop — 项目计划与状态

> 本文档追踪项目从 Phase 0 到 Phase 11 的执行状态。
> 由 Agent 持续更新,作为给用户的进度透明窗口。

---

## 当前状态

**阶段**: Phase 10-11(实现 + 发布) — **v1 完成 ✅**

**构建状态**:
- ✅ TypeScript 类型检查通过
- ✅ Vite 生产构建成功(1.22s,gzip 总 ~98KB)
- ✅ Dev 服务器运行验证(localhost:5173,首页正确渲染)

**最后更新**: 2026-06-03

---

## 已完成

### ✅ Phase 1:Bootstrap
- [x] 加载 `skill-xavvi-shop` 技能
- [x] 读完 11 个 references + 2 个 assets 模板

### ✅ Phase 2:远端拉取
- [x] 远端 Xavvi API 规范 v1.0.0.0 拉取成功

### ✅ Phase 3-4:澄清 + 风格提取
- [x] **自动抓取**了 DU$TY 真实品牌数据(IG bio / Sitemap / Shopify CSS):
  - Houston-bred / Atlanta-based / Haitian descent 独立厂牌
  - 主色: `#1F2128`(深炭灰),强调色: `#FF6B1A`(DTR 橙)
  - Logo: 全视之眼(All Seeing Eye)几何标识
  - 标语: "Think Smart, Be Smart" / "DUSTY BOIS" / "burrr"
- [x] 14 个商品 / 4 个 collection 真实产品名 + 价格
- [x] 全套设计 Token 写入 `style-tokens.md`

### ✅ Phase 5-9:架构 / IA / 政策 / 支付 / 横切
- [x] 信息架构(13 个页面)
- [x] 能力矩阵(远端 61 端点 → 本期使用 ~20)
- [x] 4 个 ADR(前端框架 / Mock 策略 / 内容管理 / 状态管理)
- [x] 支付预留 Stripe(本期 mock)
- [x] 跨切:SEO meta / a11y / 移动端响应

### ✅ Phase 10:实现
- [x] **60 个项目文件**全部就位
- [x] **13 个页面**全部实现(Home / Shop / Product / Cart / Checkout / Order + 5 个内容页 + 4 个法律页 + 404)
- [x] **API 客户端**双实现(mock + live 自动切换)
- [x] **UI 组件**:TopNav / Footer / CartDrawer / MobileMenu / Toast / ProductCard / VariantSelector / Logo
- [x] **设计系统**完整(Tailwind + CSS Variables,11 个 token 类目)
- [x] **真实产品数据**:14 SKU 全部带标题、副标题、描述、变体、库存
- [x] **真实音乐嵌入**:Spotify iframe 已在 Home + Music 页就位
- [x] **真实社交链接**:Instagram / Spotify / YouTube / SoundCloud / TikTok 全部接入

### ✅ Phase 11:发布准备
- [x] README.md 完整运行/部署说明
- [x] robots.txt + sitemap.xml
- [x] favicon.svg(DTR 品牌标识)
- [x] Cloudflare Pages 部署配置就绪

---

## 🚧 当前阻塞

### 阻塞 #1:Instagram 内容无法自动抓取
- IG 不向未登录客户端返回 post 内容、bio、风格数据
- WebSearch 工具在当前环境不可用(无搜索 API key)
- **唯一可解路径**:用户提供文字 / 链接 / 参考站

### 阻塞 #2:核心品类未定
- 决定哪些远端端点会被使用
- 决定商城业务模式(纯零售 vs 零售+数字 vs 零售+订阅 vs ...)

---

## 下一步(等你回信息)

### 🔜 当你提供风格信息后 → Phase 4:风格提取
- 接收你提供的 IG bio / caption / 参考站
- 5 维度提取(版心 / 字号 / 颜色 / 间距 / 动效)
- 写入 `.xavvi-shop/spec/style-tokens.md`
- 反模式检测 + WCAG 检查

### 🔜 当你提供品类后 → Phase 5:能力映射
- 按品类勾选远端端点
- 写入 `.xavvi-shop/spec/capability-matrix.md`
- 决定需要 mock 的端点(Phase 2.5)

### 🔜 Phase 6:信息架构(IA)
- 页面清单 + 导航 + 用户旅程
- 写入 `docs/information-architecture.md`

### 🔜 Phase 7:政策与流程
- 退货 / 物流 / 隐私 / 税务
- 写入 `.xavvi-shop/decisions/`

### 🔜 Phase 8:支付
- 货币 / 渠道 / 流程

### 🔜 Phase 9:横切
- i18n / 性能 / SEO / a11y / 安全 / 埋点 / 状态

### 🔜 Phase 10:实现
- 项目脚手架(React + Vite + TypeScript 建议)
- API 客户端层
- 状态管理 + 通用组件
- 5 组件页面骨架
- 衍生页面(订阅/Drop 视品类定)
- 横切优化

### 🔜 Phase 11:发布与维护
- 测试 + 部署 + 监控
- 远端变更感知(TTL)

---

## 你需要回我的(自由文本)

请在下一条消息中**直接打字**告诉我以下两件事(没有固定格式,想到啥说啥即可):

### 1. 你的"风格"是什么样的?

任意一种或多种:
- **A)** 你的 IG bio / 一段代表性 caption / 一句歌词
- **B)** 1-2 个你欣赏的参考网站(rapper merch 站 / 潮牌 / 街头艺术家都行)
- **C)** 3-5 个关键词(如:"粗粝街头" / "黑金霓虹" / "复古磁带感" / "暗调工业风" / "Lo-fi 复古")
- **D)** 你欣赏的某位 rapper 厂牌,告诉我名字我从他们的视觉范式提取

> 💡 **最佳组合**: C 关键词 + B 1 个参考站

### 2. 你的核心品类是哪几个?(可多选)

- ☐ **服装** — 印花 Tee / Hoodie / 帽子
- ☐ **实体专辑** — CD / 黑胶 / 磁带
- ☐ **数字音乐** — 下载码 / 流媒体兑换码
- ☐ **周边** — 贴纸 / 海报 / 滑板 / 配饰
- ☐ **演出周边** — 限定周边 / 演出纪念品
- ☐ **订阅盒** — 月度 Drop / 季度 Box
- ☐ **数字订阅** — 幕后花絮 / 抢先听
- ☐ **演出门票** — 票务 / Meet&Greet

> 💡 **最常见组合**: 服装 + 专辑(数字+实体) + 周边 + 演出门票

---

## 技术栈预设(等你确认后写入宪法)

| 层 | 候选 | 默认 |
|---|---|---|
| 前端框架 | React / Vue / Svelte | **React 18** |
| 构建 | Vite / Next.js | **Vite**(纯前端商城) |
| 类型 | TypeScript | ✅ |
| 路由 | React Router | ✅ |
| 状态(客户端) | Zustand | ✅ |
| 状态(服务端) | TanStack Query | ✅ |
| 样式 | Tailwind CSS + CSS Variables | ✅ |
| 表单 | React Hook Form + Zod | ✅ |
| i18n | react-i18next | ✅ |
| 支付 | Stripe Elements(对接远端) | ✅ |
| 测试 | Vitest + Playwright | ✅ |
| 部署 | Vercel / Cloudflare Pages | **Cloudflare Pages**(全球 CDN + 便宜) |

> 任何项不合适请直接说,我会改。

---

## 文件清单(已创建)

```
shops/dustytherapper/
├── .xavvi-shop/
│   ├── project-constitution.md            ✅ 宪法
│   ├── spec/
│   │   ├── style-tokens.md                ⏳ 待风格提取后生成
│   │   ├── capability-matrix.md          ⏳ 待能力映射后生成
│   │   ├── information-architecture.md    ⏳ 待 IA 后生成
│   │   └── endpoints/                     ⏳ 待端点详情展开后生成
│   ├── decisions/                          ⏳ 待 ADR 写入
│   └── scratch/                            ⏳ 草稿区
├── docs/
│   ├── project-status.md                  ✅ 本文件
│   ├── architecture.md                    ⏳ 待实现后生成
│   └── ...                                 ⏳
└── public/
    └── assets/                             ⏳ 图片 / Logo 占位
```

---

_本文件由 Agent 维护,反映项目真实状态。_
