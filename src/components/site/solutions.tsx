import { ActionLink } from "./action-link";
import { Code2, Layers3, Sparkles, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";
const icons = [Code2, Layers3, Sparkles];
export function Solutions() {
  return (
    <section
      id="solutions"
      className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16 lg:py-28"
      aria-labelledby="solutions-title"
    >
      <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <h2
          id="solutions-title"
          className="text-3xl leading-tight font-semibold tracking-tight md:text-4xl"
        >
          我们的解决方案
        </h2>
        <p className="max-w-sm text-sm leading-7 text-muted-foreground">
          以工程能力与业务理解，
          <br />
          帮助企业将技术潜力转化为实际价值。
        </p>
      </div>
      <div className="grid gap-10 md:grid-cols-3 md:gap-0">
        {services.map((service, i) => {
          const Icon = icons[i];
          return (
            <article
              key={service.title}
              className="flex flex-col border-t border-border pt-8 md:border-t-0 md:border-l md:px-8 md:pt-0 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <Icon
                className={
                  [
                    "mb-7 size-9 text-primary",
                    "mb-7 size-9 text-brand-lavender",
                    "mb-7 size-9 text-brand-mint",
                  ][i]
                }
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="text-2xl font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                {service.english}
              </p>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-sm">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="size-1 shrink-0 bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <ActionLink
                variant="link"
                className="mt-7 self-start px-0"
                href={`?service=${encodeURIComponent(service.title)}#contact`}
              >
                聊聊这个方向
                <ArrowUpRight data-icon="inline-end" />
              </ActionLink>
            </article>
          );
        })}
      </div>
    </section>
  );
}
