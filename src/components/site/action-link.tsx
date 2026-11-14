import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// Native link semantics, shared shadcn button styles, no client event handler needed.
export function ActionLink({
  variant = "default",
  size = "default",
  className,
  ...props
}: ComponentProps<"a"> & {
  variant?: "default" | "outline" | "link";
  size?: "default" | "lg";
}) {
  return (
    <a
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
