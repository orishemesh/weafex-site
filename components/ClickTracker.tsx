"use client";

import { useEffect } from "react";
import { track } from "@/lib/gtag";

// Mounted once in the root layout. Captures clicks on waitlist CTAs and
// mailto links anywhere on the site without touching each component.
export default function ClickTracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const fromPath = window.location.pathname;
      if (href.startsWith("mailto:")) {
        track("email_click", { email: href.replace("mailto:", ""), from_path: fromPath });
      } else if (/\/(he|en)\/waitlist(\/|$|\?)/.test(href)) {
        track("waitlist_cta_click", { from_path: fromPath });
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  return null;
}
