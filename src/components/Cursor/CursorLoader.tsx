"use client";

import dynamic from "next/dynamic";

/** Heavy-ish, desktop-only and purely decorative — loaded on the client. */
const Cursor = dynamic(() => import("./Cursor"), { ssr: false });

export function CursorLoader() {
  return <Cursor />;
}
