import { cn } from "@/lib/utils";

/** A hairline that draws itself from left to right on scroll. */
export function Rule({ className }: { className?: string }) {
  return <span aria-hidden data-line className={cn("rule", className)} />;
}
