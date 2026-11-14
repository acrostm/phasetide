import { ActionLink } from "./action-link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-border"
      aria-labelledby="hero-title"
    >
      <Image
        src="/phase-wave.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center max-md:opacity-30"
      />
      <div className="mx-auto flex min-h-[660px] max-w-7xl flex-col justify-center px-6 py-24 md:min-h-[720px] md:px-10 lg:px-16">
        <div className="max-w-[720px]">
          <h1
            id="hero-title"
            className="text-[40px] leading-[1.28] font-semibold tracking-[-2px] text-balance sm:text-[54px] lg:text-[64px]"
          >
            把技术的可能，
            <br />
            变成业务的日常。
          </h1>
          <p className="mt-7 max-w-[490px] text-base leading-8 text-muted-foreground md:text-lg">
            从软件开发到 AI 落地，我们深入业务现场，
            <br className="hidden sm:block" />
            构建真正可用、可持续演进的数字产品。
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ActionLink size="lg" href="#contact">
              开始一次对话
              <ArrowUpRight data-icon="inline-end" />
            </ActionLink>
            <ActionLink size="lg" variant="outline" href="#solutions">
              探索解决方案
              <ArrowDown data-icon="inline-end" />
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
