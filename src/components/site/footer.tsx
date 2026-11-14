import Link from "next/link";
import { Brand } from "./brand";
import { site } from "@/lib/site";
export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 py-9 md:px-10 lg:px-16">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <Brand />
          <p className="text-sm text-muted-foreground">{site.company}</p>
        </div>
        <div className="flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} PhaseTide. 保留所有权利。</p>
          <div className="flex gap-6">
            <span>深圳，中国</span>
            <Link href="/privacy" className="hover:text-primary">
              隐私说明
            </Link>
            <a href="#top" className="hover:text-primary">
              回到顶部 ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
