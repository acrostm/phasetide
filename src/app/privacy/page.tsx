import Link from "next/link";
import { site } from "@/lib/site";
export const metadata = { title: "隐私说明" };
export default function Privacy() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-7 px-6 py-20">
      <Link href="/" className="text-sm text-primary">
        ← 返回 PhaseTide
      </Link>
      <h1 className="text-4xl font-semibold">隐私说明</h1>
      <p className="leading-8">
        当您通过联系表单咨询时，{site.company}
        将使用您填写的姓名、邮箱、公司及项目需求，与您沟通项目和合作事宜。
      </p>
      <h2 className="text-xl font-semibold">信息如何处理</h2>
      <p className="leading-8 text-muted-foreground">
        表单信息通过邮件服务发送至我们的业务邮箱。我们仅为回应咨询和跟进合作使用这些信息，不会将其用于未经您同意的营销订阅。请勿在表单中提交密码、密钥或其他敏感信息。
      </p>
      <h2 className="text-xl font-semibold">联系我们</h2>
      <p className="leading-8 text-muted-foreground">
        如需查询、更正或删除您提交的信息，或撤回联系授权，请发送邮件至{" "}
        <a className="text-primary underline" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        。
      </p>
    </main>
  );
}
