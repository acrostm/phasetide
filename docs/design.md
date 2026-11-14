# PhaseTide 第一版

目标：中文企业官网，介绍软件开发、FDE 与 AI 训练部署，收集潜在客户的邮箱与需求。用户已授权直接制作第一版，技术选型由实现者决定。

技术：Next.js App Router、TypeScript、Tailwind、shadcn/ui。相比纯 SPA，提供静态页面 SEO 与原生服务端表单接口；相比 CMS，第一版无需增加运维。

设计：近白背景、近黑正文、电光蓝交互色，中文系统字体；1120–1200px 内容宽度；细边框与小圆角。首屏标题、相位波形、双 CTA；三栏解决方案；深色四步交付；关于公司；双栏联系表单与页脚。手机单栏。禁止虚构案例、客户或数据。

组件：SiteHeader、Hero、Solutions、Delivery、About、ContactForm、Footer。文案集中在 lib/site.ts。交互由 shadcn 按钮、输入框、原生选择框、Sheet 和 Alert 组成。仅主题与必要全局规则使用 CSS。

表单：姓名、工作邮箱、公司（选填）、服务、需求、同意联系；服务端验证、请求大小限制、蜜罐字段、同源校验。Cloudflare Email Sending 接口将需求发送至 contact@phasetide.com，密钥仅在服务器。未配置时返回明确的不可用状态，不存储到临时文件，也不伪造成功。生产部署还需配置 Cloudflare 发信域和 Vercel 防滥用规则。

参考：https://nextjs.org/docs/app/getting-started/server-and-client-components 、https://ui.shadcn.com/docs/installation/next 、https://vercel.com/docs/environment-variables 、https://developers.cloudflare.com/email-service/get-started/send-email/ 。

用户追加品牌参考：采用蓝、紫、薄荷绿三条交叠波形，文字独立排版；替换原临时 Waves 图标。原概念图的品牌标识以用户附件为准。
