import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface SplitWordsProps {
  text: string;
  className?: string;
  /** Rendered as a block so long headlines wrap naturally. */
  as?: "span" | "div";
}

/**
 * Wraps every word in an overflow mask so GSAP can slide it up from below.
 * The markup is rendered on the server, so there is no layout shift and the
 * text stays selectable and readable without JavaScript.
 */
export function SplitWords({ text, className, as = "span" }: SplitWordsProps) {
  const Tag = as;
  const words = text.split(" ").filter(Boolean);

  return (
    <Tag className={cn(className)}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="split-word">
            <span data-word>{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
