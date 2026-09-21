import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface SplitWordsProps {
  text: string;
  className?: string;
  /** Rendered as a block so long headlines wrap naturally. */
  as?: "span" | "div";
  /**
   * `safe` words carry no CSS "start hidden" rule. They are visible the
   * moment they render and GSAP animates them *from* below with .from().
   * Use this above the fold, where content must never depend on JS.
   */
  safe?: boolean;
}

/**
 * Wraps every word in an overflow mask so GSAP can slide it up from below.
 * The markup is rendered on the server, so there is no layout shift and the
 * text stays selectable and readable without JavaScript.
 */
export function SplitWords({ text, className, as = "span", safe = false }: SplitWordsProps) {
  const Tag = as;
  const words = text.split(" ").filter(Boolean);
  const attr = safe ? { "data-word-safe": "" } : { "data-word": "" };

  return (
    <Tag className={cn(className)}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="split-word">
            <span {...attr}>{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
