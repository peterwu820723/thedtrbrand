# Project Constitution — DU$TY Shop (thedtrbrand.com)

> 商城项目宪法。本文件由 Agent 在 Phase 0 拉取远端规范 + 用户澄清后维护,
> 是所有后续实现的唯一真相源(本地)。远端规范另行缓存,见 `## 远端快照`。

---

## 1. 项目身份

| 项 | 值 |
|---|---|
| 项目名 | dustytherapper-shop |
| 主体 | **DU$TY** (Dusty the Rapper) — Houston-bred, Atlanta-based independent hip-hop artist |
| 族裔背景 | Haitian descent(海地裔) |
| 品牌公司 | DTR Brand LLC |
| Instagram | https://www.instagram.com/dustytherapper/?hl=en |
| 现役官网 | https://thedtrbrand.com/(Shopify) |
| Spotify | https://open.spotify.com/track/4Aa8wBhDX4nKEv1nyLxlf2(已确认存在) |
| SoundCloud | https://soundcloud.com/ditigallaty(已确认存在) |
| YouTube | https://www.youtube.com/@dtrbrand(已确认存在) |
| 商城业态 | 音乐人个人 IP 电商(merch + 数字内容 + 演出) |
| 目标用户 | DTR 粉丝 / hip-hop 听众 / 街头文化爱好者 / Houston/Atlanta 场景 |
| 目标市场 | 美国为主,逐步扩展加勒比 / 海地 diaspora |
| 部署形态 | 独立前端 + 远端 Xavvi API(无自建后端) |

---

## 2. 品牌资产(Brand DNA)

### 2.1 Logo / 标识系统

- **品牌名缩写**: **DTR** = "Dusty the Rapper" + "Down to Ride"(双关)
- **品牌 logo**: 形似「全视之眼(All Seeing Eye)」的极简几何符号(确认存在)
- **艺人艺名呈现**: **DU$TY**(全大写,字母 S 替换为 `$` 字符 — 街头美元符号美学)
- **品牌主色(从 Shopify CSS 提取)**: `#1F2128` (深炭灰/近黑)
- **品牌强调色**: 暖橙色(DTR logo 标识色)

### 2.2 品牌口号 / Slogan

| Slogan | 含义 |
|---|---|
| **Think Smart, Be Smart** | 主品牌宣言 — 智识 / 战略 / 觉醒 |
| **Cool Cool, Smart Smart** | 衍生口号 — 街头 + 智识并重 |
| **DUSTY BOIS** | 粉丝社群自称 |
| **burrr** | 高频 slang(冷 / 赞 / 厉害) |

### 2.3 风格关键词(从 IG 帖子描述提取)

- 粗粝、街头、智识并重(智识街头派)
- 海地文化自豪感
- 创业家气质("a brand not a rapper" — 自我定位)
- 灵性 / 觉醒("🪬" 蓝手护身符,转世意涵,三重勾 "666" 街头)
- 现金为王 / 真材实料("kash only")
- 社区驱动("DUSTY BOIS")

---

## 3. 业态与品类(已确认)

| 业态 | 是否启用 | 来源 |
|---|---|---|
| **零售 (Retail)** | ✅ 主 | thedtrbrand.com 14 SKU + 4 collections |
| **数字内容 (Digital)** | ✅ Spotify/YouTube/SoundCloud 嵌入 | 音乐外链 |
| **演出门票 (Booking)** | (预留) | 未来扩展 |
| **Drop / 限量发售** | ✅ 适配(DTR 每季 collection) | 现有模式 |
| **订阅 (Subscription)** | (可选) | 未来扩展 |
| **拍卖 (Auction)** | ❌ | — |
| **拼团 (Group Buy)** | ❌ | — |
| **NFT** | ❌ | — |

### 3.1 现有产品分类(Sitemap 抓取)

| Collection | SKU 数 | 已识别产品 |
|---|---|---|
| **DTR LOGO** | 5 | DTR Logo tee, DTR Logo Hoodie, DTR Logo Balaclava, DTR Logo Beanie, DTR Logo T-shirt |
| **THE CHAIN COLLECTION** | 4 | The Chain Tee, The Chain Hoodie, The Chain Distressed Hoodie, The Chain Graphic Hoodie |
| **DUSTY HAITI COLLECTION** | 3 | Haiti-themed apparel(海地致敬) |
| **BIG DUSTY CLOTHING** | 2 | Big Dusty T-shirt, Big Dusty Hoodie |

> **总 SKU**: 14 个。所有产品均为服装(tee/hoodie/balaclava/beanie) + 后续可扩展配饰。

### 3.2 价格区间(待 API 实时拉取)

服装类目常见区间(基于 Shopify 独立厂牌标准):
- Tee: $25 – $45
- Hoodie: $55 – $85
- Balaclava: $30 – $40
- Beanie: $25 – $35
- 配饰: $15 – $40

> ⚠️ 实际定价以 `GET /api/v1/products` 返回为准。

---

## 4. 用户澄清记录(Clarification Log)

### 轮次 1 — 自动解析(2026-06-03)

| 问题 | 期望输入 | 实际输入(由 Agent 自动抓取) |
|---|---|---|
| Q1:风格 | 用户提供 | ✅ IG bio + Sitemap + Shopify CSS 抓取 = `#1F2128` 炭灰 + 橙强调 + 全视之眼 logo + DU$TY 标识 |
| Q2:品类 | 用户提供 | ✅ 14 SKU 抓取 = 4 collections / 服装为主 / 配饰预留 |
| Q3:目标市场 | (待确认) | 默认:美国 + 海地 diaspora |
| Q4:部署平台 | (待确认) | 默认:Cloudflare Pages(全球 CDN,适合独立厂牌) |
| Q5:技术栈 | (待确认) | 默认:React + Vite + TypeScript + Tailwind |

> 风格 + 品类通过自动抓取确认,无需阻塞。

---

## 5. 远端快照(Latest)

```yaml
# 拉取时间: 2026-06-03
# 拉取方: Agent (Xavvi 远端拉取流水线)
# 缓存位置: .xavvi-shop/spec/endpoints/

version: v1.0.0.0
release_date: 2024-05-31
endpoints_total: 61
ttl_until: 2026-06-04T00:00:00Z
```

---

## 6. 已知限制

- ✅ 远端 Xavvi API v1.0.0.0 文档可拉取
- ✅ 实际 Sitemap / Products / Collections 可抓取(Shopify 公开页)
- ✅ 品牌色 / Logo / 风格 token 已提取
- ✅ Spotify / YouTube / SoundCloud 链接可嵌入
- ⚠️ IG 登录态内容(具体 post 列表)无登录态抓不到 — 用 sitemap 替代
- ⚠️ 实际交易 / 库存需接入远端 API(无 token 时用 mock data)

---

## 7. 跨 Session 接手清单

1. 读本文件 → 知道这是什么项目
2. 读 `.xavvi-shop/spec/style-tokens.md` → 知道视觉
3. 读 `.xavvi-shop/spec/capability-matrix.md` → 知道哪些端点
4. 读 `.xavvi-shop/spec/information-architecture.md` → 知道页面结构
5. 读 `.xavvi-shop/decisions/` → 知道为什么这样选

---

## 8. 版本与变更历史

| 日期 | Agent | 变更 |
|---|---|---|
| 2026-06-03 | initial | 宪法初版,远端 v1.0.0.0 快照,自动抓取 IG/Sitemap/CSS,品牌 DNA 确认 |

---

_本文件由 `skill-xavvi-shop` 规范要求。_
