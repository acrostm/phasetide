import { Suspense } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { ContactForm } from "./contact-form";
import { site } from "@/lib/site";
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:px-10 lg:gap-24 lg:px-16 lg:py-28"
    >
      <div>
        <h2
          id="contact-title"
          className="text-3xl leading-[1.4] font-semibold tracking-tight lg:text-[42px]"
        >
          下一个突破，
          <br />
          从一次对话开始。
        </h2>
        <p className="mt-7 max-w-sm text-sm leading-8 text-muted-foreground">
          告诉我们您的业务目标与技术挑战。
          <br />
          无论是清晰的需求，还是一个初步的想法，
          <br className="hidden lg:block" />
          都值得一起探索。
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-9 inline-flex items-center gap-3 text-base font-medium transition-colors hover:text-primary"
        >
          <Mail className="size-5 text-primary" aria-hidden="true" />
          {site.email}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
        <p className="mt-4 text-xs text-muted-foreground">
          也欢迎直接邮件联系。
        </p>
      </div>
      <Suspense
        fallback={<p className="text-muted-foreground">正在加载咨询表单…</p>}
      >
        <ContactForm />
      </Suspense>
    </section>
  );
}
