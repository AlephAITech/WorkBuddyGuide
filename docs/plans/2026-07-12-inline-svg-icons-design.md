# 首页图标改为内联 SVG

## 背景

首页原先通过一份 25.8 KB 的像素图标字体显示 16 种图标。字体使用
`font-display: optional`，在首次访问、慢网或微信内置浏览器中可能跳过本次
字体替换。由于图标是私有区字符，没有系统字体可回退，页面会只显示空白
卡片。

## 决策

保留 HackerNoon Pixel Icon Library 的原始 24×24 路径和现有视觉样式，改为
服务端渲染的内联 SVG Sprite：

- `PixelIconSprite.vue` 在首页 HTML 中声明 16 个 `<symbol>`。
- `PixelIcon.vue` 使用 `<use>` 复用对应图标，并继承 `currentColor`。
- 原有卡片尺寸、旋转、颜色和响应式布局保持不变。
- 删除图标字体样式、字体请求和 npm 依赖。

这样图标随 HTML 到达，不依赖字体下载、JavaScript 执行或客户端缓存。

## 验收

- 正常加载与禁用网页字体时，首页所有图标均可见。
- 构建产物和网络请求中不包含 `iconfont.woff2`。
- 移动端 Lighthouse 连续三次不低于 90，CLS 为 0。
- Accessibility、Best Practices 和 SEO 不发生回退。
