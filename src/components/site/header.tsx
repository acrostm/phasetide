"use client";
import { ActionLink } from "./action-link";
import { useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";
import { navigation } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:bg-background focus:p-4"
      >
        跳到主要内容
      </a>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 md:px-10 lg:px-16">
        <Brand />
        <nav aria-label="主导航" className="hidden items-center gap-9 md:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-3 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ActionLink className="hidden md:inline-flex" href="#contact">
          聊聊你的项目
          <ArrowUpRight data-icon="inline-end" />
        </ActionLink>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="打开导航菜单"
                className="md:hidden"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>PhaseTide 导航</SheetTitle>
            </SheetHeader>
            <nav aria-label="移动导航" className="flex flex-col gap-2 px-6">
              {navigation.map((item) => (
                <a
                  className="py-4"
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <ActionLink
                href="#contact"

                onClick={() => setOpen(false)}
              >
                聊聊你的项目
                <ArrowUpRight data-icon="inline-end" />
              </ActionLink>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
