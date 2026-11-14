# PhaseTide 相位潮汐官网

中文企业官网，基于 Next.js 16 App Router、React 19、TypeScript、Tailwind CSS 4、shadcn/ui（Base UI）与 Lucide。适合直接导入 Vercel。生产页面默认服务端渲染，导航与表单为独立客户端组件，无外部字体依赖。

## 本地开发

需要 Node.js 22 或更新 LTS 版本。

```sh
npm ci
npm run dev
```

访问 http://localhost:3000 。检查：`npm run lint`、`npm run build`。格式化：`npm run format`。

## Vercel 部署

1. 将仓库推送至 GitHub，在 Vercel 中 Import Project。
2. Framework Preset 选择 **Next.js**，根目录使用仓库根目录。构建命令 `npm run build`，输出目录保持默认。
3. 配置下方邮件环境变量，分别选择需要启用的 Production / Preview 环境，再部署。
4. 添加 `phasetide.com` 和需要的 `www` 域名，按 Vercel 提示配置 DNS。站点 URL 集中在 `src/lib/site.ts`。
5. 正式开放表单前，在 Vercel Firewall 为 `/api/contact` 配置限流/机器人保护，并做一次真实收件测试。

无需 `vercel.json`，无需独立后端服务器。

## 表单收件

表单字段：姓名、邮箱、公司（选填）、服务方向、项目需求、联系授权。接口位于 `src/app/api/contact/route.ts`。

通过 Cloudflare Email Sending 向 **contact@phasetide.com** 发送需求（邮箱为固定服务端收件人）。Reply-To 为客户邮箱，支持直接回复。

```sh
cp .env.example .env.local
```

配置：

- `CLOUDFLARE_API_TOKEN`：具备 Email Sending 权限的 Cloudflare API Token。
- `CLOUDFLARE_ACCOUNT_ID`：Cloudflare 账户 ID。
- `CONTACT_FROM_EMAIL`：Cloudflare 域下已验域的发信邮箱地址。

密钥仅在服务端使用，不得加 `NEXT_PUBLIC_` 前缀。需要先验证发信域名，并确保 contact@phasetide.com 实际可收件。

未配置邮件服务时，接口返回 503，UI 明确说明信息尚未发送并提供邮箱。发送失败保留表单；成功才清空。使用共享前后端校验、同源检查、24 KB 请求体限制、蜜罐字段和超时。没有将线索写入 Vercel 临时磁盘或浏览器存储。

## 维护结构

- `src/lib/site.ts`：公司信息、服务内容、流程与导航。
- `src/components/site/`：各官网区块与表单。
- `src/components/ui/`：通过官方 CLI 安装的 shadcn/ui 组件；按钮和输入控件统一调整为适合官网的 44–48px 高度。
- `src/lib/contact.ts`：共享表单校验。
- `src/app/globals.css`：主题 token、少量基础规则，布局使用 Tailwind。
- `public/phasetide-mark.png`：按用户提供的蓝紫绿波形 Logo 制作的透明标识；品牌文字是独立 HTML。
- `public/phase-wave.png`：首屏装饰图；Next Image 负责优化与响应式输出。
- `src/app/privacy/`：简明联系表单隐私说明。
- `docs/design.md`：设计方向和技术选择。

添加组件：`npx shadcn@latest add <component>`。更新前保留现有品牌样式修改。

## 实现参考

- [Next.js 服务端与客户端组件](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [shadcn/ui Next.js 安装](https://ui.shadcn.com/docs/installation/next)
- [Vercel 环境变量](https://vercel.com/docs/environment-variables)
- [Cloudflare Email Sending](https://developers.cloudflare.com/email-service/get-started/send-email/)
