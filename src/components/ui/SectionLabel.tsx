import { cn } from "@/lib/utils";

export type SectionLabelTone = "brand" | "amber" | "teal";

/**
 * Numbered section marker, e.g. "01 / Über mich".
 * Rendered as a tinted pill so every section opens with a colour cue
 * instead of faint grey capitals. The tone rotates across the page.
 */
export function SectionLabel({
  children,
  tone = "brand",
  className,
}: {
  children: React.ReactNode;
  tone?: SectionLabelTone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow w-fit",
        tone === "amber" && "eyebrow--amber",
        tone === "teal" && "eyebrow--teal",
        className,
      )}
      data-reveal
    >
      <span aria-hidden className="eyebrow__dot" />
      <span>{children}</span>
    </p>
  );
}
