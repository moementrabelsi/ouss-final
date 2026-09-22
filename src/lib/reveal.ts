"use client";

/**
 * The safety net behind every scroll reveal on the page.
 *
 * Sections hide their content in CSS (`opacity: 0`, a 110% offset inside an
 * overflow mask, a rule scaled to zero) and hand the job of showing it to
 * GSAP. That is a fine trade as long as GSAP always finishes the job — and a
 * blank section the moment it does not. A stuck ScrollTrigger, a tween that
 * silently ends on the wrong value, a runtime error in one component: any of
 * them leaves real copy on the page that nobody can read.
 *
 * So nothing relies on that any more. Every element that starts hidden is
 * watched. Once it has been inside (or above) the viewport for longer than it
 * could plausibly still be animating, it is marked `data-shown`, and the
 * stylesheet forces it visible with `!important` — which beats the inline
 * styles GSAP writes, and needs neither GSAP nor React to be alive.
 */

const SELECTOR = "[data-reveal],[data-word],[data-word-safe],[data-line],[data-draw]";

/** How long an element may sit in view before we assume its reveal failed. */
const GRACE_MS = 1800;

/** Elements we have already dealt with, so a sweep stays cheap. */
const due = new WeakMap<Element, number>();

/** Marks elements as revealed for good. Safe to call more than once. */
export function markShown(targets: Element | Element[] | ArrayLike<Element>): void {
  const list: Element[] = Array.isArray(targets)
    ? targets
    : targets instanceof Element
      ? [targets]
      : Array.from(targets as ArrayLike<Element>);

  for (const el of list) {
    if (el && el.nodeType === 1) el.setAttribute("data-shown", "");
  }
}

/** True when the element is still visually hidden by a reveal start state. */
function isStuck(el: Element): boolean {
  const cs = getComputedStyle(el);

  if (parseFloat(cs.opacity) < 0.05) return true;

  if (el.hasAttribute("data-draw")) {
    return parseFloat(cs.strokeDashoffset) > 0.05;
  }

  const t = cs.transform;
  if (!t || t === "none") return false;

  const m = t.match(/matrix\(([^)]+)\)/);
  if (!m) return false;

  const [a, , , , , f] = m[1].split(",").map(parseFloat);
  /* Collapsed horizontally (a rule that never drew) … */
  if (Math.abs(a) < 0.05) return true;
  /* … or pushed out of its mask by more than a couple of pixels. */
  return Math.abs(f) > 2;
}

/**
 * Sweeps the page once: anything that should have been revealed by now and
 * still is not gets shown. Returns the number of elements rescued.
 */
export function sweepReveals(force = false): number {
  if (typeof document === "undefined") return 0;

  const now = Date.now();
  const viewport = window.innerHeight || 0;
  let rescued = 0;

  document.querySelectorAll(SELECTOR).forEach((el) => {
    if (el.hasAttribute("data-shown")) return;

    const rect = el.getBoundingClientRect();
    /* Not its turn yet — it still sits below the fold. */
    if (!force && rect.top > viewport) {
      due.delete(el);
      return;
    }

    const first = due.get(el);
    if (first === undefined) {
      due.set(el, now);
      return;
    }

    if (!force && now - first < GRACE_MS) return;
    if (!isStuck(el)) {
      /* It made it on its own — stop watching. */
      markShown(el);
      return;
    }

    markShown(el);
    rescued += 1;
  });

  return rescued;
}

/**
 * Starts the watchdog. Sweeps after load, on a short schedule while the
 * visitor scrolls, and whenever the window settles after a resize.
 * Returns a teardown function.
 */
export function startRevealGuard(): () => void {
  if (typeof window === "undefined") return () => {};

  let idle: number | undefined;
  const schedule = (delay = GRACE_MS) => {
    window.clearTimeout(idle);
    idle = window.setTimeout(() => sweepReveals(), delay);
  };

  const onScroll = () => schedule();
  const onResize = () => schedule(600);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("load", () => schedule(1200));
  /* Coming back through the bfcache: everything should already be shown. */
  window.addEventListener("pageshow", () => schedule(400));

  /* Two unconditional passes cover the first screenful even if the visitor
     never scrolls or the page is opened deep-linked at an anchor. */
  const boot = window.setTimeout(() => sweepReveals(), 2500);
  const late = window.setTimeout(() => sweepReveals(), 6000);

  return () => {
    window.clearTimeout(idle);
    window.clearTimeout(boot);
    window.clearTimeout(late);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
  };
}
