"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { isRtl, type Lang } from "@/lib/i18n";

// Button-only waitlist CTA (no backend). Clicking confirms locally.
export default function WaitlistButton({
  lang,
  label,
  confirmed,
}: {
  lang: Lang;
  label: string;
  confirmed: string;
}) {
  const [done, setDone] = useState(false);
  const rtl = isRtl(lang);

  if (done) {
    return (
      <div
        role="status"
        className="inline-flex items-center gap-2 rounded-full bg-weafex-navy px-6 py-3.5 text-base font-semibold text-white"
      >
        <Check className="h-5 w-5 text-weafex-coral" strokeWidth={2.6} />
        <span>{confirmed}</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setDone(true)}
      className="group inline-flex items-center gap-2 rounded-full bg-weafex-coral px-7 py-3.5 text-base font-semibold text-white transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
    >
      <span>{label}</span>
      <ArrowRight
        className={`h-5 w-5 transition-transform ${
          rtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
        }`}
        strokeWidth={2}
      />
    </button>
  );
}
