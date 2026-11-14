import Image from "next/image";
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-b border-border bg-secondary/40"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-[1fr_1.3fr] md:px-10 lg:px-16">
        <div>
          <Image
            src="/phasetide-mark.png"
            alt=""
            width={108}
            height={36}
            className="mb-5"
          />
          <h2
            id="about-title"
            className="text-3xl font-semibold tracking-tight"
          >
            与业务同频，
            <br />
            让改变发生。
          </h2>
        </div>
        <div className="flex flex-col gap-5 text-base leading-8 text-muted-foreground">
          <p>
            我们是 PhaseTide，相位潮汐。一家立足深圳、专注软件工程与 AI
            落地的科技公司。
          </p>
          <p>
            我们相信，技术的价值最终体现在真实的使用中。因此，我们从业务问题出发，把产品思维、工程实践与
            AI 能力连接起来，陪伴团队从想法走到落地。
          </p>
          <p className="text-sm font-medium text-foreground">
            理解问题 · 务实构建 · 长期演进
          </p>
        </div>
      </div>
    </section>
  );
}
