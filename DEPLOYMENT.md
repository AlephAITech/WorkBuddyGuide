# Cloudflare Pages 部署

本站采用 VitePress 静态构建，并通过 Cloudflare Pages 的 GitHub 集成持续部署。

## Cloudflare Pages 设置

在 Cloudflare 控制台选择 **Workers & Pages → Create application → Pages → Import an existing Git repository**，授权并选择 `AlephMuYe/WorkBuddyGuide`。

使用以下配置：

| 配置项 | 值 |
| --- | --- |
| Project name | `workbuddy-guide` |
| Production branch | `main` |
| Framework preset | `VitePress`（也可选择 None） |
| Build command | `npm run docs:build` |
| Build output directory | `docs/.vitepress/dist` |
| Root directory | `/` |
| Node.js version | `22` |

在 Cloudflare Pages 的生产环境变量中设置：

```text
VITEPRESS_SITE_URL=https://workbuddy.homes
```

仓库默认值同样使用正式域名，避免缺少环境变量时 canonical、Open Graph
和 sitemap 回退到 `pages.dev` 域名。

仓库中的 `.nvmrc` 会声明 Node.js 22。依赖通过 `package-lock.json` 固定，Cloudflare 构建时应使用 `npm ci` 安装。

## 本地使用同一套构建

```bash
npm ci
npm run docs:build
npm run docs:preview
```

## 自动部署行为

- 推送到 `main`：发布生产版本。
- Pull Request 或其他分支：由 Cloudflare Pages 生成预览部署。
- 构建输出是纯静态文件，不需要数据库或服务端密钥。

## 自定义域名

正式自定义域名为 `https://workbuddy.homes`。如未来更换域名，需要同步更新
`VITEPRESS_SITE_URL`、`docs/public/robots.txt`、README 在线阅读链接和各搜索引擎站点属性。

`docs/public/_headers` 会为带内容指纹的 `/assets/*` 设置一年不可变缓存，
并为社区图片、分享图和 favicon 设置一个月浏览器缓存。
