import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="PhaseTide 相位潮汐首页"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <Image
        src="/phasetide-mark.png"
        width={76}
        height={26}
        alt=""
        className="h-auto w-[68px] sm:w-[76px]"
      />
      <span className="flex flex-col">
        <span className="text-[22px] leading-6 font-semibold tracking-[-0.8px] text-brand-ink">
          PhaseTide
        </span>
        <span className="mt-0.5 text-[10px] tracking-[0.28em] text-muted-foreground">
          相位潮汐
        </span>
      </span>
    </Link>
  );
}
