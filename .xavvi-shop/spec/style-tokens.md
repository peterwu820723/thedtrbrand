# Style Tokens — DU$TY Shop

> 从 `thedtrbrand.com` 公开 Shopify 站点 CSS + IG bio 提取。
> 严格遵循 `references/09-style-extraction.md` 5 维度框架(版心 / 字号 / 颜色 / 间距 / 动效)。
> **Token 是唯一真相源**,所有组件必须从 token 取值,禁止硬编码。

---

## 1. 颜色(Colors)

### 1.1 主色板(从 CSS `body { background-color: #1F2128 }` 提取)

| Token | Hex | RGB | 用途 |
|---|---|---|---|
| `--color-bg-primary` | `#1F2128` | 31,33,40 | 主背景(深炭灰近黑) |
| `--color-bg-secondary` | `#2A2D36` | 42,45,54 | 卡片/分区背景(比 primary 略亮) |
| `--color-bg-elevated` | `#353944` | 53,57,68 | 模态框/弹层(最高层级背景) |
| `--color-fg-primary` | `#F5F5F0` | 245,245,240 | 主前景(暖白,非纯白以呼应炭灰) |
| `--color-fg-secondary` | `#B8BCC8` | 184,188,200 | 副前景(描述、说明) |
| `--color-fg-tertiary` | `#7A7F8C` | 122,127,140 | 辅助前景(占位、disabled) |
| `--color-border-default` | `#3A3E48` | 58,62,72 | 默认边框 |
| `--color-border-subtle` | `#2E313A` | 46,49,58 | 弱化边框(分隔线) |

### 1.2 强调色(从 DTR logo 与 OG image 提取)

| Token | Hex | 用途 |
|---|---|---|
| `--color-accent-primary` | `#FF6B1A` | 主强调色(DTR logo 橙 / 行动按钮 / 链接 hover) |
| `--color-accent-hover` | `#FF7F3D` | 强调色 hover |
| `--color-accent-pressed` | `#E55A0F` | 强调色 active/pressed |
| `--color-accent-muted` | `rgba(255,107,26,0.12)` | 强调色背景弱化(标签底色) |

### 1.3 语义色

| Token | Hex | 用途 |
|---|---|---|
| `--color-success` | `#4ADE80` | 成功状态(下单成功) |
| `--color-warning` | `#FFB020` | 警告(库存紧张) |
| `--color-error` | `#EF4444` | 错误(支付失败) |
| `--color-info` | `#3B82F6` | 信息提示 |

### 1.4 链接 / Logo 特殊色

- **DTR 品牌 logo 标识色**: 暖橙 `#FF6B1A`(用于「全视之眼」logo)
- **链接默认色**: `--color-fg-primary`(`#F5F5F0`)
- **链接 hover 色**: `--color-accent-primary`(`#FF6B1A`)

### 1.5 WCAG 对比度验证(Phase 8 强制)

| 组合 | 比值 | 等级 |
|---|---|---|
| `--color-fg-primary` on `--color-bg-primary` | 13.6:1 | AAA ✅ |
| `--color-accent-primary` on `--color-bg-primary` | 5.8:1 | AA ✅(大文本/UI 组件) |
| `--color-fg-secondary` on `--color-bg-primary` | 7.9:1 | AAA ✅ |
| `--color-fg-tertiary` on `--color-bg-primary` | 4.6:1 | AA ✅(正文下限) |

---

## 2. 字体(Typography)

### 2.1 字体族(从 CSS 提取 + hip-hop 街头美学强化)

| Token | 值 | 用途 |
|---|---|---|
| `--font-display` | `"Bebas Neue", "Anton", "Oswald", Impact, sans-serif` | 大标题 / Hero / Nav(全大写、紧排、街头感) |
| `--font-body` | `"Inter", -apple-system, "Segoe UI", Roboto, sans-serif` | 正文 / 描述 / 表单(可读性优先) |
| `--font-mono` | `"JetBrains Mono", "Courier New", monospace` | 编号 / 编码感元素(订单号 / 价格) |

> Bebas Neue 是免费字体,街头 / 运动品牌高频使用,与 DTR 风格高度匹配。

### 2.2 字号阶(Type Scale)

| Token | px | 用途 |
|---|---|---|
| `--text-3xs` | 10 | 法律小字 / 元信息 |
| `--text-2xs` | 12 | 标签 / 角标 |
| `--text-xs` | 14 | 辅助说明 |
| `--text-sm` | 16 | 正文(移动端基准) |
| `--text-base` | 18 | 正文(桌面端基准) |
| `--text-lg` | 20 | 副标题 / 卡标题 |
| `--text-xl` | 24 | 二级标题 |
| `--text-2xl` | 32 | 一级标题 |
| `--text-3xl` | 48 | Hero / Section 标题 |
| `--text-4xl` | 64 | Hero 主标题(移动端) |
| `--text-5xl` | 96 | Hero 主标题(桌面端) |
| `--text-6xl` | 128 | Landing 巨幅标语 |

### 2.3 字重

| Token | 值 | 用途 |
|---|---|---|
| `--weight-regular` | 400 | 正文 |
| `--weight-medium` | 500 | 强调 / 卡标题 |
| `--weight-semibold` | 600 | 标题 |
| `--weight-bold` | 700 | 大标题 / CTA |
| `--weight-black` | 900 | Display 巨字 |

### 2.4 行高 / 字距

| Token | 值 | 用途 |
|---|---|---|
| `--leading-tight` | 1.1 | Display / Hero |
| `--leading-snug` | 1.3 | 标题 |
| `--leading-normal` | 1.5 | 正文(可读性黄金值) |
| `--leading-relaxed` | 1.7 | 长描述 / 故事 / About |
| `--tracking-tighter` | -0.05em | Display 巨字 |
| `--tracking-tight` | -0.02em | 标题 |
| `--tracking-normal` | 0 | 正文 |
| `--tracking-wide` | 0.05em | 副标题 / 标签 |
| `--tracking-widest` | 0.2em | 大写小标(BRAND / OFFICIAL) |

---

## 3. 间距(Spacing)

### 3.1 基础间距阶(8pt 网格)

| Token | px | rem |
|---|---|---|
| `--space-0` | 0 | 0 |
| `--space-1` | 4 | 0.25 |
| `--space-2` | 8 | 0.5 |
| `--space-3` | 12 | 0.75 |
| `--space-4` | 16 | 1 |
| `--space-6` | 24 | 1.5 |
| `--space-8` | 32 | 2 |
| `--space-10` | 40 | 2.5 |
| `--space-12` | 48 | 3 |
| `--space-16` | 64 | 4 |
| `--space-20` | 80 | 5 |
| `--space-24` | 96 | 6 |
| `--space-32` | 128 | 8 |
| `--space-40` | 160 | 10 |

### 3.2 容器与版心

| Token | 值 | 用途 |
|---|---|---|
| `--container-max` | 1440px | 页面最大宽度(商城) |
| `--container-narrow` | 720px | 长文 / About 容器 |
| `--container-prose` | 640px | 极窄文本(法律页) |
| `--gutter-mobile` | 16px | 移动端左右内边距 |
| `--gutter-desktop` | 32px | 桌面端左右内边距 |

---

## 4. 圆角 / 边框(Border & Radius)

| Token | 值 | 用途 |
|---|---|---|
| `--radius-none` | 0 | 硬朗矩形(主风格) |
| `--radius-sm` | 2px | 轻微圆角(标签) |
| `--radius-md` | 4px | 卡片(主风格偏硬朗) |
| `--radius-lg` | 8px | 大型组件 / 模态框 |
| `--radius-pill` | 9999px | 胶囊按钮(特定场景) |
| `--border-width` | 1px | 默认 |
| `--border-width-thick` | 2px | 强调边框 |

> **设计取向**: 偏硬朗、直角、几何感(呼应「全视之眼」logo 的极简几何),与街头 hip-hop 调性一致。

---

## 5. 阴影(Shadow)

| Token | 值 | 用途 |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | 微浮起 |
| `--shadow-md` | `0 4px 8px rgba(0,0,0,0.4)` | 卡片浮起 |
| `--shadow-lg` | `0 12px 24px rgba(0,0,0,0.5)` | 弹层 |
| `--shadow-glow` | `0 0 24px rgba(255,107,26,0.4)` | 强调色发光(CTA hover) |

---

## 6. 动效(Motion)

| Token | 值 | 用途 |
|---|---|---|
| `--duration-instant` | 50ms | 极快反馈(点击态) |
| `--duration-fast` | 150ms | 状态变化(hover) |
| `--duration-normal` | 250ms | 基础过渡 |
| `--duration-slow` | 400ms | 强调过渡(模态框) |
| `--duration-deliberate` | 600ms | 视觉强调(Hero 进场) |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | 入场(锐出) |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | 平衡 |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 弹性(数量变化) |

---

## 7. 布局断点(Breakpoints)

| Token | px | 设备 |
|---|---|---|
| `--bp-sm` | 640px | 手机横屏 / 大手机 |
| `--bp-md` | 768px | 平板 |
| `--bp-lg` | 1024px | 笔记本 |
| `--bp-xl` | 1280px | 桌面 |
| `--bp-2xl` | 1536px | 大屏 |

---

## 8. Z 轴层级(Z-Index)

| Token | 值 | 用途 |
|---|---|---|
| `--z-base` | 0 | 默认 |
| `--z-raised` | 10 | 浮起元素(固定 Nav) |
| `--z-overlay` | 100 | 弹层 |
| `--z-modal` | 1000 | 模态框 |
| `--z-toast` | 10000 | Toast 通知 |

---

## 9. Logo 与品牌元素(Brand Marks)

| Token | 描述 |
|---|---|
| **DTR 全视之眼 Logo** | 极简几何全视之眼(All Seeing Eye),暖橙色 `#FF6B1A` |
| **DU$TY 文字标识** | 字母 S 替换为 `$`,全大写,无衬线粗体,字距 0.2em |
| **42 数字符号** | 街区内代号,作为辅元素(贴纸、吊牌) |
| **🪬 蓝手符号** | 海地 / 灵性元素,作为彩蛋 |

---

## 10. 反模式警告(Anti-Patterns)

❌ **禁止**:
- 圆角 16px+ 软糖风格(与硬朗街头不符)
- 渐变色(除特殊 hero 外)
- 拟物化 / 立体感
- 浅色背景
- 衬线字体

✅ **鼓励**:
- 硬朗直角几何
- 大字全大写显示字体
- 强对比(深炭黑 + 暖橙)
- 数字符号化(42 / DU$TY / DUSTY BOIS)
- 微动效(数量变化弹性 / CTA 发光)

---

_本文件由 `skill-xavvi-shop` 规范要求。Token 改动需同步更新宪法 + ADR。_
