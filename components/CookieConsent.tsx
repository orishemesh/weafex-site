"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { isRtl, type Lang } from "@/lib/i18n";

/**
 * Cookie consent banner wired to Google Consent Mode v2.
 * Defaults are set to "denied" in the inline gtag-init script in
 * app/[lang]/layout.tsx (before GTM). This banner updates consent on choice,
 * persists it in localStorage + a 1-year cookie (weafex-consent), re-applies it
 * on return visits, and only shows on first visit. Non-modal, keyboard-operable,
 * RTL-correct. Re-opens when the footer "Cookie settings" link dispatches
 * "weafex:open-consent".
 */

type Strings = {
  body: string;
  acceptAll: string;
  onlyEssential: string;
  policy: string;
  ariaLabel: string;
};

type Choice = "accepted" | "rejected";
const STORAGE_KEY = "weafex-consent";

function persist(choice: Choice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* ignore */
  }
  try {
    document.cookie = `${STORAGE_KEY}=${choice}; path=/; max-age=31536000; samesite=lax`;
  } catch {
    /* ignore */
  }
}

function readStored(): Choice | null {
  try {
    const ls = localStorage.getItem(STORAGE_KEY);
    if (ls === "accepted" || ls === "rejected") return ls;
  } catch {
    /* ignore */
  }
  if (typeof document !== "undefined") {
    const m = document.cookie.match(/(?:^|;\s*)weafex-consent=(accepted|rejected)/);
    if (m) return m[1] as Choice;
  }
  return null;
}

function applyConsent(choice: Choice) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (choice === "accepted") {
    window.gtag("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
  } else {
    window.gtag("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}

export default function CookieConsent({
  lang,
  strings,
}: {
  lang: Lang;
  strings: Strings;
}) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const rtl = isRtl(lang);

  useEffect(() => {
    setMounted(true);
    const stored = readStored();
    if (stored) {
      applyConsent(stored); // re-apply matching consent on return visits
      setOpen(false);
    } else {
      setOpen(true); // first visit — defaults remain denied until choice
    }
    const reopen = () => setOpen(true);
    window.addEventListener("weafex:open-consent", reopen);
    return () => window.removeEventListener("weafex:open-consent", reopen);
  }, []);

  const choose = useCallback((choice: Choice) => {
    persist(choice);
    applyConsent(choice);
    setOpen(false);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="region"
          aria-label={strings.ariaLabel}
          dir={rtl ? "rtl" : "ltr"}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          // bottom-28 on mobile clears the bottom-corner accessibility widget;
          // z below the widget (9999) so the widget stays clickable.
          className="fixed inset-x-0 bottom-28 z-[9000] flex justify-center px-4 sm:bottom-6"
        >
          <div className="w-full max-w-2xl rounded-2xl border border-weafex-line bg-white p-5 shadow-[0_18px_50px_rgba(17,24,39,0.18)] sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <p className="text-sm leading-relaxed text-weafex-navy">
                {strings.body}{" "}
                <Link
                  href={`/${lang}/privacy`}
                  className="font-semibold text-weafex-coralDeep underline underline-offset-2 transition-colors hover:text-weafex-navy"
                >
                  {strings.policy}
                </Link>
              </p>
              <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => choose("rejected")}
                  className="order-2 rounded-full border border-weafex-line px-5 py-2.5 text-sm font-semibold text-weafex-navy transition-colors hover:border-weafex-navy/40 sm:order-1"
                >
                  {strings.onlyEssential}
                </button>
                <button
                  type="button"
                  onClick={() => choose("accepted")}
                  className="order-1 rounded-full bg-weafex-coral px-6 py-2.5 text-sm font-semibold text-white transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] sm:order-2"
                >
                  {strings.acceptAll}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
