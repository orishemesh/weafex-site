"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { otherLang, type Lang } from "@/lib/i18n";

export default function LangToggle({
  lang,
  label,
  to,
  variant = "light",
}: {
  lang: Lang;
  label: string;
  to: string;
  variant?: "light" | "dark";
}) {
  const pathname = usePathname() || `/${lang}`;
  const target = otherLang(lang);
  // Swap the leading /he or /en segment, keep the rest of the path.
  const targetPath = pathname.replace(/^\/(he|en)/, `/${target}`);

  const persist = () => {
    try {
      document.cookie = `weafex-lang=${target}; path=/; max-age=31536000; samesite=lax`;
      localStorage.setItem("weafex-lang", target);
    } catch {
      /* ignore */
    }
  };

  const styles =
    variant === "dark"
      ? "text-white/75 hover:text-white"
      : "text-weafex-navy/70 hover:text-weafex-navy";

  return (
    <Link
      href={targetPath}
      onClick={persist}
      aria-label={label}
      title={label}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-semibold transition-colors ${styles}`}
    >
      <Globe className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.2} />
      <span>{to}</span>
    </Link>
  );
}
